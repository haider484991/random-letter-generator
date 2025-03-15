import { FC } from 'react';
import { Animal } from '../data/animalDatabase';

interface AnimalCardProps {
  animal: Animal;
  isFavorite?: boolean;
  isComparing?: boolean;
  showScientificName?: boolean;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
  onCompareToggle?: () => void;
}

declare const AnimalCard: FC<AnimalCardProps>;
export default AnimalCard;
