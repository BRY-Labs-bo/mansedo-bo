import type { Metadata } from "next";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";

// La política solo existe oficialmente en español (rige bajo normativa
// boliviana). En /en mostramos el mismo texto con un aviso claro arriba
// para que el visitante en inglés sepa que la versión válida es la ES.
// Cuando el cliente valide una traducción legal certificada, se puede
// duplicar el contenido de la página ES aquí.

const LANG = "en";

export const metadata: Metadata = {
  title: getDictionary(LANG).privacy.metaTitle,
  description: getDictionary(LANG).privacy.metaDescription,
  alternates: {
    canonical: `${site.url}/en/politica-de-privacidad`,
    languages: {
      es: `${site.url}/politica-de-privacidad`,
      en: `${site.url}/en/politica-de-privacidad`,
    },
  },
  robots: { index: true, follow: true },
};

const UPDATED_AT = "septiembre de 2026";

export default function PoliticaDePrivacidadEnPage() {
  const t = getDictionary(LANG).privacy;

  return (
    <main id="contenido">
      <section className="surface-darker" aria-labelledby="pp-title">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow text-gold">
            <span className="rule rule-on-dark" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1
            id="pp-title"
            className="mt-4 font-sans font-extrabold text-display-2 leading-[1.05] text-txt-d"
          >
            {t.title}
          </h1>
          <p className="mt-4 text-body text-mut-d max-w-[720px]">{t.subtitle}</p>
          <p className="mt-2 text-body-sm text-mut-d">
            {t.updatedLabel}: {UPDATED_AT}.
          </p>
        </div>
      </section>

      <section className="surface-light">
        <div className="container-page py-12 md:py-16">
          {t.onlySpanishNotice && (
            <div
              role="note"
              aria-label="Notice"
              className="max-w-read mx-auto mb-10 border-l-2 border-gold-ink bg-paper p-4 text-body-sm text-txt-l"
            >
              {t.onlySpanishNotice}
            </div>
          )}

          <article className="prose-article mx-auto">
            {/* Texto español, íntegro. La versión válida rige bajo normativa boliviana. */}
            <p>
              {site.name} (en adelante, “{site.shortName}” o “la firma”), con
              domicilio legal en {site.address.street}, {site.address.detail},{" "}
              {site.address.city} — {site.address.country}, es el responsable
              del tratamiento de los datos personales recabados a través del
              presente sitio web{" "}
              <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>.
            </p>
            <p>
              La presente política describe qué datos recabamos, con qué
              finalidad, sobre qué base legal, cómo los conservamos, con quién
              podemos compartirlos y cómo el titular puede ejercer sus derechos.
              Se dicta en el marco de los artículos 21.2 y 130 de la
              Constitución Política del Estado Plurinacional de Bolivia y de
              los artículos 54, 55 y 56 de la Ley N° 164, de 8 de agosto de
              2011, así como de la normativa concordante aplicable.
            </p>

            <h2>1. Datos personales que recabamos</h2>
            <p>
              Recabamos únicamente los datos personales que el titular provee
              voluntariamente al utilizar los formularios del sitio o los canales
              de contacto habilitados, así como aquellos que se generan
              automáticamente por razones de seguridad y trazabilidad técnica.
            </p>
            <ul>
              <li>
                <strong>Datos de identificación y contacto:</strong> nombre
                completo, correo electrónico, teléfono o WhatsApp, empresa u
                organización a la que representa.
              </li>
              <li>
                <strong>Contenido de la consulta:</strong> asunto y mensaje que
                el titular remite mediante el formulario de contacto.
              </li>
              <li>
                <strong>Datos de conexión:</strong> dirección IP y agente de
                usuario del navegador, registrados por razones de seguridad,
                auditoría y prevención de abuso.
              </li>
              <li>
                <strong>Datos de sesión administrativa:</strong> únicamente
                para el personal autorizado que accede al panel de gestión, se
                utiliza una cookie de sesión firmada con carácter estrictamente
                técnico. No se emplean cookies de rastreo publicitario ni de
                terceros.
              </li>
            </ul>

            <h2>2. Finalidades del tratamiento</h2>
            <ul>
              <li>Atender consultas, solicitudes de información y requerimientos de asesoramiento.</li>
              <li>Establecer comunicación con el titular para dar respuesta a su consulta.</li>
              <li>Cumplir obligaciones legales, contables, tributarias y administrativas.</li>
              <li>Preservar la seguridad e integridad del sitio.</li>
            </ul>

            <h2>3. Base legítima del tratamiento</h2>
            <ul>
              <li>Consentimiento libre, expreso e informado del titular.</li>
              <li>Ejecución de gestiones precontractuales solicitadas por el titular.</li>
              <li>Cumplimiento de obligaciones legales.</li>
              <li>Interés legítimo en la seguridad del sitio.</li>
            </ul>

            <h2>4. Plazo de conservación</h2>
            <p>
              Los datos se conservan únicamente durante el tiempo necesario para
              cumplir las finalidades para las que fueron recabados y, en su
              caso, mientras subsistan obligaciones legales de conservación.
            </p>

            <h2>5. Comunicación de datos a terceros</h2>
            <p>
              La firma no comercializa datos personales. Podrán intervenir
              prestadores de servicios tecnológicos (correo transaccional,
              hosting) como encargados del tratamiento, bajo instrucciones
              documentadas y obligaciones de confidencialidad.
            </p>

            <h2>6. Derechos del titular</h2>
            <p>
              El titular puede ejercer los derechos de acceso, rectificación,
              cancelación, oposición y revocación del consentimiento remitiendo
              una solicitud escrita al correo{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
            <p>
              Sin perjuicio de lo anterior, puede acudir a la vía constitucional
              prevista en el artículo 130 de la Constitución Política del
              Estado (acción de protección de privacidad — <em>habeas data</em>).
            </p>

            <h2>7. Medidas de seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas razonables: acceso
              restringido con credenciales individuales, contraseñas cifradas,
              cookies de sesión httpOnly, registros de auditoría técnica y
              principio de necesidad del conocimiento.
            </p>

            <h2>8. Uso de cookies</h2>
            <p>
              El sitio utiliza exclusivamente cookies estrictamente necesarias
              para su funcionamiento. No hay cookies analíticas ni publicitarias
              de terceros.
            </p>

            <h2>9. Menores de edad</h2>
            <p>
              El sitio está dirigido a personas mayores de edad, en particular
              a empresas e inversionistas del sector regulado de lotería,
              juegos de azar y sorteos.
            </p>

            <h2>10. Actualizaciones de esta política</h2>
            <p>
              La firma podrá actualizar la presente política; las
              actualizaciones estarán disponibles en esta misma página y
              regirán desde su fecha de publicación.
            </p>

            <h2>11. Contacto</h2>
            <ul>
              <li>
                Correo:{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>Dirección: {site.address.full}</li>
              <li>Teléfonos: {site.contact.phones.join(" · ")}</li>
            </ul>
            <p>
              La presente política se rige por la normativa del Estado
              Plurinacional de Bolivia. Cualquier controversia será resuelta
              ante los juzgados y tribunales competentes de la ciudad de{" "}
              {site.address.city}.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
