import { IconCasino, IconMachine, IconLottery, IconOnline } from "@/components/icons";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const ICONS = [IconCasino, IconMachine, IconLottery, IconOnline] as const;

export function SectionModes({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).modes;
  return (
    <section className="surface-darker border-b border-line-d" aria-labelledby="modes-title">
      <div className="container-page py-10 md:py-14">
        <h2 id="modes-title" className="eyebrow text-gold text-center">
          {t.eyebrow}
        </h2>
        <ul className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {t.items.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <li key={label} className="flex flex-col items-center text-center gap-4">
                <Icon className="text-gold-br w-14 h-14" />
                <span className="font-sans uppercase text-eyebrow tracking-[0.16em] text-txt-d">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
