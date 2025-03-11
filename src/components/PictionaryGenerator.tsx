'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

// Define word categories and difficulty levels
const WORD_LISTS = {
  easy: [
    'dog', 'cat', 'house', 'tree', 'car', 'sun', 'moon', 'book', 'chair', 'table',
    'ball', 'apple', 'banana', 'fish', 'bird', 'flower', 'hat', 'shoe', 'clock', 'door',
    'bed', 'cup', 'phone', 'star', 'heart', 'smile', 'cloud', 'rain', 'snow', 'beach',
    'pizza', 'cake', 'ice cream', 'candy', 'cookie', 'milk', 'water', 'juice', 'baby', 'king',
    'queen', 'doctor', 'teacher', 'farmer', 'chef', 'fire', 'river', 'mountain', 'ocean', 'forest'
  ],
  medium: [
    'airplane', 'elephant', 'computer', 'birthday', 'rainbow', 'library', 'camera', 'swimming', 'painting', 'dancing',
    'football', 'baseball', 'basketball', 'soccer', 'tennis', 'bicycle', 'motorcycle', 'helicopter', 'submarine', 'rocket',
    'dinosaur', 'penguin', 'kangaroo', 'giraffe', 'dolphin', 'butterfly', 'spider', 'octopus', 'castle', 'bridge',
    'lighthouse', 'skyscraper', 'waterfall', 'volcano', 'desert', 'island', 'tornado', 'earthquake', 'telescope', 'microscope',
    'keyboard', 'headphones', 'microphone', 'television', 'refrigerator', 'umbrella', 'backpack', 'suitcase', 'compass', 'anchor'
  ],
  hard: [
    'photosynthesis', 'democracy', 'philosophy', 'constellation', 'archaeology', 'imagination', 'perspective', 'anniversary', 'civilization', 'architecture',
    'choreography', 'communication', 'determination', 'encyclopedia', 'extraterrestrial', 'hallucination', 'independence', 'investigation', 'kaleidoscope', 'laboratory',
    'magnificent', 'negotiation', 'opportunity', 'procrastination', 'qualification', 'relationship', 'satisfaction', 'temperature', 'understanding', 'vulnerability',
    'accomplishment', 'biodiversity', 'collaboration', 'disappointment', 'entertainment', 'fascination', 'globalization', 'hospitality', 'illumination', 'jurisdiction',
    'knowledgeable', 'legislation', 'metropolitan', 'notification', 'overwhelming', 'professional', 'qualification', 'revolutionary', 'sophisticated', 'technological'
  ],
  categories: {
    animals: ['dog', 'cat', 'elephant', 'lion', 'tiger', 'giraffe', 'zebra', 'monkey', 'penguin', 'kangaroo', 'dolphin', 'whale', 'shark', 'bear', 'wolf', 'fox', 'rabbit', 'deer', 'squirrel', 'mouse'],
    food: ['pizza', 'hamburger', 'spaghetti', 'ice cream', 'chocolate', 'cake', 'cookie', 'sandwich', 'salad', 'soup', 'steak', 'chicken', 'fish', 'apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pineapple'],
    sports: ['soccer', 'basketball', 'football', 'baseball', 'tennis', 'golf', 'swimming', 'running', 'cycling', 'skiing', 'snowboarding', 'volleyball', 'hockey', 'boxing', 'wrestling', 'gymnastics', 'surfing', 'skateboarding', 'climbing', 'bowling'],
    occupations: ['doctor', 'teacher', 'engineer', 'chef', 'police officer', 'firefighter', 'nurse', 'lawyer', 'scientist', 'artist', 'musician', 'actor', 'writer', 'pilot', 'astronaut', 'farmer', 'carpenter', 'plumber', 'electrician', 'mechanic'],
    places: ['beach', 'mountain', 'forest', 'desert', 'city', 'village', 'park', 'museum', 'library', 'school', 'hospital', 'restaurant', 'hotel', 'airport', 'train station', 'zoo', 'amusement park', 'stadium', 'theater', 'mall']
  }
};

// Define vibrant colors from the main site
const COLORS = {
  pink: '#FF3E9D',
  cyan: '#0EEDFF',
  purple: '#EE74FF',
  yellow: '#FFED37',
  green: '#00E061'
};

export default function PictionaryGenerator() {
  const [word, setWord] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [category, setCategory] = useState<string>('all');
  const [timer, setTimer] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timer);
  const [showWord, setShowWord] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'vibrant'>('vibrant');
  
  // Sound effects
  const [playGenerate] = useSound('/sounds/generate.mp3', { 
    volume: 0.5,
    soundEnabled: true,
    // Handle missing sound files gracefully
    onplayerror: () => {
      console.warn('Sound file not found: /sounds/generate.mp3');
    }
  });
  const [playTimerEnd] = useSound('/sounds/timer-end.mp3', { 
    volume: 0.5,
    soundEnabled: true,
    // Handle missing sound files gracefully
    onplayerror: () => {
      console.warn('Sound file not found: /sounds/timer-end.mp3');
    }
  });
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'vibrant' : 'dark');
  };
  
  // Generate a random word based on difficulty and category
  const generateWord = () => {
    let wordPool: string[] = [];
    
    if (category === 'all') {
      wordPool = WORD_LISTS[difficulty];
    } else if (category in WORD_LISTS.categories) {
      wordPool = WORD_LISTS.categories[category as keyof typeof WORD_LISTS.categories];
    }
    
    if (wordPool.length > 0) {
      setIsGenerating(true);
      
      // Add a small delay for animation effect
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * wordPool.length);
        const newWord = wordPool[randomIndex];
        setWord(newWord);
        setShowWord(true);
        
        // Add to history
        setHistory(prev => [newWord, ...prev.slice(0, 9)]);
        
        try {
          playGenerate();
        } catch (error) {
          console.warn('Error playing sound:', error);
        }
        
        // Reset and start timer if enabled
        if (timer > 0) {
          setTimeLeft(timer);
          setIsTimerRunning(true);
        }
        
        setIsGenerating(false);
      }, 800);
    }
  };
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      
      try {
        playTimerEnd();
      } catch (error) {
        console.warn('Error playing timer end sound:', error);
      }
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, playTimerEnd]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`w-full max-w-4xl mx-auto p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Pictionary Word Generator
        </h1>
        
        <motion.button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Difficulty</label>
            <div className="flex space-x-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-md ${
                    difficulty === level
                      ? `bg-gradient-to-r ${
                          level === 'easy' 
                            ? 'from-green-500 to-green-600' 
                            : level === 'medium' 
                              ? 'from-blue-500 to-indigo-600' 
                              : 'from-red-500 to-pink-600'
                        } text-white`
                      : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-opacity-50 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500' 
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            >
              <option value="all">All Categories</option>
              {Object.keys(WORD_LISTS.categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Timer (seconds)</label>
            <input
              type="range"
              min="0"
              max="180"
              step="10"
              value={timer}
              onChange={(e) => {
                setTimer(parseInt(e.target.value));
                setTimeLeft(parseInt(e.target.value));
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${COLORS.cyan} 0%, ${COLORS.cyan} ${(timer / 180) * 100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} ${(timer / 180) * 100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Off</span>
              <span>{timer} seconds</span>
              <span>3 min</span>
            </div>
          </div>
          
          {timer > 0 && (
            <div className="text-center">
              <div 
                className={`text-3xl font-bold ${
                  timeLeft <= 10 && isTimerRunning 
                    ? 'text-red-500' 
                    : theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              {!isTimerRunning && timeLeft < timer && (
                <motion.button
                  onClick={() => setIsTimerRunning(true)}
                  className={`mt-2 px-3 py-1 text-sm rounded ${
                    theme === 'dark' 
                      ? 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </motion.button>
              )}
              {isTimerRunning && (
                <motion.button
                  onClick={() => setIsTimerRunning(false)}
                  className={`mt-2 px-3 py-1 text-sm rounded ${
                    theme === 'dark' 
                      ? 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pause
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={generateWord}
          disabled={isGenerating}
          className={`px-8 py-4 rounded-lg shadow-lg text-white font-bold text-lg ${
            isGenerating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`,
            boxShadow: `0 4px 14px 0 ${theme === 'dark' ? 'rgba(238, 116, 255, 0.4)' : 'rgba(255, 62, 157, 0.5)'}` 
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 6px 20px 0 ${theme === 'dark' ? 'rgba(238, 116, 255, 0.6)' : 'rgba(255, 62, 157, 0.7)'}` }}
          whileTap={{ scale: 0.95 }}
          animate={isGenerating ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            <>Generate Word</>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence mode="wait">
        {showWord && (
          <motion.div
            key="word-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <motion.button
                onClick={() => setShowWord(!showWord)}
                className={`absolute top-0 right-0 -mt-4 -mr-4 rounded-full p-2 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title={showWord ? "Hide word" : "Show word"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showWord ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </motion.button>
              <div 
                className={`px-10 py-8 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                    : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                }`}
                style={{ 
                  boxShadow: `0 10px 25px -5px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(79, 70, 229, 0.2)'}` 
                }}
              >
                <h2 className={`text-lg font-medium mb-3 ${
                  theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
                }`}>
                  Your Pictionary Word:
                </h2>
                <div className={`text-5xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-indigo-900'
                }`}>
                  {showWord ? word : '••••••••'}
                </div>
                
                {/* Difficulty indicator */}
                <div className="mt-4 flex justify-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    difficulty === 'easy' 
                      ? 'bg-green-100 text-green-800' 
                      : difficulty === 'medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                  
                  {category !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-2">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Word history */}
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <h3 className={`text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Recent Words:
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.map((historyWord, index) => (
              <span 
                key={index} 
                className={`text-xs px-2 py-1 rounded ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {historyWord}
              </span>
            ))}
          </div>
        </motion.div>
      )}
      
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Draw the word and have others guess what it is!</p>
        <p>Click the Generate button to get a new word.</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-50 pointer-events-none">
        {['pink', 'cyan', 'purple', 'yellow', 'green'].map((color, index) => (
          <motion.div 
            key={color}
            className="w-2 h-2 rounded-full absolute"
            style={{ 
              backgroundColor: COLORS[color as keyof typeof COLORS],
              top: `${index * 10}px`,
              right: `${index * 10}px`
            }}
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
    </div>
  );
} 