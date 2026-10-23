"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { rules, validate, type ErrorKey } from "@/lib/validation";
import { Notice } from "../ui";
import { ErrorSummary, TextField, errorText, focusFirstError } from "./fields";

/**
 * Sign-in UI. Authentication is not connected yet (planned: Amazon Cognito or
 * Supabase Auth), so a valid submit shows a clear preview notice instead.
 */
export function LoginForm({ locale, t }: { locale: Locale; t: Pick<Dictionary, "forms" | "cta"> }) {
  const f = t.forms;
  const [v, setV] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, ErrorKey>>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v, { email: [rules.required(), rules.email()], password: [rules.required()] });
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setSubmitted(true);
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <ErrorSummary show={Object.keys(errors).length > 0} t={f} />
      {submitted && (
        <Notice title={f.previewTitle}>
          {f.authPreview}{" "}
          <Link href={href(locale, "join")} className="font-semibold underline">
            {t.cta.joinWaitlist}
          </Link>
        </Notice>
      )}
      <TextField t={f} name="email" type="email" inputMode="email" label={f.email} required autoComplete="email" value={v.email} onChange={(x) => setV((s) => ({ ...s, email: x }))} error={errorText(f, errors.email)} />
      <TextField t={f} name="password" type="password" label={f.password} required autoComplete="current-password" value={v.password} onChange={(x) => setV((s) => ({ ...s, password: x }))} error={errorText(f, errors.password)} />
      <button type="submit" className="btn-navy w-full">
        {f.signIn}
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <button type="button" onClick={() => setSubmitted(true)} className="min-h-11 font-semibold text-teal-700 hover:text-navy-900">
          {f.forgot}
        </button>
        <span className="text-muted">
          {f.noAccount}{" "}
          <Link href={href(locale, "join")} className="font-semibold text-teal-700 hover:text-navy-900">
            {t.cta.join}
          </Link>
        </span>
      </div>
    </form>
  );
}
