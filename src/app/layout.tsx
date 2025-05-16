import './globals.css';
import Header from './components/header';
import type { Metadata } from 'next';
import { ClickProvider } from './context/ClickContext';

export const metadata: Metadata = {
  title: 'Memory Pokemon',
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
        <ClickProvider>
          <Header />
          <main className="max-w-5xl mx-auto p-4">{children}</main>
        </ClickProvider>
      </body>
    </html>
  );
}