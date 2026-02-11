
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'حيّان | استدامة ذكية وممتعة',
  description: 'انضم إلى جيرانك في تحديات بيئية يومية وابنِ مستقبلاً أكثر اخضراراً مع حيّان.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
