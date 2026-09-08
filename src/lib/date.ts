export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
