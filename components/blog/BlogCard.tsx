import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <SafeImage
              src={`/images/blog/${post.image}`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary" className="capitalize">
              {post.category}
            </Badge>
            {post.featured && <Badge variant="default">Featured</Badge>}
          </div>
          <h3 className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">
            {post.description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, "short")}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </CardFooter>

        {post.tags && post.tags.length > 0 && (
          <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
