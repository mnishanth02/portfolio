"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match: RegExpExecArray | null = null;

    // biome-ignore lint/suspicious/noAssignInExpressions: RegExp.exec pattern
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    // Observe all headings
    extractedHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-2">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Table of Contents
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn("transition-colors", heading.level === 3 && "ml-4")}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 hover:text-foreground",
                activeId === heading.id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
