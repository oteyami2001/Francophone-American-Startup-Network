"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";

import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { asset } from "@/lib/site";
import { supabase } from "@/lib/supabase";

import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Nav = Dictionary["nav"];

function useNavGroups(locale: Locale, nav: Nav) {
  const directories = [
    { href: href(locale, "startups"), label: nav.startups },
    { href: href(locale, "businesses"), label: nav.businesses },
    { href: href(locale, "professionals"), label: nav.professionals },
    { href: href(locale, "contractors"), label: nav.contractors },
    { href: href(locale, "marketplace"), label: nav.marketplace },
    { href: href(locale, "jobs"), label: nav.jobs },
  ];

  const main = [
    { href: href(locale, "community"), label: nav.community },
    { href: href(locale, "events"), label: nav.events },
    { href: href(locale, "opportunities"), label: nav.opportunities },
    { href: href(locale, "resources"), label: nav.resources },
    { href: href(locale, "about"), label: nav.about },
  ];

  return { directories, main };
}

export function Header({
  locale,
  nav,
  siteName,
}: {
  locale: Locale;
  nav: Nav;
  siteName: string;
}) {
  const pathname = usePathname() || "";

  const [open, setOpen] = useState(false);
  const [dirOpen, setDirOpen] = useState(false);

  // Supabase authentication state
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const dirRef = useRef<HTMLLIElement>(null);

  const { directories, main } = useNavGroups(locale, nav);

  /*
   * Load the current Supabase session when the header starts,
   * and listen for future login/logout changes.
   */
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      setUser(data.session?.user ?? null);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /*
   * Sign the current user out of Supabase.
   */
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error.message);
      return;
    }

    setUser(null);
    setOpen(false);

    window.location.href = href(locale, "home");
  }

  // Close menus when navigation occurs.
  useEffect(() => {
    setOpen(false);
    setDirOpen(false);
  }, [pathname]);

  // Close the directories dropdown on outside click or Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDirOpen(false);
        setOpen(false);
      }
    }

    function onClick(e: MouseEvent) {
      if (
        dirRef.current &&
        !dirRef.current.contains(e.target as Node)
      ) {
        setDirOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Prevent background scrolling when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (h: string) =>
    pathname.startsWith(h.replace(/\/$/, ""));

  const dirActive = directories.some((d) => isActive(d.href));

  /*
   * Prefer the member's name when available.
   * Otherwise display their email address.
   */
  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-20">

        {/* Logo / Brand */}
        <Link
          href={href(locale)}
          className="flex min-w-0 items-center gap-2.5"
          aria-label={`${siteName} — ${nav.home}`}
        >
          <img
            src={asset("/images/brand/fasn-emblem.webp")}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 lg:h-12 lg:w-12"
          />

          <span className="min-w-0 leading-tight">
            <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-navy-900 sm:hidden">
              FASN
            </span>

            <span className="hidden font-[family-name:var(--font-display)] text-[13px] font-extrabold uppercase tracking-wide text-navy-900 sm:block xl:text-[12px]">
              Francophone-American
            </span>

            <span className="hidden text-[11px] font-bold uppercase tracking-[0.2em] sm:block">
              <span className="text-teal-700">
                Startup
              </span>{" "}
              <span className="text-navy-900">
                Network
              </span>
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label={nav.primary}
          className="hidden xl:block"
        >
          <ul className="flex items-center gap-0.5 whitespace-nowrap text-sm font-semibold text-navy-900">

            {/* Directories Dropdown */}
            <li
              ref={dirRef}
              className="relative"
            >
              <button
                type="button"
                aria-expanded={dirOpen}
                aria-controls="dir-menu"
                onClick={() => setDirOpen((v) => !v)}
                className={`inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 hover:bg-navy-50 ${
                  dirActive ? "text-teal-700" : ""
                }`}
              >
                {nav.directories}

                <Icon
                  name="chevronDown"
                  className={`h-4 w-4 transition-transform ${
                    dirOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                id="dir-menu"
                hidden={!dirOpen}
                className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-xl"
              >
                {directories.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      aria-current={
                        isActive(d.href)
                          ? "page"
                          : undefined
                      }
                      className="flex min-h-11 items-center rounded-xl px-3 hover:bg-navy-50 aria-[current=page]:text-teal-700"
                    >
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Main Navigation */}
            {main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    isActive(item.href)
                      ? "page"
                      : undefined
                  }
                  className="inline-flex min-h-11 items-center rounded-full px-2.5 hover:bg-navy-50 aria-[current=page]:text-teal-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">

          {/* EN / FR */}
          <LanguageSwitcher
            locale={locale}
            label={nav.language}
            className="hidden sm:inline-flex"
          />

          {/* Authentication Controls */}
          {authReady &&
            (user ? (
              <>
                {/* Logged-in member name/email */}
                <span className="hidden max-w-44 truncate text-sm font-semibold text-navy-900 2xl:inline">
                  {userDisplayName}
                </span>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="btn-primary hidden md:inline-flex"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href={href(locale, "login")}
                  className="hidden min-h-11 items-center whitespace-nowrap px-2 text-sm font-semibold text-navy-900 hover:text-teal-700 lg:inline-flex xl:hidden 2xl:inline-flex"
                >
                  {nav.signIn}
                </Link>

                {/* Join */}
                <Link
                  href={href(locale, "join")}
                  className="btn-primary hidden md:inline-flex"
                >
                  {nav.join}
                </Link>
              </>
            ))}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open
                ? nav.closeMenu
                : nav.openMenu
            }
            onClick={() => setOpen((v) => !v)}
          >
            <Icon
              name={open ? "close" : "menu"}
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-white lg:top-20 xl:hidden"
      >
        <nav
          aria-label={nav.primary}
          className="container-page py-6"
        >

          {/* Mobile Language Switcher */}
          <div className="mb-6 flex items-center justify-between sm:hidden">
            <span className="text-sm font-semibold text-muted">
              {nav.language}
            </span>

            <LanguageSwitcher
              locale={locale}
              label={nav.language}
            />
          </div>

          {/* Directories */}
          <p className="eyebrow mb-2">
            {nav.directories}
          </p>

          <ul className="mb-6 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {directories.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-navy-900 hover:bg-navy-50"
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Discover */}
          <p className="eyebrow mb-2">
            {nav.discover}
          </p>

          <ul className="mb-8 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {[
              ...main,
              {
                href: href(locale, "contact"),
                label: nav.contact,
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-navy-900 hover:bg-navy-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Authentication */}
          <div className="grid gap-3 sm:grid-cols-2">
            {authReady &&
              (user ? (
                <>
                  {/* Logged-in member */}
                  <div className="flex min-h-12 items-center justify-center rounded-xl bg-navy-50 px-4 text-center font-semibold text-navy-900">
                    {userDisplayName}
                  </div>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn-outline w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {/* Join */}
                  <Link
                    href={href(locale, "join")}
                    className="btn-primary w-full"
                  >
                    {nav.join}
                  </Link>

                  {/* Sign In */}
                  <Link
                    href={href(locale, "login")}
                    className="btn-outline w-full"
                  >
                    {nav.signIn}
                  </Link>
                </>
              ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
