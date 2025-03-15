'use client';

import { useState } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  animalCategories, 
  habitats, 
  continents, 
  conservationStatuses, 
  dietTypes 
} from '@/data/animalCategories';
import { AnimalFilter } from './AnimalGenerator';

interface AnimalFiltersProps {
  filters: AnimalFilter;
  setFilters: (filters: AnimalFilter) => void;
  resetFilters: () => void;
}

export const AnimalFilters = ({
  filters,
  setFilters,
  resetFilters
}: AnimalFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [weightRange, setWeightRange] = useState<[number, number]>([
    filters.minWeight || 0,
    filters.maxWeight || 10000
  ]);
  
  // Function to update a specific filter array
  const updateFilterArray = (
    key: keyof Pick<AnimalFilter, 'categories' | 'habitats' | 'continents' | 'conservationStatus' | 'dietTypes'>,
    value: string
  ) => {
    const currentArray = [...filters[key]];
    const index = currentArray.indexOf(value);
    
    if (index > -1) {
      // Remove the value if it exists
      currentArray.splice(index, 1);
    } else {
      // Add the value if it doesn't exist
      currentArray.push(value);
    }
    
    setFilters({
      ...filters,
      [key]: currentArray
    });
  };
  
  // Handle search submission
  const handleSearch = () => {
    setFilters({
      ...filters,
      searchTerm: searchTerm.trim()
    });
  };
  
  // Handle search input keypress
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Handle weight range change
  const handleWeightRangeChange = (values: number[]) => {
    setWeightRange([values[0], values[1]]);
    
    // Debounce the filter update
    const timeoutId = setTimeout(() => {
      setFilters({
        ...filters,
        minWeight: values[0],
        maxWeight: values[1]
      });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };
  
  // Remove a single filter
  const removeFilter = (
    key: keyof Pick<AnimalFilter, 'categories' | 'habitats' | 'continents' | 'conservationStatus' | 'dietTypes'>,
    value: string
  ) => {
    const currentArray = [...filters[key]];
    const index = currentArray.indexOf(value);
    
    if (index > -1) {
      currentArray.splice(index, 1);
      setFilters({
        ...filters,
        [key]: currentArray
      });
    }
  };
  
  // Count active filters
  const activeFilterCount = 
    filters.categories.length + 
    filters.habitats.length + 
    filters.continents.length + 
    filters.conservationStatus.length + 
    filters.dietTypes.length + 
    (filters.searchTerm ? 1 : 0) + 
    (filters.minWeight !== undefined || filters.maxWeight !== undefined ? 1 : 0);
  
  return (
    <div className="animal-filters border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            disabled={activeFilterCount === 0}
          >
            Clear All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="search-filter">
          <Label htmlFor="search" className="text-sm font-medium mb-1 block">
            Search
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                type="text" 
                placeholder="Search animals..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyPress}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-7 w-7"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      ...filters,
                      searchTerm: ''
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        
        {/* Category Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Categories {filters.categories.length > 0 ? `(${filters.categories.length})` : ''}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {animalCategories.map((category: { id: string; name: string }) => (
                      <CommandItem
                        key={category.id}
                        onSelect={() => updateFilterArray('categories', category.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={filters.categories.includes(category.id)}
                            id={`category-${category.id}`}
                            onCheckedChange={() => updateFilterArray('categories', category.id)}
                          />
                          <Label
                            htmlFor={`category-${category.id}`}
                            className="cursor-pointer"
                          >
                            {category.name}
                          </Label>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Habitat Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Habitats {filters.habitats.length > 0 ? `(${filters.habitats.length})` : ''}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Command>
              <CommandInput placeholder="Search habitats..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {habitats.map((habitat: { id: string; name: string }) => (
                      <CommandItem
                        key={habitat.id}
                        onSelect={() => updateFilterArray('habitats', habitat.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={filters.habitats.includes(habitat.id)}
                            id={`habitat-${habitat.id}`}
                            onCheckedChange={() => updateFilterArray('habitats', habitat.id)}
                          />
                          <Label
                            htmlFor={`habitat-${habitat.id}`}
                            className="cursor-pointer"
                          >
                            {habitat.name}
                          </Label>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Continent Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Continents {filters.continents.length > 0 ? `(${filters.continents.length})` : ''}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {continents.map((continent: { id: string; name: string }) => (
                    <CommandItem
                      key={continent.id}
                      onSelect={() => updateFilterArray('continents', continent.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.continents.includes(continent.id)}
                          id={`continent-${continent.id}`}
                          onCheckedChange={() => updateFilterArray('continents', continent.id)}
                        />
                        <Label
                          htmlFor={`continent-${continent.id}`}
                          className="cursor-pointer"
                        >
                          {continent.name}
                        </Label>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Conservation Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Conservation Status {filters.conservationStatus.length > 0 ? `(${filters.conservationStatus.length})` : ''}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {conservationStatuses.map((status: { id: string; name: string; color: string }) => (
                    <CommandItem
                      key={status.id}
                      onSelect={() => updateFilterArray('conservationStatus', status.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.conservationStatus.includes(status.id)}
                          id={`status-${status.id}`}
                          onCheckedChange={() => updateFilterArray('conservationStatus', status.id)}
                        />
                        <Label
                          htmlFor={`status-${status.id}`}
                          className="cursor-pointer"
                        >
                          {status.name}
                        </Label>
                        <div 
                          className="w-3 h-3 rounded-full ml-auto" 
                          style={{ backgroundColor: status.color }}
                        ></div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Diet Type Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Diet Types {filters.dietTypes.length > 0 ? `(${filters.dietTypes.length})` : ''}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {dietTypes.map((diet: { id: string; name: string }) => (
                    <CommandItem
                      key={diet.id}
                      onSelect={() => updateFilterArray('dietTypes', diet.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.dietTypes.includes(diet.id)}
                          id={`diet-${diet.id}`}
                          onCheckedChange={() => updateFilterArray('dietTypes', diet.id)}
                        />
                        <Label
                          htmlFor={`diet-${diet.id}`}
                          className="cursor-pointer"
                        >
                          {diet.name}
                        </Label>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Weight Range Filter */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="weight-range">
              <AccordionTrigger className="text-sm font-medium">
                Weight Range (kg)
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 px-1">
                  <div className="pb-6">
                    <Slider 
                      defaultValue={[weightRange[0], weightRange[1]]} 
                      max={10000} 
                      step={1} 
                      onValueChange={handleWeightRangeChange}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{weightRange[0]} kg</span>
                    <span>{weightRange[1]} kg</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Search: {filters.searchTerm}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      ...filters,
                      searchTerm: ''
                    });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {(filters.minWeight !== undefined || filters.maxWeight !== undefined) && (
              <Badge variant="secondary" className="flex gap-1 items-center">
                Weight: {filters.minWeight || 0} - {filters.maxWeight || 10000} kg
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setWeightRange([0, 10000]);
                    setFilters({
                      ...filters,
                      minWeight: undefined,
                      maxWeight: undefined
                    });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {filters.categories.map((cat: string) => {
              const category = animalCategories.find((c: { id: string }) => c.id === cat);
              return (
                <Badge key={cat} variant="secondary" className="flex gap-1 items-center">
                  Category: {category?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter('categories', cat)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
            
            {filters.habitats.map((hab: string) => {
              const habitat = habitats.find((h: { id: string }) => h.id === hab);
              return (
                <Badge key={hab} variant="secondary" className="flex gap-1 items-center">
                  Habitat: {habitat?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter('habitats', hab)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
            
            {filters.continents.map((cont: string) => {
              const continent = continents.find((c: { id: string }) => c.id === cont);
              return (
                <Badge key={cont} variant="secondary" className="flex gap-1 items-center">
                  Continent: {continent?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter('continents', cont)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
            
            {filters.conservationStatus.map((stat: string) => {
              const status = conservationStatuses.find((s: { id: string }) => s.id === stat);
              return (
                <Badge key={stat} variant="secondary" className="flex gap-1 items-center">
                  Status: {status?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter('conservationStatus', stat)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
            
            {filters.dietTypes.map((d: string) => {
              const diet = dietTypes.find((dt: { id: string }) => dt.id === d);
              return (
                <Badge key={d} variant="secondary" className="flex gap-1 items-center">
                  Diet: {diet?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeFilter('dietTypes', d)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalFilters;
