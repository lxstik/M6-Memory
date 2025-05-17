"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';


interface User {
  id: number;
  nombre: string;
  contrasenya: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('dades_usuaris') || '[]');
    const loggedUser = JSON.parse(localStorage.getItem('logged_user') || 'null');
    if (loggedUser) {
      const existingUser = storedUsers.find((u: User) => u.nombre === loggedUser.nombre);
      if (existingUser) setUser(existingUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('dades_usuaris') || '[]');
    const foundUser = storedUsers.find((u: User) => u.nombre === username && u.contrasenya === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('logged_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('dades_usuaris') || '[]');
    const userExists = storedUsers.some((u: User) => u.nombre === username);

    if (!userExists) {
      const newUser = { id: Date.now(), nombre: username, contrasenya: password };
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('dades_usuaris', JSON.stringify(updatedUsers));
      setUser(newUser);
      localStorage.setItem('logged_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('logged_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}