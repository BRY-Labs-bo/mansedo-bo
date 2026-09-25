import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/blog/post-card";

// Ahora consulta las 3 últimas publicaciones PUBLISHED. Si no hay DB o no hay
// posts publicados, no rompe el render de la home: retorna null y la sección
// se omite (mejor a mostrar tarjetas placeholder desactualizadas).
export async function SectionBlogTeaser() {
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
              Blog
            </p>
            <h2
              id="blog-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-d"
            >
              ANÁLISIS Y NOVEDADES
            </h2>
            <p className="mt-4 text-body text-mut-d max-w-[640px]">
              Noticias, novedades regulatorias, análisis técnicos y estudios
              especializados sobre lotería, juegos de azar y sorteos.
            </p>
          </div>
          <Link
            href="/blog"
            className="font-sans uppercase text-eyebrow tracking-[0.16em] text-gold hover:text-gold-br"
          >
            Ver todas las publicaciones →
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id}>
              <PostCard
                href={`/blog/${p.slug}`}
                category={p.category.name}
                publishedAt={p.publishedAt}
                title={p.title}
                excerpt={p.excerpt}
                coverImage={p.coverImage}
                coverAssetId={p.coverAssetId}
                variant="dark"
              />
            </li>
          ))}
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
