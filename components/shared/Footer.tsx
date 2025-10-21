import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { SocialLinks } from "./SocialLinks";

/**
 * Footer Component
 * Site footer with copyright, social links, and tech stack credits
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="/resume.txt"
                  download
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <SocialLinks />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs">Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
