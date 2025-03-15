'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Animal } from './AnimalGenerator';
import { habitats, continents } from '@/data/animalCategories';

interface AnimalHabitatMapProps {
  animal: Animal;
}

function AnimalHabitatMap({ animal }: AnimalHabitatMapProps) {
  // Get the habitat and continent names for display
  const animalHabitats = habitats.filter(h => 
    animal.habitats && animal.habitats.includes(h.id)
  );
  const animalContinents = continents.filter(c => 
    animal.continents && animal.continents.includes(c.id)
  );
  
  return (
    <div className="habitat-map-container">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Habitat & Distribution</h3>
          
          {/* World Map with highlighted continents */}
          <div className="relative w-full h-48 mb-4 bg-slate-100 rounded-md overflow-hidden">
            <div className="absolute inset-0 opacity-75">
              <Image 
                src="/images/world-map.svg" 
                alt="World Map" 
                fill 
                className="object-contain"
              />
            </div>
            
            {/* Highlight animal's continents */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <p className="text-sm text-gray-600">
                  {animal.name} can be found in: {animalContinents.map(c => c.name).join(', ')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Habitat icons */}
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-2">Primary Habitats:</h4>
            <div className="flex flex-wrap gap-2">
              {animalHabitats.map(habitat => (
                <div key={habitat.id} className="flex items-center bg-slate-100 rounded-full px-3 py-1">
                  <span className="mr-1">{habitat.icon}</span>
                  <span className="text-sm">{habitat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnimalHabitatMap;
