// Component module declarations
declare module '@/data/animalDatabase' {
  export interface Animal {
    id: string;
    name: string;
    scientificName: string;
    category: string;
    description: string;
    diet: string;
    lifespan: {
      min: number;
      max: number;
    };
    size: {
      weight: {
        value: number;
        unit: string;
      };
      height: {
        value: number;
        unit: string;
      };
    };
    habitats: string[];
    continents: string[];
    conservationStatus: string;
    funFacts: string[];
    imageUrl?: string;
    imageUrls?: {
      main: string;
      thumbnail: string;
      additional: string[];
    };
    sounds?: string[];
  }

  export const animalDatabase: Animal[];
}

declare module '@/data/animalCategories' {
  export interface AnimalCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
  }

  export interface Habitat {
    id: string;
    name: string;
    description: string;
    icon: string;
  }

  export interface Continent {
    id: string;
    name: string;
    description: string;
  }

  export interface ConservationStatus {
    id: string;
    name: string;
    description: string;
    color: string;
  }

  export interface DietType {
    id: string;
    name: string;
    description: string;
  }

  export const animalCategories: AnimalCategory[];
  export const habitats: Habitat[];
  export const continents: Continent[];
  export const conservationStatuses: ConservationStatus[];
  export const dietTypes: DietType[];
}

declare module '@/hooks/useLocalStorage' {
  export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void];
}

// Component declarations
declare module './AnimalDetails' {
  import { Animal } from '@/data/animalDatabase';
  
  interface AnimalDetailsProps {
    animal: Animal;
    onClose?: () => void;
    showScientificName?: boolean;
  }
  
  const AnimalDetails: React.FC<AnimalDetailsProps>;
  export default AnimalDetails;
}

declare module './AnimalCard' {
  import { Animal } from '@/data/animalDatabase';
  
  interface AnimalCardProps {
    animal: Animal;
    isFavorite?: boolean;
    isComparing?: boolean;
    showScientificName?: boolean;
    onClick?: () => void;
    onFavoriteToggle?: () => void;
    onCompareToggle?: () => void;
  }
  
  const AnimalCard: React.FC<AnimalCardProps>;
  export default AnimalCard;
}

declare module './AnimalQuiz' {
  import { Animal } from '@/data/animalDatabase';
  
  interface AnimalQuizProps {
    allAnimals: Animal[];
    difficulty: string;
    onDifficultyChange: (difficulty: string) => void;
  }
  
  const AnimalQuiz: React.FC<AnimalQuizProps>;
  export default AnimalQuiz;
}

declare module './AnimalFactCard' {
  interface AnimalFactCardProps {
    fact: string | { id: string; text: string; category: string };
    onNext?: () => void;
  }
  
  const AnimalFactCard: React.FC<AnimalFactCardProps>;
  export default AnimalFactCard;
}

declare module './AnimalHabitatMap' {
  interface AnimalHabitatMapProps {
    continents: string[];
    habitats: string[];
  }
  
  const AnimalHabitatMap: React.FC<AnimalHabitatMapProps>;
  export default AnimalHabitatMap;
}

declare module './AnimalSoundPlayer' {
  interface AnimalSoundPlayerProps {
    sounds: string[];
    autoPlay?: boolean;
  }
  
  const AnimalSoundPlayer: React.FC<AnimalSoundPlayerProps>;
  export default AnimalSoundPlayer;
}

declare module './AnimalComparison' {
  import { Animal } from '@/data/animalDatabase';
  
  interface AnimalComparisonProps {
    animals: Animal[];
    onRemove: (id: string) => void;
    showScientificNames?: boolean;
  }
  
  const AnimalComparison: React.FC<AnimalComparisonProps>;
  export default AnimalComparison;
}

declare module './FavoritesManager' {
  import { Animal } from '@/data/animalDatabase';
  
  interface FavoriteAnimal extends Animal {
    dateAdded: string;
    notes?: string;
  }
  
  interface FavoritesManagerProps {
    favorites: FavoriteAnimal[];
    onSelect: (animal: FavoriteAnimal) => void;
    onRemove: (id: string) => void;
    showScientificNames?: boolean;
  }
  
  const FavoritesManager: React.FC<FavoritesManagerProps>;
  export default FavoritesManager;
}

declare module './AnimalFilters' {
  interface FilterProps {
    categories: string[];
    habitats: string[];
    continents: string[];
    conservationStatus: string[];
    dietTypes: string[];
    minWeight?: number;
    maxWeight?: number;
    searchTerm?: string;
    onFilterChange: (filters: FilterProps) => void;
  }
  
  const AnimalFilters: React.FC<FilterProps>;
  export default AnimalFilters;
}
