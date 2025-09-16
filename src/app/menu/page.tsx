import { characters } from '@/lib/data';
import CharacterGrid from '@/components/menu/character-grid';
import { Logo } from '@/components/logo';

export default function MenuPage() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8">
        <Logo className="h-16 w-auto mx-auto text-foreground" />
        <h1 className="font-headline text-4xl mt-2 tracking-tight">Relax & Enjoy</h1>
        <p className="text-muted-foreground mt-1">Select a scene to begin your relaxation journey.</p>
      </header>
      <main>
        <CharacterGrid characters={characters} />
      </main>
    </div>
  );
}
