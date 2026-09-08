import Link from "next/link";
import { Isologo } from "@/components/isologo";
import { whatsappUrl } from "@/config/site";

// Iconos inline (líneas). No usamos librería.
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5A6.5 6.5 0 0 0 2.35 11.3L1.5 14.5l3.28-.84A6.5 6.5 0 1 0 8 1.5Zm3.7 8.86c-.16.44-.94.85-1.3.9-.34.05-.77.07-1.24-.08a11.4 11.4 0 0 1-1.13-.42 8.86 8.86 0 0 1-3.4-3.02c-.25-.34-.68-.94-.68-1.79 0-.85.44-1.27.6-1.44.16-.17.35-.22.47-.22h.34c.11 0 .26-.04.4.31.16.39.55 1.36.6 1.46.05.11.08.23.02.35-.06.13-.09.2-.17.32-.09.11-.19.25-.27.34-.09.09-.18.19-.08.37.11.19.48.79 1.03 1.28.7.63 1.29.82 1.48.92.19.09.3.08.41-.05.11-.13.47-.55.6-.74.13-.19.25-.16.42-.09.17.06 1.06.5 1.24.59.19.09.31.13.36.21.05.08.05.46-.11.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

const NAV = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="surface-darker border-b border-line-d">
      <div className="container-page flex items-center justify-between gap-6 h-[72px] md:h-[88px]">
        <Link
          href="/"
          className="inline-flex items-center focus-visible:outline-offset-4"
          aria-label="Ir al inicio"
        >
          <Isologo variant="dark" className="h-8 md:h-9 w-auto" />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans uppercase text-eyebrow tracking-[0.16em] text-txt-d hover:text-gold-br transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-dark h-[40px] px-4"
              >
                <IconWhatsApp />
                <span>WhatsApp</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Nav móvil con <details> nativo (sin JS) */}
        <details className="md:hidden group">
          <summary
            aria-label="Abrir menú"
            className="list-none inline-flex items-center justify-center h-11 w-11 text-txt-d cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="group-open:hidden"><IconMenu /></span>
            <span className="hidden group-open:inline"><IconClose /></span>
          </summary>
          <div className="fixed inset-x-0 top-[72px] bg-navy-deep border-t border-line-d z-40">
            <nav aria-label="Principal móvil" className="container-page py-4">
              <ul className="flex flex-col divide-y divide-line-d">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-4 font-sans uppercase text-eyebrow tracking-[0.16em] text-txt-d hover:text-gold-br"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary-dark w-full mt-4"
                  >
                    <IconWhatsApp />
                    <span>WhatsApp</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
