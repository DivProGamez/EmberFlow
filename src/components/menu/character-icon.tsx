'use client';
import type { Character } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface CharacterIconProps {
  character: Character;
  isUnlocked: boolean;
  onClick: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export const CharacterIcon = React.forwardRef<HTMLDivElement, CharacterIconProps>(
  ({ character, isUnlocked, onClick, onFocus, isFocused }, ref) => {
    
    const content = (
      <div
        className={cn(
          "group aspect-square relative flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-primary/30 focus:outline-none",
          "focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isFocused && "ring-4 ring-primary ring-offset-2 ring-offset-background",
          !isUnlocked ? "cursor-pointer" : "cursor-pointer"
        )}
      >
        <Image
          src={character.iconUrl}
          alt={character.name}
          width={100}
          height={100}
          className={cn("rounded-full transition-all duration-300", !isUnlocked && "opacity-50 grayscale")}
          data-ai-hint={character.iconHint}
        />
        <h3 className="font-headline text-lg text-center text-card-foreground truncate w-full">{character.name}</h3>
        {!isUnlocked && (
          <>
            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1.5 rounded-full">
              <Lock className="h-4 w-4" />
            </div>
          </>
        )}
      </div>
    );
    
    const commonProps = {
      ref: ref,
      tabIndex: 0,
      onClick: onClick,
      onFocus: onFocus,
    };

    if (isUnlocked) {
      return (
        <Link href={`/player/${character.id}`} aria-label={`Open ${character.name} scene`} {...commonProps} >
          {content}
        </Link>
      );
    }

    return (
      <div role="button" {...commonProps}>
          {content}
      </div>
    );
  }
);

CharacterIcon.displayName = 'CharacterIcon';
