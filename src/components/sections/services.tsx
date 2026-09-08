import type { ComponentType, SVGProps } from "react";
import { IconDev, IconLaunch, IconOps, IconTax } from "@/components/icons";

type ServiceBlock = {
  number: string;
  title: string;
  subtitle?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  paragraph: string;
  items: string[];
};

// Contenido literal del DOCX aprobado por el cliente.
const services: ServiceBlock[] = [
  {
    number: "01",
    title: "Desarrollo de proyectos",
    Icon: IconDev,
    paragraph:
      "Desarrollamos y estructuramos proyectos desde sus etapas iniciales, integrando los componentes técnicos, económicos, regulatorios y estratégicos necesarios para evaluar su viabilidad y posterior implementación, con foco en el cumplimiento de la normativa boliviana aplicable y la gestión de los riesgos asociados.",
    items: [
      "Elaboración de proyectos de factibilidad e implementación",
      "Estudios de mercado y análisis de la competencia",
      "Estudios de viabilidad económica y financiera",
      "Diseño arquitectónico y funcional de establecimientos",
      "Layout y distribución funcional de áreas de juego",
      "Adquisición e instalación de máquinas y sistemas de juego",
      "Estructuras organizacionales y organigramas funcionales",
      "Manuales de procedimiento y procesos internos",
      "Prevención de la ludopatía y juego responsable",
      "Sistemas de seguridad, vigilancia y control",
      "Asesoramiento jurídico y regulatorio del proyecto",
    ],
  },
  {
    number: "02",
    title: "Implementación y puesta en marcha",
    Icon: IconLaunch,
    paragraph:
      "Brindamos soporte técnico, legal y operativo para la implementación de los proyectos desarrollados, coordinando las acciones necesarias para el cumplimiento de las condiciones regulatorias, administrativas, técnicas y operativas aplicables hasta el inicio de operaciones.",
    items: [
      "Organización de documentación técnica, legal y administrativa",
      "Seguimiento de requisitos para la obtención de autorizaciones",
      "Implementación de procedimientos, manuales y procesos internos",
      "Coordinación de requerimientos técnicos y operativos",
      "Instalación y puesta en funcionamiento de equipos y sistemas",
      "Habilitación y puesta en marcha del proyecto",
      "Asistencia en verificaciones e inspecciones de entidades competentes",
      "Seguimiento integral hasta el inicio de operaciones",
    ],
  },
  {
    number: "03",
    title: "Gestión de operaciones",
    Icon: IconOps,
    paragraph:
      "Asesoramiento especializado para fortalecer la eficiencia operativa, la sostenibilidad financiera, el control interno, la administración de los recursos y el cumplimiento de las obligaciones aplicables durante el funcionamiento de la operación.",
    items: [
      "Diseño e implementación de estructuras organizacionales",
      "Retribución, incentivos y evaluación del desempeño",
      "Sistemas de información y control interno",
      "Optimización de la oferta de juego autorizada",
      "Marketing, promociones, publicidad, eventos y torneos",
      "Presupuestos operativos y seguimiento de resultados",
      "Análisis de indicadores de gestión y desempeño",
      "Coordinación legal, contable, administrativa y financiera",
      "Fortalecimiento de seguridad, vigilancia y control",
      "Asesoramiento tributario y aduanero de la operación",
      "Gestión de riesgos operativos, regulatorios y financieros",
    ],
  },
  {
    number: "04",
    title: "Asesoramiento tributario y aduanero",
    subtitle: "También para empresas de otros sectores",
    Icon: IconTax,
    paragraph:
      "Consultoría, análisis técnico y asesoramiento estratégico en materias tributarias, aduaneras y administrativas, orientados al cumplimiento de obligaciones, la prevención de contingencias y la defensa técnica y legal de los intereses de nuestros clientes ante las entidades competentes.",
    items: [
      "Asesoramiento tributario y aduanero permanente",
      "Diagnóstico y prevención de contingencias",
      "Revisión de obligaciones formales y materiales",
      "Atención de requerimientos y actuaciones de control",
      "Verificación, fiscalización y determinación tributaria",
      "Defensa en procesos administrativos sancionadores",
      "Descargos, memoriales y recursos",
      "Consultoría en operaciones de comercio exterior",
      "Clasificación arancelaria y valoración aduanera",
      "Acompañamiento ante la Administración Tributaria y la Aduana Nacional",
      "Coordinación con agencias despachantes autorizadas",
    ],
  },
];

export function SectionServices() {
  return (
    <section
      id="servicios"
      className="surface-light section-y scroll-mt-24"
      aria-labelledby="services-title"
    >
      <div className="container-page">
        {/* Encabezado */}
        <div className="grid-editorial">
          <div>
            <p className="eyebrow text-gold-ink">
              <span className="rule" aria-hidden="true" />
              Servicios
            </p>
            <h2
              id="services-title"
              className="font-sans font-extrabold text-display-2 leading-[1.05] mt-4 text-txt-l"
            >
              QUÉ HACEMOS
            </h2>
          </div>
          <div className="text-body text-txt-l">
            <p>
              Brindamos asesoramiento integral para el diseño, estructuración,
              implementación y gestión de proyectos de lotería, juegos de azar y sorteos
              en Bolivia.
            </p>
            <p className="mt-5 text-mut-l">
              Nuestro enfoque multidisciplinario integra aspectos técnicos,
              regulatorios, administrativos, tributarios, aduaneros y estratégicos,
              adaptados a las características y necesidades específicas de cada
              proyecto.
            </p>
          </div>
        </div>

        {/* Bloques */}
        <div className="mt-16 md:mt-20 divide-y divide-line-l border-t border-line-l">
          {services.map((s) => (
            <article key={s.number} className="py-12 md:py-16">
              <div className="grid-editorial">
                <div>
                  <div className="flex items-start gap-4">
                    <span className="font-sans font-bold text-h-block text-gold-ink">
                      {s.number}
                    </span>
                    <s.Icon className="text-gold-ink mt-1" />
                  </div>
                  <h3 className="mt-4 font-sans font-bold text-h-block text-txt-l uppercase tracking-tight">
                    {s.title}
                  </h3>
                  {s.subtitle && (
                    <p className="mt-2 text-body-sm text-mut-l uppercase tracking-[0.14em]">
                      {s.subtitle}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-body text-txt-l">{s.paragraph}</p>
                  <ul className="diamond-list mt-6 grid md:grid-cols-2 gap-x-8 gap-y-2 text-body-sm text-txt-l">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
