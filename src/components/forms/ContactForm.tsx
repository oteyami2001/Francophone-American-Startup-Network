"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { rules, validate, type ErrorKey } from "@/lib/validation";
import { ErrorSummary, FormResult, TextArea, TextField, errorText, focusFirstError } from "./fields";
import { Honeypot } from "./Honeypot";

export function ContactForm({ locale, t }: { locale: Locale; t: Pick<Dictionary, "forms"> }) {
  const f = t.forms;
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, ErrorKey>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v, {
      name: [rules.required(), rules.maxLength(120)],
      email: [rules.required(), rules.email()],
      subject: [rules.maxLength(160)],
      message: [rules.required(), rules.maxLength()],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    if (trap) return setResult("sent");
    setBusy(true);
    setResult(await submitForm("contact", { ...v, locale }));
    setBusy(false);
  }

  if (result && result !== "error") return <FormResult result={result} t={f} />;

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5">
      <ErrorSummary show={Object.keys(errors).length > 0} t={f} />
      {result === "error" && <FormResult result="error" t={f} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField t={f} name="name" label={f.fullName} required autoComplete="name" value={v.name} onChange={set("name")} error={errorText(f, errors.name)} />
        <TextField t={f} name="email" type="email" inputMode="email" label={f.email} required autoComplete="email" value={v.email} onChange={set("email")} error={errorText(f, errors.email)} />
      </div>
      <TextField t={f} name="subject" label={f.subject} value={v.subject} onChange={set("subject")} error={errorText(f, errors.subject)} />
      <TextArea t={f} name="message" label={f.message} required rows={6} value={v.message} onChange={set("message")} error={errorText(f, errors.message)} />
      <Honeypot value={trap} onChange={setTrap} />
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
        {busy ? f.sending : f.send}
      </button>
    </form>
  );
}
