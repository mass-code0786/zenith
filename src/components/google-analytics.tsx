"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ensureGtag, GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";

function GoogleAnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    ensureGtag();
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname, searchParams]);

  return null;
}

function GoogleAnalyticsClickEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const element = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-ga-event]",
      );

      if (!element) {
        return;
      }

      trackEvent(element.dataset.gaEvent ?? "button_click", {
        event_category: element.dataset.gaCategory ?? "engagement",
        event_label:
          element.dataset.gaLabel ?? element.textContent?.trim() ?? undefined,
        link_url:
          element instanceof HTMLAnchorElement ? element.href : undefined,
      });
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageViews />
      </Suspense>
      <GoogleAnalyticsClickEvents />
    </>
  );
}
