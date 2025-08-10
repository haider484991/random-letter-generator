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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-sm">
          <div>
            <h3 className="font-semibold text-white mb-3">Tools</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-gray-300 transition-colors">Letter Generator</Link>
              <Link href="/pictionary" className="block text-gray-400 hover:text-gray-300 transition-colors">Pictionary Words</Link>
              <Link href="/random-objects" className="block text-gray-400 hover:text-gray-300 transition-colors">Random Objects</Link>
              <Link href="/cursed-text" className="block text-gray-400 hover:text-gray-300 transition-colors">Cursed Text</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Education</h3>
            <div className="space-y-2">
              <Link href="/guides" className="block text-gray-400 hover:text-gray-300 transition-colors">Teaching Guides</Link>
              <Link href="/activities" className="block text-gray-400 hover:text-gray-300 transition-colors">Learning Activities</Link>
              <Link href="/resources" className="block text-gray-400 hover:text-gray-300 transition-colors">Free Resources</Link>
              <Link href="/blog" className="block text-gray-400 hover:text-gray-300 transition-colors">Educational Blog</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Support</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-gray-300 transition-colors">About Us</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-gray-300 transition-colors">Contact</Link>
              <Link href="/faq" className="block text-gray-400 hover:text-gray-300 transition-colors">FAQ</Link>
              <Link href="/help" className="block text-gray-400 hover:text-gray-300 transition-colors">Help Center</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy-policy" className="block text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="block text-gray-400 hover:text-gray-300 transition-colors">Cookie Policy</Link>
              <Link href="/sitemap" className="block text-gray-400 hover:text-gray-300 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-2">Random Letter Generator</h4>
              <p className="text-gray-400 text-sm max-w-md">
                The most advanced random letter generator with elimination mode, custom alphabets, and educator features. 
                Trusted by teachers and students worldwide.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2024 Random Letter Generator. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for educators, students, and word game enthusiasts worldwide.</p>
        </div>
        
        {/* Version info */}
        <div className="mt-4 text-xs text-gray-600">
          <p>Version 1.3.0 - Added comprehensive content and AdSense support</p>
        </div>
      </div>
    </footer>
  );
} 