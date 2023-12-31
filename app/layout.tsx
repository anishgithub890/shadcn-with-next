import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';

import ClientOnly from '@/components/client-only';
import Navbar from '@/components/navbar/navbar';
import ToasterProvider from '@/components/providers/toaster-provider';
import getCurrentUser from './actions/getCurrentUser';
import './globals.css';
import { ModalProvider } from '@/components/providers/modal-provider';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ANISH | MAHATO',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            storageKey="next-portfolio"
            disableTransitionOnChange
          >
            <ClientOnly>
              <ModalProvider />
              <ToasterProvider />
              <Navbar currentUser={currentUser} />
              {children}
            </ClientOnly>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
