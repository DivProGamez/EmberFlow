import { getCharacterById } from '@/lib/data';
import { notFound } from 'next/navigation';
import PlayerClient from '@/components/player/player-client';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { characters } = await import('@/lib/data');
  return characters.map((character) => ({
    id: character.id,
  }));
}

export default function PlayerPage({ params }: { params: { id: string } }) {
  const character = getCharacterById(params.id);

  if (!character) {
    notFound();
  }

  return <PlayerClient character={character} />;
}
