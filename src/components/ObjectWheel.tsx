import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface ObjectWheelProps {
  objects: string[];
  isSpinning: boolean;
  onSpinComplete: (object: string) => void;
}

const ObjectWheel: React.FC<ObjectWheelProps> = ({ 
  objects, 
  isSpinning, 
  onSpinComplete 
}) => {
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [rotation, setRotation] = useState(0);
  const [segmentAngle, setSegmentAngle] = useState(0);
  const wheelControls = useAnimation();
  const previousObjectsLength = useRef(objects.length);
  
  // Calculate segment angle when objects change
  useEffect(() => {
    if (objects.length > 0) {
      setSegmentAngle(360 / objects.length);
    }
    
    // Reset wheel position if the number of objects changes
    if (previousObjectsLength.current !== objects.length) {
      setRotation(0);
      wheelControls.set({ rotate: 0 });
      previousObjectsLength.current = objects.length;
    }
  }, [objects, wheelControls]);
  
  // Handle spinning animation
  useEffect(() => {
    if (isSpinning && objects.length > 0) {
      // Calculate a random number of full rotations (3-5)
      const fullRotations = Math.floor(Math.random() * 3) + 3;
      
      // Calculate a random segment to land on
      const randomIndex = Math.floor(Math.random() * objects.length);
      
      // Calculate the target rotation
      // The pointer is at the bottom (270 degrees), so we need to rotate the wheel
      // so that the selected segment is at the bottom
      const targetRotation = rotation + (fullRotations * 360) + (randomIndex * segmentAngle);
      
      // Animate the wheel
      wheelControls.start({
        rotate: targetRotation,
        transition: { 
          duration: 3,
          ease: [0.2, 0.1, 0.3, 1], // Custom easing for a realistic spin
        }
      }).then(() => {
        setRotation(targetRotation % 360); // Store the final rotation for next spin
        
        // Calculate which segment is at the bottom (270 degrees) after spinning
        // This ensures the selected object matches what the pointer is showing
        const normalizedRotation = targetRotation % 360;
        
        // The pointer is at the bottom (270 degrees in standard polar coordinates)
        // We need to find which segment is at this position after the wheel stops
        const pointerAngle = 270; // Bottom of the wheel
        
        // Calculate the segment index at the pointer position
        // We add 360 and use modulo to handle negative angles
        const segmentIndex = Math.floor(((pointerAngle - normalizedRotation) % 360) / segmentAngle);
        
        // Get the object at this index, wrapping around if needed
        const actualIndex = (segmentIndex + objects.length) % objects.length;
        const selectedObj = objects[actualIndex];
        
        setSelectedObject(selectedObj);
        onSpinComplete(selectedObj);
      });
    }
  }, [isSpinning, objects, segmentAngle, rotation, wheelControls, onSpinComplete]);
  
  // Calculate the wheel segments
  const getWheelSegments = () => {
    if (objects.length === 0) return null;
    
    return objects.map((object, index) => {
      // Calculate the start and end angles for this segment
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Calculate the segment color - alternate between colors
      const colors = ['#FF3E9D', '#0EEDFF', '#EE74FF', '#FFED37', '#00E061'];
      const colorIndex = index % colors.length;
      const backgroundColor = colors[colorIndex];
      
      // Calculate the text position
      const textAngle = startAngle + (segmentAngle / 2);
      const textRadians = (textAngle - 90) * (Math.PI / 180);
      const textRadius = 110; // Fixed radius for text
      const textX = Math.cos(textRadians) * textRadius;
      const textY = Math.sin(textRadians) * textRadius;
      
      // Calculate font size based on segment angle and text length
      const baseFontSize = 12;
      const adjustedFontSize = segmentAngle < 15 ? 9 : 
                              segmentAngle < 20 ? 10 : 
                              baseFontSize;
      
      // Truncate text if too long for the segment
      const maxLength = segmentAngle < 15 ? 5 : 
                       segmentAngle < 20 ? 7 : 
                       10;
      const displayText = object.length > maxLength ? 
                         object.substring(0, maxLength - 1) + '…' : 
                         object;
      
      return (
        <g key={`segment-${index}`}>
          {/* Segment */}
          <path
            d={`
              M 0 0
              L ${Math.cos((startAngle - 90) * (Math.PI / 180)) * 150} ${Math.sin((startAngle - 90) * (Math.PI / 180)) * 150}
              A 150 150 0 ${segmentAngle > 180 ? 1 : 0} 1 
                ${Math.cos((endAngle - 90) * (Math.PI / 180)) * 150} ${Math.sin((endAngle - 90) * (Math.PI / 180)) * 150}
              Z
            `}
            fill={backgroundColor}
            stroke="#333"
            strokeWidth="1"
          />
          
          {/* Text - Oriented to be readable from outside the wheel */}
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontWeight="bold"
            fontSize={adjustedFontSize}
            style={{ 
              transform: `rotate(${textAngle}deg)`,
              transformOrigin: `${textX}px ${textY}px`,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
            }}
          >
            {displayText}
          </text>
        </g>
      );
    });
  };
  
  return (
    <div className="wheel-container flex items-center justify-center w-full h-full">
      {/* Wheel */}
      <div className="relative w-[300px] h-[300px]">
        <motion.div
          className="wheel absolute top-0 left-0 w-full h-full"
          animate={wheelControls}
          style={{ transformOrigin: 'center center' }}
        >
          <svg
            viewBox="-150 -150 300 300"
            width="100%"
            height="100%"
          >
            {getWheelSegments()}
            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="30"
              fill="#333"
              stroke="#222"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
        
        {/* Selected Object Display */}
        <AnimatePresence mode="wait">
          {selectedObject && !isSpinning && (
            <motion.div 
              className="selected-letter absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text bg-[#1a1a2e] bg-opacity-85 px-6 py-3 rounded-lg">
                {selectedObject}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pointer - Bottom triangle pointing up */}
        <div className="pointer">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon 
              points="12,0 0,12 24,12" 
              fill="white" 
              stroke="#333" 
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ObjectWheel; 