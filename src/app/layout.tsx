import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { IAPProvider } from '@/contexts/IAPContext';
import { OrientationLock } from '@/components/orientation-lock';

export const metadata: Metadata = {
  title: 'EmberFlow',
  description: 'Immersive Fire TV Relaxation App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <IAPProvider>
          <div className="portrait:hidden">
            {children}
          </div>
          <Toaster />
          <OrientationLock />
        </IAPProvider>
      </body>
    </html>
  );
}
