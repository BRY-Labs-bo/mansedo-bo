// Cubierta para artículos del blog.
// Prioridad: assetId (imagen alojada en la propia DB) → src (URL externa
// legacy) → motivo de marca (SVG con la pica del isologo).

type Props = {
  assetId?: string | null;
  src?: string | null;
  alt: string;
  category?: string;
  aspect?: "16/10" | "16/8" | "3/2";
  className?: string;
  priority?: boolean;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "16/10": "aspect-[16/10]",
  "16/8": "aspect-[16/8]",
  "3/2": "aspect-[3/2]",
};

export function PostCover({
  assetId,
  src,
  alt,
  category,
  aspect = "16/10",
  className = "",
  priority = false,
}: Props) {
  const resolvedSrc = assetId ? `/api/media/${assetId}` : src ?? null;

  if (resolvedSrc) {
    return (
      <div className={`${aspectClass[aspect]} bg-navy-deep border-b border-line-d overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return <PostCoverPattern category={category} aspect={aspect} className={className} />;
}

// ---------------------------------------------------------------

function PostCoverPattern({
  category,
  aspect = "16/10",
  className = "",
}: {
  category?: string;
  aspect?: Props["aspect"];
  className?: string;
}) {
  const key = String(aspect ?? "16/10");
  return (
    <div
      className={`${aspectClass[key as keyof typeof aspectClass]} relative bg-navy-deep border-b border-line-d overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id="brand-diag" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="#C6A15B" strokeWidth="0.6" opacity="0.14" />
          </pattern>
        </defs>
        <rect width="640" height="400" fill="url(#brand-diag)" />
        <line x1="24" y1="30" x2="80" y2="30" stroke="#C6A15B" strokeWidth="1.2" opacity="0.85" />
        <g transform="translate(430 220) scale(0.34)" fill="#C6A15B" opacity="0.18">
          <g transform="translate(-160 260) scale(0.1 -0.1)">
            <path d="M2267 4953 c-24 -27 -89 -97 -142 -158 -175 -196 -239 -268 -300 -335 -78 -86 -280 -303 -325 -350 -141 -149 -375 -394 -424 -444 -187 -194 -428 -448 -467 -491 -24 -27 -61 -68 -82 -91 -73 -80 -181 -220 -250 -324 -167 -253 -257 -527 -257 -785 0 -239 60 -443 186 -631 70 -106 137 -177 238 -253 115 -86 227 -139 388 -183 72 -20 106 -22 268 -22 168 0 194 2 282 26 214 58 380 160 581 357 92 91 141 131 147 125 12 -12 -9 -175 -40 -316 -32 -137 -105 -350 -157 -453 -38 -76 -152 -258 -172 -275 -3 -3 -19 -23 -36 -45 -16 -22 -73 -84 -127 -137 -54 -54 -98 -104 -98 -111 0 -37 3 -37 851 -37 455 0 834 3 843 6 9 3 16 14 16 23 0 9 -51 68 -113 131 -62 63 -133 142 -158 175 -100 134 -192 306 -254 476 -54 150 -124 501 -111 556 7 24 14 18 131 -99 226 -227 406 -332 665 -388 93 -20 122 -22 260 -17 86 3 184 13 220 22 242 58 475 213 614 408 146 205 215 442 203 696 -9 200 -56 371 -150 556 -48 93 -161 284 -176 295 -3 3 -26 32 -51 65 -24 33 -56 74 -71 90 -14 17 -48 55 -74 85 -87 100 -283 307 -533 565 -566 583 -743 770 -1013 1075 -46 52 -111 127 -143 165 -70 83 -84 95 -107 95 -9 0 -37 -21 -62 -47z" />
          </g>
        </g>
        <path d="M 12 12 L 12 44" stroke="#C6A15B" strokeWidth="1" opacity="0.35" />
        <path d="M 12 12 L 44 12" stroke="#C6A15B" strokeWidth="1" opacity="0.35" />
        <path d="M 628 388 L 628 356" stroke="#C6A15B" strokeWidth="1" opacity="0.35" />
        <path d="M 628 388 L 596 388" stroke="#C6A15B" strokeWidth="1" opacity="0.35" />
      </svg>
      {category && (
        <span className="absolute top-3 left-3 md:top-4 md:left-4 font-sans uppercase text-eyebrow tracking-[0.16em] text-gold bg-navy-deep/70 backdrop-blur-[1px] px-2 py-1">
          {category}
        </span>
      )}
    </div>
  );
}
