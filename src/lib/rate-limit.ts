import { prisma } from "@/lib/prisma";

// Rate limit del formulario de contacto: máximo N envíos por IP en una ventana.
// Se apoya en la tabla contact_submissions (índice ip, createdAt).
const DEFAULT_MAX = 5;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000; // 1 hora

export async function isRateLimited(
  ip: string | null,
  {
    max = DEFAULT_MAX,
    windowMs = DEFAULT_WINDOW_MS,
  }: { max?: number; windowMs?: number } = {}
): Promise<boolean> {
  if (!ip) return false; // sin IP identificable, no bloqueamos (no queremos bloquear a todos detrás de un proxy sin XFF)
  const since = new Date(Date.now() - windowMs);
  const count = await prisma.contactSubmission.count({
    where: { ip, createdAt: { gte: since } },
  });
  return count >= max;
}
