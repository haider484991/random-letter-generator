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
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
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
    
    // Calculate warning thresholds based on total time
    const warningThreshold = Math.max(Math.floor(timer * 0.3), 10); // 30% of time or at least 10 seconds
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
        if (prev <= 10 && prev > 1) {
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
    <div className={`w-full max-w-4xl mx-auto p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Pictionary Word Generator
        </h1>
        
        <div className="flex space-x-2">
          <motion.button
            onClick={() => setShowHintSettings(!showHintSettings)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Hint Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setShowTimerSettings(!showTimerSettings)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Timer Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setShowGameModeSelector(!showGameModeSelector)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Game Modes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setShowCustomWordManager(!showCustomWordManager)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Custom Words"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setShowTeamManager(!showTeamManager)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Team Manager"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
      </div>
      
      {/* Hint Settings */}
      <AnimatePresence>
        {showHintSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hint Settings</h2>
              <button 
                onClick={() => setShowHintSettings(false)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hints can help players when they're struggling to guess a word. You can use up to <span className="font-semibold">{maxHints}</span> hints per word.
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                  <h3 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Available Hint Types:
                  </h3>
                  <ul className={`list-disc pl-5 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>Letter Reveal - Shows a random letter in the word</li>
                    <li>Category Hint - Gives a clue about the word&apos;s category</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Maximum Hints by Difficulty:
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={`p-2 rounded ${
                    difficulty === 'easy' 
                      ? theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <div className="font-medium">Easy</div>
                    <div className="text-sm">3 Hints</div>
                  </div>
                  <div className={`p-2 rounded ${
                    difficulty === 'medium' 
                      ? theme === 'dark' ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <div className="font-medium">Medium</div>
                    <div className="text-sm">2 Hints</div>
                  </div>
                  <div className={`p-2 rounded ${
                    difficulty === 'hard' 
                      ? theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <div className="font-medium">Hard</div>
                    <div className="text-sm">1 Hint</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Timer Settings */}
      <AnimatePresence>
        {showTimerSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Timer Settings</h2>
              <button 
                onClick={() => setShowTimerSettings(false)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Timer Duration Slider */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Timer Duration: {timer} seconds
              </label>
              <input
                type="range"
                min="0"
                max="300"
                step="15"
                value={timer}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  setTimer(newValue);
                  if (!isTimerRunning) {
                    setTimeLeft(newValue);
                  }
                }}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${COLORS.indigo} 0%, ${COLORS.indigo} ${(timer/300)*100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} ${(timer/300)*100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} 100%)`
                }}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Off</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>1m</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>2m</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>3m</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>5m</span>
              </div>
            </div>
            
            {/* Timer Display Style */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Timer Display Style
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimerDisplay('digital')}
                  className={`flex-1 py-2 px-3 rounded-lg border transition-all ${
                    timerDisplay === 'digital'
                      ? theme === 'dark'
                        ? 'bg-indigo-900 border-indigo-700 text-white'
                        : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                      : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <span className="text-xl font-mono">00:00</span>
                  </div>
                  <div className="text-xs text-center mt-1">Digital</div>
                </button>
                
                <button
                  onClick={() => setTimerDisplay('progress')}
                  className={`flex-1 py-2 px-3 rounded-lg border transition-all ${
                    timerDisplay === 'progress'
                      ? theme === 'dark'
                        ? 'bg-indigo-900 border-indigo-700 text-white'
                        : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                      : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: '70%', background: COLORS.cyan }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-center mt-1">Progress Bar</div>
                </button>
              </div>
            </div>
            
            {/* Preset Times */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Preset Times
              </label>
              <div className="flex flex-wrap gap-2">
                {[30, 60, 90, 120, 180].map(presetTime => (
                  <button
                    key={presetTime}
                    onClick={() => {
                      setTimer(presetTime);
                      if (!isTimerRunning) {
                        setTimeLeft(presetTime);
                      }
                    }}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      timer === presetTime
                        ? theme === 'dark'
                          ? 'bg-indigo-700 text-white'
                          : 'bg-indigo-500 text-white'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {presetTime >= 60 ? `${Math.floor(presetTime / 60)}m${presetTime % 60 ? ` ${presetTime % 60}s` : ''}` : `${presetTime}s`}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setTimer(0);
                    setTimeLeft(0);
                    setIsTimerRunning(false);
                  }}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    timer === 0
                      ? theme === 'dark'
                        ? 'bg-indigo-700 text-white'
                        : 'bg-indigo-500 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Game Mode Selector */}
      <AnimatePresence>
        {showGameModeSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Game Modes</h2>
              <button 
                onClick={() => setShowGameModeSelector(false)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              {Object.entries(gameModes).map(([mode, info]) => (
                <div 
                  key={mode}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    gameMode === mode
                      ? theme === 'dark' 
                        ? 'bg-indigo-900 border-2 border-indigo-700'
                        : 'bg-indigo-100 border-2 border-indigo-300'
                      : theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setGameMode(mode as GameMode)}
                >
                  <div className="flex items-center mb-1">
                    <div className={`p-1.5 rounded-full mr-2 ${
                      gameMode === mode
                        ? theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-200'
                        : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      {info.icon}
                    </div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>{info.name}</h3>
                  </div>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{info.description}</p>
                </div>
              ))}
            </div>
            
            {/* Current Mode Info */}
            <div className={`mt-3 p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Currently Playing: {gameModes[gameMode].name}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Round: {roundNumber > 1 ? roundNumber - 1 : 1}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setRoundNumber(1);
                    setHistory([]);
                    setWord('');
                    setShowWord(false);
                    setIsTimerRunning(false);
                    
                    // Reset timer based on game mode
                    switch (gameMode) {
                      case 'timeAttack':
                        setTimer(90);
                        setTimeLeft(90);
                        break;
                      case 'kids':
                        setTimer(120);
                        setTimeLeft(120);
                        break;
                      case 'challenge':
                        setTimer(45);
                        setTimeLeft(45);
                        break;
                      default:
                        setTimer(60);
                        setTimeLeft(60);
                    }
                  }}
                  className={`px-3 py-1 rounded text-sm ${
                    theme === 'dark'
                      ? 'bg-red-800 hover:bg-red-700 text-white'
                      : 'bg-red-100 hover:bg-red-200 text-red-800'
                  }`}
                >
                  Reset Game
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom Word Manager */}
      <AnimatePresence>
        {showCustomWordManager && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Custom Words</h2>
              <button 
                onClick={() => setShowCustomWordManager(false)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Add Custom Word */}
            <div className="flex mb-4">
              <input
                type="text"
                value={newCustomWord}
                onChange={(e) => setNewCustomWord(e.target.value)}
                placeholder="Add your own word"
                className={`flex-1 p-2 rounded-l ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                } border focus:outline-none focus:ring-1 focus:ring-indigo-500`}
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
                className={`px-3 py-2 rounded-r ${
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
            
            {/* Custom Words List */}
            <div className={`border rounded p-2 mb-3 max-h-40 overflow-y-auto ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>
              {customWords.length === 0 ? (
                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No custom words added yet. Add your own words above.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {customWords.map((word, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center px-2 py-1 rounded text-sm ${
                        theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useCustomWordsOnly"
                  checked={useCustomWordsOnly}
                  onChange={() => setUseCustomWordsOnly(!useCustomWordsOnly)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="useCustomWordsOnly" className={`ml-2 block text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Use only custom words
                </label>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const text = customWords.join('\n');
                    navigator.clipboard.writeText(text)
                      .then(() => alert('Custom words copied to clipboard!'))
                      .catch(err => console.error('Failed to copy: ', err));
                  }}
                  className={`text-xs px-2 py-1 rounded ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  disabled={customWords.length === 0}
                >
                  Copy All
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all custom words?')) {
                      setCustomWords([]);
                      setUseCustomWordsOnly(false);
                    }
                  }}
                  className={`text-xs px-2 py-1 rounded ${
                    theme === 'dark'
                      ? 'bg-red-900 hover:bg-red-800 text-red-200'
                      : 'bg-red-100 hover:bg-red-200 text-red-700'
                  }`}
                  disabled={customWords.length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Team Manager */}
      <AnimatePresence>
        {showTeamManager && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Team Manager</h2>
              <button 
                onClick={() => setShowTeamManager(false)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Team List */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {teams.map(team => (
                <div 
                  key={team.id} 
                  className={`flex items-center p-2 rounded-lg ${
                    activeTeam === team.id 
                      ? theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-sm'
                      : ''
                  }`}
                >
                  <button
                    onClick={() => setActiveTeam(team.id)}
                    className={`w-4 h-4 rounded-full mr-3 ${TEAM_COLORS[team.colorIndex].bg} border-2 ${theme === 'dark' ? 'border-gray-700' : 'border-white'}`}
                    title="Set as active team"
                  ></button>
                  
                  <input 
                    type="text" 
                    value={team.name}
                    onChange={(e) => updateTeamName(team.id, e.target.value)}
                    className={`flex-1 bg-transparent border-b ${
                      theme === 'dark' ? 'border-gray-700 focus:border-gray-500' : 'border-gray-300 focus:border-gray-400'
                    } focus:outline-none text-sm px-1 py-0.5`}
                  />
                  
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => decrementScore(team.id)}
                      className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      title="Decrease score"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <span className={`inline-block w-6 text-center ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {team.score}
                    </span>
                    
                    <button
                      onClick={() => incrementScore(team.id)}
                      className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      title="Increase score"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => changeTeamColor(team.id)}
                      className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      title="Change team color"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => removeTeam(team.id)}
                      className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-200 text-red-500'}`}
                      title="Remove team"
                      disabled={teams.length <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2H4a1 1 0 000 2h3.382l-.724-1.447A1 1 0 0111 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Team */}
            <div className="flex mt-3">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="New team name"
                className={`flex-1 p-2 rounded-l ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                } border focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
              <button
                onClick={addTeam}
                disabled={teams.length >= 8 || !newTeamName.trim()}
                className={`px-3 py-2 rounded-r ${
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
            
            {/* Team Controls */}
            <div className="flex justify-end mt-3">
              <button
                onClick={resetScores}
                className={`text-sm px-3 py-1 rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Reset All Scores
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scoreboard */}
      <div className={`mb-6 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Scoreboard</h2>
          <button
            onClick={() => setShowTeamManager(true)}
            className={`text-xs px-2 py-1 rounded ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-white hover:bg-gray-200 text-gray-700'
            }`}
          >
            Manage Teams
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {teams.map(team => (
            <div 
              key={team.id}
              className={`flex items-center px-3 py-1.5 rounded-full ${TEAM_COLORS[team.colorIndex].bg} ${TEAM_COLORS[team.colorIndex].text} ${
                activeTeam === team.id ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''
              }`}
              onClick={() => setActiveTeam(team.id)}
            >
              <span className="font-semibold">{team.name}</span>
              <span className="ml-2 bg-black bg-opacity-20 px-2 py-0.5 rounded-full text-sm font-bold">{team.score}</span>
            </div>
          ))}
        </div>
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
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
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
                const newValue = parseInt(e.target.value);
                setTimer(newValue);
                if (!isTimerRunning) {
                  setTimeLeft(newValue);
                }
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${COLORS.cyan} 0%, ${COLORS.cyan} ${(timer/180)*100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} ${(timer/180)*100}%, ${theme === 'dark' ? '#4B5563' : '#E5E7EB'} 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Off</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>1m</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>2m</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>3m</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>5m</span>
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
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            <>
              Generate Word for {teams.find(team => team.id === activeTeam)?.name || 'Active Team'}
            </>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence mode="wait">
        {showWord && word && (
          <motion.div
            key="word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            <h2 className="text-lg uppercase mb-1">Your word is:</h2>
            <div className="relative">
              <div 
                className={`text-4xl sm:text-5xl font-bold my-4 py-3 px-6 rounded-lg inline-block ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                {word.split('').map((letter, index) => (
                  <span 
                    key={index}
                    className={`relative mx-1 ${
                      revealedLetters[index] 
                        ? 'text-green-500 underline' 
                        : ''
                    }`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              
              {/* Hint Area */}
              {word && (
                <div className="mt-2 flex flex-col items-center">
                  <div className="flex justify-center space-x-2 mb-2">
                    <motion.button
                      onClick={getLetterHint}
                      disabled={hintsUsed >= maxHints}
                      className={`px-3 py-1 rounded-full text-sm ${
                        hintsUsed >= maxHints
                          ? theme === 'dark' ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : theme === 'dark' ? 'bg-indigo-800 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                      whileHover={hintsUsed < maxHints ? { scale: 1.05 } : {}}
                      whileTap={hintsUsed < maxHints ? { scale: 0.95 } : {}}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Reveal a Letter
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={getCategoryHint}
                      disabled={hintsUsed >= maxHints || categoryHint !== ''}
                      className={`px-3 py-1 rounded-full text-sm ${
                        hintsUsed >= maxHints || categoryHint !== ''
                          ? theme === 'dark' ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : theme === 'dark' ? 'bg-indigo-800 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                      }`}
                      whileHover={hintsUsed < maxHints && categoryHint === '' ? { scale: 1.05 } : {}}
                      whileTap={hintsUsed < maxHints && categoryHint === '' ? { scale: 0.95 } : {}}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Category Hint
                      </div>
                    </motion.button>
                  </div>
                  
                  {/* Hint Indicators */}
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: maxHints }).map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-3 h-3 mx-1 rounded-full ${
                          index < hintsUsed
                            ? theme === 'dark' ? 'bg-orange-500' : 'bg-orange-500'
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
                      className={`text-sm px-4 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{categoryHint}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
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
          className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Recent Words:</h3>
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
        {gameMode !== 'classic' && (
          <p className="mt-2">
            <span className="font-medium">Current Game Mode:</span> {gameModes[gameMode].name}
          </p>
        )}
        {maxHints > 0 && (
          <p className="mt-1">
            <span className="font-medium">Hints Available:</span> {maxHints - hintsUsed} of {maxHints}
          </p>
        )}
      </div>
    </div>
  )
}