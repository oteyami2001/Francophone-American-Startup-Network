import Link from "next/link";
import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Illustration, PageHero } from "@/components/ui";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "marketplace", t.pages.marketplace.title, t.pages.marketplace.intro);
}

export default async function Page({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero eyebrow={t.comingSoon.badge} title={t.pages.marketplace.title} intro={t.pages.marketplace.intro} illustration="professionals" />
      <section className="container-page py-10 sm:py-14">
        <div className="card grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">{t.comingSoon.badge}</span>
            <p className="mt-4 text-lg text-muted">{t.comingSoon.text}</p>
            <div className="mt-6">
              <WaitlistForm locale={locale} list="marketplace" t={t} />
            </div>
            <p className="mt-6 text-sm">
              <Link href={href(locale, "join")} className="font-semibold text-teal-700 hover:text-navy-900">{t.cta.join} →</Link>
            </p>
          </div>
          <Illustration name="professionals" className="mx-auto max-w-sm" />
        </div>
      </section>
    </>
  );
}
