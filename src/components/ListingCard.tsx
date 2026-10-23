import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { Listing } from "@/data/types";
import { listingHref } from "@/lib/routes";
import { Icon } from "./Icon";
import { Chip, DemoBadge, Monogram } from "./ui";

export type CardLabels = Pick<Dictionary, "categories" | "stages" | "lookingFor" | "languageNames" | "demo" | "cta">;

export function ListingCard({ listing, locale, t }: { listing: Listing; locale: Locale; t: CardLabels }) {
  const url = listingHref(locale, listing.kind, listing.slug);
  return (
    <article className="card group relative flex h-full flex-col p-5 transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-4">
        <Monogram name={listing.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold leading-snug">
              <Link href={url} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] hover:text-teal-700">
                {listing.name}
              </Link>
            </h3>
            {listing.demo && <DemoBadge label={t.demo.badge} />}
          </div>
          <p className="mt-0.5 text-sm font-semibold text-teal-700">{t.categories[listing.category]}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{listing.tagline[locale]}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {listing.stage && <Chip tone="teal">{t.stages[listing.stage]}</Chip>}
        {listing.lookingFor?.slice(0, 2).map((k) => (
          <Chip key={k}>{t.lookingFor[k]}</Chip>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="pin" className="h-4 w-4 text-teal-700" />
          {listing.city}, {listing.state}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="globe" className="h-4 w-4 text-teal-700" />
          {listing.languages.map((l) => l.toUpperCase()).join(" · ")}
        </span>
      </div>
    </article>
  );
}
