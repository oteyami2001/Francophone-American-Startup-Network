import type { Locale } from "@/i18n/config";
import type { LanguageCode, Listing } from "@/data/types";

export interface DirectoryFilters {
  q: string;
  category: string;
  state: string;
  language: string;
  stage: string;
}

/** Accent- and case-insensitive text. */
export function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function filterListings(
  listings: Listing[],
  locale: Locale,
  f: DirectoryFilters,
  categoryLabels?: Record<string, string>,
): Listing[] {
  const q = normalize(f.q.trim());
  return listings.filter((l) => {
    if (f.category && l.category !== f.category) return false;
    if (f.state && l.state !== f.state) return false;
    if (f.language && !l.languages.includes(f.language as LanguageCode)) return false;
    if (f.stage && l.stage !== f.stage) return false;
    if (!q) return true;
    const hay = normalize(
      [
        l.name,
        l.city,
        l.tagline[locale],
        l.description[locale],
        ...l.services[locale],
        categoryLabels?.[l.category] ?? l.category,
      ].join(" "),
    );
    return q.split(/\s+/).every((word) => hay.includes(word));
  });
}

