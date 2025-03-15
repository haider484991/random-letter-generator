'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Info, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getConservationStatusColor } from '@/utils/animalUtils';
import React from 'react';

// Define the Animal interface here instead of importing it
export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: string;
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
  predators: string[];
  prey?: string[];
  socialStructure?: string;
  behavioralTraits: string[];
  imageUrls: {
    main: string;
    [key: string]: string;
  };
}

interface AnimalComparisonProps {
  animals: Animal[];
  onRemoveAnimal: (animalId: string) => void;
  onViewDetails: (animal: Animal) => void;
  showScientificNames: boolean;
}

export const AnimalComparison = ({
  animals,
  onRemoveAnimal,
  onViewDetails,
  showScientificNames
}: AnimalComparisonProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Return a placeholder message if no animals to compare
  if (animals.length === 0) {
    return (
      <div className="comparison-empty text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Animal Comparison</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Add animals to compare their characteristics, habitats, and other features side by side.
        </p>
        <div className="flex justify-center">
          <Button variant="outline">
            Go to Generator
          </Button>
        </div>
      </div>
    );
  }
  
  // Generate comparison table rows
  const generateComparisonRows = () => {
    // Define the properties to compare based on the active tab
    const properties: {
      label: string;
      key: string;
      render?: (animal: Animal) => React.ReactNode;
    }[] = activeTab === 'overview' ? [
      { 
        label: 'Category', 
        key: 'category'
      },
      { 
        label: 'Scientific Name', 
        key: 'scientificName'
      },
      { 
        label: 'Habitat', 
        key: 'habitat',
        render: (animal) => animal.habitat.join(', ')
      },
      { 
        label: 'Diet', 
        key: 'diet'
      },
      { 
        label: 'Lifespan', 
        key: 'lifespan'
      },
      { 
        label: 'Weight', 
        key: 'weight',
        render: (animal) => `${animal.size.weight.value} ${animal.size.weight.unit}`
      },
      { 
        label: 'Length', 
        key: 'length',
        render: (animal) => `${animal.size.length.value} ${animal.size.length.unit}`
      },
      { 
        label: 'Conservation Status', 
        key: 'conservationStatus',
        render: (animal) => (
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: getConservationStatusColor(animal.conservationStatus) }}
            ></div>
            {animal.conservationStatus}
          </div>
        )
      }
    ] : activeTab === 'taxonomy' ? [
      { 
        label: 'Kingdom', 
        key: 'kingdom',
        render: (animal) => animal.taxonomicClassification.kingdom
      },
      { 
        label: 'Phylum', 
        key: 'phylum',
        render: (animal) => animal.taxonomicClassification.phylum
      },
      { 
        label: 'Class', 
        key: 'class',
        render: (animal) => animal.taxonomicClassification.class
      },
      { 
        label: 'Order', 
        key: 'order',
        render: (animal) => animal.taxonomicClassification.order
      },
      { 
        label: 'Family', 
        key: 'family',
        render: (animal) => animal.taxonomicClassification.family
      },
      { 
        label: 'Genus', 
        key: 'genus',
        render: (animal) => animal.taxonomicClassification.genus
      },
      { 
        label: 'Species', 
        key: 'species',
        render: (animal) => animal.taxonomicClassification.species
      }
    ] : activeTab === 'habitat' ? [
      { 
        label: 'Primary Habitat', 
        key: 'primaryHabitat',
        render: (animal) => animal.habitat[0]
      },
      { 
        label: 'All Habitats', 
        key: 'allHabitats',
        render: (animal) => animal.habitat.join(', ')
      },
      { 
        label: 'Continents', 
        key: 'continents',
        render: (animal) => animal.continents.join(', ')
      },
      { 
        label: 'Distribution', 
        key: 'distribution',
        render: (animal) => animal.distribution.join(', ')
      },
      { 
        label: 'Adaptations', 
        key: 'adaptations',
        render: (animal) => (
          <ul className="list-disc list-inside text-sm">
            {animal.adaptations.slice(0, 3).map((adaptation: string, index: number) => (
              <li key={index}>{adaptation}</li>
            ))}
          </ul>
        )
      }
    ] : activeTab === 'behavior' ? [
      {
        label: 'Diet Type',
        key: 'dietType',
        render: (animal) => animal.diet
      },
      {
        label: 'Predators',
        key: 'predators',
        render: (animal) => animal.predators.join(', ')
      },
      {
        label: 'Prey',
        key: 'prey',
        render: (animal) => animal.prey?.join(', ') || 'N/A'
      },
      {
        label: 'Social Structure',
        key: 'socialStructure',
        render: (animal) => animal.socialStructure || 'N/A'
      },
      {
        label: 'Behavioral Traits',
        key: 'behavioralTraits',
        render: (animal) => (
          <ul className="list-disc list-inside text-sm">
            {animal.behavioralTraits.slice(0, 2).map((trait: string, index: number) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        )
      }
    ] : []; // For other tabs
    
    // Generate the rows
    return properties.map((property) => (
      <TableRow 
        key={property.key}
        className={activeFeature === property.key ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
        onMouseEnter={() => setActiveFeature(property.key)}
        onMouseLeave={() => setActiveFeature(null)}
      >
        <TableCell className="font-medium">{property.label}</TableCell>
        {animals.map((animal) => (
          <TableCell key={animal.id}>
            {property.render ? property.render(animal) : ((animal as unknown) as Record<string, React.ReactNode>)[property.key]}
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  
  return (
    <div className="animal-comparison mt-4">
      <div className="comparison-header mb-6">
        <h2 className="text-2xl font-bold">Animal Comparison</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Compare up to 3 animals side by side to see their similarities and differences.
        </p>
      </div>
      
      <div className="comparison-cards mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-800 shadow-sm"
                onClick={() => onRemoveAnimal(animal.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <Image 
                      src={animal.imageUrls.main} 
                      alt={animal.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-bold">{animal.name}</h3>
                    {showScientificNames && (
                      <p className="text-sm italic text-gray-500 dark:text-gray-400">{animal.scientificName}</p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{animal.category}</p>
                    
                    <div className="mt-2 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewDetails(animal)}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Placeholder card for adding more animals */}
          {animals.length < 3 && (
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-40 text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <p>Add another animal</p>
                <p className="text-sm">({3 - animals.length} more allowed)</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="habitat">Habitat</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="w-full">
          <div className="comparison-table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Feature</TableHead>
                  {animals.map((animal) => (
                    <TableHead key={animal.id}>{animal.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {generateComparisonRows()}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="comparison-insights mt-8">
        <h3 className="text-xl font-semibold mb-4">Comparison Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Size Comparison */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Size Comparison</h4>
                <BarChart2 className="h-5 w-5 text-gray-400" />
              </div>
              <Separator className="mb-4" />
              
              {animals.length > 1 ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Weight</p>
                      <div className="flex items-center h-8">
                        {animals.map((animal, index) => {
                          // Find max weight for scaling
                          const maxWeight = Math.max(...animals.map(a => a.size.weight.value));
                          const percentage = (animal.size.weight.value / maxWeight) * 100;
                          
                          return (
                            <div 
                              key={animal.id}
                              className="relative h-full ml-1 first:ml-0"
                              style={{ width: `${100 / animals.length}%` }}
                            >
                              <div 
                                className={`absolute bottom-0 left-0 right-2 rounded-t-sm ${
                                  index === 0 ? 'bg-blue-500' : 
                                  index === 1 ? 'bg-green-500' : 
                                  'bg-yellow-500'
                                }`}
                                style={{ height: `${percentage}%` }}
                              ></div>
                              <div className="absolute -bottom-6 left-0 right-2 text-center text-xs truncate">
                                {animal.size.weight.value} {animal.size.weight.unit}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <p className="text-sm font-medium mb-2">Length</p>
                      <div className="flex items-center h-8">
                        {animals.map((animal, index) => {
                          // Find max length for scaling
                          const maxLength = Math.max(...animals.map(a => a.size.length.value));
                          const percentage = (animal.size.length.value / maxLength) * 100;
                          
                          return (
                            <div 
                              key={animal.id}
                              className="relative h-full ml-1 first:ml-0"
                              style={{ width: `${100 / animals.length}%` }}
                            >
                              <div 
                                className={`absolute bottom-0 left-0 right-2 rounded-t-sm ${
                                  index === 0 ? 'bg-blue-500' : 
                                  index === 1 ? 'bg-green-500' : 
                                  'bg-yellow-500'
                                }`}
                                style={{ height: `${percentage}%` }}
                              ></div>
                              <div className="absolute -bottom-6 left-0 right-2 text-center text-xs truncate">
                                {animal.size.length.value} {animal.size.length.unit}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                    {animals.map((animal, index) => (
                      <div key={animal.id} className="flex items-center mb-1">
                        <div 
                          className={`w-3 h-3 mr-2 rounded-sm ${
                            index === 0 ? 'bg-blue-500' : 
                            index === 1 ? 'bg-green-500' : 
                            'bg-yellow-500'
                          }`}
                        ></div>
                        {animal.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add at least one more animal to compare sizes.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Habitat Comparison */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Habitat & Distribution</h4>
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <Separator className="mb-4" />
              
              {animals.length > 1 ? (
                <div className="space-y-4">
                  {/* Find common and unique habitats */}
                  {(() => {
                    const allHabitats = animals.flatMap(a => a.habitat);
                    const uniqueHabitats = [...new Set(allHabitats)];
                    
                    const habitatCounts = uniqueHabitats.map(habitat => ({
                      habitat,
                      count: animals.filter(a => a.habitat.includes(habitat)).length
                    }));
                    
                    const commonHabitats = habitatCounts
                      .filter(h => h.count === animals.length)
                      .map(h => h.habitat);
                      
                    const sharedHabitats = habitatCounts
                      .filter(h => h.count > 1 && h.count < animals.length)
                      .map(h => h.habitat);
                      
                    const uniqueHabitatsPerAnimal = animals.map(animal => {
                      return {
                        name: animal.name,
                        habitats: animal.habitat.filter(h => 
                          habitatCounts.find(hc => hc.habitat === h)?.count === 1
                        )
                      };
                    });
                    
                    return (
                      <>
                        {commonHabitats.length > 0 && (
                          <div>
                            <p className="text-sm font-medium">Common Habitats</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {commonHabitats.join(', ')}
                            </p>
                          </div>
                        )}
                        
                        {sharedHabitats.length > 0 && (
                          <div>
                            <p className="text-sm font-medium">Shared Habitats</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {sharedHabitats.join(', ')}
                            </p>
                          </div>
                        )}
                        
                        {uniqueHabitatsPerAnimal
                          .filter(a => a.habitats.length > 0)
                          .map(animal => (
                            <div key={animal.name}>
                              <p className="text-sm font-medium">Unique to {animal.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {animal.habitats.join(', ')}
                              </p>
                            </div>
                          ))
                        }
                        
                        {/* Continent overlap */}
                        <div className="mt-6">
                          <p className="text-sm font-medium">Continental Distribution</p>
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            {['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica']
                              .map(continent => {
                                const count = animals.filter(a => 
                                  a.continents.some(c => c.toLowerCase() === continent.toLowerCase())
                                ).length;
                                
                                return (
                                  <div 
                                    key={continent}
                                    className={`px-2 py-1 rounded text-xs ${
                                      count === 0 ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400' :
                                      count === animals.length ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                                    }`}
                                  >
                                    {continent} ({count}/{animals.length})
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add at least one more animal to compare habitats.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnimalComparison;
