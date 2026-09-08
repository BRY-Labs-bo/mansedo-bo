import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    // Radio 0 en TODO. Overrides puntuales via clase custom.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "9999px", // reservado exclusivamente para el FAB de WhatsApp móvil
    },
    // Sin sombras. Overrides puntuales via clase custom.
    boxShadow: {
      none: "none",
      DEFAULT: "none",
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none",
      fab: "0 8px 24px rgba(0,0,0,0.28)", // única sombra permitida (FAB WhatsApp móvil)
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "32px",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1180px",
        xl: "1180px",
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        "navy-deep": "#060F1B",
        navy: "#0B1B2E",
        "navy-2": "#11283F",
        gold: "#C6A15B",
        "gold-br": "#E0C285",
        "gold-ink": "#9A7530",
        "gold-txt": "#8F6614",
        grey: "#47515A",
        paper: "#F3F0E9",
        surface: "#FFFFFF",
        "txt-d": "#ECF1F6",
        "mut-d": "#A0B2C4",
        "txt-l": "#17222F",
        "mut-l": "#56677A",
        "line-l": "#DAD4C6",
        "line-d": "rgba(198,161,91,0.26)",
        placeholder: "#9AA5B1",
        error: "#B03B3B",
      },
      fontFamily: {
        // Cargadas desde src/lib/fonts.ts vía next/font/google
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // Escala del sistema de diseño (Board 3)
        "display-1": ["58px", { lineHeight: "1.02", letterSpacing: "-0.005em", fontWeight: "800" }],
        "display-2": ["40px", { lineHeight: "1.05", letterSpacing: "-0.005em", fontWeight: "800" }],
        "h-block": ["25px", { lineHeight: "1.15", fontWeight: "700" }],
        eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.16em", fontWeight: "600" }],
        lead: ["19px", { lineHeight: "1.62", fontWeight: "400" }],
        body: ["17px", { lineHeight: "1.70", fontWeight: "400" }],
        "body-sm": ["15px", { lineHeight: "1.56", fontWeight: "400" }],
        // Blog long form
        "article-body": ["17.5px", { lineHeight: "1.78", fontWeight: "400" }],
      },
      spacing: {
        // Retícula editorial y ritmo vertical
        col: "340px",
        gutter: "90px",
        read: "720px",
        container: "1180px",
        "sec-y-mob": "48px", // ~46–52
        "sec-y": "108px", // ~104–110
      },
      maxWidth: {
        container: "1180px",
        read: "720px",
        editorial: "340px",
      },
      gridTemplateColumns: {
        editorial: "340px 1fr",
      },
      gap: {
        editorial: "90px",
      },
    },
  },
  plugins: [],
};

export default config;
