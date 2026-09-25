import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function SectionAbout({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).about;
  return (
    <section
      id="nosotros"
      className="surface-dark-2 section-y scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div className="container-page">
        <div className="grid-editorial">
          <div>
            <p className="eyebrow text-gold">
              <span className="rule rule-on-dark" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2
              id="about-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-d"
            >
              {t.title}
            </h2>
          </div>

          <div className="text-body text-txt-d">
            {t.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "mt-5 text-mut-d"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
