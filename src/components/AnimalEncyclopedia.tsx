'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, Info, Tag, Globe, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Animal } from './AnimalGenerator';
import { getConservationStatusColor } from '@/utils/animalUtils';

interface AnimalEncyclopediaProps {
  allAnimals: Animal[];
  onViewDetails: (animal: Animal) => void;
  showScientificNames: boolean;
}

export const AnimalEncyclopedia = ({
  allAnimals,
  onViewDetails,
  showScientificNames
}: AnimalEncyclopediaProps) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(allAnimals);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConservationStatus, setSelectedConservationStatus] = useState<string>('all');
  
  // Derived data
  const categories = [
    { id: 'all', name: 'All Categories' },
    ...Array.from(new Set(allAnimals.map(animal => animal.category)))
      .map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1)
      }))
  ];
  
  const continents = [
    { id: 'all', name: 'All Continents' },
    ...Array.from(new Set(allAnimals.flatMap(animal => animal.continents)))
      .sort()
      .map(continent => ({
        id: continent.toLowerCase(),
        name: continent
      }))
  ];
  
  const conservationStatuses = [
    { id: 'all', name: 'All Statuses' },
    ...Array.from(new Set(allAnimals.map(animal => animal.conservationStatus)))
      .sort()
      .map(status => ({
        id: status.toLowerCase().replace(/\s+/g, '-'),
        name: status
      }))
  ];
  
  // Filter animals based on search and filter criteria
  useEffect(() => {
    const filterAnimals = () => {
      let results = [...allAnimals];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(animal => 
          animal.name.toLowerCase().includes(query) ||
          animal.scientificName.toLowerCase().includes(query) ||
          animal.description.toLowerCase().includes(query) ||
          animal.funFacts.some(fact => fact.toLowerCase().includes(query))
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        results = results.filter(animal => animal.category === selectedCategory);
      }
      
      // Filter by continent
      if (selectedContinent !== 'all') {
        results = results.filter(animal => 
          animal.continents.some(continent => 
            continent.toLowerCase() === selectedContinent
          )
        );
      }
      
      // Filter by conservation status
      if (selectedConservationStatus !== 'all') {
        results = results.filter(animal => 
          animal.conservationStatus.toLowerCase().replace(/\s+/g, '-') === selectedConservationStatus
        );
      }
      
      // Sort results
      switch (sortBy) {
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          results.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'weight':
          results.sort((a, b) => a.size.weight.value - b.size.weight.value);
          break;
        case 'weight-desc':
          results.sort((a, b) => b.size.weight.value - a.size.weight.value);
          break;
        case 'endangered':
          // Custom sort for conservation status severity
          const statusOrder = {
            'Least Concern': 0,
            'Near Threatened': 1,
            'Vulnerable': 2,
            'Endangered': 3,
            'Critically Endangered': 4,
            'Extinct in the Wild': 5,
            'Extinct': 6
          };
          
          results.sort((a, b) => {
            const statusA = statusOrder[a.conservationStatus as keyof typeof statusOrder] || 0;
            const statusB = statusOrder[b.conservationStatus as keyof typeof statusOrder] || 0;
            return statusB - statusA; // Most endangered first
          });
          break;
      }
      
      setFilteredAnimals(results);
    };
    
    filterAnimals();
  }, [allAnimals, searchQuery, selectedCategory, selectedContinent, selectedConservationStatus, sortBy]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedContinent('all');
    setSelectedConservationStatus('all');
    setSortBy('name');
  };
  
  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mammal':
        return '🦁';
      case 'bird':
        return '🦅';
      case 'reptile':
        return '🦎';
      case 'amphibian':
        return '🐸';
      case 'fish':
        return '🐠';
      case 'insect':
        return '🦋';
      case 'arachnid':
        return '🕷️';
      case 'marine':
        return '🐙';
      default:
        return '🦓';
    }
  };
  
  return (
    <div className="animal-encyclopedia">
      <div className="encyclopedia-header mb-6">
        <h2 className="text-2xl font-bold">Animal Encyclopedia</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Explore a comprehensive library of animal species, learn about their habitats, behaviors, and conservation status.
        </p>
        
        <div className="search-filter-container flex flex-col md:flex-row gap-4">
          <div className="search-container relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search animals by name, species, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="weight">Weight (Lightest)</SelectItem>
                <SelectItem value="weight-desc">Weight (Heaviest)</SelectItem>
                <SelectItem value="endangered">Conservation Status</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
            >
              <Filter size={18} />
            </Button>
            
            <div className="view-toggle hidden md:flex border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveView('grid')}
                className={`rounded-none ${activeView === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveView('list')}
                className={`rounded-none ${activeView === 'list' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="filters-panel mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.id !== 'all' && getCategoryIcon(category.id)} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium mb-1">Continent</label>
                <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select continent" />
                  </SelectTrigger>
                  <SelectContent>
                    {continents.map(continent => (
                      <SelectItem key={continent.id} value={continent.id}>
                        {continent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium mb-1">Conservation Status</label>
                <Select value={selectedConservationStatus} onValueChange={setSelectedConservationStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {conservationStatuses.map(status => (
                      <SelectItem key={status.id} value={status.id}>
                        <div className="flex items-center">
                          {status.id !== 'all' && (
                            <div 
                              className="w-2 h-2 rounded-full mr-2" 
                              style={{ backgroundColor: getConservationStatusColor(status.name) }}
                            ></div>
                          )}
                          {status.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find(c => c.id === selectedCategory)?.name}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              
              {selectedContinent !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Continent: {continents.find(c => c.id === selectedContinent)?.name}
                  <button 
                    onClick={() => setSelectedContinent('all')}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              
              {selectedConservationStatus !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {conservationStatuses.find(s => s.id === selectedConservationStatus)?.name}
                  <button 
                    onClick={() => setSelectedConservationStatus('all')}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="encyclopedia-content">
        <div className="results-stats mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredAnimals.length} of {allAnimals.length} animals
          </p>
          
          {searchQuery && (
            <Badge variant="outline" className="text-xs">
              Search: "{searchQuery}"
            </Badge>
          )}
        </div>
        
        {filteredAnimals.length === 0 ? (
          <div className="no-results p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <HelpCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold mb-2">No animals found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : activeView === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAnimals.map(animal => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onViewDetails(animal)}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={animal.imageUrls.main} 
                      alt={animal.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge 
                        className="px-2 py-1"
                        style={{ 
                          backgroundColor: getConservationStatusColor(animal.conservationStatus),
                          color: '#fff',
                        }}
                      >
                        {animal.conservationStatus}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4 flex-grow">
                    <h3 className="font-bold">{animal.name}</h3>
                    {showScientificNames && (
                      <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
                        {animal.scientificName}
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Tag size={14} className="mr-1" /> {animal.category}
                    </div>
                    
                    <p className="text-sm line-clamp-2">
                      {animal.description.substring(0, 100)}...
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-0 pb-4">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {animal.habitat.slice(0, 2).map(habitat => (
                        <Badge key={habitat} variant="outline" className="px-2 py-0.5">
                          {habitat}
                        </Badge>
                      ))}
                      {animal.habitat.length > 2 && (
                        <Badge variant="outline" className="px-2 py-0.5">
                          +{animal.habitat.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnimals.map(animal => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row cursor-pointer"
                       onClick={() => onViewDetails(animal)}>
                    <div className="relative h-32 md:w-48 overflow-hidden">
                      <Image 
                        src={animal.imageUrls.main} 
                        alt={animal.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge 
                          className="px-2 py-1 text-xs"
                          style={{ 
                            backgroundColor: getConservationStatusColor(animal.conservationStatus),
                            color: '#fff',
                          }}
                        >
                          {animal.conservationStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{animal.name}</h3>
                            {showScientificNames && (
                              <p className="text-sm italic text-gray-500 dark:text-gray-400">
                                {animal.scientificName}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <Badge variant="secondary" className="px-2 py-0.5">
                              {animal.category}
                            </Badge>
                            <Badge variant="outline" className="px-2 py-0.5">
                              {animal.diet}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm mt-2 line-clamp-2 md:line-clamp-1">
                          {animal.description.substring(0, 120)}...
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Globe size={14} className="mr-1" />
                          {animal.continents.slice(0, 3).join(', ')}
                          {animal.continents.length > 3 && '...'}
                        </div>
                        
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                          View Details
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="encyclopedia-featured mt-10">
        <h3 className="text-xl font-semibold mb-4">Featured Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Endangered Species', 'Marine Life', 'Rainforest Animals'].map((category, index) => (
            <Card key={category} className="overflow-hidden">
              <div 
                className="relative h-40 w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/images/featured-${index + 1}.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h4 className="text-xl font-bold mb-2">{category}</h4>
                    <p className="text-sm opacity-90">Explore the diverse world of {category.toLowerCase()}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 text-white border-white hover:bg-white/20"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="encyclopedia-facts mt-10">
        <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <Tabs defaultValue="fact1">
            <TabsList className="mb-4">
              <TabsTrigger value="fact1">Fact 1</TabsTrigger>
              <TabsTrigger value="fact2">Fact 2</TabsTrigger>
              <TabsTrigger value="fact3">Fact 3</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fact1">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/fact-1.jpg" 
                    alt="Animal Fact" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-2">The Hidden World of Animal Communication</h4>
                  <p>
                    Animals communicate in ways far beyond human perception. Elephants use infrasound 
                    that can travel for miles, while dolphins use echolocation to navigate and hunt. 
                    Bees perform elaborate dances to share the location of food sources, and many 
                    species use pheromones to communicate complex social information.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fact2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/fact-2.jpg" 
                    alt="Animal Fact" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-2">Remarkable Animal Adaptations</h4>
                  <p>
                    The natural world is full of incredible adaptations. Tardigrades can survive in 
                    space, mantis shrimp can see colors we can't imagine, and certain frogs can 
                    freeze solid during winter and thaw back to life in spring. These remarkable 
                    adaptations have evolved over millions of years to allow species to thrive in 
                    their unique environments.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fact3">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/fact-3.jpg" 
                    alt="Animal Fact" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-2">The Intelligence of Crows</h4>
                  <p>
                    Crows are among the most intelligent animals on Earth. They can use tools, 
                    recognize human faces, solve complex puzzles, and even understand cause and 
                    effect. Some studies suggest they have intelligence comparable to that of a 
                    7-year-old human child. They also hold "funerals" for their dead and pass 
                    knowledge through generations.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AnimalEncyclopedia;
