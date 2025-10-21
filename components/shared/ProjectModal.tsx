"use client";

import type { Project } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectModalProps {
    project: Project;
    open: boolean;
    onClose: () => void;
}

/**
 * ProjectModal Component
 * Modal dialog for quick project preview
 */
export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
    return (
        <Dialog open={ open } onOpenChange={ onClose }>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{ project.title }</DialogTitle>
                    <DialogDescription>{ project.description }</DialogDescription>
                </DialogHeader>

                {/* Project Image */ }
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={ `/images/projects/${project.image}` }
                        alt={ project.title }
                        width={ 800 }
                        height={ 450 }
                        className="object-cover w-full h-full"
                        onError={ (e) => {
                            e.currentTarget.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==";
                        } }
                    />
                </div>

                {/* Long Description */ }
                { project.longDescription && (
                    <div className="prose dark:prose-invert max-w-none">
                        <p>{ project.longDescription }</p>
                    </div>
                ) }

                {/* Technologies */ }
                <div>
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                        { project.technologies.map((tech) => (
                            <Badge key={ tech } variant="secondary">
                                { tech }
                            </Badge>
                        )) }
                    </div>
                </div>

                {/* Project Details */ }
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2 font-medium capitalize">
                            { project.category }
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Status:</span>
                        <span className="ml-2 font-medium capitalize">
                            { project.status }
                        </span>
                    </div>
                    { project.startDate && (
                        <div>
                            <span className="text-muted-foreground">Started:</span>
                            <span className="ml-2 font-medium">{ project.startDate }</span>
                        </div>
                    ) }
                    { project.endDate && (
                        <div>
                            <span className="text-muted-foreground">Completed:</span>
                            <span className="ml-2 font-medium">{ project.endDate }</span>
                        </div>
                    ) }
                </div>

                {/* Action Buttons */ }
                <div className="flex gap-4 pt-4">
                    { project.demoUrl && (
                        <Button asChild className="flex-1">
                            <Link
                                href={ project.demoUrl }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Demo
                            </Link>
                        </Button>
                    ) }
                    { project.githubUrl && (
                        <Button asChild variant="outline" className="flex-1">
                            <Link
                                href={ project.githubUrl }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                            </Link>
                        </Button>
                    ) }
                </div>

                {/* Learn More Link (for future project detail pages) */ }
                <div className="text-center pt-2">
                    <Link
                        href={ `/projects/${project.id}` }
                        className="text-sm text-primary hover:underline"
                        onClick={ onClose }
                    >
                        Learn more about this project →
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
