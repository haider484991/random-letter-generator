'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Download, Share2, Volume2, BarChart2 } from 'lucide-react';
import AnimalHabitatMap from './AnimalHabitatMap';
import AnimalSoundPlayer from './AnimalSoundPlayer';
import { Animal, UserPreferences } from './AnimalGenerator';
import { getConservationStatusColor } from '@/utils/animalUtils';

interface AnimalDetailsProps {
  animal: Animal;
  onAddToFavorites: () => void;
  isFavorite: boolean;
  onAddToComparison: () => void;
  preferences: UserPreferences;
}

export const AnimalDetails = ({
  animal,
  onAddToFavorites,
  isFavorite,
  onAddToComparison,
  preferences
}: AnimalDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllFacts, setShowAllFacts] = useState(false);
  
  // Conservation status color
  const statusColor = getConservationStatusColor(animal.conservationStatus);
  
  // All images including main and additional
  const allImages = [animal.imageUrls.main, ...animal.imageUrls.additional];
  
  // Function to share animal information
  const shareAnimal = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${animal.name} - Animal Facts`,
          text: `Check out this amazing animal: ${animal.name} (${animal.scientificName}). ${animal.description}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(
          `${animal.name} - ${animal.scientificName}\n${animal.description}\n\nLearn more about ${animal.name} and other animals at our Random Animal Generator!`
        );
        alert('Information copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing animal:', error);
    }
  };
  
  // Function to download animal information as text file
  const downloadInfo = () => {
    const animalInfo = `
ANIMAL INFORMATION
Name: ${animal.name}
Scientific Name: ${animal.scientificName}
${animal.taxonomy ? `
TAXONOMY
Kingdom: ${animal.taxonomy.kingdom}
Phylum: ${animal.taxonomy.phylum}
Class: ${animal.taxonomy.class}
Order: ${animal.taxonomy.order}
Family: ${animal.taxonomy.family}
Genus: ${animal.taxonomy.genus}
Species: ${animal.taxonomy.species}
` : ''}

DESCRIPTION
${animal.description}

HABITAT
${animal.habitats ? animal.habitats.join(', ') : 'Unknown'}

DISTRIBUTION
${animal.continents ? animal.continents.join(', ') : 'Unknown'}

DIET
${animal.diet || 'Unknown'}

LIFESPAN
${animal.lifespan ? `${animal.lifespan.min}-${animal.lifespan.max} years` : 'Unknown'}

SIZE
${animal.height ? `Height: ${animal.height.min}-${animal.height.max} ${animal.height.unit}` : 'Height: Unknown'}
${animal.weight ? `Weight: ${animal.weight.min}-${animal.weight.max} ${animal.weight.unit}` : 'Weight: Unknown'}

${animal.behaviors ? `BEHAVIORS\n${animal.behaviors.join('\n')}\n\n` : ''}

${animal.predators ? `PREDATORS\n${animal.predators.join('\n')}\n\n` : ''}

${animal.prey ? `PREY\n${animal.prey.join('\n')}\n\n` : ''}

CONSERVATION
Status: ${animal.conservationStatus || 'Unknown'}

INTERESTING FACTS
${animal.funFacts ? animal.funFacts.join('\n') : 'No facts available'}
    `;
    
    const blob = new Blob([animalInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${animal.name.toLowerCase().replace(/\s+/g, '-')}-info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="animal-details">
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="habitat">Habitat & Distribution</TabsTrigger>
          <TabsTrigger value="facts">Facts & Features</TabsTrigger>
          <TabsTrigger value="conservation">Conservation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="relative h-72 w-full rounded-lg overflow-hidden">
                <Image 
                  src={animal.imageUrls.main} 
                  alt={animal.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant={isFavorite ? "default" : "outline"} 
                    onClick={onAddToFavorites}
                    className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Favorited" : "Add to Favorites"}
                  </Button>
                  
                  <Button variant="outline" onClick={onAddToComparison}>
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Add to Comparison
                  </Button>
                </div>
                
                {animal.soundUrl && (
                  <Button variant="ghost" className="px-2">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={shareAnimal}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button variant="outline" size="sm" onClick={downloadInfo}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Info
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">{animal.name}</h2>
              {preferences.showScientificNames && (
                <p className="text-md italic text-gray-500 dark:text-gray-400 mb-2">{animal.scientificName}</p>
              )}
              
              <div 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4" 
                style={{ backgroundColor: statusColor }}
              >
                {animal.conservationStatus}
              </div>
              
              <p className="mb-4 text-gray-700 dark:text-gray-300">{animal.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Classification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{animal.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Habitat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{animal.habitats ? animal.habitats.join(', ') : 'Unknown'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Diet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{animal.diet || 'Unknown'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Lifespan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{animal.lifespan ? `${animal.lifespan.min}-${animal.lifespan.max} years` : 'Unknown'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Size</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {animal.height ? `Height: ${animal.height.min}-${animal.height.max} ${animal.height.unit}` : 'Height: Unknown'}
                    {animal.weight ? `, Weight: ${animal.weight.min}-${animal.weight.max} ${animal.weight.unit}` : ', Weight: Unknown'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Distribution</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{animal.continents ? animal.continents.join(', ') : 'Unknown'}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-semibold mb-2">Fun Facts</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {animal.funFacts ? animal.funFacts.slice(0, showAllFacts ? animal.funFacts.length : 3).map((fact, index) => (
                  <li key={index}>{fact}</li>
                )) : <li>No facts available</li>}
              </ul>
              
              {animal.funFacts && animal.funFacts.length > 3 && (
                <Button 
                  variant="link" 
                  className="mt-1 p-0 h-auto text-sm"
                  onClick={() => setShowAllFacts(!showAllFacts)}
                >
                  {showAllFacts ? "Show Less" : "Show More Facts"}
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image 
              src={allImages[activeImageIndex]} 
              alt={`${animal.name} - Image ${activeImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2 gap-2">
            {allImages.map((img, index) => (
              <div 
                key={index} 
                className={`relative h-20 w-20 min-w-20 rounded-md overflow-hidden cursor-pointer ${
                  index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image 
                  src={img} 
                  alt={`${animal.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            High-quality images of {animal.name} in its natural habitat.
          </p>
        </TabsContent>
        
        <TabsContent value="taxonomy" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Taxonomic Classification</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Kingdom:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.kingdom : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Phylum:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.phylum : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Class:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.class : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Order:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.order : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Family:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.family : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Genus:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.genus : 'Unknown'}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-medium">Species:</span>
                  <span>{animal.taxonomy ? animal.taxonomy.species : 'Unknown'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Physical Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Size</h4>
                <p className="text-sm">
                  <span className="font-medium">Height:</span> {animal.height ? `${animal.height.min}-${animal.height.max} ${animal.height.unit}` : 'Unknown'}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Weight:</span> {animal.weight ? `${animal.weight.min}-${animal.weight.max} ${animal.weight.unit}` : 'Unknown'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Adaptations</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {animal.behaviors ? animal.behaviors.slice(0, 3).map((behavior, index) => (
                    <li key={index}>{behavior}</li>
                  )) : <li>No adaptations available</li>}
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Interesting Features</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {animal.funFacts ? animal.funFacts.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) : <li>No features available</li>}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="habitat" className="space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Habitat</h3>
            <p className="mb-4">{animal.habitats ? animal.habitats.join(', ') : 'Unknown'}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Continents</h4>
                <div className="flex flex-wrap gap-2">
                  {animal.continents ? animal.continents.map((continent, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                    >
                      {continent}
                    </span>
                  )) : <span>Unknown</span>}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Distribution</h4>
                <ul className="list-disc list-inside text-sm">
                  {animal.continents ? animal.continents.map((area, index) => (
                    <li key={index}>{area}</li>
                  )) : <li>Unknown</li>}
                </ul>
              </div>
            </div>
            
            <div className="h-64 w-full rounded-lg overflow-hidden mb-4">
              <AnimalHabitatMap
                animal={animal}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Behavioral Traits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Behavior</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {animal.behaviors ? animal.behaviors.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  )) : <li>No behaviors available</li>}
                </ul>
              </div>
              
              {animal.socialStructure && (
                <div className="space-y-2">
                  <h4 className="font-medium">Social Structure</h4>
                  <p className="text-sm">{animal.socialStructure}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <h4 className="font-medium">Predators</h4>
              <ul className="list-disc list-inside text-sm">
                {animal.predators ? animal.predators.map((predator, index) => (
                  <li key={index}>{predator}</li>
                )) : <li>No predators available</li>}
              </ul>
            </div>
            
            {animal.prey && animal.prey.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Prey</h4>
                <ul className="list-disc list-inside text-sm">
                  {animal.prey.map((prey, index) => (
                    <li key={index}>{prey}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="facts" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Fun Facts</h3>
            <div className="grid grid-cols-1 gap-3">
              {animal.funFacts ? animal.funFacts.map((fact, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <p>
                      <span className="font-bold text-blue-600 dark:text-blue-400">#{index + 1}:</span> {fact}
                    </p>
                  </CardContent>
                </Card>
              )) : <Card>
                <CardContent className="pt-4">
                  <p>No facts available</p>
                </CardContent>
              </Card>}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Did You Know?</h3>
            <div className="grid grid-cols-1 gap-3">
              {animal.didYouKnow ? animal.didYouKnow.map((fact, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <p>
                      <span className="font-bold text-green-600 dark:text-green-400">Fact #{index + 1}:</span> {fact}
                    </p>
                  </CardContent>
                </Card>
              )) : <Card>
                <CardContent className="pt-4">
                  <p>No facts available</p>
                </CardContent>
              </Card>}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Adaptations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {animal.adaptations ? animal.adaptations.map((adaptation, index) => (
                <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm">{adaptation}</p>
                </div>
              )) : <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">No adaptations available</p>
              </div>}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Interesting Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {animal.funFacts ? animal.funFacts.map((feature, index) => (
                <div key={index} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm">{feature}</p>
                </div>
              )) : <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm">No features available</p>
              </div>}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="conservation" className="space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Conservation Status</h3>
            <div 
              className="inline-block px-4 py-2 rounded-lg text-white font-medium mb-4" 
              style={{ backgroundColor: statusColor }}
            >
              {animal.conservationStatus || 'Unknown'}
            </div>
            
            <p className="mb-4">
              This rating is based on the IUCN Red List of Threatened Species, the world's most comprehensive inventory of the global conservation status of plant and animal species.
            </p>
          </div>
          
          {animal.endangeredStatus && (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Threats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {animal.endangeredStatus.threats ? animal.endangeredStatus.threats.map((threat, index) => (
                    <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm">{threat}</p>
                    </div>
                  )) : <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm">No threats available</p>
                  </div>}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Conservation Efforts</h3>
                <div className="grid grid-cols-1 gap-3">
                  {animal.endangeredStatus.conservationEfforts ? animal.endangeredStatus.conservationEfforts.map((effort, index) => (
                    <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm">{effort}</p>
                    </div>
                  )) : <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm">No conservation efforts available</p>
                  </div>}
                </div>
              </div>
            </>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">How You Can Help</h3>
            <p className="text-sm mb-2">
              Conservation of wildlife species like the {animal.name} requires collective effort. Here are some ways you can contribute:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Support wildlife conservation organizations that protect {animal.name} habitats</li>
              <li>Reduce your environmental footprint</li>
              <li>Learn more about {animal.name} and educate others</li>
              <li>Advocate for stronger wildlife protection laws</li>
              <li>Participate in citizen science projects that monitor {animal.name} populations</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnimalDetails;
