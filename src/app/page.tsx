import { SectionHero } from "@/components/sections/hero";
import { SectionModes } from "@/components/sections/modes";
import { SectionAbout } from "@/components/sections/about";
import { SectionServices } from "@/components/sections/services";
import { SectionCtaBanner } from "@/components/sections/cta-banner";
import { SectionBlogTeaser } from "@/components/sections/blog-teaser";
import { SectionContact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main id="contenido">
      <SectionHero />
      <SectionModes />
      <SectionAbout />
      <SectionServices />
      <SectionCtaBanner />
      <SectionBlogTeaser />
      <SectionContact />
    </main>
  );
}
