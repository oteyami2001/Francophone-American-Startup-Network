import { describe, expect, it } from "vitest";
import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

/** Walk two objects in parallel and report structural differences. */
function diff(a: unknown, b: unknown, path = ""): string[] {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return [`${path}: array mismatch`];
    if (a.length !== b.length) return [`${path}: length ${a.length} vs ${b.length}`];
    return a.flatMap((x, i) => diff(x, b[i], `${path}[${i}]`));
  }
  if (typeof a === "object" && a && typeof b === "object" && b) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].flatMap((k) =>
      k in a && k in b
        ? diff((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`)
        : [`${path}.${k}: missing in ${k in a ? "fr" : "en"}`],
    );
  }
  if (typeof a !== typeof b) return [`${path}: type mismatch`];
  if (typeof a === "string" && (!a.trim() || !(b as string).trim())) return [`${path}: empty string`];
  return [];
}

function placeholders(s: string) {
  return [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
}

function strings(o: unknown, path = ""): [string, string][] {
  if (typeof o === "string") return [[path, o]];
  if (Array.isArray(o)) return o.flatMap((x, i) => strings(x, `${path}[${i}]`));
  if (o && typeof o === "object") return Object.entries(o).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  return [];
}

describe("EN/FR dictionaries", () => {
  it("have identical structure with no empty strings", () => {
    expect(diff(en, fr)).toEqual([]);
  });
  it("use the same {placeholders}", () => {
    const frMap = new Map(strings(fr));
    for (const [path, value] of strings(en)) {
      expect(placeholders(frMap.get(path) ?? ""), path).toEqual(placeholders(value));
    }
  });
});
