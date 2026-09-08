"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getMailer } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { site } from "@/config/site";

const ContactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingrese su nombre completo.").max(120),
  correo: z.string().trim().email("Ingrese un correo electrónico válido.").max(200),
  telefono: z.string().trim().max(60).optional().or(z.literal("")),
  empresa: z.string().trim().max(200).optional().or(z.literal("")),
  asunto: z.string().trim().min(3, "Indique brevemente el motivo.").max(200),
  mensaje: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres.").max(4000),
  acepta: z
    .string()
    .refine((v) => v === "on" || v === "true", "Debe aceptar la Política de Privacidad."),
  // Honeypot: campo oculto para bots. Debe llegar vacío.
  website: z.string().max(0, "Solicitud rechazada.").optional().or(z.literal("")),
});

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    nombre: String(formData.get("nombre") ?? ""),
    correo: String(formData.get("correo") ?? ""),
    telefono: String(formData.get("telefono") ?? ""),
    empresa: String(formData.get("empresa") ?? ""),
    asunto: String(formData.get("asunto") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
    acepta: String(formData.get("acepta") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactActionState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof ContactSchema>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Revisá los campos marcados.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot: si vino algo en `website`, aceptamos silenciosamente pero no procesamos.
  if (data.website && data.website.length > 0) {
    return { status: "success", message: "Consulta recibida." };
  }

  const ip = await getClientIp();
  const ua = (await headers()).get("user-agent");

  // Rate limit por IP.
  if (await isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Superó el límite de envíos por hora. Vuelva a intentarlo más tarde o comuníquese por WhatsApp.",
    };
  }

  // 1) Guardar SIEMPRE en DB.
  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.nombre,
        email: data.correo,
        phone: data.telefono || null,
        company: data.empresa || null,
        subject: data.asunto,
        message: data.mensaje,
        ip: ip ?? null,
        userAgent: ua ?? null,
      },
    });
  } catch (err) {
    console.error("[contact] error al guardar en DB:", err);
    return {
      status: "error",
      message:
        "No pudimos registrar su consulta. Por favor comuníquese por WhatsApp o al correo directo.",
    };
  }

  // 2) Enviar correo — si falla, no revertimos: la consulta ya está guardada.
  try {
    const to = process.env.CONTACT_EMAIL ?? site.contact.email;
    const mailer = getMailer();
    await mailer.send({
      to,
      replyTo: data.correo,
      subject: `[Web] Consulta: ${data.asunto}`,
      text:
        `Nueva consulta desde el sitio.\n\n` +
        `Nombre: ${data.nombre}\n` +
        `Correo: ${data.correo}\n` +
        `Teléfono: ${data.telefono || "-"}\n` +
        `Empresa: ${data.empresa || "-"}\n` +
        `Asunto: ${data.asunto}\n\n` +
        `Mensaje:\n${data.mensaje}\n\n` +
        `---\n` +
        `IP: ${ip ?? "-"}\n` +
        `User-Agent: ${ua ?? "-"}\n`,
    });
  } catch (err) {
    // No falla la operación completa: la consulta ya está en DB, la puede leer el admin.
    console.error("[contact] error al enviar correo (guardado OK):", err);
  }

  return {
    status: "success",
    message:
      "¡Gracias! Recibimos su consulta. Un especialista se pondrá en contacto a la brevedad.",
  };
}
