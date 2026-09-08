import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/blog/post-card";
import { formatDate } from "@/lib/date";
import { site } from "@/config/site";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Blog — Análisis y novedades del sector",
  description:
    "Noticias, novedades regulatorias, análisis técnicos, artículos y estudios especializados sobre lotería, juegos de azar y sorteos.",
  alternates: { canonical: `${site.url}/blog` },
};

type SearchParams = Promise<{ categoria?: string; page?: string }>;

export default async function BlogListPage({ searchParams }: { searchParams: SearchParams }) {
  const { categoria, page: pageStr } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageStr ?? "1", 10) || 1);

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const activeCategory = categoria ? categories.find((c) => c.slug === categoria) : null;

  const where = {
    status: "PUBLISHED" as const,
    ...(activeCategory ? { categoryId: activeCategory.id } : {}),
  };

  const [total, featured, posts] = await Promise.all([
    prisma.post.count({ where }),
    // Destacado (siempre el más reciente destacado publicado; sin filtro por categoría)
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

  // Si hay destacado y estamos en página 1 sin filtro, excluirlo de la grilla para no duplicar
  const gridPosts = !activeCategory && page === 1 && featured
    ? posts.filter((p) => p.id !== featured.id)
    : posts;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main id="contenido">
      {/* Encabezado navy */}
      <section className="surface-darker section-y" aria-labelledby="blog-title">
        <div className="container-page">
          <p className="eyebrow text-gold">
            <span className="rule rule-on-dark" aria-hidden="true" />
            Publicaciones
          </p>
          <h1
            id="blog-title"
            className="font-sans font-extrabold text-display-2 md:text-display-1 leading-[1.02] mt-4 text-txt-d"
          >
            ANÁLISIS Y NOVEDADES DEL SECTOR
          </h1>
          <p className="mt-6 text-body text-mut-d max-w-[720px]">
            Noticias, novedades regulatorias, análisis técnicos, artículos y estudios
            especializados sobre lotería, juegos de azar y sorteos: tendencias del
            sector, regulación nacional e internacional, innovación tecnológica, juego
            responsable, gestión y control de operaciones, prevención de riesgos y
            tributación.
          </p>
        </div>
      </section>

      {/* Filtro de categorías */}
      <nav aria-label="Categorías" className="bg-paper border-b border-line-l">
        <div className="container-page py-4 overflow-x-auto">
          <ul className="flex flex-nowrap items-center gap-2">
            <li>
              <Link
                href="/blog"
                className={`inline-block px-4 h-10 leading-10 font-sans uppercase text-eyebrow tracking-[0.16em] border ${
                  !activeCategory
                    ? "bg-navy-deep text-txt-d border-navy-deep"
                    : "bg-transparent text-txt-l border-line-l hover:border-gold-ink"
                }`}
              >
                Todas
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/blog?categoria=${c.slug}`}
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

      {/* Listado */}
      <section className="surface-light section-y">
        <div className="container-page">
          {total === 0 && (
            <p className="text-body text-mut-l">
              No hay publicaciones disponibles{activeCategory ? ` en “${activeCategory.name}”` : ""}.
            </p>
          )}

          {/* Destacado (sólo en página 1 sin filtro) */}
          {featured && !activeCategory && page === 1 && (
            <article className="grid md:grid-cols-2 border border-line-l bg-surface mb-12">
              <div className="bg-navy-deep aspect-[16/11] md:aspect-auto flex items-start justify-start p-5">
                <span className="inline-block bg-gold text-navy-deep px-3 py-1 font-sans uppercase text-eyebrow tracking-[0.16em]">
                  Destacado
                </span>
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <p className="eyebrow text-gold-txt">
                  {featured.category.name} ·{" "}
                  {featured.publishedAt ? formatDate(featured.publishedAt) : "[FECHA]"}
                </p>
                <h2 className="mt-4 font-sans font-bold text-[26px] md:text-[30px] leading-[1.15] text-txt-l">
                  <Link href={`/blog/${featured.slug}`} className="hover:text-gold-ink">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-body text-mut-l">{featured.excerpt}</p>
                <p className="mt-6">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="font-sans uppercase text-eyebrow tracking-[0.16em] text-gold-txt hover:text-gold-ink"
                  >
                    Leer artículo →
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
                    href={`/blog/${p.slug}`}
                    category={p.category.name}
                    publishedAt={p.publishedAt}
                    title={p.title}
                    excerpt={p.excerpt}
                    variant="light"
                  />
                </li>
              ))}
            </ul>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <nav aria-label="Paginación" className="mt-12">
              <ul className="flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1;
                  const params = new URLSearchParams();
                  if (activeCategory) params.set("categoria", activeCategory.slug);
                  if (n > 1) params.set("page", String(n));
                  const href = `/blog${params.toString() ? `?${params.toString()}` : ""}`;
                  const current = n === page;
                  return (
                    <li key={n}>
                      <Link
                        href={href}
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
