import type { ComponentType, SVGProps } from "react";
import { IconDev, IconLaunch, IconOps, IconTax } from "@/components/icons";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const ICONS: Array<ComponentType<SVGProps<SVGSVGElement>>> = [
  IconDev,
  IconLaunch,
  IconOps,
  IconTax,
];

export function SectionServices({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).services;
  return (
    <section
      id="servicios"
      className="surface-light section-y scroll-mt-24"
      aria-labelledby="services-title"
    >
      <div className="container-page">
        {/* Encabezado */}
        <div className="grid-editorial">
          <div>
            <p className="eyebrow text-gold-ink">
              <span className="rule" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2
              id="services-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-l"
            >
              {t.title}
            </h2>
          </div>
          <div className="text-body text-txt-l">
            <p>{t.intro}</p>
            <p className="mt-5 text-mut-l">{t.introSecondary}</p>
          </div>
        </div>

        {/* Bloques */}
        <div className="mt-16 md:mt-20 divide-y divide-line-l border-t border-line-l">
          {t.blocks.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <article key={s.number} className="py-12 md:py-16">
                <div className="grid-editorial">
                  <div>
                    <div className="flex items-start gap-4">
                      <span className="font-sans font-bold text-h-block text-gold-ink">
                        {s.number}
                      </span>
                      {Icon && <Icon className="text-gold-ink mt-1" />}
                    </div>
                    <h3 className="mt-4 font-sans font-bold text-h-block text-txt-l uppercase tracking-tight">
                      {s.title}
                    </h3>
                    {s.subtitle && (
                      <p className="mt-2 text-body-sm text-mut-l uppercase tracking-[0.14em]">
                        {s.subtitle}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-body text-txt-l">{s.paragraph}</p>
                    <ul className="diamond-list mt-6 grid md:grid-cols-2 gap-x-8 gap-y-2 text-body-sm text-txt-l">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
