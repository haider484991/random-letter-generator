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
