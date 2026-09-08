import type { Mailer } from "./types";
import { consoleMailer } from "./console";
import { createResendMailer } from "./resend";

export function getMailer(): Mailer {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "MANSEDO <no-reply@mansedoconsulting.com>";
  if (!apiKey) return consoleMailer;
  return createResendMailer(apiKey, from);
}

export type { Mailer, MailMessage } from "./types";
