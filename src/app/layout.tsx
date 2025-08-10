import type { Metadata } from "next";
// removed next/font on Windows to avoid target.css resolution error
import "./globals.css";
import Script from "next/script";
import VercelAnalytics from "../components/VercelAnalytics";
import { GoogleAdsenseScript } from "../components/GoogleAdsense";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import ConsentManager from "@/components/ConsentManager";

// Using system fonts for now; Next font import disabled

export const metadata: Metadata = {
  title: "Advanced Random Letter Generator | Elimination Mode, Custom Alphabets & Educator Tools",
  description: "The most advanced random letter generator with unique elimination mode, custom alphabet input, educator features, and statistics export. Perfect for games, teaching, classroom activities, and professional use. Free online spinning wheel tool.",
  keywords: "random letter generator, elimination mode, custom alphabet, educator mode, letter picker, spinning wheel, teaching tool, classroom activities, no repeat letters, statistics export, shareable links, advanced features, professional letter generator",
  authors: [{ name: "Random Letter Generator" }],
  creator: "Random Letter Generator",
  publisher: "Random Letter Generator",
  icons: {
    icon: '/images/random-letter-generators.png',
    apple: '/images/random-letter-generators.png',
  },
  openGraph: {
    title: "Random Letter Generator | Free Online Tool for Games, Teaching & Learning",
    description: "Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more.",
    url: "https://randomlettergenerators.com",
    siteName: "Random Letter Generator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://randomlettergenerators.com/images/random-letter-generators.png",
        width: 1200,
        height: 630,
        alt: "Random Letter Generator - Spinning Wheel Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Letter Generator | Free Online Tool",
    description: "Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more.",
    site: "@randomlettergen",
    images: [
      "https://randomlettergenerators.com/images/random-letter-generators.png"
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://randomlettergenerators.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAdsenseScript />
        
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MPV9MP7MHJ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MPV9MP7MHJ');
          `}
        </Script>
        <meta name="google-site-verification" content="n6sQiJLiZr365FeSQGjaDIsTklbJpYGD_uKcFjjdwD0" />
        <meta name="google-adsense-account" content="ca-pub-6873688003145340" />
      </head>
      <body
        className={`antialiased`}
      >
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
        <VercelAnalytics />
        <ConsentManager />
      </body>
    </html>
  );
}
