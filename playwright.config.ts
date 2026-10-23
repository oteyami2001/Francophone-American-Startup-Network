import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    // Use a preinstalled Chromium when provided (e.g. sandboxed environments).
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
  webServer: {
    command: "node e2e/serve.mjs out 4173",
    url: "http://localhost:4173/en/",
    reuseExistingServer: true,
  },
});
