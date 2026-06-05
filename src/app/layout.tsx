import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vision Legacy',
  description: 'Sistema completo para gestão de vida, negócios e legado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="antialiased bg-dark text-slate-800">
        {children}
      </body>
    </html>
  );
}
