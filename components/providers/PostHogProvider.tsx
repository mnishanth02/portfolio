"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { type PropsWithChildren, Suspense, useEffect, useRef } from "react";

/**
 * PageView Tracker Component
 * Handles pageview tracking with search params
 * Must be wrapped in Suspense due to useSearchParams()
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if PostHog is initialized before tracking
    if (pathname && posthog.__loaded) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * PostHog Analytics Provider
 * Initializes PostHog analytics with privacy-first settings
 */
export function PostHogProvider({ children }: PropsWithChildren) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !initializedRef.current) {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost =
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

      if (posthogKey && !posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          capture_pageview: false, // We'll capture manually
          capture_pageleave: true,
          persistence: "sessionStorage", // Privacy-first: don't persist across sessions
          disable_session_recording: true, // No session recording for privacy
          autocapture: false, // Manual event tracking only
        });
        initializedRef.current = true;
      }
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
