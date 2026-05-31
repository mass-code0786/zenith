export const GA_MEASUREMENT_ID = "G-WHXD4YW7KF";

type GtagParameter = string | number | boolean | null | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "config" | "event" | "js",
      target: string | Date,
      parameters?: Record<string, GtagParameter>,
    ) => void;
  }
}

export function ensureGtag() {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    }) as Window["gtag"];
  }
}

export function trackEvent(
  eventName: string,
  parameters: Record<string, GtagParameter> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  ensureGtag();
  window.gtag?.("event", eventName, parameters);
}
