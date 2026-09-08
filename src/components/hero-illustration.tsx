// Ilustración del hero. Interpretación libre del PDF (Board 1):
// ruleta grande con segmentos + cruz central, naipes con pica visible,
// fichas apiladas y trayectoria de apuesta deportiva. Trazos gold-ink
// sobre navy, sin sombras ni gradientes.

type Props = { className?: string };

const STROKE = "#9A7530";   // gold-ink — trazos más apagados como en el PDF
const ACCENT = "#C6A15B";   // gold — puntos y bolita destacada

export function HeroIllustration({ className }: Props) {
  // 36 segmentos exteriores (como una ruleta real)
  const segments = Array.from({ length: 36 }, (_, i) => {
    const a = (i * Math.PI * 2) / 36;
    const x1 = Math.cos(a) * 178;
    const y1 = Math.sin(a) * 178;
    const x2 = Math.cos(a) * 200;
    const y2 = Math.sin(a) * 200;
    return <line key={`seg-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  // 12 radios internos entre el anillo medio y el aspa
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12;
    const x1 = Math.cos(a) * 60;
    const y1 = Math.sin(a) * 60;
    const x2 = Math.cos(a) * 140;
    const y2 = Math.sin(a) * 140;
    return <line key={`sp-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.55" />;
  });

  return (
    <svg
      viewBox="0 0 620 500"
      className={className}
      role="img"
      aria-label="Ilustración: ruleta, fichas, naipes y trayectoria de apuesta deportiva"
    >
      <title>Elementos de la industria del juego</title>

      <g
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* Trayectoria punteada al fondo */}
        <path
          d="M 20 460 Q 160 350 280 380 T 560 260"
          strokeDasharray="3 6"
          opacity="0.55"
        />
        {/* Puntos y flecha final de la trayectoria */}
        <circle cx="20"  cy="460" r="3" fill={ACCENT} stroke="none" />
        <circle cx="280" cy="380" r="3" fill={ACCENT} stroke="none" />
        <circle cx="560" cy="260" r="4" fill={ACCENT} stroke="none" />
        <path d="M 550 252 L 560 260 L 550 268" />

        {/* Ruleta grande, centrada-derecha */}
        <g transform="translate(400 220)">
          {/* Anillos externos */}
          <circle r="200" opacity="0.35" />
          <circle r="178" />
          {segments}
          {/* Anillo intermedio */}
          <circle r="140" opacity="0.7" />
          {spokes}
          {/* Círculo interior con la cruz */}
          <circle r="60" />
          <line x1="-60" y1="0" x2="60" y2="0" />
          <line x1="0" y1="-60" x2="0" y2="60" />
          {/* Núcleo */}
          <circle r="18" />
          <circle r="6" fill={ACCENT} stroke="none" />
          {/* Bolita "jugadora" */}
          <circle cx="130" cy="-95" r="5" fill={ACCENT} stroke="none" />
        </g>

        {/* Naipes en abanico, abajo del centro-derecha */}
        <g transform="translate(300 400)">
          {/* Naipe trasero */}
          <rect
            x="-30"
            y="-70"
            width="80"
            height="115"
            transform="rotate(-14)"
            opacity="0.5"
          />
          {/* Naipe medio */}
          <rect
            x="-20"
            y="-70"
            width="80"
            height="115"
            transform="rotate(-4)"
            opacity="0.75"
          />
          {/* Naipe frontal (con pica dentro) */}
          <g transform="rotate(8)">
            <rect x="-10" y="-70" width="80" height="115" />
            {/* Pica centrada dentro del naipe frontal */}
            <g transform="translate(30 -12)">
              <path
                d="
                  M 0 -22
                  C 14 -8, 22 4, 12 14
                  C 6 18, 2 18, 0 16
                  C -2 18, -6 18, -12 14
                  C -22 4, -14 -8, 0 -22 Z
                "
                fill={STROKE}
                stroke="none"
                opacity="0.9"
              />
              <path
                d="M -6 14 L 6 14 L 3 24 L -3 24 Z"
                fill={STROKE}
                stroke="none"
                opacity="0.9"
              />
            </g>
          </g>
        </g>

        {/* Fichas apiladas, abajo del centro-izquierda */}
        <g transform="translate(200 420)">
          <ellipse cx="0" cy="0"   rx="50" ry="12" />
          <ellipse cx="0" cy="-8"  rx="50" ry="12" />
          <ellipse cx="0" cy="-16" rx="50" ry="12" />
          <ellipse cx="0" cy="-24" rx="50" ry="12" />
          {/* Costados de la pila */}
          <line x1="-50" y1="-24" x2="-50" y2="0" />
          <line x1="50"  y1="-24" x2="50"  y2="0" />
          {/* Borde interior de la ficha superior */}
          <ellipse cx="0" cy="-24" rx="34" ry="8" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}
