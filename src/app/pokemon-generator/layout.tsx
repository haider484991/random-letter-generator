import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Random Pokemon Generator | Generate Pokemon Teams',
  description: 'Use our free Random Pokemon Generator to create perfect Pokemon teams. Generate random Pokemon by type, generation, and power level. Build balanced teams for battles!',
  keywords: 'random pokemon generator, pokemon team builder, random pokemon, pokemon generator, pokemon randomizer, pokemon team generator, competitive pokemon teams, random team generator',
  openGraph: {
    title: 'Random Pokemon Generator | Generate Pokemon Teams',
    description: 'Use our free Random Pokemon Generator to create perfect Pokemon teams. Generate random Pokemon by type, generation, and power level. Build balanced teams for battles!',
    url: 'https://randomlettergenerators.com/pokemon-generator',
    siteName: 'Random Letter Generator',
    images: [
      {
        url: 'https://randomlettergenerators.com/images/pokemon-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Random Pokemon Generator - Build Teams Easily',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Pokemon Generator | Generate Pokemon Teams',
    description: 'Use our free Random Pokemon Generator to create perfect Pokemon teams. Generate random Pokemon by type, generation, and power level. Build balanced teams for battles!',
    images: ['https://randomlettergenerators.com/images/pokemon-generator-twitter.jpg'],
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
    canonical: 'https://randomlettergenerators.com/pokemon-generator',
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

export default function PokemonGeneratorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 