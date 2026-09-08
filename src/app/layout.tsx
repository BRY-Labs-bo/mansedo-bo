import type { Metadata } from "next";
import { archivo, sourceSerif, cormorant } from "@/lib/fonts";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Asesoría especializada en lotería, azar y sorteos`,
    template: `%s · ${site.shortName}`,
  },
  description:
    "Consultoría técnica, legal y estratégica para el diseño, desarrollo e implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia.",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-BO"
      className={`${archivo.variable} ${sourceSerif.variable} ${cormorant.variable}`}
    >
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
