'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Animal, animalDatabase } from '@/data/animalDatabase';
import { 
  animalCategories, 
  habitats, 
  continents, 
  conservationStatuses,
  dietTypes 
} from '@/data/animalCategories';
import AnimalDetails from './AnimalDetails';
import AnimalCard from './AnimalCard';
import AnimalQuiz from './AnimalQuiz';
import AnimalFactCard from './AnimalFactCard';
import AnimalHabitatMap from './AnimalHabitatMap';
import AnimalSoundPlayer from './AnimalSoundPlayer';
import AnimalComparison from './AnimalComparison';
import FavoritesManager from './FavoritesManager';
import AnimalFilters from './AnimalFilters';
import useLocalStorage from '@/hooks/useLocalStorage';

// Define interfaces
export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  subCategory?: string;
  description: string;
  habitat: string[];
  habitats: string[]; // Alternative naming for compatibility with other components
  diet: string;
  lifespan: string;
  conservationStatus: string;
  size: {
    length: { value: number; unit: string };
    height?: { value: number; unit: string };
    weight: { value: number; unit: string };
  };
  speed?: { value: number; unit: string };
  imageUrls: {
    main: string;
    additional: string[];
    thumbnail?: string;
  };
  soundUrl?: string;
  sounds?: {
    main: string;
    name: string;
  }[];
  funFacts: string[];
  didYouKnow: string[];
  behavioralTraits: string[];
  distribution: string[];
  continents: string[];
  adaptations: string[];
  predators: string[];
  prey?: string[];
  socialStructure?: string;
  interestingFeatures: string[];
  endangeredStatus?: {
    status: string;
    threats: string[];
    conservationEfforts: string[];
  };
  taxonomicClassification: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  taxonomy?: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  behaviors?: string[];
  weight?: {
    min: number;
    max: number;
    unit: 'kg' | 'g';
  };
  height?: {
    min: number;
    max: number;
    unit: 'm' | 'cm';
  };
}

export interface FavoriteAnimal extends Animal {
  dateAdded: string;
  notes?: string;
}

export interface AnimalFilter {
  categories: string[];
  habitats: string[];
  continents: string[];
  conservationStatus: string[];
  dietTypes: string[];
  minWeight?: number;
  maxWeight?: number;
  searchTerm?: string;
}

export interface UserPreferences {
  showScientificNames: boolean;
  darkMode: boolean;
  animationSpeed: number;
  autoPlay: boolean;
  includeEndangered: boolean;
  favoriteCategories: string[];
  quizDifficulty: string;
  soundEnabled: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  defaultAnimalsPerGeneration: number;
}

const AnimalGenerator = () => {
  // State for animals
  const [generatedAnimals, setGeneratedAnimals] = useState<Animal[]>([]);
  const [previousAnimals, setPreviousAnimals] = useState<Animal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const [comparingAnimals, setComparingAnimals] = useState<Animal[]>([]);
  
  // State for filters and preferences
  const [filters, setFilters] = useState<AnimalFilter>({
    categories: [],
    habitats: [],
    continents: [],
    conservationStatus: [],
    dietTypes: [],
  });
  
  // User preferences with default values
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('animalGeneratorPrefs', {
    showScientificNames: true,
    darkMode: false,
    animationSpeed: 1,
    autoPlay: false,
    includeEndangered: true,
    favoriteCategories: [],
    quizDifficulty: 'medium',
    soundEnabled: true,
    imageQuality: 'high',
    defaultAnimalsPerGeneration: 3
  });
  
  // Favorites and history
  const [favorites, setFavorites] = useLocalStorage<FavoriteAnimal[]>('savedAnimals', []);
  const [history, setHistory] = useLocalStorage<Animal[]>('animalHistory', []);
  
  // UI state
  const [activeTab, setActiveTab] = useState('generator');
  const [showFilters, setShowFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animalsToGenerate, setAnimalsToGenerate] = useState(preferences.defaultAnimalsPerGeneration);
  
  // Refs
  const generatorRef = useRef<HTMLDivElement>(null);
  
  // Sound effects
  const [playGenerateSound] = useSound('/sounds/generate.mp3', { volume: preferences.soundEnabled ? 0.5 : 0 });
  const [playSuccessSound] = useSound('/sounds/success.mp3', { volume: preferences.soundEnabled ? 0.3 : 0 });
  
  // Filter animals based on user-defined filters
  const getFilteredAnimals = useCallback(() => {
    let filtered = [...animalDatabase];
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter((animal: Animal) => filters.categories.includes(animal.category));
    }
    
    if (filters.habitats.length > 0) {
      filtered = filtered.filter((animal: Animal) => {
        // Support both naming conventions
        const animalHabitats = animal.habitats || animal.habitat;
        return animalHabitats.some((h: string) => filters.habitats.includes(h));
      });
    }
    
    if (filters.continents.length > 0) {
      filtered = filtered.filter((animal: Animal) => animal.continents.some((c: string) => filters.continents.includes(c)));
    }
    
    if (filters.conservationStatus.length > 0) {
      filtered = filtered.filter((animal: Animal) => conservationStatuses.includes(animal.conservationStatus));
    }
    
    if (filters.dietTypes.length > 0) {
      filtered = filtered.filter((animal: Animal) => filters.dietTypes.some((diet: string) => animal.diet.toLowerCase().includes(diet.toLowerCase())));
    }
    
    if (filters.minWeight !== undefined) {
      filtered = filtered.filter((animal: Animal) => animal.size.weight.value >= filters.minWeight!);
    }
    
    if (filters.maxWeight !== undefined) {
      filtered = filtered.filter((animal: Animal) => animal.size.weight.value <= filters.maxWeight!);
    }
    
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      const searchTerm = filters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((animal: Animal) => 
        animal.name.toLowerCase().includes(searchTerm) ||
        animal.scientificName.toLowerCase().includes(searchTerm) ||
        animal.description.toLowerCase().includes(searchTerm) ||
        animal.funFacts.some((fact: string) => fact.toLowerCase().includes(searchTerm))
      );
    }
    
    return filtered;
  }, [filters]);
  
  // Generate random animals
  const generateRandomAnimals = useCallback(() => {
    setIsGenerating(true);
    setPreviousAnimals(generatedAnimals);
    
    if (preferences.soundEnabled) {
      playGenerateSound();
    }
    
    const filteredAnimals = getFilteredAnimals();
    
    if (filteredAnimals.length === 0) {
      // Handle case when no animals match filters
      setIsGenerating(false);
      return;
    }
    
    // Get random animals
    const selectedAnimals: Animal[] = [];
    const numToGenerate = Math.min(animalsToGenerate, filteredAnimals.length);
    
    const usedIndices = new Set<number>();
    
    while (selectedAnimals.length < numToGenerate) {
      const randomIndex = Math.floor(Math.random() * filteredAnimals.length);
      
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedAnimals.push(filteredAnimals[randomIndex]);
      }
    }
    
    // Update history
    setHistory((prev: Animal[]) => {
      const updatedHistory = [...selectedAnimals, ...prev];
      return updatedHistory.slice(0, 100); // Keep last 100 animals
    });
    
    // Animate the generation
    setTimeout(() => {
      setGeneratedAnimals(selectedAnimals);
      setIsGenerating(false);
      
      if (selectedAnimals.length > 0) {
        setActiveAnimal(selectedAnimals[0]);
        if (preferences.soundEnabled) {
          playSuccessSound();
        }
      }
    }, 800); // Animation delay
  }, [animalsToGenerate, filters, generatedAnimals, getFilteredAnimals, history, playGenerateSound, playSuccessSound, preferences.soundEnabled, setHistory]);
  
  // Add to favorites
  const addToFavorites = useCallback((animal: Animal) => {
    setFavorites((prev: FavoriteAnimal[]) => {
      // Check if already in favorites
      if (prev.some((fav: FavoriteAnimal) => fav.id === animal.id)) {
        return prev;
      }
      
      const favoriteAnimal: FavoriteAnimal = {
        ...animal,
        dateAdded: new Date().toISOString(),
      };
      
      return [favoriteAnimal, ...prev];
    });
  }, [setFavorites]);
  
  // Remove from favorites
  const removeFromFavorites = useCallback((animalId: string) => {
    setFavorites((prev: FavoriteAnimal[]) => prev.filter((animal: FavoriteAnimal) => animal.id !== animalId));
  }, [setFavorites]);
  
  // Check if animal is in favorites
  const isInFavorites = useCallback((animalId: string) => {
    return favorites.some((animal: FavoriteAnimal) => animal.id === animalId);
  }, [favorites]);
  
  // Add animal to comparison
  const addToComparison = useCallback((animal: Animal) => {
    setComparingAnimals((prev: Animal[]) => {
      if (prev.length >= 3) {
        return [...prev.slice(1), animal]; // Remove oldest if already 3
      }
      return [...prev, animal];
    });
  }, []);
  
  // Remove animal from comparison
  const removeFromComparison = useCallback((animalId: string) => {
    setComparingAnimals((prev: Animal[]) => prev.filter((animal: Animal) => animal.id !== animalId));
  }, []);
  
  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      habitats: [],
      continents: [],
      conservationStatus: [],
      dietTypes: [],
    });
  }, []);
  
  // Effect to auto-generate animals on first load
  useEffect(() => {
    if (generatedAnimals.length === 0 && preferences.autoPlay) {
      generateRandomAnimals();
    }
  }, [generateRandomAnimals, generatedAnimals.length, preferences.autoPlay]);
  
  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      generatorRef.current?.requestFullscreen().catch((err: any) => {
        console.error('Error attempting to enable fullscreen mode:', err);
      });
    } else {
      document.exitFullscreen().catch((err: any) => {
        console.error('Error attempting to exit fullscreen mode:', err);
      });
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);
  
  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Get a random fact for the animal
  const getRandomFact = (animal: Animal) => {
    const allFacts = [
      ...animal.funFacts,
      ...(animal.didYouKnow || []),
    ];
    
    const randomIndex = Math.floor(Math.random() * allFacts.length);
    return allFacts[randomIndex] || animal.description;
  };
  
  // Track selected facts to avoid repetition
  const [shownFacts, setShownFacts] = useState<Record<string, string[]>>({});
  
  // Get a new random fact that hasn't been shown yet
  const getNewFact = (animalId: string) => {
    if (!activeAnimal) return;
    
    const facts = [...activeAnimal.funFacts, ...(activeAnimal.didYouKnow || [])];
    const shownForAnimal = shownFacts[animalId] || [];
    
    // If all facts have been shown, reset
    if (shownForAnimal.length >= facts.length) {
      setShownFacts((prev: Record<string, string[]>) => ({ ...prev, [animalId]: [] }));
      return getRandomFact(activeAnimal);
    }
    
    // Find a fact that hasn't been shown yet
    const availableFacts = facts.filter((fact: string) => !shownForAnimal.includes(fact));
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    const newFact = availableFacts[randomIndex];
    
    // Add to shown facts
    setShownFacts((prev: Record<string, string[]>) => ({
      ...prev,
      [animalId]: [...(prev[animalId] || []), newFact]
    }));
    
    return newFact;
  };
  
  // Generate random animals
  const generateAnimals = () => {
    setPreviousAnimals(generatedAnimals);
    setIsGenerating(true);
    
    // Simulate API call with loading time
    setTimeout(() => {
      const filtered = getFilteredAnimals();
      const selected: Animal[] = [];
      
      // Select random animals up to the requested count
      for (let i = 0; i < animalsToGenerate; i++) {
        if (filtered.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * filtered.length);
        selected.push(filtered[randomIndex]);
        filtered.splice(randomIndex, 1);
      }
      
      if (selected.length > 0) {
        setGeneratedAnimals(selected);
        setActiveAnimal(selected[0]);
        
        // Add to history
        setHistory((prev: Animal[]) => {
          const newHistory = [...prev];
          // Add new animals avoiding duplicates
          selected.forEach((animal: Animal) => {
            if (!newHistory.find((a: Animal) => a.id === animal.id)) {
              newHistory.push(animal);
            }
          });
          // Keep only last 50 animals
          return newHistory.slice(-50);
        });
        
        if (preferences.soundEnabled) {
          playGenerateSound();
        }
      }
      
      setIsGenerating(false);
    }, 1000);
  };
  
  // Toggle favorite status for an animal
  const toggleFavorite = (animal: Animal) => {
    const isFavorite = favorites.some((fav: FavoriteAnimal) => fav.id === animal.id);
    
    if (isFavorite) {
      // Remove from favorites
      setFavorites((prev: FavoriteAnimal[]) => prev.filter((fav: FavoriteAnimal) => fav.id !== animal.id));
    } else {
      // Add to favorites with current date
      setFavorites((prev: FavoriteAnimal[]) => [...prev, {
        ...animal,
        dateAdded: new Date().toISOString(),
      }]);
      
      if (preferences.soundEnabled) {
        playSuccessSound();
      }
    }
  };
  
  // Add or remove animal from comparison list
  const toggleComparison = (animal: Animal) => {
    const isComparing = comparingAnimals.some((a: Animal) => a.id === animal.id);
    
    if (isComparing) {
      // Remove from comparison
      setComparingAnimals((prev: Animal[]) => prev.filter((a: Animal) => a.id !== animal.id));
    } else {
      // Limit to 3 animals for comparison
      if (comparingAnimals.length >= 3) {
        return;
      }
      
      // Add to comparison
      setComparingAnimals((prev: Animal[]) => [...prev, animal]);
    }
  };
  
  // Update quiz difficulty
  const updateQuizDifficulty = (difficulty: string) => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      quizDifficulty: difficulty
    }));
  };
  
  // Get the number of animals in each category
  const getCategoryCount = (category: string) => {
    return animalDatabase.filter((animal: Animal) => animal.category === category).length;
  };
  
  // Check if animal is in favorites
  const isAnimalFavorite = (animal: Animal) => {
    return favorites.some((fav: FavoriteAnimal) => fav.id === animal.id);
  };
  
  // Check if animal is in comparison list
  const isAnimalComparing = (animal: Animal) => {
    return comparingAnimals.some((a: Animal) => a.id === animal.id);
  };
  
  // Update number of animals to generate
  const updateAnimalsToGenerate = (count: number) => {
    setAnimalsToGenerate(count);
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      defaultAnimalsPerGeneration: count
    }));
  };
  
  // Toggle include endangered animals
  const toggleIncludeEndangered = () => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      includeEndangered: !prev.includeEndangered
    }));
  };
  
  // Toggle scientific names display
  const toggleScientificNames = () => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      showScientificNames: !prev.showScientificNames
    }));
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };
  
  // Toggle sound enabled
  const toggleSound = () => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };
  
  return (
    <div className="animal-generator" ref={generatorRef}>
      <div className="generator-header">
        <h1 className="text-3xl font-bold text-center my-6">
          Random Animal Generator
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Discover amazing animals from around the world with our comprehensive random animal generator. 
          Learn fascinating facts, compare different species, and explore the diversity of wildlife.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 justify-center">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="encyclopedia">Encyclopedia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="w-full">
          <div className="controls-section mb-6 flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={generateRandomAnimals} 
              disabled={isGenerating}
              className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600"
            >
              {isGenerating ? 'Generating...' : `Generate ${animalsToGenerate} Random Animals`}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Mode'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="number-selector flex items-center gap-2">
              <Label htmlFor="animalsCount">Animals:</Label>
              <Select
                value={animalsToGenerate.toString()}
                onValueChange={(value: string) => setAnimalsToGenerate(parseInt(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Count" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num: number) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {showFilters && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="filters-container mb-6"
              >
                <AnimalFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  resetFilters={resetFilters}
                />
              </motion.div>
            </AnimatePresence>
          )}
          
          <div className="generated-animals-container">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="loading-animation flex justify-center items-center h-40"
                >
                  <div className="animal-spinner">
                    {/* Spinning animal silhouette animation */}
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <path 
                        d="M50,15 C30,15 15,30 15,50 C15,70 30,85 50,85 C70,85 85,70 85,50 C85,30 70,15 50,15 Z" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="5"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                        className="animate-spin-slow"
                      />
                    </svg>
                    <p className="mt-2 text-center">Discovering amazing animals...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="animals"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="animals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {generatedAnimals.map((animal: Animal) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      isActive={activeAnimal?.id === animal.id}
                      isFavorite={isInFavorites(animal.id)}
                      isComparing={comparingAnimals.some((a: Animal) => a.id === animal.id)}
                      showScientificName={preferences.showScientificNames}
                      onClick={() => setActiveAnimal(animal)}
                      onFavoriteToggle={() => {
                        isInFavorites(animal.id) 
                          ? removeFromFavorites(animal.id) 
                          : addToFavorites(animal);
                      }}
                      onAddToComparison={() => addToComparison(animal)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {activeAnimal && (
            <Dialog open={!!activeAnimal} onOpenChange={(open: boolean) => !open && setActiveAnimal(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{activeAnimal.name}</DialogTitle>
                  <DialogDescription>
                    {preferences.showScientificNames && (
                      <span className="italic">{activeAnimal.scientificName}</span>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <AnimalDetails 
                  animal={activeAnimal} 
                  onAddToFavorites={() => addToFavorites(activeAnimal)}
                  isFavorite={isInFavorites(activeAnimal.id)}
                  onAddToComparison={() => addToComparison(activeAnimal)}
                  preferences={preferences}
                />
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="w-full">
          <FavoritesManager
            favorites={favorites}
            onRemoveFavorite={removeFromFavorites}
            onViewDetails={setActiveAnimal}
            onAddToComparison={addToComparison}
            showScientificNames={preferences.showScientificNames}
          />
        </TabsContent>
        
        <TabsContent value="compare" className="w-full">
          <AnimalComparison
            animals={comparingAnimals}
            onRemoveAnimal={removeFromComparison}
            onViewDetails={setActiveAnimal}
            showScientificNames={preferences.showScientificNames}
          />
        </TabsContent>
        
        <TabsContent value="quiz" className="w-full">
          <AnimalQuiz 
            allAnimals={animalDatabase}
            difficulty={preferences.quizDifficulty}
            onDifficultyChange={(difficulty: string) => 
              setPreferences((prev: UserPreferences) => ({ ...prev, quizDifficulty: difficulty }))}
          />
        </TabsContent>
        
        <TabsContent value="encyclopedia" className="w-full">
          <div className="encyclopedia-container">
            <h2 className="text-2xl font-bold mb-4">Animal Encyclopedia</h2>
            <p className="mb-6">Browse our comprehensive collection of animal information, organized by category.</p>
            
            <Accordion type="multiple" className="w-full">
              {animalCategories.map((category: any) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {animalDatabase
                        .filter((animal: Animal) => animal.category === category.id)
                        .map((animal: Animal) => (
                          <div 
                            key={animal.id} 
                            className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setActiveAnimal(animal)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                <Image 
                                  src={animal.imageUrls.main} 
                                  alt={animal.name}
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{animal.name}</h3>
                                {preferences.showScientificNames && (
                                  <p className="text-xs italic text-gray-500 dark:text-gray-400">
                                    {animal.scientificName}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="settings-section mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="scientificNames">Show Scientific Names</Label>
            <Switch 
              id="scientificNames" 
              checked={preferences.showScientificNames}
              onCheckedChange={(checked: boolean) => 
                setPreferences((prev: UserPreferences) => ({ ...prev, showScientificNames: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="soundEnabled">Sound Effects</Label>
            <Switch 
              id="soundEnabled" 
              checked={preferences.soundEnabled}
              onCheckedChange={(checked: boolean) => 
                setPreferences((prev: UserPreferences) => ({ ...prev, soundEnabled: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="autoPlay">Auto-Generate on Load</Label>
            <Switch 
              id="autoPlay" 
              checked={preferences.autoPlay}
              onCheckedChange={(checked: boolean) => 
                setPreferences((prev: UserPreferences) => ({ ...prev, autoPlay: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch 
              id="darkMode" 
              checked={preferences.darkMode}
              onCheckedChange={(checked: boolean) => 
                setPreferences((prev: UserPreferences) => ({ ...prev, darkMode: checked }))}
            />
          </div>
          
          <div>
            <Label htmlFor="imageQuality">Image Quality</Label>
            <Select
              value={preferences.imageQuality}
              onValueChange={(value: 'low' | 'medium' | 'high') => 
                setPreferences((prev: UserPreferences) => ({ ...prev, imageQuality: value }))}
            >
              <SelectTrigger id="imageQuality">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Faster)</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High (Best Quality)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="defaultCount">Default Animals Per Generation</Label>
            <Select
              value={preferences.defaultAnimalsPerGeneration.toString()}
              onValueChange={(value: string) => 
                setPreferences((prev: UserPreferences) => ({ ...prev, defaultAnimalsPerGeneration: parseInt(value) }))}
            >
              <SelectTrigger id="defaultCount">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num: number) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="generator-footer mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Our random animal generator contains over 500 animals with detailed information and high-quality images.</p>
        <p>Perfect for education, research, creative inspiration, or just for fun!</p>
      </div>
    </div>
  );
};

export default AnimalGenerator;
