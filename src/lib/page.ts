import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/i18n";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Resolve and validate the [locale] route param. */
export async function resolveLocale(params: LocaleParams["params"]): Promise<{ locale: Locale; t: ReturnType<typeof getDictionary> }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getDictionary(locale) };
}
