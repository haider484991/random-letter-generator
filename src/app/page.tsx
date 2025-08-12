'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LetterGenerator from '@/components/LetterGenerator';

import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from '@/components/SpinnerCollection';
import ClientOnly from '@/components/ClientOnly';
import FloatingLetters from '@/components/FloatingLetters';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { theme } = useTheme();
  const [alphabetType, setAlphabetType] = useState<'uppercase' | 'lowercase' | 'both'>('uppercase');
  const [includeVowels, setIncludeVowels] = useState(true);
  // New feature states
  const [eliminationMode, setEliminationMode] = useState(false);
  const [useCustomLetters, setUseCustomLetters] = useState(false);
  const [customLetters, setCustomLetters] = useState('');
  const [loading, setLoading] = useState(true);
  
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

  // Ads removed: no ad initialization

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

      <header className="pt-10 pb-10 px-4 sm:px-6 text-center relative overflow-hidden">
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
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text leading-tight drop-shadow-[0_2px_12px_rgba(238,116,255,0.25)]">
              Advanced Random Letter Generator - Spinning Wheel Tool
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            The most advanced random letter generator with elimination mode, custom alphabets, educator features, and statistics. Perfect for games, teaching, learning activities, and professional use.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-[#FF3E9D]/20 text-[#FF3E9D] rounded-full border border-[#FF3E9D]/30">
              ✨ Elimination Mode
            </span>
            <span className="px-3 py-1 bg-[#0EEDFF]/20 text-[#0EEDFF] rounded-full border border-[#0EEDFF]/30">
              🎯 Custom Alphabets
            </span>
            <span className="px-3 py-1 bg-[#EE74FF]/20 text-[#EE74FF] rounded-full border border-[#EE74FF]/30">
              👩‍🏫 Educator Mode
            </span>
            <span className="px-3 py-1 bg-[#00E061]/20 text-[#00E061] rounded-full border border-[#00E061]/30">
              📊 Statistics & Export
            </span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="#generator" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold shadow-lg hover:opacity-90 transition">
              Start Spinning
            </Link>
            <Link href="#about" className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition">
              Learn More
            </Link>
          </div>
        </motion.div>
      </header>

      <div className="flex-1 py-8 px-4 sm:px-6 max-w-[1400px] mx-auto relative">
        {/* New Layout: Always Visible Settings */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Settings Sidebar - Always Visible */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="sticky top-8"
            >
              <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">
                      Settings
                    </h2>
                  </div>

                  {/* Quick Presets */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFED37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Quick Presets
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => {
                          setAlphabetType('uppercase');
                          setIncludeVowels(true);
                          setEliminationMode(false);
                          setUseCustomLetters(false);
                        }}
                        className="p-3 rounded-xl bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 border border-[#FF3E9D]/20 hover:border-[#FF3E9D]/40 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] flex items-center justify-center text-white font-bold text-sm">
                            ABC
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Standard</div>
                            <div className="text-gray-400 text-xs">All uppercase letters</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setAlphabetType('uppercase');
                          setIncludeVowels(false);
                          setEliminationMode(false);
                          setUseCustomLetters(false);
                        }}
                        className="p-3 rounded-xl bg-gradient-to-r from-[#EE74FF]/10 to-[#00E061]/10 border border-[#EE74FF]/20 hover:border-[#EE74FF]/40 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#EE74FF] to-[#00E061] flex items-center justify-center text-white font-bold text-sm">
                            BCF
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Consonants</div>
                            <div className="text-gray-400 text-xs">No vowels (A,E,I,O,U)</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setAlphabetType('uppercase');
                          setIncludeVowels(true);
                          setEliminationMode(true);
                          setUseCustomLetters(false);
                        }}
                        className="p-3 rounded-xl bg-gradient-to-r from-[#0EEDFF]/10 to-[#FFED37]/10 border border-[#0EEDFF]/20 hover:border-[#0EEDFF]/40 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0EEDFF] to-[#FFED37] flex items-center justify-center text-white font-bold text-sm">
                            🎯
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Elimination</div>
                            <div className="text-gray-400 text-xs">No repeats until reset</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Alphabet Type */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FF3E9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Alphabet Type
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'uppercase', label: 'ABC', desc: 'Upper' },
                        { value: 'lowercase', label: 'abc', desc: 'Lower' },
                        { value: 'both', label: 'Aa', desc: 'Mixed' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAlphabetType(option.value as 'uppercase' | 'lowercase' | 'both')}
                          className={`
                            p-3 rounded-xl transition-all duration-200 border-2 group
                            ${alphabetType === option.value 
                              ? 'bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border-[#FF3E9D] shadow-lg shadow-[#FF3E9D]/20' 
                              : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-700/30'}
                          `}
                        >
                          <div className="text-center">
                            <div className={`text-lg font-bold mb-1 ${alphabetType === option.value ? 'text-white' : 'text-gray-300'}`}>
                              {option.label}
                            </div>
                            <div className={`text-xs ${alphabetType === option.value ? 'text-gray-200' : 'text-gray-500'}`}>
                              {option.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Include Vowels Toggle */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0EEDFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Include Vowels
                    </h3>
                    <button
                      onClick={() => setIncludeVowels(!includeVowels)}
                      className={`
                        w-full p-4 rounded-xl transition-all duration-200 border-2
                        ${includeVowels 
                          ? 'bg-gradient-to-r from-[#0EEDFF]/20 to-[#00E061]/20 border-[#0EEDFF] shadow-lg shadow-[#0EEDFF]/20' 
                          : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {['A', 'E', 'I', 'O', 'U'].map((vowel) => (
                              <div key={vowel} className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                includeVowels ? 'bg-gradient-to-r from-[#0EEDFF] to-[#00E061] text-white' : 'bg-gray-700 text-gray-400'
                              }`}>
                                {vowel}
                              </div>
                            ))}
                          </div>
                          <span className={`text-sm font-medium ${includeVowels ? 'text-white' : 'text-gray-400'}`}>
                            Vowels
                          </span>
                        </div>
                        <div className={`
                          w-12 h-6 rounded-full p-1 transition-all duration-200
                          ${includeVowels ? 'bg-gradient-to-r from-[#0EEDFF] to-[#00E061]' : 'bg-gray-600'}
                        `}>
                          <div className={`
                            w-4 h-4 rounded-full bg-white transition-all duration-200
                            transform ${includeVowels ? 'translate-x-6' : 'translate-x-0'}
                          `}></div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Elimination Mode */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#EE74FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Elimination Mode
                    </h3>
                    <button
                      onClick={() => setEliminationMode(!eliminationMode)}
                      className={`
                        w-full p-4 rounded-xl transition-all duration-200 border-2
                        ${eliminationMode 
                          ? 'bg-gradient-to-r from-[#EE74FF]/20 to-[#FF3E9D]/20 border-[#EE74FF] shadow-lg shadow-[#EE74FF]/20' 
                          : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-sm font-medium mb-1 ${eliminationMode ? 'text-white' : 'text-gray-400'}`}>
                            No Repeats
                          </div>
                          <div className={`text-xs ${eliminationMode ? 'text-gray-200' : 'text-gray-500'}`}>
                            Remove letters after selection
                          </div>
                        </div>
                        <div className={`
                          w-12 h-6 rounded-full p-1 transition-all duration-200
                          ${eliminationMode ? 'bg-gradient-to-r from-[#EE74FF] to-[#FF3E9D]' : 'bg-gray-600'}
                        `}>
                          <div className={`
                            w-4 h-4 rounded-full bg-white transition-all duration-200
                            transform ${eliminationMode ? 'translate-x-6' : 'translate-x-0'}
                          `}></div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Custom Letters */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#FFED37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Custom Letters
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setUseCustomLetters(!useCustomLetters)}
                        className={`
                          w-full p-3 rounded-xl transition-all duration-200 border-2
                          ${useCustomLetters 
                            ? 'bg-gradient-to-r from-[#FFED37]/20 to-[#00E061]/20 border-[#FFED37] shadow-lg shadow-[#FFED37]/20' 
                            : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${useCustomLetters ? 'text-white' : 'text-gray-400'}`}>
                            Enable Custom Letters
                          </span>
                          <div className={`
                            w-10 h-5 rounded-full p-0.5 transition-all duration-200
                            ${useCustomLetters ? 'bg-gradient-to-r from-[#FFED37] to-[#00E061]' : 'bg-gray-600'}
                          `}>
                            <div className={`
                              w-4 h-4 rounded-full bg-white transition-all duration-200
                              transform ${useCustomLetters ? 'translate-x-5' : 'translate-x-0'}
                            `}></div>
                          </div>
                        </div>
                      </button>
                      {useCustomLetters && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <textarea
                            value={customLetters}
                            onChange={(e) => setCustomLetters(e.target.value)}
                            placeholder="A, B, C, Ñ, 🎯, Hello, World"
                            className="w-full h-20 rounded-xl bg-gray-900/60 border border-gray-700/50 text-gray-200 p-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFED37]/40 focus:border-[#FFED37]/40 transition-all duration-200 text-sm"
                          />
                          <div className="text-xs text-gray-500">
                            Separate with commas or spaces. Supports emojis and words.
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Spinner Customization */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00E061]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Spinner Style
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { value: 'circles', label: 'Circles' },
                        { value: 'dots', label: 'Dots' },
                        { value: 'pulse', label: 'Pulse' },
                        { value: 'wave', label: 'Wave' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSpinnerType(option.value as SpinnerType)}
                          className={`
                            p-3 rounded-xl transition-all duration-200 border
                            ${spinnerType === option.value 
                              ? 'bg-gradient-to-r from-[#00E061]/20 to-[#0EEDFF]/20 border-[#00E061] shadow-lg shadow-[#00E061]/20' 
                              : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'}
                          `}
                        >
                          <div className="text-center">
                            <div className="h-6 flex items-center justify-center mb-2">
                              <SpinnerCollection 
                                type={option.value as SpinnerType} 
                                size={20} 
                                color={spinnerColor}
                                secondaryColor={spinnerSecondaryColor}
                              />
                            </div>
                            <div className={`text-xs ${spinnerType === option.value ? 'text-white' : 'text-gray-400'}`}>
                              {option.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Color Schemes */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Vibrant', primary: '#FF3E9D', secondary: '#0EEDFF' },
                        { name: 'Ocean', primary: '#0EEDFF', secondary: '#00E061' },
                        { name: 'Sunset', primary: '#FF3E9D', secondary: '#FFED37' },
                        { name: 'Neon', primary: '#EE74FF', secondary: '#00E061' }
                      ].map((scheme) => (
                        <button
                          key={scheme.name}
                          onClick={() => {
                            setSpinnerColor(scheme.primary);
                            setSpinnerSecondaryColor(scheme.secondary);
                          }}
                          className={`
                            p-2 rounded-lg transition-all duration-200 border
                            ${spinnerColor === scheme.primary && spinnerSecondaryColor === scheme.secondary
                              ? 'border-white/40 bg-white/10' 
                              : 'border-gray-700/50 hover:border-gray-600/50'}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: scheme.primary }}
                              ></div>
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: scheme.secondary }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300">{scheme.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Live Preview</h4>
                    <div className="flex items-center justify-center h-16 bg-gray-800/50 rounded-lg">
                      <SpinnerCollection 
                        type={spinnerType} 
                        size={40} 
                        color={spinnerColor}
                        secondaryColor={spinnerSecondaryColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Letter Generator Column */}
          <div className="xl:col-span-3 order-1 xl:order-2" id="generator">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <LetterGenerator 
                alphabetType={alphabetType}
                includeVowels={includeVowels}
                eliminationMode={eliminationMode}
                useCustomLetters={useCustomLetters}
                customLetters={customLetters}
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
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#0EEDFF] to-[#EE74FF] text-transparent bg-clip-text">The Most Advanced Random Letter Generator Online</h2>
                <div className="text-gray-300 space-y-4">
                  <p>
                    Our premium Random Letter Generator is the most feature-rich tool available, offering advanced capabilities that surpass all competitors. With its stunning animated spinning wheel interface and professional-grade features, it&apos;s trusted by educators, game enthusiasts, and creative professionals worldwide.
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 p-4 rounded-lg border border-[#EE74FF]/20 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">🚀 Exclusive Advanced Features</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF3E9D]">🎯</span>
                        <span><strong>Elimination Mode:</strong> No-repeat until reset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0EEDFF]">📝</span>
                        <span><strong>Custom Alphabets:</strong> Use any letters/tokens</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#EE74FF]">🔗</span>
                        <span><strong>Shareable Links:</strong> Save & share settings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#00E061]">👩‍🏫</span>
                        <span><strong>Educator Mode:</strong> Classroom-optimized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFED37]">📊</span>
                        <span><strong>Statistics:</strong> Track & export results</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF3E9D]">⚡</span>
                        <span><strong>Performance:</strong> Optimized animations</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">Standard Customization Options</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-[#0EEDFF]">Alphabet Type:</span> Choose between uppercase letters, lowercase letters, or both</li>
                    <li><span className="text-[#FF3E9D]">Vowel Control:</span> Include or exclude vowels (A, E, I, O, U) from selection</li>
                    <li><span className="text-[#EE74FF]">Spinner Styles:</span> Multiple animated spinner designs for visual appeal</li>
                    <li><span className="text-[#00E061]">Color Themes:</span> Vibrant or dark theme options for different preferences</li>
                    <li><span className="text-[#FFED37]">Sound Effects:</span> Engaging audio feedback with volume control</li>
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

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          {/* Ads removed */}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700" id="about">
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

          {/* Ads removed */}

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
