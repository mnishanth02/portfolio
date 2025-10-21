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
];

/**
 * Social Media Links
 * Social profiles and contact channels
 */
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/mnishanth02/portfolio",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/nishanthmurugan",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/mnishanth02",
    icon: "Twitter",
  },
  {
    name: "Strava",
    url: "https://www.strava.com/athletes/11694245",
    icon: "Activity",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@TheTechletee",
    icon: "Youtube",
  },
  {
    name: "Email",
    url: "mailto:nishanth.murugan@gmail.com",
    icon: "Mail",
  },
];

/**
 * Skills by Category
 * Technical skills organized by domain
 */
export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "REST APIs",
      "Convex",
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "GitHub Actions",
      "CI/CD",
      "Linux",
    ],
  },
];

/**
 * Career Timeline
 * Professional milestones and key achievements
 */
export const timeline: TimelineEvent[] = [
  {
    date: "2024-03",
    title: "Senior Fullstack Engineer",
    description: "Leading development of high-performance web applications",
    type: "career",
  },
  {
    date: "2023-10",
    title: "Boston Marathon Qualifier",
    description: "Achieved BQ time of 3:15:42 at Chicago Marathon",
    type: "achievement",
  },
  {
    date: "2022-06",
    title: "Fullstack Engineer",
    description: "Specializing in React, Node.js, and cloud infrastructure",
    type: "career",
  },
  {
    date: "2021-09",
    title: "First Marathon",
    description: "Completed first marathon in 3:45:23",
    type: "achievement",
  },
  {
    date: "2020-12",
    title: "Computer Science Degree",
    description: "B.S. in Computer Science with honors",
    type: "education",
  },
];

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
 * Featured YouTube Videos
 * Highlighted training and race videos
 */
export const featuredVideos: FeaturedVideo[] = [
  {
    id: "dQw4w9WgXcQ", // Replace with actual video ID
    title: "Marathon Training Week in the Life",
    description: "A week of 60-mile training during marathon prep",
  },
  {
    id: "dQw4w9WgXcQ", // Replace with actual video ID
    title: "Chicago Marathon Race Recap",
    description: "Breaking down my BQ race strategy and execution",
  },
  {
    id: "dQw4w9WgXcQ", // Replace with actual video ID
    title: "Software Engineer's Guide to Marathon Training",
    description: "Applying engineering principles to running performance",
  },
];

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
