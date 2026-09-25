import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

export function SectionCtaBanner({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).ctaBanner;
  return (
    <section className="surface-darker border-y border-line-d" aria-labelledby="cta-title">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2
              id="cta-title"
              className="font-sans font-extrabold text-[28px] md:text-[36px] leading-[1.1] text-txt-d"
            >
              {t.title[0]}
              <br className="hidden md:block" /> {t.title[1]}
            </h2>
            <p className="mt-4 text-body text-mut-d max-w-[560px]">{t.body}</p>
          </div>
          <div>
            <Link href={href("/#contacto", lang)} className="btn btn-primary w-full md:w-auto">
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
