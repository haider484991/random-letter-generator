'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Animal } from './AnimalGenerator';

interface AnimalSoundPlayerProps {
  animal: Animal;
}

interface Sound {
  name: string;
  main: string;
}

function AnimalSoundPlayer({ animal }: AnimalSoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check if animal has sounds
  const hasSounds = animal.sounds && animal.sounds.length > 0;
  
  // Handle play/pause
  const togglePlay = () => {
    if (!hasSounds) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle sound ended
  const handleSoundEnded = () => {
    setIsPlaying(false);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Change to a specific sound
  const changeSound = (index: number) => {
    if (!hasSounds || index >= (animal.sounds?.length || 0)) return;
    
    setCurrentSound(index);
    setIsPlaying(false);
    
    // We'll start playing it after the src is updated and component re-renders
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 0);
  };
  
  if (!hasSounds) {
    return (
      <Card className="p-4 mt-2">
        <p className="text-sm text-muted-foreground">No sounds available for this animal.</p>
      </Card>
    );
  }
  
  return (
    <div className="animal-sound-player">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <div className="flex-1">
            <p className="text-sm font-medium">
              {animal.sounds?.[currentSound]?.name || "Animal Sound"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <div className="w-24">
              <Slider
                defaultValue={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
        
        {/* Sound selector if multiple sounds */}
        {animal.sounds && animal.sounds.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {animal.sounds.map((sound: Sound, index: number) => (
              <Button
                key={index}
                variant={currentSound === index ? "default" : "outline"}
                size="sm"
                onClick={() => changeSound(index)}
              >
                {sound.name}
              </Button>
            ))}
          </div>
        )}
      </Card>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={animal.sounds?.[currentSound]?.main || ""}
        onEnded={handleSoundEnded}
        style={{ display: 'none' }}
      />
    </div>
  );
} 

export default AnimalSoundPlayer;
