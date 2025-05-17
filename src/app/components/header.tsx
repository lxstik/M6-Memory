'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full border-b shadow-sm px-6 py-3 bg-white">
      <nav className="max-w-5xl mx-auto flex items-center justify-between">
        <div
          className="text-2xl font-bold cursor-pointer text-indigo-600 hover:text-indigo-800 transition"
          onClick={() => router.push('/')}
        >
          Memory M6
        </div>
        <div className="space-x-3">
          <Button variant="ghost" onClick={() => router.push('/')}>
            Inicio
          </Button>
          {user ? (
            <>
              <Button variant="ghost" onClick={() => router.push('/juego')}>
                Juego
              </Button>
              <Button variant="ghost" onClick={() => router.push('/acerca')}>
                Acerca
              </Button>
              <Button variant="destructive" onClick={logout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Iniciar sesión
              </Button>
              <Button variant="ghost" onClick={() => router.push('/register')}>
                Registrarse
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
