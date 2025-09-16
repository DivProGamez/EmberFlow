'use client';
import type { Character } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterIconProps {
  character: Character;
  isUnlocked: boolean;
  onClick: () => void;
}

export function CharacterIcon({ character, isUnlocked, onClick }: CharacterIconProps) {
  const content = (
    <div
      onClick={!isUnlocked ? onClick : undefined}
      className={cn(
        "group aspect-square relative flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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

  return isUnlocked ? (
    <Link href={`/player/${character.id}`} aria-label={`Open ${character.name} scene`}>
      {content}
    </Link>
  ) : (
    <div role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
        {content}
    </div>
  );
}
