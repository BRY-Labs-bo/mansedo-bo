import { Resend } from "resend";
import type { Mailer, MailMessage } from "./types";

export function createResendMailer(apiKey: string, from: string): Mailer {
  const client = new Resend(apiKey);
  return {
    async send(message: MailMessage): Promise<void> {
      const result = await client.emails.send({
        from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        replyTo: message.replyTo,
      });
      if (result.error) {
        // El caller decide si fatal o warning. Rethrow con contexto.
        throw new Error(`Resend: ${result.error.message ?? "error desconocido"}`);
      }
    },
  };
}
