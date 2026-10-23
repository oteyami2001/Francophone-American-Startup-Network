import type { Metadata } from "next";
import { DirectoryPage, directoryMetadata } from "@/components/DirectoryPage";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await resolveLocale(params);
  return directoryMetadata("startup", locale);
}

export default async function Page({ params }: LocaleParams) {
  const { locale } = await resolveLocale(params);
  return <DirectoryPage kind="startup" locale={locale} />;
}
