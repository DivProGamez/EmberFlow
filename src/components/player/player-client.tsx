'use client';

import type { Character, Video } from "@/lib/data";
import { useState, useEffect, useRef, useCallback } from "react";
import PlayerHeader from "./player-header";
import VideoDisplay from "./video-display";
import PreviewBar from "./preview-bar";
import { cn } from "@/lib/utils";

export default function PlayerClient({ character }: { character: Character }) {
  const [currentVideo, setCurrentVideo] = useState<Video>(character.videos[0]);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const showAndAutoHideControls = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setControlsVisible(true);
    hideControlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 4000);
  }, []);

  useEffect(() => {
    showAndAutoHideControls();
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showAndAutoHideControls, currentVideo]);

  const handleInteraction = () => {
    showAndAutoHideControls();
  };

  return (
    <div 
      className="relative h-screen w-full bg-black overflow-hidden"
      onMouseMove={handleInteraction}
      onFocus={handleInteraction}
      onKeyDown={handleInteraction}
      tabIndex={-1}
    >
      <VideoDisplay video={currentVideo} />

      <div className={cn(
        "absolute inset-0 top-0 h-24 transition-opacity duration-500",
        controlsVisible ? "opacity-100" : "opacity-0"
      )}>
        <PlayerHeader characterName={character.name} />
      </div>

      <div className={cn(
        "absolute inset-x-0 bottom-0 transition-opacity duration-500",
        controlsVisible ? "opacity-100" : "opacity-0"
      )}>
        <PreviewBar
          videos={character.videos}
          currentVideo={currentVideo}
          onSelectVideo={setCurrentVideo}
        />
      </div>
    </div>
  );
}
