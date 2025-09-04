import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdSpinner AI - Spin ad variations & go viral',
  description: 'An AI-powered mini-app for creating and testing multiple ad variations from a single product image, with automated posting to social platforms.',
  keywords: ['AI', 'advertising', 'social media', 'Base', 'miniapp'],
  authors: [{ name: 'AdSpinner AI Team' }],
  openGraph: {
    title: 'AdSpinner AI',
    description: 'Spin ad variations & go viral, amplified by AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
