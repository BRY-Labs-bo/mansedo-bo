import {
  IconCasino,
  IconMachine,
  IconLottery,
  IconSports,
  IconOnline,
} from "@/components/icons";

const modes = [
  { label: "Casinos y salas de juego", Icon: IconCasino },
  { label: "Máquinas y mesas", Icon: IconMachine },
  { label: "Loterías y sorteos", Icon: IconLottery },
  { label: "Apuestas deportivas", Icon: IconSports },
  { label: "Juego en línea", Icon: IconOnline },
];

export function SectionModes() {
  return (
    <section className="surface-darker border-b border-line-d" aria-labelledby="modes-title">
      <div className="container-page py-10 md:py-14">
        <h2
          id="modes-title"
          className="eyebrow text-gold text-center"
        >
          Modalidades de juego en las que intervenimos
        </h2>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-6">
          {modes.map(({ label, Icon }) => (
            <li key={label} className="flex flex-col items-center text-center gap-4">
              <Icon className="text-gold-br w-14 h-14" />
              <span className="font-sans uppercase text-eyebrow tracking-[0.16em] text-txt-d">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
