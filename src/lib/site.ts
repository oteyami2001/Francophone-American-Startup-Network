export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Public URL of the deployed site (no trailing slash). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oteyami2001.github.io/Francophone-American-Startup-Network"
).replace(/\/$/, "");

/**
 * Optional endpoint that receives form submissions as JSON (e.g. a Formspree
 * form or your own API). When unset, forms run in "preview mode" and nothing
 * is sent.
 */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** Prefix a file in /public with the deployment base path. */
export function asset(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
