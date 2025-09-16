'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DigitalClock from './digital-clock';

export default function PlayerHeader({ characterName }: { characterName: string }) {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/70 to-transparent">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="bg-black/50 border-white/20 text-white hover:bg-white/20">
          <Link href="/menu">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back to Menu</span>
          </Link>
        </Button>
        <h1 className="font-headline text-2xl text-white shadow-lg">{characterName}</h1>
      </div>
      <DigitalClock />
    </header>
  );
}
