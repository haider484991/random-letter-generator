import PictionaryGuideContent from './PictionaryGuideContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Pictionary Guide: How to Play & Why It Matters | Random Letter Generators',
  description: 'Learn everything about Pictionary - from basic rules to advanced strategies. Discover the educational, social, and cognitive benefits of this classic drawing game.',
  keywords: 'pictionary guide, how to play pictionary, pictionary rules, pictionary benefits, drawing game guide, party game instructions, educational games',
  openGraph: {
    title: 'Complete Pictionary Guide: How to Play & Why It Matters',
    description: 'Master Pictionary with our comprehensive guide covering rules, strategies, benefits, and variations.',
    type: 'article',
  },
};

export default function PictionaryGuidePage() {
  return <PictionaryGuideContent />;
}