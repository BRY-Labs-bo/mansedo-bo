// Configuración de idiomas del sitio.
// Escalable a N locales: agregar aquí + crear el diccionario en ./dictionaries.
// El default (es) NO lleva prefijo en la URL; los demás sí (/en, /pt, ...).

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

// Prefijo de URL para un locale. El default (es) devuelve "" (raíz).
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

// Construye una URL absoluta o relativa para un locale.
// href("/blog", "en") → "/en/blog"
// href("/blog", "es") → "/blog"
// href("/#contacto", "en") → "/en/#contacto"
export function href(path: string, locale: Locale): string {
  // Si el path apunta a un ancla pura ("#..."), lo dejo tal cual.
  if (path.startsWith("#")) return path;

  // Separo path y hash.
  const hashIdx = path.indexOf("#");
  const cleanPath = hashIdx >= 0 ? path.slice(0, hashIdx) : path;
  const hash = hashIdx >= 0 ? path.slice(hashIdx) : "";

  const prefix = localePrefix(locale);
  // Normalizo: asegurar que empiece con /
  const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  const full = normalized === "/" ? `${prefix || "/"}` : `${prefix}${normalized}`;
  return `${full}${hash}`;
}

// Dado un pathname, retorna el locale detectado.
export function detectLocale(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) return first;
  return defaultLocale;
}

// Dado un pathname con o sin prefijo, retorna la ruta "canónica" sin prefijo.
// Útil para armar el link del selector de idiomas.
// stripLocale("/en/blog") → "/blog"
// stripLocale("/blog") → "/blog"
export function stripLocale(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) {
    const rest = pathname.slice(`/${first}`.length);
    return rest || "/";
  }
  return pathname || "/";
}
