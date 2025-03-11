'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingLettersProps {
  letters?: string[];
}

export default function FloatingLetters({ letters = ['A', 'B', 'Z', 'X', 'M', 'K', 'P', 'R', 'S'] }: FloatingLettersProps) {
  const [letterPositions, setLetterPositions] = useState<Array<{
    left: string;
    top: string;
    initialX: number;
    initialY: number;
    animateX: number;
    animateY: number;
    duration: number;
  }>>([]);
  
  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true);
  // Use a ref to store the stringified letters for comparison
  const prevLettersRef = useRef<string>('');

  // Initialize random positions on the client side
  // Using useCallback to memoize the function that generates positions
  const generatePositions = useCallback(() => {
    return letters.map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      initialX: Math.random() * 100 - 50,
      initialY: Math.random() * 100 - 50,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
      duration: 5 + Math.random() * 5
    }));
  }, []);

  // Initialize positions only once when the component mounts or letters change
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Convert letters array to string for comparison
    const currentLettersString = JSON.stringify(letters);
    
    // Only update positions if this is the first render or if letters have changed
    if (isFirstRender.current || currentLettersString !== prevLettersRef.current) {
      setLetterPositions(generatePositions());
      prevLettersRef.current = currentLettersString;
      isFirstRender.current = false;
    }
  }, [letters, generatePositions]);

  // Don't render anything during SSR
  if (typeof window === 'undefined' || letterPositions.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {letters.map((letter, i) => (
        letterPositions[i] && (
          <motion.div
            key={i}
            className="absolute text-2xl font-bold text-white/5"
            initial={{ 
              x: letterPositions[i].initialX, 
              y: letterPositions[i].initialY,
              opacity: 0.1
            }}
            animate={{ 
              x: letterPositions[i].animateX, 
              y: letterPositions[i].animateY,
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: letterPositions[i].duration,
              repeatType: 'reverse'
            }}
            style={{
              left: letterPositions[i].left,
              top: letterPositions[i].top,
            }}
          >
            {letter}
          </motion.div>
        )
      ))}
    </div>
  );
} 