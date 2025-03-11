import React from 'react';
import { motion } from 'framer-motion';

export type SpinnerType = 'circles' | 'dots' | 'pulse' | 'wave' | 'spiral';

interface SpinnerCollectionProps {
  type: SpinnerType;
  size?: number;
  visible?: boolean;
  color?: string;
  secondaryColor?: string;
}

const SpinnerCollection: React.FC<SpinnerCollectionProps> = ({
  type = 'circles',
  size = 60,
  visible = true,
  color = '#FF3E9D',
  secondaryColor = '#0EEDFF'
}) => {
  if (!visible) return null;

  // Render different spinner types
  const renderSpinner = () => {
    switch (type) {
      case 'circles':
        return <CirclesSpinner size={size} color={color} secondaryColor={secondaryColor} />;
      case 'dots':
        return <DotsSpinner size={size} color={color} secondaryColor={secondaryColor} />;
      case 'pulse':
        return <PulseSpinner size={size} color={color} />;
      case 'wave':
        return <WaveSpinner size={size} color={color} secondaryColor={secondaryColor} />;
      case 'spiral':
        return <SpiralSpinner size={size} color={color} secondaryColor={secondaryColor} />;
      default:
        return <CirclesSpinner size={size} color={color} secondaryColor={secondaryColor} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderSpinner()}
    </div>
  );
};

// Circles Spinner (Original design)
const CirclesSpinner: React.FC<{ size: number; color: string; secondaryColor: string }> = ({ size, color, secondaryColor }) => {
  const circles = Array.from({ length: 5 }).map((_, i) => {
    const delay = i * 0.15;
    const duration = 1.8;
    const baseSize = size * 0.8;
    const circleSize = baseSize - (i * (baseSize / 10));
    
    return {
      size: circleSize,
      color: i % 2 === 0 ? color : secondaryColor,
      delay,
      duration
    };
  });

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: size, 
        height: size 
      }}
    >
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            border: `3px solid ${circle.color}`,
            boxShadow: `0 0 10px ${circle.color}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Dots Spinner
const DotsSpinner: React.FC<{ size: number; color: string; secondaryColor: string }> = ({ size, color, secondaryColor }) => {
  const dotCount = 8;
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const delay = i * (1 / dotCount);
    const angle = (i / dotCount) * 360;
    const radius = size * 0.35;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return {
      x,
      y,
      delay,
      color: i % 2 === 0 ? color : secondaryColor
    };
  });

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: size, 
        height: size 
      }}
    >
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.12,
            height: size * 0.12,
            backgroundColor: dot.color,
            boxShadow: `0 0 8px ${dot.color}`,
            x: dot.x,
            y: dot.y
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.2,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Pulse Spinner
const PulseSpinner: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: size, 
        height: size 
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          border: `3px solid ${color}`,
          boxShadow: `0 0 10px ${color}`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          backgroundColor: color,
          opacity: 0.5,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Wave Spinner
const WaveSpinner: React.FC<{ size: number; color: string; secondaryColor: string }> = ({ size, color, secondaryColor }) => {
  const barCount = 5;
  const bars = Array.from({ length: barCount }).map((_, i) => {
    const delay = i * 0.15;
    
    return {
      delay,
      color: i % 2 === 0 ? color : secondaryColor
    };
  });

  return (
    <div 
      className="flex items-center justify-center space-x-1"
      style={{ 
        width: size, 
        height: size 
      }}
    >
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: size * 0.1,
            height: size * 0.4,
            backgroundColor: bar.color,
            boxShadow: `0 0 5px ${bar.color}`,
          }}
          animate={{
            height: [size * 0.2, size * 0.5, size * 0.2],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Spiral Spinner
const SpiralSpinner: React.FC<{ size: number; color: string; secondaryColor: string }> = ({ size, color, secondaryColor }) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: size, 
        height: size 
      }}
    >
      <motion.div
        className="absolute rounded-full border-t-4 border-b-4"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          borderTopColor: color,
          borderBottomColor: secondaryColor,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute rounded-full border-l-4 border-r-4"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          borderLeftColor: color,
          borderRightColor: secondaryColor,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        animate={{
          rotate: [360, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: 'white',
          opacity: 0.7,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SpinnerCollection; 