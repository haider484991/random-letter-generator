'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from '@/components/SpinnerCollection';
import ClientOnly from '@/components/ClientOnly';
import FloatingLetters from '@/components/FloatingLetters';
import Script from 'next/script';

export default function AnimalGeneratorPage() {
  const [loading, setLoading] = useState(true);
  
  // Spinner settings
  const spinnerType: SpinnerType = 'circles';
  const spinnerColor = '#FF3E9D';
  const spinnerSecondaryColor = '#0EEDFF';

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Random Animal Generator",
    "url": "https://randomlettergenerators.com/animal-generator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate random animals from different categories, habitats, and regions. Perfect for education, creative inspiration, animal enthusiasts, and learning about wildlife and conservation.",
    "featureList": [
      "Multiple animal categories",
      "Detailed animal information",
      "Interactive animal facts",
      "Sound playback for animal calls",
      "Conservation status information",
      "Interactive habitat maps"
    ],
    "screenshot": "https://randomlettergenerators.com/images/animal-generator-screenshot.jpg",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "keywords": "random animal generator, random animals, wildlife generator, animal facts, animal sounds, animal habitats, endangered species, conservation, mammal generator, bird generator, reptile generator"
  };

  return (
    <>
      {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a2e]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <SpinnerCollection 
                type={spinnerType} 
                size={100} 
                color={spinnerColor}
                secondaryColor={spinnerSecondaryColor}
              />
              <motion.div 
                className="mt-6 text-2xl font-bold bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading Animal Generator...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating background elements - animal emojis */}
      <ClientOnly>
        <FloatingLetters letters={['🦁', '🐘', '🦒', '🐯', '🦓', '🦊', '🐝', '🦅', '🦉', '🐢', '🐙', '🐬', '🦇', '🦘', '🐼']} />
      </ClientOnly>

      <div className="relative z-10">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Random Animal Generator
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Discover and learn about animals from around the world. Explore different species, their habitats, behaviors, and conservation status.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#0EEDFF]">Coming Soon!</h2>
            <p className="text-gray-300">The Animal Generator feature is currently under development. Check back soon for an interactive experience!</p>
          </motion.div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#FF3E9D]">For Education</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Biology and zoology lessons</li>
                  <li>Environmental education</li>
                  <li>Animal classification learning</li>
                  <li>Habitat and ecosystem studies</li>
                  <li>Conservation awareness</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#0EEDFF]">For Creativity</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Character design inspiration</li>
                  <li>Creative writing prompts</li>
                  <li>Art and illustration subjects</li>
                  <li>Fantasy world building</li>
                  <li>Game design elements</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#EE74FF]">For Fun & Learning</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Animal trivia games</li>
                  <li>Virtual wildlife exploration</li>
                  <li>Animal sound identification</li>
                  <li>Conservation status awareness</li>
                  <li>Wildlife photography inspiration</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
