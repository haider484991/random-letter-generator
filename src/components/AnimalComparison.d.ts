import { FC } from 'react';
import { Animal } from '../data/animalDatabase';

interface AnimalComparisonProps {
  animals: Animal[];
  onRemove: (id: string) => void;
  showScientificNames?: boolean;
}

declare const AnimalComparison: FC<AnimalComparisonProps>;
export default AnimalComparison;
