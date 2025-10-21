import Link from "next/link";
import { socialLinks } from "@/lib/constants";

/**
 * Social Links Component
 * Reusable social media icon links
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-4">
        {socialLinks.map((link) => {
          const IconComponent = link.icon;

          return (
            <li key={link.name}>
              <Link
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors touch-target p-2"
                aria-label={link.name}
              >
                <IconComponent className="h-5 w-5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
