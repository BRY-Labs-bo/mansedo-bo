import sharp from "sharp";
import { prisma } from "@/lib/prisma";

// Configuración del pipeline de optimización.
const MAX_WIDTH = 1600;      // ancho máximo — imagen se reescala manteniendo aspect
const WEBP_QUALITY = 82;     // calidad WebP — buen balance tamaño/calidad
const MAX_INPUT_BYTES = 12 * 1024 * 1024; // 12 MB de archivo original permitido

const ACCEPTED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

export type ProcessedImage = {
  data: Buffer;
  mimeType: string;
  width: number;
  height: number;
  bytes: number;
};

export class MediaError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message);
    this.name = "MediaError";
  }
}

// Procesa el binario recibido y retorna un buffer WebP optimizado listo para
// persistir. No toca la DB — el caller decide dónde guardarlo.
export async function processImage(
  input: Buffer,
  contentType: string
): Promise<ProcessedImage> {
  if (input.byteLength > MAX_INPUT_BYTES) {
    throw new MediaError(
      `La imagen supera el máximo permitido (${Math.round(MAX_INPUT_BYTES / (1024 * 1024))} MB).`,
      413
    );
  }
  if (!ACCEPTED_MIMES.has(contentType)) {
    throw new MediaError(`Formato no soportado: ${contentType}.`, 415);
  }

  const pipeline = sharp(input, { failOn: "error" })
    .rotate() // aplica orientación EXIF si existe, y la limpia
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true, // no agranda imágenes chicas
      fit: "inside",
    })
    .webp({ quality: WEBP_QUALITY, effort: 5 });

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    data,
    mimeType: "image/webp",
    width: info.width,
    height: info.height,
    bytes: data.byteLength,
  };
}

// Guarda un binario ya procesado como MediaAsset.
export async function storeAsset(
  processed: ProcessedImage,
  originalName?: string | null
) {
  return prisma.mediaAsset.create({
    data: {
      data: processed.data,
      mimeType: processed.mimeType,
      width: processed.width,
      height: processed.height,
      bytes: processed.bytes,
      originalName: originalName ?? null,
    },
    select: {
      id: true,
      mimeType: true,
      width: true,
      height: true,
      bytes: true,
    },
  });
}
