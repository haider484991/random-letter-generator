'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'vibrant';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Letter Generator', href: '/#generator', icon: '🎯' },
    { 
      name: 'Teaching Guides', 
      href: '/guides', 
      icon: '📚',
      dropdown: [
        { name: 'All Guides', href: '/guides', icon: '📖' },
        { name: 'Teaching the Alphabet', href: '/guides/teaching-alphabet', icon: '🔤' },
        { name: 'Classroom Integration', href: '/guides/classroom-integration', icon: '🏫' },
        { name: 'Phonics Instruction', href: '/guides/phonics-instruction', icon: '🔊' },
        { name: 'Assessment Tools', href: '/guides/assessment-tools', icon: '📊' },
        { name: 'Parent Resources', href: '/guides/parent-resources', icon: '👨‍👩‍👧‍👦' }
      ]
    },
    { 
      name: 'Activities', 
      href: '/activities', 
      icon: '🎮',
      dropdown: [
        { name: 'All Activities', href: '/activities', icon: '🎯' },
        { name: 'Alphabet Games', href: '/activities/alphabet-games', icon: '🎲' },
        { name: 'Letter Recognition', href: '/activities/letter-recognition', icon: '👁️' },
        { name: 'Writing Practice', href: '/activities/writing-practice', icon: '✍️' },
        { name: 'Phonics Activities', href: '/activities/phonics', icon: '🎵' },
        { name: 'Group Activities', href: '/activities/group', icon: '👥' }
      ]
    },
    { 
      name: 'Resources', 
      href: '/resources', 
      icon: '📁',
      dropdown: [
        { name: 'All Resources', href: '/resources', icon: '📚' },
        { name: 'Worksheets', href: '/resources/worksheets', icon: '📄' },
        { name: 'Lesson Plans', href: '/resources/lesson-plans', icon: '📋' },
        { name: 'Assessment Tools', href: '/resources/assessments', icon: '📊' },
        { name: 'Interactive Materials', href: '/resources/interactive', icon: '🖱️' },
        { name: 'Printables', href: '/resources/printables', icon: '🖨️' }
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: '📝',
      dropdown: [
        { name: 'All Posts', href: '/blog', icon: '📰' },
        { name: 'Teaching Tips', href: '/blog/teaching-tips', icon: '💡' },
        { name: 'Research & Studies', href: '/blog/research', icon: '🔬' },
        { name: 'Classroom Stories', href: '/blog/stories', icon: '📖' },
        { name: 'Educational Technology', href: '/blog/technology', icon: '💻' }
      ]
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: 'ℹ️',
      dropdown: [
        { name: 'Our Mission', href: '/about', icon: '🎯' },
        { name: 'Our Team', href: '/about/team', icon: '👥' },
        { name: 'Educational Philosophy', href: '/about/philosophy', icon: '🧠' },
        { name: 'Success Stories', href: '/about/success-stories', icon: '🏆' }
      ]
    },
    { name: 'Contact', href: '/contact', icon: '📧' }
  ];

  return (
    <>
      <nav className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RL</span>
                </div>
                <span className="text-white font-bold text-lg">Random Letters</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4" ref={dropdownRef}>
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center space-x-1"
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                          <svg 
                            className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-1 w-56 bg-gray-800 rounded-md shadow-lg border border-gray-700 py-1 z-50"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                                >
                                  <span>{dropdownItem.icon}</span>
                                  <span>{dropdownItem.name}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center space-x-1"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
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
          </div>
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 space-y-1"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                                className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                              >
                                <span>{dropdownItem.icon}</span>
                                <span>{dropdownItem.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}