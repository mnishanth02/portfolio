import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";

interface MDXRendererProps {
    code: string;
}

/**
 * Client component that renders compiled MDX code strings.
 *
 * @remarks
 * This component uses the Function constructor to evaluate compiled MDX code.
 * This approach is **safe** in this context because:
 * - Content source is trusted (our own MDX files, not user-generated content)
 * - Required by @content-collections/mdx architecture which returns compiled code as strings
 * - No external or user input is evaluated
 *
 * @see https://content-collections.dev/docs/mdx for more details on the compilation process
 *
 * @param code - Compiled MDX JavaScript string from @content-collections/mdx
 * @returns Rendered React component from the compiled MDX
 */
export function MDXRenderer({ code }: MDXRendererProps) {
    const Component = useMemo(() => {
        try {
            // Evaluate the compiled MDX code
            // The code expects _jsx_runtime to be available as a parameter
            const func = new Function("_jsx_runtime", code);
            const result = func(runtime);

            // The result should be a React component
            // If it's an object with a default export, use that (ES module pattern)
            if (result && typeof result === "object" && result.default) {
                return result.default;
            }

            // Otherwise return the result as-is
            return result;
        } catch (error) {
            console.error("Error rendering MDX:", error);
            return () => <div>Error rendering content</div>;
        }
    }, [code]);

    return <Component />;
}
