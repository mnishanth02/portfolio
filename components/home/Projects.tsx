import { ProjectCard } from "@/components/shared/ProjectCard";
import { cn } from "@/lib/utils";
import { getAllProjects } from "@/lib/projects";

/**
 * Projects Section Component - Server Component
 *
 * Displays a bento grid of featured projects loaded from the filesystem.
 * Featured project (featured: true) spans 2 columns on md+ screens for prominence.
 * Projects are automatically sorted with featured projects first,
 * then by start date (most recent first).
 *
 * @returns {Promise<JSX.Element>} Server-rendered projects section with bento grid layout
 *
 * @example
 * ```tsx
 * <Projects />
 * ```
 *
 * @remarks
 * - Bento grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
 * - Featured project spans 2 columns on md+ and 2 rows on lg+
 * - Uses gap-6 for consistent spacing per design tokens
 * - Server-side data fetching via getAllProjects()
 */
export async function Projects() {
  const projects = await getAllProjects();

  return (
    <section
      id="projects"
      className="py-16 px-4"
      aria-label="Featured Projects"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing fullstack development,
            performance optimization, and user-centric design
          </p>
        </div>

        {/* Bento Grid Layout */ }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { projects.map((project) => (
            <div
              key={ project.id }
              className={ cn(project.featured && "md:col-span-2 lg:row-span-2") }
            >
              <ProjectCard project={ project } featured={ project.featured } />
            </div>
          )) }
        </div>

        {/* Empty State */ }
        { projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects available at the moment.
            </p>
          </div>
        ) }
      </div>
    </section>
  );
}
