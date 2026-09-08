import localFont from "next/font/local";

// Fuentes self-hosted (WOFF2 variable). Se descargaron de Google Fonts (subset latin)
// con scripts/download-fonts.mjs y se guardaron en public/fonts/. Así no dependemos
// de la conectividad a fonts.googleapis.com en build ni en dev.

export const archivo = localFont({
  src: "../../public/fonts/archivo/variable.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const sourceSerif = localFont({
  src: [
    {
      path: "../../public/fonts/source-serif-4/variable.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/source-serif-4/variable-italic.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-source-serif",
  fallback: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
});

// Sólo se usa dentro del wordmark del isologo (SVG inline).
export const cormorant = localFont({
  src: "../../public/fonts/cormorant-garamond/variable.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-cormorant",
  fallback: ["Cormorant Garamond", "Times New Roman", "serif"],
});
