"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

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
    return (
        <div className="overflow-hidden rounded-lg border">
            <LiteYouTubeEmbed
                id={ id }
                title={ title }
                poster={ poster }
            />
        </div>
    );
}
