import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Illustration, PageHero, SectionHeading } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { asset } from "@/lib/site";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "about", t.pages.about.title, t.pages.about.intro);
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const a = t.about;
  return (
    <>
      <PageHero eyebrow={t.home.motto} title={t.pages.about.title} intro={t.pages.about.intro}>
        <Link href={href(locale, "join")} className="btn-primary">{t.cta.join}</Link>
        <Link href={href(locale, "contact")} className="btn-outline">{t.cta.contactUs}</Link>
      </PageHero>

      <section className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{a.missionTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{a.mission}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{a.visionTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{a.vision}</p>
          </div>
        </div>
        <img
          src={asset("/images/brand/fasn-logo-full.webp")}
          alt={`${t.meta.siteName} — ${t.home.motto}`}
          width={900}
          height={600}
          className="mx-auto w-full max-w-lg rounded-[2rem] border border-line bg-white p-4"
        />
      </section>

      <section className="bg-navy-50/60 py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{a.problemTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{a.problem}</p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <SectionHeading title={a.valuesTitle} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v) => (
            <li key={v.title} className="card p-5">
              <h3 className="text-lg font-bold text-teal-700">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{v.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-900 py-14 text-white sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold !text-white">{a.expansionTitle}</h2>
            <p className="mt-4 text-lg text-white/80">{a.expansion}</p>
          </div>
          <div className="rounded-[2rem] bg-white p-4">
            <Illustration name="expansion" alt={a.expansionTitle} />
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <SectionHeading title={a.roadmapTitle} />
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {a.roadmap.map((r, i) => (
            <li key={r.phase} className={`rounded-[var(--radius-card)] border p-5 ${i === 0 ? "border-teal-500 bg-teal-50" : "border-line"}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">{r.phase}</p>
              <h3 className="mt-1 text-lg font-bold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted">{r.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy-50/60 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading title={a.membershipTitle} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.memberships.map((m, i) => (
              <li key={m.name} className={`card flex flex-col p-6 ${i === 0 ? "ring-2 ring-teal-500" : ""}`}>
                <h3 className="text-xl font-extrabold">{m.name}</h3>
                <p className="mt-1 text-lg font-bold text-teal-700">{m.price}</p>
                <ul className="mt-4 space-y-2">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <h2 className="text-2xl font-bold">{a.summitTitle}</h2>
            <p className="mt-2 max-w-3xl text-muted">{a.summit}</p>
          </div>
        </div>
      </section>
    </>
  );
}
