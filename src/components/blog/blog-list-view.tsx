import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { formatDate } from "@/lib/date";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

const PAGE_SIZE = 6;

type Props = {
  lang: Locale;
  searchParams: { categoria?: string; page?: string };
};

export async function BlogListView({ lang, searchParams }: Props) {
  const t = getDictionary(lang).blog;
  const { categoria, page: pageStr } = searchParams;
  const page = Math.max(1, Number.parseInt(pageStr ?? "1", 10) || 1);

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const activeCategory = categoria ? categories.find((c) => c.slug === categoria) : null;

  const where = {
    status: "PUBLISHED" as const,
    ...(activeCategory ? { categoryId: activeCategory.id } : {}),
  };

  const [total, featured, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findFirst({
      where: { status: "PUBLISHED", featured: true },
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }),
    prisma.post.findMany({
      where,
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const gridPosts = !activeCategory && page === 1 && featured
    ? posts.filter((p) => p.id !== featured.id)
    : posts;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Helper: elige el texto en el idioma del sitio con fallback a español.
  const pick = <T,>(en: T | null | undefined, es: T): T => (lang === "en" && en ? en : es);

  const blogBase = href("/blog", lang);
  const catHref = (slug: string) =>
    slug ? `${blogBase}?categoria=${slug}` : blogBase;

  return (
    <main id="contenido">
      <section className="surface-darker section-y" aria-labelledby="blog-title">
        <div className="container-page">
          <p className="eyebrow text-gold">
            <span className="rule rule-on-dark" aria-hidden="true" />
            {t.pageEyebrow}
          </p>
          <h1
            id="blog-title"
            className="font-sans font-extrabold text-display-2 md:text-display-1 leading-[1.02] mt-4 text-txt-d"
          >
            {t.pageTitle}
          </h1>
          <p className="mt-6 text-body text-mut-d max-w-[720px]">{t.pageLead}</p>
        </div>
      </section>

      <nav aria-label={t.pageEyebrow} className="bg-paper border-b border-line-l">
        <div className="container-page py-4 overflow-x-auto">
          <ul className="flex flex-nowrap items-center gap-2">
            <li>
              <Link
                href={blogBase}
                className={`inline-block px-4 h-10 leading-10 font-sans uppercase text-eyebrow tracking-[0.16em] border ${
                  !activeCategory
                    ? "bg-navy-deep text-txt-d border-navy-deep"
                    : "bg-transparent text-txt-l border-line-l hover:border-gold-ink"
                }`}
              >
                {t.filterAll}
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={catHref(c.slug)}
                  className={`inline-block px-4 h-10 leading-10 font-sans uppercase text-eyebrow tracking-[0.16em] border ${
                    activeCategory?.id === c.id
                      ? "bg-navy-deep text-txt-d border-navy-deep"
                      : "bg-transparent text-txt-l border-line-l hover:border-gold-ink"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="surface-light section-y">
        <div className="container-page">
          {total === 0 && (
            <p className="text-body text-mut-l">
              {activeCategory ? t.emptyInCategory(activeCategory.name) : `${t.empty}.`}
            </p>
          )}

          {featured && !activeCategory && page === 1 && (
            <article className="grid md:grid-cols-2 border border-line-l bg-surface mb-12">
              <div className="relative">
                <PostCover
                  assetId={featured.coverAssetId}
                  src={featured.coverImage}
                  alt={pick(featured.titleEn, featured.title)}
                  aspect="3/2"
                  priority
                />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-gold text-navy-deep px-3 py-1 font-sans uppercase text-eyebrow tracking-[0.16em]">
                  {t.featuredBadge}
                </span>
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <p className="eyebrow text-gold-txt">
                  {featured.category.name} ·{" "}
                  {featured.publishedAt ? formatDate(featured.publishedAt, lang) : "[FECHA]"}
                </p>
                <h2 className="mt-4 font-sans font-bold text-[26px] md:text-[30px] leading-[1.15] text-txt-l">
                  <Link
                    href={href(`/blog/${featured.slug}`, lang)}
                    className="hover:text-gold-ink"
                  >
                    {pick(featured.titleEn, featured.title)}
                  </Link>
                </h2>
                <p className="mt-4 text-body text-mut-l">
                  {pick(featured.excerptEn, featured.excerpt)}
                </p>
                <p className="mt-6">
                  <Link
                    href={href(`/blog/${featured.slug}`, lang)}
                    className="font-sans uppercase text-eyebrow tracking-[0.16em] text-gold-txt hover:text-gold-ink"
                  >
                    {t.readArticle}
                  </Link>
                </p>
              </div>
            </article>
          )}

          {gridPosts.length > 0 && (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((p) => (
                <li key={p.id}>
                  <PostCard
                    href={href(`/blog/${p.slug}`, lang)}
                    category={p.category.name}
                    publishedAt={p.publishedAt}
                    title={pick(p.titleEn, p.title)}
                    excerpt={pick(p.excerptEn, p.excerpt)}
                    coverImage={p.coverImage}
                    coverAssetId={p.coverAssetId}
                    variant="light"
                    lang={lang}
                  />
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav aria-label={t.paginationLabel} className="mt-12">
              <ul className="flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  const params = new URLSearchParams();
                  if (activeCategory) params.set("categoria", activeCategory.slug);
                  if (n > 1) params.set("page", String(n));
                  const pageHref = `${blogBase}${params.toString() ? `?${params.toString()}` : ""}`;
                  const current = n === page;
                  return (
                    <li key={n}>
                      <Link
                        href={pageHref}
                        aria-current={current ? "page" : undefined}
                        className={`inline-flex items-center justify-center min-w-10 h-10 px-3 font-sans uppercase text-eyebrow tracking-[0.16em] border ${
                          current
                            ? "bg-navy-deep text-txt-d border-navy-deep"
                            : "bg-transparent text-txt-l border-line-l hover:border-gold-ink"
                        }`}
                      >
                        {n}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
