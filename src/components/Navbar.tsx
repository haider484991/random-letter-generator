'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'vibrant';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="py-4 px-6 flex justify-between items-center relative z-30">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">RLG</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-[#FF3E9D] transition-colors">
            Letter Generator
          </Link>
          <Link href="/random-objects" className="text-white hover:text-[#0EEDFF] transition-colors">
            Object Generator
          </Link>
          <Link href="/pictionary" className="text-white hover:text-[#0EEDFF] transition-colors">
            Pictionary
          </Link>
          <Link href="/cursed-text" className="text-white hover:text-[#0EEDFF] transition-colors">
            Cursed Text
          </Link>
          <Link href="/pokemon-generator" className="text-white hover:text-[#0EEDFF] transition-colors">
            Pokemon Generator
          </Link>
          <Link href="/about" className="text-white hover:text-[#0EEDFF] transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-[#0EEDFF] transition-colors">
            Contact
          </Link>
          <Link href="/blog" className="text-white hover:text-[#0EEDFF] transition-colors">
            Blog
          </Link>
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'vibrant' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0EEDFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFED37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </motion.button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'vibrant' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0EEDFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFED37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </motion.button>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/90 pt-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-6 p-6">
              <Link 
                href="/" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Letter Generator
              </Link>
              <Link 
                href="/random-objects" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Object Generator
              </Link>
              <Link 
                href="/pictionary" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pictionary
              </Link>
              <Link 
                href="/cursed-text" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cursed Text
              </Link>
              <Link 
                href="/pokemon-generator" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pokemon Generator
              </Link>
              <Link 
                href="/about" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/blog" 
                className="text-xl text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 