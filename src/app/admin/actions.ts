"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  clearSessionCookie,
  setSessionCookie,
  signSession,
  verifyCredentials,
  requireSession,
} from "@/lib/auth";
import { revalidatePath } from "next/cache";

// -------------------- LOGIN / LOGOUT --------------------

const LoginSchema = z.object({
  email: z.string().trim().email("Correo inválido."),
  password: z.string().min(1, "Ingrese la contraseña."),
  next: z.string().optional(),
});

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }
  const user = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return { status: "error", message: "Credenciales incorrectas." };
  }
  const token = await signSession({ sub: user.id, email: user.email });
  await setSessionCookie(token);
  const next = parsed.data.next && parsed.data.next.startsWith("/admin") ? parsed.data.next : "/admin";
  redirect(next);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

// -------------------- POSTS --------------------

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

const PostSchema = z.object({
  title: z.string().trim().min(3, "El título es obligatorio.").max(200),
  slug: z.string().trim().max(120).optional().or(z.literal("")),
  excerpt: z.string().trim().min(10, "El resumen es obligatorio.").max(500),
  content: z.string().min(10, "El contenido es obligatorio."),
  coverImage: z.string().trim().max(500).optional().or(z.literal("")),
  coverAssetId: z.string().trim().max(40).optional().or(z.literal("")),
  categoryId: z.string().min(1, "Elegí una categoría."),
  author: z.string().trim().min(1, "El autor es obligatorio.").max(200),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.union([z.literal("on"), z.literal(""), z.literal("true"), z.literal("false")]).optional(),
});

export async function createPostAction(formData: FormData) {
  await requireSession();
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    coverAssetId: formData.get("coverAssetId"),
    categoryId: formData.get("categoryId"),
    author: formData.get("author"),
    status: formData.get("status") ?? "DRAFT",
    featured: formData.get("featured") ?? "",
  });
  if (!parsed.success) {
    // Redirigimos con mensaje simple. La UI ya valida required en HTML.
    const msg = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    redirect(`/admin/posts/new?error=${encodeURIComponent(msg)}`);
  }
  const d = parsed.data;
  const slug = d.slug && d.slug.length > 0 ? slugify(d.slug) : slugify(d.title);
  const featured = d.featured === "on" || d.featured === "true";
  const status = d.status as PostStatus;

  const post = await prisma.post.create({
    data: {
      title: d.title,
      slug,
      excerpt: d.excerpt,
      content: d.content,
      coverImage: d.coverImage || null,
      coverAssetId: d.coverAssetId || null,
      categoryId: d.categoryId,
      author: d.author,
      status,
      featured,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect(`/admin/posts/${post.id}/edit?saved=1`);
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireSession();
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    coverAssetId: formData.get("coverAssetId"),
    categoryId: formData.get("categoryId"),
    author: formData.get("author"),
    status: formData.get("status") ?? "DRAFT",
    featured: formData.get("featured") ?? "",
  });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    redirect(`/admin/posts/${id}/edit?error=${encodeURIComponent(msg)}`);
  }
  const d = parsed.data;
  const slug = d.slug && d.slug.length > 0 ? slugify(d.slug) : slugify(d.title);
  const featured = d.featured === "on" || d.featured === "true";
  const status = d.status as PostStatus;

  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  const publishedAt =
    status === "PUBLISHED"
      ? existing.publishedAt ?? new Date()
      : null;

  await prisma.post.update({
    where: { id },
    data: {
      title: d.title,
      slug,
      excerpt: d.excerpt,
      content: d.content,
      coverImage: d.coverImage || null,
      coverAssetId: d.coverAssetId || null,
      categoryId: d.categoryId,
      author: d.author,
      status,
      featured,
      publishedAt,
    },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect(`/admin/posts/${id}/edit?saved=1`);
}

export async function togglePublishAction(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/posts");
  const post = await prisma.post.findUniqueOrThrow({ where: { id } });
  const nextStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  await prisma.post.update({
    where: { id },
    data: {
      status: nextStatus,
      publishedAt: nextStatus === "PUBLISHED" ? post.publishedAt ?? new Date() : null,
    },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/posts");
  const post = await prisma.post.findUnique({ where: { id } });
  if (post) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
  }
  redirect("/admin/posts");
}

// -------------------- CONTACTOS --------------------

export async function toggleReadAction(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const currentReadRaw = String(formData.get("currentRead") ?? "false");
  if (!id) redirect("/admin/contactos");
  await prisma.contactSubmission.update({
    where: { id },
    data: { read: currentReadRaw !== "true" },
  });
  revalidatePath("/admin/contactos");
  revalidatePath(`/admin/contactos/${id}`);
  const back = String(formData.get("back") ?? "/admin/contactos");
  redirect(back);
}
