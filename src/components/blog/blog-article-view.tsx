import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, readingTime } from "@/lib/date";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

export async function BlogArticleView({ lang, slug }: { lang: Locale; slug: string }) {
  const t = getDictionary(lang).blog;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || post.status !== "PUBLISHED") notFound();

  // Elegir contenido según idioma con fallback y bandera "sólo en español"
  const useEn = lang === "en" && !!post.contentEn;
  const showSpanishOnlyNotice = lang === "en" && !post.contentEn;
  const title = useEn && post.titleEn ? post.titleEn : post.title;
  const excerpt = useEn && post.excerptEn ? post.excerptEn : post.excerpt;
  const content = useEn && post.contentEn ? post.contentEn : post.content;

  const [html, related] = await Promise.all([
    renderMarkdown(content),
    prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        categoryId: post.categoryId,
        NOT: { id: post.id },
      },
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
    }),
  ]);

  const minutes = readingTime(content);
  const pick = <T,>(en: T | null | undefined, es: T): T => (lang === "en" && en ? en : es);

  return (
    <main id="contenido">
      <section className="surface-darker" aria-labelledby="article-title">
        <div className="container-page py-14 md:py-20">
          <nav aria-label={t.breadcrumb} className="eyebrow text-gold">
            <Link href={href("/blog", lang)} className="hover:text-gold-br">
              {t.breadcrumb}
            </Link>
            <span className="mx-2 text-mut-d">/</span>
            <Link
              href={`${href("/blog", lang)}?categoria=${post.category.slug}`}
              className="hover:text-gold-br"
            >
              {post.category.name}
            </Link>
          </nav>
          <h1
            id="article-title"
            className="mt-6 font-sans font-extrabold text-[34px] md:text-[46px] leading-[1.08] text-txt-d max-w-[820px]"
          >
            {title}
          </h1>
          <p className="mt-6 text-lead text-mut-d max-w-[720px]">{excerpt}</p>
          <p className="mt-8 text-body-sm text-mut-d">
            {post.publishedAt ? formatDate(post.publishedAt, lang) : "[FECHA]"}{" "}
            {t.articleMeta.dateAuthorSeparator} {post.author}{" "}
            {t.articleMeta.dateAuthorSeparator} {t.articleMeta.minRead(minutes)}
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page pt-10 md:pt-14">
          <PostCover
            assetId={post.coverAssetId}
            src={post.coverImage}
            alt={title}
            aspect="16/8"
            priority
          />
        </div>
      </section>

      <section className="surface-light">
        <div className="container-page py-12 md:py-16">
          {showSpanishOnlyNotice && t.onlySpanishNotice && (
            <div
              role="note"
              className="max-w-read mx-auto mb-8 border-l-2 border-gold-ink bg-paper p-4 text-body-sm text-txt-l"
            >
              {t.onlySpanishNotice}
            </div>
          )}
          <article
            className="prose-article mx-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="max-w-read mx-auto mt-12 pt-6 border-t border-line-l">
            <p className="eyebrow text-mut-l">
              {t.tags} ·{" "}
              <Link
                href={`${href("/blog", lang)}?categoria=${post.category.slug}`}
                className="text-gold-txt hover:text-gold-ink"
              >
                {post.category.name}
              </Link>
            </p>
          </div>

          <div className="max-w-read mx-auto mt-10 bg-navy-deep text-txt-d p-8 md:p-10">
            <h2 className="font-sans font-bold text-[22px] leading-[1.2]">
              {t.embeddedCta.title}
            </h2>
            <p className="mt-3 text-body text-mut-d">{t.embeddedCta.body}</p>
            <Link href={href("/#contacto", lang)} className="btn btn-primary mt-6">
              {t.embeddedCta.cta}
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="surface-light border-t border-line-l" aria-labelledby="related-title">
          <div className="container-page py-14 md:py-20">
            <p className="eyebrow text-gold-ink">
              <span className="rule" aria-hidden="true" />
              {t.relatedTitle}
            </p>
            <h2 id="related-title" className="sr-only">
              {t.relatedTitle}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <PostCard
                    href={href(`/blog/${r.slug}`, lang)}
                    category={r.category.name}
                    publishedAt={r.publishedAt}
                    title={pick(r.titleEn, r.title)}
                    excerpt={pick(r.excerptEn, r.excerpt)}
                    coverImage={r.coverImage}
                    coverAssetId={r.coverAssetId}
                    variant="light"
                    lang={lang}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

export async function getArticleMetadata(lang: Locale, slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || post.status !== "PUBLISHED") return null;
  const useEn = lang === "en" && !!post.contentEn;
  return {
    title: useEn && post.titleEn ? post.titleEn : post.title,
    description: useEn && post.excerptEn ? post.excerptEn : post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
  };
}
