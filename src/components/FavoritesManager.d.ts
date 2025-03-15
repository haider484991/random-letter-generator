import { FC } from 'react';
import { Animal } from '../data/animalDatabase';

export interface FavoriteAnimal extends Animal {
  dateAdded: string;
  notes?: string;
}

interface FavoritesManagerProps {
  favorites: FavoriteAnimal[];
  onSelect: (animal: FavoriteAnimal) => void;
  onRemove: (id: string) => void;
  showScientificNames?: boolean;
}

declare const FavoritesManager: FC<FavoritesManagerProps>;
export default FavoritesManager;
