import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/hero";
import { SectionModes } from "@/components/sections/modes";
import { SectionAbout } from "@/components/sections/about";
import { SectionServices } from "@/components/sections/services";
import { SectionCtaBanner } from "@/components/sections/cta-banner";
import { SectionBlogTeaser } from "@/components/sections/blog-teaser";
import { SectionContact } from "@/components/sections/contact";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";

const LANG = "en";

export const metadata: Metadata = {
  title: getDictionary(LANG).meta.siteTitle,
  description: getDictionary(LANG).meta.siteDescription,
  alternates: {
    canonical: `${site.url}/en`,
    languages: {
      es: `${site.url}/`,
      en: `${site.url}/en`,
    },
  },
};

export const dynamic = "force-dynamic";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `${site.url}/en`,
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

export default function HomePageEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main id="contenido">
        <SectionHero lang={LANG} />
        <SectionModes lang={LANG} />
        <SectionAbout lang={LANG} />
        <SectionServices lang={LANG} />
        <SectionCtaBanner lang={LANG} />
        <SectionBlogTeaser lang={LANG} />
        <SectionContact lang={LANG} />
      </main>
    </>
  );
}
