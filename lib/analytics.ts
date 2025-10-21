/**
 * PostHog Analytics Event Tracking
 * Custom event utilities for tracking user interactions
 */

import posthog from "posthog-js";

/**
 * Track project view event
 */
export const trackProjectViewed = (
  projectSlug: string,
  projectTitle: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("project_viewed", {
      project_slug: projectSlug,
      project_title: projectTitle,
    });
  }
};

/**
 * Track blog post view event
 */
export const trackBlogPostViewed = (
  postSlug: string,
  postTitle: string,
  category: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("blog_post_viewed", {
      post_slug: postSlug,
      post_title: postTitle,
      post_category: category,
    });
  }
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmitted = (
  success: boolean,
  errorMessage?: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("contact_form_submitted", {
      success,
      ...(errorMessage && { error_message: errorMessage }),
    });
  }
};

/**
 * Track resume download
 */
export const trackResumeDownloaded = (source: "hero" | "about" | "contact") => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("resume_downloaded", {
      source,
    });
  }
};

/**
 * Track social link click
 */
export const trackSocialLinkClicked = (
  platform: string,
  url: string,
  location: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("social_link_clicked", {
      platform,
      url,
      location, // hero, footer, about, etc.
    });
  }
};

/**
 * Track navigation link click
 */
export const trackNavigationClicked = (destination: string) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("navigation_clicked", {
      destination,
    });
  }
};

/**
 * Track video play (YouTube)
 */
export const trackVideoPlayed = (videoId: string, videoTitle?: string) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("video_played", {
      video_id: videoId,
      ...(videoTitle && { video_title: videoTitle }),
    });
  }
};

/**
 * Track project modal opened
 */
export const trackProjectModalOpened = (
  projectSlug: string,
  projectTitle: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("project_modal_opened", {
      project_slug: projectSlug,
      project_title: projectTitle,
    });
  }
};

/**
 * Track blog search performed
 */
export const trackBlogSearchPerformed = (
  query: string,
  resultsCount: number,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("blog_search_performed", {
      query,
      results_count: resultsCount,
    });
  }
};

/**
 * Track blog filter applied
 */
export const trackBlogFilterApplied = (
  filterType: "category" | "tag",
  filterValue: string,
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.capture("blog_filter_applied", {
      filter_type: filterType,
      filter_value: filterValue,
    });
  }
};
