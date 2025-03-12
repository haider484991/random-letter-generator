'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LetterGenerator from '@/components/LetterGenerator';
import Settings from '@/components/Settings';
import AdBanner from '@/components/AdBanner';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from '@/components/SpinnerCollection';
import ClientOnly from '@/components/ClientOnly';
import FloatingLetters from '@/components/FloatingLetters';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { theme } = useTheme();
  const [alphabetType, setAlphabetType] = useState<'uppercase' | 'lowercase' | 'both'>('uppercase');
  const [includeVowels, setIncludeVowels] = useState(true);
  const [loading, setLoading] = useState(true);
  const [adsReady, setAdsReady] = useState(false);
  
  // Spinner settings
  const [spinnerType, setSpinnerType] = useState<SpinnerType>('circles');
  const [spinnerColor, setSpinnerColor] = useState('#FF3E9D');
  const [spinnerSecondaryColor, setSpinnerSecondaryColor] = useState('#0EEDFF');

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

  return (
    <>
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
                Loading Letter Generator...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="pt-8 pb-6 px-4 sm:px-6 text-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Enhanced background with vibrant colors */}
          <AnimatePresence mode="wait">
            {theme === 'vibrant' && (
              <motion.div
                key="vibrant-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-full blur-3xl"></div>
                <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-[#EE74FF]/5 rounded-full blur-2xl"></div>
                <div className="absolute top-60 right-1/4 w-[250px] h-[250px] bg-[#00E061]/5 rounded-full blur-2xl"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Floating letters animation */}
          <ClientOnly>
            <FloatingLetters />
          </ClientOnly>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text leading-tight">
              Random Letter Generator
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, learning activities, decision making, and more.
          </p>
        </motion.div>
      </header>

      <div className="flex-1 py-8 px-4 sm:px-6 max-w-7xl mx-auto relative">
        {/* Left ad banner */}
        {adsReady && (
          <div className="hidden lg:block fixed left-0 top-1/2 transform -translate-y-1/2 z-20">
            <AdBanner adSlot="1122334455" adFormat="vertical" />
          </div>
        )}

        {/* Right ad banner */}
        {adsReady && (
          <div className="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-20">
            <AdBanner adSlot="5566778899" adFormat="vertical" />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Letter Generator Column */}
          <div className="flex-1">
            <div className="relative">
      {adsReady && (
                <div className="mb-8">
                  <AdBanner adSlot="3344556677" adFormat="horizontal" />
        </div>
      )}

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
              <LetterGenerator 
                alphabetType={alphabetType}
                includeVowels={includeVowels}
                  theme={theme} 
                spinnerType={spinnerType}
                spinnerColor={spinnerColor}
                spinnerSecondaryColor={spinnerSecondaryColor}
              />
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#0EEDFF] to-[#EE74FF] text-transparent bg-clip-text">About the Random Letter Generator</h2>
                <div className="text-gray-300 space-y-4">
                  <p>
                    Our Random Letter Generator is a versatile tool that produces random letters from the English alphabet. With its colorful, animated spinning wheel interface, it transforms a simple randomization process into an engaging, visually appealing experience.
                  </p>
                  <p>
                    The tool allows for customization through several settings, enabling users to tailor the letter generation to specific needs:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-[#0EEDFF]">Alphabet Type:</span> Choose between uppercase letters, lowercase letters, or both.</li>
                    <li><span className="text-[#FF3E9D]">Vowel Inclusion:</span> Option to include or exclude vowels (A, E, I, O, U) from the selection.</li>
                    <li><span className="text-[#EE74FF]">Spinner Style:</span> Select from a variety of spinner designs to personalize the visual experience.</li>
                    <li><span className="text-[#00E061]">Color Themes:</span> Switch between a vibrant, colorful interface or a more subdued dark theme.</li>
                  </ul>
                  <p>
                    This Random Letter Generator serves a wide range of purposes across educational, recreational, and creative contexts:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-[#0EEDFF]">Educational Use:</span> Teachers can use it for alphabet learning activities, spelling practice, or phonics exercises.</li>
                    <li><span className="text-[#FF3E9D]">Word Games:</span> Perfect for games like Scrabble, Boggle, or any activity requiring random letter selection.</li>
                    <li><span className="text-[#EE74FF]">Creative Writing:</span> Writers can use it for creative prompts, word association exercises, or overcoming writer&apos;s block.</li>
                    <li><span className="text-[#00E061]">Decision Making:</span> Use it to make random selections or assignments when an arbitrary letter is needed.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Settings Column */}
          <div className="lg:w-80">
            <Settings 
              alphabetType={alphabetType}
              setAlphabetType={setAlphabetType}
              includeVowels={includeVowels}
              setIncludeVowels={setIncludeVowels}
              spinnerType={spinnerType}
              setSpinnerType={setSpinnerType}
              spinnerColor={spinnerColor}
              setSpinnerColor={setSpinnerColor}
              spinnerSecondaryColor={spinnerSecondaryColor}
              setSpinnerSecondaryColor={setSpinnerSecondaryColor}
            />
          </div>
            </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          {/* Middle ad banner */}
          {adsReady && (
            <div className="my-10">
              <AdBanner adSlot="7788990011" adFormat="horizontal" />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-[#0EEDFF]">How to Use the Random Letter Generator</h3>
              <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                <li>Configure your preferences using the settings panel on the right.</li>
                <li>Click the &quot;Spin&quot; button to start the spinning wheel animation.</li>
                <li>Wait for the wheel to stop on a randomly selected letter.</li>
                <li>Use the generated letter for your game, activity, or exercise.</li>
                <li>Click &quot;Spin&quot; again to generate another random letter.</li>
              </ol>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-[#FF3E9D]">Educational Applications</h3>
              <ul className="list-disc pl-5 space-y-3 text-gray-300">
                <li><strong>Alphabet Learning:</strong> Help young learners recognize and identify letters.</li>
                <li><strong>Vocabulary Building:</strong> Challenge students to create words beginning with the generated letter.</li>
                <li><strong>Spelling Practice:</strong> Use as a spelling bee tool for random letter categories.</li>
                <li><strong>Phonics Exercises:</strong> Practice sounds associated with specific letters.</li>
                <li><strong>Language Arts Games:</strong> Integrate into classroom activities and educational games.</li>
          </ul>
            </div>
          </div>

          {/* Bottom ad banner */}
          {adsReady && (
            <div className="my-10">
              <AdBanner adSlot="9988776655" adFormat="horizontal" />
            </div>
          )}

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">Frequently Asked Questions About Random Letter Generation</h3>
          <div className="space-y-4 mb-8">
            <div>
              <h4 className="text-xl font-medium text-white">How does the Random Letter Generator ensure true randomness?</h4>
              <p>Our Random Letter Generator utilizes cryptographically secure pseudorandom number generation (CSPRNG) algorithms to produce statistically random results. This ensures that each letter has an equal probability of being selected, eliminating patterns or biases that might occur with simpler random number generators.</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-white">Is the Random Letter Generator compatible with all devices and browsers?</h4>
              <p>Yes, our Random Letter Generator is built with responsive design principles and modern web technologies, ensuring compatibility with all major browsers (Chrome, Firefox, Safari, Edge) and devices (smartphones, tablets, laptops, and desktop computers). The interface automatically adjusts to provide optimal viewing and interaction regardless of screen size.</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-white">How can I customize the letter selection to exclude certain letters?</h4>
              <p>While our current version allows you to exclude vowels (A, E, I, O, U) through the settings panel, we&apos;re developing an advanced customization feature that will enable users to exclude specific letters or select custom letter sets. This feature will be available in an upcoming update.</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-white">Can I save or share my random letter results?</h4>
              <p>We&apos;re currently implementing a feature that will allow users to save their random letter history and share results via social media or direct links. This functionality will be particularly useful for educational settings and remote learning environments.</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-white">Is there a limit to how many letters I can generate?</h4>
              <p>No, our Random Letter Generator allows unlimited letter generation with no daily caps or usage restrictions. You can spin the wheel as many times as needed for your educational activities, games, or creative projects.</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-white">How can teachers effectively incorporate the Random Letter Generator into classroom activities?</h4>
              <p>Teachers can project the Random Letter Generator on a classroom screen for whole-class activities, use it for small group rotations, or recommend it for individual student practice. The visual spinning wheel creates engagement while the customization options allow for differentiated instruction based on student needs and learning objectives.</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-white">Start Generating Random Letters Today</h3>
            <p className="mb-4">
              Our premium Random Letter Generator offers the perfect combination of functionality, visual appeal, and customization for educational activities, word games, creative exercises, and decision-making processes. The intuitive spinning wheel interface transforms random letter generation into an engaging, interactive experience suitable for users of all ages.
            </p>
            <p className="mb-4">
              Whether you&apos;re a teacher seeking innovative classroom tools, a parent looking for educational activities, or someone who enjoys word games and puzzles, our Random Letter Generator provides a reliable, entertaining solution for all your random letter needs.
            </p>
            <p className="mb-4">
              Begin your random letter generation journey now and discover why thousands of users rely on our tool for their educational, recreational, and creative activities!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pictionary" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Try Our Pictionary Word Generator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/blog/pictionary-word-generator" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Learn More About Pictionary
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        </div>
    </>
  );
}
