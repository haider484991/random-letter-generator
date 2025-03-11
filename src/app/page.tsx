'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LetterGenerator from '@/components/LetterGenerator';
import Settings from '@/components/Settings';
import AdBanner from '@/components/AdBanner';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from '@/components/SpinnerCollection';

export default function Home() {
  const [alphabetType, setAlphabetType] = useState<'uppercase' | 'lowercase' | 'both'>('uppercase');
  const [includeVowels, setIncludeVowels] = useState(true);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'vibrant'>('vibrant');
  const [adsReady, setAdsReady] = useState(false);
  
  // Spinner settings
  const [spinnerType, setSpinnerType] = useState<SpinnerType>('circles');
  const [spinnerColor, setSpinnerColor] = useState('#FF3E9D');
  const [spinnerSecondaryColor, setSpinnerSecondaryColor] = useState('#0EEDFF');

  // Define vibrant colors from the CodePen design
  const colors = {
    pink: '#FF3E9D',
    cyan: '#0EEDFF',
    purple: '#EE74FF',
    yellow: '#FFED37',
    green: '#00E061'
  };

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

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'vibrant' : 'dark');
  };

  // Get background based on theme
  const getBackground = () => {
    return theme === 'vibrant' 
      ? 'bg-[#1a1a2e]' 
      : 'bg-gray-900';
  };

  return (
    <div className={`flex flex-col min-h-screen ${getBackground()} text-white transition-colors duration-500`}>
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

      {/* Navigation */}
      <nav className="py-4 px-6 flex justify-between items-center relative z-30">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">RLG</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms</Link>
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
      </nav>

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
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {['A', 'B', 'Z', 'X', 'M', 'K', 'P', 'R', 'S'].map((letter, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl font-bold text-white/5"
                initial={{ 
                  x: Math.random() * 100 - 50, 
                  y: Math.random() * 100 - 50,
                  opacity: 0.1
                }}
                animate={{ 
                  x: Math.random() * 100 - 50, 
                  y: Math.random() * 100 - 50,
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5 + Math.random() * 5,
                  repeatType: 'reverse'
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold">
            {/* Gradient text with vibrant colors */}
            <span className="bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Random Letter Generator
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          className="mt-3 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
        >
          Generate random letters with our beautiful spinning wheel. Perfect for games, teaching, and learning activities.
        </motion.p>
        <motion.p
          className="mt-2 text-sm text-gray-400 max-w-md mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Customize with uppercase, lowercase, vowels, or consonants. The pointer at the top will determine which letter is selected when the wheel stops.
        </motion.p>
      </header>

      {/* Top ad banner */}
      {adsReady && (
        <div className="hidden md:block">
          <AdBanner adSlot="1234567890" adFormat="horizontal" />
        </div>
      )}

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        <motion.div 
          className="w-full max-w-4xl relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Centered layout with settings as a floating button */}
          <div className="relative flex flex-col items-center">
            {/* Settings component as a floating button */}
            <div className="absolute top-0 right-0 z-20">
              <Settings 
                alphabetType={alphabetType}
                includeVowels={includeVowels}
                onAlphabetTypeChange={setAlphabetType}
                onIncludeVowelsChange={setIncludeVowels}
                spinnerType={spinnerType}
                spinnerColor={spinnerColor}
                spinnerSecondaryColor={spinnerSecondaryColor}
                onSpinnerTypeChange={setSpinnerType}
                onSpinnerColorChange={setSpinnerColor}
                onSpinnerSecondaryColorChange={setSpinnerSecondaryColor}
              />
            </div>
            
            {/* Main Letter Generator */}
            <div className="w-full flex justify-center">
              <LetterGenerator 
                alphabetType={alphabetType}
                includeVowels={includeVowels}
                spinnerType={spinnerType}
                spinnerColor={spinnerColor}
                spinnerSecondaryColor={spinnerSecondaryColor}
              />
            </div>
          </div>
        </motion.div>

        {/* Middle ad banner - mobile only */}
        {adsReady && (
          <div className="md:hidden my-8">
            <AdBanner adSlot="0987654321" adFormat="rectangle" />
          </div>
        )}

        {/* Comprehensive content for SEO */}
        <div className="mt-16 max-w-4xl mx-auto text-gray-300">
          <h2 className="text-3xl font-bold mb-6 text-white">What is a Random Letter Generator?</h2>
          <p className="mb-4">
            A random letter generator is an interactive digital tool designed to produce random letters from the English alphabet. Our premium Random Letter Generator uses a visually stunning spinning wheel interface to randomly select letters, creating an engaging and immersive experience. This versatile tool serves multiple purposes including educational activities, word games, creative writing exercises, classroom teaching, and decision-making processes.
          </p>
          <p className="mb-4">
            Whether you&apos;re a teacher looking for innovative classroom activities, a parent seeking educational games for children, or someone who enjoys word puzzles and games, our random letter generator provides a reliable and entertaining solution for generating truly random alphabetical characters.
          </p>

          {/* Side ad banner - desktop only */}
          {adsReady && (
            <div className="hidden lg:block lg:float-right lg:ml-6 lg:mb-6">
              <AdBanner adSlot="1122334455" adFormat="vertical" />
            </div>
          )}

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">Advanced Features of Our Random Letter Generator</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Interactive Spinning Wheel Animation:</strong> Our generator features a sophisticated animated wheel that spins to select a random letter, providing visual feedback and enhancing user engagement.</li>
            <li><strong>Comprehensive Customization Options:</strong> Select between uppercase letters (A-Z), lowercase letters (a-z), or both formats combined. You can also include or exclude vowels (A, E, I, O, U) based on your specific requirements.</li>
            <li><strong>Multiple Spinner Animations:</strong> Choose from a variety of spinner types and animations to personalize your random letter generation experience.</li>
            <li><strong>Custom Color Selection:</strong> Customize the spinner&apos;s color scheme to match your preferences, brand colors, or classroom theme.</li>
            <li><strong>Dual Theme Options:</strong> Switch seamlessly between dark and vibrant themes for optimal visual comfort in different lighting conditions.</li>
            <li><strong>Fully Responsive Design:</strong> Our generator is optimized for all devices, including smartphones, tablets, laptops, and desktop computers, ensuring a consistent experience across all platforms.</li>
            <li><strong>No Installation Required:</strong> Access our random letter generator instantly through any modern web browser without downloading or installing additional software.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">How to Use the Random Letter Generator Effectively</h3>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Click the &quot;Spin&quot; button to activate the wheel animation and begin the random letter selection process.</li>
            <li>Observe as the wheel spins and gradually slows down, building anticipation for the result.</li>
            <li>When the wheel stops, the letter aligned with the indicator at the top represents your randomly selected letter.</li>
            <li>Access the settings panel by clicking the gear icon to customize your experience (modify letter case, include/exclude vowels, change spinner appearance).</li>
            <li>For multiple random letters, simply click the &quot;Spin&quot; button again to generate additional results.</li>
            <li>Use the generated letters for your specific activity, game, or educational purpose.</li>
          </ol>

          {/* In-content ad banner */}
          {adsReady && (
            <div className="my-10">
              <AdBanner adSlot="5566778899" adFormat="rectangle" />
            </div>
          )}

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">Educational Applications and Teaching Resources</h3>
          <p className="mb-4">
            Our Random Letter Generator serves as a powerful educational tool for teachers, parents, and students across various learning environments:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Early Literacy Development:</strong> Help young children develop letter recognition skills and phonics awareness by generating random letters and guiding them to identify the letter name, sound, and words that begin with that letter.</li>
            <li><strong>Vocabulary Enhancement:</strong> Challenge students to expand their vocabulary by generating words that start with, contain, or end with the randomly selected letter, promoting language development and word association skills.</li>
            <li><strong>Spelling Improvement:</strong> Create customized spelling exercises by generating random letters and asking students to spell words containing those letters, adjusting difficulty based on grade level and learning objectives.</li>
            <li><strong>Creative Writing Prompts:</strong> Use randomly generated letters as writing prompts for storytelling, poetry, or creative writing exercises, encouraging students to develop narratives around words beginning with the selected letter.</li>
            <li><strong>ESL/EFL Teaching:</strong> Facilitate language acquisition for non-native English speakers through interactive activities focused on pronunciation, vocabulary building, and alphabet familiarity.</li>
            <li><strong>Special Education Support:</strong> Provide engaging letter recognition activities for students with learning differences, allowing for multisensory learning experiences that accommodate diverse learning styles.</li>
            <li><strong>Classroom Management:</strong> Use random letters to organize students into groups, assign classroom responsibilities, or determine presentation order in a fair and unbiased manner.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">Fun Games and Recreational Activities</h3>
          <p className="mb-4">
            Beyond educational applications, our Random Letter Generator enhances various games and recreational activities:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Word Games and Puzzles:</strong> Elevate classic games like Scrabble, Boggle, Words With Friends, or crossword puzzles by using randomly generated letters as starting points or challenges.</li>
            <li><strong>Name Association Games:</strong> Generate a random letter and challenge players to quickly name people, places, animals, foods, or objects beginning with that letter within a time limit.</li>
            <li><strong>Categories Challenge:</strong> Play the popular categories game where participants must list items in multiple categories (countries, celebrities, brands, etc.) starting with the randomly selected letter.</li>
            <li><strong>Alphabet-Based Party Games:</strong> Create engaging party games where players must perform actions, answer trivia questions, or share personal stories related to the randomly generated letter.</li>
            <li><strong>Decision Making Tool:</strong> Assign options to different letters and use the random letter generator to make unbiased decisions for group activities, restaurant choices, or travel destinations.</li>
            <li><strong>Icebreaker Activities:</strong> Facilitate social interactions in group settings by having participants share something about themselves that begins with the randomly generated letter.</li>
            <li><strong>Creative Challenges:</strong> Use random letters to inspire artistic creations, such as drawing objects that start with the selected letter or composing music with notes corresponding to certain letters.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-white">Why Our Random Letter Generator Stands Out</h3>
          <p className="mb-4">
            In a digital landscape filled with random letter generators, our tool distinguishes itself through several key advantages:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Superior Visual Design:</strong> Our spinning wheel animation transforms the random letter generation process from a basic function into an engaging, visually stimulating experience that captures and maintains user interest.</li>
            <li><strong>Extensive Customization:</strong> With comprehensive options to adjust letter case, vowel inclusion, spinner types, and color schemes, our generator offers unparalleled personalization to meet diverse user needs.</li>
            <li><strong>Intuitive User Interface:</strong> The clean, user-friendly design ensures that users of all ages and technical abilities can navigate and utilize the generator without confusion or frustration.</li>
            <li><strong>True Randomness:</strong> Our generator employs cryptographically secure random number generation algorithms to ensure genuine randomness in letter selection, providing statistically sound results for educational and gaming applications.</li>
            <li><strong>No Registration Required:</strong> Access all features instantly without creating accounts, providing personal information, or navigating through paywalls.</li>
            <li><strong>Completely Free Service:</strong> Enjoy unlimited access to our Random Letter Generator with no hidden fees, premium tiers, or subscription requirements.</li>
            <li><strong>Optimized Performance:</strong> Experience smooth, responsive operation across all devices thanks to our efficient code and optimized loading times.</li>
            <li><strong>Regular Updates:</strong> Benefit from continuous improvements and new features as we regularly update our generator based on user feedback and technological advancements.</li>
          </ul>

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
        </div>
      </main>

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
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/about" className="text-gray-400 hover:text-gray-300 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/pictionary" className="text-gray-400 hover:text-gray-300 transition-colors">Pictionary Generator</Link>
            <Link href="/blog/pictionary-word-generator" className="text-gray-400 hover:text-gray-300 transition-colors">Pictionary Guide</Link>
          </div>
          
          <p>Created with Next.js and Framer Motion</p>
          <p className="mt-1">© {new Date().getFullYear()} Random Letter Generator. All rights reserved.</p>
          
          {/* Version info */}
          <div className="mt-4 text-xs text-gray-600">
            <p>Version 1.3.0 - Added comprehensive content and AdSense support</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
