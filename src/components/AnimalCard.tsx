'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Info, BarChart2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Animal } from './AnimalGenerator';
import { getConservationStatusColor } from '@/utils/animalUtils';

interface AnimalCardProps {
  animal: Animal;
  isActive: boolean;
  isFavorite: boolean;
  isComparing: boolean;
  showScientificName: boolean;
  onClick: () => void;
  onFavoriteToggle: () => void;
  onAddToComparison: () => void;
}

export const AnimalCard = ({
  animal,
  isActive,
  isFavorite,
  isComparing,
  showScientificName,
  onClick,
  onFavoriteToggle,
  onAddToComparison
}: AnimalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Get the primary fact to display on the card
  const primaryFact = animal.funFacts && animal.funFacts.length > 0
    ? animal.funFacts[0]
    : animal.description.substring(0, 100) + '...';
    
  // Get conservation status color
  const statusColor = getConservationStatusColor(animal.conservationStatus);
    
  return (
    <motion.div
      className={cn(
        "animal-card relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
        isActive && "ring-2 ring-blue-500",
        isComparing && "ring-2 ring-yellow-500"
      )}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {!imageError ? (
          <Image 
            src={animal.imageUrls.main} 
            alt={animal.name}
            fill
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center h-full">
            <span className="text-gray-500 dark:text-gray-400">Image unavailable</span>
          </div>
        )}
        
        {/* Conservation status badge */}
        <div 
          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white" 
          style={{ backgroundColor: statusColor }}
        >
          {animal.conservationStatus}
        </div>
        
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white text-center p-4">
            <p className="font-bold">{animal.name}</p>
            {showScientificName && (
              <p className="text-sm italic">{animal.scientificName}</p>
            )}
          </div>
        </motion.div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{animal.name}</h3>
            {showScientificName && (
              <p className="text-sm italic text-gray-500 dark:text-gray-400">{animal.scientificName}</p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{animal.category}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
            }}
            className={cn(
              "h-8 w-8", 
              isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"
            )}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </Button>
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 dark:text-blue-100 text-blue-800 text-xs rounded-full">
            {animal.diet}
          </span>
          <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 dark:text-green-100 text-green-800 text-xs rounded-full">
            {animal.habitat ? animal.habitat[0] : animal.habitats?.[0]}
          </span>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {primaryFact}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToComparison();
              }}
              className={isComparing ? "bg-yellow-100 dark:bg-yellow-900" : ""}
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              Compare
            </Button>
          </div>
          
          {(animal.soundUrl || (animal.sounds && animal.sounds.length > 0)) && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                // Play sound functionality will be implemented separately
              }}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalCard;
