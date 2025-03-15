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
