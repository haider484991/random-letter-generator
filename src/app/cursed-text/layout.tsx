import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cursed Text Generator | Create Glitchy & Distorted Text Effects',
  description: 'Transform normal text into creepy, glitchy, and cursed text with our free online tool. Perfect for social media, creative writing, Halloween content, and unique digital art.',
  keywords: 'cursed text generator, glitch text, zalgo text, creepy text, distorted text, text effects, weird text generator, spooky text, horror text, aesthetic text, social media text, unicode text generator',
  openGraph: {
    title: 'Cursed Text Generator | Create Glitchy & Distorted Text Effects',
    description: 'Transform normal text into creepy, glitchy, and cursed text with our free online tool. Perfect for social media, creative writing, Halloween content, and unique digital art.',
    url: 'https://randomlettergenerators.com/cursed-text',
    siteName: 'Random Letter Generator',
    images: [
      {
        url: 'https://randomlettergenerators.com/images/cursed-text-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cursed Text Generator - Create Glitchy Text',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursed Text Generator | Create Glitchy & Distorted Text Effects',
    description: 'Transform normal text into creepy, glitchy, and cursed text with our free online tool. Perfect for social media, creative writing, Halloween content, and unique digital art.',
    images: ['https://randomlettergenerators.com/images/cursed-text-generator-twitter.jpg'],
    site: '@randomlettergen',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://randomlettergenerators.com/cursed-text',
  },
  authors: [{ name: 'Random Letter Generator' }],
  creator: 'Random Letter Generator',
  publisher: 'Random Letter Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function CursedTextLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 