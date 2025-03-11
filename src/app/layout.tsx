import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import VercelAnalytics from "../components/VercelAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Random Letter Generator | Free Online Tool for Games, Teaching & Learning",
  description: "Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more. Customize with uppercase, lowercase, vowels, or consonants.",
  keywords: "random letter generator, letter picker, alphabet generator, random alphabet, letter wheel, teaching tool, educational games, random letter picker, letter spinner",
  authors: [{ name: "Random Letter Generator" }],
  creator: "Random Letter Generator",
  publisher: "Random Letter Generator",
  openGraph: {
    title: "Random Letter Generator | Free Online Tool for Games, Teaching & Learning",
    description: "Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more.",
    url: "https://randomlettergenerators.com",
    siteName: "Random Letter Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Letter Generator | Free Online Tool",
    description: "Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more.",
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
        {/* Google AdSense Script - Replace with your actual AdSense code when approved */}
        <Script
          id="adsbygoogle-init"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics or Tag Manager can be added here */}
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
