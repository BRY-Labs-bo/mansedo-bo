import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/date";

export const dynamic = "force-dynamic";

export default async function ContactosPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="font-sans font-extrabold text-[28px] leading-[1.15] text-txt-l">
        Solicitudes de contacto
      </h1>
      <p className="mt-2 text-body-sm text-mut-l">
        Últimas 200 consultas. Las no leídas aparecen resaltadas.
      </p>

      <div className="mt-6 border border-line-l bg-surface">
        <table className="w-full text-body-sm">
          <thead className="bg-paper border-b border-line-l">
            <tr className="text-left">
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l"></th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Nombre</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Correo</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Asunto</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l">Recibido</th>
              <th className="p-3 font-sans uppercase tracking-[0.14em] text-eyebrow text-mut-l text-right"></th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-mut-l text-center">
                  Todavía no hay consultas.
                </td>
              </tr>
            )}
            {submissions.map((s) => (
              <tr
                key={s.id}
                className={`border-b border-line-l last:border-b-0 align-top ${
                  s.read ? "" : "bg-gold/5"
                }`}
              >
                <td className="p-3">
                  {!s.read && (
                    <span aria-label="Sin leer" className="inline-block w-2 h-2 bg-gold rotate-45 mt-1" />
                  )}
                </td>
                <td className="p-3">
                  <div className="font-sans font-semibold text-txt-l">{s.name}</div>
                  {s.company && <div className="text-mut-l">{s.company}</div>}
                </td>
                <td className="p-3">
                  <a href={`mailto:${s.email}`} className="text-gold-txt underline underline-offset-2">
                    {s.email}
                  </a>
                  {s.phone && <div className="text-mut-l">{s.phone}</div>}
                </td>
                <td className="p-3">{s.subject}</td>
                <td className="p-3 text-mut-l">{formatDate(s.createdAt)}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/contactos/${s.id}`}
                    className="text-gold-txt underline underline-offset-2"
                  >
                    Abrir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
