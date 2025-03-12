'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
  colors: {
    pink: string;
    cyan: string;
    purple: string;
    yellow: string;
    green: string;
  }
}

export default function Footer({ colors }: FooterProps) {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-gray-800 text-center text-gray-500 text-sm relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center space-x-4 mb-4">
          {/* Decorative elements */}
          {['pink', 'cyan', 'purple', 'yellow', 'green'].map((color, index) => (
            <motion.div 
              key={color}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors[color as keyof typeof colors] }}
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm">
          <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">Letter Generator</Link>
          <Link href="/random-objects" className="text-gray-400 hover:text-gray-300 transition-colors">Object Generator</Link>
          <Link href="/pictionary" className="text-gray-400 hover:text-gray-300 transition-colors">Pictionary</Link>
          <Link href="/cursed-text" className="text-gray-400 hover:text-gray-300 transition-colors">Cursed Text</Link>
          <Link href="/pokemon-generator" className="text-gray-400 hover:text-gray-300 transition-colors">Pokemon Generator</Link>
          <Link href="/about" className="text-gray-400 hover:text-gray-300 transition-colors">About</Link>
          <Link href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/blog" className="text-gray-400 hover:text-gray-300 transition-colors">Blog</Link>
        </div>
        
        <p>Created with Next.js and Framer Motion</p>
        <p className="mt-1">© {new Date().getFullYear()} Random Letter Generator. All rights reserved.</p>
        
        {/* Version info */}
        <div className="mt-4 text-xs text-gray-600">
          <p>Version 1.3.0 - Added comprehensive content and AdSense support</p>
        </div>
      </div>
    </footer>
  );
} 