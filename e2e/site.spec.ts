import { expect, test, type Page } from "@playwright/test";

const pages = [
  "", "community/", "startups/", "startups/lumiere-ledger/", "businesses/", "professionals/",
  "contractors/", "contractors/plomberie-potomac/", "marketplace/", "events/", "opportunities/",
  "jobs/", "resources/", "about/", "contact/", "join/", "login/", "request-quote/", "privacy/",
];
const widths = [320, 375, 768, 1280];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

for (const locale of ["en", "fr"]) {
  for (const p of pages) {
    test(`/${locale}/${p} renders without overflow or console errors`, async ({ page }) => {
      const errors = trackErrors(page);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const res = await page.goto(`/${locale}/${p}`);
        expect(res?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1").first()).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
      }
      expect(errors).toEqual([]);
    });
  }
}

test("language switcher keeps the current page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en/startups/");
  await page.getByRole("link", { name: "Français" }).first().click();
  await expect(page).toHaveURL(/\/fr\/startups\/$/);
  await expect(page.locator("h1")).toHaveText("Annuaire des startups");
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/en/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Contractors" }).click();
  await expect(page).toHaveURL(/\/en\/contractors\/$/);
});

test("directory filters and empty state", async ({ page }) => {
  await page.goto("/en/contractors/");
  await page.getByLabel("Search").fill("roof");
  await expect(page.getByRole("status")).toHaveText("1 result");
  await page.getByLabel("Search").fill("zzzz-nothing");
  await expect(page.getByText("No matches yet")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).first().click();
  await expect(page.getByRole("status")).toHaveText(/\d+ results/);
});

test("request-a-quote flow validates each step and ends in preview mode", async ({ page }) => {
  await page.goto("/en/request-quote/?service=plumbing");
  await expect(page.getByLabel(/Service needed/)).toHaveValue("plumbing");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Enter a valid 5-digit ZIP code.").or(page.getByText("This field is required."))).toBeVisible();
  await page.getByLabel(/ZIP code/).fill("20001");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(/Describe your project/).fill("Leaking kitchen sink and a new water heater.");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel(/Full name/).fill("Test Customer");
  await page.getByLabel(/^Email/).fill("customer@example.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Please accept to continue.")).toBeVisible();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Preview mode" })).toBeVisible();
});

test("join form shows errors then preview notice", async ({ page }) => {
  await page.goto("/fr/join/");
  await page.getByRole("button", { name: "Créer mon compte gratuit" }).click();
  await expect(page.getByText("Veuillez corriger les champs signalés.")).toBeVisible();
  await expect(page.getByLabel(/Prénom/)).toBeFocused();
});

test("unknown URLs show the bilingual 404 page", async ({ page }) => {
  const res = await page.goto("/en/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("Page not found").first()).toBeVisible();
});
