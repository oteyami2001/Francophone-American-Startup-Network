"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";
import { format, type Locale } from "@/i18n/config";
import type { CategoryKey, LanguageCode, Listing, StageKey, StateCode } from "@/data/types";
import { filterListings } from "@/lib/directory";
import { Icon } from "./Icon";
import { ListingCard, type CardLabels } from "./ListingCard";
import { EmptyState } from "./ui";

export type DirectoryLabels = CardLabels & Pick<Dictionary, "directory">;

const STATE_NAMES: Record<StateCode, string> = { DC: "Washington, D.C.", MD: "Maryland", VA: "Virginia" };

export function DirectoryBrowser({
  listings,
  locale,
  t,
  showStage = false,
}: {
  listings: Listing[];
  locale: Locale;
  t: DirectoryLabels;
  showStage?: boolean;
}) {
  const id = useId();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("");
  const [stage, setStage] = useState("");

  // Allow deep links such as ?q=plumbing or ?category=hvac
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q")) setQ(p.get("q")!.slice(0, 100));
    const c = p.get("category");
    if (c && listings.some((l) => l.category === c)) setCategory(c);
  }, [listings]);

  const categories = useMemo(
    () => [...new Set(listings.map((l) => l.category))].sort((a, b) => t.categories[a].localeCompare(t.categories[b], locale)) as CategoryKey[],
    [listings, t.categories, locale],
  );
  const languages = useMemo(() => [...new Set(listings.flatMap((l) => l.languages))] as LanguageCode[], [listings]);
  const stages = useMemo(() => [...new Set(listings.map((l) => l.stage).filter(Boolean))] as StageKey[], [listings]);
  const states = useMemo(() => [...new Set(listings.map((l) => l.state))].sort() as StateCode[], [listings]);

  const results = useMemo(
    () => filterListings(listings, locale, { q, category, state, language, stage }, t.categories),
    [listings, locale, q, category, state, language, stage, t.categories],
  );

  const hasFilters = q || category || state || language || stage;
  const clear = () => {
    setQ("");
    setCategory("");
    setState("");
    setLanguage("");
    setStage("");
  };

  const d = t.directory;
  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="card grid gap-3 p-4 sm:grid-cols-2 lg:flex lg:items-end">
        <div className="sm:col-span-2 lg:flex-[2]">
          <label htmlFor={`${id}-q`} className="field-label">
            {d.searchLabel}
          </label>
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id={`${id}-q`}
              type="search"
              value={q}
              maxLength={100}
              onChange={(e) => setQ(e.target.value)}
              placeholder={d.searchPlaceholder}
              className="field-input pl-11"
            />
          </div>
        </div>
        <Select id={`${id}-cat`} label={d.category} value={category} onChange={setCategory} all={d.allCategories}
          options={categories.map((c) => [c, t.categories[c]])} />
        <Select id={`${id}-loc`} label={d.location} value={state} onChange={setState} all={d.allLocations}
          options={states.map((s) => [s, STATE_NAMES[s]])} />
        <Select id={`${id}-lang`} label={d.language} value={language} onChange={setLanguage} all={d.allLanguages}
          options={languages.map((l) => [l, t.languageNames[l]])} />
        {showStage && (
          <Select id={`${id}-stage`} label={d.stage} value={stage} onChange={setStage} all={d.allStages}
            options={stages.map((s) => [s, t.stages[s]])} />
        )}
      </form>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-navy-900" aria-live="polite" role="status">
          {results.length === 1 ? d.resultsOne : format(d.results, { count: results.length })}
        </p>
        {hasFilters && (
          <button type="button" onClick={clear} className="min-h-11 text-sm font-semibold text-teal-700 hover:text-navy-900">
            {d.clearFilters}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={d.noResultsTitle}
            text={d.noResultsText}
            action={
              <button type="button" onClick={clear} className="btn-outline">
                {d.clearFilters}
              </button>
            }
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <li key={l.slug}>
              <ListingCard listing={l} locale={locale} t={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  all,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  all: string;
  options: [string, string][];
}) {
  return (
    <div className="lg:flex-1">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field-input">
        <option value="">{all}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
