import { whatsappUrl } from "@/config/site";

// FAB flotante — sólo se muestra en móvil (<md). Única sombra permitida en el sitio.
export function WhatsappFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="lg:hidden fixed bottom-4 right-4 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold text-navy-deep shadow-fab hover:bg-gold-br focus-visible:outline-offset-4"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l4.94-1.36A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.87 14.13c-.25.7-1.44 1.32-2 1.4-.5.07-1.14.1-1.83-.12a15.7 15.7 0 0 1-1.66-.62c-2.93-1.27-4.85-4.22-5-4.42-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.86 2.08.94 2.23.08.15.13.32.02.52-.1.2-.15.32-.3.5s-.31.4-.44.54c-.15.15-.3.31-.13.62.17.3.77 1.28 1.65 2.08 1.14 1.02 2.1 1.34 2.4 1.5.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.83 2.07.98.3.15.5.22.57.35.08.13.08.75-.18 1.47Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
