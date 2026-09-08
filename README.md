# MANSEDO BUSINESS CONSULTING — Sitio institucional

Sitio web de MANSEDO BUSINESS CONSULTING S.R.L. (La Paz, Bolivia): consultora especializada en asesoría técnica, legal y estratégica para proyectos de lotería, juegos de azar y sorteos.

**Stack**

- Next.js 15 (App Router) con `output: 'standalone'` — corre en Vercel, Railway, Render, Fly o VPS + PM2/Nginx sin tocar código.
- TypeScript, React 19.
- Tailwind CSS con tokens de marca cargados en `tailwind.config.ts`.
- Prisma + PostgreSQL (Neon recomendado; también funciona con Postgres local o gestionado).
- Resend detrás de una interfaz propia (`Mailer`). Si no hay `RESEND_API_KEY`, el formulario igual guarda en base; sólo se omite el envío de correo.
- Auth mínima propia (bcrypt + JWT firmado con `jose`, cookie httpOnly). Sin librería de auth externa.
- Contenido del blog en Markdown, renderizado server-side con `remark` + `remark-html`.

## Estructura

```
src/
  app/
    (site)/           # rutas públicas (home, blog, política) con su layout
    admin/            # panel: login, dashboard, posts, contactos
    actions/          # server actions públicas (formulario de contacto)
    sitemap.ts / robots.ts
  components/         # UI reutilizable + isologo inline
  config/site.ts      # fuente única de datos de contacto, WhatsApp, URL
  lib/                # prisma, auth, mail, rate-limit, markdown, date
  middleware.ts       # protege /admin/*
prisma/
  schema.prisma       # Post, Category, ContactSubmission, AdminUser
  seed.ts             # 5 categorías + admin + 3 posts DRAFT de ejemplo
```

## Levantar el proyecto local

Requisitos: Node.js ≥ 20 y una base PostgreSQL accesible.

```bash
npm install
cp .env.example .env      # completar valores
npx prisma migrate deploy # o `npx prisma migrate dev` si es la primera vez
npm run seed              # crea categorías, admin y posts de ejemplo
npm run dev
```

Sitio: <http://localhost:3000> · Admin: <http://localhost:3000/admin/login>.

## Variables de entorno

Todas están en `.env.example` con comentarios. Resumen:

| Variable | Obligatoria | Notas |
| --- | --- | --- |
| `DATABASE_URL` | sí | Postgres. En Neon: pegar el connection string con `?sslmode=require`. |
| `SESSION_SECRET` | sí | ≥ 32 caracteres. Generar con `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`. |
| `ADMIN_EMAIL` | seed | Usado sólo por el seed para crear/actualizar el admin. |
| `ADMIN_PASSWORD` | seed | Idem. Cambiar en producción luego de sembrar. |
| `RESEND_API_KEY` | no | Si falta, el formulario guarda en DB y loguea el correo por consola. |
| `RESEND_FROM` | si hay Resend | `MANSEDO <no-reply@dominio-verificado>`. |
| `CONTACT_EMAIL` | no | Destinatario del formulario. Default: `mansedo.srl@gmail.com`. |
| `NEXT_PUBLIC_SITE_URL` | sí | URL pública canónica (`https://www.mansedoconsulting.com`). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | no | Número del botón de WhatsApp, formato `591XXXXXXXX`. Default: `59170611882`. |

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Levanta Next en modo desarrollo. |
| `npm run build` | `prisma generate` + `next build`. |
| `npm start` | Corre el build de producción (`node .next/standalone/server.js` si usás Docker; localmente `next start`). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run prisma:migrate` | Crea/aplica migraciones en desarrollo. |
| `npm run prisma:deploy` | Aplica migraciones en producción. |
| `npm run seed` | Corre `prisma/seed.ts`. |

## Deploy

### Railway (preferencia primaria)

1. Crear un servicio **PostgreSQL** en Railway; copiar `DATABASE_URL`.
2. Crear un servicio **Node** apuntando al repo. Root del proyecto: esta carpeta.
3. En **Variables**, cargar todas las del `.env.example`. `NEXT_PUBLIC_SITE_URL` con el dominio final.
4. Railway usa el `Dockerfile` automáticamente si está presente. Alternativa: setear
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
5. Antes del primer deploy: `npx prisma migrate deploy` (o agregar `prisma migrate deploy && ` al start command para correrlo al arrancar).
6. Sembrar el admin: correr `npm run seed` desde la consola de Railway una vez.

### Vercel

1. Importar el repo. Framework: Next.js. Root: esta carpeta.
2. **Storage → Marketplace**: agregar Neon (u otro Postgres) y linkearlo — Vercel inyecta `DATABASE_URL`.
3. Cargar el resto de variables desde `.env.example`.
4. Vercel corre `npm run build` (incluye `prisma generate`).
5. En la consola local con `DATABASE_URL` apuntando a la Neon productiva: `npx prisma migrate deploy && npm run seed`.

### VPS con Docker

```bash
docker build -t mansedo-web .
docker run -d --name mansedo -p 3000:3000 --env-file .env mansedo-web
```

Detrás de Nginx: proxy_pass a `http://127.0.0.1:3000`. Certificado TLS con Certbot.

### DNS

El dominio está registrado en **Namecheap**. El hosting compartido de Namecheap no sirve para Next.js server-rendered: sólo se usa Namecheap para administrar los registros DNS. Apuntar los registros `A`/`CNAME` al proveedor elegido (Railway, Vercel, VPS). No hace falta migrar el dominio.

## Consideraciones operativas

- **Prisma migrations**: usar `prisma migrate deploy` en producción, nunca `migrate dev`.
- **Preview de posts en admin**: la vista previa se renderiza sobre el estado guardado en la base (Markdown → HTML server-side). Guardar como DRAFT + Vista previa antes de Publicar.
- **Rate limit del formulario**: 5 envíos por hora por IP, apoyado en el índice `(ip, createdAt)` de `contact_submissions`. Ajustable en `src/lib/rate-limit.ts`.
- **Correo**: si `RESEND_API_KEY` no está, el guardado en DB sigue funcionando y el correo se loguea a consola con `console.warn` — se puede consultar la bandeja desde `/admin/contactos`.
- **Seguridad**: `/admin/*` protegido por middleware que verifica la firma JWT en el edge; el password sólo se compara con bcrypt en el server action de login.
- **SEO**: `sitemap.ts` incluye home, blog, política y los posts PUBLISHED. `robots.ts` bloquea `/admin`.

## Pendientes de cliente

Ver la lista final entregada al terminar la implementación (Fase 8). Los principales:

- **Política de Privacidad**: existe un texto base preparado según normativa boliviana (Constitución arts. 21.2 y 130; Ley N° 164 arts. 54–56) en `src/app/(site)/politica-de-privacidad/page.tsx`. **Requiere revisión y validación del equipo legal del cliente** antes de considerarse definitiva, especialmente por operar en sector regulado (juego). Actualizar `UPDATED_AT` con la fecha de la versión aprobada.
- Confirmación de cuál teléfono va a WhatsApp (default: 70611882).
- Confirmación de la tipografía del wordmark (hoy: Cormorant Garamond como aproximación).
- Cuenta Resend + dominio verificado.
- Provisión de Postgres productivo.
