"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initial: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      aria-busy={pending || undefined}
    >
      {pending ? "Ingresando…" : "Ingresar"}
    </button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState(loginAction, initial);
  return (
    <form action={action} className="grid gap-5" noValidate>
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="li-email" className="field-label">Correo</label>
        <input
          id="li-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="field-input"
          placeholder="admin@mansedoconsulting.com"
        />
      </div>
      <div>
        <label htmlFor="li-pass" className="field-label">Contraseña</label>
        <input
          id="li-pass"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field-input"
          placeholder="••••••••"
        />
      </div>
      {state.status === "error" && (
        <div role="alert" className="border-l-2 border-error bg-paper p-3 text-body-sm text-error">
          {state.message}
        </div>
      )}
      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
