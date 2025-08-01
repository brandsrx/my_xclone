import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TwitterClone - Connect with the world',
  description: 'A modern social media platform to share thoughts, connect with friends, and discover trending topics.',
  keywords: 'social media, twitter, posts, networking, trending',
  authors: [{ name: 'TwitterClone Team' }],
  openGraph: {
    title: 'TwitterClone - Connect with the world',
    description: 'A modern social media platform to share thoughts, connect with friends, and discover trending topics.',
    url: 'https://twitterclone.app',
    siteName: 'TwitterClone',
    images: [
      {
        url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
        width: 1200,
        height: 630,
        alt: 'TwitterClone - Social Media Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TwitterClone - Connect with the world',
    description: 'A modern social media platform to share thoughts, connect with friends, and discover trending topics.',
    images: ['https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://twitterclone.app" />
        <meta name="theme-color" content="#1DA1F2" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}