"use client";

import { useRef, useState } from "react";

type Props = {
  initialAssetId?: string | null;
  name?: string;
};

// Widget para subir la imagen de portada.
// - <input type="file"> escondido, activado por un botón.
// - POSTea a /admin/api/media (multipart) y recibe el id del MediaAsset.
// - Renderiza un preview (usa el propio /api/media/[id] para verificar).
// - Publica el valor en un <input name="coverAssetId"> oculto para que el
//   server action lo levante al guardar el post.
export function CoverUploader({ initialAssetId, name = "coverAssetId" }: Props) {
  const [assetId, setAssetId] = useState<string | null>(initialAssetId ?? null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setPending(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/admin/api/media", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "error al subir");
      setAssetId(json.id as string);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
      // reset del input para permitir volver a elegir el mismo archivo
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onClear() {
    setAssetId(null);
    setError(null);
  }

  return (
    <div>
      {/* Preview */}
      {assetId ? (
        <div className="mb-3">
          <div className="aspect-[16/9] border border-line-l bg-navy-deep overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/media/${assetId}?t=${assetId}`}
              alt="Portada actual"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-body-sm text-mut-l break-all">
            asset id: <code>{assetId}</code>
          </p>
        </div>
      ) : (
        <div className="mb-3 aspect-[16/9] border border-dashed border-line-l bg-paper flex items-center justify-center text-body-sm text-mut-l">
          Sin imagen — se mostrará el motivo de marca en el sitio.
        </div>
      )}

      <input type="hidden" name={name} value={assetId ?? ""} />

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        onChange={onPick}
        className="sr-only"
        id="cover-uploader-file"
      />

      <div className="flex flex-wrap gap-3">
        <label
          htmlFor="cover-uploader-file"
          className="btn btn-secondary-light cursor-pointer"
          aria-disabled={pending || undefined}
        >
          {pending ? "Subiendo…" : assetId ? "Reemplazar imagen" : "Subir imagen"}
        </label>
        {assetId && !pending && (
          <button type="button" onClick={onClear} className="btn btn-secondary-light">
            Quitar
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-body-sm text-error">
          {error}
        </p>
      )}
      <p className="mt-3 text-body-sm text-mut-l">
        Al subir se optimiza automáticamente: redimensión a 1600px de ancho máximo,
        conversión a WebP (calidad 82) y remoción de metadata EXIF. La imagen queda
        en la propia base de datos.
      </p>
    </div>
  );
}
