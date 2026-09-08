import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [totalPosts, drafts, published, contactsTotal, contactsUnread] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  return (
    <div>
      <h1 className="font-sans font-extrabold text-[32px] leading-[1.15] text-txt-l">
        Panel
      </h1>
      <p className="mt-2 text-body text-mut-l">
        Gestión de publicaciones y bandeja de solicitudes de contacto.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/posts"
          className="block bg-surface border border-line-l p-6 hover:border-gold-ink"
        >
          <p className="eyebrow text-gold-ink">Publicaciones</p>
          <p className="mt-3 font-sans font-bold text-[22px] text-txt-l">Posts del blog</p>
          <p className="mt-2 text-body-sm text-mut-l">
            {totalPosts} en total · {published} publicados · {drafts} borradores
          </p>
        </Link>

        <Link
          href="/admin/contactos"
          className="block bg-surface border border-line-l p-6 hover:border-gold-ink"
        >
          <p className="eyebrow text-gold-ink">Contactos</p>
          <p className="mt-3 font-sans font-bold text-[22px] text-txt-l">Solicitudes de contacto</p>
          <p className="mt-2 text-body-sm text-mut-l">
            {contactsTotal} recibidas ·{" "}
            <span className={contactsUnread > 0 ? "text-error font-semibold" : ""}>
              {contactsUnread} sin leer
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
