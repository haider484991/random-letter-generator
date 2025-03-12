'use client';

import { useState, useEffect } from 'react';
import PokemonGenerator from '@/components/PokemonGenerator';
import AdBanner from '@/components/AdBanner';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';
import { useTheme } from '@/components/ThemeProvider';

export default function PokemonGeneratorPage() {
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
            Random Pokemon Generator
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-300"
          >
            Loading your Pokemon adventure...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'bg-gradient-to-r from-red-500 to-yellow-400' : 'bg-gradient-to-r from-red-600 to-yellow-500'} inline-block text-transparent bg-clip-text`}>
            Random Pokemon Generator
          </h1>
          <p className="text-lg mt-2 text-gray-300">
            Generate random Pokemon with our advanced tool. Build your perfect team, explore stats, and discover new favorites!
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
        <PokemonGenerator />
        </ClientOnly>
        
        {/* Middle ad banner */}
        {adsReady && (
          <div className="my-12">
            <AdBanner adSlot="0987654321" adFormat="horizontal" />
            </div>
        )}

        {/* Information section */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">About Our Random Pokemon Generator</h2>
            <p className="text-gray-300">
              Our Random Pokemon Generator is the ultimate tool for Pokemon trainers, gamers, and enthusiasts. This comprehensive generator provides
              detailed information about all Pokemon species, helping you discover new favorites or build your dream team at random.
              Our tool covers Pokemon from every generation, including their stats, abilities, moves, and evolution chains.
              Whether you&apos;re strategizing for competitive battles or just exploring the Pokemon universe, our random generator has everything you need.
            </p>
          </div>
            
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Random Pokemon Generator Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Random Generation:</strong> Discover new Pokemon with our advanced randomizer function.</li>
              <li><strong>Complete Pokedex:</strong> Access data for all Pokemon from every generation.</li>
              <li><strong>Detailed Stats:</strong> View base stats, abilities, types, and weaknesses.</li>
              <li><strong>Team Building:</strong> Create balanced teams with our team analysis tools.</li>
              <li><strong>Type Filtering:</strong> Generate Pokemon by specific types.</li>
              <li><strong>Generation Filtering:</strong> Focus your random selections on specific Pokemon generations.</li>
            </ul>
          </div>
              
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">How to Use the Random Pokemon Generator</h2>
            <p className="text-gray-300">
              Using our Random Pokemon Generator is simple and fun. Set your filters by type, generation, or power level, then click the
              &quot;Generate Random Pokemon&quot; button to discover new species. Each random Pokemon comes with comprehensive data including
              base stats, abilities, type advantages/disadvantages, and evolution information.
              For competitive players, you can add random Pokemon to your team and analyze team balance and type coverage.
              The random generator is perfect for Nuzlocke challenges, team building exercises, or just exploring the vast world of Pokemon.
            </p>
          </div>
        </div>

        {/* Bottom ad banner */}
        {adsReady && (
          <div className="mt-12 mb-8">
            <AdBanner adSlot="5432109876" adFormat="horizontal" />
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Pokemon and all related media are trademarks of Nintendo, Game Freak, and The Pokemon Company.</p>
          <p>This site is not affiliated with Nintendo, Game Freak, or The Pokemon Company.</p>
        </div>
      </div>
    </div>
  );
} 