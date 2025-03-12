'use client';

import { useState, useEffect } from 'react';
import ObjectGenerator from '@/components/ObjectGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from '@/components/SpinnerCollection';
import ClientOnly from '@/components/ClientOnly';
import FloatingLetters from '@/components/FloatingLetters';
import Script from 'next/script';

export default function RandomObjectsPage() {
  const [loading, setLoading] = useState(true);
  
  // Spinner settings - using constants instead of state since we don't need to change them
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
    "name": "Random Object Generator",
    "url": "https://randomlettergenerators.com/random-objects",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate random objects from different categories including animals, foods, vehicles, sports, and professions. Perfect for games, creative inspiration, decision making, and educational activities.",
    "featureList": [
      "Multiple object categories",
      "Interactive spinning wheel",
      "Save favorites",
      "Track statistics",
      "Confetti celebration effects"
    ],
    "screenshot": "https://yourdomain.com/images/random-object-generator-screenshot.jpg",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "keywords": "random object generator, random objects, object wheel, random generator, random animals, random foods, random vehicles, random sports, random professions"
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
                Loading Object Generator...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating background elements */}
      <ClientOnly>
        <FloatingLetters letters={['🐱', '🍕', '🚗', '⚽', '👨‍⚕️', '🐶', '🍔', '✈️', '🏀', '👩‍🏫', '🐘', '🍦', '🚢', '⚾', '👨‍💻']} />
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
              Random Object Generator
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Generate random objects from different categories. Perfect for games, creative inspiration, decision making, and educational activities.
            </motion.p>
              </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ObjectGenerator />
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
                <h3 className="text-xl font-semibold mb-3 text-[#FF3E9D]">For Fun &amp; Games</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Charades and Pictionary</li>
                  <li>Word association games</li>
                  <li>Creative storytelling prompts</li>
                  <li>Random drawing challenges</li>
                  <li>Improv comedy inspiration</li>
              </ul>
            </div>
            
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#0EEDFF]">For Education</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Vocabulary expansion exercises</li>
                  <li>Creative writing prompts</li>
                  <li>ESL/language learning activities</li>
                  <li>Memory and association games</li>
                  <li>Science and social studies activities</li>
                </ul>
            </div>
            
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-[#EE74FF]">For Productivity</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Brainstorming session starters</li>
                  <li>Decision making when undecided</li>
                  <li>Ice breakers for meetings</li>
                  <li>Creative block breakthroughs</li>
                  <li>Random research inspiration</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
    </div>
    </>
  );
} 