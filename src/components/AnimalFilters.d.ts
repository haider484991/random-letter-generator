import { FC } from 'react';

export interface FilterProps {
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

declare const AnimalFilters: FC<FilterProps>;
export default AnimalFilters;
