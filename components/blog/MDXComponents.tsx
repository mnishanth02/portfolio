import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";

export const mdxComponents: MDXComponents = {
  // Custom heading components with anchor links
  h1: ({ children, id }) => (
    <h1 id={id} className="mt-8 mb-4 text-4xl font-bold tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="mt-8 mb-4 text-3xl font-bold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="mt-6 mb-3 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="mt-6 mb-3 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  ),
  h5: ({ children, id }) => (
    <h5 id={id} className="mt-4 mb-2 text-lg font-semibold tracking-tight">
      {children}
    </h5>
  ),
  h6: ({ children, id }) => (
    <h6 id={id} className="mt-4 mb-2 text-base font-semibold tracking-tight">
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="mb-4 leading-7 not-first:mt-6">{children}</p>
  ),

  // Links - external links open in new tab
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    return (
      <Link
        href={href || "#"}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  },

  // Images - use Next.js Image component
  img: ({ src, alt }) => (
    <span className="relative my-8 block overflow-hidden rounded-lg border">
      <SafeImage
        src={src || ""}
        alt={alt || ""}
        width={1200}
        height={675}
        className="w-full object-cover"
      />
    </span>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="my-6 ml-6 list-disc space-y-2 [&>li]:mt-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal space-y-2 [&>li]:mt-2">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,

  // Code blocks - styled by rehype-pretty-code
  pre: ({ children }) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    // Inline code
    if (!className) {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {children}
        </code>
      );
    }
    // Code block (handled by pre)
    return <code className={className}>{children}</code>;
  },

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="m-0 border-t p-0 even:bg-muted/50">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-t" />,

  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};
