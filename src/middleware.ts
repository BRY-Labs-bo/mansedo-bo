import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "mansedo_session";
const LOCALE_COOKIE = "mansedo_locale";
const ALG = "HS256";

// Locales soportados. Mantener en sync con src/i18n/config.ts. El middleware
// no puede importar del src/i18n porque a veces corre en el edge runtime y
// TypeScript nos avisaría de un ciclo — así que replico las constantes acá.
const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "es";

// ---------------------------------------------------------------
// Auth
// ---------------------------------------------------------------
async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: [ALG] });
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------
// i18n
// ---------------------------------------------------------------
function pickLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  // Parseo simple: "en-US,en;q=0.9,es;q=0.8" → ["en", "es"]
  const preferred = acceptLanguage
    .split(",")
    .map((v) => v.split(";")[0].trim().toLowerCase().split("-")[0])
    .filter(Boolean);
  for (const p of preferred) {
    if ((LOCALES as readonly string[]).includes(p)) return p as Locale;
  }
  return DEFAULT_LOCALE;
}

function pathHasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/").filter(Boolean)[0];
  return !!first && (LOCALES as readonly string[]).includes(first);
}

// ---------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ------- Auth para /admin -------
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!(await isValidSession(token))) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ------- i18n redirect en primera visita -------
  // Si el path ya trae prefijo de locale (/en/*) no hacemos nada.
  // Si no lo trae, chequeamos: cookie explícita > header Accept-Language > default.
  if (!pathHasLocalePrefix(pathname)) {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
    const chosen = cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : pickLocaleFromHeader(req.headers.get("accept-language"));

    // Si el elegido es distinto del default, redirijo agregando el prefijo.
    if (chosen !== DEFAULT_LOCALE) {
      const url = req.nextUrl.clone();
      url.pathname = `/${chosen}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Matcher: excluir _next/static, _next/image, api de media pública, favicon,
// robots, sitemap y todo lo que tenga extensión (archivos estáticos).
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|fonts|.*\\..*).*)"],
};
