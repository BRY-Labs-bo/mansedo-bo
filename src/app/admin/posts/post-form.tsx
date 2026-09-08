import Link from "next/link";
import type { Category, Post } from "@prisma/client";
import { renderMarkdown } from "@/lib/markdown";
import { CoverUploader } from "@/app/admin/posts/cover-uploader";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  post?: Post & { category?: Category | null };
  previewHtml?: string | null;
  errorMessage?: string | null;
  savedFlag?: boolean;
  previewHref?: string;
  editHref?: string;
};

export async function PostForm({
  action,
  categories,
  post,
  previewHtml,
  errorMessage,
  savedFlag,
  previewHref,
  editHref,
}: Props) {
  // Nota: si nos pasan post.content pero no previewHtml, se muestra sólo cuando el usuario
  // hace click en 'Vista previa' (renderiza el estado guardado en DB).
  const html = previewHtml ?? (post ? await renderMarkdown(post.content) : "");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
      <form action={action} className="grid gap-5" noValidate>
        <div>
          <label htmlFor="pf-title" className="field-label">Título *</label>
          <input
            id="pf-title"
            name="title"
            type="text"
            defaultValue={post?.title ?? ""}
            required
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="pf-slug" className="field-label">Slug (opcional — se genera del título si se deja vacío)</label>
          <input
            id="pf-slug"
            name="slug"
            type="text"
            defaultValue={post?.slug ?? ""}
            className="field-input"
            placeholder="ej.: marco-regulatorio-en-bolivia"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="pf-category" className="field-label">Categoría *</label>
            <select
              id="pf-category"
              name="categoryId"
              defaultValue={post?.categoryId ?? ""}
              required
              className="field-input"
            >
              <option value="" disabled>Elegí una…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-author" className="field-label">Autor *</label>
            <input
              id="pf-author"
              name="author"
              type="text"
              defaultValue={post?.author ?? ""}
              required
              className="field-input"
            />
          </div>
        </div>
        <div>
          <label htmlFor="pf-excerpt" className="field-label">Resumen *</label>
          <textarea
            id="pf-excerpt"
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            required
            className="field-input resize-y"
          />
        </div>
        <div>
          <p className="field-label mb-3">Imagen de portada</p>
          <CoverUploader initialAssetId={post?.coverAssetId ?? null} />
        </div>
        <div>
          <label htmlFor="pf-cover" className="field-label">
            URL externa de imagen (opcional — sólo si no subís archivo)
          </label>
          <input
            id="pf-cover"
            name="coverImage"
            type="url"
            defaultValue={post?.coverImage ?? ""}
            className="field-input"
            placeholder="https://…"
          />
          <p className="mt-2 text-body-sm text-mut-l">
            Si hay imagen subida arriba, se usa esa. La URL sirve como respaldo o para
            enlazar imágenes ya alojadas en un CDN externo.
          </p>
        </div>
        <div>
          <label htmlFor="pf-content" className="field-label">
            Contenido (Markdown) *
          </label>
          <textarea
            id="pf-content"
            name="content"
            rows={18}
            defaultValue={post?.content ?? ""}
            required
            className="field-input resize-y font-mono text-body-sm"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 items-end">
          <div>
            <label htmlFor="pf-status" className="field-label">Estado</label>
            <select
              id="pf-status"
              name="status"
              defaultValue={post?.status ?? "DRAFT"}
              className="field-input"
            >
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>
          <label className="flex items-center gap-3 pb-3 text-body-sm text-txt-l">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={post?.featured ?? false}
            />
            Marcar como destacado
          </label>
        </div>

        {errorMessage && (
          <div role="alert" className="border-l-2 border-error bg-paper p-3 text-body-sm text-error">
            {errorMessage}
          </div>
        )}
        {savedFlag && (
          <div role="status" className="border-l-2 border-gold-ink bg-paper p-3 text-body-sm text-txt-l">
            Cambios guardados.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          {previewHref && (
            <Link href={previewHref} className="btn btn-secondary-light">
              Vista previa (guardada)
            </Link>
          )}
          {editHref && (
            <Link href={editHref} className="btn btn-secondary-light">
              Ocultar vista previa
            </Link>
          )}
          <Link href="/admin/posts" className="text-gold-txt underline underline-offset-2 ml-auto">
            ← Volver al listado
          </Link>
        </div>
      </form>

      {previewHtml !== null && previewHtml !== undefined && (
        <aside aria-label="Vista previa" className="bg-surface border border-line-l p-6 md:p-8">
          <p className="eyebrow text-gold-ink">
            <span className="rule" aria-hidden="true" />
            Vista previa (estado guardado)
          </p>
          {post && (
            <>
              <h2 className="mt-4 font-sans font-extrabold text-[26px] leading-[1.15] text-txt-l">
                {post.title}
              </h2>
              <p className="mt-2 text-body-sm text-mut-l">{post.excerpt}</p>
            </>
          )}
          <div
            className="prose-article mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </aside>
      )}
    </div>
  );
}
