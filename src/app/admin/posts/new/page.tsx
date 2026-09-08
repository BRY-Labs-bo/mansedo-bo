import { prisma } from "@/lib/prisma";
import { createPostAction } from "@/app/admin/actions";
import { PostForm } from "@/app/admin/posts/post-form";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string }>;

export default async function NewPostPage({ searchParams }: { searchParams: SearchParams }) {
  const [{ error }, categories] = await Promise.all([
    searchParams,
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="font-sans font-extrabold text-[28px] leading-[1.15] text-txt-l">
        Nueva publicación
      </h1>
      <p className="mt-2 text-body-sm text-mut-l">
        Marcá como publicado sólo cuando esté lista. La vista previa está disponible al editar (se
        renderiza sobre el contenido guardado en base).
      </p>
      <div className="mt-8">
        <PostForm
          action={createPostAction}
          categories={categories}
          errorMessage={error ?? null}
          previewHtml={null}
        />
      </div>
    </div>
  );
}
