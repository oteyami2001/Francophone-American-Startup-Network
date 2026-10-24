"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { supabase } from "@/lib/supabase";
import { rules, validate, type ErrorKey } from "@/lib/validation";
import { CheckboxGroup, Consent, ErrorSummary, FormResult, SelectField, TextField, errorText, focusFirstError } from "./fields";
import { Honeypot } from "./Honeypot";

const STATES: [string, string][] = [
  ["DC", "Washington, D.C."],
  ["MD", "Maryland"],
  ["VA", "Virginia"],
  ["other", "Other / Autre"],
];

export function JoinForm({ locale, t }: { locale: Locale; t: Pick<Dictionary, "forms"> }) {
  const f = t.forms;
  const [v, setV] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    state: "",
    role: "",
    company: "",
    linkedin: "",
    language: locale,
  });
  const [needs, setNeeds] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, ErrorKey>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault();

  const errs = validate(v, {
    firstName: [rules.required(), rules.maxLength(80)],
    lastName: [rules.required(), rules.maxLength(80)],
    email: [rules.required(), rules.email()],
    password: [rules.required(), rules.minLength(10)],
    state: [rules.required()],
    role: [rules.required()],
    linkedin: [rules.url()],
  });

  if (!consent) errs.consent = "consent";

  setErrors(errs);

  if (Object.keys(errs).length) {
    return focusFirstError(errs);
  }

  if (trap) {
    return setResult("sent");
  }

  setBusy(true);
  setResult(null);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: {
        data: {
          first_name: v.firstName,
          last_name: v.lastName,
          city: v.city,
          state: v.state,
          role: v.role,
          company: v.company,
          linkedin: v.linkedin,
          language: v.language,
          needs,
        },
      },
    });

    if (error) {
      alert(error.message);
      setResult("error");
      return;
    }

    const { password: _pw, ...profile } = v;
    void _pw;

    await submitForm("join", {
      ...profile,
      needs,
      locale,
      supabaseUserId: data.user?.id ?? "",
    });

    setResult("sent");
  } catch (error) {
    console.error("Sign-up error:", error);
    setResult("error");
  } finally {
    setBusy(false);
  }
}

  if (result && result !== "error") return <FormResult result={result} t={f} />;

  const roleOptions = Object.entries(f.roles) as [string, string][];
  const needOptions = Object.entries(f.needOptions) as [string, string][];

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-6">
      <ErrorSummary show={Object.keys(errors).length > 0} t={f} />
      {result === "error" && <FormResult result="error" t={f} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField t={f} name="firstName" label={f.firstName} required autoComplete="given-name" value={v.firstName} onChange={set("firstName")} error={errorText(f, errors.firstName)} />
        <TextField t={f} name="lastName" label={f.lastName} required autoComplete="family-name" value={v.lastName} onChange={set("lastName")} error={errorText(f, errors.lastName)} />
        <TextField t={f} name="email" type="email" inputMode="email" label={f.email} required autoComplete="email" value={v.email} onChange={set("email")} error={errorText(f, errors.email)} />
        <TextField t={f} name="password" type="password" label={f.password} required autoComplete="new-password" value={v.password} onChange={set("password")} error={errorText(f, errors.password)} hint={f.errors.password} />
        <TextField t={f} name="city" label={f.city} autoComplete="address-level2" value={v.city} onChange={set("city")} />
        <SelectField t={f} name="state" label={f.state} required value={v.state} onChange={set("state")} options={STATES} error={errorText(f, errors.state)} />
        <SelectField t={f} name="role" label={f.iAm} required value={v.role} onChange={set("role")} options={roleOptions} error={errorText(f, errors.role)} />
        <SelectField t={f} name="language" label={f.preferredLanguage} required value={v.language} onChange={set("language")} options={[["fr", "Français"], ["en", "English"]]} />
        <TextField t={f} name="company" label={f.company} autoComplete="organization" value={v.company} onChange={set("company")} />
        <TextField t={f} name="linkedin" type="url" inputMode="url" label={f.linkedin} placeholder="https://www.linkedin.com/in/…" value={v.linkedin} onChange={set("linkedin")} error={errorText(f, errors.linkedin)} />
      </div>
      <CheckboxGroup legend={f.needs} name="needs" options={needOptions} values={needs} onChange={setNeeds} />
      <Consent
        name="consent"
        checked={consent}
        onChange={setConsent}
        error={errorText(f, errors.consent)}
        label={<ConsentLabel locale={locale} text={f.consent} />}
      />
      <Honeypot value={trap} onChange={setTrap} />
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={busy}>
        {busy ? f.sending : f.createAccount}
      </button>
    </form>
  );
}

export function ConsentLabel({ locale, text }: { locale: Locale; text: string }) {
  return (
    <>
      {text}{" "}
      <span className="whitespace-nowrap">
        (
        <Link href={href(locale, "terms")} className="font-semibold text-teal-700 underline" target="_blank">
          {locale === "fr" ? "conditions" : "terms"}
        </Link>
        {" · "}
        <Link href={href(locale, "privacy")} className="font-semibold text-teal-700 underline" target="_blank">
          {locale === "fr" ? "confidentialité" : "privacy"}
        </Link>
        )
      </span>
    </>
  );
}
