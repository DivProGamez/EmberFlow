'use client';
import type { Character } from "@/lib/data";
import { useIAP } from "@/contexts/IAPContext";
import { CharacterIcon } from "./character-icon";
import { IAPDialog } from "./iap-dialog";
import { useState } from "react";

export default function CharacterGrid({ characters }: { characters: Character[] }) {
  const { unlockedCharacters } = useIAP();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleIconClick = (character: Character) => {
    const isUnlocked = unlockedCharacters.has(character.id);
    if (!isUnlocked) {
      setSelectedCharacter(character);
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
        {characters.map((character) => (
          <CharacterIcon
            key={character.id}
            character={character}
            isUnlocked={unlockedCharacters.has(character.id)}
            onClick={() => handleIconClick(character)}
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
