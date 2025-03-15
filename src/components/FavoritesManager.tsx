'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { Animal } from '@/types/animal';
import { motion } from 'framer-motion';

interface FavoritesManagerProps {
  favorites: Animal[];
  onRemoveFavorite: (animal: Animal) => void;
  onViewAnimal: (animal: Animal) => void;
}

export const FavoritesManager: React.FC<FavoritesManagerProps> = ({ 
  favorites, 
  onRemoveFavorite,
  onViewAnimal
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          Favorite Animals
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {favorites.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            You haven&apos;t added any favorites yet. Click the heart icon on an animal card to add it to your favorites.
          </p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((animal) => (
              <motion.li 
                key={animal.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
              >
                <div className="flex items-center">
                  <span className="font-medium">{animal.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{animal.category}</span>
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => onViewAnimal(animal)}
                    aria-label={`View ${animal.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100" 
                    onClick={() => onRemoveFavorite(animal)}
                    aria-label={`Remove ${animal.name} from favorites`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesManager;
