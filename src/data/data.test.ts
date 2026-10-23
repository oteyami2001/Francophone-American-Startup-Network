import { describe, expect, it } from "vitest";
import { en } from "@/i18n/dictionaries/en";
import { events, govconLinks, officialSources, opportunities, resourceGroups } from "./content";
import { listings } from "./listings";
import { quoteServices } from "./services";

describe("listing data", () => {
  it("has unique slugs per kind", () => {
    const keys = listings.map((l) => `${l.kind}/${l.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("uses only known categories, languages and slugs safe for URLs", () => {
    for (const l of listings) {
      expect(en.categories[l.category], l.slug).toBeTruthy();
      for (const lang of l.languages) expect(en.languageNames[lang], l.slug).toBeTruthy();
      expect(l.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
  it("never marks demo content as verified, and never invents websites", () => {
    for (const l of listings.filter((x) => x.demo)) {
      expect(l.credentials?.license, l.slug).not.toBe("verified");
      expect(l.credentials?.insurance, l.slug).not.toBe("verified");
      expect(l.website, l.slug).toBeUndefined();
    }
  });
  it("has bilingual content for every listing", () => {
    for (const l of listings) {
      expect(l.tagline.fr && l.tagline.en, l.slug).toBeTruthy();
      expect(l.services.fr.length, l.slug).toBe(l.services.en.length);
    }
  });
  it("offers only contractor categories in Request a Quote", () => {
    for (const s of quoteServices) expect(en.categories[s]).toBeTruthy();
  });
});

describe("events, opportunities and resources", () => {
  it("labels sample events and opportunities as demo", () => {
    expect(events.every((e) => e.demo)).toBe(true);
    expect(opportunities.every((o) => o.demo)).toBe(true);
    for (const o of opportunities) expect(o.title.en.startsWith("Example")).toBe(true);
  });
  it("links only to https official sources", () => {
    const links = [...officialSources, ...govconLinks, ...resourceGroups.flatMap((g) => g.links)];
    for (const l of links) expect(l.url, l.name).toMatch(/^https:\/\//);
  });
});
