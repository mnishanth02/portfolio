"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Navigation Component
 * Responsive navigation bar with smooth scrolling and mobile hamburger menu
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationLinks.map((link) =>
        link.href.replace("#", ""),
      );
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ssupports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold hover:text-primary transition-colors"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary touch-target py-3 px-2",
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <ul className="container mx-auto py-4 px-4 space-y-3">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "w-full text-left text-sm font-medium transition-colors hover:text-primary py-2",
                    activeSection === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
