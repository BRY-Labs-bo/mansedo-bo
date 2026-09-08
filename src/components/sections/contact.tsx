import { site, whatsappUrl } from "@/config/site";

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5A6.5 6.5 0 0 0 2.35 11.3L1.5 14.5l3.28-.84A6.5 6.5 0 1 0 8 1.5Zm3.7 8.86c-.16.44-.94.85-1.3.9-.34.05-.77.07-1.24-.08a11.4 11.4 0 0 1-1.13-.42 8.86 8.86 0 0 1-3.4-3.02c-.25-.34-.68-.94-.68-1.79 0-.85.44-1.27.6-1.44.16-.17.35-.22.47-.22h.34c.11 0 .26-.04.4.31.16.39.55 1.36.6 1.46.05.11.08.23.02.35-.06.13-.09.2-.17.32-.09.11-.19.25-.27.34-.09.09-.18.19-.08.37.11.19.48.79 1.03 1.28.7.63 1.29.82 1.48.92.19.09.3.08.41-.05.11-.13.47-.55.6-.74.13-.19.25-.16.42-.09.17.06 1.06.5 1.24.59.19.09.31.13.36.21.05.08.05.46-.11.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

// UI del formulario (Fase 3). El wiring del Server Action llega en Fase 5.
function ContactFormShell() {
  return (
    <form
      action="#"
      method="post"
      className="bg-surface border border-line-l p-6 md:p-8"
      aria-label="Formulario de contacto"
    >
      <p className="eyebrow text-gold-ink">
        <span className="rule" aria-hidden="true" />
        Formulario de contacto
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className="field-label">
            Nombre completo *
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            placeholder="Escriba su nombre completo"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="cf-correo" className="field-label">
            Correo electrónico *
          </label>
          <input
            id="cf-correo"
            name="correo"
            type="email"
            required
            placeholder="Escriba su correo electrónico"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="cf-telefono" className="field-label">
            Teléfono / WhatsApp
          </label>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            placeholder="Escriba su número de contacto"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="cf-empresa" className="field-label">
            Empresa
          </label>
          <input
            id="cf-empresa"
            name="empresa"
            type="text"
            placeholder="Indique el nombre de su empresa"
            className="field-input"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-asunto" className="field-label">
            Asunto *
          </label>
          <input
            id="cf-asunto"
            name="asunto"
            type="text"
            required
            placeholder="Indique brevemente el motivo de su consulta"
            className="field-input"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-mensaje" className="field-label">
            Mensaje *
          </label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            rows={5}
            required
            placeholder="Describa su requerimiento o consulta"
            className="field-input resize-y"
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-body-sm text-txt-l">
        <input type="checkbox" name="acepta" required className="mt-1" />
        <span>
          He leído y acepto la{" "}
          <a href="/politica-de-privacidad" className="text-gold-txt underline underline-offset-2">
            Política de Privacidad
          </a>
          .
        </span>
      </label>

      <button type="submit" className="btn btn-primary mt-6 w-full md:w-auto">
        Enviar consulta
      </button>
    </form>
  );
}

export function SectionContact() {
  return (
    <section
      id="contacto"
      className="surface-light section-y scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-editorial">
          <div>
            <p className="eyebrow text-gold-ink">
              <span className="rule" aria-hidden="true" />
              Contacto
            </p>
            <h2
              id="contact-title"
              className="mt-4 font-sans font-extrabold text-display-2 leading-[1.05] text-txt-l"
            >
              HABLE CON UN ESPECIALISTA
            </h2>
            <p className="mt-6 text-body text-txt-l max-w-sm">
              Estamos disponibles para atender consultas relacionadas con proyectos de
              lotería, juegos de azar y sorteos, así como asuntos tributarios, aduaneros
              y administrativos.
            </p>
            <p className="mt-4 text-body-sm text-mut-l max-w-sm">
              Complete el formulario y uno de nuestros especialistas se pondrá en contacto
              con usted. Si lo prefiere, comuníquese directamente por WhatsApp.
            </p>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-light mt-8"
            >
              <IconWhatsApp />
              <span>Contactar por WhatsApp</span>
            </a>

            <address className="not-italic mt-10 text-body-sm text-txt-l leading-relaxed">
              {site.address.street}, {site.address.detail}
              <br />
              {site.address.city} — {site.address.country}
              <br />
              {site.contact.phones.join(" · ")}
              <br />
              <a href={`mailto:${site.contact.email}`} className="text-gold-txt underline underline-offset-2">
                {site.contact.email}
              </a>
            </address>
          </div>

          <div>
            <ContactFormShell />
          </div>
        </div>
      </div>
    </section>
  );
}
