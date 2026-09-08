// Reinterpretación libre de la ilustración del PDF (Board 1):
// ruleta central, fichas apiladas, naipes en abanico y trayectoria de
// apuesta deportiva. Trazos en gold-br sobre navy. Sin sombras ni gradientes.

type Props = { className?: string };

export function HeroIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 480 380"
      className={className}
      role="img"
      aria-label="Ilustración: ruleta, fichas, naipes y trayectoria de apuesta deportiva"
    >
      <title>Elementos de la industria del juego</title>
      <g fill="none" stroke="#E0C285" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter">
        {/* Ruleta */}
        <g transform="translate(310 130)">
          <circle cx="0" cy="0" r="120" opacity="0.28" />
          <circle cx="0" cy="0" r="102" opacity="0.5" />
          <circle cx="0" cy="0" r="84" />
          <circle cx="0" cy="0" r="58" opacity="0.7" />
          <circle cx="0" cy="0" r="30" />
          <circle cx="0" cy="0" r="6" fill="#E0C285" />
          {/* Radios */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = Math.cos(a) * 30;
            const y1 = Math.sin(a) * 30;
            const x2 = Math.cos(a) * 84;
            const y2 = Math.sin(a) * 84;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.55" />;
          })}
          {/* Bolita */}
          <circle cx="70" cy="-46" r="4" fill="#E0C285" stroke="none" />
        </g>

        {/* Fichas apiladas (abajo-izquierda) */}
        <g transform="translate(70 260)">
          <ellipse cx="0" cy="0" rx="46" ry="12" />
          <ellipse cx="0" cy="-8" rx="46" ry="12" />
          <ellipse cx="0" cy="-16" rx="46" ry="12" />
          <ellipse cx="0" cy="-24" rx="46" ry="12" />
          <line x1="-46" y1="-24" x2="-46" y2="0" />
          <line x1="46" y1="-24" x2="46" y2="0" />
          <ellipse cx="0" cy="-24" rx="30" ry="8" opacity="0.6" />
        </g>

        {/* Naipes en abanico (arriba-izquierda) */}
        <g transform="translate(120 90) rotate(-8)">
          <rect x="-40" y="-52" width="60" height="88" transform="rotate(-14)" opacity="0.6" />
          <rect x="-30" y="-52" width="60" height="88" transform="rotate(-4)" opacity="0.8" />
          <rect x="-20" y="-52" width="60" height="88" transform="rotate(6)" />
          {/* Pica dentro del naipe frontal */}
          <g transform="translate(10 -8) rotate(6)">
            <path d="M0 -18 C 10 -6, 16 4, 8 10 C 2 14, -2 14, -8 10 C -16 4, -10 -6, 0 -18 Z" opacity="0.85" />
            <path d="M-4 10 L 4 10 L 2 18 L -2 18 Z" opacity="0.85" />
          </g>
        </g>

        {/* Trayectoria de apuesta deportiva */}
        <g>
          <path
            d="M20 340 Q 140 200 260 300 T 460 250"
            strokeDasharray="3 5"
            opacity="0.8"
          />
          {/* Puntos de la trayectoria */}
          <circle cx="20" cy="340" r="3" fill="#E0C285" stroke="none" />
          <circle cx="260" cy="300" r="3" fill="#E0C285" stroke="none" />
          <circle cx="460" cy="250" r="3" fill="#E0C285" stroke="none" />
          {/* Flecha final */}
          <path d="M452 244 L 460 250 L 452 256" />
        </g>
      </g>
    </svg>
  );
}
