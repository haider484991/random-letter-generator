import { FC } from 'react';
import { Animal } from '../data/animalDatabase';

interface AnimalDetailsProps {
  animal: Animal;
  onClose?: () => void;
  showScientificName?: boolean;
}

declare const AnimalDetails: FC<AnimalDetailsProps>;
export default AnimalDetails;
