import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { format, type Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { asset } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const cols = [
    {
      title: t.footer.explore,
      links: [
        ["startups", t.nav.startups],
        ["businesses", t.nav.businesses],
        ["professionals", t.nav.professionals],
        ["contractors", t.nav.contractors],
        ["request-quote", t.cta.requestQuote],
      ],
    },
    {
      title: t.footer.network,
      links: [
        ["community", t.nav.community],
        ["events", t.nav.events],
        ["opportunities", t.nav.opportunities],
        ["jobs", t.nav.jobs],
        ["resources", t.nav.resources],
      ],
    },
    {
      title: t.footer.company,
      links: [
        ["about", t.nav.about],
        ["contact", t.nav.contact],
        ["join", t.nav.join],
        ["login", t.nav.signIn],
      ],
    },
    {
      title: t.footer.legal,
      links: [
        ["privacy", t.footer.privacy],
        ["terms", t.footer.terms],
        ["community-guidelines", t.footer.rules],
      ],
    },
  ] as const;

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Link href={href(locale)} className="inline-flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-1">
              <img src={asset("/images/brand/fasn-emblem.webp")} alt="" width={48} height={48} className="h-12 w-12" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight">
              Francophone-American
              <br />
              <span className="text-teal-500">Startup</span> Network
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-white/75">{t.footer.tagline}</p>
          <p className="mt-3 text-sm font-semibold tracking-wide text-teal-500">{t.home.motto}</p>
          <p className="mt-1 text-sm text-white/60">{t.footer.region}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">{col.title}</h2>
              <ul className="space-y-1">
                {col.links.map(([path, label]) => (
                  <li key={path}>
                    <Link href={href(locale, path)} className="inline-flex min-h-9 items-center text-sm text-white/75 hover:text-teal-500">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{format(t.footer.rights, { year: new Date().getFullYear() })}</p>
          <p>{t.footer.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
