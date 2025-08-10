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
  
  // Direct mapping based on Chart.js behavior
  const rotationForIndex = (i: number) => {
    // Chart.js starts at -90°, so to put segment i at top (0°):
    // We need to rotate by the amount that brings segment i's center to 0°
    const segmentCenterAngle = -90 + i * segmentAngle + segmentAngle / 2;
    const rotation = -segmentCenterAngle;
    return ((rotation % 360) + 360) % 360;
  };
  
  const indexForRotation = (currentRotation: number) => {
    const normalized = ((currentRotation % 360) + 360) % 360;
    
    // Simple approach: try different offsets to find what works
    // Based on the screenshot, when rotation is ~0, we want the letter that's visually at the top
    // Let's try a direct mapping where index 0 corresponds to the top position
    
    // Convert rotation to segment index, accounting for Chart.js starting at -90°
    const adjustedRotation = normalized + 90; // Adjust for Chart.js -90° start
    const rawIndex = adjustedRotation / segmentAngle;
    const index = Math.floor(rawIndex) % letters.length;
    
    // Debug logging to help calibrate
    if (typeof window !== 'undefined' && window.console) {
      console.log('Rotation:', normalized, 'Raw index:', rawIndex, 'Final index:', index, 'Letter:', letters[index]);
    }
    
    return ((index % letters.length) + letters.length) % letters.length;
  };
  
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
    const idx = indexForRotation(currentRotation);
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    return {
      index: idx,
      letter: letters[idx],
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

  useEffect(() => {
    // Update the spinning ref to match the spinning prop
    spinningRef.current = spinning;
    
    if (spinning) {
      // Reset selected index when starting a new spin
      setSelectedIndex(null);
      setSelectedLetter(null);
      setShowLetterAnimation(false);
      
      // Respect prefers-reduced-motion: skip animation and pick immediately
      const prefersReducedMotion = typeof window !== 'undefined' 
        && typeof window.matchMedia === 'function' 
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const adjustedRotation = rotationForIndex(randomIndex);
        rotationRef.current = adjustedRotation;
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${adjustedRotation}deg)`;
        }
        setRotation(adjustedRotation);
        const result = getCurrentLetterAtPointer(adjustedRotation);
        setSelectedIndex(result.index);
        setSelectedLetter(result.letter);
        setShowLetterAnimation(true);
        playWin();
        onSpinComplete(result.letter);
        spinningRef.current = false;
        return;
      }
      
      // Initial speed and decay variables
      let speed = 20; // Initial rotation speed
      const minSpeed = 0.5; // Higher minimum speed for faster stop (was 0.1)
      const decay = 0.99; // Faster decay for quicker deceleration (was 0.997)
      
      let lastTimestamp = performance.now();
      let currentRotation = rotationRef.current; // Use the ref value
      
      // Animation function
      const animate = (timestamp: number) => {
        if (!spinningRef.current) return;
        
        // Calculate time elapsed since last frame
        const elapsed = Math.min(timestamp - lastTimestamp, 100); // Cap at 100ms to prevent jumps
        lastTimestamp = timestamp;
        
        // Use requestAnimationFrame's timestamp for smoother animation
        const delta = elapsed / 16.67; // Normalize to exactly 60fps
        
        // Update rotation based on current speed with smoother delta
        currentRotation = (currentRotation + speed * delta) % 3600;
        
        // Update the rotation ref first
        rotationRef.current = currentRotation % 360;
        
        // Apply rotation directly to the wheel to avoid re-renders
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        }
        
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
          // When we're about to stop, snap to the exact center of the nearest segment
          const finalRotation = currentRotation % 360;
          const targetIndex = indexForRotation(finalRotation);
          const adjustedRotation = rotationForIndex(targetIndex);
          
          // Update the rotation ref
          rotationRef.current = adjustedRotation % 360;
          
          // Apply the adjusted rotation
          if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${adjustedRotation}deg)`;
          }
          setRotation(adjustedRotation);
          
          // Set the selected letter using the snapped index
          setSelectedIndex(targetIndex);
          setSelectedLetter(letters[targetIndex]);
          
          // Show the letter animation after a short delay
          setTimeout(() => {
            if (spinningRef.current === false) {
              setShowLetterAnimation(true);
            }
          }, 300);
          
          playWin();
          onSpinComplete(letters[targetIndex]);
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
          transform: spinning ? undefined : `rotate(${rotation}deg)`,
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
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#FF3E9D] drop-shadow-md animate-pulse"></div>
        </div>
      </div>
      
      {/* Enhanced spin button in center */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onClick={onSpin}
          disabled={spinning}
          aria-label={spinning ? 'Spinning' : 'Spin the letter wheel'}
          onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !spinning) { e.preventDefault(); onSpin(); } }}
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
        {/* Screen reader announcement for selected letter */}
        <div aria-live="polite" role="status" className="sr-only">
          {selectedLetter ? `Selected letter ${selectedLetter}` : ''}
        </div>
      </div>
      
      {/* Selected letter highlight */}
      {selectedIndex !== null && !spinning && (
        <div 
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            transform: `rotate(${selectedIndex * segmentAngle - 90}deg)`,
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