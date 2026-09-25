import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

// Layout de las rutas públicas en inglés (/en/*).
export default function SiteLayoutEn({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader lang="en" />
      {children}
      <SiteFooter lang="en" />
      <WhatsappFab />
    </>
  );
}
