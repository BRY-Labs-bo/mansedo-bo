import { headers } from "next/headers";

// Extrae la IP del cliente desde headers de proxy comunes.
// En Vercel/Railway hay 'x-forwarded-for'; en algunos setups 'x-real-ip'.
export async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return null;
}
