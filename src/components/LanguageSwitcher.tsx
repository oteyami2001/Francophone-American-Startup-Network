"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { swapLocale } from "@/lib/routes";

export function LanguageSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}/`;
  return (
    <nav aria-label={label} className={`inline-flex items-center rounded-full border border-line bg-white p-0.5 text-xs font-bold ${className}`}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={l === "en" ? "English" : "Français"}
            className={`grid min-h-9 min-w-10 place-items-center rounded-full px-2.5 uppercase transition-colors ${
              active ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-navy-50"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
