import type { ReactNode } from "react";
import { Footer } from "@/components/shared/Footer";
import { Navigation } from "@/components/shared/Navigation";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
