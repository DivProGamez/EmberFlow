'use client';
import React from 'react';
import { TabletSmartphone } from 'lucide-react';

export function OrientationLock() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background text-foreground landscape:hidden">
      <div className="p-8 text-center flex flex-col items-center gap-4">
        <TabletSmartphone className="w-16 h-16 text-primary" />
        <h2 className="font-headline text-3xl">Please Rotate Your Device</h2>
        <p className="text-muted-foreground">EmberFlow is designed for a landscape experience.</p>
      </div>
    </div>
  );
}
