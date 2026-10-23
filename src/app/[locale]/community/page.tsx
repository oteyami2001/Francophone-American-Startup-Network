import Link from "next/link";
import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Illustration, PageHero, SectionHeading } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "community", t.pages.community.title, t.pages.community.intro);
}

const icons: IconName[] = ["users", "chat", "sparkles", "trend"];

export default async function CommunityPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const c = t.community;
  return (
    <>
      <PageHero eyebrow={t.home.motto} title={t.pages.community.title} intro={t.pages.community.intro} illustration="community">
        <Link href={href(locale, "join")} className="btn-primary">{t.cta.join}</Link>
        <Link href={href(locale, "community-guidelines")} className="btn-outline">{c.rulesLink}</Link>
      </PageHero>

      <section className="container-page py-14 sm:py-20">
        <SectionHeading title={c.featuresTitle} />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.features.map((f, i) => (
            <li key={f.title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-100 text-teal-700">
                <Icon name={icons[i] ?? "users"} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-50/60 py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.home.themeDaysTitle}</h2>
            <ul className="mt-6 space-y-3">
              {t.themeDays.map((d) => (
                <li key={d.tag} className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-start sm:gap-4">
                  <span className="shrink-0 text-xs sm:w-24 font-bold uppercase tracking-wider text-muted">{d.day}</span>
                  <span className="min-w-0">
                    <span className="block font-extrabold text-teal-700 [overflow-wrap:anywhere]">{d.tag}</span>
                    <span className="text-sm text-muted">{d.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">{c.topicsTitle}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.topics.map((topic) => (
                <li key={topic} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="card grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.3fr]">
          <Illustration name="connect" width={320} height={230} className="mx-auto max-w-xs" />
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{c.mentorsTitle}</h2>
            <p className="mt-3 text-muted">{c.mentorsText}</p>
            <p className="mt-6 rounded-2xl bg-teal-50 p-4 text-sm font-semibold text-navy-900">{c.comingSoon}</p>
            <div className="mt-6">
              <WaitlistForm locale={locale} list="community" t={t} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
