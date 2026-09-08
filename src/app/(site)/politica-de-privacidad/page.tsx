import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de tratamiento de datos personales de MANSEDO BUSINESS CONSULTING S.R.L. conforme al marco normativo boliviano.",
  alternates: { canonical: `${site.url}/politica-de-privacidad` },
  robots: { index: true, follow: true },
};

// Fecha de última actualización mostrada al pie de la política. El cliente
// puede editarla directamente en este archivo cuando revise el texto.
const UPDATED_AT = "septiembre de 2026";

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
            Tratamiento de datos personales recabados a través de este sitio web,
            conforme al marco normativo del Estado Plurinacional de Bolivia.
          </p>
          <p className="mt-2 text-body-sm text-mut-d">
            Última actualización: {UPDATED_AT}.
          </p>
        </div>
      </section>

      <section className="surface-light">
        <div className="container-page py-12 md:py-16">
          <article className="prose-article mx-auto">
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
                auditoría y prevención de abuso (por ejemplo, control de
                envíos masivos automatizados).
              </li>
              <li>
                <strong>Datos de sesión administrativa:</strong> únicamente
                para el personal autorizado que accede al panel de gestión, se
                utiliza una cookie de sesión firmada con carácter estrictamente
                técnico. No se emplean cookies de rastreo publicitario ni de
                terceros.
              </li>
            </ul>
            <p>
              No solicitamos ni tratamos categorías especiales de datos
              (información sensible) a través del sitio. Si el titular incluye
              voluntariamente información de esa naturaleza en el mensaje del
              formulario, la firma la resguardará bajo los mismos deberes de
              confidencialidad y seguridad previstos en esta política y la
              utilizará únicamente para atender la consulta recibida.
            </p>

            <h2>2. Finalidades del tratamiento</h2>
            <p>Los datos personales se utilizan para:</p>
            <ul>
              <li>
                Atender consultas, solicitudes de información y requerimientos
                de asesoramiento remitidos a través del sitio o de los canales
                de contacto publicados.
              </li>
              <li>
                Establecer comunicación con el titular a efectos de dar
                respuesta a su consulta y, cuando corresponda, presentar
                propuestas de servicios profesionales.
              </li>
              <li>
                Cumplir obligaciones legales, contables, tributarias y
                administrativas aplicables a la firma.
              </li>
              <li>
                Preservar la seguridad e integridad del sitio, prevenir
                actividades fraudulentas y responder ante incidentes.
              </li>
            </ul>

            <h2>3. Base legítima del tratamiento</h2>
            <p>El tratamiento se sustenta, según corresponda, en:</p>
            <ul>
              <li>
                El <strong>consentimiento libre, expreso e informado</strong>{" "}
                del titular, manifestado al aceptar esta política al momento de
                remitir el formulario de contacto.
              </li>
              <li>
                La <strong>ejecución de gestiones precontractuales</strong>{" "}
                solicitadas por el propio titular.
              </li>
              <li>
                El <strong>cumplimiento de obligaciones legales</strong>{" "}
                aplicables a la firma.
              </li>
              <li>
                El <strong>interés legítimo</strong> en preservar la seguridad
                del sitio y la trazabilidad técnica mínima necesaria para su
                operación.
              </li>
            </ul>

            <h2>4. Plazo de conservación</h2>
            <p>
              Los datos se conservan únicamente durante el tiempo necesario para
              cumplir las finalidades para las que fueron recabados y, en su
              caso, mientras subsistan obligaciones legales de conservación
              aplicables a la firma. Concluido dicho plazo, los datos son
              suprimidos o anonimizados de forma segura.
            </p>

            <h2>5. Comunicación de datos a terceros</h2>
            <p>
              La firma no comercializa datos personales. Se restringe el acceso
              interno a los datos únicamente al personal que necesita
              conocerlos para desempeñar sus funciones profesionales. En
              determinados casos podrán intervenir prestadores de servicios
              tecnológicos que actúan como encargados del tratamiento por
              cuenta de la firma, con los siguientes fines:
            </p>
            <ul>
              <li>
                Servicios de correo electrónico transaccional necesarios para
                remitir las respuestas a las consultas recibidas.
              </li>
              <li>
                Servicios de alojamiento (hosting) y de bases de datos en los
                que se opera el sitio.
              </li>
            </ul>
            <p>
              Estos prestadores actúan bajo instrucciones documentadas de la
              firma y bajo obligaciones de confidencialidad y seguridad.
            </p>
            <p>
              Los datos podrán ser comunicados a autoridades competentes cuando
              exista una obligación legal de hacerlo, en el marco de un
              requerimiento formal debidamente motivado.
            </p>

            <h2>6. Derechos del titular</h2>
            <p>
              El titular de los datos personales puede ejercer, en los términos
              y con los alcances reconocidos por la normativa aplicable, los
              siguientes derechos:
            </p>
            <ul>
              <li>
                <strong>Acceso:</strong> obtener información sobre los datos
                personales que la firma trata acerca de su persona.
              </li>
              <li>
                <strong>Rectificación:</strong> solicitar la corrección de
                datos inexactos, incompletos o desactualizados.
              </li>
              <li>
                <strong>Cancelación o supresión:</strong> pedir la eliminación
                de sus datos cuando ya no sean necesarios para las finalidades
                para las que fueron recabados o cuando revoque su
                consentimiento, sin perjuicio de los plazos de conservación
                legalmente exigibles.
              </li>
              <li>
                <strong>Oposición:</strong> oponerse al tratamiento en los
                supuestos previstos por la normativa.
              </li>
              <li>
                <strong>Revocación del consentimiento:</strong> en cualquier
                momento, sin efectos retroactivos y sin afectar la licitud del
                tratamiento anterior a la revocación.
              </li>
            </ul>
            <p>
              El titular puede ejercer estos derechos remitiendo una solicitud
              escrita al correo{" "}
              <a href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>{" "}
              o por escrito a las oficinas de la firma en{" "}
              {site.address.full}, indicando su nombre completo, un medio de
              contacto y el derecho que desea ejercer. La firma dará
              tratamiento a la solicitud dentro de un plazo razonable y
              conforme a la normativa aplicable.
            </p>
            <p>
              Sin perjuicio de lo anterior, el titular puede acudir a la vía
              constitucional prevista en el artículo 130 de la Constitución
              Política del Estado (acción de protección de privacidad, conocida
              como <em>habeas data</em>) cuando considere que se afectan
              indebidamente sus derechos sobre sus datos personales.
            </p>

            <h2>7. Medidas de seguridad</h2>
            <p>
              La firma aplica medidas técnicas y organizativas razonables para
              proteger los datos personales frente a accesos no autorizados,
              alteración, pérdida o divulgación indebida. Entre otras:
            </p>
            <ul>
              <li>
                Acceso al panel administrativo restringido mediante credenciales
                individuales y sesiones firmadas con cookies de tipo{" "}
                <em>httpOnly</em>.
              </li>
              <li>
                Conservación cifrada de las contraseñas del personal autorizado.
              </li>
              <li>
                Registros de auditoría técnica sobre las consultas recibidas,
                incluyendo dirección IP y agente de usuario, con la finalidad
                exclusiva de trazabilidad y prevención de abuso.
              </li>
              <li>
                Limitación de accesos internos según el principio de necesidad
                del conocimiento.
              </li>
            </ul>
            <p>
              A pesar de las medidas adoptadas, ninguna transmisión de
              información por internet ni sistema de almacenamiento electrónico
              puede garantizar seguridad absoluta. Ante cualquier incidente que
              pudiera afectar la seguridad de sus datos, la firma actuará con
              diligencia para mitigarlo y, cuando corresponda, comunicarlo al
              titular.
            </p>

            <h2>8. Uso de cookies</h2>
            <p>
              El sitio utiliza exclusivamente cookies estrictamente necesarias
              para su funcionamiento (por ejemplo, la cookie técnica de sesión
              del panel administrativo). No se emplean cookies analíticas ni
              publicitarias de terceros, ni se realiza rastreo del
              comportamiento de navegación fuera del sitio.
            </p>

            <h2>9. Menores de edad</h2>
            <p>
              El sitio está dirigido a personas mayores de edad, en particular
              a empresas e inversionistas del sector regulado de lotería,
              juegos de azar y sorteos. La firma no recaba deliberadamente
              datos de menores. En caso de tomar conocimiento de que un dato
              personal correspondiente a una persona menor de edad haya sido
              incorporado sin representación legal debida, procederá a su
              supresión.
            </p>

            <h2>10. Actualizaciones de esta política</h2>
            <p>
              La firma podrá actualizar la presente política para reflejar
              cambios normativos, operativos o de sus servicios. Las
              actualizaciones estarán disponibles en esta misma página y
              regirán desde su fecha de publicación. Se recomienda revisar
              periódicamente el contenido.
            </p>

            <h2>11. Contacto</h2>
            <p>
              Consultas o solicitudes relacionadas con el tratamiento de datos
              personales pueden dirigirse a:
            </p>
            <ul>
              <li>
                Correo electrónico:{" "}
                <a href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
              <li>Dirección: {site.address.full}</li>
              <li>Teléfonos: {site.contact.phones.join(" · ")}</li>
            </ul>
            <p>
              La presente política se rige por la normativa del Estado
              Plurinacional de Bolivia. Cualquier controversia relacionada con
              su aplicación será resuelta ante los juzgados y tribunales
              competentes de la ciudad de {site.address.city}, con renuncia
              expresa a cualquier otro fuero que pudiera corresponder.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
