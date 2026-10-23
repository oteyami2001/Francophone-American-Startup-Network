import type { Metadata } from "next";
import { JoinForm } from "@/components/forms/JoinForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "join", t.pages.join.title, t.pages.join.intro);
}

export default async function JoinPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const free = t.about.memberships[0]!;
  return (
    <>
      <PageHero eyebrow={t.home.motto} title={t.pages.join.title} intro={t.pages.join.intro} />
      <section className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="card p-6 sm:p-8">
          <JoinForm locale={locale} t={t} />
        </div>
        <aside className="space-y-5">
          <div className="rounded-[var(--radius-card)] bg-navy-900 p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-500">{free.name}</p>
            <p className="mt-1 text-3xl font-extrabold">{free.price}</p>
            <ul className="mt-4 space-y-2">
              {free.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Icon name="check" className="h-4 w-4 text-teal-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-3">
            {t.home.pillars.map((p) => (
              <li key={p.key} className="rounded-2xl border border-line p-4">
                <p className="font-bold text-teal-700">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
