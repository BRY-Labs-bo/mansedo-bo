"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, stripLocale, localePrefix, type Locale } from "@/i18n/config";

// Selector de idiomas para el header. Client component chico: necesita
// usePathname para saber en qué ruta está y construir el equivalente en el
// otro locale. Al hacer click, guarda la preferencia en cookie para que
// futuras visitas respeten la elección manual sobre el auto-detect.

type Props = {
  current: Locale;
  className?: string;
};

const LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

function setLocaleCookie(locale: Locale) {
  // 1 año de duración; SameSite=Lax para que funcione en navegación normal.
  document.cookie = `mansedo_locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LanguageSwitcher({ current, className = "" }: Props) {
  const pathname = usePathname();
  const canonical = stripLocale(pathname || "/");

  return (
    <div
      role="group"
      aria-label="Cambiar idioma / Change language"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {locales.map((loc, i) => {
        const isActive = loc === current;
        const targetHref = `${localePrefix(loc) || ""}${canonical === "/" ? "/" : canonical}`;
        return (
          <span key={loc} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-mut-d/60">
                |
              </span>
            )}
            {isActive ? (
              <span
                aria-current="true"
                className="font-sans uppercase text-eyebrow tracking-[0.16em] text-gold"
              >
                {LABELS[loc]}
              </span>
            ) : (
              <Link
                href={targetHref}
                onClick={() => setLocaleCookie(loc)}
                className="font-sans uppercase text-eyebrow tracking-[0.16em] text-mut-d hover:text-gold-br transition-colors"
              >
                {LABELS[loc]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
