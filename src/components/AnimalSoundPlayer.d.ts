import { FC } from 'react';

interface AnimalSoundPlayerProps {
  sounds: string[];
  autoPlay?: boolean;
}

declare const AnimalSoundPlayer: FC<AnimalSoundPlayerProps>;
export default AnimalSoundPlayer;
