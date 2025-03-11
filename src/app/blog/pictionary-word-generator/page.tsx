import PictionaryArticleContent from './PictionaryArticleContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Pictionary Word Generator | Best Online Tool for Pictionary Games',
  description: 'Use our free Pictionary Word Generator to create random words for your Pictionary games. Customizable difficulty levels, categories, and timer. Perfect for family game nights, parties, and classroom activities.',
  keywords: 'pictionary word generator, pictionary words, random word generator, pictionary game, drawing game, party games, family games, word generator, pictionary online, free pictionary',
};

export default function PictionaryArticlePage() {
  return <PictionaryArticleContent />;
} 