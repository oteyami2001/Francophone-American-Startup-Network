import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/i18n";
import { siteUrl } from "./site";
import { href } from "./routes";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string | undefined,
  description?: string,
): Metadata {
  const t = getDictionary(locale);
  const desc = description ?? t.meta.description;
  const fullTitle = title ? `${title} | ${t.meta.shortName}` : `${t.meta.siteName} — ${t.home.tagline}`;
  const url = `${siteUrl}${href(locale, path)}`;
  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}${href("en", path)}`,
        fr: `${siteUrl}${href("fr", path)}`,
        "x-default": `${siteUrl}${href("en", path)}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: t.meta.siteName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "website",
      images: [{ url: `${siteUrl}/images/brand/og-image.png`, width: 1200, height: 630, alt: t.meta.siteName }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
  };
}
