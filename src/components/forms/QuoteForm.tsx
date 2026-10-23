"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { format, type Locale } from "@/i18n/config";
import { quoteServices } from "@/data/services";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { ALLOWED_IMAGE_TYPES, MAX_FILES, rules, validate, validateFiles, type ErrorKey, type Schema } from "@/lib/validation";
import { Icon } from "../Icon";
import { Consent, ErrorSummary, FormResult, SelectField, TextArea, TextField, errorText, focusFirstError } from "./fields";
import { Honeypot } from "./Honeypot";

type Labels = Pick<Dictionary, "forms" | "quote" | "categories">;

export function QuoteForm({ locale, t }: { locale: Locale; t: Labels }) {
  const f = t.forms;
  const q = t.quote;
  const [step, setStep] = useState(0);
  const [v, setV] = useState({
    service: "",
    zip: "",
    details: "",
    startDate: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<ErrorKey | null>(null);
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, ErrorKey>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Pre-select a service from ?service=plumbing (links from profiles and the homepage)
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && (quoteServices as readonly string[]).includes(s)) setV((x) => ({ ...x, service: s }));
  }, []);

  // Move focus to the step heading when the step changes (screen readers + keyboard)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  const schemas: Schema[] = [
    { service: [rules.required()], zip: [rules.required(), rules.zip()] },
    { details: [rules.required(), rules.maxLength()], startDate: [rules.futureDate()] },
    { name: [rules.required(), rules.maxLength(120)], email: [rules.required(), rules.email()], phone: [rules.phone()] },
  ];

  function check(current: number) {
    const errs = validate(v, schemas[current]!);
    if (current === 1 && fileError) errs.photos = fileError;
    if (current === 2 && !consent) errs.consent = "consent";
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return false;
    }
    return true;
  }

  function onFiles(list: FileList | null) {
    const arr = list ? Array.from(list) : [];
    const err = validateFiles(arr);
    setFileError(err);
    setFiles(err ? [] : arr);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) {
      if (check(step)) setStep(step + 1);
      return;
    }
    if (!check(2)) return;
    if (trap) return setResult("sent");
    setBusy(true);
    setResult(
      await submitForm("quote", {
        ...v,
        locale,
        // Photos are uploaded to storage by the backend in production; only metadata is sent here.
        photos: files.map((x) => ({ name: x.name, type: x.type, size: x.size })),
        consent: true,
      }),
    );
    setBusy(false);
  }

  if (result && result !== "error") return <FormResult result={result} t={f} />;

  const serviceOptions = quoteServices.map((s) => [s, t.categories[s]] as [string, string]);
  const budgetOptions = Object.entries(q.budgetOptions) as [string, string][];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form noValidate onSubmit={onSubmit} className="relative">
      {/* Progress */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label={format(f.step, { current: step + 1, total: 3 })}>
        {q.steps.map((label, i) => (
          <li key={label} className="min-w-0">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-teal-500" : "bg-line"}`} />
            <p className={`mt-2 truncate text-xs font-bold uppercase tracking-wide ${i === step ? "text-navy-900" : "text-muted"}`} aria-current={i === step ? "step" : undefined}>
              {i + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="mb-1 text-2xl font-bold outline-none">
        {q.steps[step]}
      </h2>
      <p className="mb-6 text-sm text-muted">{format(f.step, { current: step + 1, total: 3 })}</p>

      <div className="space-y-5">
        <ErrorSummary show={Object.keys(errors).length > 0} t={f} />
        {result === "error" && <FormResult result="error" t={f} />}

        {step === 0 && (
          <>
            <SelectField t={f} name="service" label={q.service} required placeholder={q.chooseService} value={v.service} onChange={set("service")} options={serviceOptions} error={errorText(f, errors.service)} />
            <TextField t={f} name="zip" label={f.zip} required inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="20001" value={v.zip} onChange={set("zip")} error={errorText(f, errors.zip)} />
          </>
        )}

        {step === 1 && (
          <>
            <TextArea t={f} name="details" label={q.projectDetails} required placeholder={q.projectPlaceholder} value={v.details} onChange={set("details")} error={errorText(f, errors.details)} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-startDate" className="field-label">
                  {q.startDate} <span className="ml-1 text-xs font-normal text-muted">({f.optional})</span>
                </label>
                <input
                  id="f-startDate"
                  type="date"
                  min={today}
                  value={v.startDate}
                  onChange={(e) => set("startDate")(e.target.value)}
                  className="field-input"
                  aria-invalid={errors.startDate ? true : undefined}
                  aria-describedby={errors.startDate ? "f-startDate-err" : undefined}
                />
                {errors.startDate && <p id="f-startDate-err" className="field-error">{errorText(f, errors.startDate)}</p>}
              </div>
              <SelectField t={f} name="budget" label={q.budget} value={v.budget} onChange={set("budget")} options={budgetOptions} />
            </div>
            <div>
              <label htmlFor="f-photos" className="field-label">
                {q.photos} <span className="ml-1 text-xs font-normal text-muted">({f.optional})</span>
              </label>
              <label htmlFor="f-photos" className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line bg-navy-50/40 px-4 py-6 text-center hover:border-teal-500">
                <Icon name="upload" className="h-7 w-7 text-teal-700" />
                <span className="text-sm font-semibold text-navy-900">{q.photosHint}</span>
                {files.length > 0 && <span className="text-sm text-muted">{files.map((x) => x.name).join(", ")}</span>}
              </label>
              <input
                id="f-photos"
                type="file"
                multiple
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onChange={(e) => onFiles(e.target.files)}
                className="sr-only"
                aria-describedby={fileError ? "f-photos-err" : undefined}
                data-max={MAX_FILES}
              />
              {fileError && <p id="f-photos-err" className="field-error">{errorText(f, fileError)}</p>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField t={f} name="name" label={f.fullName} required autoComplete="name" value={v.name} onChange={set("name")} error={errorText(f, errors.name)} />
              <TextField t={f} name="email" type="email" inputMode="email" label={f.email} required autoComplete="email" value={v.email} onChange={set("email")} error={errorText(f, errors.email)} />
              <TextField t={f} name="phone" type="tel" inputMode="tel" label={f.phone} autoComplete="tel" value={v.phone} onChange={set("phone")} error={errorText(f, errors.phone)} />
            </div>
            <div className="rounded-2xl border border-line bg-navy-50/50 p-4 text-sm">
              <p className="font-bold text-navy-900">{q.review}</p>
              <dl className="mt-2 grid gap-1 text-muted sm:grid-cols-2">
                <div><dt className="inline font-semibold text-navy-900">{q.service}: </dt><dd className="inline">{v.service ? t.categories[v.service as keyof Labels["categories"]] : "—"}</dd></div>
                <div><dt className="inline font-semibold text-navy-900">{f.zip}: </dt><dd className="inline">{v.zip}</dd></div>
                <div><dt className="inline font-semibold text-navy-900">{q.budget}: </dt><dd className="inline">{v.budget ? q.budgetOptions[v.budget as keyof typeof q.budgetOptions] : "—"}</dd></div>
                <div><dt className="inline font-semibold text-navy-900">{q.photos}: </dt><dd className="inline">{files.length}</dd></div>
              </dl>
            </div>
            <p className="flex gap-2 text-sm text-muted">
              <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
              {q.privacy}
            </p>
            <Consent name="consent" checked={consent} onChange={setConsent} label={f.consentQuote} error={errorText(f, errors.consent)} />
            <Honeypot value={trap} onChange={setTrap} />
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button type="button" className="btn-outline" onClick={() => { setErrors({}); setStep(step - 1); }}>
            <Icon name="arrowLeft" className="h-4 w-4" />
            {f.back}
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn-primary" disabled={busy}>
          {step < 2 ? f.next : busy ? f.sending : t.forms.submit}
          {step < 2 && <Icon name="arrow" className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
