import { skillCategories } from "@/lib/constants";
import { SkillTabs } from "./SkillTabs";

/**
 * SkillsWrapper Component (Server Component)
 *
 * Server component wrapper that fetches skills data and passes it to the SkillTabs client component.
 * Displays technical skills organized by category (Frontend, Backend, DevOps, Additional)
 * with tabbed interface and proficiency levels.
 *
 * @component
 * @returns {JSX.Element} A server-rendered skills section wrapper
 *
 * @example
 * ```tsx
 * <SkillsWrapper />
 * ```
 *
 * @remarks
 * - Uses skillCategories data from `lib/constants.ts`
 * - Delegates rendering to SkillTabs client component for interactivity
 * - Section heading and structure defined here, tabs managed by client component
 * - Accessibility: Wrapped in semantic `<section>` with aria-label
 */
export function SkillsWrapper() {
  return (
    <section className="py-16" aria-label="Technical Skills">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
        Technical Skills
      </h2>
      <SkillTabs
        frontend={skillCategories.frontend}
        backend={skillCategories.backend}
        devops={skillCategories.devops}
        additional={skillCategories.additional}
      />
    </section>
  );
}
