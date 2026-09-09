import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { processImage, storeAsset, MediaError } from "@/lib/media";

// Endpoint protegido: sólo el admin logueado puede subir imágenes.
// El middleware ya bloquea /admin/*, este handler duplica la verificación
// para que un descuido de rutas no habilite un uploader anónimo.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// sharp puede tardar unos segundos con imágenes grandes; damos margen a la
// función serverless para procesar sin timeout.
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "no autenticado" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "form inválido" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "falta el archivo" }, { status: 400 });
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const processed = await processImage(buf, file.type);
    const asset = await storeAsset(processed, file.name);
    return NextResponse.json(asset, { status: 201 });
  } catch (err) {
    if (err instanceof MediaError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[admin/media] error procesando imagen:", err);
    return NextResponse.json(
      { error: "no se pudo procesar la imagen" },
      { status: 500 }
    );
  }
}
