import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Project } from "@/types";
import { projectSchema } from "./validations";

const projectsDirectory = join(process.cwd(), "content/projects");

/**
 * Get all projects from content/projects/*.json
 * @returns Array of validated Project objects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const fileNames = await readdir(projectsDirectory);
    const jsonFiles = fileNames.filter((name) => name.endsWith(".json"));

    const projects = await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = join(projectsDirectory, fileName);
        const fileContents = await readFile(filePath, "utf8");
        const projectData = JSON.parse(fileContents);

        // Validate against schema
        const validatedProject = projectSchema.parse(projectData);
        return validatedProject;
      }),
    );

    // Sort by featured first, then by start date (most recent first)
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Sort by start date if available
      if (a.startDate && b.startDate) {
        return b.startDate.localeCompare(a.startDate);
      }
      return 0;
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}

/**
 * Get a single project by ID/slug
 * @param slug Project ID/slug
 * @returns Validated Project object or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = join(projectsDirectory, `${slug}.json`);
    const fileContents = await readFile(filePath, "utf8");
    const projectData = JSON.parse(fileContents);

    // Validate against schema
    const validatedProject = projectSchema.parse(projectData);
    return validatedProject;
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all project slugs for static generation
 * @returns Array of project slugs
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const fileNames = await readdir(projectsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.replace(/\.json$/, ""));
  } catch (error) {
    console.error("Error loading project slugs:", error);
    return [];
  }
}
