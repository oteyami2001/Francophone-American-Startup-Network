import Link from "next/link";
import type { Metadata } from "next";
import { govconLinks, resourceGroups } from "@/data/content";
import { Icon } from "@/components/Icon";
import { OfficialLinks } from "@/components/OpportunityCard";
import { Illustration, Notice, PageHero, SectionHeading } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "resources", t.pages.resources.title, t.pages.resources.intro);
}

export default async function ResourcesPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const r = t.resources;
  return (
    <>
      <PageHero eyebrow={t.home.pillars[1]!.title} title={t.pages.resources.title} intro={t.pages.resources.intro} illustration="resources">
        <a href="#govcon" className="btn-primary">{r.govconTitle}</a>
        <Link href={href(locale, "professionals")} className="btn-outline">{t.cta.findProfessional}</Link>
      </PageHero>

      <section className="container-page py-10 sm:py-14">
        <Notice tone="navy">{r.disclaimer}</Notice>
        <nav aria-label={t.pages.resources.title} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {resourceGroups.map((g) => (
              <li key={g.key}>
                <a href={`#${g.key}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-navy-900 hover:border-teal-500">
                  {g.title[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 space-y-12">
          {resourceGroups.map((g) => (
            <section key={g.key} id={g.key} className="scroll-mt-28" aria-labelledby={`${g.key}-h`}>
              <h2 id={`${g.key}-h`} className="text-2xl font-bold sm:text-3xl">{g.title[locale]}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.topics[locale].map((topic) => (
                  <li key={topic} className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-muted">{r.officialLink}</p>
              <OfficialLinks links={g.links} locale={locale} />
            </section>
          ))}
        </div>
      </section>

      <section id="govcon" className="scroll-mt-24 bg-navy-900 py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="eyebrow mb-3 !text-teal-500">DMV</p>
          <h2 className="text-3xl font-extrabold !text-white sm:text-4xl">{r.govconTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-white/80">{r.govconIntro}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {r.govconTopics.map((topic) => (
              <li key={topic} className="flex gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                <span className="text-sm font-medium">{topic}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[var(--radius-card)] bg-white p-4 sm:p-6">
            <OfficialLinks links={govconLinks} locale={locale} />
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="card grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-3">{t.about.roadmap[2]!.phase}</p>
            <SectionHeading title={r.aiTitle} intro={r.aiText} />
            <ul className="mt-6 space-y-2">
              {r.aiExamples.map((ex) => (
                <li key={ex} className="flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-900">
                  <Icon name="sparkles" className="h-4 w-4 text-teal-700" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <Illustration name="startups" className="mx-auto max-w-sm" />
        </div>
      </section>
    </>
  );
}
