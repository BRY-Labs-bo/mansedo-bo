import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

// Layout compartido por las rutas públicas (home, blog, política).
// Admin queda fuera de este grupo y usa su propio layout minimal.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
