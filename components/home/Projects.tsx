"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";

/**
 * Projects Section Component
 * Responsive grid of projects with filtering and sorting
 */
export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
        null,
    );
    const [sortBy, setSortBy] = useState<"recent" | "alphabetical" | "type">(
        "recent",
    );

    // Load projects from JSON files
    useEffect(() => {
        async function loadProjects() {
            try {
                // In a real implementation, this would load from content/projects/*.json
                // For now, using placeholder data
                const mockProjects: Project[] = [
                    {
                        id: "ecommerce-platform",
                        title: "E-commerce Platform Redesign",
                        description:
                            "Led full-stack redesign of e-commerce platform, improving checkout conversion by 32% and reducing page load time by 58%.",
                        technologies: [
                            "Next.js",
                            "React",
                            "TypeScript",
                            "Node.js",
                            "PostgreSQL",
                        ],
                        category: "fullstack",
                        status: "completed",
                        image: "placeholder.svg",
                        demoUrl: "https://demo.example.com",
                        githubUrl: "https://github.com/username/project",
                        featured: true,
                    },
                    // Add more mock projects as needed
                ];
                setProjects(mockProjects);
                setFilteredProjects(mockProjects);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        }
        loadProjects();
    }, []);

    // Filter projects by technology
    useEffect(() => {
        let filtered = projects;

        if (selectedTechnology) {
            filtered = filtered.filter((project) =>
                project.technologies.includes(selectedTechnology),
            );
        }

        // Sort projects
        switch (sortBy) {
            case "alphabetical":
                filtered = [...filtered].sort((a, b) =>
                    a.title.localeCompare(b.title),
                );
                break;
            case "type":
                filtered = [...filtered].sort((a, b) =>
                    a.category.localeCompare(b.category),
                );
                break;
            case "recent":
            default:
                // Keep default order (assumed recent first)
                break;
        }

        setFilteredProjects(filtered);
    }, [projects, selectedTechnology, sortBy]);

    // Get all unique technologies
    const allTechnologies = Array.from(
        new Set(projects.flatMap((p) => p.technologies)),
    ).sort();

    return (
        <section id="projects" className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of my recent work showcasing fullstack development,
                        performance optimization, and user-centric design
                    </p>
                </div>

                {/* Filters and Sort */ }
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Technology Filter */ }
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={ selectedTechnology === null ? "default" : "outline" }
                            size="sm"
                            onClick={ () => setSelectedTechnology(null) }
                        >
                            All
                        </Button>
                        { allTechnologies.slice(0, 8).map((tech) => (
                            <Button
                                key={ tech }
                                variant={ selectedTechnology === tech ? "default" : "outline" }
                                size="sm"
                                onClick={ () => setSelectedTechnology(tech) }
                            >
                                { tech }
                            </Button>
                        )) }
                    </div>

                    {/* Sort Dropdown */ }
                    <div className="flex gap-2 items-center">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <select
                            value={ sortBy }
                            onChange={ (e) =>
                                setSortBy(e.target.value as "recent" | "alphabetical" | "type")
                            }
                            className="bg-background border border-input rounded-md px-3 py-2 text-sm"
                        >
                            <option value="recent">Recent First</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="type">Project Type</option>
                        </select>
                    </div>
                </div>

                {/* Projects Grid */ }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { filteredProjects.map((project) => (
                        <ProjectCard key={ project.id } project={ project } />
                    )) }
                </div>

                {/* Empty State */ }
                { filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No projects found with the selected filters.
                        </p>
                        <Button
                            variant="link"
                            className="mt-4"
                            onClick={ () => setSelectedTechnology(null) }
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) }
            </div>
        </section>
    );
}
