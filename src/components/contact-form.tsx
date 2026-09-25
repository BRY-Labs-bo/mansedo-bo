"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactActionState } from "@/app/actions/contact";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type Locale } from "@/i18n/config";

const initialState: ContactActionState = { status: "idle" };

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      aria-busy={pending || undefined}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function ContactForm({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.contact.form;
  const [state, formAction] = useActionState(submitContact, initialState);
  const err = state.fieldErrors ?? {};

  // Traducimos los mensajes que vienen del server (que están en ES por defecto)
  // sólo cuando estamos en EN — es un pequeño mapa key → texto local.
  const localizedMessage = (msg?: string): string | undefined => {
    if (!msg || lang === "es") return msg;
    // Reemplazos simples para las cadenas conocidas del server action.
    if (msg.includes("límite de envíos")) return t.errorRateLimit;
    if (msg.includes("Revisá los campos")) return t.errorReview;
    if (msg.includes("No pudimos registrar")) return t.errorGeneric;
    if (msg.includes("¡Gracias!")) return t.success;
    return msg;
  };

  return (
    <form
      action={formAction}
      className="bg-surface border border-line-l p-6 md:p-8"
      aria-label={t.title}
      noValidate
    >
      <p className="eyebrow text-gold-ink">
        <span className="rule" aria-hidden="true" />
        {t.title}
      </p>

      {/* Honeypot: invisible para humanos, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className="field-label">{t.labels.name}</label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            placeholder={t.placeholders.name}
            className="field-input"
            aria-invalid={err.nombre ? "true" : undefined}
            aria-describedby={err.nombre ? "cf-nombre-err" : undefined}
          />
          {err.nombre && (
            <span id="cf-nombre-err" className="field-error">
              {lang === "en" ? t.fieldErrors.name : err.nombre}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="cf-correo" className="field-label">{t.labels.email}</label>
          <input
            id="cf-correo"
            name="correo"
            type="email"
            required
            placeholder={t.placeholders.email}
            className="field-input"
            aria-invalid={err.correo ? "true" : undefined}
            aria-describedby={err.correo ? "cf-correo-err" : undefined}
          />
          {err.correo && (
            <span id="cf-correo-err" className="field-error">
              {lang === "en" ? t.fieldErrors.email : err.correo}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="cf-telefono" className="field-label">{t.labels.phone}</label>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            placeholder={t.placeholders.phone}
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="cf-empresa" className="field-label">{t.labels.company}</label>
          <input
            id="cf-empresa"
            name="empresa"
            type="text"
            placeholder={t.placeholders.company}
            className="field-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-asunto" className="field-label">{t.labels.subject}</label>
          <input
            id="cf-asunto"
            name="asunto"
            type="text"
            required
            placeholder={t.placeholders.subject}
            className="field-input"
            aria-invalid={err.asunto ? "true" : undefined}
            aria-describedby={err.asunto ? "cf-asunto-err" : undefined}
          />
          {err.asunto && (
            <span id="cf-asunto-err" className="field-error">
              {lang === "en" ? t.fieldErrors.subject : err.asunto}
            </span>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-mensaje" className="field-label">{t.labels.message}</label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            rows={5}
            required
            placeholder={t.placeholders.message}
            className="field-input resize-y"
            aria-invalid={err.mensaje ? "true" : undefined}
            aria-describedby={err.mensaje ? "cf-mensaje-err" : undefined}
          />
          {err.mensaje && (
            <span id="cf-mensaje-err" className="field-error">
              {lang === "en" ? t.fieldErrors.message : err.mensaje}
            </span>
          )}
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-body-sm text-txt-l">
        <input
          type="checkbox"
          name="acepta"
          required
          className="mt-1"
          aria-invalid={err.acepta ? "true" : undefined}
          aria-describedby={err.acepta ? "cf-acepta-err" : undefined}
        />
        <span>
          {t.accept.prefix}{" "}
          <a href={href("/politica-de-privacidad", lang)} className="text-gold-txt underline underline-offset-2">
            {t.accept.link}
          </a>
          .
        </span>
      </label>
      {err.acepta && (
        <span id="cf-acepta-err" className="field-error">
          {lang === "en" ? t.fieldErrors.accept : err.acepta}
        </span>
      )}

      {state.status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 border-l-2 border-gold-ink bg-paper p-4 text-body-sm text-txt-l"
        >
          {localizedMessage(state.message)}
        </div>
      )}
      {state.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 border-l-2 border-error bg-paper p-4 text-body-sm text-error"
        >
          {localizedMessage(state.message)}
        </div>
      )}

      <div className="mt-6">
        <SubmitButton label={t.submit} pendingLabel={t.submitting} />
      </div>
    </form>
  );
}
