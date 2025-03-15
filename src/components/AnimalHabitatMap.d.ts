import { FC } from 'react';

interface AnimalHabitatMapProps {
  continents: string[];
  habitats: string[];
}

declare const AnimalHabitatMap: FC<AnimalHabitatMapProps>;
export default AnimalHabitatMap;
