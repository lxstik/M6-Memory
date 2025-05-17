'use client';

import './globals.css';
import Header from './components/header';
import { ClickProvider } from './context/ClickContext';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body>
        <AuthProvider>
          <ClickProvider>
            <Header />
            <main className="max-w-5xl mx-auto p-4">{children}</main>
          </ClickProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
