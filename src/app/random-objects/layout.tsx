import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Random Object Generator | Generate Objects from Multiple Categories',
  description: 'Generate random objects from animals, foods, vehicles, sports, and professions. Perfect for games, creative inspiration, decision making, and educational activities.',
  keywords: 'random object generator, random objects, object wheel, random generator, random animals, random foods, random vehicles, random sports, random professions, creativity tool, brainstorming tool, educational tool, game ideas',
  openGraph: {
    title: 'Random Object Generator | Generate Objects from Multiple Categories',
    description: 'Generate random objects from animals, foods, vehicles, sports, and professions. Perfect for games, creative inspiration, decision making, and educational activities.',
    url: 'https://yourdomain.com/random-objects',
    siteName: 'Random Generator',
    images: [
      {
        url: 'https://yourdomain.com/images/random-object-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Random Object Generator Wheel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Object Generator | Generate Objects from Multiple Categories',
    description: 'Generate random objects from animals, foods, vehicles, sports, and professions. Perfect for games, creative inspiration, decision making, and educational activities.',
    images: ['https://yourdomain.com/images/random-object-generator-twitter.jpg'],
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
    canonical: 'https://yourdomain.com/random-objects',
  },
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Random Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RandomObjectsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 