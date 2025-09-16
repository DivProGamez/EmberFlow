'use client';

import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { characters } from '@/lib/data';

interface IAPContextType {
  unlockedCharacters: Set<string>;
  unlockCharacter: (characterId: string) => void;
}

const IAPContext = createContext<IAPContextType | undefined>(undefined);

export function IAPProvider({ children }: { children: React.ReactNode }) {
  const initialUnlocked = useMemo(() => {
    const unlocked = new Set<string>();
    characters.forEach(char => {
      if (!char.isLocked) {
        unlocked.add(char.id);
      }
    });
    return unlocked;
  }, []);
  
  const [unlockedCharacters, setUnlockedCharacters] = useState<Set<string>>(initialUnlocked);

  const unlockCharacter = useCallback((characterId: string) => {
    setUnlockedCharacters(prev => {
      const newSet = new Set(prev);
      newSet.add(characterId);
      return newSet;
    });
  }, []);

  const value = useMemo(() => ({ unlockedCharacters, unlockCharacter }), [unlockedCharacters, unlockCharacter]);

  return (
    <IAPContext.Provider value={value}>
      {children}
    </IAPContext.Provider>
  );
}

export function useIAP() {
  const context = useContext(IAPContext);
  if (context === undefined) {
    throw new Error('useIAP must be used within an IAPProvider');
  }
  return context;
}
