import Link from "next/link";
import type { Metadata } from "next";
import { events } from "@/data/content";
import { EventCard } from "@/components/EventCard";
import { EmptyState, Notice, PageHero } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "events", t.pages.events.title, t.pages.events.intro);
}

export default async function EventsPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHero eyebrow={t.footer.region} title={t.pages.events.title} intro={t.pages.events.intro} illustration="events">
        <Link href={href(locale, "join")} className="btn-primary">{t.cta.join}</Link>
        <Link href={href(locale, "contact")} className="btn-outline">{t.events.hostCta}</Link>
      </PageHero>
      <section className="container-page py-10 sm:py-14">
        {upcoming.some((e) => e.demo) && (
          <div className="mb-8">
            <Notice title={t.demo.title}>{t.demo.eventNotice}</Notice>
          </div>
        )}
        {upcoming.length === 0 ? (
          <EmptyState icon="calendar" title={t.pages.events.title} text={t.events.register} />
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} locale={locale} t={t} />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-[var(--radius-card)] bg-navy-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg font-bold">{t.events.host}</p>
          <Link href={href(locale, "contact")} className="btn-primary">{t.events.hostCta}</Link>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold">{t.about.summitTitle}</h2>
          <p className="mt-2 max-w-3xl text-muted">{t.about.summit}</p>
        </div>
      </section>
    </>
  );
}
