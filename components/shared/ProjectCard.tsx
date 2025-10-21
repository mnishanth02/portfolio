"use client";

import { ExternalLink, Eye, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import type { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard Component
 * Individual project card with thumbnail, details, and links
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <CardHeader className="p-0">
          {/* Project Thumbnail */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-muted">
            <SafeImage
              src={`/images/projects/${project.image}`}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay with quick view button */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pt-6">
          {/* Title and Description */}
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-4">
          {/* Demo Link */}
          {project.demoUrl && (
            <Button asChild variant="default" size="sm" className="flex-1">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}

          {/* GitHub Link */}
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Project Modal */}
      <ProjectModal
        project={project}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
