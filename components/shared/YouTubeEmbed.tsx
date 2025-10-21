"use client";

import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface YouTubeEmbedProps {
  id: string;
  title: string;
  poster?: "hqdefault" | "maxresdefault";
}

export function YouTubeEmbed({
  id,
  title,
  poster = "hqdefault",
}: YouTubeEmbedProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Unable to load video: {title}. The video may have been removed or is
          unavailable.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-lg border"
      onError={() => setHasError(true)}
    >
      <LiteYouTubeEmbed id={id} title={title} poster={poster} />
    </div>
  );
}
