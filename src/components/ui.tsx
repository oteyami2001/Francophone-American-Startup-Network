import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/site";
import { Icon, type IconName } from "./Icon";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-extrabold sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-800">
      {label}
    </span>
  );
}

export function Notice({
  title,
  children,
  icon = "info",
  tone = "amber",
}: {
  title?: string;
  children: ReactNode;
  icon?: IconName;
  tone?: "amber" | "teal" | "navy";
}) {
  const tones = {
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    teal: "border-teal-500/30 bg-teal-50 text-navy-900",
    navy: "border-navy-100 bg-navy-50 text-navy-900",
  };
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${tones[tone]}`} role="note">
      <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        {title && <p className="font-bold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
  icon = "search",
}: {
  title: string;
  text: string;
  action?: ReactNode;
  icon?: IconName;
}) {
  return (
    <div className="flex h-full flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line bg-navy-50/50 px-6 py-12 text-center">
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-teal-700 shadow-sm">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-bold text-navy-900">{title}</h2>
      <p className="mt-1 max-w-md text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Illustration({
  name,
  alt = "",
  className = "",
  priority = false,
  width = 480,
  height = 300,
}: {
  name: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    // Plain <img>: SVGs need no optimization and this works with static export.
    <img
      src={asset(`/images/illustrations/${name}.svg`)}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-auto w-full ${className}`}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  illustration,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  illustration?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-navy-50 to-white">
      <div className="container-page grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:py-20">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
        {illustration && (
          <div className="mx-auto hidden w-full max-w-md sm:block">
            <Illustration name={illustration} priority />
          </div>
        )}
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-navy-900"
    >
      {children}
      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Chip({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "teal" }) {
  const cls = tone === "teal" ? "bg-teal-50 text-teal-700" : "bg-navy-50 text-navy-800";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}

/** Initials avatar — used instead of logos until members upload their own. */
export function Monogram({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const initials = name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  const palette = ["bg-navy-900 text-white", "bg-teal-500 text-navy-950", "bg-navy-700 text-white", "bg-teal-100 text-navy-900"];
  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const dims = size === "lg" ? "h-20 w-20 text-2xl rounded-3xl" : "h-12 w-12 text-base rounded-2xl";
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center font-extrabold ${dims} ${palette[idx]}`}>
      {initials}
    </span>
  );
}
