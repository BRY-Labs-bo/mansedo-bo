import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/date";
import { toggleReadAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function ContactoDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const s = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-ink">
            <span className="rule" aria-hidden="true" />
            Solicitud de contacto
          </p>
          <h1 className="mt-2 font-sans font-extrabold text-[26px] leading-[1.15] text-txt-l">
            {s.subject}
          </h1>
        </div>
        <Link href="/admin/contactos" className="text-gold-txt underline underline-offset-2">
          ← Volver
        </Link>
      </div>

      <div className="mt-8 bg-surface border border-line-l p-6 md:p-8">
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="eyebrow text-mut-l">Nombre</dt>
            <dd className="mt-1 text-body text-txt-l">{s.name}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mut-l">Correo</dt>
            <dd className="mt-1 text-body text-txt-l">
              <a href={`mailto:${s.email}`} className="text-gold-txt underline underline-offset-2">
                {s.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-mut-l">Teléfono / WhatsApp</dt>
            <dd className="mt-1 text-body text-txt-l">{s.phone || "—"}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mut-l">Empresa</dt>
            <dd className="mt-1 text-body text-txt-l">{s.company || "—"}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mut-l">Recibido</dt>
            <dd className="mt-1 text-body text-txt-l">{formatDate(s.createdAt)}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mut-l">Estado</dt>
            <dd className="mt-1 text-body text-txt-l">
              {s.read ? "Leído" : <span className="text-error font-semibold">Sin leer</span>}
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <p className="eyebrow text-mut-l">Mensaje</p>
          <p className="mt-2 text-body text-txt-l whitespace-pre-line">{s.message}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-line-l">
          <details>
            <summary className="cursor-pointer text-body-sm text-mut-l">Metadatos técnicos</summary>
            <dl className="mt-3 grid gap-2 text-body-sm text-mut-l">
              <div className="flex gap-2">
                <dt className="uppercase text-eyebrow text-mut-l">IP</dt>
                <dd className="font-mono">{s.ip ?? "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="uppercase text-eyebrow text-mut-l">User-Agent</dt>
                <dd className="font-mono break-all">{s.userAgent ?? "—"}</dd>
              </div>
            </dl>
          </details>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <form action={toggleReadAction}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="currentRead" value={String(s.read)} />
            <input type="hidden" name="back" value={`/admin/contactos/${s.id}`} />
            <button type="submit" className="btn btn-secondary-light">
              {s.read ? "Marcar como no leído" : "Marcar como leído"}
            </button>
          </form>
          <a href={`mailto:${s.email}?subject=Re:%20${encodeURIComponent(s.subject)}`} className="btn btn-primary">
            Responder por correo
          </a>
        </div>
      </div>
    </div>
  );
}
