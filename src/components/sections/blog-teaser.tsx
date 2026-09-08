import Link from "next/link";

// Placeholder: en Fase 4 estos vendrán de la DB (últimos 3 PUBLISHED).
type TeaserPost = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
};

const teasers: TeaserPost[] = [
  {
    category: "Regulación",
    date: "[FECHA]",
    title: "Marco regulatorio de los juegos de azar en Bolivia",
    excerpt: "Condiciones normativas, autorizaciones y obligaciones de un proyecto de juego.",
    href: "/blog",
  },
  {
    category: "Juego responsable",
    date: "[FECHA]",
    title: "Cómo estructurar un programa de prevención de la ludopatía",
    excerpt: "Componentes mínimos, responsables internos y evidencia documental exigible.",
    href: "/blog",
  },
  {
    category: "Tributario y aduanero",
    date: "[FECHA]",
    title: "Importación de máquinas de juego: clasificación arancelaria",
    excerpt: "Dónde se concentran las observaciones aduaneras y cómo anticiparlas.",
    href: "/blog",
  },
];

export function SectionBlogTeaser() {
  return (
    <section className="surface-dark section-y" aria-labelledby="blog-title">
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
          {teasers.map((post) => (
            <li key={post.title}>
              <Link href={post.href} className="group block h-full">
                <div className="aspect-[16/10] bg-navy-deep border border-line-d flex items-center justify-center">
                  <span className="eyebrow text-mut-d">[ Imagen referencial ]</span>
                </div>
                <div className="pt-5">
                  <p className="eyebrow text-gold">
                    {post.category} · {post.date}
                  </p>
                  <h3 className="mt-3 font-sans font-bold text-[19px] leading-[1.25] text-txt-d group-hover:text-gold-br">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-mut-d">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
