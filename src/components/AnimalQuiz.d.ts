import { FC } from 'react';
import { Animal } from '../data/animalDatabase';

interface AnimalQuizProps {
  allAnimals: Animal[];
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

declare const AnimalQuiz: FC<AnimalQuizProps>;
export default AnimalQuiz;
