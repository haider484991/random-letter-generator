'use client';

import { useState, useEffect } from 'react';
import CursedTextGenerator from '@/components/CursedTextGenerator';
import AdBanner from '@/components/AdBanner';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';
import { useTheme } from '@/components/ThemeProvider';

export default function CursedTextPage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [adsReady, setAdsReady] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Set ads ready after page load
  useEffect(() => {
    if (!loading) {
      // Wait a bit after the page has loaded to initialize ads
      const timer = setTimeout(() => {
        setAdsReady(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Loading animation
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
              Cursed Text Generator
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 inline-block text-transparent bg-clip-text">
            Cursed Text Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Transform normal text into cursed, glitchy, or stylized text for social media, gaming, or creative projects.
          </p>
            </div>
            
        {/* Top ad banner */}
        {adsReady && (
          <div className="mb-8">
            <AdBanner adSlot="1234567890" adFormat="horizontal" />
          </div>
        )}
        
        {/* Main generator */}
        <ClientOnly>
          <CursedTextGenerator theme={theme} />
        </ClientOnly>
        
        {/* Middle ad banner */}
        {adsReady && (
          <div className="my-12">
            <AdBanner adSlot="9876543210" adFormat="horizontal" />
          </div>
        )}

        {/* Information section */}
        <div className="mt-16 space-y-8">
            <div>
            <h2 className="text-2xl font-bold mb-4 text-white">What is Cursed Text?</h2>
            <p className="text-gray-300">
              Cursed text, also known as glitch text or zalgo text, is a style of text that appears corrupted, distorted, or &quot;cursed&quot; by adding special characters, diacritical marks, and other Unicode symbols above, below, and around standard characters. This creates an eerie, glitchy effect that stands out in digital communication.
              </p>
            </div>
            
            <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Common Uses for Cursed Text</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Social Media Profiles:</strong> Create distinctive usernames and bios that stand out.</li>
              <li><strong>Creative Writing:</strong> Add an eerie atmosphere to horror stories or creepypasta content.</li>
              <li><strong>Gaming:</strong> Craft unique gamer tags and in-game messages.</li>
              <li><strong>Art Projects:</strong> Incorporate into digital art, memes, or graphic design for a glitchy aesthetic.</li>
              <li><strong>Text Styling:</strong> Make your messages stand out in chats, comments, and forums.</li>
              </ul>
            </div>
            
            <div>
            <h2 className="text-2xl font-bold mb-4 text-white">How Our Generator Works</h2>
            <p className="text-gray-300">
              Our Cursed Text Generator uses advanced Unicode manipulation to transform normal text into various cursed styles. Simply type your text, select your preferred style and intensity, then copy the result to use anywhere Unicode text is supported. The generator offers multiple transformation options, from subtle distortion to extreme corruption, giving you complete control over the cursed effect.
            </p>
            </div>
          </div>
          
        {/* Bottom ad banner */}
        {adsReady && (
          <div className="mt-12">
            <AdBanner adSlot="1597538520" adFormat="horizontal" />
          </div>
        )}
        </div>
    </div>
  );
} 