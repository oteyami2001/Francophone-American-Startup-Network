import { locales, type Locale } from "@/i18n/config";
import type { ListingKind } from "@/data/types";

/** All static page paths (without locale prefix). */
export const pagePaths = [
  "",
  "community",
  "startups",
  "businesses",
  "professionals",
  "contractors",
  "marketplace",
  "events",
  "opportunities",
  "jobs",
  "resources",
  "about",
  "contact",
  "join",
  "login",
  "request-quote",
  "privacy",
  "terms",
  "community-guidelines",
] as const;

export type PagePath = (typeof pagePaths)[number];

export function href(locale: Locale, path: string = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export const kindPath: Record<ListingKind, PagePath> = {
  startup: "startups",
  business: "businesses",
  professional: "professionals",
  contractor: "contractors",
};

export function listingHref(locale: Locale, kind: ListingKind, slug: string): string {
  return href(locale, `${kindPath[kind]}/${slug}`);
}

/** Swap the locale segment of a path: /en/startups/ → /fr/startups/ */
export function swapLocale(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  // parts[0] is "" (leading slash); parts[1] is the current locale
  if (parts.length > 1 && (locales as readonly string[]).includes(parts[1]!)) {
    parts[1] = target;
    const out = parts.join("/");
    return out.endsWith("/") ? out : `${out}/`;
  }
  return `/${target}/`;
}
