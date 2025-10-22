import {
  Activity,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import type {
  Achievement,
  FeaturedVideo,
  NavLink,
  SkillCategory,
  SocialLink,
  TimelineEvent,
} from "@/types";

/**
 * Site Configuration
 * Global metadata and settings for the portfolio website
 */
export const siteConfig = {
  // Site metadata
  name: "Nishanth Murugan",
  title: "Nishanth Murugan | Fullstack Engineer & Passionate Runner",
  description:
    "Personal portfolio showcasing fullstack development projects and marathon running journey. Exploring the intersection of software engineering and endurance athletics.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://me.zealer.in",

  // Author information
  author: {
    name: "Nishanth Murugan",
    email: "nishanth.murugan@gmail.com",
    location: "Coimbatore",
    availability: "Open to opportunities",
  },

  // SEO & OpenGraph
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nishanth Portfolio",
  },
} as const;

/**
 * Navigation Links
 * Primary navigation menu items
 */
export const navigationLinks: NavLink[] = [
  {
    label: "Home",
    href: "#hero",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Blog",
    href: "#blog",
  },
  {
    label: "Contact",
    href: "#contact",
  },
  {
    label: "Philosophy",
    href: "/about",
    external: true,
  },
];

/**
 * Social Media Links
 * Social profiles and contact channels
 */
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/mnishanth02/portfolio",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/nishanthmurugan",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/mnishanth02",
    icon: Twitter,
  },
  {
    name: "Strava",
    url: "https://www.strava.com/athletes/11694245",
    icon: Activity,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@TheTechletee",
    icon: Youtube,
  },
  {
    name: "Email",
    url: "mailto:nishanth.murugan@gmail.com",
    icon: Mail,
  },
];

/**
 * Skills by Category
 * Technical skills organized by domain with proficiency levels
 */
export const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", proficiency: "expert", yearsOfExperience: 5 },
      { name: "Next.js", proficiency: "expert", yearsOfExperience: 4 },
      { name: "TypeScript", proficiency: "expert", yearsOfExperience: 5 },
      { name: "Tailwind CSS", proficiency: "advanced", yearsOfExperience: 3 },
      {
        name: "JavaScript (ES6+)",
        proficiency: "expert",
        yearsOfExperience: 7,
      },
      { name: "HTML5 & CSS3", proficiency: "expert", yearsOfExperience: 7 },
      {
        name: "Responsive Design",
        proficiency: "expert",
        yearsOfExperience: 6,
      },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", proficiency: "expert", yearsOfExperience: 5 },
      { name: "Express.js", proficiency: "advanced", yearsOfExperience: 4 },
      { name: "PostgreSQL", proficiency: "advanced", yearsOfExperience: 4 },
      { name: "MongoDB", proficiency: "advanced", yearsOfExperience: 3 },
      { name: "Redis", proficiency: "intermediate", yearsOfExperience: 2 },
      { name: "REST APIs", proficiency: "expert", yearsOfExperience: 5 },
      { name: "GraphQL", proficiency: "intermediate", yearsOfExperience: 2 },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git & GitHub", proficiency: "expert", yearsOfExperience: 7 },
      { name: "Docker", proficiency: "advanced", yearsOfExperience: 3 },
      {
        name: "AWS (EC2, S3, Lambda)",
        proficiency: "advanced",
        yearsOfExperience: 3,
      },
      { name: "Vercel", proficiency: "expert", yearsOfExperience: 3 },
      { name: "GitHub Actions", proficiency: "advanced", yearsOfExperience: 2 },
      {
        name: "CI/CD Pipelines",
        proficiency: "advanced",
        yearsOfExperience: 3,
      },
      { name: "Linux/Unix", proficiency: "advanced", yearsOfExperience: 5 },
    ],
  },
  {
    category: "Additional Skills",
    skills: [
      {
        name: "Performance Optimization",
        proficiency: "expert",
        yearsOfExperience: 4,
      },
      {
        name: "Web Accessibility (WCAG)",
        proficiency: "advanced",
        yearsOfExperience: 3,
      },
      {
        name: "SEO Best Practices",
        proficiency: "advanced",
        yearsOfExperience: 4,
      },
      { name: "Agile/Scrum", proficiency: "advanced", yearsOfExperience: 5 },
      {
        name: "Technical Writing",
        proficiency: "advanced",
        yearsOfExperience: 4,
      },
    ],
  },
];

/**
 * Skills organized by category for tabbed interface
 * Categorized for Frontend, Backend, DevOps, and Additional skills tabs
 */
export const skillCategories = {
  frontend: skills[0].skills,
  backend: skills[1].skills,
  devops: skills[2].skills,
  additional: skills[3].skills,
} as const;

/**
 * Career Timeline
 * Career Timeline
 * Professional milestones and achievements
 */
export const careerMilestones: TimelineEvent[] = [
  {
    date: "2024-03",
    title: "Senior Fullstack Engineer",
    description: "Leading development of high-performance web applications",
    type: "career",
  },
  {
    date: "2022-06",
    title: "Fullstack Engineer",
    description: "Specializing in React, Node.js, and cloud infrastructure",
    type: "career",
  },
  {
    date: "2020-12",
    title: "Computer Science Degree",
    description: "B.S. in Computer Science with honors",
    type: "education",
  },
];

/**
 * Running Timeline
 * Marathon and running achievements
 */
export const runningMilestones: TimelineEvent[] = [
  {
    date: "2023-10",
    title: "Boston Marathon Qualifier",
    description: "Achieved BQ time of 3:15:42 at Chicago Marathon",
    type: "achievement",
  },
  {
    date: "2021-09",
    title: "First Marathon",
    description: "Completed first marathon in 3:45:23",
    type: "achievement",
  },
];

/**
 * @deprecated Use careerMilestones or runningMilestones instead
 * Combined timeline - kept for backwards compatibility
 */
export const timeline: TimelineEvent[] = [
  ...careerMilestones,
  ...runningMilestones,
].sort((a, b) => b.date.localeCompare(a.date));

/**
 * Running Achievements
 * Notable running accomplishments and stats
 */
export const achievements: Achievement[] = [
  {
    title: "Total Races",
    value: "15+",
    description: "Marathons and half marathons completed",
  },
  {
    title: "Marathon PR",
    value: "3:15:42",
    description: "Boston Marathon qualifying time",
  },
  {
    title: "Half Marathon PR",
    value: "1:32:18",
    description: "Personal best at San Francisco Half",
  },
  {
    title: "Weekly Mileage",
    value: "50-60 mi",
    description: "Average training volume",
  },
];

/**
 * Professional Philosophy
 * Core principles and approach to software development
 */
export const professionalPhilosophy = {
  title: "My Engineering Philosophy",
  principles: [
    {
      title: "User-Centric Design",
      description:
        "Every technical decision should ultimately serve the end user. Performance optimization, accessibility, and intuitive UX are not optional—they're fundamental to quality software.",
    },
    {
      title: "Code as Communication",
      description:
        "Code is read far more than it's written. I prioritize clarity, maintainability, and comprehensive documentation. Well-named variables and functions are better than clever shortcuts.",
    },
    {
      title: "Data-Driven Iteration",
      description:
        "Informed decisions beat gut instincts. Whether it's A/B testing features or profiling performance bottlenecks, I let metrics guide the path to continuous improvement.",
    },
    {
      title: "Embrace Constraints",
      description:
        "Limitations breed creativity. Building this portfolio with zero runtime database forced elegant architectural decisions that resulted in blazing fast performance and zero hosting costs.",
    },
    {
      title: "Systematic Excellence",
      description:
        "Excellence is a habit, not an accident. From automated testing to code reviews, I build systems that make quality the default outcome, not a heroic effort.",
    },
  ],
} as const;

/**
 * Featured Videos Configuration
 * YouTube video embeds for training content section
 */
/**
 * Featured Videos by Category
 * YouTube videos showcasing running, software engineering, and public speaking
 */
export const videosByCategory = {
  running: [
    {
      id: "dQw4w9WgXcQ1", // TODO: Replace with actual video ID
      title: "Marathon Training Week in the Life",
      description: "A week of 60-mile training during marathon prep",
      category: "running" as const,
    },
    {
      id: "dQw4w9WgXcQ2", // TODO: Replace with actual video ID
      title: "Chicago Marathon Race Recap",
      description: "Breaking down my BQ race strategy and execution",
      category: "running" as const,
    },
  ],
  coding: [
    {
      id: "dQw4w9WgXcQ3", // TODO: Replace with actual video ID
      title: "Building Type-Safe APIs with Zod",
      description: "Deep dive into runtime validation in TypeScript",
      category: "coding" as const,
    },
  ],
  talks: [
    {
      id: "dQw4w9WgXcQ4", // TODO: Replace with actual video ID
      title: "Software Engineer's Guide to Marathon Training",
      description: "Applying engineering principles to running performance",
      category: "talks" as const,
    },
  ],
};

/**
 * Legacy: All featured videos flattened (for backward compatibility)
 * @deprecated Use videosByCategory instead for tabbed interface
 */
export const featuredVideos: FeaturedVideo[] = [
  ...videosByCategory.running,
  ...videosByCategory.coding,
  ...videosByCategory.talks,
];

/**
 * Search Configuration for Fuse.js
 * Used in blog post searching and filtering
 */
export const SEARCH_CONFIG = {
  /** Fuzzy search sensitivity (0 = exact match, 1 = match anything) */
  threshold: 0.3,
  /** Fields to search within */
  keys: ["title", "description", "tags", "category"],
  /** Include relevance score in results */
  includeScore: true,
};

/**
 * Tech Stack Credits
 * Technologies used to build this portfolio
 */
export const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Shadcn/ui",
  "Vercel",
] as const;
