import { remark } from "remark";
import remarkHtml from "remark-html";

// Render server-side de Markdown a HTML. Sin sanitize adicional: los posts
// entran únicamente por el admin autenticado, no por usuario público.
export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(md);
  return String(file);
}
