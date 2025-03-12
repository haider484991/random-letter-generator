import PokemonGeneratorArticleContent from './PokemonGeneratorArticleContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Random Pokemon Generator | Build Your Perfect Pokemon Team',
  description: 'Use our free Random Pokemon Generator to create balanced teams, discover new Pokemon, and analyze team strengths and weaknesses. Perfect for competitive battles, casual play, and Pokemon enthusiasts of all levels.',
  keywords: 'random pokemon generator, pokemon team builder, pokemon generator, random pokemon, pokemon team, shiny pokemon generator, pokemon type analysis, pokemon team analysis, competitive pokemon, pokemon strategy guide',
};

export default function PokemonGeneratorArticlePage() {
  return <PokemonGeneratorArticleContent />;
} 