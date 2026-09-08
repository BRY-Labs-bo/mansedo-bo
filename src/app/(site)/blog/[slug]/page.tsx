import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, readingTime } from "@/lib/date";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { site } from "@/config/site";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || post.status !== "PUBLISHED") {
    return { title: "Artículo no encontrado" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || post.status !== "PUBLISHED") notFound();

  const [html, related] = await Promise.all([
    renderMarkdown(post.content),
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

  const minutes = readingTime(post.content);

  return (
    <main id="contenido">
      {/* Encabezado navy */}
      <section className="surface-darker" aria-labelledby="article-title">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Migajas" className="eyebrow text-gold">
            <Link href="/blog" className="hover:text-gold-br">Blog</Link>
            <span className="mx-2 text-mut-d">/</span>
            <Link
              href={`/blog?categoria=${post.category.slug}`}
              className="hover:text-gold-br"
            >
              {post.category.name}
            </Link>
          </nav>
          <h1
            id="article-title"
            className="mt-6 font-sans font-extrabold text-[34px] md:text-[46px] leading-[1.08] text-txt-d max-w-[820px]"
          >
            {post.title}
          </h1>
          <p className="mt-6 text-lead text-mut-d max-w-[720px]">{post.excerpt}</p>
          <p className="mt-8 text-body-sm text-mut-d">
            {post.publishedAt ? formatDate(post.publishedAt) : "[FECHA]"} · {post.author} ·{" "}
            {minutes} min de lectura
          </p>
        </div>
      </section>

      {/* Cover */}
      <section className="bg-paper">
        <div className="container-page pt-10 md:pt-14">
          <PostCover
            assetId={post.coverAssetId}
            src={post.coverImage}
            alt={post.title}
            aspect="16/8"
            priority
          />
        </div>
      </section>

      {/* Cuerpo */}
      <section className="surface-light">
        <div className="container-page py-12 md:py-16">
          <article
            className="prose-article mx-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Etiquetas */}
          <div className="max-w-read mx-auto mt-12 pt-6 border-t border-line-l">
            <p className="eyebrow text-mut-l">
              Etiquetas ·{" "}
              <Link
                href={`/blog?categoria=${post.category.slug}`}
                className="text-gold-txt hover:text-gold-ink"
              >
                {post.category.name}
              </Link>
            </p>
          </div>

          {/* CTA embedido */}
          <div className="max-w-read mx-auto mt-10 bg-navy-deep text-txt-d p-8 md:p-10">
            <h2 className="font-sans font-bold text-[22px] leading-[1.2]">
              ¿Tiene un proyecto en evaluación o una operación en marcha?
            </h2>
            <p className="mt-3 text-body text-mut-d">
              Comuníquese con uno de nuestros especialistas para recibir asesoramiento
              según las necesidades de su empresa.
            </p>
            <Link href="/#contacto" className="btn btn-primary mt-6">
              Contacte a un especialista
            </Link>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="surface-light border-t border-line-l" aria-labelledby="related-title">
          <div className="container-page py-14 md:py-20">
            <p className="eyebrow text-gold-ink">
              <span className="rule" aria-hidden="true" />
              Publicaciones relacionadas
            </p>
            <h2 id="related-title" className="sr-only">Publicaciones relacionadas</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <PostCard
                    href={`/blog/${r.slug}`}
                    category={r.category.name}
                    publishedAt={r.publishedAt}
                    title={r.title}
                    excerpt={r.excerpt}
                    coverImage={r.coverImage}
                    coverAssetId={r.coverAssetId}
                    variant="light"
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
