import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Articles } from "@/components/home/Articles";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { PhilosophyCallout } from "@/components/home/PhilosophyCallout";
import { Projects } from "@/components/home/Projects";
import { VideosWrapper } from "@/components/home/VideosWrapper";
import { Footer } from "@/components/shared/Footer";
import { Navigation } from "@/components/shared/Navigation";
import { siteConfig, socialLinks } from "@/lib/constants";

/**
 * Home Page SEO Metadata
 */
export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "fullstack engineer",
    "web developer",
    "marathon runner",
    "react",
    "next.js",
    "typescript",
    "personal portfolio",
    "software engineer",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: `${siteConfig.url}`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.svg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

/**
 * Home Page
 * Single-page portfolio with smooth scrolling sections
 */
export default function Home() {
  // JSON-LD structured data for Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/headshot.svg`,
    jobTitle: "Fullstack Software Engineer",
    description: siteConfig.description,
    email: siteConfig.author.email,
    sameAs: socialLinks
      .map((link) => link.url)
      .filter((url) => !url.startsWith("mailto:")),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "Web Performance",
      "Marathon Running",
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <false positive>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen">
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Articles />
          <VideosWrapper />
          <Contact />
          <PhilosophyCallout />
        </main>
        <Footer />
      </div>
    </>
  );
}
