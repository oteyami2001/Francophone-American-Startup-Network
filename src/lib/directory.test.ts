import { describe, expect, it } from "vitest";
import { listings } from "@/data/listings";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import { filterListings } from "./directory";
import { href, swapLocale } from "./routes";

const none = { q: "", category: "", state: "", language: "", stage: "" };

describe("directory filtering", () => {
  it("returns everything with no filters", () => {
    expect(filterListings(listings, "en", none)).toHaveLength(listings.length);
  });
  it("searches across name, services and category labels, ignoring accents", () => {
    const r = filterListings(listings, "fr", { ...none, q: "electricite" }, fr.categories);
    expect(r.map((l) => l.slug)).toContain("voltaique-electric");
    const p = filterListings(listings, "en", { ...none, q: "plumbing" }, en.categories);
    expect(p.map((l) => l.slug)).toContain("plomberie-potomac");
  });
  it("combines filters", () => {
    const r = filterListings(listings, "en", { ...none, state: "VA", language: "ar" });
    expect(r.every((l) => l.state === "VA" && l.languages.includes("ar"))).toBe(true);
    expect(r.length).toBeGreaterThan(0);
  });
});

describe("routes", () => {
  it("builds localized hrefs with trailing slashes", () => {
    expect(href("en")).toBe("/en/");
    expect(href("fr", "startups")).toBe("/fr/startups/");
  });
  it("swaps the locale segment", () => {
    expect(swapLocale("/en/startups/kora-learn/", "fr")).toBe("/fr/startups/kora-learn/");
    expect(swapLocale("/fr", "en")).toBe("/en/");
    expect(swapLocale("/", "fr")).toBe("/fr/");
  });
});
