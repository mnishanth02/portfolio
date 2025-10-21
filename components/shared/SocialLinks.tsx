import Link from "next/link";
import { socialLinks } from "@/lib/constants";
import * as LucideIcons from "lucide-react";

/**
 * Social Links Component
 * Reusable social media icon links
 */
export function SocialLinks({ className }: { className?: string }) {
    return (
        <div className={ className }>
            <ul className="flex flex-wrap gap-4">
                { socialLinks.map((link) => {
                    // Dynamically get the icon component from lucide-react
                    const IconComponent =
                        LucideIcons[link.icon as keyof typeof LucideIcons] as
                        | React.ComponentType<{ className?: string }>
                        | undefined;

                    if (!IconComponent) {
                        console.warn(`Icon "${link.icon}" not found in lucide-react`);
                        return null;
                    }

                    return (
                        <li key={ link.name }>
                            <Link
                                href={ link.url }
                                target={ link.url.startsWith("http") ? "_blank" : undefined }
                                rel={
                                    link.url.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors touch-target p-2"
                                aria-label={ link.name }
                            >
                                <IconComponent className="h-5 w-5" />
                            </Link>
                        </li>
                    );
                }) }
            </ul>
        </div>
    );
}
