'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Loader } from '@/components/loader';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/menu');
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="splash-gradient flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="animate-glow">
          <Logo className="h-24 w-auto text-white" />
        </div>
        <Loader />
      </div>
    </div>
  );
}
