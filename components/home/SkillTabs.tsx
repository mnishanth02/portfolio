"use client";

import { Code2, Database, Server, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill } from "@/types";
import { SkillCard } from "./SkillCard";

interface SkillTabsProps {
    frontend: Skill[];
    backend: Skill[];
    devops: Skill[];
    additional: Skill[];
}

/**
 * SkillTabs Component (Client Component)
 *
 * Tabbed interface for displaying categorized technical skills.
 * Features responsive tab labels (icon-only on mobile, full text on desktop).
 *
 * @component
 * @param {SkillTabsProps} props - Categorized skills data
 * @param {Skill[]} props.frontend - Frontend development skills
 * @param {Skill[]} props.backend - Backend development skills
 * @param {Skill[]} props.devops - DevOps and tools skills
 * @param {Skill[]} props.additional - Additional/soft skills
 * @returns {JSX.Element} A client-rendered tabbed skills interface
 *
 * @example
 * ```tsx
 * <SkillTabs
 *   frontend={frontendSkills}
 *   backend={backendSkills}
 *   devops={devopsSkills}
 *   additional={additionalSkills}
 * />
 * ```
 *
 * @remarks
 * - Uses shadcn/ui Tabs component
 * - Default tab: Frontend
 * - Grid layout: 1 column (base), 2 columns (md), 3 columns (lg)
 * - Responsive labels: Icons only on mobile (<768px), full text on md+
 * - Keyboard accessible: Tab key navigates between triggers, Arrow keys switch tabs
 */
export function SkillTabs({
    frontend,
    backend,
    devops,
    additional,
}: SkillTabsProps) {
    return (
        <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="frontend" className="gap-2">
                    <Code2 className="h-4 w-4" />
                    <span className="hidden md:inline">Frontend</span>
                    <span className="sr-only md:hidden">Frontend Development</span>
                </TabsTrigger>
                <TabsTrigger value="backend" className="gap-2">
                    <Database className="h-4 w-4" />
                    <span className="hidden md:inline">Backend</span>
                    <span className="sr-only md:hidden">Backend Development</span>
                </TabsTrigger>
                <TabsTrigger value="devops" className="gap-2">
                    <Server className="h-4 w-4" />
                    <span className="hidden md:inline">DevOps</span>
                    <span className="sr-only md:hidden">DevOps & Tools</span>
                </TabsTrigger>
                <TabsTrigger value="additional" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden md:inline">Additional</span>
                    <span className="sr-only md:hidden">Additional Skills</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { frontend.map((skill) => (
                        <SkillCard key={ skill.name } skill={ skill } />
                    )) }
                </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { backend.map((skill) => (
                        <SkillCard key={ skill.name } skill={ skill } />
                    )) }
                </div>
            </TabsContent>

            <TabsContent value="devops" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { devops.map((skill) => (
                        <SkillCard key={ skill.name } skill={ skill } />
                    )) }
                </div>
            </TabsContent>

            <TabsContent value="additional" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { additional.map((skill) => (
                        <SkillCard key={ skill.name } skill={ skill } />
                    )) }
                </div>
            </TabsContent>

            {/* Proficiency Legend */ }
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span>Expert (5+ years or deep expertise)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-secondary" />
                    <span>Advanced (3-4 years, production experience)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-border" />
                    <span>Intermediate (1-2 years, growing proficiency)</span>
                </div>
            </div>
        </Tabs>
    );
}
