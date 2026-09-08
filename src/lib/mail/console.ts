import type { Mailer, MailMessage } from "./types";

// Fallback: no envía nada, sólo loguea. Se usa cuando no hay RESEND_API_KEY.
// El envío de correo nunca debe romper el guardado en base de datos.
export const consoleMailer: Mailer = {
  async send(message: MailMessage): Promise<void> {
    console.warn(
      `[mailer:console] RESEND_API_KEY no configurada. Correo NO enviado.\n` +
        `  to: ${message.to}\n` +
        `  subject: ${message.subject}\n` +
        `  replyTo: ${message.replyTo ?? "-"}\n` +
        `  --- text ---\n${message.text}`
    );
  },
};
