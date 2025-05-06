'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full border-b shadow-sm px-4 py-2">
      <nav className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          🎮 La Meva App
        </div>
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => router.push('/')}>Inicio</Button>
          <Button variant="ghost" onClick={() => router.push('/juego')}>Juego</Button>
          <Button variant="ghost" onClick={() => router.push('/acerca')}>Acerca</Button>
        </div>
      </nav>
    </header>
  );
}
