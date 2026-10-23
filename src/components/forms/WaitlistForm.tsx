"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { isEmail } from "@/lib/validation";
import { FormResult } from "./fields";

export function WaitlistForm({ locale, list, t }: { locale: Locale; list: string; t: Pick<Dictionary, "forms" | "cta"> }) {
  const f = t.forms;
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError(true);
    setError(false);
    setResult(await submitForm("waitlist", { email, list, locale }));
  }

  if (result && result !== "error") return <FormResult result={result} t={f} />;

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-lg">
      <label htmlFor={`wl-${list}`} className="field-label">
        {f.email}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`wl-${list}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input flex-1"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `wl-${list}-err` : undefined}
        />
        <button type="submit" className="btn-primary shrink-0">
          {t.cta.joinWaitlist}
        </button>
      </div>
      {error && (
        <p id={`wl-${list}-err`} className="field-error">
          {f.errors.email}
        </p>
      )}
      {result === "error" && <p className="field-error">{f.errors.generic}</p>}
    </form>
  );
}
