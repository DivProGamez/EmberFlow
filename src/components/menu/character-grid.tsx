'use client';
import type { Character } from "@/lib/data";
import { useIAP } from "@/contexts/IAPContext";
import { CharacterIcon } from "./character-icon";
import { IAPDialog } from "./iap-dialog";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function CharacterGrid({ characters }: { characters: Character[] }) {
  const { unlockedCharacters } = useIAP();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const iconRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleIconClick = (character: Character) => {
    const isUnlocked = unlockedCharacters.has(character.id);
    if (isUnlocked) {
      router.push(`/player/${character.id}`);
    } else {
      setSelectedCharacter(character);
      setDialogOpen(true);
    }
  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const getNumColumns = () => {
        if (window.innerWidth >= 1024) return 6;
        if (window.innerWidth >= 768) return 4;
        if (window.innerWidth >= 640) return 3;
        return 2;
    };
    const numColumns = getNumColumns();
    let newIndex = focusedIndex;

    switch (event.key) {
      case "ArrowRight":
        newIndex = (focusedIndex + 1) % characters.length;
        break;
      case "ArrowLeft":
        newIndex = (focusedIndex - 1 + characters.length) % characters.length;
        break;
      case "ArrowDown":
        newIndex = Math.min(focusedIndex + numColumns, characters.length - 1);
        break;
      case "ArrowUp":
        newIndex = Math.max(focusedIndex - numColumns, 0);
        break;
      case "Enter":
      case " ": // Space bar
        event.preventDefault();
        handleIconClick(characters[focusedIndex]);
        return;
      default:
        return;
    }
    
    event.preventDefault();
    setFocusedIndex(newIndex);

  }, [focusedIndex, characters, handleIconClick]);
  
  useEffect(() => {
    const characterId = characters[focusedIndex]?.id;
    const element = iconRefs.current.get(characterId);
    element?.focus();
  }, [focusedIndex, characters]);


  return (
    <>
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto"
        onKeyDown={handleKeyDown}
        role="grid"
      >
        {characters.map((character, index) => (
          <CharacterIcon
            key={character.id}
            character={character}
            isUnlocked={unlockedCharacters.has(character.id)}
            onClick={() => {
              setFocusedIndex(index);
              handleIconClick(character)
            }}
            onFocus={() => setFocusedIndex(index)}
            ref={(el) => {
              if (el) iconRefs.current.set(character.id, el);
              else iconRefs.current.delete(character.id);
            }}
            isFocused={index === focusedIndex}
          />
        ))}
      </div>
      {selectedCharacter && (
        <IAPDialog
          character={selectedCharacter}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
