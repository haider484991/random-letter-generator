'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from './ThemeProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme, colors, getBackground } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${getBackground()} text-white transition-colors duration-500`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer colors={colors} />
    </div>
  );
} 