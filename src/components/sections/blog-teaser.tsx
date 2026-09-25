import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/blog/post-card";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

// Consulta los 3 últimos posts PUBLISHED. Si la DB falla o no hay contenido,
// no rompe el render: retorna null y la sección se omite.
export async function SectionBlogTeaser({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).blogTeaser;
  let posts: Awaited<ReturnType<typeof loadTeasers>> = [];
  try {
    posts = await loadTeasers();
  } catch {
    posts = [];
  }
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="surface-dark section-y scroll-mt-24"
      aria-labelledby="blog-title"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">
              <span className="rule rule-on-dark" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2
              id="blog-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-d"
            >
              {t.title}
            </h2>
            <p className="mt-4 text-body text-mut-d max-w-[640px]">{t.lead}</p>
          </div>
          <Link
            href={href("/blog", lang)}
            className="font-sans uppercase text-eyebrow tracking-[0.16em] text-gold hover:text-gold-br"
          >
            {t.seeAll}
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p) => {
            const title = lang === "en" && p.titleEn ? p.titleEn : p.title;
            const excerpt = lang === "en" && p.excerptEn ? p.excerptEn : p.excerpt;
            return (
              <li key={p.id}>
                <PostCard
                  href={href(`/blog/${p.slug}`, lang)}
                  category={p.category.name}
                  publishedAt={p.publishedAt}
                  title={title}
                  excerpt={excerpt}
                  coverImage={p.coverImage}
                  coverAssetId={p.coverAssetId}
                  variant="dark"
                  lang={lang}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function loadTeasers() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  });
}
