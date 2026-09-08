// Fuente única de verdad de los datos de contacto y de la marca.
// Cualquier cambio de teléfono, dirección o correo se hace acá.

export const site = {
  name: "MANSEDO BUSINESS CONSULTING S.R.L.",
  shortName: "MANSEDO",
  tagline: "Asesoría técnica, legal y estratégica en lotería, juegos de azar y sorteos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mansedoconsulting.com",
  locale: "es-BO",

  contact: {
    email: "mansedo.srl@gmail.com",
    phones: ["(+591) 70611882", "(+591) 70664084"],
    // PENDIENTE (cliente): definir cuál de los dos números va al chat de WhatsApp.
    // Por defecto usamos 70611882. Cambiar la env var NEXT_PUBLIC_WHATSAPP_NUMBER para override.
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "59170611882",
    whatsappMessage: "Hola, quisiera consultar sobre un proyecto.",
  },

  address: {
    street: "Calle Mercado, Edif. Alborada",
    detail: "Piso 6, oficina 601",
    city: "La Paz",
    country: "Bolivia",
    full: "Calle Mercado, Edif. Alborada, piso 6, oficina 601 — La Paz, Bolivia",
  },
} as const;

export function whatsappUrl(): string {
  const number = site.contact.whatsappNumber;
  const text = encodeURIComponent(site.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}
