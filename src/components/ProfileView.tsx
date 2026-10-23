import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { format, type Locale } from "@/i18n/config";
import type { CredentialStatus, Listing } from "@/data/types";
import { href, kindPath } from "@/lib/routes";
import { Icon, type IconName } from "./Icon";
import { Chip, DemoBadge, Illustration, Monogram, Notice } from "./ui";

const kindIllustration = {
  startup: "startups",
  business: "businesses",
  professional: "professionals",
  contractor: "contractors",
} as const;

export function ProfileView({ listing, locale, t }: { listing: Listing; locale: Locale; t: Dictionary }) {
  const d = t.directory;
  const listPath = kindPath[listing.kind];
  const listTitle = t.nav[listPath as "startups" | "businesses" | "professionals" | "contractors"];
  const personLabel = listing.kind === "startup" ? d.founder : d.owner;
  const canQuote = listing.kind === "contractor" || listing.kind === "business";

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "pin", label: t.directory.location, value: `${listing.city}, ${listing.state}` },
    { icon: "globe", label: d.languages, value: listing.languages.map((l) => t.languageNames[l]).join(", ") },
  ];
  if (listing.person) facts.push({ icon: "users", label: personLabel, value: listing.person });
  if (listing.stage) facts.push({ icon: "rocket", label: d.stage, value: t.stages[listing.stage] });
  if (listing.teamSize) facts.push({ icon: "users", label: d.team, value: String(listing.teamSize) });
  if (listing.serviceArea) facts.push({ icon: "pin", label: d.serviceArea, value: listing.serviceArea[locale] });
  if (listing.hours) facts.push({ icon: "clock", label: d.hours, value: listing.hours[locale] });

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-navy-50 to-white">
        <div className="container-page py-10 sm:py-14">
          <Link href={href(locale, listPath)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-700 hover:text-navy-900">
            <Icon name="arrowLeft" className="h-4 w-4" />
            {format(d.backTo, { name: listTitle })}
          </Link>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Monogram name={listing.name} size="lg" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold sm:text-4xl">{listing.name}</h1>
                {listing.demo && <DemoBadge label={t.demo.badge} />}
              </div>
              <p className="mt-1 font-semibold text-teal-700">{t.categories[listing.category]}</p>
              <p className="mt-2 max-w-2xl text-lg text-muted">{listing.tagline[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-8">
          {listing.demo && <Notice title={t.demo.title}>{t.demo.notice}</Notice>}

          <section aria-labelledby="about-h">
            <h2 id="about-h" className="text-2xl font-bold">{d.about}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{listing.description[locale]}</p>
          </section>

          <section aria-labelledby="services-h">
            <h2 id="services-h" className="text-2xl font-bold">{d.services}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {listing.services[locale].map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-navy-900">{s}</span>
                </li>
              ))}
            </ul>
          </section>

          {listing.lookingFor && listing.lookingFor.length > 0 && (
            <section aria-labelledby="lf-h">
              <h2 id="lf-h" className="text-2xl font-bold">{d.lookingFor}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {listing.lookingFor.map((k) => (
                  <Chip key={k} tone="teal">{t.lookingFor[k]}</Chip>
                ))}
              </div>
            </section>
          )}

          {listing.credentials && (
            <section aria-labelledby="cred-h">
              <h2 id="cred-h" className="text-2xl font-bold">{d.credentials}</h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <Credential label={d.license} status={listing.credentials.license} t={t} />
                <Credential label={d.insurance} status={listing.credentials.insurance} t={t} />
              </dl>
              <p className="mt-3 text-sm text-muted">{d.credentialNote}</p>
            </section>
          )}

          {listing.kind === "contractor" && (
            <section aria-labelledby="gal-h">
              <h2 id="gal-h" className="text-2xl font-bold">{d.gallery}</h2>
              <div className="mt-4 grid items-center gap-4 rounded-[var(--radius-card)] border border-dashed border-line bg-navy-50/50 p-6 sm:grid-cols-[200px_1fr]">
                <Illustration name={kindIllustration[listing.kind]} className="max-w-[200px]" />
                <p className="text-muted">{d.galleryEmpty}</p>
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-5">
          <div className="card p-5">
            <dl className="space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-3">
                  <Icon name={f.icon} className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted">{f.label}</dt>
                    <dd className="font-medium text-navy-900">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="card p-5">
            <h2 className="text-lg font-bold">{d.contactTitle}</h2>
            <p className="mt-2 flex gap-2 text-sm text-muted">
              <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
              {d.contactPrivate}
            </p>
            <div className="mt-4 grid gap-2">
              {canQuote && (
                <Link href={`${href(locale, "request-quote")}?service=${listing.category}`} className="btn-primary w-full">
                  {t.cta.requestQuote}
                </Link>
              )}
              <Link href={href(locale, "login")} className="btn-outline w-full">
                {t.nav.signIn}
              </Link>
              {listing.website && (
                <a href={listing.website} target="_blank" rel="noopener noreferrer nofollow" className="btn-outline w-full">
                  {t.cta.visitWebsite}
                  <Icon name="external" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Credential({ label, status, t }: { label: string; status: CredentialStatus; t: Dictionary }) {
  const styles: Record<CredentialStatus, string> = {
    verified: "bg-teal-50 text-teal-700 border-teal-500/30",
    selfReported: "bg-amber-50 text-amber-900 border-amber-200",
    notProvided: "bg-navy-50 text-muted border-line",
  };
  return (
    <div className={`rounded-2xl border p-4 ${styles[status]}`}>
      <dt className="text-xs font-bold uppercase tracking-wide">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 font-semibold">
        <Icon name={status === "verified" ? "shield" : "info"} className="h-4 w-4" />
        {t.directory.credentialStatus[status]}
      </dd>
    </div>
  );
}
