import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div className="min-h-screen bg-paper text-txt-l">
      <header className="bg-navy-deep text-txt-d border-b border-line-d">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-14 flex items-center justify-between gap-6">
          <Link href="/admin" className="font-sans uppercase text-eyebrow tracking-[0.16em] text-txt-d">
            Admin · MANSEDO
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/admin/posts"
                  className="font-sans uppercase text-eyebrow tracking-[0.16em] text-mut-d hover:text-txt-d"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/contactos"
                  className="font-sans uppercase text-eyebrow tracking-[0.16em] text-mut-d hover:text-txt-d"
                >
                  Contactos
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  target="_blank"
                  className="font-sans uppercase text-eyebrow tracking-[0.16em] text-mut-d hover:text-txt-d"
                >
                  Ver sitio ↗
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {session && <span className="text-body-sm text-mut-d hidden sm:inline">{session.email}</span>}
            {session && (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="font-sans uppercase text-eyebrow tracking-[0.16em] text-mut-d hover:text-gold-br"
                >
                  Salir
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1180px] px-5 md:px-8 py-8">{children}</main>
    </div>
  );
}
