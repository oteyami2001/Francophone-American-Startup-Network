import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { FasnEvent } from "@/data/types";
import { Icon } from "./Icon";
import { Chip, DemoBadge } from "./ui";

export function EventCard({ event, locale, t }: { event: FasnEvent; locale: Locale; t: Pick<Dictionary, "events" | "demo"> }) {
  const date = new Date(`${event.date}T${event.time}:00`);
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";
  const month = date.toLocaleDateString(intlLocale, { month: "short" });
  const day = date.toLocaleDateString(intlLocale, { day: "numeric" });
  const full = date.toLocaleDateString(intlLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const time = date.toLocaleTimeString(intlLocale, { hour: "numeric", minute: "2-digit" });
  return (
    <article className="card flex h-full gap-4 p-5">
      <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy-900 text-white" aria-hidden="true">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-500">{month}</span>
        <span className="text-2xl font-extrabold">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="teal">{t.events.types[event.type]}</Chip>
          <Chip>{t.events[event.format]}</Chip>
          {event.demo && <DemoBadge label={t.demo.badge} />}
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug">{event.title[locale]}</h3>
        <p className="mt-1 text-[15px] leading-relaxed text-muted">{event.description[locale]}</p>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          <li className="flex items-center gap-2">
            <Icon name="calendar" className="h-4 w-4 text-teal-700" />
            <time dateTime={`${event.date}T${event.time}`}>
              {full} · {time}
            </time>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="pin" className="h-4 w-4 text-teal-700" />
            {event.location[locale]}
          </li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-navy-800">{t.events.register}</p>
      </div>
    </article>
  );
}
