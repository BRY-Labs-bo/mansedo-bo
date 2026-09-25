import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/hero";
import { SectionModes } from "@/components/sections/modes";
import { SectionAbout } from "@/components/sections/about";
import { SectionServices } from "@/components/sections/services";
import { SectionCtaBanner } from "@/components/sections/cta-banner";
import { SectionBlogTeaser } from "@/components/sections/blog-teaser";
import { SectionContact } from "@/components/sections/contact";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/` },
};

// La home muestra los 3 últimos posts publicados en el teaser del blog.
// Sin esta línea, Next puede prerenderar la home como estática al build y
// dejar los teasers congelados hasta el próximo deploy. force-dynamic hace
// que la home se re-genere en cada request contra Neon — costo trivial
// para el tráfico esperado y siempre refleja el último estado publicado.
export const dynamic = "force-dynamic";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.detail}`,
    addressLocality: site.address.city,
    addressCountry: "BO",
  },
  areaServed: "BO",
  slogan: site.tagline,
} as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify controlado; payload construido en servidor sin entrada de usuario.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main id="contenido">
        <SectionHero />
        <SectionModes />
        <SectionAbout />
        <SectionServices />
        <SectionCtaBanner />
        <SectionBlogTeaser />
        <SectionContact />
      </main>
    </>
  );
}
