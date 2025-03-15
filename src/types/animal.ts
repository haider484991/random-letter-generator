export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  habitat: string[];
  diet: string;
  lifespan: string;
  size: {
    weight: {
      value: number;
      unit: string;
    };
    length: {
      value: number;
      unit: string;
    };
  };
  conservationStatus: string;
  taxonomicClassification: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  continents: string[];
  distribution: string[];
  adaptations: string[];
  behaviors?: string[];
  predators: string[];
  prey?: string[];
  socialStructure?: string;
  behavioralTraits: string[];
  funFacts?: string[];
  didYouKnow?: string[];
  soundUrl?: string;
  imageUrls: {
    main: string;
    additional: string[];
    [key: string]: string | string[];
  };
  endangeredStatus?: {
    threats: string[];
    conservationEfforts: string[];
  };
}
