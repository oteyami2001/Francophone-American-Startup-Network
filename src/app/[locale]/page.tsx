import Link from "next/link";
import type { Metadata } from "next";
import { events, opportunities } from "@/data/content";
import { listings } from "@/data/listings";
import { quoteServices } from "@/data/services";
import { EventCard } from "@/components/EventCard";
import { Icon, type IconName } from "@/components/Icon";
import { ListingCard } from "@/components/ListingCard";
import { OpportunityCard } from "@/components/OpportunityCard";
import { ArrowLink, EmptyState, Illustration, Notice, SectionHeading } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { asset, siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await resolveLocale(params);
  return pageMetadata(locale, "", undefined);
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const h = t.home;

  const explore: { path: string; icon: IconName; title: string; text: string }[] = [
    { path: "startups", icon: "rocket", title: t.nav.startups, text: t.pages.startups.intro },
    { path: "businesses", icon: "store", title: t.nav.businesses, text: t.pages.businesses.intro },
    { path: "professionals", icon: "briefcase", title: t.nav.professionals, text: t.pages.professionals.intro },
    { path: "contractors", icon: "hammer", title: t.nav.contractors, text: t.pages.contractors.intro },
    { path: "community", icon: "chat", title: t.nav.community, text: t.pages.community.intro },
    { path: "events", icon: "calendar", title: t.nav.events, text: t.pages.events.intro },
    { path: "opportunities", icon: "trend", title: t.nav.opportunities, text: t.pages.opportunities.intro },
    { path: "resources", icon: "book", title: t.nav.resources, text: t.pages.resources.intro },
  ];

  const featured = [
    listings.find((l) => l.kind === "startup")!,
    listings.find((l) => l.kind === "business")!,
    listings.find((l) => l.kind === "professional")!,
  ];

  const popular = quoteServices.slice(0, 8);
  const pillarIllustration = { connect: "connect", build: "build", grow: "grow" } as Record<string, string>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.meta.siteName,
    alternateName: "FASN",
    url: `${siteUrl}/${locale}/`,
    logo: `${siteUrl}/images/brand/fasn-emblem-512.png`,
    slogan: h.tagline,
    description: t.meta.description,
    areaServed: ["Washington, D.C.", "Maryland", "Virginia", "United States"],
    knowsLanguage: ["en", "fr"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 via-white to-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-teal-100/60 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:pb-20 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-white px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm">
              <Icon name="pin" className="h-4 w-4" />
              {h.eyebrow}
            </p>
            <h1 className="mt-6 font-extrabold leading-[1.05]">
              <span className="block text-[2rem] uppercase tracking-tight min-[400px]:text-4xl sm:text-5xl lg:text-[3.4rem]">Francophone-American</span>
              <span className="block text-[1.6rem] uppercase tracking-[0.12em] text-teal-600 min-[400px]:text-3xl sm:text-4xl lg:text-[2.6rem]">
                Startup <span className="text-navy-900">Network</span>
              </span>
            </h1>
            <p className="mt-6 text-2xl font-bold text-navy-900 sm:text-3xl">{h.tagline}</p>
            <p className="mt-3 text-lg font-semibold text-teal-700">{h.positioning}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{h.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={href(locale, "join")} className="btn-primary px-7 text-base">
                {t.cta.join}
                <Icon name="arrow" className="h-5 w-5" />
              </Link>
              <a href="#explore" className="btn-outline px-7 text-base">
                {t.cta.explore}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {[
                ["businesses", t.cta.findBusiness],
                ["join", t.cta.listBusiness],
                ["request-quote", t.cta.requestQuote],
              ].map(([p, label]) => (
                <li key={p}>
                  <ArrowLink href={href(locale, p)}>{label}</ArrowLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <Illustration name="hero-network" alt={h.heroImageAlt} width={640} height={520} priority />
          </div>
        </div>

        <div className="border-y border-line bg-white/70">
          <div className="container-page flex flex-col gap-3 py-5 md:flex-row md:items-center">
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-muted">{h.audienceTitle}</p>
            <ul className="flex flex-wrap gap-2">
              {h.audiences.map((a) => (
                <li key={a} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-semibold text-navy-800">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Connect / Build / Grow ─────────────────────── */}
      <section className="py-16 sm:py-24" aria-labelledby="journey-h">
        <div className="container-page">
          <SectionHeading id="journey-h" eyebrow={h.motto} title={h.journeyTitle} intro={h.journeyIntro} align="center" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {h.pillars.map((p, i) => (
              <li key={p.key} className="card relative flex flex-col overflow-hidden p-6">
                <span className="absolute right-5 top-5 font-[family-name:var(--font-display)] text-5xl font-extrabold text-navy-50" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="mx-auto w-full max-w-[260px]">
                  <Illustration name={pillarIllustration[p.key] ?? "connect"} width={320} height={230} />
                </div>
                <h3 className="mt-4 text-2xl font-extrabold">
                  <span className="text-teal-600">{p.title}</span>
                </h3>
                <p className="mt-2 text-muted">{p.description}</p>
                <ul className="mt-4 space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                      <Icon name="check" className="h-4 w-4 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Explore the ecosystem ──────────────────────── */}
      <section id="explore" className="scroll-mt-24 bg-navy-50/60 py-16 sm:py-24" aria-labelledby="explore-h">
        <div className="container-page">
          <SectionHeading id="explore-h" title={h.exploreTitle} intro={h.exploreIntro} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {explore.map((e) => (
              <li key={e.path}>
                <Link href={href(locale, e.path)} className="card group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-lg">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-teal-500 transition-colors group-hover:bg-teal-500 group-hover:text-navy-950">
                    <Icon name={e.icon} className="h-6 w-6" />
                  </span>
                  <span className="mt-4 text-lg font-bold text-navy-900">{e.title}</span>
                  <span className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted">{e.text}</span>
                  <span className="mt-auto pt-4 text-sm font-semibold text-teal-700">
                    {t.cta.learnMore} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Featured ───────────────────────────────────── */}
      <section className="py-16 sm:py-24" aria-labelledby="featured-h">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="featured-h" title={h.featuredTitle} intro={h.featuredIntro} />
            <ArrowLink href={href(locale, "startups")}>{t.cta.exploreStartups}</ArrowLink>
          </div>
          <div className="mt-6">
            <Notice title={t.demo.title}>{t.demo.notice}</Notice>
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((l) => (
              <li key={l.slug}>
                <ListingCard listing={l} locale={locale} t={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Request a quote ────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-24" aria-labelledby="quote-h">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow mb-3 !text-teal-500">{t.nav.contractors}</p>
            <h2 id="quote-h" className="text-3xl font-extrabold !text-white sm:text-4xl">{h.quoteTitle}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">{h.quoteIntro}</p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {h.quoteSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-500 font-extrabold text-navy-950">{i + 1}</span>
                  <span className="text-sm font-semibold">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm font-bold uppercase tracking-wider text-white/60">{h.quoteServicesTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {popular.map((s) => (
                <li key={s}>
                  <Link href={`${href(locale, "request-quote")}?service=${s}`} className="inline-flex min-h-9 items-center rounded-full border border-white/20 px-3 text-sm font-semibold text-white hover:border-teal-500 hover:text-teal-500">
                    {t.categories[s]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={href(locale, "request-quote")} className="btn-primary px-7">
                {t.cta.requestQuote}
              </Link>
              <Link href={href(locale, "contractors")} className="btn-ghost-light px-7">
                {t.cta.findProfessional}
              </Link>
            </div>
          </div>
          <div className="mx-auto hidden w-full max-w-md rounded-[2rem] bg-white p-4 lg:block">
            <Illustration name="contractors" />
          </div>
        </div>
      </section>

      {/* ── Opportunities ──────────────────────────────── */}
      <section className="py-16 sm:py-24" aria-labelledby="opp-h">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="opp-h" title={h.opportunitiesTitle} intro={h.opportunitiesIntro} />
            <div className="mt-6 max-w-sm">
              <Illustration name="opportunities" />
            </div>
            <div className="mt-6">
              <Link href={href(locale, "opportunities")} className="btn-navy">
                {t.cta.browseOpportunities}
              </Link>
            </div>
          </div>
          <ul className="grid content-start gap-5 sm:grid-cols-2">
            {opportunities.slice(0, 4).map((o) => (
              <li key={o.slug}>
                <OpportunityCard item={o} locale={locale} t={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Events + theme days ────────────────────────── */}
      <section className="bg-navy-50/60 py-16 sm:py-24" aria-labelledby="events-h">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="events-h" title={h.eventsTitle} intro={h.eventsIntro} />
            <ArrowLink href={href(locale, "events")}>{t.cta.browseEvents}</ArrowLink>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {events.slice(0, 3).map((e) => (
              <li key={e.slug}>
                <EventCard event={e} locale={locale} t={t} />
              </li>
            ))}
          </ul>

          <h3 className="mt-16 text-xl font-bold">{h.themeDaysTitle}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {t.themeDays.map((d) => (
              <li key={d.tag} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{d.day}</p>
                <p className="mt-1 text-lg font-extrabold text-teal-700">{d.tag}</p>
                <p className="mt-1 text-sm text-muted">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stories & partners (honest empty states) ───── */}
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <EmptyState
              icon="chat"
              title={h.storiesTitle}
              text={h.storiesEmpty}
              action={<Link href={href(locale, "contact")} className="btn-outline">{h.storiesCta}</Link>}
            />
          </div>
          <div>
            <EmptyState
              icon="users"
              title={h.partnersTitle}
              text={h.partnersEmpty}
              action={<Link href={href(locale, "contact")} className="btn-outline">{h.partnersCta}</Link>}
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section className="pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-800 to-teal-600 px-6 py-14 text-center text-white sm:px-12">
            <img src={asset("/images/brand/fasn-emblem.webp")} alt="" width={96} height={96} className="mx-auto h-20 w-20 rounded-3xl bg-white p-1.5 shadow-lg" />
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold !text-white sm:text-4xl">{h.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{h.finalIntro}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={href(locale, "join")} className="btn-primary px-8 text-base">
                {t.cta.join}
              </Link>
              <Link href={href(locale, "about")} className="btn-ghost-light px-8 text-base">
                {t.cta.learnMore}
              </Link>
            </div>
            <p className="mt-8 text-sm font-bold tracking-[0.2em] text-teal-100">{h.motto}</p>
          </div>
        </div>
      </section>
    </>
  );
}
