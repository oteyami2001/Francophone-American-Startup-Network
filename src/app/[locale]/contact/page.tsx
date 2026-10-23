import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "contact", t.pages.contact.title, t.pages.contact.intro);
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  return (
    <>
      <PageHero eyebrow={t.footer.region} title={t.pages.contact.title} intro={t.pages.contact.intro} />
      <section className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="card p-6 sm:p-8">
          <ContactForm locale={locale} t={t} />
        </div>
        <aside className="space-y-4">
          {[
            { icon: "pin" as const, title: t.footer.region, text: t.home.launch },
            { icon: "globe" as const, title: "English · Français", text: t.pages.contact.intro },
            { icon: "users" as const, title: t.home.partnersTitle, text: t.home.partnersEmpty },
          ].map((b) => (
            <div key={b.title} className="flex gap-4 rounded-2xl border border-line p-5">
              <Icon name={b.icon} className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" />
              <div>
                <p className="font-bold text-navy-900">{b.title}</p>
                <p className="mt-1 text-sm text-muted">{b.text}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}
