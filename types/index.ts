// Re-export validation schemas

// BlogPost type from content-collections (includes body from MDX compilation)
export type { BlogPost } from "@/.content-collections/generated";
export type { ContactSubmission, Project } from "@/lib/validations";

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
  icon: React.ComponentType<{ className?: string }>; // lucide-react icon component
}

/**
 * Skill Category Type
 */
export interface SkillCategory {
  category: string;
  skills: Skill[];
}

/**
 * Individual Skill Type with Proficiency
 */
export interface Skill {
  name: string;
  proficiency: "expert" | "advanced" | "intermediate" | "learning";
  yearsOfExperience?: number;
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
