'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        { name: 'Assessment Strategies', href: '/guides/assessment-strategies', icon: '📊' },
      ]
    },
    { 
      name: 'Activities', 
      href: '/activities', 
      icon: '🎮',
      dropdown: [
        { name: 'All Activities', href: '/activities', icon: '🎯' },
        { name: 'Circle Time Activities', href: '/activities/circle-time', icon: '🌅' },
        { name: 'Center Activities', href: '/activities/centers', icon: '🎪' },
        { name: 'Assessment Activities', href: '/activities/assessment', icon: '📋' },
        { name: 'Movement & Games', href: '/activities/movement', icon: '🏃‍♀️' },
      ]
    },
    { 
      name: 'Resources', 
      href: '/resources', 
      icon: '📋',
      dropdown: [
        { name: 'All Resources', href: '/resources', icon: '📚' },
        { name: 'Printable Worksheets', href: '/resources/worksheets', icon: '📄' },
        { name: 'Lesson Plans', href: '/resources/lesson-plans', icon: '📝' },
        { name: 'Assessment Tools', href: '/resources/assessments', icon: '📊' },
        { name: 'Interactive Materials', href: '/resources/interactive', icon: '🎲' },
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: '✍️',
      dropdown: [
        { name: 'All Posts', href: '/blog', icon: '📰' },
        { name: 'Educational Research', href: '/blog/category/research', icon: '🔬' },
        { name: 'Teaching Strategies', href: '/blog/category/strategies', icon: '🎯' },
        { name: 'Classroom Management', href: '/blog/category/management', icon: '🏫' },
        { name: 'Technology Integration', href: '/blog/category/technology', icon: '💻' },
      ]
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: 'ℹ️',
      dropdown: [
        { name: 'Our Story', href: '/about', icon: '📖' },
        { name: 'Our Team', href: '/about/team', icon: '👥' },
        { name: 'Privacy Policy', href: '/privacy-policy', icon: '🔒' },
        { name: 'Terms of Service', href: '/terms-of-service', icon: '📋' },
      ]
    },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">RLG</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              Random Letter Generator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
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
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
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
                                  setIsMenuOpen(false);
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
                      onClick={() => setIsMenuOpen(false)}
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
    </nav>
  );
};

export default Navigation;
