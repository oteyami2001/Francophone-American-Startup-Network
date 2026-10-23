"use client";

import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { format } from "@/i18n/config";
import { MAX_TEXT, type ErrorKey } from "@/lib/validation";
import type { SubmitResult } from "@/lib/forms";
import { Icon } from "../Icon";

export type FormLabels = Dictionary["forms"];

export function errorText(t: FormLabels, key: ErrorKey | undefined): string | undefined {
  if (!key) return undefined;
  return key === "tooLong" ? format(t.errors.tooLong, { max: MAX_TEXT }) : t.errors[key];
}

interface BaseProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  t: FormLabels;
}

function Label({ name, label, required, t }: Pick<BaseProps, "name" | "label" | "required" | "t">) {
  return (
    <label htmlFor={`f-${name}`} className="field-label">
      {label}
      {required ? (
        <span className="text-red-700" aria-hidden="true"> *</span>
      ) : (
        <span className="ml-1 text-xs font-normal text-muted">({t.optional})</span>
      )}
    </label>
  );
}

function Describe({ name, error, hint }: { name: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && (
        <p id={`f-${name}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`f-${name}-err`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

function aria(name: string, error?: string, hint?: string) {
  const ids = [hint && `f-${name}-hint`, error && `f-${name}-err`].filter(Boolean).join(" ");
  return { "aria-invalid": error ? true : undefined, "aria-describedby": ids || undefined };
}

export function TextField({
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
  maxLength = 200,
  ...p
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
  maxLength?: number;
}) {
  return (
    <div>
      <Label {...p} />
      <input
        id={`f-${p.name}`}
        name={p.name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        required={p.required}
        className="field-input"
        {...aria(p.name, p.error, p.hint)}
      />
      <Describe name={p.name} error={p.error} hint={p.hint} />
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 5,
  ...p
}: BaseProps & { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <Label {...p} />
      <textarea
        id={`f-${p.name}`}
        name={p.name}
        value={value}
        rows={rows}
        maxLength={MAX_TEXT}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={p.required}
        className="field-input"
        {...aria(p.name, p.error, p.hint)}
      />
      <Describe name={p.name} error={p.error} hint={p.hint} />
    </div>
  );
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  ...p
}: BaseProps & { value: string; onChange: (v: string) => void; options: [string, string][]; placeholder?: string }) {
  return (
    <div>
      <Label {...p} />
      <select
        id={`f-${p.name}`}
        name={p.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={p.required}
        className="field-input"
        {...aria(p.name, p.error, p.hint)}
      >
        <option value="">{placeholder ?? "—"}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <Describe name={p.name} error={p.error} hint={p.hint} />
    </div>
  );
}

export function CheckboxGroup({
  legend,
  name,
  options,
  values,
  onChange,
}: {
  legend: string;
  name: string;
  options: [string, string][];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(([v, l]) => {
          const checked = values.includes(v);
          return (
            <label
              key={v}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                checked ? "border-teal-500 bg-teal-50 text-navy-900" : "border-line hover:border-navy-100"
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={v}
                checked={checked}
                onChange={(e) => onChange(e.target.checked ? [...values, v] : values.filter((x) => x !== v))}
                className="h-4 w-4 accent-teal-600"
              />
              {l}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Consent({
  name,
  checked,
  onChange,
  label,
  error,
}: {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input
          id={`f-${name}`}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-teal-600"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `f-${name}-err` : undefined}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`f-${name}-err`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormResult({ result, t, onReset }: { result: SubmitResult; t: FormLabels; onReset?: () => void }) {
  if (result === "error") {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
        {t.errors.generic}
      </div>
    );
  }
  const preview = result === "preview";
  return (
    <div role="status" className="card flex flex-col items-center p-8 text-center">
      <span className={`grid h-14 w-14 place-items-center rounded-full ${preview ? "bg-amber-50 text-amber-800" : "bg-teal-100 text-teal-700"}`}>
        <Icon name={preview ? "info" : "check"} className="h-7 w-7" />
      </span>
      <h2 className="mt-4 text-2xl font-bold">{preview ? t.previewTitle : t.successTitle}</h2>
      <p className="mt-2 max-w-md text-muted">{preview ? t.previewNotice : t.successText}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="btn-outline mt-6">
          {t.back}
        </button>
      )}
    </div>
  );
}

export function ErrorSummary({ show, t }: { show: boolean; t: FormLabels }) {
  if (!show) return null;
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
      {t.errors.summary}
    </div>
  );
}

/** Move focus to the first invalid field after a failed submit. */
export function focusFirstError(errors: Record<string, unknown>) {
  const first = Object.keys(errors)[0];
  if (first) requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
}
