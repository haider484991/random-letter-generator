import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import SpinnerCollection, { SpinnerType } from './SpinnerCollection';

interface SettingsProps {
  alphabetType: 'uppercase' | 'lowercase' | 'both';
  includeVowels: boolean;
  onAlphabetTypeChange?: (type: 'uppercase' | 'lowercase' | 'both') => void;
  onIncludeVowelsChange?: (include: boolean) => void;
  spinnerType: SpinnerType;
  spinnerColor: string;
  spinnerSecondaryColor: string;
  onSpinnerTypeChange?: (type: SpinnerType) => void;
  onSpinnerColorChange?: (color: string) => void;
  onSpinnerSecondaryColorChange?: (color: string) => void;
  setAlphabetType?: (type: 'uppercase' | 'lowercase' | 'both') => void;
  setIncludeVowels?: (include: boolean) => void;
  setSpinnerType?: (type: SpinnerType) => void;
  setSpinnerColor?: (color: string) => void;
  setSpinnerSecondaryColor?: (color: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  alphabetType,
  includeVowels,
  onAlphabetTypeChange,
  onIncludeVowelsChange,
  spinnerType,
  spinnerColor,
  spinnerSecondaryColor,
  onSpinnerTypeChange,
  onSpinnerColorChange,
  onSpinnerSecondaryColorChange,
  setAlphabetType,
  setIncludeVowels,
  setSpinnerType,
  setSpinnerColor,
  setSpinnerSecondaryColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'letters' | 'spinner'>('letters');
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.3 });
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.2 });
  const isSettingsHoveredRef = useRef(false);
  const isMounted = useRef(false);

  // Sound utility functions
  const playSwitchSound = () => {
    if (isMounted.current) {
      try {
        playClick();
      } catch (e) {
        console.warn('Sound could not be played:', e);
      }
    }
  };

  const hoverSound = () => {
    if (isMounted.current) {
      try {
        playHover();
      } catch (e) {
        console.warn('Sound could not be played:', e);
      }
    }
  };

  useEffect(() => {
    isSettingsHoveredRef.current = isSettingsHovered;
  }, [isSettingsHovered]);

  // Define vibrant colors from the CodePen design
  const colors = {
    pink: '#FF3E9D',
    cyan: '#0EEDFF',
    purple: '#EE74FF',
    yellow: '#FFED37',
    green: '#00E061'
  };

  // Predefined color schemes
  const colorSchemes = [
    { name: 'Vibrant', primary: '#FF3E9D', secondary: '#0EEDFF' },
    { name: 'Ocean', primary: '#0EEDFF', secondary: '#00E061' },
    { name: 'Sunset', primary: '#FF3E9D', secondary: '#FFED37' },
    { name: 'Neon', primary: '#EE74FF', secondary: '#00E061' },
    { name: 'Monochrome', primary: '#FFFFFF', secondary: '#AAAAAA' },
  ];

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggleSettings = () => {
    if (isMounted.current) {
      try {
        playClick();
      } catch (e) {
        console.warn('Sound could not be played:', e);
      }
    }
    setIsOpen(prev => !prev);
  };

  const handleAlphabetChange = (type: 'uppercase' | 'lowercase' | 'both') => {
    if (type !== alphabetType) {
      playSwitchSound();
      if (isSettingsHoveredRef.current) {
        hoverSound();
      }
      onAlphabetTypeChange?.(type);
      if (setAlphabetType) {
        setAlphabetType(type);
      }
    }
  };

  const handleVowelsChange = () => {
    playSwitchSound();
    if (isSettingsHoveredRef.current) {
      hoverSound();
    }
    onIncludeVowelsChange?.(!includeVowels);
    if (setIncludeVowels) {
      setIncludeVowels(!includeVowels);
    }
  };

  const handleSpinnerTypeChange = (type: SpinnerType) => {
    if (type !== spinnerType) {
      playSwitchSound();
      if (isSettingsHoveredRef.current) {
        hoverSound();
      }
      onSpinnerTypeChange?.(type);
      if (setSpinnerType) {
        setSpinnerType(type);
      }
    }
  };

  const handleColorSchemeChange = (primary: string, secondary: string) => {
    if (primary !== spinnerColor || secondary !== spinnerSecondaryColor) {
      playSwitchSound();
      if (isSettingsHoveredRef.current) {
        hoverSound();
      }
      onSpinnerColorChange?.(primary);
      onSpinnerSecondaryColorChange?.(secondary);
      if (setSpinnerColor) {
        setSpinnerColor(primary);
      }
      if (setSpinnerSecondaryColor) {
        setSpinnerSecondaryColor(secondary);
      }
    }
  };

  const getLetterArray = (): string[] => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    
    let result: string[] = [];
    
    if (alphabetType === 'uppercase' || alphabetType === 'both') {
      if (includeVowels) {
        result = [...result, ...vowels];
      }
      result = [...result, ...consonants];
    }
    
    if (alphabetType === 'lowercase' || alphabetType === 'both') {
      if (includeVowels) {
        result = [...result, ...vowels.map(v => v.toLowerCase())];
      }
      result = [...result, ...consonants.map(c => c.toLowerCase())];
    }
    
    return result;
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsSettingsHovered(true)}
      onMouseLeave={() => setIsSettingsHovered(false)}
    >
      <motion.button
        onClick={toggleSettings}
        className="settings-toggle p-3 rounded-full bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 4px 15px rgba(238, 116, 255, 0.3)`,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>
      
      {/* Settings panel with enhanced styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="settings-panel absolute top-16 right-0 w-80 bg-[#1a1a2e] rounded-xl shadow-2xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.3), 
                          0 0 15px -3px ${colors.purple}40,
                          0 0 25px -10px ${colors.cyan}40`,
            }}
          >
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">Settings</h3>
                <button 
                  onClick={toggleSettings}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Tabs for different settings */}
            <div className="flex border-b border-gray-700/50">
              <button
                onClick={() => setActiveTab('letters')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'letters' 
                    ? 'text-[#FF3E9D] border-b-2 border-[#FF3E9D]' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Letters
              </button>
              <button
                onClick={() => setActiveTab('spinner')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'spinner' 
                    ? 'text-[#0EEDFF] border-b-2 border-[#0EEDFF]' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Spinner
              </button>
            </div>
            
            <div className="p-4">
              {/* Letters Settings */}
              {activeTab === 'letters' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Alphabet Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'uppercase', label: 'ABC' },
                        { value: 'lowercase', label: 'abc' },
                        { value: 'both', label: 'Aa' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAlphabetChange(option.value as 'uppercase' | 'lowercase' | 'both')}
                          className={`
                            py-2 px-3 rounded-lg text-center transition-all duration-200
                            ${alphabetType === option.value 
                              ? 'bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-medium shadow-lg' 
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}
                          `}
                          style={{
                            boxShadow: alphabetType === option.value 
                              ? `0 4px 10px -2px ${colors.purple}50` 
                              : 'none',
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Include Vowels</label>
                    <button
                      onClick={handleVowelsChange}
                      className={`
                        w-full py-2 px-4 rounded-lg flex items-center justify-between
                        ${includeVowels 
                          ? 'bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30' 
                          : 'bg-gray-800/50 border border-gray-700/50'}
                        transition-all duration-200
                      `}
                    >
                      <span className="text-gray-300">A, E, I, O, U</span>
                      <div className={`
                        w-10 h-6 rounded-full p-1 transition-all duration-200
                        ${includeVowels ? 'bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF]' : 'bg-gray-700'}
                      `}>
                        <div className={`
                          w-4 h-4 rounded-full bg-white transition-all duration-200
                          transform ${includeVowels ? 'translate-x-4' : 'translate-x-0'}
                        `}></div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                    <div className="bg-gray-800/50 rounded-lg p-3 min-h-[60px] flex flex-wrap gap-1.5 border border-gray-700/50">
                      {getLetterArray().map((letter, index) => (
                        <div 
                          key={index}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-sm font-medium"
                          style={{
                            background: `linear-gradient(135deg, ${colors.pink}40, ${colors.purple}40)`,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Spinner Settings */}
              {activeTab === 'spinner' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Spinner Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'circles', label: 'Circles' },
                        { value: 'dots', label: 'Dots' },
                        { value: 'pulse', label: 'Pulse' },
                        { value: 'wave', label: 'Wave' },
                        { value: 'spiral', label: 'Spiral' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSpinnerTypeChange(option.value as SpinnerType)}
                          className={`
                            py-2 px-3 rounded-lg text-center transition-all duration-200 relative
                            ${spinnerType === option.value 
                              ? 'bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30 text-white font-medium' 
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}
                          `}
                        >
                          <div className="flex flex-col items-center">
                            <div className="h-8 flex items-center justify-center mb-1">
                              <SpinnerCollection 
                                type={option.value as SpinnerType} 
                                size={24} 
                                color={spinnerColor}
                                secondaryColor={spinnerSecondaryColor}
                              />
                            </div>
                            <span className="text-xs">{option.label}</span>
                          </div>
                          {spinnerType === option.value && (
                            <div className="absolute -top-1 -right-1 bg-[#FF3E9D] rounded-full w-3 h-3 border border-white"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Color Scheme</label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorSchemes.map((scheme) => (
                        <button
                          key={scheme.name}
                          onClick={() => handleColorSchemeChange(scheme.primary, scheme.secondary)}
                          className={`
                            py-2 px-3 rounded-lg text-center transition-all duration-200 relative
                            ${spinnerColor === scheme.primary && spinnerSecondaryColor === scheme.secondary
                              ? 'bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 border border-[#EE74FF]/30' 
                              : 'bg-gray-800/50 hover:bg-gray-700/50'}
                          `}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: scheme.primary }}
                            ></div>
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: scheme.secondary }}
                            ></div>
                            <span className="text-xs text-gray-300">{scheme.name}</span>
                          </div>
                          {spinnerColor === scheme.primary && spinnerSecondaryColor === scheme.secondary && (
                            <div className="absolute -top-1 -right-1 bg-[#FF3E9D] rounded-full w-3 h-3 border border-white"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                    <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center border border-gray-700/50">
                      <SpinnerCollection 
                        type={spinnerType} 
                        size={60} 
                        color={spinnerColor}
                        secondaryColor={spinnerSecondaryColor}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-500 italic text-center mt-4">
                Changes are applied automatically
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings; 