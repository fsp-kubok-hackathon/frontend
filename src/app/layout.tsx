import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Providers from './providers';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ОтчетЭксперт',
    template: '%s | ОтчетЭксперт',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen')}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header className="flex-2" />
            <div className="flex flex-1">{children}</div>
            <Toaster theme="light" position="bottom-left" duration={1500} />
            <Footer className="flex-2" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
