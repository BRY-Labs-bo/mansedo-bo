import type { Locale } from "@/i18n/config";

const LOCALE_MAP: Record<Locale, string> = {
  es: "es-BO",
  en: "en-US",
};

export function formatDate(date: Date | string, locale: Locale = "es"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? "es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
