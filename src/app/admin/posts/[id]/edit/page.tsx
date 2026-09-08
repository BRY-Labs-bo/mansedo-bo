import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePostAction } from "@/app/admin/actions";
import { PostForm } from "@/app/admin/posts/post-form";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ preview?: string; saved?: string; error?: string }>;

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ id }, { preview, saved, error }] = await Promise.all([params, searchParams]);
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  const showPreview = preview === "1";
  const boundAction = updatePostAction.bind(null, id);
  const baseHref = `/admin/posts/${id}/edit`;

  return (
    <div>
      <h1 className="font-sans font-extrabold text-[28px] leading-[1.15] text-txt-l">
        Editar publicación
      </h1>
      <p className="mt-2 text-body-sm text-mut-l">
        Slug: <code>/{post.slug}</code> · Estado: {post.status === "PUBLISHED" ? "Publicado" : "Borrador"}
      </p>
      <div className="mt-8">
        <PostForm
          action={boundAction}
          categories={categories}
          post={post}
          errorMessage={error ?? null}
          savedFlag={saved === "1"}
          previewHtml={showPreview ? undefined : null}
          previewHref={!showPreview ? `${baseHref}?preview=1` : undefined}
          editHref={showPreview ? baseHref : undefined}
        />
      </div>
    </div>
  );
}
