import './globals.css';
import Header from './components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Meva App',
  description: 'Aplicació amb layout compartit i navegació',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body>
        <Header />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

