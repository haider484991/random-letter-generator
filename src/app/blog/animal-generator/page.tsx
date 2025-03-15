import AnimalArticleContent from './AnimalArticleContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Animal Generator | Interactive Tool to Discover Wildlife',
  description: 'Use our interactive Animal Generator to discover and learn about wildlife from around the world. Explore different species, their habitats, behaviors, and conservation status. Perfect for education and wildlife enthusiasts.',
  keywords: 'animal generator, random animal, wildlife discovery, animal encyclopedia, animal facts, animal sounds, animal habitats, endangered species, conservation, wildlife education, interactive animal tool',
};

export default function AnimalArticlePage() {
  return <AnimalArticleContent />;
}
