'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Image from 'next/image';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartDataLabels);

// Custom image loader that can load external images
const pokeImageLoader = ({ src }: { src: string }) => {
  // Use the original URL if it's a public image or a data URL
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }
  
  // Return the URL as-is for external images
  return src;
};

// Pokemon types with their colors
const POKEMON_TYPES = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Define interface for TYPE_MATCHUPS
interface TypeMatchup {
  weakTo: string[];
  resistantTo: string[];
  immuneTo: string[];
  effectiveAgainst: string[];
}

// Add the TYPE_MATCHUPS constant after the POKEMON_TYPES constant
const TYPE_MATCHUPS: Record<string, TypeMatchup> = {
  normal: {
    weakTo: ['fighting'],
    resistantTo: [],
    immuneTo: ['ghost'],
    effectiveAgainst: []
  },
  fire: {
    weakTo: ['water', 'ground', 'rock'],
    resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
    immuneTo: [],
    effectiveAgainst: ['grass', 'ice', 'bug', 'steel']
  },
  water: {
    weakTo: ['electric', 'grass'],
    resistantTo: ['fire', 'water', 'ice', 'steel'],
    immuneTo: [],
    effectiveAgainst: ['fire', 'ground', 'rock']
  },
  electric: {
    weakTo: ['ground'],
    resistantTo: ['electric', 'flying', 'steel'],
    immuneTo: [],
    effectiveAgainst: ['water', 'flying']
  },
  grass: {
    weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'],
    resistantTo: ['water', 'electric', 'grass', 'ground'],
    immuneTo: [],
    effectiveAgainst: ['water', 'ground', 'rock']
  },
  ice: {
    weakTo: ['fire', 'fighting', 'rock', 'steel'],
    resistantTo: ['ice'],
    immuneTo: [],
    effectiveAgainst: ['grass', 'ground', 'flying', 'dragon']
  },
  fighting: {
    weakTo: ['flying', 'psychic', 'fairy'],
    resistantTo: ['bug', 'rock', 'dark'],
    immuneTo: [],
    effectiveAgainst: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  poison: {
    weakTo: ['ground', 'psychic'],
    resistantTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    immuneTo: [],
    effectiveAgainst: ['grass', 'fairy']
  },
  ground: {
    weakTo: ['water', 'grass', 'ice'],
    resistantTo: ['poison', 'rock'],
    immuneTo: ['electric'],
    effectiveAgainst: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  flying: {
    weakTo: ['electric', 'ice', 'rock'],
    resistantTo: ['grass', 'fighting', 'bug'],
    immuneTo: ['ground'],
    effectiveAgainst: ['grass', 'fighting', 'bug']
  },
  psychic: {
    weakTo: ['bug', 'ghost', 'dark'],
    resistantTo: ['fighting', 'psychic'],
    immuneTo: [],
    effectiveAgainst: ['fighting', 'poison']
  },
  bug: {
    weakTo: ['fire', 'flying', 'rock'],
    resistantTo: ['grass', 'fighting', 'ground'],
    immuneTo: [],
    effectiveAgainst: ['grass', 'psychic', 'dark']
  },
  rock: {
    weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
    resistantTo: ['normal', 'fire', 'poison', 'flying'],
    immuneTo: [],
    effectiveAgainst: ['fire', 'ice', 'flying', 'bug']
  },
  ghost: {
    weakTo: ['ghost', 'dark'],
    resistantTo: ['poison', 'bug'],
    immuneTo: ['normal', 'fighting'],
    effectiveAgainst: ['psychic', 'ghost']
  },
  dragon: {
    weakTo: ['ice', 'dragon', 'fairy'],
    resistantTo: ['fire', 'water', 'electric', 'grass'],
    immuneTo: [],
    effectiveAgainst: ['dragon']
  },
  dark: {
    weakTo: ['fighting', 'bug', 'fairy'],
    resistantTo: ['ghost', 'dark'],
    immuneTo: ['psychic'],
    effectiveAgainst: ['psychic', 'ghost']
  },
  steel: {
    weakTo: ['fire', 'fighting', 'ground'],
    resistantTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
    immuneTo: ['poison'],
    effectiveAgainst: ['ice', 'rock', 'fairy']
  },
  fairy: {
    weakTo: ['poison', 'steel'],
    resistantTo: ['fighting', 'bug', 'dark'],
    immuneTo: ['dragon'],
    effectiveAgainst: ['fighting', 'dragon', 'dark']
  }
};

// Pokemon generations
const GENERATIONS = [
  { id: 1, name: 'Gen I (1-151)', range: [1, 151] },
  { id: 2, name: 'Gen II (152-251)', range: [152, 251] },
  { id: 3, name: 'Gen III (252-386)', range: [252, 386] },
  { id: 4, name: 'Gen IV (387-493)', range: [387, 493] },
  { id: 5, name: 'Gen V (494-649)', range: [494, 649] },
  { id: 6, name: 'Gen VI (650-721)', range: [650, 721] },
  { id: 7, name: 'Gen VII (722-809)', range: [722, 809] },
  { id: 8, name: 'Gen VIII (810-898)', range: [810, 898] },
  { id: 9, name: 'Gen IX (899-1025)', range: [899, 1025] },
];

// Interface for Pokemon type
interface PokemonType {
  type: {
    name: string;
  };
}

// Interface for Pokemon data
interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      home: {
        front_default: string;
        front_shiny: string;
      };
      'dream_world': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
}

// Interface for Team Member
interface TeamMember extends Pokemon {
  role?: string;
}

// Add a new interface for team analysis
interface TeamAnalysis {
  typeWeaknesses: { [key: string]: number };
  typeResistances: { [key: string]: number };
  typeImmunities: string[];
  typeCoverage: { [key: string]: number };
  overallBalance: number; // 0-100 score
  recommendations: string[];
}

// Add strategy explanations
interface StrategyComposition {
  role: string;
  description: string;
}

interface StrategyGuide {
  id: string;
  name: string;
  description: string;
  composition: StrategyComposition[];
  examples: string[];
  difficulty: string;
}

const STRATEGY_GUIDES: StrategyGuide[] = [
  {
    id: 'balanced',
    name: 'Balanced Team',
    description: 'A balanced team includes a mix of offensive and defensive Pokémon with diverse typing. This approach provides good coverage against most opponent teams.',
    composition: [
      { role: 'Physical Attacker', description: 'A Pokémon with high Attack stat to deal physical damage' },
      { role: 'Special Attacker', description: 'A Pokémon with high Special Attack stat to deal special damage' },
      { role: 'Tank', description: 'A Pokémon with high HP and Defense to absorb damage' },
      { role: 'Support', description: 'A Pokémon that provides status effects, healing, or utility moves' },
      { role: 'Sweeper', description: 'A fast Pokémon that can eliminate multiple opponents quickly' },
      { role: 'Lead', description: 'A Pokémon that sets up entry hazards or other field advantages' },
    ],
    examples: ['Tyranitar', 'Gengar', 'Blissey', 'Clefable', 'Garchomp', 'Ferrothorn'],
    difficulty: 'Beginner'
  },
  {
    id: 'hyper-offense',
    name: 'Hyper Offense',
    description: 'This aggressive strategy focuses on dealing maximum damage quickly. The team consists primarily of offensive Pokémon with high Attack or Special Attack and Speed stats.',
    composition: [
      { role: 'Physical Sweeper', description: 'Fast physical attacker that can outspeed and hit hard' },
      { role: 'Special Sweeper', description: 'Fast special attacker with coverage moves' },
      { role: 'Setup Sweeper', description: 'Pokémon that can boost stats and then sweep' },
      { role: 'Wallbreaker', description: 'Powerful attacker designed to break through defensive Pokémon' },
      { role: 'Priority User', description: 'Pokémon with access to priority moves for finishing off weakened foes' },
      { role: 'Lead', description: 'Sets up entry hazards or prevents opponent setup' },
    ],
    examples: ['Dragonite', 'Hydreigon', 'Terrakion', 'Zeraora', 'Weavile', 'Tapu Koko'],
    difficulty: 'Intermediate'
  },
  {
    id: 'stall',
    name: 'Stall',
    description: 'A defensive strategy focused on gradually wearing down opponents through poison, status effects, and residual damage while maintaining high defenses.',
    composition: [
      { role: 'Physical Wall', description: 'Pokémon with high Defense to block physical attacks' },
      { role: 'Special Wall', description: 'Pokémon with high Special Defense to block special attacks' },
      { role: 'Cleric', description: 'Pokémon that can heal the team and remove status conditions' },
      { role: 'Status Spreader', description: 'Pokémon that inflicts status conditions like poison or burn' },
      { role: 'Entry Hazard Setter', description: 'Pokémon that sets up Stealth Rock, Spikes, etc.' },
      { role: 'Stall Breaker Counter', description: 'Pokémon that can handle opponents trying to break your stall' },
    ],
    examples: ['Chansey', 'Toxapex', 'Quagsire', 'Ferrothorn', 'Mandibuzz', 'Corviknight'],
    difficulty: 'Advanced'
  },
  {
    id: 'weather',
    name: 'Weather Team',
    description: 'Teams built around a specific weather condition (rain, sun, sandstorm, or hail) to boost certain types and abilities.',
    composition: [
      { role: 'Weather Setter', description: 'Pokémon that sets the desired weather' },
      { role: 'Weather Abuser', description: 'Pokémon with abilities or moves that benefit from the weather' },
      { role: 'Coverage', description: 'Pokémon that covers the weaknesses of your weather core' },
      { role: 'Sweeper', description: 'Fast attacker that capitalizes on weather advantages' },
      { role: 'Defensive Core', description: 'Pokémon that provide defensive synergy and resistances' },
      { role: 'Utility', description: 'Pokémon providing support moves and coverage' },
    ],
    examples: [
      'Rain: Pelipper, Barraskewda, Ferrothorn',
      'Sun: Torkoal, Venusaur, Charizard',
      'Sand: Tyranitar, Excadrill, Hippowdon',
      'Hail: Abomasnow, Arctozolt, Walrein'
    ],
    difficulty: 'Intermediate'
  },
  {
    id: 'trick-room',
    name: 'Trick Room',
    description: 'A strategy that reverses the speed order so that slower Pokémon move first, allowing powerful but slow Pokémon to shine.',
    composition: [
      { role: 'Trick Room Setter', description: 'Pokémon that sets up Trick Room, usually with good bulk' },
      { role: 'Slow Attackers', description: 'Powerful but slow Pokémon that benefit from moving first in Trick Room' },
      { role: 'Secondary Setter', description: 'Backup Pokémon that can set Trick Room if needed' },
      { role: 'Anti-Taunt', description: 'Pokémon with Mental Herb or abilities to prevent being taunted' },
      { role: 'Coverage', description: 'Pokémon that cover weaknesses of your slow attackers' },
      { role: 'Non-Trick Room Mode', description: 'Pokémon that function well when Trick Room is not active' },
    ],
    examples: ['Dusclops', 'Rhyperior', 'Conkeldurr', 'Hatterene', 'Reuniclus', 'Stakataka'],
    difficulty: 'Advanced'
  }
];

// Add helper functions for Pokemon images
const getBestPokemonImage = (pokemon: Pokemon): string => {
  try {
    // Try to get the best quality image in this order:
    return pokemon.sprites.other['official-artwork'].front_default ||
           pokemon.sprites.other.home?.front_default ||
           pokemon.sprites.other['dream_world']?.front_default ||
           pokemon.sprites.front_default ||
           "/images/pokeball.png"; // Final fallback
  } catch (error) {
    console.error("Error getting Pokemon image:", error);
    return "/images/pokeball.png";
  }
};

// Add a function to get the shiny image
const getShinyPokemonImage = (pokemon: Pokemon): string => {
  try {
    return pokemon.sprites.other['official-artwork'].front_shiny ||
           pokemon.sprites.other.home?.front_shiny ||
           pokemon.sprites.front_shiny ||
           getBestPokemonImage(pokemon); // Fallback to regular image
  } catch (error) {
    console.error("Error getting shiny Pokemon image:", error);
    return "/images/pokeball.png";
  }
};

const PokemonGenerator = () => {
  // State for Pokemon data
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New state for all Pokemon view
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pokemonPerPage = 20;
  
  // State for filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [minPower, setMinPower] = useState<number>(0);
  
  // State for team building
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState('My Awesome Team');
  const [showTeamBuilder, setShowTeamBuilder] = useState(false);
  
  // New state for team analysis
  const [teamAnalysis, setTeamAnalysis] = useState<TeamAnalysis | null>(null);
  const [showTypeChart, setShowTypeChart] = useState(false);
  
  // Add state for displaying strategy guides
  const [showStrategyGuides, setShowStrategyGuides] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  
  // Sound effects
  const [playSelect] = useSound('/sounds/select.mp3', { volume: 0.5 });
  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.5 });
  
  // Calculate total power based on stats
  const calculatePower = (stats: Pokemon['stats']) => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };
  
  // Get a random Pokemon ID based on filters
  const getRandomPokemonId = useCallback(() => {
    let min = 1;
    let max = 1025; // Latest Pokemon as of my knowledge
    
    // Apply generation filter if selected
    if (selectedGeneration !== null) {
      const generation = GENERATIONS.find(gen => gen.id === selectedGeneration);
      if (generation) {
        min = generation.range[0];
        max = generation.range[1];
      }
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [selectedGeneration]);
  
  // Fetch Pokemon data from the PokeAPI
  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get a random Pokemon ID
      const id = getRandomPokemonId();
      
      // Fetch Pokemon data
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      
      const data: Pokemon = await response.json();
      
      // Apply type filter if selected
      if (selectedTypes.length > 0) {
        const pokemonTypes = data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name.toLowerCase());
        const hasMatchingType = selectedTypes.some(type => 
          pokemonTypes.includes(type.toLowerCase())
        );
        
        if (!hasMatchingType) {
          // Try again if the Pokemon doesn't match the selected types
          setLoading(false);
          fetchPokemon();
          return;
        }
      }
      
      // Apply power filter if set
      const power = calculatePower(data.stats);
      if (power < minPower) {
        // Try again if the Pokemon doesn't meet the minimum power
        setLoading(false);
        fetchPokemon();
        return;
      }
      
      setPokemon(data);
      playSelect();
    } catch (err) {
      setError('Error fetching Pokemon. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getRandomPokemonId, minPower, playSelect, selectedTypes]);
  
  // Add current Pokemon to team
  const addToTeam = () => {
    if (pokemon && team.length < 6) {
      setTeam([...team, { ...pokemon, role: 'Team Member' }]);
      playSuccess();
    }
  };
  
  // Remove Pokemon from team
  const removeFromTeam = (index: number) => {
    const newTeam = [...team];
    newTeam.splice(index, 1);
    setTeam(newTeam);
  };
  
  // Update team member role
  const updateRole = (index: number, role: string) => {
    const newTeam = [...team];
    newTeam[index] = { ...newTeam[index], role };
    setTeam(newTeam);
  };
  
  // Clear team
  const clearTeam = () => {
    setTeam([]);
  };
  
  // Toggle type selection
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  // Prepare radar chart data for Pokemon stats
  const getStatChartData = (pokemon: Pokemon) => {
    const labels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
    const data = pokemon.stats.map(stat => stat.base_stat);
    
    return {
      labels,
      datasets: [
        {
          label: 'Base Stats',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
  };
  
  // Chart options
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 150,
      },
    },
    plugins: {
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold' as const,
        },
        formatter: (value: number) => value,
      },
    },
  };
  
  // Format Pokemon name
  const formatName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // Fetch all Pokemon for the current page
  const fetchAllPokemon = useCallback(async () => {
    setLoadingAll(true);
    setError(null);
    
    try {
      // Calculate offset based on current page
      const offset = (currentPage - 1) * pokemonPerPage;
      let min = 1;
      let max = 1025;
      
      // Apply generation filter if selected
      if (selectedGeneration !== null) {
        const generation = GENERATIONS.find(gen => gen.id === selectedGeneration);
        if (generation) {
          min = generation.range[0];
          max = generation.range[1];
        }
      }
      
      // Calculate total pages
      const totalCount = max - min + 1;
      setTotalPages(Math.ceil(totalCount / pokemonPerPage));
      
      // Create an array of Pokemon IDs to fetch
      const idsToFetch = [];
      for (let i = 0; i < pokemonPerPage; i++) {
        const id = min + offset + i;
        if (id <= max) {
          idsToFetch.push(id);
        }
      }
      
      // Fetch Pokemon data in parallel
      const pokemonPromises = idsToFetch.map(id => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch Pokemon #${id}`);
            return response.json();
          })
      );
      
      let fetchedPokemon = await Promise.all(pokemonPromises);
      
      // Apply type filter if selected
      if (selectedTypes.length > 0) {
        fetchedPokemon = fetchedPokemon.filter(p => {
          const pokemonTypes = p.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name.toLowerCase());
          return selectedTypes.some(selectedType => pokemonTypes.includes(selectedType.toLowerCase()));
        });
      }
      
      // Apply power filter if set
      if (minPower > 0) {
        fetchedPokemon = fetchedPokemon.filter(p => calculatePower(p.stats) >= minPower);
      }
      
      setAllPokemon(fetchedPokemon);
      playSelect();
    } catch (err) {
      setError('Error fetching Pokemon. Please try again.');
      console.error(err);
    } finally {
      setLoadingAll(false);
    }
  }, [currentPage, selectedGeneration, selectedTypes, minPower, playSelect]);
  
  // Load initial Pokemon on component mount
  useEffect(() => {
    if (viewMode === 'all') {
      fetchAllPokemon();
    }
  }, [viewMode, currentPage, selectedGeneration, selectedTypes, minPower, fetchAllPokemon]);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  // Toggle view mode
  const toggleViewMode = () => {
    const newMode = viewMode === 'single' ? 'all' : 'single';
    setViewMode(newMode);
    if (newMode === 'all' && allPokemon.length === 0) {
      fetchAllPokemon();
    }
  };
  
  // Add a function to analyze team types
  const analyzeTeam = useCallback(() => {
    if (team.length === 0) {
      setTeamAnalysis(null);
      return;
    }
    
    // Initialize analysis objects
    const typeWeaknesses: { [key: string]: number } = {};
    const typeResistances: { [key: string]: number } = {};
    const typeImmunities: string[] = [];
    const typeCoverage: { [key: string]: number } = {};
    const recommendations: string[] = [];
    
    // Initialize all types with 0
    Object.keys(POKEMON_TYPES).forEach(type => {
      typeWeaknesses[type] = 0;
      typeResistances[type] = 0;
      typeCoverage[type] = 0;
    });
    
    // Analyze each Pokémon in the team
    team.forEach((member) => {
      if (member.types) {
        member.types.forEach((typeObj: PokemonType) => {
          const type = typeObj.type.name.toLowerCase();
          
          // Add type coverage (what types this Pokemon can hit super effectively)
          if (TYPE_MATCHUPS[type as keyof typeof TYPE_MATCHUPS]) {
            TYPE_MATCHUPS[type as keyof typeof TYPE_MATCHUPS].effectiveAgainst.forEach(effective => {
              typeCoverage[effective]++;
            });
          }
          
          // Calculate weaknesses, resistances and immunities
          Object.keys(TYPE_MATCHUPS).forEach(attackingType => {
            // Skip if no matchup data
            if (!TYPE_MATCHUPS[attackingType as keyof typeof TYPE_MATCHUPS]) return;
            
            // Check if any of the Pokémon's types are weak to the attacking type
            let isWeak = false;
            let isResistant = false;
            let isImmune = false;
            
            typeObj.type.name.toLowerCase().split(', ').forEach((defenseType: string) => {
              // Check immunities first
              if (TYPE_MATCHUPS[defenseType as keyof typeof TYPE_MATCHUPS].immuneTo.includes(attackingType)) {
                isImmune = true;
              }
              
              // Check weaknesses
              if (TYPE_MATCHUPS[attackingType as keyof typeof TYPE_MATCHUPS].effectiveAgainst.includes(defenseType)) {
                isWeak = true;
              }
              
              // Check resistances
              if (TYPE_MATCHUPS[defenseType as keyof typeof TYPE_MATCHUPS].resistantTo.includes(attackingType)) {
                isResistant = true;
              }
            });
            
            // Update counts
            if (isImmune && !typeImmunities.includes(attackingType)) {
              typeImmunities.push(attackingType);
            } else if (isWeak && !isResistant && !isImmune) {
              typeWeaknesses[attackingType]++;
            } else if (isResistant && !isImmune) {
              typeResistances[attackingType]++;
            }
          });
        });
      }
    });
    
    // Generate recommendations
    // 1. Check for too many weaknesses to a specific type
    const criticalWeaknesses = Object.entries(typeWeaknesses)
      .filter(([, count]) => count >= 3)
      .map(([type]) => type);
    
    if (criticalWeaknesses.length > 0) {
      recommendations.push(`Your team has multiple weaknesses to ${criticalWeaknesses.join(', ')} types. Consider adding Pokémon that resist these types.`);
    }
    
    // 2. Check for poor offensive coverage
    const poorCoverage = Object.entries(typeCoverage)
      .filter(([, count]) => count === 0)
      .map(([type]) => type);
    
    if (poorCoverage.length > 0) {
      recommendations.push(`Your team can't hit ${poorCoverage.join(', ')} types super effectively. Consider adding moves or Pokémon that are strong against these types.`);
    }
    
    // 3. Check for type redundancy
    const typeCount: { [key: string]: number } = {};
    team.forEach(member => {
      member.types.forEach(t => {
        const type = t.type.name.toLowerCase();
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });
    
    const redundantTypes = Object.entries(typeCount)
      .filter(([, count]) => count >= 3)
      .map(([type]) => type);
    
    if (redundantTypes.length > 0) {
      recommendations.push(`You have many Pokémon with ${redundantTypes.join(', ')} typing. Consider diversifying your team for better coverage.`);
    }
    
    // 4. Check team balance (attackers vs defenders)
    const physicalAttackers = team.filter(member => {
      const attack = member.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
      const specialAttack = member.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0;
      return attack > specialAttack && attack > 80;
    }).length;
    
    const specialAttackers = team.filter(member => {
      const attack = member.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
      const specialAttack = member.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0;
      return specialAttack > attack && specialAttack > 80;
    }).length;
    
    const defenders = team.filter(member => {
      const defense = member.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
      const specialDefense = member.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0;
      return (defense > 80 || specialDefense > 80) && (defense + specialDefense > 160);
    }).length;
    
    if (physicalAttackers === 0) {
      recommendations.push("Your team lacks physical attackers. Consider adding Pokémon with high Attack stats.");
    }
    
    if (specialAttackers === 0) {
      recommendations.push("Your team lacks special attackers. Consider adding Pokémon with high Special Attack stats.");
    }
    
    if (defenders === 0) {
      recommendations.push("Your team lacks defensive Pokémon. Consider adding some tanks with high HP and Defense stats.");
    }
    
    // Calculate overall balance score (0-100)
    // Start with 100 and subtract for various issues
    let overallBalance = 100;
    
    // Deduct for critical weaknesses
    overallBalance -= criticalWeaknesses.length * 10;
    
    // Deduct for poor offensive coverage
    overallBalance -= poorCoverage.length * 5;
    
    // Deduct for type redundancy
    overallBalance -= redundantTypes.length * 8;
    
    // Deduct for imbalance in attackers/defenders
    if (physicalAttackers === 0 || specialAttackers === 0) {
      overallBalance -= 15;
    }
    
    if (defenders === 0) {
      overallBalance -= 15;
    }
    
    // Cap the score between 0 and 100
    overallBalance = Math.max(0, Math.min(100, overallBalance));
    
    // Set the analysis
    setTeamAnalysis({
      typeWeaknesses,
      typeResistances,
      typeImmunities,
      typeCoverage,
      overallBalance,
      recommendations
    });
  }, [team]);
  
  // Run team analysis whenever the team changes
  useEffect(() => {
    analyzeTeam();
  }, [team, analyzeTeam]);
  
  // Add team export/import functionality
  const exportTeam = () => {
    if (team.length === 0) return;
    
    // Create a simplified version of the team for export
    const exportableTeam = team.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role || 'Team Member',
    }));
    
    const teamData = {
      name: teamName,
      members: exportableTeam,
      createdAt: new Date().toISOString()
    };
    
    // Convert to JSON string
    const teamJson = JSON.stringify(teamData);
    
    // Create a download link
    const blob = new Blob([teamJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${teamName.replace(/\s+/g, '-').toLowerCase()}-team.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success notification
    alert('Team exported successfully!');
  };

  // Function to import a team
  const importTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const teamData = JSON.parse(content);
        
        if (!teamData.name || !teamData.members || !Array.isArray(teamData.members)) {
          throw new Error('Invalid team format');
        }
        
        // Set the team name
        setTeamName(teamData.name);
        
        // Fetch complete data for each team member
        setLoading(true);
        
        const newTeam: TeamMember[] = [];
        
        for (const member of teamData.members) {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${member.id}`);
            if (!response.ok) throw new Error(`Failed to fetch Pokemon #${member.id}`);
            
            const pokemonData: Pokemon = await response.json();
            newTeam.push({
              ...pokemonData,
              role: member.role || 'Team Member'
            });
          } catch (err) {
            console.error(`Error fetching Pokemon #${member.id}:`, err);
            // Continue with the next Pokemon if one fails
          }
        }
        
        // Update the team
        setTeam(newTeam);
        setLoading(false);
        
        // Show success notification
        alert('Team imported successfully!');
        
      } catch (err) {
        alert('Error importing team. Please make sure the file is in the correct format.');
        console.error('Error importing team:', err);
      }
      
      // Reset the file input
      event.target.value = '';
    };
    
    reader.readAsText(file);
  };

  // Add the import file input reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add the import team button handler
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Render the strategy guide
  const renderStrategyGuide = () => {
    if (!selectedStrategy) {
      return (
        <div className="p-4 text-center">
          <p className="text-gray-600">Select a strategy from the list to learn more.</p>
        </div>
      );
    }
    
    const strategy = STRATEGY_GUIDES.find(s => s.id === selectedStrategy);
    if (!strategy) return null;
    
    return (
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-800">{strategy.name}</h4>
          <div className="flex items-center mt-1">
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Difficulty: {strategy.difficulty}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{strategy.description}</p>
        </div>
        
        <div className="mb-4">
          <h5 className="text-lg font-semibold text-gray-700">Team Composition</h5>
          <ul className="mt-2 space-y-2">
            {strategy.composition.map((member, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-sm font-bold mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium text-gray-800">{member.role}:</span> {member.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="text-lg font-semibold text-gray-700">Example Pokémon</h5>
          <div className="mt-2">
            {typeof strategy.examples[0] === 'string' && (
              <p className="text-gray-600">{strategy.examples.join(', ')}</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Add state for shiny display
  const [showShiny, setShowShiny] = useState(false);

  // Toggle shiny display
  const toggleShinyDisplay = () => {
    setShowShiny(!showShiny);
    playSelect();
  };
  
  // Add new state for showing the tutorial
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Display error message if there's an error
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8 bg-gradient-to-r from-red-500 to-blue-500 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">Random Pokemon Generator</h2>
        <p className="text-white text-lg">
          Welcome to our Random Pokemon Generator! Build your ultimate Pokemon team by generating random Pokemon based on type, generation, and power ranking.
          Add your favorites to your team and create balanced, powerful teams for battles.
        </p>
        
        {/* Add Tutorial Button */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={toggleViewMode}
            className="bg-white text-blue-600 py-2 px-6 rounded-lg font-bold shadow-md hover:bg-gray-100 transition-all"
          >
            {viewMode === 'single' ? 'View All Pokemon' : 'Single Pokemon Mode'}
          </button>
          
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="bg-amber-400 text-amber-800 py-2 px-6 rounded-lg font-bold shadow-md hover:bg-amber-300 transition-all"
          >
            {showTutorial ? 'Hide Guide' : 'How To Use'}
          </button>
        </div>
      </div>
      
      {/* User Guide Section */}
      {showTutorial && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border-2 border-amber-300">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">How to Use the Pokemon Generator</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-amber-800">Quick Start Guide</h4>
              <ol className="list-decimal pl-8 space-y-2 text-gray-700">
                <li>Use the <strong>filters</strong> to select Pokemon types, generation, and minimum power.</li>
                <li>Click <strong>Generate Random Pokemon</strong> to get a random Pokemon based on your filters.</li>
                <li>Add Pokemon to your team (up to 6) and view team analysis.</li>
                <li>Export your team to share with friends or save for later.</li>
              </ol>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-blue-800">Single Pokemon Mode</h4>
                <ul className="list-disc pl-8 space-y-1 text-gray-700">
                  <li>Generate one random Pokemon at a time</li>
                  <li>See detailed Pokemon stats and type information</li>
                  <li>View the stat radar chart to understand strengths</li>
                  <li>Toggle between regular and shiny forms</li>
                  <li>Add Pokemon you like to your team</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-purple-800">All Pokemon View</h4>
                <ul className="list-disc pl-8 space-y-1 text-gray-700">
                  <li>Browse multiple Pokemon at once in a grid</li>
                  <li>Page through Pokemon collections</li>
                  <li>Toggle shiny/regular forms for all Pokemon</li>
                  <li>Add Pokemon directly to your team from the grid</li>
                  <li>Click &quot;View Details&quot; to see more information</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-green-800">Team Building</h4>
                <ul className="list-disc pl-8 space-y-1 text-gray-700">
                  <li>Add up to 6 Pokemon to your team</li>
                  <li>Assign roles to team members</li>
                  <li>Export your team as a JSON file</li>
                  <li>Import previously saved teams</li>
                  <li>View detailed team analysis for balance</li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-red-800">Team Analysis</h4>
                <ul className="list-disc pl-8 space-y-1 text-gray-700">
                  <li>Check type weaknesses and resistances</li>
                  <li>See team balance score and recommendations</li>
                  <li>View the type effectiveness chart</li>
                  <li>Learn about different team strategies</li>
                  <li>Get tips to improve your team composition</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Pro Tips</h4>
              <ul className="list-disc pl-8 space-y-1 text-gray-700">
                <li><span className="font-medium">Filter by Type:</span> Use the colored type buttons to filter Pokemon by one or more types.</li>
                <li><span className="font-medium">Generation Filter:</span> Narrow your search to specific game generations.</li>
                <li><span className="font-medium">Power Slider:</span> Set a minimum power level to find stronger Pokemon.</li>
                <li><span className="font-medium">Team Analysis:</span> Pay attention to team weaknesses and coverage recommendations.</li>
                <li><span className="font-medium">Strategy Guides:</span> Review the different team strategies to build more effective teams.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* View mode toggle */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={toggleViewMode}
          className="bg-white text-blue-600 py-2 px-6 rounded-lg font-bold shadow-md hover:bg-gray-100 transition-all"
        >
          {viewMode === 'single' ? 'View All Pokemon' : 'Single Pokemon Mode'}
        </button>
      </div>
      
      {/* Filters Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Filters</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Pokemon Types</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(POKEMON_TYPES).map(([type, color]) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-all ${
                  selectedTypes.includes(type) ? 'ring-2 ring-white ring-offset-2' : 'opacity-70'
                }`}
                style={{ backgroundColor: color }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Generation</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGeneration(null)}
              className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-all ${
                selectedGeneration === null ? 'bg-blue-600' : 'bg-blue-400'
              }`}
            >
              All Generations
            </button>
            {GENERATIONS.map(gen => (
              <button
                key={gen.id}
                onClick={() => setSelectedGeneration(gen.id)}
                className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-all ${
                  selectedGeneration === gen.id ? 'bg-blue-600' : 'bg-blue-400'
                }`}
              >
                {gen.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Minimum Power ({minPower})</h4>
          <input
            type="range"
            min="0"
            max="600"
            step="10"
            value={minPower}
            onChange={(e) => setMinPower(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>300</span>
            <span>600</span>
          </div>
        </div>
        
        {viewMode === 'single' ? (
          <button
            onClick={fetchPokemon}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Searching...' : '🎲 Generate Random Pokemon 🎲'}
          </button>
        ) : (
          <button
            onClick={fetchAllPokemon}
            disabled={loadingAll}
            className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loadingAll ? 'Loading Pokemon...' : 'Apply Filters'}
          </button>
        )}
      </div>
      
      {/* Single Pokemon Display Section */}
      {viewMode === 'single' && (
        <AnimatePresence mode="wait">
          {pokemon && (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8 bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Pokemon Image */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative w-64 h-64">
                    <Image
                      loader={pokeImageLoader}
                      src={showShiny 
                        ? getShinyPokemonImage(pokemon)
                        : getBestPokemonImage(pokemon)}
                      alt={pokemon.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 256px"
                      className="object-contain"
                      priority
                      onError={(e) => {
                        // If image fails to load, use fallback
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/pokeball.png";
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <button
                      onClick={toggleShinyDisplay}
                      className="bg-amber-400 text-amber-800 py-1 px-3 rounded-full text-xs font-medium hover:bg-amber-500 transition-colors"
                    >
                      {showShiny ? 'Regular Form' : 'Shiny Form'}
                    </button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: POKEMON_TYPES[type.type.name as keyof typeof POKEMON_TYPES] || '#999' }}
                      >
                        {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Pokemon Info */}
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      #{pokemon.id} {formatName(pokemon.name)}
                    </h3>
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold">
                      Power: {calculatePower(pokemon.stats)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-700">Details</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li><span className="font-medium">Height:</span> {pokemon.height / 10} m</li>
                        <li><span className="font-medium">Weight:</span> {pokemon.weight / 10} kg</li>
                        <li>
                          <span className="font-medium">Abilities:</span>{' '}
                          {pokemon.abilities.map(a => 
                            formatName(a.ability.name) + (a.is_hidden ? ' (Hidden)' : '')
                          ).join(', ')}
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-700">Base Stats</h4>
                      <ul className="space-y-1 text-gray-600">
                        {pokemon.stats.map(stat => (
                          <li key={stat.stat.name}>
                            <span className="font-medium">{formatName(stat.stat.name)}:</span> {stat.base_stat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Stat Chart */}
                  <div className="h-64 mt-4">
                    <Radar data={getStatChartData(pokemon)} options={chartOptions} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={addToTeam}
                  disabled={team.length >= 6}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg font-bold shadow-md hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {team.length >= 6 ? 'Team Full (6/6)' : 'Add to Team'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* All Pokemon Grid View */}
      {viewMode === 'all' && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Pokemon Collection</h3>
            <button
              onClick={toggleShinyDisplay}
              className="bg-amber-400 text-amber-800 py-1 px-3 rounded-full text-sm font-medium hover:bg-amber-500 transition-colors"
            >
              {showShiny ? 'Show Regular Forms' : 'Show Shiny Forms'}
            </button>
          </div>
          
          {loadingAll ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Loading Pokemon...</p>
              </div>
            </div>
          ) : allPokemon.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No Pokemon found matching your filters. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allPokemon.map(poke => (
                  <div key={poke.id} className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="relative w-full pt-[100%]">
                      <Image
                        loader={pokeImageLoader}
                        src={showShiny && poke.sprites.other['official-artwork'].front_shiny 
                          ? getShinyPokemonImage(poke)
                          : getBestPokemonImage(poke)}
                        alt={poke.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="absolute top-0 left-0 h-full w-full object-contain"
                        onError={(e) => {
                          // If image fails to load, use fallback
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/pokeball.png";
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-gray-800">#{poke.id} {formatName(poke.name)}</h4>
                        <div className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                          {calculatePower(poke.stats)}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {poke.types.map(type => (
                          <span
                            key={type.type.name}
                            className="px-2 py-0.5 rounded-full text-white text-xs"
                            style={{ backgroundColor: POKEMON_TYPES[type.type.name as keyof typeof POKEMON_TYPES] || '#999' }}
                          >
                            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <button
                          onClick={() => {
                            setPokemon(poke);
                            setViewMode('single');
                          }}
                          className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            if (team.length < 6) {
                              setTeam([...team, { ...poke, role: 'Team Member' }]);
                              playSuccess();
                            }
                          }}
                          disabled={team.length >= 6}
                          className={`text-green-600 text-sm hover:text-green-800 transition-colors ${team.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Add to Team
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                  >
                    First
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <div className="px-3 py-1 bg-blue-600 text-white rounded-md">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                  >
                    Last
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Team Builder Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Your Pokemon Team</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowTypeChart(!showTypeChart)}
              className="bg-purple-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-purple-600 transition-all"
            >
              {showTypeChart ? 'Hide Type Chart' : 'Show Type Chart'}
            </button>
            <button
              onClick={() => setShowTeamBuilder(!showTeamBuilder)}
              className="bg-blue-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-all"
            >
              {showTeamBuilder ? 'Hide Team Builder' : 'Show Team Builder'}
            </button>
          </div>
        </div>
        
        {/* Type Chart */}
        {showTypeChart && (
          <div className="mb-6 overflow-x-auto">
            <h4 className="text-lg font-semibold mb-2 text-gray-700">Pokemon Type Effectiveness Chart</h4>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Type</th>
                  <th className="border border-gray-300 p-2">Strong Against</th>
                  <th className="border border-gray-300 p-2">Weak Against</th>
                  <th className="border border-gray-300 p-2">Resists</th>
                  <th className="border border-gray-300 p-2">Immune To</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(TYPE_MATCHUPS).map(([type, matchup]) => (
                  <tr key={type} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      <span
                        className="inline-block px-2 py-1 rounded-full text-white text-xs font-medium"
                        style={{ backgroundColor: POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-wrap gap-1">
                        {matchup.effectiveAgainst.map(t => (
                          <span
                            key={t}
                            className="inline-block px-2 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: POKEMON_TYPES[t as keyof typeof POKEMON_TYPES] }}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-wrap gap-1">
                        {matchup.weakTo.map(t => (
                          <span
                            key={t}
                            className="inline-block px-2 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: POKEMON_TYPES[t as keyof typeof POKEMON_TYPES] }}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-wrap gap-1">
                        {matchup.resistantTo.map(t => (
                          <span
                            key={t}
                            className="inline-block px-2 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: POKEMON_TYPES[t as keyof typeof POKEMON_TYPES] }}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-wrap gap-1">
                        {matchup.immuneTo.map(t => (
                          <span
                            key={t}
                            className="inline-block px-2 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: POKEMON_TYPES[t as keyof typeof POKEMON_TYPES] }}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {showTeamBuilder && (
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="teamName" className="block text-gray-700 font-medium mb-1">Team Name</label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={exportTeam}
                  disabled={team.length === 0}
                  className="bg-green-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export Team
                </button>
                <button
                  onClick={handleImportClick}
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-all"
                >
                  Import Team
                </button>
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={importTeam}
                  className="hidden"
                />
              </div>
              <button
                onClick={clearTeam}
                className="bg-red-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all"
              >
                Clear Team
              </button>
            </div>
          </div>
        )}
        
        {team.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your team is empty. Generate and add Pokemon to build your team!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <div key={`${member.id}-${index}`} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      loader={pokeImageLoader}
                      src={getBestPokemonImage(member)}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                      onError={(e) => {
                        // If image fails to load, use fallback
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/pokeball.png";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      #{member.id} {formatName(member.name)}
                    </h4>
                    <div className="flex gap-1 mt-1">
                      {member.types.map((type) => (
                        <span
                          key={type.type.name}
                          className="px-2 py-0.5 rounded-full text-white text-xs"
                          style={{ backgroundColor: POKEMON_TYPES[type.type.name as keyof typeof POKEMON_TYPES] || '#999' }}
                        >
                          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {member.role || 'Team Member'}
                    </div>
                  </div>
                </div>
                
                {showTeamBuilder && (
                  <div className="mt-3">
                    <select
                      value={member.role || 'Team Member'}
                      onChange={(e) => updateRole(index, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Team Member">Team Member</option>
                      <option value="Sweeper">Sweeper</option>
                      <option value="Tank">Tank</option>
                      <option value="Support">Support</option>
                      <option value="Lead">Lead</option>
                      <option value="Special Attacker">Special Attacker</option>
                      <option value="Physical Attacker">Physical Attacker</option>
                    </select>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <button
                          onClick={() => {
                            setPokemon(member);
                            setViewMode('single');
                          }}
                          className="text-blue-500 text-sm hover:text-blue-700 transition-colors mr-3"
                        >
                          View Details
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromTeam(index)}
                        className="text-red-500 text-sm hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {team.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-700">Team Analysis</h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Type Coverage</h5>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(POKEMON_TYPES).map(type => {
                      const hasType = team.some(member => 
                        member.types.some((t) => t.type.name === type)
                      );
                      return (
                        <span
                          key={type}
                          className={`px-2 py-0.5 rounded-full text-white text-xs ${hasType ? 'opacity-100' : 'opacity-30'}`}
                          style={{ backgroundColor: POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] }}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Team Power</h5>
                  <div className="text-2xl font-bold text-blue-600">
                    {team.reduce((total, member) => total + calculatePower(member.stats), 0)}
                  </div>
                  <div className="text-sm text-gray-500">Average: {Math.round(team.reduce((total, member) => total + calculatePower(member.stats), 0) / team.length)}</div>
                </div>
              </div>
              
              {/* New enhanced team analysis */}
              {teamAnalysis && (
                <>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-800">Team Balance Score</h5>
                      <div className="w-1/2 bg-gray-300 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full ${
                            teamAnalysis.overallBalance >= 80 ? 'bg-green-500' : 
                            teamAnalysis.overallBalance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${teamAnalysis.overallBalance}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold ${
                        teamAnalysis.overallBalance >= 80 ? 'text-green-600' : 
                        teamAnalysis.overallBalance >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {teamAnalysis.overallBalance}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Type Weaknesses</h5>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(teamAnalysis.typeWeaknesses)
                          .filter(([, count]) => count > 0)
                          .sort((a, b) => b[1] - a[1])
                          .map(([type, count]) => (
                            <div key={type} className="relative group">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium ${
                                  count >= 3 ? 'ring-2 ring-red-500' : ''
                                }`}
                                style={{ backgroundColor: POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] }}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                <span className="ml-1 bg-white text-gray-800 rounded-full w-4 h-4 inline-flex items-center justify-center text-xs">
                                  {count}
                                </span>
                              </span>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
                                {count} Pokémon weak to {type}
                              </div>
                            </div>
                          ))}
                      </div>
                      
                      {Object.values(teamAnalysis.typeWeaknesses).every(count => count === 0) && (
                        <p className="text-sm text-gray-500 italic mt-1">No significant type weaknesses!</p>
                      )}
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Type Resistances & Immunities</h5>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(teamAnalysis.typeResistances)
                          .filter(([, count]) => count > 0)
                          .sort((a, b) => b[1] - a[1])
                          .map(([type, count]) => (
                            <div key={type} className="relative group">
                              <span
                                className="inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium bg-opacity-80"
                                style={{ backgroundColor: POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] }}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                <span className="ml-1 bg-white text-gray-800 rounded-full w-4 h-4 inline-flex items-center justify-center text-xs">
                                  {count}
                                </span>
                              </span>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
                                {count} Pokémon resist {type}
                              </div>
                            </div>
                          ))}
                        
                        {teamAnalysis.typeImmunities.map(type => (
                          <div key={`immune-${type}`} className="relative group">
                            <span
                              className="inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium ring-2 ring-white"
                              style={{ backgroundColor: POKEMON_TYPES[type as keyof typeof POKEMON_TYPES] }}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                              <span className="ml-1 bg-black text-white rounded-full w-4 h-4 inline-flex items-center justify-center text-xs">
                                0
                              </span>
                            </span>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
                              Immune to {type}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {Object.values(teamAnalysis.typeResistances).every(count => count === 0) && 
                       teamAnalysis.typeImmunities.length === 0 && (
                        <p className="text-sm text-gray-500 italic mt-1">No significant type resistances or immunities!</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-800 mb-2">Recommendations</h5>
                    {teamAnalysis.recommendations.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {teamAnalysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-gray-700">{rec}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-green-600 italic">Your team is well-balanced! Great job!</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Add Strategy Guide Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Pokémon Strategy Guide</h3>
          <button
            onClick={() => setShowStrategyGuides(!showStrategyGuides)}
            className="bg-indigo-500 text-white py-1 px-4 rounded-lg font-medium shadow-md hover:bg-indigo-600 transition-all"
          >
            {showStrategyGuides ? 'Hide Strategies' : 'Learn Strategies'}
          </button>
        </div>
        
        {showStrategyGuides && (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">
              Different Pokémon team strategies can give you an edge in battles. Learn about popular competitive playstyles below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Strategy Types</h4>
                <ul className="space-y-2">
                  {STRATEGY_GUIDES.map(strategy => (
                    <li key={strategy.id}>
                      <button
                        onClick={() => setSelectedStrategy(strategy.id)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedStrategy === strategy.id
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{strategy.name}</div>
                        <div className="text-xs text-gray-500">Difficulty: {strategy.difficulty}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:col-span-2 bg-gray-50 rounded-lg">
                {renderStrategyGuide()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Tips Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Pokemon Team Building Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Balance your team with different types to cover weaknesses</li>
          <li>Include a mix of physical and special attackers</li>
          <li>Consider having at least one tank Pokemon with high HP and defense</li>
          <li>Speed is crucial - fast Pokemon can attack first</li>
          <li>Type advantages can overcome power differences</li>
          <li>Some Pokemon work better in specific roles based on their stats</li>
          <li>Try to have coverage against common competitive types like Water, Ground, and Dragon</li>
          <li>Consider weather effects and abilities that complement your team strategy</li>
          <li>Entry hazards like Stealth Rock can provide a significant advantage</li>
          <li>Understand the competitive metagame and prepare counters for common threats</li>
        </ul>
      </div>
    </div>
  );
};

export default PokemonGenerator; 