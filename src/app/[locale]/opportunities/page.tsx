import Link from "next/link";
import type { Metadata } from "next";
import { officialSources, opportunities } from "@/data/content";
import { OfficialLinks, OpportunityCard } from "@/components/OpportunityCard";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "opportunities", t.pages.opportunities.title, t.pages.opportunities.intro);
}

export default async function OpportunitiesPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const o = t.opportunities;
  return (
    <>
      <PageHero eyebrow={t.footer.region} title={t.pages.opportunities.title} intro={t.pages.opportunities.intro} illustration="opportunities">
        <Link href={href(locale, "join")} className="btn-primary">{t.cta.join}</Link>
        <Link href={href(locale, "resources")} className="btn-outline">{t.cta.browseResources}</Link>
      </PageHero>
      <section className="container-page py-10 sm:py-14">
        <ul className="mb-8 flex flex-wrap gap-2" aria-label={o.type}>
          {Object.values(o.types).map((label) => (
            <li key={label} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-semibold text-navy-800">{label}</li>
          ))}
        </ul>
        <Notice title={t.demo.title}>{t.demo.opportunityNotice}</Notice>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {opportunities.map((item) => (
            <li key={item.slug}>
              <OpportunityCard item={item} locale={locale} t={t} />
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-navy-50/60 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading title={o.officialTitle} intro={o.officialIntro} />
          <div className="mt-8">
            <OfficialLinks links={officialSources} locale={locale} />
          </div>
          <p className="mt-6 text-sm text-muted">{t.resources.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
