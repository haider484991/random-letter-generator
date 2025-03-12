import { useState, useEffect, useRef } from 'react';
import LetterWheel from './LetterWheel';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { SpinnerType } from './SpinnerCollection';

interface LetterGeneratorProps {
  alphabetType?: 'uppercase' | 'lowercase' | 'both';
  includeVowels?: boolean;
  spinnerType?: SpinnerType;
  spinnerColor?: string;
  spinnerSecondaryColor?: string;
  theme?: string;
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ 
  alphabetType = 'uppercase',
  includeVowels = true,
  spinnerType = 'circles',
  spinnerColor = '#FF3E9D',
  spinnerSecondaryColor = '#0EEDFF',
  // We'll keep the theme prop for type compatibility, but mark it as unused
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  // Initialize with zeros to avoid hydration mismatches
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  // New state for favorites and statistics
  const [favorites, setFavorites] = useState<string[]>([]);
  const [letterStats, setLetterStats] = useState<Record<string, number>>({});
  const [showStats, setShowStats] = useState(false);
  
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.3 });
  const [playFavorite] = useSound('/sounds/ding.mp3', { volume: 0.5 });
  const isMounted = useRef(false);
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  // Set initial window size on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      isMounted.current = true;
      
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem('letterFavorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error('Failed to parse favorites:', e);
        }
      }
      
      // Load stats from localStorage
      const savedStats = localStorage.getItem('letterStats');
      if (savedStats) {
        try {
          setLetterStats(JSON.parse(savedStats));
        } catch (e) {
          console.error('Failed to parse stats:', e);
        }
      }
    }
  }, []);

  // Generate letters based on settings
  useEffect(() => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const alphabetArray: string[] = [];
    
    // Generate uppercase letters
    if (alphabetType === 'uppercase' || alphabetType === 'both') {
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        if (includeVowels || !vowels.includes(letter)) {
          alphabetArray.push(letter);
        }
      }
    }
    
    // Add lowercase letters if needed
    if (alphabetType === 'lowercase' || alphabetType === 'both') {
      for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const upperLetter = letter.toUpperCase();
        if (includeVowels || !vowels.includes(upperLetter)) {
          alphabetArray.push(letter);
        }
      }
    }
    
    // Ensure we have at least one letter (failsafe)
    if (alphabetArray.length === 0) {
      setLetters(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    } else {
      setLetters(alphabetArray);
    }
  }, [alphabetType, includeVowels]);

  // Update window size for confetti
  useEffect(() => {
    if (!isMounted.current) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSpin = () => {
    if (!isSpinning) {
      playClick();
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (letter: string) => {
    if (!isMounted.current) return;
    
    setIsSpinning(false);
    setHistory(prev => [letter, ...prev].slice(0, 10)); // Keep last 10 results
    
    // Update letter statistics
    setLetterStats(prev => {
      const newStats = { ...prev };
      newStats[letter] = (newStats[letter] || 0) + 1;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('letterStats', JSON.stringify(newStats));
      }
      
      return newStats;
    });
    
    // Show confetti effect
    setShowConfetti(true);
    
    // Add to history
    setTimeout(() => {
      if (isMounted.current) {
        setShowConfetti(false);
      }
    }, 3000);
  };

  // Toggle favorites
  const toggleFavorite = (letter: string) => {
    if (!isMounted.current) return;
    
    playFavorite();
    
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(letter)) {
        // Remove from favorites
        newFavorites = prev.filter(l => l !== letter);
      } else {
        // Add to favorites
        newFavorites = [...prev, letter];
      }
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('letterFavorites', JSON.stringify(newFavorites));
      }
      
      return newFavorites;
    });
  };

  // Toggle statistics panel
  const toggleStats = () => {
    setShowStats(prev => !prev);
    playClick();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Define vibrant colors from the CodePen design
  const colors = {
    pink: '#FF3E9D',
    cyan: '#0EEDFF',
    purple: '#EE74FF',
    yellow: '#FFED37',
    green: '#00E061'
  };

  // Get top 5 most frequent letters
  const getTopLetters = () => {
    return Object.entries(letterStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  return (
    <div className="center-content w-full">
      <motion.div 
        className="bg-transparent p-4 sm:p-8 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Feature buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <motion.button
            onClick={toggleStats}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 text-white border border-[#EE74FF]/30 flex items-center gap-2 hover:from-[#FF3E9D]/30 hover:to-[#0EEDFF]/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </motion.button>
        </div>
        
        {/* Statistics panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-gradient-to-r from-[#1a1a2e]/80 to-[#16213e]/80 rounded-xl p-4 border border-[#EE74FF]/20 shadow-lg">
                <h3 className="text-lg font-semibold text-center mb-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">
                  Letter Statistics
                </h3>
                
                {Object.keys(letterStats).length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Top Letters</h4>
                        <div className="space-y-2">
                          {getTopLetters().map(([letter, count]) => (
                            <div key={letter} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold"
                                  style={{
                                    background: `linear-gradient(135deg, ${colors.pink}, ${colors.purple})`,
                                    boxShadow: `0 2px 6px ${colors.pink}40`,
                                  }}
                                >
                                  {letter}
                                </div>
                                <span className="text-gray-300">{count} times</span>
                              </div>
                              <button 
                                onClick={() => toggleFavorite(letter)}
                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={favorites.includes(letter) ? '#FFED37' : 'none'} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Total Spins</h4>
                        <div className="text-2xl font-bold text-white">
                          {Object.values(letterStats).reduce((sum, count) => sum + count, 0)}
                        </div>
                        
                        <h4 className="text-sm font-medium text-gray-300 mt-4 mb-2">Favorites</h4>
                        {favorites.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {favorites.map(letter => (
                              <div 
                                key={letter}
                                className="relative group"
                              >
                                <div 
                                  className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold"
                                  style={{
                                    background: `linear-gradient(135deg, ${colors.yellow}, ${colors.green})`,
                                    boxShadow: `0 2px 6px ${colors.yellow}40`,
                                  }}
                                >
                                  {letter}
                                </div>
                                <button 
                                  onClick={() => toggleFavorite(letter)}
                                  className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            No favorites yet. Click the star icon to add.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center text-xs text-gray-500 mt-2">
                      Statistics are saved in your browser and will persist between sessions.
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    Spin the wheel to start collecting statistics!
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main wheel container with enhanced styling */}
        <div 
          ref={wheelContainerRef} 
          className="wheel-container-wrapper relative w-full max-w-md mx-auto mb-8"
          style={{
            aspectRatio: '1/1', // Ensure square aspect ratio
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3E9D]/5 to-[#0EEDFF]/5 rounded-full blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#EE74FF]/5 to-[#00E061]/5 rounded-full"></div>
          </div>
          
          {/* The wheel component with spin button in the center */}
          <LetterWheel 
            letters={letters}
            spinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            onSpin={handleSpin}
            spinnerType={spinnerType}
            spinnerColor={spinnerColor}
            spinnerSecondaryColor={spinnerSecondaryColor}
          />
        </div>
        
        {/* History section with enhanced styling and favorite functionality */}
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto mt-8 pt-6 border-t border-gray-200/10"
          >
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#0EEDFF]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-200 border-b-2 border-[#FF3E9D] pb-1">
                Recent Letters
              </h3>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
              {history.map((letter, index) => {
                // Use the vibrant colors from the CodePen design
                const colorPairs = [
                  { from: colors.pink, to: colors.purple },
                  { from: colors.cyan, to: colors.green },
                  { from: colors.purple, to: colors.pink },
                  { from: colors.yellow, to: colors.green },
                  { from: colors.green, to: colors.cyan }
                ];
                
                const colorPair = colorPairs[index % colorPairs.length];
                
                return (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold transform transition-all hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${colorPair.from}, ${colorPair.to})`,
                        boxShadow: index === 0 
                          ? `0 4px 12px ${colorPair.from}50` 
                          : '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {letter}
                    </div>
                    
                    {/* Favorite button */}
                    <button
                      onClick={() => toggleFavorite(letter)}
                      className="absolute -top-2 -right-2 bg-gray-800/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={favorites.includes(letter) ? '#FFED37' : 'none'} stroke={favorites.includes(letter) ? '#FFED37' : 'white'}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Confetti effect when a letter is selected */}
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={[colors.pink, colors.cyan, colors.purple, colors.yellow, colors.green]}
        />
      )}
    </div>
  );
};

export default LetterGenerator; 