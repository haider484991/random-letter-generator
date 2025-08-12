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
  green: '#00E061',
  red: '#FF3B30',
  indigo: '#5E5CE6'
};

// Define team colors
const TEAM_COLORS = [
  { bg: 'bg-red-500', text: 'text-white', hover: 'hover:bg-red-600', border: 'border-red-600' },
  { bg: 'bg-blue-500', text: 'text-white', hover: 'hover:bg-blue-600', border: 'border-blue-600' },
  { bg: 'bg-green-500', text: 'text-white', hover: 'hover:bg-green-600', border: 'border-green-600' },
  { bg: 'bg-yellow-500', text: 'text-black', hover: 'hover:bg-yellow-600', border: 'border-yellow-600' },
  { bg: 'bg-purple-500', text: 'text-white', hover: 'hover:bg-purple-600', border: 'border-purple-600' },
  { bg: 'bg-pink-500', text: 'text-white', hover: 'hover:bg-pink-600', border: 'border-pink-600' },
  { bg: 'bg-indigo-500', text: 'text-white', hover: 'hover:bg-indigo-600', border: 'border-indigo-600' },
  { bg: 'bg-orange-500', text: 'text-white', hover: 'hover:bg-orange-600', border: 'border-orange-600' },
];

// Define team interface
interface Team {
  id: string;
  name: string;
  score: number;
  colorIndex: number;
}

// Define game modes
type GameMode = 'classic' | 'timeAttack' | 'chainWords' | 'kids' | 'challenge';

interface GameModeInfo {
  name: string;
  description: string;
  icon: React.ReactNode;
}

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
  
  // Timer display state
  const [timerDisplay, setTimerDisplay] = useState<'digital' | 'progress'>('digital');
  const [showTimerSettings, setShowTimerSettings] = useState<boolean>(false);
  
  // Hint system state
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [maxHints, setMaxHints] = useState<number>(3);
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [categoryHint, setCategoryHint] = useState<string>('');
  const [showHintSettings, setShowHintSettings] = useState<boolean>(false);
  
  // Game mode state
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [showGameModeSelector, setShowGameModeSelector] = useState<boolean>(false);
  const [chainWord, setChainWord] = useState<string>('');
  const [roundNumber, setRoundNumber] = useState<number>(1);
  
  // Team management state
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Team 1', score: 0, colorIndex: 0 },
    { id: '2', name: 'Team 2', score: 0, colorIndex: 1 }
  ]);
  const [showTeamManager, setShowTeamManager] = useState<boolean>(false);
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [activeTeam, setActiveTeam] = useState<string>('1');
  
  // Custom words state
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [newCustomWord, setNewCustomWord] = useState<string>('');
  const [showCustomWordManager, setShowCustomWordManager] = useState<boolean>(false);
  const [useCustomWordsOnly, setUseCustomWordsOnly] = useState<boolean>(false);
  
  // UI state
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  
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
  const [playTick] = useSound('/sounds/tick.mp3', { 
    volume: 0.5,
    soundEnabled: true,
    // Handle missing sound files gracefully
    onplayerror: () => {
      console.warn('Sound file not found: /sounds/tick.mp3');
    }
  });
  
  // Game mode definitions
  const gameModes: Record<GameMode, GameModeInfo> = {
    classic: {
      name: 'Classic Pictionary',
      description: 'The traditional Pictionary game with standard rules.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ),
    },
    timeAttack: {
      name: 'Time Attack',
      description: 'Timer decreases with each round. Faster pace, higher pressure!',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" clipRule="evenodd" />
        </svg>
      ),
    },
    chainWords: {
      name: 'Chain Words',
      description: 'Each new word relates to the previous one.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" clipRule="evenodd" />
        </svg>
      ),
    },
    kids: {
      name: 'Kids Mode',
      description: 'Simple, easy words perfect for younger players.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" clipRule="evenodd" />
        </svg>
      ),
    },
    challenge: {
      name: 'Challenge Mode',
      description: 'Extra hard words with shorter timer for experts.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
    },
  };
  
  // Set initial timer based on game mode
  useEffect(() => {
    switch (gameMode) {
      case 'timeAttack':
        // Start with longer time then decrease
        setTimer(90);
        setTimeLeft(90);
        break;
      case 'kids':
        // Longer time for kids
        setTimer(120);
        setTimeLeft(120);
        break;
      case 'challenge':
        // Shorter time for challenge
        setTimer(45);
        setTimeLeft(45);
        break;
      default:
        // Default timer for other modes
        setTimer(60);
        setTimeLeft(60);
    }
    
    // Reset round number when game mode changes
    setRoundNumber(1);
  }, [gameMode]);
  
  // Apply game mode specific settings
  const applyGameModeSettings = () => {
    // Handle Time Attack mode timer reduction
    if (gameMode === 'timeAttack' && roundNumber > 1) {
      const newTime = Math.max(90 - (roundNumber - 1) * 5, 30);
      setTimer(newTime);
      setTimeLeft(newTime);
    }
    
    // Set difficulty based on game mode
    if (gameMode === 'kids') {
      setDifficulty('easy');
    } else if (gameMode === 'challenge') {
      setDifficulty('hard');
    }
    
    // Adjust max hints based on difficulty
    if (difficulty === 'easy') {
      setMaxHints(3);
    } else if (difficulty === 'medium') {
      setMaxHints(2);
    } else {
      setMaxHints(1);
    }
  };
  
  // Team management functions
  const addTeam = () => {
    if (teams.length >= 8) return; // Limit to 8 teams
    if (!newTeamName.trim()) return;
    
    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamName,
      score: 0,
      colorIndex: teams.length % TEAM_COLORS.length
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
  };
  
  const removeTeam = (id: string) => {
    if (teams.length <= 1) return; // Keep at least one team
    setTeams(teams.filter(team => team.id !== id));
    
    // Update active team if the removed team was active
    if (activeTeam === id) {
      setActiveTeam(teams[0].id);
    }
  };
  
  const updateTeamName = (id: string, name: string) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, name } : team
    ));
  };
  
  const incrementScore = (id: string) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, score: team.score + 1 } : team
    ));
  };
  
  const decrementScore = (id: string) => {
    setTeams(teams.map(team => 
      team.id === id && team.score > 0 ? { ...team, score: team.score - 1 } : team
    ));
  };
  
  const resetScores = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })));
  };
  
  const changeTeamColor = (id: string) => {
    setTeams(teams.map(team => {
      if (team.id === id) {
        const newColorIndex = (team.colorIndex + 1) % TEAM_COLORS.length;
        return { ...team, colorIndex: newColorIndex };
      }
      return team;
    }));
  };
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'vibrant' : 'dark');
  };
  
  // Generate a random word based on difficulty, category, and game mode
  const generateWord = () => {
    let wordPool: string[] = [];
    
    // Apply game mode specific settings
    applyGameModeSettings();
    
    // Use custom words if enabled and available
    if (useCustomWordsOnly && customWords.length > 0) {
      wordPool = customWords;
    } else {
      // For kids mode, always use easy words regardless of difficulty setting
      const difficultyToUse = gameMode === 'kids' ? 'easy' : difficulty;
      
      if (category === 'all') {
        wordPool = WORD_LISTS[difficultyToUse];
      } else if (category in WORD_LISTS.categories) {
        wordPool = WORD_LISTS.categories[category as keyof typeof WORD_LISTS.categories];
      }
      
      // Add custom words to the pool if available
      if (customWords.length > 0 && !useCustomWordsOnly) {
        wordPool = [...wordPool, ...customWords];
      }
      
      // For challenge mode, filter for longer/harder words
      if (gameMode === 'challenge' && category === 'all') {
        wordPool = wordPool.filter(word => word.length >= 6);
      }
    }
    
    if (wordPool.length > 0) {
      setIsGenerating(true);
      
      // Add a small delay for animation effect
      setTimeout(() => {
        let newWord: string;
        
        // Chain Words mode: Try to find a word related to the previous word
        if (gameMode === 'chainWords' && chainWord) {
          // Simple relation - words starting with the same letter
          const firstLetter = chainWord.charAt(0).toLowerCase();
          const relatedWords = wordPool.filter(w => w.charAt(0).toLowerCase() === firstLetter);
          
          if (relatedWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * relatedWords.length);
            newWord = relatedWords[randomIndex];
          } else {
            // Fallback if no related word found
            const randomIndex = Math.floor(Math.random() * wordPool.length);
            newWord = wordPool[randomIndex];
          }
        } else {
          // Standard random word selection
          const randomIndex = Math.floor(Math.random() * wordPool.length);
          newWord = wordPool[randomIndex];
        }
        
        setWord(newWord);
        setChainWord(newWord); // Save for chain mode
        setShowWord(true);
        
        // Reset hints for new word
        setHintsUsed(0);
        setRevealedLetters(new Array(newWord.length).fill(false));
        setCategoryHint('');
        
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
        
        // Increment round number
        setRoundNumber(prev => prev + 1);
        
        setIsGenerating(false);
      }, 800);
    }
  };
  
  // Get a letter hint for the current word
  const getLetterHint = () => {
    if (hintsUsed >= maxHints || !word) return;
    
    // Find indices of letters that haven't been revealed yet
    const unrevealed = revealedLetters
      .map((revealed, index) => revealed ? -1 : index)
      .filter(index => index !== -1);
    
    if (unrevealed.length === 0) return;
    
    // Randomly select one of the unrevealed letters
    const randomIndex = Math.floor(Math.random() * unrevealed.length);
    const letterToReveal = unrevealed[randomIndex];
    
    // Update the revealed letters array
    const newRevealedLetters = [...revealedLetters];
    newRevealedLetters[letterToReveal] = true;
    setRevealedLetters(newRevealedLetters);
    
    // Increment hints used
    setHintsUsed(hintsUsed + 1);
  };
  
  // Get a category hint for the current word
  const getCategoryHint = () => {
    if (hintsUsed >= maxHints || !word || categoryHint) return;
    
    // Determine which category the word belongs to
    let wordCategory = 'general';
    
    for (const [cat, words] of Object.entries(WORD_LISTS.categories)) {
      if (words.includes(word.toLowerCase())) {
        wordCategory = cat;
        break;
      }
    }
    
    // Set appropriate hint based on category
    let hint = '';
    switch (wordCategory) {
      case 'animals':
        hint = 'This is an animal';
        break;
      case 'food':
        hint = 'This is something you can eat or drink';
        break;
      case 'objects':
        hint = 'This is a physical object';
        break;
      case 'actions':
        hint = 'This is an action or activity';
        break;
      case 'nature':
        hint = 'This relates to nature or the outdoors';
        break;
      case 'movies':
        hint = 'This relates to entertainment or pop culture';
        break;
      default:
        hint = 'This is a common word';
    }
    
    setCategoryHint(hint);
    setHintsUsed(hintsUsed + 1);
  };
  
  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || timer <= 0) return;
    
    // Calculate warning threshold based on total time
    const criticalThreshold = Math.max(Math.floor(timer * 0.15), 5); // 15% of time or at least 5 seconds
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          
          // Play timer end sound
          try {
            playTimerEnd();
          } catch (error) {
            console.warn('Error playing sound:', error);
          }
          
          return 0;
        }
        
        // Play tick sound when timer is low
        if (prev <= criticalThreshold && prev > 1) {
          try {
            playTick();
          } catch (error) {
            console.warn('Error playing sound:', error);
          }
        }
        
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, playTick, playTimerEnd]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Pictionary Word Generator
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          Generate words for your drawing game • Perfect for parties, classrooms, and family fun
        </p>
        <div className="flex justify-center">
          <a
            href="/pictionary/guide"
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-indigo-800 hover:bg-indigo-700 text-indigo-200'
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Complete Pictionary Guide
          </a>
        </div>
      </div>

      {/* Quick Game Mode Presets */}
      <div className="mb-8">
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.button
            onClick={() => {
              setGameMode('kids');
              setDifficulty('easy');
              setTimer(120);
              setTimeLeft(120);
              setCategory('animals');
            }}
            className={`p-4 rounded-xl border-2 transition-all ${
              gameMode === 'kids'
                ? theme === 'dark'
                  ? 'bg-green-900 border-green-600 text-green-100'
                  : 'bg-green-50 border-green-300 text-green-800'
                : theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-green-600 text-gray-300'
                  : 'bg-white border-gray-200 hover:border-green-300 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-semibold">Kids Mode</div>
            <div className="text-xs opacity-75">Easy words • 2 minutes • Animals</div>
          </motion.button>

          <motion.button
            onClick={() => {
              setGameMode('classic');
              setDifficulty('medium');
              setTimer(60);
              setTimeLeft(60);
              setCategory('all');
            }}
            className={`p-4 rounded-xl border-2 transition-all ${
              gameMode === 'classic'
                ? theme === 'dark'
                  ? 'bg-blue-900 border-blue-600 text-blue-100'
                  : 'bg-blue-50 border-blue-300 text-blue-800'
                : theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-600 text-gray-300'
                  : 'bg-white border-gray-200 hover:border-blue-300 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold">Quick Game</div>
            <div className="text-xs opacity-75">Medium words • 1 minute • All categories</div>
          </motion.button>

          <motion.button
            onClick={() => {
              setGameMode('challenge');
              setDifficulty('hard');
              setTimer(45);
              setTimeLeft(45);
              setCategory('all');
            }}
            className={`p-4 rounded-xl border-2 transition-all ${
              gameMode === 'challenge'
                ? theme === 'dark'
                  ? 'bg-red-900 border-red-600 text-red-100'
                  : 'bg-red-50 border-red-300 text-red-800'
                : theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-red-600 text-gray-300'
                  : 'bg-white border-gray-200 hover:border-red-300 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">🔥</div>
            <div className="font-semibold">Challenge</div>
            <div className="text-xs opacity-75">Hard words • 45 seconds • Expert level</div>
          </motion.button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Game Controls */}
        <div className={`lg:col-span-1 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Game Settings</h3>
          
          <div className="space-y-4">
            {/* Difficulty */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      difficulty === level
                        ? level === 'easy'
                          ? 'bg-green-500 text-white'
                          : level === 'medium'
                            ? 'bg-blue-500 text-white'
                            : 'bg-red-500 text-white'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-700'
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

            {/* Timer */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Timer: {timer === 0 ? 'Off' : `${timer}s`}
              </label>
              <input
                type="range"
                min="0"
                max="180"
                step="15"
                value={timer}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  setTimer(newValue);
                  if (!isTimerRunning) {
                    setTimeLeft(newValue);
                  }
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs mt-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Off</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>3m</span>
              </div>
            </div>

            {/* Timer Display */}
            {timer > 0 && (
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  timeLeft <= 10 && isTimerRunning
                    ? 'text-red-500'
                    : theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="flex gap-2">
                  {!isTimerRunning && timeLeft < timer && (
                    <button
                      onClick={() => setIsTimerRunning(true)}
                      className={`flex-1 py-1 px-3 text-sm rounded ${
                        theme === 'dark'
                          ? 'bg-green-800 text-green-200 hover:bg-green-700'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      Resume
                    </button>
                  )}
                  {isTimerRunning && (
                    <button
                      onClick={() => setIsTimerRunning(false)}
                      className={`flex-1 py-1 px-3 text-sm rounded ${
                        theme === 'dark'
                          ? 'bg-yellow-800 text-yellow-200 hover:bg-yellow-700'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      Pause
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings Toggle */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span className="text-sm font-medium">Advanced Settings</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  showAdvancedSettings ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Word Display Area */}
        <div className={`lg:col-span-2 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {/* Team Scoreboard */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Teams</h3>
              <button
                onClick={() => setShowTeamManager(true)}
                className={`text-xs px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Manage
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map(team => (
                <button
                  key={team.id}
                  onClick={() => setActiveTeam(team.id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                    TEAM_COLORS[team.colorIndex].bg
                  } ${
                    TEAM_COLORS[team.colorIndex].text
                  } ${
                    activeTeam === team.id ? 'ring-2 ring-offset-2 ring-indigo-500' : 'hover:scale-105'
                  }`}
                >
                  <span className="font-semibold">{team.name}</span>
                  <span className="ml-2 bg-black bg-opacity-20 px-2 py-0.5 rounded-full text-sm font-bold">{team.score}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-6">
            <motion.button
              onClick={generateWord}
              disabled={isGenerating}
              className={`px-8 py-4 rounded-xl shadow-lg text-white font-bold text-lg transition-all ${
                isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`,
                boxShadow: `0 4px 14px 0 ${theme === 'dark' ? 'rgba(238, 116, 255, 0.4)' : 'rgba(255, 62, 157, 0.5)'}` 
              }}
              whileHover={{ scale: isGenerating ? 1 : 1.05 }}
              whileTap={{ scale: isGenerating ? 1 : 0.95 }}
              animate={isGenerating ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                <>
                  🎲 Generate Word for {teams.find(team => team.id === activeTeam)?.name || 'Active Team'}
                </>
              )}
            </motion.button>
          </div>

          {/* Word Display */}
          <AnimatePresence mode="wait">
            {showWord && word && (
              <motion.div
                key="word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-6"
              >
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-2 border-dashed ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <h2 className={`text-sm uppercase mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your word is:</h2>
                  <div className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {word.split('').map((letter, index) => (
                      <span 
                        key={index}
                        className={`mx-1 ${
                          revealedLetters[index] 
                            ? 'text-green-500 underline decoration-2' 
                            : ''
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hints */}
                  <div className="flex justify-center gap-3 mb-4">
                    <motion.button
                      onClick={getLetterHint}
                      disabled={hintsUsed >= maxHints}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        hintsUsed >= maxHints
                          ? theme === 'dark' ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                      whileHover={hintsUsed < maxHints ? { scale: 1.05 } : {}}
                      whileTap={hintsUsed < maxHints ? { scale: 0.95 } : {}}
                    >
                      💡 Reveal Letter
                    </motion.button>
                    
                    <motion.button
                      onClick={getCategoryHint}
                      disabled={hintsUsed >= maxHints || categoryHint !== ''}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        hintsUsed >= maxHints || categoryHint !== ''
                          ? theme === 'dark' ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                      whileHover={hintsUsed < maxHints && categoryHint === '' ? { scale: 1.05 } : {}}
                      whileTap={hintsUsed < maxHints && categoryHint === '' ? { scale: 0.95 } : {}}
                    >
                      🏷️ Category Hint
                    </motion.button>
                  </div>
                  
                  {/* Hint Indicators */}
                  <div className="flex justify-center mb-3">
                    {Array.from({ length: maxHints }).map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-3 h-3 mx-1 rounded-full ${
                          index < hintsUsed
                            ? 'bg-orange-500'
                            : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Category Hint Display */}
                  {categoryHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm px-4 py-2 rounded-lg inline-block ${
                        theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      💡 {categoryHint}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Info */}
          <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="mb-1">🎨 Draw the word and have others guess what it is!</p>
            {gameMode !== 'classic' && (
              <p className="font-medium">
                Playing: {gameModes[gameMode].name} • Round {roundNumber > 1 ? roundNumber - 1 : 1}
              </p>
            )}
            {maxHints > 0 && word && (
              <p>
                Hints: {maxHints - hintsUsed} of {maxHints} remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Word History */}
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mb-8 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Recent Words:</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((historyWord, index) => (
              <span 
                key={index} 
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {historyWord}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Advanced Settings Panel */}
      <AnimatePresence>
        {showAdvancedSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-6 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Advanced Settings</h2>
              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                  title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button 
                  onClick={() => setShowAdvancedSettings(false)}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Game Modes */}
              <div>
                <h3 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Game Modes</h3>
                <div className="space-y-2">
                  {Object.entries(gameModes).map(([mode, info]) => (
                    <button
                      key={mode}
                      onClick={() => setGameMode(mode as GameMode)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        gameMode === mode
                          ? theme === 'dark' 
                            ? 'bg-indigo-900 border-2 border-indigo-700'
                            : 'bg-indigo-100 border-2 border-indigo-300'
                          : theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <div className="mr-2">{info.icon}</div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{info.name}</h4>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{info.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Words */}
              <div>
                <h3 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Custom Words</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <input
                      type="text"
                      value={newCustomWord}
                      onChange={(e) => setNewCustomWord(e.target.value)}
                      placeholder="Add custom word"
                      className={`flex-1 px-3 py-2 text-sm rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newCustomWord.trim()) {
                          setCustomWords([...customWords, newCustomWord.trim()]);
                          setNewCustomWord('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newCustomWord.trim()) {
                          setCustomWords([...customWords, newCustomWord.trim()]);
                          setNewCustomWord('');
                        }
                      }}
                      className={`px-3 py-2 text-sm rounded-r-lg ${
                        !newCustomWord.trim()
                          ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                          : theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                      disabled={!newCustomWord.trim()}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="useCustomWordsOnly"
                      checked={useCustomWordsOnly}
                      onChange={() => setUseCustomWordsOnly(!useCustomWordsOnly)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="useCustomWordsOnly" className={`ml-2 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Use only custom words
                    </label>
                  </div>
                  
                  {customWords.length > 0 && (
                    <div className={`max-h-32 overflow-y-auto p-2 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex flex-wrap gap-1">
                        {customWords.map((word, index) => (
                          <span 
                            key={index} 
                            className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                              theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                          >
                            {word}
                            <button
                              onClick={() => {
                                const newWords = [...customWords];
                                newWords.splice(index, 1);
                                setCustomWords(newWords);
                              }}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Management */}
              <div>
                <h3 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Team Management</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="New team name"
                      className={`flex-1 px-3 py-2 text-sm rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                      }`}
                    />
                    <button
                      onClick={addTeam}
                      disabled={teams.length >= 8 || !newTeamName.trim()}
                      className={`px-3 py-2 text-sm rounded-r-lg ${
                        teams.length >= 8 || !newTeamName.trim()
                          ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                          : theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {teams.map(team => (
                      <div 
                        key={team.id} 
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          activeTeam === team.id 
                            ? theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                            : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center flex-1">
                          <button
                            onClick={() => setActiveTeam(team.id)}
                            className={`w-4 h-4 rounded-full mr-2 ${TEAM_COLORS[team.colorIndex].bg} border-2 ${theme === 'dark' ? 'border-gray-600' : 'border-white'}`}
                            title="Set as active team"
                          ></button>
                          <input 
                            type="text" 
                            value={team.name}
                            onChange={(e) => updateTeamName(team.id, e.target.value)}
                            className={`flex-1 bg-transparent text-sm focus:outline-none ${
                              theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}
                          />
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => decrementScore(team.id)}
                            className={`p-1 rounded text-xs ${
                              theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                            }`}
                          >
                            −
                          </button>
                          <span className={`w-6 text-center text-sm ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}>
                            {team.score}
                          </span>
                          <button
                            onClick={() => incrementScore(team.id)}
                            className={`p-1 rounded text-xs ${
                              theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                            }`}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeTeam(team.id)}
                            className={`p-1 rounded text-xs text-red-500 hover:text-red-700 ${
                              theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                            }`}
                            disabled={teams.length <= 1}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={resetScores}
                    className={`w-full text-sm py-2 px-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Reset All Scores
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        



      

      

      

      

      

    </div>
  )
}