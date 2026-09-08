import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/date";
import { togglePublishAction, deletePostAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    include: { category: true },
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-sans font-extrabold text-[28px] leading-[1.15] text-txt-l">
          Publicaciones
        </h1>
        <Link href="/admin/posts/new" className="btn btn-primary h-[42px]">
          Nueva publicación
        </Link>
      </div>

      <div className="mt-6 border border-line-l bg-surface">
        <table className="w-full text-body-sm">
          <thead className="bg-paper border-b border-line-l">
            <tr className="text-left">
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Título</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Categoría</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Estado</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Actualizado</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-mut-l text-center">
                  Todavía no hay publicaciones.
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-line-l last:border-b-0 align-top">
                <td className="p-3">
                  <div className="font-sans font-semibold text-txt-l">{p.title}</div>
                  <div className="text-mut-l">/{p.slug}</div>
                  {p.featured && (
                    <span className="inline-block mt-1 bg-gold text-navy-deep px-2 py-0.5 text-[10px] font-sans uppercase tracking-[0.14em]">
                      Destacado
                    </span>
                  )}
                </td>
                <td className="p-3">{p.category.name}</td>
                <td className="p-3">
                  <span
                    className={
                      p.status === "PUBLISHED"
                        ? "text-[#1B7A3E] font-semibold"
                        : "text-mut-l"
                    }
                  >
                    {p.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="p-3 text-mut-l">{formatDate(p.updatedAt)}</td>
                <td className="p-3 text-right">
                  <div className="inline-flex items-center gap-3">
                    <Link
                      href={`/admin/posts/${p.id}/edit`}
                      className="text-gold-txt underline underline-offset-2"
                    >
                      Editar
                    </Link>
                    <form action={togglePublishAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-gold-txt underline underline-offset-2">
                        {p.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                      </button>
                    </form>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-error underline underline-offset-2"
                        // Confirmación mínima con JS nativo — no aporta dependencias.
                        formNoValidate
                      >
                        Borrar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
