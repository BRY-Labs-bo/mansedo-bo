import type { SVGProps } from "react";

// Isologo inline (bloque único: pica + wordmark + bajada).
// Sobre fondo claro: variant="light" (gris #47515A).
// Sobre fondo oscuro: variant="dark" (#C6CCD4).
// El wordmark usa Cormorant Garamond cargada globalmente (var --font-cormorant),
// con Times New Roman/serif como fallback. textLength fuerza el ancho para que el
// bloque no se desarme aunque la tipografía tarde en cargar.

type Props = {
  variant?: "light" | "dark";
  className?: string;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "fill" | "children">;

export function Isologo({
  variant = "light",
  className,
  title = "MANSEDO BUSINESS CONSULTING S.R.L.",
  ...rest
}: Props) {
  const color = variant === "dark" ? "#C6CCD4" : "#47515A";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 449 80"
      role="img"
      aria-label={title}
      className={className}
      {...rest}
    >
      <title>{title}</title>
      <g fill={color}>
        <g transform="translate(0,0.7) scale(0.15542) translate(0,502) scale(0.1,-0.1)">
          <path d="M2267 4953 c-24 -27 -89 -97 -142 -158 -175 -196 -239 -268 -300 -335 -78 -86 -280 -303 -325 -350 -141 -149 -375 -394 -424 -444 -187 -194 -428 -448 -467 -491 -24 -27 -61 -68 -82 -91 -73 -80 -181 -220 -250 -324 -167 -253 -257 -527 -257 -785 0 -239 60 -443 186 -631 70 -106 137 -177 238 -253 115 -86 227 -139 388 -183 72 -20 106 -22 268 -22 168 0 194 2 282 26 214 58 380 160 581 357 92 91 141 131 147 125 12 -12 -9 -175 -40 -316 -32 -137 -105 -350 -157 -453 -38 -76 -152 -258 -172 -275 -3 -3 -19 -23 -36 -45 -16 -22 -73 -84 -127 -137 -54 -54 -98 -104 -98 -111 0 -37 3 -37 851 -37 455 0 834 3 843 6 9 3 16 14 16 23 0 9 -51 68 -113 131 -62 63 -133 142 -158 175 -100 134 -192 306 -254 476 -54 150 -124 501 -111 556 7 24 14 18 131 -99 226 -227 406 -332 665 -388 93 -20 122 -22 260 -17 86 3 184 13 220 22 242 58 475 213 614 408 146 205 215 442 203 696 -9 200 -56 371 -150 556 -48 93 -161 284 -176 295 -3 3 -26 32 -51 65 -24 33 -56 74 -71 90 -14 17 -48 55 -74 85 -87 100 -283 307 -533 565 -566 583 -743 770 -1013 1075 -46 52 -111 127 -143 165 -70 83 -84 95 -107 95 -9 0 -37 -21 -62 -47z" />
        </g>
        <text
          x="96"
          y="49"
          textLength="353"
          lengthAdjust="spacing"
          fontFamily="var(--font-cormorant), Cormorant Garamond, Times New Roman, serif"
          fontSize="73"
          fontWeight="600"
        >
          MANSEDO
        </text>
        <text
          x="96"
          y="77"
          textLength="353"
          lengthAdjust="spacing"
          fontFamily="var(--font-cormorant), Cormorant Garamond, Times New Roman, serif"
          fontSize="20"
          fontWeight="500"
        >
          BUSINESS CONSULTING S.R.L.
        </text>
      </g>
    </svg>
  );
}
