import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "community-guidelines", t.pages.rules.title, t.meta.description);
}

export default async function Page({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return <LegalPage locale={locale} title={t.pages.rules.title} sections={t.legal.rules} t={t} />;
}
