'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'vibrant';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    pink: string;
    cyan: string;
    purple: string;
    yellow: string;
    green: string;
  };
  getBackground: () => string;
}

const defaultColors = {
  pink: '#FF3E9D',
  cyan: '#0EEDFF',
  purple: '#EE74FF',
  yellow: '#FFED37',
  green: '#00E061'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('vibrant');
  
  // Check for saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'vibrant')) {
      setTheme(savedTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'vibrant' ? 'dark' : 'vibrant';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const getBackground = () => {
    return theme === 'vibrant' 
      ? 'bg-gradient-to-b from-[#0a0a1b] via-[#1a1a2e] to-[#16213e]' 
      : 'bg-gray-900';
  };
  
  const value = {
    theme,
    toggleTheme,
    colors: defaultColors,
    getBackground,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 