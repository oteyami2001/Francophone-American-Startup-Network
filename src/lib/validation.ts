/** Pure validation helpers shared by all forms (and unit-tested). */

export type ErrorKey =
  | "required"
  | "email"
  | "phone"
  | "zip"
  | "url"
  | "password"
  | "consent"
  | "tooLong"
  | "fileType"
  | "fileSize"
  | "fileCount"
  | "date";

export const MAX_TEXT = 2000;
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const isBlank = (v: string | undefined | null) => !v || v.trim().length === 0;

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.length <= 254;
}

export function isPhone(v: string): boolean {
  const digits = v.replace(/[^\d]/g, "");
  return /^[\d\s()+.-]+$/.test(v.trim()) && digits.length >= 10 && digits.length <= 15;
}

export function isZip(v: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(v.trim());
}

export function isHttpsUrl(v: string): boolean {
  try {
    const u = new URL(v.trim());
    return u.protocol === "https:" && u.hostname.includes(".");
  } catch {
    return false;
  }
}

/** True when the ISO date (YYYY-MM-DD) is today or later. */
export function isFutureOrToday(v: string, today: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T23:59:59`);
  return !Number.isNaN(d.getTime()) && d.getTime() >= today.getTime() - 1000;
}

export interface FileLike {
  type: string;
  size: number;
}

export function validateFiles(files: FileLike[]): ErrorKey | null {
  if (files.length > MAX_FILES) return "fileCount";
  if (files.some((f) => !ALLOWED_IMAGE_TYPES.includes(f.type))) return "fileType";
  if (files.some((f) => f.size > MAX_FILE_BYTES)) return "fileSize";
  return null;
}

type Rule = (value: string) => ErrorKey | null;

export const rules = {
  required: (): Rule => (v) => (isBlank(v) ? "required" : null),
  email: (): Rule => (v) => (isBlank(v) ? null : isEmail(v) ? null : "email"),
  phone: (): Rule => (v) => (isBlank(v) ? null : isPhone(v) ? null : "phone"),
  zip: (): Rule => (v) => (isBlank(v) ? null : isZip(v) ? null : "zip"),
  url: (): Rule => (v) => (isBlank(v) ? null : isHttpsUrl(v) ? null : "url"),
  minLength: (n: number, key: ErrorKey = "password"): Rule => (v) => (v.length < n ? key : null),
  maxLength: (n: number = MAX_TEXT): Rule => (v) => (v.length > n ? "tooLong" : null),
  futureDate: (): Rule => (v) => (isBlank(v) ? null : isFutureOrToday(v) ? null : "date"),
};

export type Schema = Record<string, Rule[]>;

/** Validate a flat record of string values; returns the first error per field. */
export function validate(values: Record<string, string>, schema: Schema): Record<string, ErrorKey> {
  const errors: Record<string, ErrorKey> = {};
  for (const [field, fieldRules] of Object.entries(schema)) {
    const value = values[field] ?? "";
    for (const rule of fieldRules) {
      const err = rule(value);
      if (err) {
        errors[field] = err;
        break;
      }
    }
  }
  return errors;
}
