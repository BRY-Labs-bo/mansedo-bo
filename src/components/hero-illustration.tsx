// Ilustración del hero. Interpretación libre del PDF (Board 1):
// ruleta grande con segmentos + cruz central + anillos concéntricos,
// naipes con pica visible, fichas apiladas y trayectoria de apuesta
// deportiva. Trazos gold-ink sobre navy, sin sombras ni gradientes.

type Props = { className?: string };

const STROKE = "#9A7530"; // gold-ink — trazo principal
const STROKE_2 = "#B48947"; // gold apenas más claro para anillos secundarios
const ACCENT = "#C6A15B"; // gold — puntos, bolita, flecha

export function HeroIllustration({ className }: Props) {
  // 36 segmentos del anillo exterior (como una ruleta real)
  const segments = Array.from({ length: 36 }, (_, i) => {
    const a = (i * Math.PI * 2) / 36;
    const x1 = Math.cos(a) * 232;
    const y1 = Math.sin(a) * 232;
    const x2 = Math.cos(a) * 260;
    const y2 = Math.sin(a) * 260;
    return <line key={`seg-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  // 12 radios internos
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12;
    const x1 = Math.cos(a) * 80;
    const y1 = Math.sin(a) * 80;
    const x2 = Math.cos(a) * 180;
    const y2 = Math.sin(a) * 180;
    return <line key={`sp-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.6" />;
  });

  return (
    <svg
      viewBox="0 0 720 620"
      className={className}
      role="img"
      aria-label="Ilustración: ruleta, fichas, naipes y trayectoria de apuesta deportiva"
    >
      <title>Elementos de la industria del juego</title>

      <g
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* Trayectoria punteada al fondo */}
        <path
          d="M 20 570 Q 180 430 320 470 T 660 300"
          stroke={STROKE}
          strokeWidth="1.2"
          strokeDasharray="3 7"
          opacity="0.55"
        />
        {/* Puntos y flecha de la trayectoria */}
        <circle cx="20"  cy="570" r="4" fill={ACCENT} />
        <circle cx="320" cy="470" r="4" fill={ACCENT} />
        <circle cx="660" cy="300" r="5" fill={ACCENT} />
        <path
          d="M 650 291 L 660 300 L 650 309"
          stroke={ACCENT}
          strokeWidth="1.5"
        />

        {/* Ruleta grande, centrada-derecha */}
        <g
          transform="translate(460 260)"
          stroke={STROKE}
          strokeWidth="1.15"
        >
          {/* Anillo más externo (sutil) */}
          <circle r="260" stroke={STROKE_2} opacity="0.35" />
          {/* Anillo con segmentos */}
          <circle r="232" />
          {segments}
          {/* Círculo intermedio */}
          <circle r="180" opacity="0.75" />
          {/* Radios internos */}
          {spokes}
          {/* Anillo interno */}
          <circle r="80" />
          {/* Cruz central */}
          <line x1="-80" y1="0"   x2="80"  y2="0"   />
          <line x1="0"   y1="-80" x2="0"   y2="80"  />
          {/* Núcleo */}
          <circle r="22" />
          <circle r="8" fill={ACCENT} stroke="none" />
          {/* Bolita "jugadora" en el borde exterior */}
          <circle cx="170" cy="-125" r="6" fill={ACCENT} stroke="none" />
        </g>

        {/* Naipes en abanico, superponiéndose al borde de la ruleta */}
        <g
          transform="translate(360 500)"
          stroke={STROKE}
          strokeWidth="1.15"
        >
          <rect
            x="-36"
            y="-84"
            width="96"
            height="138"
            transform="rotate(-14)"
            opacity="0.55"
          />
          <rect
            x="-24"
            y="-84"
            width="96"
            height="138"
            transform="rotate(-4)"
            opacity="0.8"
          />
          {/* Naipe frontal con pica dentro */}
          <g transform="rotate(8)">
            <rect x="-12" y="-84" width="96" height="138" />
            <g transform="translate(36 -14)">
              <path
                d="M 0 -26 C 17 -10, 26 5, 14 17 C 8 21, 4 21, 0 19 C -4 21, -8 21, -14 17 C -26 5, -17 -10, 0 -26 Z"
                fill={STROKE}
                stroke="none"
                opacity="0.92"
              />
              <path
                d="M -8 17 L 8 17 L 4 29 L -4 29 Z"
                fill={STROKE}
                stroke="none"
                opacity="0.92"
              />
            </g>
          </g>
        </g>

        {/* Fichas apiladas, abajo-izquierda */}
        <g
          transform="translate(220 520)"
          stroke={STROKE}
          strokeWidth="1.15"
        >
          <ellipse cx="0" cy="0"   rx="60" ry="14" />
          <ellipse cx="0" cy="-10" rx="60" ry="14" />
          <ellipse cx="0" cy="-20" rx="60" ry="14" />
          <ellipse cx="0" cy="-30" rx="60" ry="14" />
          {/* Costados de la pila */}
          <line x1="-60" y1="-30" x2="-60" y2="0" />
          <line x1="60"  y1="-30" x2="60"  y2="0" />
          {/* Anillo interno de la ficha superior */}
          <ellipse cx="0" cy="-30" rx="40" ry="10" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}
