import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sirve el binario de una imagen guardada como MediaAsset.
// Los IDs son cuid inmutables — cache pública muy larga con ETag por id.
export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 31536000;

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;

  // ETag = id (los assets son inmutables)
  const etag = `"${id}"`;
  const ifNoneMatch = req.headers.get("if-none-match");
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304 });
  }

  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
    select: { data: true, mimeType: true, bytes: true },
  });
  if (!asset) return new NextResponse("not found", { status: 404 });

  return new NextResponse(new Uint8Array(asset.data), {
    status: 200,
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.bytes),
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: etag,
    },
  });
}
