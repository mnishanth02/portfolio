export type { BlogPost, ContactSubmission, Project } from "@/lib/validations";

/**
 * Navigation Link Type
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Social Media Link Type
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string; // lucide-react icon name
}

/**
 * Skill Category Type
 */
export interface SkillCategory {
  category: string;
  skills: string[];
}

/**
 * Timeline Event Type
 */
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "career" | "achievement" | "education";
}

/**
 * Achievement Type
 */
export interface Achievement {
  title: string;
  value: string;
  description?: string;
}

/**
 * Featured Video Type
 */
export interface FeaturedVideo {
  id: string; // YouTube video ID
  title: string;
  description?: string;
}
