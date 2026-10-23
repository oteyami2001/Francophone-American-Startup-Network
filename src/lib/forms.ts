import { formEndpoint } from "./site";

export type SubmitResult = "sent" | "preview" | "error";

/**
 * Send a form payload to the configured endpoint. Without an endpoint the
 * site is in preview mode: nothing leaves the browser.
 */
export async function submitForm(form: string, payload: Record<string, unknown>): Promise<SubmitResult> {
  if (!formEndpoint) return "preview";
  try {
    const res = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form, ...payload }),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
