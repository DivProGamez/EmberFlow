'use client';

import type { Video } from "@/lib/data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

interface PreviewBarProps {
  videos: Video[];
  currentVideo: Video;
  onSelectVideo: (video: Video) => void;
}

export default function PreviewBar({ videos, currentVideo, onSelectVideo }: PreviewBarProps) {
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentVideo]);

  return (
    <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {videos.map((video) => {
            const isActive = video.id === currentVideo.id;
            return (
              <button
                key={video.id}
                ref={isActive ? activeThumbnailRef : null}
                onClick={() => onSelectVideo(video)}
                className={cn(
                  "group relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 transform focus:outline-none focus-visible:ring-4 focus-visible:ring-primary",
                  isActive ? "ring-4 ring-primary shadow-lg scale-105" : "hover:scale-105"
                )}
                aria-label={`Select ${video.title}`}
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint={video.thumbnailHint}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className={cn(
                  "absolute inset-x-0 bottom-0 p-2 bg-black/50 text-white text-sm text-center font-headline transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  {video.title}
                </div>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
