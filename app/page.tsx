import type { Metadata } from "next";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Projects } from "@/components/home/Projects";
import { Blog } from "@/components/home/Blog";
import { Videos } from "@/components/home/Videos";
import { Contact } from "@/components/home/Contact";
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
    sameAs: socialLinks.map((link) => link.url).filter((url) => !url.startsWith("mailto:")),
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
      {/* JSON-LD Structured Data */ }
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <false positive>
        dangerouslySetInnerHTML={ { __html: JSON.stringify(personSchema) } }
      />

      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Blog />
          <Videos />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
