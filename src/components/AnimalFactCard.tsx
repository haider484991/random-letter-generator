'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';
import { Animal } from './AnimalGenerator';
import { motion } from 'framer-motion';

interface AnimalFactCardProps {
  animal: Animal;
  onNewFact: () => void;
  currentFactIndex: number;
}

export const AnimalFactCard: React.FC<AnimalFactCardProps> = ({ 
  animal, 
  onNewFact,
  currentFactIndex
}) => {
  const currentFact = animal.funFacts[currentFactIndex % animal.funFacts.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-2 mb-3">
            <Badge variant="secondary" className="mt-1">Fun Fact</Badge>
            <h3 className="text-lg font-medium">{animal.name}</h3>
          </div>
          
          <motion.p 
            key={currentFactIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-600"
          >
            {currentFact}
          </motion.p>
        </CardContent>
        
        <CardFooter className="bg-muted/50 px-5 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNewFact}
            className="ml-auto flex items-center"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Next Fact
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnimalFactCard;
