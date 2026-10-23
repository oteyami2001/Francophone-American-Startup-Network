import { format, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { Notice } from "./ui";

export function LegalPage({
  title,
  sections,
  t,
}: {
  locale: Locale;
  title: string;
  sections: { heading: string; body: string }[];
  t: Dictionary;
}) {
  return (
    <article className="container-page max-w-3xl py-12 sm:py-16">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm text-muted">{format(t.legal.updated, { date: "2026-10-23" })}</p>
      <div className="mt-6">
        <Notice>{t.legal.previewNote}</Notice>
      </div>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-bold">{s.heading}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
