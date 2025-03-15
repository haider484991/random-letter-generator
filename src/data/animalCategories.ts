export interface AnimalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
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
  icon: string;
}

export const animalCategories: AnimalCategory[] = [
  {
    id: 'mammals',
    name: 'Mammals',
    description: 'Warm-blooded vertebrates characterized by hair/fur, milk-producing females, and typically giving birth to live young.',
    icon: '🐘',
    count: 120
  },
  {
    id: 'birds',
    name: 'Birds',
    description: 'Warm-blooded vertebrates characterized by feathers, toothless beaked jaws, laying hard-shelled eggs, and lightweight but strong skeletons.',
    icon: '🦜',
    count: 95
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    description: 'Cold-blooded vertebrates with scales or scutes, typically laying soft-shelled eggs on land.',
    icon: '🦎',
    count: 65
  },
  {
    id: 'amphibians',
    name: 'Amphibians',
    description: 'Cold-blooded vertebrates that typically start life in water with gills and later develop lungs and limbs for life on land.',
    icon: '🐸',
    count: 40
  },
  {
    id: 'fish',
    name: 'Fish',
    description: 'Aquatic vertebrates with gills, typically having scales and fins for movement.',
    icon: '🐠',
    count: 85
  },
  {
    id: 'invertebrates',
    name: 'Invertebrates',
    description: 'Animals without a backbone or spinal column, including insects, arachnids, mollusks, crustaceans, and more.',
    icon: '🦑',
    count: 110
  },
  {
    id: 'insects',
    name: 'Insects',
    description: 'Invertebrates with a three-part body (head, thorax, and abdomen), three pairs of jointed legs, compound eyes, and antennae.',
    icon: '🐝',
    count: 75
  },
  {
    id: 'marine',
    name: 'Marine Animals',
    description: 'Animals that live primarily or exclusively in marine environments, including mammals, fish, and invertebrates.',
    icon: '🐳',
    count: 90
  }
];

export const habitats: Habitat[] = [
  {
    id: 'forest',
    name: 'Forest',
    description: 'Dense tree-covered land with a variety of plant and animal life.',
    icon: '🌳'
  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    description: 'Forests characterized by high rainfall and biodiversity.',
    icon: '🌴'
  },
  {
    id: 'desert',
    name: 'Desert',
    description: 'Arid regions with little precipitation and extreme temperatures.',
    icon: '🏜️'
  },
  {
    id: 'grassland',
    name: 'Grassland',
    description: 'Areas dominated by grasses with few trees.',
    icon: '🌾'
  },
  {
    id: 'savanna',
    name: 'Savanna',
    description: 'Grassland ecosystem with scattered trees and a distinct wet and dry season.',
    icon: '🦁'
  },
  {
    id: 'tundra',
    name: 'Tundra',
    description: 'Cold, treeless region where the subsoil is permanently frozen.',
    icon: '❄️'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'The vast body of saltwater that covers approximately 71% of Earth\'s surface.',
    icon: '🌊'
  },
  {
    id: 'reef',
    name: 'Reef',
    description: 'Underwater ecosystems characterized by reef-building corals.',
    icon: '🐠'
  },
  {
    id: 'river',
    name: 'River',
    description: 'Natural flowing watercourses that typically flow into other bodies of water.',
    icon: '🏞️'
  },
  {
    id: 'lake',
    name: 'Lake',
    description: 'Body of water surrounded by land.',
    icon: '💦'
  },
  {
    id: 'wetland',
    name: 'Wetland',
    description: 'Land areas that are saturated with water, either permanently or seasonally.',
    icon: '🐸'
  },
  {
    id: 'mountain',
    name: 'Mountain',
    description: 'Elevated land with steep sides that rises prominently above its surroundings.',
    icon: '⛰️'
  },
  {
    id: 'cave',
    name: 'Cave',
    description: 'Natural underground void large enough for human entry.',
    icon: '🕳️'
  },
  {
    id: 'urban',
    name: 'Urban',
    description: 'Areas with a high human population density and built environment.',
    icon: '🏙️'
  }
];

export const continents: Continent[] = [
  {
    id: 'africa',
    name: 'Africa',
    description: 'Second-largest continent known for diverse wildlife and ecosystems.'
  },
  {
    id: 'asia',
    name: 'Asia',
    description: 'Largest continent with diverse landscapes from arctic to tropical.'
  },
  {
    id: 'europe',
    name: 'Europe',
    description: 'Western peninsula of Eurasia with varied ecosystems.'
  },
  {
    id: 'north_america',
    name: 'North America',
    description: 'Continent spanning from arctic regions to tropical areas.'
  },
  {
    id: 'south_america',
    name: 'South America',
    description: 'Continent known for the Amazon rainforest and Andes mountains.'
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'Continent known for unique flora and fauna due to long isolation.'
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    description: 'Earth\'s southernmost continent, mostly covered in ice.'
  },
  {
    id: 'oceania',
    name: 'Oceania',
    description: 'Region consisting of numerous islands in the Pacific Ocean.'
  }
];

export const conservationStatuses: ConservationStatus[] = [
  {
    id: 'least_concern',
    name: 'Least Concern',
    description: 'Species evaluated as not being at risk of extinction in the near future.',
    color: '#4caf50'
  },
  {
    id: 'near_threatened',
    name: 'Near Threatened',
    description: 'Species close to qualifying for a threatened category in the near future.',
    color: '#8bc34a'
  },
  {
    id: 'vulnerable',
    name: 'Vulnerable',
    description: 'Species considered to be facing a high risk of extinction in the wild.',
    color: '#ffc107'
  },
  {
    id: 'endangered',
    name: 'Endangered',
    description: 'Species at very high risk of extinction in the wild.',
    color: '#ff9800'
  },
  {
    id: 'critically_endangered',
    name: 'Critically Endangered',
    description: 'Species at extremely high risk of extinction in the wild.',
    color: '#f44336'
  },
  {
    id: 'extinct_in_wild',
    name: 'Extinct in the Wild',
    description: 'Species known only to survive in captivity or as naturalized populations outside its historic range.',
    color: '#9c27b0'
  },
  {
    id: 'extinct',
    name: 'Extinct',
    description: 'Species with no known living individuals.',
    color: '#616161'
  }
];

export const dietTypes: DietType[] = [
  {
    id: 'herbivore',
    name: 'Herbivore',
    description: 'Animals that feed exclusively or mainly on plant material.',
    icon: '🌱'
  },
  {
    id: 'carnivore',
    name: 'Carnivore',
    description: 'Animals that feed exclusively or mainly on animal tissue.',
    icon: '🍖'
  },
  {
    id: 'omnivore',
    name: 'Omnivore',
    description: 'Animals that eat both plant and animal matter.',
    icon: '🥗'
  },
  {
    id: 'insectivore',
    name: 'Insectivore',
    description: 'Animals that feed primarily on insects and similar small creatures.',
    icon: '🐜'
  },
  {
    id: 'frugivore',
    name: 'Frugivore',
    description: 'Animals that feed primarily on fruits.',
    icon: '🍎'
  },
  {
    id: 'nectarivore',
    name: 'Nectarivore',
    description: 'Animals that feed primarily on nectar from flowers.',
    icon: '🌺'
  },
  {
    id: 'filter_feeder',
    name: 'Filter Feeder',
    description: 'Animals that feed by straining suspended particles from water.',
    icon: '🌿'
  }
];
