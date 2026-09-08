// Iconos inline en trazos gold-br sobre oscuro (currentColor).
// Formato uniforme: 40x40, stroke 1.25, sin sombra.

import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export function IconCasino(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="10" width="28" height="20" />
      <path d="M6 16h28" />
      <circle cx="13" cy="23" r="2" />
      <circle cx="27" cy="23" r="2" />
      <path d="M20 12v-4M18 6h4" />
    </svg>
  );
}

export function IconMachine(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="6" width="22" height="28" />
      <rect x="12" y="10" width="16" height="10" />
      <path d="M15 15h2M19 15h2M23 15h2" />
      <rect x="12" y="24" width="4" height="4" />
      <rect x="18" y="24" width="4" height="4" />
      <rect x="24" y="24" width="4" height="4" />
    </svg>
  );
}

export function IconLottery(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="20" cy="20" r="12" />
      <circle cx="20" cy="20" r="4" />
      <path d="M20 8v4M20 28v4M8 20h4M28 20h4" />
    </svg>
  );
}

export function IconSports(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="20" cy="20" r="12" />
      <path d="M20 8l3 6-3 6-3-6 3-6zM20 20l7 3-1 6-7-3 1-6zM20 20l-7 3 1 6 7-3-1-6z" />
    </svg>
  );
}

export function IconOnline(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="8" width="30" height="20" />
      <path d="M14 32h12M20 28v4" />
      <path d="M13 15l3 3-3 3M27 15l-3 3 3 3M22 14l-4 10" />
    </svg>
  );
}

// Iconos para los 4 bloques de Servicios (gold-br)
export function IconDev(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 32V14l12-6 12 6v18" />
      <path d="M14 32V20h12v12" />
      <path d="M20 20v12" />
    </svg>
  );
}

export function IconLaunch(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 24l16-16M24 8h4v4M28 24v6a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function IconOps(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="20" cy="20" r="4" />
      <path d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M30 10l-3 3M10 30l3-3" />
    </svg>
  );
}

export function IconTax(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="6" width="22" height="28" />
      <path d="M13 12h12M13 17h12M13 22h8M13 27h6" />
    </svg>
  );
}
