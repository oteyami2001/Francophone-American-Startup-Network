import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "request-quote", t.pages.requestQuote.title, t.pages.requestQuote.intro);
}

export default async function RequestQuotePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero eyebrow={t.nav.contractors} title={t.pages.requestQuote.title} intro={t.pages.requestQuote.intro} illustration="contractors" />
      <section className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="card p-6 sm:p-8">
          <QuoteForm locale={locale} t={{ forms: t.forms, quote: t.quote, categories: t.categories }} />
        </div>
        <aside className="space-y-4">
          <ol className="space-y-3">
            {t.home.quoteSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl border border-line p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-500 font-extrabold text-navy-950">{i + 1}</span>
                <span className="font-semibold text-navy-900">{s}</span>
              </li>
            ))}
          </ol>
          <div className="flex gap-3 rounded-2xl bg-navy-50 p-4 text-sm text-navy-900">
            <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
            <p>{t.quote.privacy}</p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{t.directory.credentialNote}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
