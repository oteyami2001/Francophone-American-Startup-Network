import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findListing, listingsByKind } from "@/data/listings";
import type { ListingKind } from "@/data/types";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { href, kindPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { DirectoryBrowser } from "./DirectoryBrowser";
import { ProfileView } from "./ProfileView";
import { Notice, PageHero } from "./ui";

const illustrations: Record<ListingKind, string> = {
  startup: "startups",
  business: "businesses",
  professional: "professionals",
  contractor: "contractors",
};

function pageKey(kind: ListingKind) {
  return kindPath[kind] as "startups" | "businesses" | "professionals" | "contractors";
}

export function directoryMetadata(kind: ListingKind, locale: Locale): Metadata {
  const t = getDictionary(locale);
  const p = t.pages[pageKey(kind)];
  return pageMetadata(locale, kindPath[kind], p.title, p.intro);
}

export function DirectoryPage({ kind, locale }: { kind: ListingKind; locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.pages[pageKey(kind)];
  const listings = listingsByKind(kind);
  const labels = {
    categories: t.categories,
    stages: t.stages,
    lookingFor: t.lookingFor,
    languageNames: t.languageNames,
    demo: t.demo,
    cta: t.cta,
    directory: t.directory,
  };
  const quoteCta = kind === "contractor" || kind === "business";
  return (
    <>
      <PageHero eyebrow={t.footer.region} title={p.title} intro={p.intro} illustration={illustrations[kind]}>
        {quoteCta ? (
          <Link href={href(locale, "request-quote")} className="btn-primary">{t.cta.requestQuote}</Link>
        ) : (
          <Link href={href(locale, "join")} className="btn-primary">{t.cta.join}</Link>
        )}
        <Link href={href(locale, "join")} className="btn-outline">{t.cta.listBusiness}</Link>
      </PageHero>
      <section className="container-page py-10 sm:py-14">
        {listings.some((l) => l.demo) && (
          <div className="mb-6">
            <Notice title={t.demo.title}>{t.demo.notice}</Notice>
          </div>
        )}
        <DirectoryBrowser listings={listings} locale={locale} t={labels} showStage={kind === "startup"} />
      </section>
    </>
  );
}

/** Static params for /[locale]/<kind>/[slug] */
export function profileParams(kind: ListingKind) {
  return locales.flatMap((locale) => listingsByKind(kind).map((l) => ({ locale, slug: l.slug })));
}

type ProfileParams = { params: Promise<{ locale: string; slug: string }> };

async function resolveProfile(kind: ListingKind, params: ProfileParams["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const listing = findListing(kind, slug);
  if (!listing) notFound();
  return { locale, listing };
}

export function profileRoute(kind: ListingKind) {
  return {
    generateStaticParams: () => profileParams(kind),
    generateMetadata: async ({ params }: ProfileParams): Promise<Metadata> => {
      const { locale, listing } = await resolveProfile(kind, params);
      return pageMetadata(locale, `${kindPath[kind]}/${listing.slug}`, listing.name, listing.tagline[locale]);
    },
    Page: async function ProfilePage({ params }: ProfileParams) {
      const { locale, listing } = await resolveProfile(kind, params);
      return <ProfileView listing={listing} locale={locale} t={getDictionary(locale)} />;
    },
  };
}
