import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";
import { asset } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return { ...pageMetadata(locale, "login", t.pages.login.title, t.pages.login.intro), robots: { index: false } };
}

export default async function LoginPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return (
    <section className="bg-gradient-to-b from-navy-50 to-white py-12 sm:py-20">
      <div className="container-page max-w-md">
        <div className="card p-6 sm:p-8">
          <img src={asset("/images/brand/fasn-emblem.webp")} alt="" width={64} height={64} className="mx-auto h-16 w-16" />
          <h1 className="mt-4 text-center text-3xl font-extrabold">{t.pages.login.title}</h1>
          <p className="mb-6 mt-2 text-center text-muted">{t.pages.login.intro}</p>
          <LoginForm locale={locale} t={t} />
        </div>
      </div>
    </section>
  );
}
