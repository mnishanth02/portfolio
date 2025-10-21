"use client";

import { useState, useMemo } from "react";
import type { BlogPost } from "@/types";
import { BlogCard } from "./BlogCard";
import { SearchBar } from "./SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEARCH_CONFIG } from "@/lib/constants";
import Fuse from "fuse.js";

interface BlogListProps {
    posts: BlogPost[];
}

const categories = [
    { value: "all", label: "All" },
    { value: "technical", label: "Technical" },
    { value: "fitness", label: "Fitness" },
    { value: "lifestyle", label: "Lifestyle" },
] as const;

export function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Configure Fuse.js for fuzzy search using centralized config
    const fuse = useMemo(
        () => new Fuse(posts, SEARCH_CONFIG),
        [posts]
    );

    // Filter and search posts
    const filteredPosts = useMemo(() => {
        let results = posts;

        // Category filter
        if (selectedCategory !== "all") {
            results = results.filter((post) => post.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const fuseResults = fuse.search(searchQuery);
            const searchedPosts = fuseResults.map((result) => result.item);

            // If category filter is active, apply it to search results
            if (selectedCategory !== "all") {
                return searchedPosts.filter(
                    (post) => post.category === selectedCategory
                );
            }

            return searchedPosts;
        }

        return results;
    }, [posts, selectedCategory, searchQuery, fuse]);

    return (
        <div className="space-y-8">
            {/* Search and Filter Controls */ }
            <div className="space-y-4">
                <SearchBar
                    value={ searchQuery }
                    onChange={ setSearchQuery }
                    placeholder="Search by title, description, or tags..."
                />

                {/* Category Filter */ }
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Filter by:
                    </span>
                    { categories.map((category) => (
                        <Badge
                            key={ category.value }
                            variant={
                                selectedCategory === category.value ? "default" : "outline"
                            }
                            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                            onClick={ () => setSelectedCategory(category.value) }
                        >
                            { category.label }
                        </Badge>
                    )) }
                </div>
            </div>

            {/* Results Count */ }
            <div
                className="text-sm text-muted-foreground"
                role="status"
                aria-live="polite"
            >
                { filteredPosts.length === 0 ? (
                    <p>No articles found matching your criteria.</p>
                ) : (
                    <p>
                        Showing { filteredPosts.length } of { posts.length }{ " " }
                        { filteredPosts.length === 1 ? "article" : "articles" }
                    </p>
                ) }
            </div>

            {/* Blog Posts Grid */ }
            { filteredPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    { filteredPosts.map((post, index) => (
                        <BlogCard key={ post.slug } post={ post } priority={ index < 3 } />
                    )) }
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="mb-4 text-lg text-muted-foreground">
                        No articles found matching your search criteria.
                    </p>
                    <Button
                        variant="outline"
                        onClick={ () => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                        } }
                    >
                        Clear Filters
                    </Button>
                </div>
            ) }
        </div>
    );
}
