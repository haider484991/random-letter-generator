import { useRef, useState, useEffect, useCallback } from 'react';
import useSound from 'use-sound';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerCollection, { SpinnerType } from './SpinnerCollection';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface LetterWheelProps {
  letters: string[];
  spinning: boolean;
  onSpinComplete: (letter: string) => void;
  onSpin: () => void;
  spinnerType?: SpinnerType;
  spinnerColor?: string;
  spinnerSecondaryColor?: string;
}

const LetterWheel: React.FC<LetterWheelProps> = ({ 
  letters, 
  spinning, 
  onSpinComplete, 
  onSpin,
  spinnerType = 'circles',
  spinnerColor = '#FF3E9D',
  spinnerSecondaryColor = '#0EEDFF'
}) => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0); // Add a ref to track rotation without causing re-renders
  const [playTick] = useSound('/sounds/spin.mp3', { volume: 0.5 });
  const [playWin] = useSound('/sounds/ding.mp3', { volume: 0.7 });
  const spinningRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [showLetterAnimation, setShowLetterAnimation] = useState(false);

  // Calculate the angle for each letter segment
  const segmentAngle = 360 / letters.length;
  
  // Define vibrant colors for the wheel segments inspired by the CodePen
  const backgroundColors = letters.map((_, index) => {
    const colors = [
      'rgba(255, 62, 157, 0.8)',  // Pink
      'rgba(14, 237, 255, 0.8)',  // Cyan
      'rgba(238, 116, 255, 0.8)', // Purple
      'rgba(255, 237, 55, 0.8)',  // Yellow
      'rgba(0, 224, 97, 0.8)'     // Green
    ];
    return colors[index % colors.length];
  });

  // Prepare chart data
  const data = {
    labels: letters,
    datasets: [
      {
        data: letters.map(() => 1), // Equal segments for all letters
        backgroundColor: backgroundColors,
        borderColor: 'rgba(255, 255, 255, 0.3)', // Lighter border color
        borderWidth: 2,
      },
    ],
  };

  // Function to get the current letter at the pointer position
  // Using useCallback to memoize the function
  const getCurrentLetterAtPointer = useCallback((currentRotation: number) => {
    // With the center pointer design, we need to determine which letter is at the top
    // The wheel rotates clockwise, so we need to calculate which segment is at the top
    const normalizedRotation = (currentRotation % 360 + 360) % 360;
    
    // Account for the chart's initial rotation offset (-90 degrees)
    // and calculate which segment is at the top (0 degrees)
    // We need to invert the rotation because the wheel rotates clockwise
    const segmentIndex = Math.floor(((360 - normalizedRotation + 90) % 360) / segmentAngle);
    
    // Ensure the index is within bounds
    const letterIndex = segmentIndex % letters.length;
    
    // For debugging
    console.log('Rotation:', normalizedRotation, 'Segment Index:', segmentIndex, 'Letter Index:', letterIndex, 'Letter:', letters[letterIndex]);
    
    return {
      index: letterIndex,
      letter: letters[letterIndex],
      rotation: normalizedRotation
    };
  }, [letters, segmentAngle]);

  // Chart options with type assertion to avoid TypeScript errors
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false, // Disable default animations as we're handling rotation manually
    layout: {
      padding: 0, // Remove any padding
    },
    plugins: {
      tooltip: {
        enabled: false // Disable tooltips
      },
      legend: {
        display: false // Hide legend
      },
      datalabels: {
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 16,
          family: "'Poppins', sans-serif" // More modern font
        },
        formatter: (_: unknown, context: { dataIndex: number }) => {
          return letters[context.dataIndex];
        },
        // Position labels radially around the wheel
        rotation: (context: { dataIndex: number }) => {
          // Calculate the angle for this segment
          const angle = context.dataIndex * segmentAngle;
          // Return the angle that positions text radially
          return angle;
        },
        align: 'center',
        anchor: 'center',
        offset: 10,
        display: true,
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)' // Add text shadow for better visibility
      }
    },
    rotation: -90, // Start with the first segment at the top
    cutout: '60%', // Larger center hole for the spin button
  } as const;

  // Update rotationRef when rotation state changes
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Ensure chart is properly initialized after mount
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, []);

  useEffect(() => {
    // Update the spinning ref to match the spinning prop
    spinningRef.current = spinning;
    
    if (spinning) {
      // Reset selected index when starting a new spin
      setSelectedIndex(null);
      setSelectedLetter(null);
      setShowLetterAnimation(false);
      
      // Initial speed and decay variables
      let speed = 20; // Initial rotation speed
      const minSpeed = 0.5; // Higher minimum speed for faster stop (was 0.1)
      const decay = 0.99; // Faster decay for quicker deceleration (was 0.997)
      let lastTimestamp = performance.now();
      let currentRotation = rotationRef.current; // Use the ref value
      
      // Animation function
      const animate = (timestamp: number) => {
        // Calculate time elapsed since last frame
        const elapsed = Math.min(timestamp - lastTimestamp, 100); // Cap at 100ms to prevent jumps
        lastTimestamp = timestamp;
        
        // Use requestAnimationFrame's timestamp for smoother animation
        const delta = elapsed / 16.67; // Normalize to exactly 60fps
        
        // Update rotation based on current speed with smoother delta
        currentRotation = (currentRotation + speed * delta) % 3600;
        setRotation(currentRotation % 360);
        
        // Play tick sound at intervals based on speed
        // Only play sound every 100ms to avoid too many sounds
        if (timestamp - lastTickTimeRef.current > 100) {
          playTick();
          lastTickTimeRef.current = timestamp;
        }
        
        // Gradually decrease speed
        speed *= decay;
        
        // Continue animation if still spinning
        if (speed > minSpeed && spinningRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        } else if (spinningRef.current) {
          // When we're about to stop, ensure we land exactly on a segment center
          // This ensures the pointer aligns perfectly with a letter
          const finalRotation = currentRotation % 360;
          
          // Calculate how far we are from the center of the nearest segment
          const segmentOffset = finalRotation % segmentAngle;
          const halfSegment = segmentAngle / 2;
          
          // Adjust to the nearest segment center
          let adjustedRotation;
          if (segmentOffset < halfSegment) {
            // Closer to the previous segment center
            adjustedRotation = finalRotation - segmentOffset;
          } else {
            // Closer to the next segment center
            adjustedRotation = finalRotation + (segmentAngle - segmentOffset);
          }
          
          // Apply the adjusted rotation
          setRotation(adjustedRotation % 360);
          
          // Get the letter at the pointer position using the adjusted rotation
          const result = getCurrentLetterAtPointer(adjustedRotation);
          
          // Set the selected letter
          setSelectedIndex(result.index);
          setSelectedLetter(result.letter);
          
          // Show the letter animation after a short delay
          setTimeout(() => {
            setShowLetterAnimation(true);
          }, 300);
          
          playWin();
          onSpinComplete(result.letter);
          spinningRef.current = false;
        }
      };
      
      // Start animation
      animationRef.current = requestAnimationFrame(animate);
      
      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }
  }, [spinning, playTick, playWin, onSpinComplete, getCurrentLetterAtPointer, letters.length, segmentAngle]);

  // Update chart rotation
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [rotation]);

  // Get the color for the selected letter
  const getSelectedLetterColor = () => {
    if (selectedIndex === null) return '#FFFFFF';
    const colors = [
      '#FF3E9D', // Pink
      '#0EEDFF', // Cyan
      '#EE74FF', // Purple
      '#FFED37', // Yellow
      '#00E061'  // Green
    ];
    return colors[selectedIndex % colors.length];
  };

  return (
    <div className="wheel-container relative w-full aspect-square" ref={containerRef}>
      {/* Enhanced background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#EE74FF]/10 to-[#00E061]/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main wheel with rotation */}
      <div 
        ref={wheelRef}
        className="wheel absolute inset-0 transform"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? 'none' : 'transform 0.3s ease-out',
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      >
        {/* Shadow beneath the wheel */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3E9D]/20 to-[#0EEDFF]/20 blur-xl -z-10 scale-105"></div>
        
        {/* Outer ring decoration */}
        <div className="absolute inset-0 rounded-full border-4 border-[#EE74FF]/30 -z-5"></div>
        
        <Doughnut
          ref={chartRef}
          data={data}
          options={options}
        />
      </div>
      
      {/* Center-to-top pointer (non-rotating) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#FF3E9D]"></div>
        </div>
      </div>
      
      {/* Enhanced spin button in center */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onClick={onSpin}
          disabled={spinning}
          className="spin-button relative flex items-center justify-center w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            boxShadow: '0 0 20px rgba(238, 116, 255, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {spinning ? (
            <SpinnerCollection 
              type={spinnerType} 
              size={80} 
              color={spinnerColor}
              secondaryColor={spinnerSecondaryColor}
            />
          ) : (
            <div className="text-center relative">
              {/* Show the selected letter in the center when not spinning */}
              <AnimatePresence>
                {selectedLetter && showLetterAnimation ? (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="relative">
                      {/* Glowing background for the letter */}
                      <div 
                        className="absolute inset-0 rounded-full blur-md"
                        style={{ backgroundColor: getSelectedLetterColor(), opacity: 0.7 }}
                      ></div>
                      
                      {/* The letter itself */}
                      <div 
                        className="text-4xl font-bold relative"
                        style={{ color: '#FFFFFF', textShadow: `0 0 10px ${getSelectedLetterColor()}` }}
                      >
                        {selectedLetter}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="text-white text-xl font-bold mb-1">SPIN</div>
                    <div className="text-[#0EEDFF] text-xs">Click to start</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Decorative ring around button */}
          <div className="absolute inset-0 rounded-full border-2 border-[#FF3E9D]/30 animate-pulse"></div>
        </button>
      </div>
      
      {/* Selected letter highlight */}
      {selectedIndex !== null && !spinning && (
        <div 
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            transform: `rotate(${selectedIndex * segmentAngle}deg)`,
            transformOrigin: 'center',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/2 bg-white/10 blur-md"></div>
        </div>
      )}
    </div>
  );
};

export default LetterWheel; 