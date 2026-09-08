import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de tratamiento de datos personales de MANSEDO BUSINESS CONSULTING S.R.L.",
  alternates: { canonical: `${site.url}/politica-de-privacidad` },
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <main id="contenido">
      <section className="surface-darker" aria-labelledby="pp-title">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-gold">
            <span className="rule rule-on-dark" aria-hidden="true" />
            Legal
          </p>
          <h1
            id="pp-title"
            className="mt-4 font-sans font-extrabold text-display-2 leading-[1.05] text-txt-d"
          >
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p className="mt-4 text-body text-mut-d max-w-[720px]">
            Tratamiento de datos personales recabados a través de este sitio web.
          </p>
        </div>
      </section>

      <section className="surface-light">
        <div className="container-page py-12 md:py-16">
          <div
            role="note"
            aria-label="Aviso"
            className="max-w-read border-l-2 border-error bg-paper p-4 text-body-sm text-error"
          >
            <strong>[PENDIENTE: texto de Política de Privacidad a proveer por el cliente]</strong>
            <br />
            Los encabezados a continuación son la estructura de referencia; el texto
            legal definitivo debe ser aportado por el estudio jurídico del cliente y
            reemplazar los párrafos “Contenido pendiente…”.
          </div>

          <article className="prose-article mx-auto mt-10">
            <p>
              MANSEDO BUSINESS CONSULTING S.R.L., con domicilio en {site.address.street},{" "}
              {site.address.detail}, {site.address.city} — {site.address.country}, es el
              responsable del tratamiento de los datos personales recabados a través del
              presente sitio web.
            </p>

            <h2>1. Datos que recabamos</h2>
            <p>Contenido pendiente. Detallar categorías de datos (identificación, contacto, navegación, cookies).</p>

            <h2>2. Finalidad del tratamiento</h2>
            <p>Contenido pendiente. Especificar finalidades: atención de consultas, seguimiento comercial, cumplimiento legal, etc.</p>

            <h2>3. Base legítima</h2>
            <p>Contenido pendiente. Fundar el tratamiento en el consentimiento del titular, la ejecución de contrato o el interés legítimo, según corresponda.</p>

            <h2>4. Conservación</h2>
            <p>Contenido pendiente. Definir plazos de conservación por categoría de datos.</p>

            <h2>5. Comunicación a terceros</h2>
            <p>Contenido pendiente. Enumerar proveedores externos (correo transaccional, hosting) y jurisdicción de tratamiento.</p>

            <h2>6. Derechos del titular</h2>
            <p>Contenido pendiente. Acceso, rectificación, cancelación y oposición, con el procedimiento y contacto correspondientes.</p>

            <h2>7. Medidas de seguridad</h2>
            <p>Contenido pendiente. Medidas técnicas y organizativas aplicadas.</p>

            <h2>8. Cambios en la política</h2>
            <p>Contenido pendiente. Vigencia y procedimiento de actualización.</p>

            <h2>9. Contacto</h2>
            <p>
              Consultas sobre esta política:{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
