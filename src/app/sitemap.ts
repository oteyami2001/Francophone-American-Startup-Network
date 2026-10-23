import type { MetadataRoute } from "next";
import { listings } from "@/data/listings";
import { locales } from "@/i18n/config";
import { href, listingHref, pagePaths } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...pagePaths.filter((p) => p !== "login").map((p) => (l: (typeof locales)[number]) => href(l, p)),
    ...listings.map((x) => (l: (typeof locales)[number]) => listingHref(l, x.kind, x.slug)),
  ];
  return paths.map((build) => ({
    url: `${siteUrl}${build("en")}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${build(l)}`])) },
  }));
}
