// Diccionarios de strings del sitio. Todas las strings visibles al usuario
// pasan por acá. Para agregar un idioma nuevo, copiar la forma del objeto
// `es` completa y traducir. TypeScript garantiza que todos los locales
// exponen las mismas claves gracias al tipo Dictionary abajo.

import type { Locale } from "./config";

// ---------------------------------------------------------------
// Español (fuente de verdad)
// ---------------------------------------------------------------
const es = {
  meta: {
    langAttr: "es-BO",
    siteTitle: "MANSEDO — Asesoría especializada en lotería, azar y sorteos",
    siteDescription:
      "Consultoría técnica, legal y estratégica para el diseño, desarrollo e implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia.",
  },
  nav: {
    about: "Nosotros",
    services: "Servicios",
    blog: "Blog",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Saltar al contenido",
    languageSwitcher: "Cambiar idioma",
  },
  hero: {
    title: ["ASESORÍA", "ESPECIALIZADA", "EN LOTERÍA,", "AZAR Y SORTEOS"] as const,
    lead:
      "Consultoría técnica, legal y estratégica para el diseño, desarrollo e implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia, dirigida a empresas e inversionistas.",
    secondary:
      "Brindamos asesoramiento integral en materia regulatoria, técnica, administrativa, tributaria y aduanera, orientado a la estructuración, viabilidad y adecuada gestión de cada proyecto.",
    ctaPrimary: "Contacte a un especialista",
    ctaSecondary: "Ver servicios",
    illustrationAlt:
      "Ilustración: ruleta, fichas, naipes y trayectoria de apuesta deportiva",
  },
  modes: {
    eyebrow: "Modalidades de juego en las que nos especializamos",
    items: [
      "Casinos y salas de juego",
      "Máquinas y mesas",
      "Loterías y sorteos",
      "Juego en línea",
    ] as const,
  },
  about: {
    eyebrow: "Nosotros",
    title: "FIRMA ESPECIALIZADA EN EL SECTOR DEL JUEGO",
    paragraphs: [
      "MANSEDO BUSINESS CONSULTING S.R.L. es una firma especializada en brindar asesoría técnica, legal y estratégica a empresas e inversionistas para el diseño, desarrollo e implementación de proyectos de lotería, juegos de azar y sorteos en Bolivia.",
      "Nuestra especialización comprende la evaluación, estructuración y gestión integral de este tipo de proyectos. Para ello, contamos con un equipo multidisciplinario con experiencia en materias regulatorias, administrativas, tributarias, aduaneras y estratégicas, así como en otros ámbitos vinculados con su adecuada implementación y funcionamiento.",
      "Brindamos soluciones integrales orientadas a fortalecer la viabilidad de cada proyecto, asegurar el cumplimiento de la normativa aplicable y gestionar adecuadamente sus riesgos operativos, legales y económicos.",
    ] as const,
  },
  services: {
    eyebrow: "Servicios",
    title: "QUÉ HACEMOS",
    intro:
      "Brindamos asesoramiento integral para el diseño, estructuración, implementación y gestión de proyectos de lotería, juegos de azar y sorteos en Bolivia.",
    introSecondary:
      "Nuestro enfoque multidisciplinario integra aspectos técnicos, regulatorios, administrativos, tributarios, aduaneros y estratégicos, adaptados a las características y necesidades específicas de cada proyecto.",
    blocks: [
      {
        number: "01",
        title: "Desarrollo de proyectos",
        subtitle: null as string | null,
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
        subtitle: null,
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
        subtitle: null,
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
    ] as const,
  },
  ctaBanner: {
    title: ["¿Tiene un proyecto en evaluación", "o una operación en marcha?"] as const,
    body:
      "Comuníquese con uno de nuestros especialistas para recibir asesoramiento según las necesidades de su empresa.",
    cta: "Contacte a un especialista",
  },
  blogTeaser: {
    eyebrow: "Blog",
    title: "ANÁLISIS Y NOVEDADES",
    lead:
      "Noticias, novedades regulatorias, análisis técnicos y estudios especializados sobre lotería, juegos de azar y sorteos.",
    seeAll: "Ver todas las publicaciones →",
  },
  contact: {
    eyebrow: "Contacto",
    title: "HABLE CON UN ESPECIALISTA",
    body:
      "Estamos disponibles para atender consultas relacionadas con proyectos de lotería, juegos de azar y sorteos, así como asuntos tributarios, aduaneros y administrativos.",
    bodySecondary:
      "Complete el formulario y uno de nuestros especialistas se pondrá en contacto con usted. Si lo prefiere, comuníquese directamente por WhatsApp.",
    whatsappCta: "Contactar por WhatsApp",
    form: {
      title: "Formulario de contacto",
      labels: {
        name: "Nombre completo *",
        email: "Correo electrónico *",
        phone: "Teléfono / WhatsApp",
        company: "Empresa",
        subject: "Asunto *",
        message: "Mensaje *",
      },
      placeholders: {
        name: "Escriba su nombre completo",
        email: "Escriba su correo electrónico",
        phone: "Escriba su número de contacto",
        company: "Indique el nombre de su empresa",
        subject: "Indique brevemente el motivo de su consulta",
        message: "Describa su requerimiento o consulta",
      },
      accept: {
        prefix: "He leído y acepto la",
        link: "Política de Privacidad",
      },
      submit: "Enviar consulta",
      submitting: "Enviando…",
      success:
        "¡Gracias! Recibimos su consulta. Un especialista se pondrá en contacto a la brevedad.",
      errorGeneric:
        "No pudimos registrar su consulta. Por favor comuníquese por WhatsApp o al correo directo.",
      errorRateLimit:
        "Superó el límite de envíos por hora. Vuelva a intentarlo más tarde o comuníquese por WhatsApp.",
      errorReview: "Revisá los campos marcados.",
      fieldErrors: {
        name: "Ingrese su nombre completo.",
        email: "Ingrese un correo electrónico válido.",
        subject: "Indique brevemente el motivo.",
        message: "El mensaje debe tener al menos 10 caracteres.",
        accept: "Debe aceptar la Política de Privacidad.",
      },
    },
  },
  footer: {
    tagline:
      "Asesoría técnica, legal y estratégica en lotería, juegos de azar y sorteos.",
    officeLabel: "Oficina",
    attentionLabel: "Atención directa",
    whatsappCta: "Contactar por WhatsApp",
    copyright: "Todos los derechos reservados.",
    privacyPolicy: "Política de Privacidad",
  },
  blog: {
    breadcrumb: "Blog",
    pageTitle: "ANÁLISIS Y NOVEDADES DEL SECTOR",
    pageEyebrow: "Publicaciones",
    pageLead:
      "Noticias, novedades regulatorias, análisis técnicos, artículos y estudios especializados sobre lotería, juegos de azar y sorteos: tendencias del sector, regulación nacional e internacional, innovación tecnológica, juego responsable, gestión y control de operaciones, prevención de riesgos y tributación.",
    filterAll: "Todas",
    featuredBadge: "Destacado",
    readArticle: "Leer artículo →",
    empty: "No hay publicaciones disponibles",
    emptyInCategory: (cat: string) => `No hay publicaciones disponibles en "${cat}".`,
    paginationLabel: "Paginación",
    imagePlaceholder: "[ Imagen referencial ]",
    articleImagePlaceholder: "[ Imagen principal del artículo ]",
    coverImageAltFallback: "Cubierta de la publicación",
    articleMeta: {
      minRead: (n: number) => `${n} min de lectura`,
      dateAuthorSeparator: "·",
    },
    tags: "Etiquetas",
    relatedTitle: "Publicaciones relacionadas",
    embeddedCta: {
      title: "¿Tiene un proyecto en evaluación o una operación en marcha?",
      body:
        "Comuníquese con uno de nuestros especialistas para recibir asesoramiento según las necesidades de su empresa.",
      cta: "Contacte a un especialista",
    },
    onlySpanishNotice: null as string | null,
  },
  privacy: {
    metaTitle: "Política de Privacidad",
    metaDescription:
      "Política de tratamiento de datos personales de MANSEDO BUSINESS CONSULTING S.R.L. conforme al marco normativo boliviano.",
    eyebrow: "Legal",
    title: "POLÍTICA DE PRIVACIDAD",
    subtitle:
      "Tratamiento de datos personales recabados a través de este sitio web, conforme al marco normativo del Estado Plurinacional de Bolivia.",
    updatedLabel: "Última actualización",
    // El texto legal completo se mantiene en el propio page.tsx (extenso).
    // Si en el futuro se traduce, se movería acá también.
    onlySpanishNotice: null as string | null,
  },
} as const;

// ---------------------------------------------------------------
// Inglés
// ---------------------------------------------------------------
const en: Dictionary = {
  meta: {
    langAttr: "en",
    siteTitle: "MANSEDO — Specialized advisory in lottery, gaming and prize draws",
    siteDescription:
      "Technical, legal and strategic consulting for the design, development and implementation of lottery, gaming and prize-draw projects in Bolivia.",
  },
  nav: {
    about: "About us",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    whatsapp: "WhatsApp",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    languageSwitcher: "Change language",
  },
  hero: {
    title: ["SPECIALIZED", "ADVISORY IN", "LOTTERY, GAMING", "AND PRIZE DRAWS"] as const,
    lead:
      "Technical, legal and strategic consulting for the design, development and implementation of lottery, gaming and prize-draw projects in Bolivia, addressed to companies and investors.",
    secondary:
      "We provide integral advisory in regulatory, technical, administrative, tax and customs matters, focused on the structuring, feasibility and proper management of each project.",
    ctaPrimary: "Contact a specialist",
    ctaSecondary: "See services",
    illustrationAlt:
      "Illustration: roulette wheel, chips, playing cards and sports-betting trajectory",
  },
  modes: {
    eyebrow: "Gaming modalities we specialize in",
    items: [
      "Casinos and gaming halls",
      "Machines and tables",
      "Lotteries and prize draws",
      "Online gaming",
    ] as const,
  },
  about: {
    eyebrow: "About us",
    title: "A FIRM SPECIALIZED IN THE GAMING SECTOR",
    paragraphs: [
      "MANSEDO BUSINESS CONSULTING S.R.L. is a firm specialized in providing technical, legal and strategic advisory to companies and investors for the design, development and implementation of lottery, gaming and prize-draw projects in Bolivia.",
      "Our specialization covers the evaluation, structuring and integral management of these projects. We rely on a multidisciplinary team with experience in regulatory, administrative, tax, customs and strategic matters, as well as in other areas linked to their proper implementation and operation.",
      "We provide integral solutions to strengthen the feasibility of each project, ensure compliance with the applicable regulations and adequately manage its operational, legal and financial risks.",
    ] as const,
  },
  services: {
    eyebrow: "Services",
    title: "WHAT WE DO",
    intro:
      "We provide integral advisory for the design, structuring, implementation and management of lottery, gaming and prize-draw projects in Bolivia.",
    introSecondary:
      "Our multidisciplinary approach integrates technical, regulatory, administrative, tax, customs and strategic aspects, tailored to the specific characteristics and needs of each project.",
    blocks: [
      {
        number: "01",
        title: "Project development",
        subtitle: null,
        paragraph:
          "We develop and structure projects from their early stages, integrating the technical, economic, regulatory and strategic components required to assess feasibility and subsequent implementation, focused on compliance with applicable Bolivian regulations and the management of associated risks.",
        items: [
          "Feasibility and implementation projects",
          "Market studies and competitive analysis",
          "Economic and financial feasibility studies",
          "Architectural and functional design of gaming venues",
          "Layout and functional distribution of gaming areas",
          "Acquisition and installation of gaming machines and systems",
          "Organizational structures and functional charts",
          "Procedure manuals and internal processes",
          "Problem-gambling prevention and responsible gaming",
          "Security, surveillance and control systems",
          "Legal and regulatory advisory for the project",
        ],
      },
      {
        number: "02",
        title: "Implementation and go-live",
        subtitle: null,
        paragraph:
          "We provide technical, legal and operational support for the implementation of the projects we develop, coordinating the actions required to comply with applicable regulatory, administrative, technical and operational conditions up to the start of operations.",
        items: [
          "Organization of technical, legal and administrative documentation",
          "Follow-up of requirements for obtaining authorizations",
          "Implementation of procedures, manuals and internal processes",
          "Coordination of technical and operational requirements",
          "Installation and commissioning of equipment and systems",
          "Enabling and go-live of the project",
          "Support during audits and inspections by competent authorities",
          "Integral follow-up until the start of operations",
        ],
      },
      {
        number: "03",
        title: "Operations management",
        subtitle: null,
        paragraph:
          "Specialized advisory to strengthen operational efficiency, financial sustainability, internal control, resource administration and compliance with applicable obligations throughout the operation.",
        items: [
          "Design and implementation of organizational structures",
          "Compensation, incentives and performance evaluation",
          "Information systems and internal control",
          "Optimization of the authorized gaming offering",
          "Marketing, promotions, advertising, events and tournaments",
          "Operational budgets and results follow-up",
          "Analysis of management and performance indicators",
          "Legal, accounting, administrative and financial coordination",
          "Strengthening of security, surveillance and control",
          "Tax and customs advisory for the operation",
          "Management of operational, regulatory and financial risks",
        ],
      },
      {
        number: "04",
        title: "Tax and customs advisory",
        subtitle: "Also for companies in other sectors",
        paragraph:
          "Consulting, technical analysis and strategic advisory on tax, customs and administrative matters, focused on compliance, prevention of contingencies and the technical and legal defense of our clients' interests before the competent authorities.",
        items: [
          "Ongoing tax and customs advisory",
          "Diagnosis and prevention of contingencies",
          "Review of formal and substantive obligations",
          "Response to requirements and control actions",
          "Verification, audit and tax determination",
          "Defense in administrative sanction proceedings",
          "Written pleadings, motions and appeals",
          "Consulting on foreign-trade operations",
          "Tariff classification and customs valuation",
          "Representation before the Tax Administration and National Customs",
          "Coordination with authorized customs brokers",
        ],
      },
    ] as const,
  },
  ctaBanner: {
    title: ["Do you have a project under evaluation", "or an ongoing operation?"] as const,
    body:
      "Reach out to one of our specialists to receive advisory tailored to your company's needs.",
    cta: "Contact a specialist",
  },
  blogTeaser: {
    eyebrow: "Blog",
    title: "INSIGHTS AND UPDATES",
    lead:
      "News, regulatory updates, technical analysis and specialized studies on lottery, gaming and prize draws.",
    seeAll: "See all publications →",
  },
  contact: {
    eyebrow: "Contact",
    title: "TALK TO A SPECIALIST",
    body:
      "We are available to address inquiries about lottery, gaming and prize-draw projects, as well as tax, customs and administrative matters.",
    bodySecondary:
      "Complete the form and one of our specialists will get in touch with you. If you prefer, reach out directly via WhatsApp.",
    whatsappCta: "Contact via WhatsApp",
    form: {
      title: "Contact form",
      labels: {
        name: "Full name *",
        email: "Email *",
        phone: "Phone / WhatsApp",
        company: "Company",
        subject: "Subject *",
        message: "Message *",
      },
      placeholders: {
        name: "Enter your full name",
        email: "Enter your email address",
        phone: "Enter your contact number",
        company: "Enter your company name",
        subject: "Briefly describe the reason for your inquiry",
        message: "Describe your request or inquiry",
      },
      accept: {
        prefix: "I have read and accept the",
        link: "Privacy Policy",
      },
      submit: "Send inquiry",
      submitting: "Sending…",
      success:
        "Thank you! We received your inquiry. A specialist will get in touch shortly.",
      errorGeneric:
        "We couldn't register your inquiry. Please reach out via WhatsApp or email us directly.",
      errorRateLimit:
        "You exceeded the hourly submission limit. Please try again later or contact us via WhatsApp.",
      errorReview: "Please review the highlighted fields.",
      fieldErrors: {
        name: "Please enter your full name.",
        email: "Please enter a valid email address.",
        subject: "Please briefly describe the reason.",
        message: "The message must be at least 10 characters long.",
        accept: "You must accept the Privacy Policy.",
      },
    },
  },
  footer: {
    tagline:
      "Technical, legal and strategic advisory in lottery, gaming and prize draws.",
    officeLabel: "Office",
    attentionLabel: "Direct contact",
    whatsappCta: "Contact via WhatsApp",
    copyright: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
  },
  blog: {
    breadcrumb: "Blog",
    pageTitle: "SECTOR INSIGHTS AND UPDATES",
    pageEyebrow: "Publications",
    pageLead:
      "News, regulatory updates, technical analysis, articles and specialized studies on lottery, gaming and prize draws: sector trends, national and international regulation, technological innovation, responsible gaming, operations management and control, risk prevention and taxation.",
    filterAll: "All",
    featuredBadge: "Featured",
    readArticle: "Read article →",
    empty: "No publications available",
    emptyInCategory: (cat: string) => `No publications available in "${cat}".`,
    paginationLabel: "Pagination",
    imagePlaceholder: "[ Reference image ]",
    articleImagePlaceholder: "[ Main article image ]",
    coverImageAltFallback: "Publication cover",
    articleMeta: {
      minRead: (n: number) => `${n} min read`,
      dateAuthorSeparator: "·",
    },
    tags: "Tags",
    relatedTitle: "Related publications",
    embeddedCta: {
      title: "Do you have a project under evaluation or an ongoing operation?",
      body:
        "Reach out to one of our specialists to receive advisory tailored to your company's needs.",
      cta: "Contact a specialist",
    },
    onlySpanishNotice: "This article is available in Spanish only.",
  },
  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "Personal data processing policy of MANSEDO BUSINESS CONSULTING S.R.L., under the Bolivian legal framework.",
    eyebrow: "Legal",
    title: "PRIVACY POLICY",
    subtitle:
      "Processing of personal data collected through this website, under the legal framework of the Plurinational State of Bolivia.",
    updatedLabel: "Last updated",
    onlySpanishNotice:
      "This policy is available in Spanish only, as it applies under Bolivian law.",
  },
};

// ---------------------------------------------------------------
// Registro + tipos
// ---------------------------------------------------------------

// Widening: convierte los literales de `es` (strings, tuplas) a tipos
// genéricos (`string`, `readonly string[]`) para que el resto de locales
// pueda compartir la misma forma sin colisionar con los valores literales.
type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? readonly DeepWiden<U>[]
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends object
  ? { [K in keyof T]: DeepWiden<T[K]> }
  : T;

export type Dictionary = DeepWiden<typeof es>;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
