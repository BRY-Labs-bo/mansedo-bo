"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactActionState } from "@/app/actions/contact";

const initialState: ContactActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      aria-busy={pending || undefined}
    >
      {pending ? "Enviando…" : "Enviar consulta"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const err = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="bg-surface border border-line-l p-6 md:p-8"
      aria-label="Formulario de contacto"
      noValidate
    >
      <p className="eyebrow text-gold-ink">
        <span className="rule" aria-hidden="true" />
        Formulario de contacto
      </p>

      {/* Honeypot: invisible para humanos, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website (dejar vacío)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-nombre" className="field-label">Nombre completo *</label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            placeholder="Escriba su nombre completo"
            className="field-input"
            aria-invalid={err.nombre ? "true" : undefined}
            aria-describedby={err.nombre ? "cf-nombre-err" : undefined}
          />
          {err.nombre && <span id="cf-nombre-err" className="field-error">{err.nombre}</span>}
        </div>

        <div>
          <label htmlFor="cf-correo" className="field-label">Correo electrónico *</label>
          <input
            id="cf-correo"
            name="correo"
            type="email"
            required
            placeholder="Escriba su correo electrónico"
            className="field-input"
            aria-invalid={err.correo ? "true" : undefined}
            aria-describedby={err.correo ? "cf-correo-err" : undefined}
          />
          {err.correo && <span id="cf-correo-err" className="field-error">{err.correo}</span>}
        </div>

        <div>
          <label htmlFor="cf-telefono" className="field-label">Teléfono / WhatsApp</label>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            placeholder="Escriba su número de contacto"
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="cf-empresa" className="field-label">Empresa</label>
          <input
            id="cf-empresa"
            name="empresa"
            type="text"
            placeholder="Indique el nombre de su empresa"
            className="field-input"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-asunto" className="field-label">Asunto *</label>
          <input
            id="cf-asunto"
            name="asunto"
            type="text"
            required
            placeholder="Indique brevemente el motivo de su consulta"
            className="field-input"
            aria-invalid={err.asunto ? "true" : undefined}
            aria-describedby={err.asunto ? "cf-asunto-err" : undefined}
          />
          {err.asunto && <span id="cf-asunto-err" className="field-error">{err.asunto}</span>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-mensaje" className="field-label">Mensaje *</label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            rows={5}
            required
            placeholder="Describa su requerimiento o consulta"
            className="field-input resize-y"
            aria-invalid={err.mensaje ? "true" : undefined}
            aria-describedby={err.mensaje ? "cf-mensaje-err" : undefined}
          />
          {err.mensaje && <span id="cf-mensaje-err" className="field-error">{err.mensaje}</span>}
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
          He leído y acepto la{" "}
          <a href="/politica-de-privacidad" className="text-gold-txt underline underline-offset-2">
            Política de Privacidad
          </a>
          .
        </span>
      </label>
      {err.acepta && <span id="cf-acepta-err" className="field-error">{err.acepta}</span>}

      {/* Estado global (éxito o error no atado a un campo) */}
      {state.status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 border-l-2 border-gold-ink bg-paper p-4 text-body-sm text-txt-l"
        >
          {state.message}
        </div>
      )}
      {state.status === "error" && !state.fieldErrors && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 border-l-2 border-error bg-paper p-4 text-body-sm text-error"
        >
          {state.message}
        </div>
      )}
      {state.status === "error" && state.fieldErrors && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 border-l-2 border-error bg-paper p-4 text-body-sm text-error"
        >
          {state.message}
        </div>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
