import { FC } from 'react';

interface AnimalFactCardProps {
  fact: string | { id: string; text: string; category: string };
  onNext?: () => void;
}

declare const AnimalFactCard: FC<AnimalFactCardProps>;
export default AnimalFactCard;
