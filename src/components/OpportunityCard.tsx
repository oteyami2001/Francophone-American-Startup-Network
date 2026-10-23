import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { OfficialLink, Opportunity } from "@/data/types";
import { Icon } from "./Icon";
import { Chip, DemoBadge } from "./ui";

export function OpportunityCard({
  item,
  locale,
  t,
}: {
  item: Opportunity;
  locale: Locale;
  t: Pick<Dictionary, "opportunities" | "demo">;
}) {
  const o = t.opportunities;
  const deadline = item.deadline
    ? new Date(`${item.deadline}T12:00:00`).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : o.rolling;
  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="teal">{o.types[item.type]}</Chip>
        {item.demo && <DemoBadge label={t.demo.badge} />}
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug">{item.title[locale]}</h3>
      <p className="mt-1 flex-1 text-[15px] leading-relaxed text-muted">{item.description[locale]}</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
        <div className="col-span-2">
          <dt className="font-bold text-navy-900">{o.eligibility}</dt>
          <dd className="text-muted">{item.eligibility[locale]}</dd>
        </div>
        <div>
          <dt className="font-bold text-navy-900">{o.region}</dt>
          <dd className="text-muted">{item.region[locale]}</dd>
        </div>
        <div>
          <dt className="font-bold text-navy-900">{o.deadline}</dt>
          <dd className="text-muted">{deadline}</dd>
        </div>
      </dl>
    </article>
  );
}

const SCOPE_LABEL: Record<OfficialLink["scope"], string> = { US: "U.S.", DC: "D.C.", MD: "MD", VA: "VA" };

export function OfficialLinks({ links, locale }: { links: OfficialLink[]; locale: Locale }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map((l) => (
        <li key={l.url + l.name}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-teal-500"
          >
            <span className="mt-0.5 grid h-8 min-w-8 place-items-center rounded-full bg-navy-50 px-1.5 text-[10px] font-extrabold text-navy-900">
              {SCOPE_LABEL[l.scope]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 font-semibold text-navy-900 group-hover:text-teal-700">
                {l.name}
                <Icon name="external" className="h-3.5 w-3.5 shrink-0" />
              </span>
              <span className="mt-0.5 block text-sm text-muted">{l.description[locale]}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
