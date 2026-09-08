import { PrismaClient, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "regulacion", name: "Regulación" },
  { slug: "tributario-y-aduanero", name: "Tributario y Aduanero" },
  { slug: "operaciones", name: "Operaciones" },
  { slug: "juego-responsable", name: "Juego Responsable" },
  { slug: "tecnologia", name: "Tecnología" },
] as const;

const SAMPLE_POSTS = [
  {
    slug: "marco-regulatorio-juegos-de-azar-en-bolivia",
    title: "Marco regulatorio de los juegos de azar en Bolivia",
    excerpt:
      "Condiciones normativas, autorizaciones y obligaciones que enmarcan la puesta en marcha de un proyecto de juego en el país.",
    categorySlug: "regulacion",
    content: `
[BORRADOR DE EJEMPLO — reemplazar con contenido definitivo antes de publicar.]

Panorama de las condiciones normativas, autorizaciones y obligaciones que enmarcan la puesta en marcha de un proyecto de juego en Bolivia.

## Alcance del marco regulatorio

Este espacio se completa con el contenido definitivo. La estructura siguiente sirve como referencia editorial.

- Ítem de referencia sobre condiciones normativas.
- Ítem de referencia sobre autorizaciones exigibles.
- Ítem de referencia sobre obligaciones formales y materiales.

## Etapas de la habilitación

Párrafo de referencia sobre las etapas de la habilitación de un proyecto de juego, desde la solicitud hasta el inicio de operaciones.

> Cita destacada del artículo: se usa para resaltar una definición normativa o una conclusión del análisis.

## Consideraciones finales

Párrafo de cierre. Reemplazar por el contenido definitivo.
    `.trim(),
  },
  {
    slug: "programa-de-prevencion-de-la-ludopatia",
    title: "Cómo estructurar un programa de prevención de la ludopatía",
    excerpt:
      "Componentes mínimos, responsables internos y evidencia documental que exige un programa de juego responsable.",
    categorySlug: "juego-responsable",
    content: `
[BORRADOR DE EJEMPLO — reemplazar con contenido definitivo antes de publicar.]

Los programas de prevención de la ludopatía requieren componentes mínimos verificables y una gobernanza interna clara.

## Componentes mínimos

- Política interna aprobada por la máxima autoridad.
- Capacitación periódica al personal.
- Materiales de información visible en la sala.
- Canal de atención a personas en riesgo.

## Evidencia documental

Párrafo de referencia sobre la evidencia documental que respalda cada componente y su periodicidad.
    `.trim(),
  },
  {
    slug: "importacion-de-maquinas-clasificacion-arancelaria",
    title: "Importación de máquinas de juego: clasificación arancelaria",
    excerpt:
      "Los puntos donde se concentran las observaciones aduaneras y cómo anticiparlas con documentación de respaldo.",
    categorySlug: "tributario-y-aduanero",
    content: `
[BORRADOR DE EJEMPLO — reemplazar con contenido definitivo antes de publicar.]

Las observaciones aduaneras sobre importación de máquinas de juego se concentran en clasificación, valoración y respaldo documental.

## Clasificación arancelaria

Párrafo de referencia sobre los criterios de clasificación aplicables.

## Valoración aduanera

Párrafo de referencia sobre los métodos de valoración y la documentación exigida.
    `.trim(),
  },
];

async function main() {
  console.log("→ Sembrando categorías…");
  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL y ADMIN_PASSWORD son obligatorios para sembrar el usuario admin."
    );
  }
  console.log(`→ Creando/actualizando admin ${email}…`);
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log("→ Sembrando posts de ejemplo (todos DRAFT)…");
  for (const p of SAMPLE_POSTS) {
    const cat = await prisma.category.findUniqueOrThrow({ where: { slug: p.categorySlug } });
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: "[AUTOR]",
        categoryId: cat.id,
        status: PostStatus.DRAFT,
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: "[AUTOR]",
        categoryId: cat.id,
        status: PostStatus.DRAFT,
        featured: p.categorySlug === "regulacion",
      },
    });
  }

  console.log("✓ Seed completo.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
