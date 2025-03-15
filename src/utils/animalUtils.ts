/**
 * Utility functions for animal-related components
 */

/**
 * Get color for conservation status display
 * @param status Conservation status string
 * @returns CSS color code
 */
export const getConservationStatusColor = (status: string): string => {
  switch (status) {
    case 'Least Concern':
      return '#4caf50'; // Green
    case 'Near Threatened':
      return '#8bc34a'; // Light Green
    case 'Vulnerable':
      return '#ffc107'; // Amber
    case 'Endangered':
      return '#ff9800'; // Orange
    case 'Critically Endangered':
      return '#f44336'; // Red
    case 'Extinct in the Wild':
      return '#9c27b0'; // Purple
    case 'Extinct':
      return '#616161'; // Gray
    default:
      return '#9e9e9e'; // Default gray
  }
};

/**
 * Format animal weight for display
 * @param value Weight value
 * @param unit Weight unit
 * @returns Formatted weight string
 */
export const formatWeight = (value: number, unit: string): string => {
  if (unit === 'kg') {
    // Convert to tons if over 1000kg
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} tons`;
    }
    return `${value} kg`;
  }
  return `${value} ${unit}`;
};

/**
 * Format animal size for display
 * @param value Size value
 * @param unit Size unit
 * @returns Formatted size string
 */
export const formatSize = (value: number, unit: string): string => {
  if (unit === 'cm') {
    // Convert to meters if over 100cm
    if (value >= 100) {
      return `${(value / 100).toFixed(1)} m`;
    }
    return `${value} cm`;
  }
  return `${value} ${unit}`;
};

/**
 * Get relative size comparison to human
 * @param animalLength Length in cm
 * @returns Description of relative size
 */
export const getRelativeSizeToHuman = (animalLength: number): string => {
  const averageHumanHeight = 170; // cm
  
  if (animalLength < 1) {
    return 'Microscopic';
  } else if (animalLength < 10) {
    return 'Tiny (smaller than a hand)';
  } else if (animalLength < 30) {
    return 'Small (hand-sized)';
  } else if (animalLength < 100) {
    return 'Medium (below knee height)';
  } else if (animalLength < 150) {
    return 'Large (child-sized)';
  } else if (animalLength < 200) {
    return 'Human-sized';
  } else if (animalLength < 400) {
    return 'Large (car-sized)';
  } else if (animalLength < 1000) {
    return 'Very large (bus-sized)';
  } else {
    return 'Enormous (larger than a bus)';
  }
};

/**
 * Get continent emoji map
 * @returns Map of continent names to emoji flags
 */
export const getContinentEmoji = (continent: string): string => {
  const continentEmojiMap: Record<string, string> = {
    'Africa': '🌍',
    'Asia': '🌏',
    'Europe': '🌍',
    'North America': '🌎',
    'South America': '🌎',
    'Australia': '🌏',
    'Antarctica': '🧊',
    'Oceania': '🌏'
  };
  
  return continentEmojiMap[continent] || '🌍';
};

/**
 * Get diet type emoji
 * @param diet Diet type string
 * @returns Emoji representing diet type
 */
export const getDietEmoji = (diet: string): string => {
  switch (diet.toLowerCase()) {
    case 'herbivore':
      return '🌿';
    case 'carnivore':
      return '🥩';
    case 'omnivore':
      return '🍽️';
    case 'insectivore':
      return '🐜';
    case 'frugivore':
      return '🍎';
    case 'nectarivore':
      return '🌺';
    case 'filter feeder':
      return '🌊';
    default:
      return '🍽️';
  }
};

/**
 * Format animal lifespan for display
 * @param lifespan Lifespan in years
 * @returns Formatted lifespan string
 */
export const formatLifespan = (lifespan: string): string => {
  // If lifespan is a range like "10-15 years"
  if (lifespan.includes('-')) {
    const [min, max] = lifespan.split('-');
    return `${min.trim()}-${max.trim()}`;
  }
  
  // If lifespan is just a number
  if (!isNaN(parseFloat(lifespan))) {
    return `${lifespan} years`;
  }
  
  return lifespan;
};

/**
 * Get habitat icon/emoji
 * @param habitat Habitat type string
 * @returns Emoji representing habitat
 */
export const getHabitatEmoji = (habitat: string): string => {
  const habitatMap: Record<string, string> = {
    'Forest': '🌳',
    'Rainforest': '🌴',
    'Desert': '🏜️',
    'Grassland': '🌾',
    'Savanna': '🦁',
    'Tundra': '❄️',
    'Ocean': '🌊',
    'Reef': '🐠',
    'River': '🏞️',
    'Lake': '💦',
    'Wetland': '🐸',
    'Mountain': '⛰️',
    'Cave': '🕳️',
    'Urban': '🏙️',
    'Island': '🏝️',
    'Arctic': '🧊',
    'Jungle': '🌴',
    'Swamp': '🐊',
  };
  
  return habitatMap[habitat] || '🌍';
};

/**
 * Generate a random fact about animals
 * @returns Random animal fact
 */
export const getRandomAnimalFact = (): string => {
  const facts = [
    "The heart of a blue whale is so big that a human could swim through its arteries.",
    "Octopuses have three hearts and their blood is blue.",
    "A group of flamingos is called a flamboyance.",
    "Sloths can hold their breath underwater for up to 40 minutes.",
    "Koalas sleep for up to 22 hours a day.",
    "Elephants are the only mammals that can't jump.",
    "Goats have rectangular pupils that allow them to see 320-340 degrees around them.",
    "Dolphins sleep with one eye open and half their brain awake.",
    "Kangaroos cannot walk backwards.",
    "Cows have best friends and get stressed when separated from them.",
    "A tiger's skin is striped, not just its fur.",
    "Mantis shrimp can see polarized light and have the most complex eyes in the animal kingdom.",
    "Axolotls can regrow almost any part of their body, including parts of their brain.",
    "Jellyfish have existed for over 650 million years, predating dinosaurs by over 400 million years.",
    "The fingerprints of a koala are so similar to humans that they have occasionally been confused at crime scenes.",
  ];
  
  return facts[Math.floor(Math.random() * facts.length)];
};

/**
 * Group animals by taxonomy
 * @param animals Array of animal objects
 * @returns Grouped object by taxonomic class
 */
export const groupAnimalsByTaxonomy = (animals: any[]): Record<string, any[]> => {
  return animals.reduce((groups, animal) => {
    const key = animal.taxonomicClassification.class;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(animal);
    return groups;
  }, {});
};

/**
 * Search animals by query
 * @param animals Array of animal objects
 * @param query Search query
 * @returns Filtered animals matching query
 */
export const searchAnimals = (animals: any[], query: string): any[] => {
  if (!query) return animals;
  
  const searchTerm = query.toLowerCase();
  return animals.filter(animal => 
    animal.name.toLowerCase().includes(searchTerm) ||
    animal.scientificName.toLowerCase().includes(searchTerm) ||
    animal.category.toLowerCase().includes(searchTerm) ||
    animal.habitat.some((h: string) => h.toLowerCase().includes(searchTerm)) ||
    animal.continents.some((c: string) => c.toLowerCase().includes(searchTerm)) ||
    animal.description.toLowerCase().includes(searchTerm) ||
    animal.funFacts.some((f: string) => f.toLowerCase().includes(searchTerm))
  );
};

/**
 * Filter animals by multiple criteria
 * @param animals Array of animal objects
 * @param filters Filter criteria object
 * @returns Filtered animals matching all criteria
 */
export const filterAnimals = (
  animals: any[], 
  filters: {
    categories?: string[],
    habitats?: string[],
    continents?: string[],
    conservationStatus?: string[],
    dietTypes?: string[],
    weightRange?: [number, number],
    lengthRange?: [number, number]
  }
): any[] => {
  return animals.filter(animal => {
    // Check categories
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(animal.category)) return false;
    }
    
    // Check habitats (any match)
    if (filters.habitats && filters.habitats.length > 0) {
      if (!animal.habitat.some((h: string) => filters.habitats!.includes(h))) return false;
    }
    
    // Check continents (any match)
    if (filters.continents && filters.continents.length > 0) {
      if (!animal.continents.some((c: string) => filters.continents!.includes(c))) return false;
    }
    
    // Check conservation status
    if (filters.conservationStatus && filters.conservationStatus.length > 0) {
      if (!filters.conservationStatus.includes(animal.conservationStatus)) return false;
    }
    
    // Check diet types
    if (filters.dietTypes && filters.dietTypes.length > 0) {
      if (!filters.dietTypes.includes(animal.diet)) return false;
    }
    
    // Check weight range
    if (filters.weightRange) {
      const [min, max] = filters.weightRange;
      const weight = animal.size.weight.value;
      if (weight < min || weight > max) return false;
    }
    
    // Check length range
    if (filters.lengthRange) {
      const [min, max] = filters.lengthRange;
      const length = animal.size.length.value;
      if (length < min || length > max) return false;
    }
    
    return true;
  });
};

/**
 * Calculate similarity between two animals based on shared attributes
 * @param animal1 First animal object
 * @param animal2 Second animal object
 * @returns Similarity score (0-1)
 */
export const calculateAnimalSimilarity = (animal1: any, animal2: any): number => {
  let score = 0;
  let totalFactors = 0;
  
  // Category (taxonomy) similarity
  if (animal1.category === animal2.category) {
    score += 2;
  } else if (animal1.taxonomicClassification.phylum === animal2.taxonomicClassification.phylum) {
    score += 1;
  }
  totalFactors += 2;
  
  // Habitat overlap
  const habitatOverlap = animal1.habitat.filter((h: string) => 
    animal2.habitat.includes(h)
  ).length;
  score += (habitatOverlap / Math.max(animal1.habitat.length, animal2.habitat.length)) * 2;
  totalFactors += 2;
  
  // Continental distribution overlap
  const continentOverlap = animal1.continents.filter((c: string) => 
    animal2.continents.includes(c)
  ).length;
  score += (continentOverlap / Math.max(animal1.continents.length, animal2.continents.length)) * 1.5;
  totalFactors += 1.5;
  
  // Diet similarity
  if (animal1.diet === animal2.diet) {
    score += 1.5;
  }
  totalFactors += 1.5;
  
  // Size similarity
  const weightRatio = Math.min(animal1.size.weight.value, animal2.size.weight.value) / 
                      Math.max(animal1.size.weight.value, animal2.size.weight.value);
  score += weightRatio * 1;
  totalFactors += 1;
  
  // Conservation status similarity
  if (animal1.conservationStatus === animal2.conservationStatus) {
    score += 1;
  }
  totalFactors += 1;
  
  // Calculate final similarity score (0-1)
  return score / totalFactors;
};

/**
 * Get recommended similar animals
 * @param currentAnimal The current animal
 * @param allAnimals Array of all available animals
 * @param count Number of similar animals to return
 * @returns Array of similar animals
 */
export const getSimilarAnimals = (currentAnimal: any, allAnimals: any[], count: number = 3): any[] => {
  // Remove the current animal from the comparison
  const otherAnimals = allAnimals.filter(animal => animal.id !== currentAnimal.id);
  
  // Calculate similarity for all other animals
  const withSimilarity = otherAnimals.map(animal => ({
    ...animal,
    similarityScore: calculateAnimalSimilarity(currentAnimal, animal)
  }));
  
  // Sort by similarity and take the top 'count'
  return withSimilarity
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, count);
};
