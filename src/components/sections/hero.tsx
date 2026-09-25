import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 6h13M10 1l4 5-4 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function SectionHero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).hero;
  return (
    <section className="surface-dark border-b border-line-d" aria-labelledby="hero-title">
      <div className="container-page py-16 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 items-center">
          <div>
            <h1
              id="hero-title"
              className="font-sans font-extrabold text-[42px] leading-[1.03] md:text-display-1 text-txt-d"
            >
              {t.title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.title.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <span aria-hidden="true" className="mt-8 inline-block h-px w-10 bg-gold" />

            <p className="mt-4 text-lead text-gold max-w-[520px]">{t.lead}</p>

            <p className="mt-5 text-body text-mut-d max-w-[520px]">{t.secondary}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href={href("/#contacto", lang)} className="btn btn-primary">
                <span>{t.ctaPrimary}</span>
                <ArrowRight />
              </Link>
              <Link href={href("/#servicios", lang)} className="btn btn-secondary-dark">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
