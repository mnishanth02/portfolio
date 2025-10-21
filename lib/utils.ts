import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueKey(prefix = "key") {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `${prefix}_${timestamp}_${randomPart}`;
}

/**
 * Format a date string for display
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @param format - Display format: 'short' (e.g., "Jan 15, 2024") or 'long' (e.g., "January 15, 2024")
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  format: "short" | "long" = "long",
): string {
  const date = new Date(dateString);

  if (format === "short") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
