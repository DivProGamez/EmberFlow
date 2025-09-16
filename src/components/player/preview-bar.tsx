'use client';

import type { Video } from "@/lib/data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useRef, useCallback, useState } from "react";

interface PreviewBarProps {
  videos: Video[];
  currentVideo: Video;
  onSelectVideo: (video: Video) => void;
}

export default function PreviewBar({ videos, currentVideo, onSelectVideo }: PreviewBarProps) {
  const [focusedIndex, setFocusedIndex] = useState(videos.findIndex(v => v.id === currentVideo.id));
  const thumbnailRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Update focused index when the current video changes from outside
  useEffect(() => {
    const newIndex = videos.findIndex(v => v.id === currentVideo.id);
    if (newIndex !== -1) {
      setFocusedIndex(newIndex);
    }
  }, [currentVideo, videos]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    let newIndex = focusedIndex;
    
    switch (event.key) {
      case "ArrowRight":
        newIndex = Math.min(focusedIndex + 1, videos.length - 1);
        break;
      case "ArrowLeft":
        newIndex = Math.max(focusedIndex - 1, 0);
        break;
      case "Enter":
      case " ": // Space bar
        event.preventDefault();
        // Check if the focused video is already the current one before calling onSelectVideo
        if (videos[focusedIndex].id !== currentVideo.id) {
          onSelectVideo(videos[focusedIndex]);
        }
        return;
      // Allow parent to handle other keys like ArrowUp/ArrowDown to hide/show controls
      case "ArrowUp":
      case "ArrowDown":
          return;
      default:
        // Prevent default for any other key press to stop browser-native scrolling
        event.preventDefault();
        return;
    }

    event.preventDefault();
    if (newIndex !== focusedIndex) {
      setFocusedIndex(newIndex);
    }
  }, [focusedIndex, videos, onSelectVideo, currentVideo]);

  // Effect to focus and scroll to the active thumbnail
  useEffect(() => {
    const videoId = videos[focusedIndex]?.id;
    const element = thumbnailRefs.current.get(videoId);
    if (element) {
      element.focus({ preventScroll: true }); // Prevent native focus scroll
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [focusedIndex, videos]);

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className="p-4 bg-gradient-to-t from-black/80 to-transparent focus:outline-none"
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {videos.map((video, index) => {
            const isActive = video.id === currentVideo.id;
            const isFocused = index === focusedIndex;
            return (
              <button
                key={video.id}
                ref={(el) => {
                  if (el) thumbnailRefs.current.set(video.id, el);
                  else thumbnailRefs.current.delete(video.id);
                }}
                onClick={() => onSelectVideo(video)}
                onFocus={() => setFocusedIndex(index)}
                className={cn(
                  "group relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 transform focus:outline-none",
                  isActive ? "ring-4 ring-primary shadow-lg scale-105" : "hover:scale-105",
                  isFocused && !isActive && "ring-4 ring-gray-500", // Focused but not active
                  isFocused && "scale-105" // General focused state
                )}
                aria-label={`Select ${video.title}`}
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  sizes="192px"
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
