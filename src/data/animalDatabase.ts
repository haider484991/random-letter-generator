import { animalCategories, habitats, continents, conservationStatuses, dietTypes } from './animalCategories';

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
  weight: {
    min: number;
    max: number;
    unit: 'kg' | 'g';
  };
  height: {
    min: number;
    max: number;
    unit: 'm' | 'cm';
  };
  habitats: string[];
  continents: string[];
  conservationStatus: string;
  funFacts: string[];
  imageUrls: {
    main: string;
    thumbnail: string;
    additional: string[];
  };
  sounds?: {
    main: string;
    name: string;
  }[];
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  behaviors: string[];
  predators: string[];
  prey: string[];
}

// Sample database with a few animals
export const animalDatabase: Animal[] = [
  {
    id: "african-elephant",
    name: "African Elephant",
    scientificName: "Loxodonta africana",
    category: "mammals",
    description: "The African elephant is the largest living terrestrial animal, with males reaching heights of up to 4 meters. They have large ears that allow them to radiate excess heat and distinctive trunks used for communication and handling objects.",
    diet: "herbivore",
    lifespan: {
      min: 60,
      max: 70,
    },
    weight: {
      min: 4000,
      max: 7000,
      unit: 'kg',
    },
    height: {
      min: 3,
      max: 4,
      unit: 'm',
    },
    habitats: ["savanna", "forest"],
    continents: ["africa"],
    conservationStatus: "vu",
    funFacts: [
      "Elephants can communicate over long distances using infrasound",
      "They are known to mourn their dead and can recognize elephant skeletons",
      "An elephant's trunk contains over 40,000 muscles",
      "They can consume up to 150 kg of food and 300 liters of water per day"
    ],
    imageUrls: {
      main: "/images/animals/african-elephant.jpg",
      thumbnail: "/images/animals/thumbnails/african-elephant.jpg",
      additional: [
        "/images/animals/african-elephant-1.jpg",
        "/images/animals/african-elephant-2.jpg"
      ]
    },
    sounds: [
      {
        main: "/sounds/african-elephant.mp3",
        name: "Trumpet"
      }
    ],
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      order: "Proboscidea",
      family: "Elephantidae",
      genus: "Loxodonta",
      species: "L. africana"
    },
    behaviors: [
      "Highly social with complex family groups",
      "Led by matriarchs who are usually the oldest females",
      "Males typically leave the herd when they reach puberty",
      "Use mud and dust for protection against the sun and insects"
    ],
    predators: ["Humans", "Lions (rarely, typically only target young)"],
    prey: []
  },
  {
    id: "blue-whale",
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    category: "mammals",
    description: "The blue whale is the largest animal known to have ever existed, with lengths up to 30 meters. Despite their massive size, they feed primarily on tiny krill through a filter-feeding system using baleen plates.",
    diet: "carnivore",
    lifespan: {
      min: 80,
      max: 90,
    },
    weight: {
      min: 100000,
      max: 190000,
      unit: 'kg',
    },
    height: {
      min: 24,
      max: 30,
      unit: 'm',
    },
    habitats: ["ocean"],
    continents: ["antarctica", "asia", "north_america", "south_america", "australia"],
    conservationStatus: "en",
    funFacts: [
      "A blue whale's heart is the size of a small car",
      "They can produce sounds louder than a jet engine",
      "They can consume up to 4 tons of krill per day",
      "A blue whale calf can gain up to 90 kg per day during its first year"
    ],
    imageUrls: {
      main: "/images/animals/blue-whale.jpg",
      thumbnail: "/images/animals/thumbnails/blue-whale.jpg",
      additional: [
        "/images/animals/blue-whale-1.jpg",
        "/images/animals/blue-whale-2.jpg"
      ]
    },
    sounds: [
      {
        main: "/sounds/blue-whale.mp3",
        name: "Low frequency call"
      }
    ],
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      order: "Cetacea",
      family: "Balaenopteridae",
      genus: "Balaenoptera",
      species: "B. musculus"
    },
    behaviors: [
      "Migrate annually between feeding and breeding grounds",
      "Usually solitary or in small groups",
      "Communicate over vast distances using low-frequency sounds",
      "Can dive for up to 30 minutes"
    ],
    predators: ["Humans (historically)", "Orcas (rarely)"],
    prey: ["Krill", "Small fish"]
  },
  {
    id: "golden-eagle",
    name: "Golden Eagle",
    scientificName: "Aquila chrysaetos",
    category: "birds",
    description: "The golden eagle is one of the most well-known birds of prey in the Northern Hemisphere. It has a wingspan of up to 2.3 meters and is known for its speed and hunting prowess.",
    diet: "carnivore",
    lifespan: {
      min: 30,
      max: 40,
    },
    weight: {
      min: 3,
      max: 6.5,
      unit: 'kg',
    },
    height: {
      min: 70,
      max: 90,
      unit: 'cm',
    },
    habitats: ["mountains", "forest"],
    continents: ["north_america", "europe", "asia", "africa"],
    conservationStatus: "lc",
    funFacts: [
      "They can spot prey from up to 3 km away",
      "Their wingspan can reach over 2 meters",
      "They can dive at speeds of over 240 km/h",
      "Golden eagles mate for life"
    ],
    imageUrls: {
      main: "/images/animals/golden-eagle.jpg",
      thumbnail: "/images/animals/thumbnails/golden-eagle.jpg",
      additional: [
        "/images/animals/golden-eagle-1.jpg",
        "/images/animals/golden-eagle-2.jpg"
      ]
    },
    sounds: [
      {
        main: "/sounds/golden-eagle.mp3",
        name: "Call"
      }
    ],
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Aves",
      order: "Accipitriformes",
      family: "Accipitridae",
      genus: "Aquila",
      species: "A. chrysaetos"
    },
    behaviors: [
      "Build large nests called eyries on cliffs or in trees",
      "Territorial and defend large hunting grounds",
      "Perform spectacular aerial courtship displays",
      "Hunt cooperatively with their mate"
    ],
    predators: ["Humans"],
    prey: ["Rabbits", "Hares", "Ground squirrels", "Marmots", "Small birds"]
  }
];

// Function to fetch random animals with optional filters
export const getRandomAnimals = (count: number, filters?: {
  categories?: string[];
  habitats?: string[];
  continents?: string[];
  conservationStatus?: string[];
  diet?: string[];
  sizeRange?: [number, number]; // In kg
}) => {
  let filteredAnimals = [...animalDatabase];
  
  if (filters) {
    if (filters.categories && filters.categories.length > 0) {
      filteredAnimals = filteredAnimals.filter(animal => 
        filters.categories?.includes(animal.category)
      );
    }
    
    if (filters.habitats && filters.habitats.length > 0) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.habitats.some(habitat => filters.habitats?.includes(habitat))
      );
    }
    
    if (filters.continents && filters.continents.length > 0) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.continents.some(continent => filters.continents?.includes(continent))
      );
    }
    
    if (filters.conservationStatus && filters.conservationStatus.length > 0) {
      filteredAnimals = filteredAnimals.filter(animal => 
        filters.conservationStatus?.includes(animal.conservationStatus)
      );
    }
    
    if (filters.diet && filters.diet.length > 0) {
      filteredAnimals = filteredAnimals.filter(animal => 
        filters.diet?.includes(animal.diet)
      );
    }
    
    if (filters.sizeRange) {
      const [min, max] = filters.sizeRange;
      filteredAnimals = filteredAnimals.filter(animal => {
        const avgWeight = (animal.weight.min + animal.weight.max) / 2;
        return avgWeight >= min && avgWeight <= max;
      });
    }
  }
  
  // If no animals match the filters or there aren't enough, return whatever we have
  if (filteredAnimals.length === 0) {
    return [];
  }
  
  if (filteredAnimals.length <= count) {
    return [...filteredAnimals];
  }
  
  // Randomly select the requested number of animals
  const randomAnimals: Animal[] = [];
  const tempAnimals = [...filteredAnimals];
  
  for (let i = 0; i < count && tempAnimals.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * tempAnimals.length);
    randomAnimals.push(tempAnimals[randomIndex]);
    tempAnimals.splice(randomIndex, 1);
  }
  
  return randomAnimals;
};
