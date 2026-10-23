import { describe, expect, it } from "vitest";
import { isEmail, isFutureOrToday, isHttpsUrl, isPhone, isZip, rules, validate, validateFiles } from "./validation";

describe("validation helpers", () => {
  it("validates emails", () => {
    expect(isEmail("awa@example.com")).toBe(true);
    expect(isEmail("bad@")).toBe(false);
    expect(isEmail("no spaces@example.com")).toBe(false);
  });
  it("validates US phone numbers loosely", () => {
    expect(isPhone("(202) 555-0147")).toBe(true);
    expect(isPhone("+1 202 555 0147")).toBe(true);
    expect(isPhone("12345")).toBe(false);
    expect(isPhone("call me")).toBe(false);
  });
  it("validates ZIP codes", () => {
    expect(isZip("20001")).toBe(true);
    expect(isZip("20001-1234")).toBe(true);
    expect(isZip("2000")).toBe(false);
    expect(isZip("ABCDE")).toBe(false);
  });
  it("only accepts https URLs", () => {
    expect(isHttpsUrl("https://www.linkedin.com/in/someone")).toBe(true);
    expect(isHttpsUrl("http://example.com")).toBe(false);
    expect(isHttpsUrl("javascript:alert(1)")).toBe(false);
  });
  it("checks future dates", () => {
    const today = new Date("2026-10-23T10:00:00");
    expect(isFutureOrToday("2026-10-23", today)).toBe(true);
    expect(isFutureOrToday("2027-01-01", today)).toBe(true);
    expect(isFutureOrToday("2026-10-22", today)).toBe(false);
    expect(isFutureOrToday("not-a-date", today)).toBe(false);
  });
  it("restricts uploads by type, size and count", () => {
    const ok = { type: "image/png", size: 1000 };
    expect(validateFiles([ok])).toBeNull();
    expect(validateFiles([{ type: "application/pdf", size: 10 }])).toBe("fileType");
    expect(validateFiles([{ type: "image/jpeg", size: 6 * 1024 * 1024 }])).toBe("fileSize");
    expect(validateFiles(Array(6).fill(ok))).toBe("fileCount");
  });
  it("returns the first error per field", () => {
    const errs = validate(
      { email: "", zip: "123", note: "x".repeat(3000) },
      { email: [rules.required(), rules.email()], zip: [rules.zip()], note: [rules.maxLength()] },
    );
    expect(errs).toEqual({ email: "required", zip: "zip", note: "tooLong" });
  });
});
