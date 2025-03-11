import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: number;
  visible?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 60, 
  visible = true 
}) => {
  // Colors from the CodePen design
  const colors = [
    '#FF3E9D', // Pink
    '#0EEDFF', // Cyan
    '#EE74FF', // Purple
    '#FFED37', // Yellow
    '#00E061'  // Green
  ];

  // Create 5 circles with different animations
  const circles = Array.from({ length: 5 }).map((_, i) => {
    const delay = i * 0.15;
    const duration = 1.8;
    const baseSize = size * 0.8;
    const circleSize = baseSize - (i * (baseSize / 10));
    
    return {
      size: circleSize,
      color: colors[i % colors.length],
      delay,
      duration
    };
  });

  if (!visible) return null;

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

export default Spinner; 