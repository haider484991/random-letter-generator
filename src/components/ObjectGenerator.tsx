import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { SpinnerType } from './SpinnerCollection';
import ObjectWheel from '@/components/ObjectWheel';

// Define object categories and their items
const OBJECT_CATEGORIES = {
  animals: [
    'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Giraffe', 'Zebra', 'Monkey', 'Panda', 
    'Koala', 'Kangaroo', 'Penguin', 'Dolphin', 'Whale', 'Shark', 'Eagle', 'Owl', 'Fox',
    'Wolf', 'Bear', 'Rabbit', 'Turtle', 'Snake', 'Crocodile', 'Frog'
  ],
  foods: [
    'Pizza', 'Burger', 'Taco', 'Sushi', 'Pasta', 'Salad', 'Sandwich', 'Ice Cream', 'Cake',
    'Cookie', 'Donut', 'Pancake', 'Waffle', 'Bread', 'Cheese', 'Apple', 'Banana', 'Orange',
    'Strawberry', 'Watermelon', 'Chocolate', 'Coffee', 'Tea', 'Milk', 'Juice'
  ],
  vehicles: [
    'Car', 'Truck', 'Bus', 'Train', 'Airplane', 'Helicopter', 'Motorcycle', 'Bicycle', 'Boat',
    'Ship', 'Submarine', 'Rocket', 'Spaceship', 'Tractor', 'Ambulance', 'Police Car', 'Fire Truck',
    'Taxi', 'Van', 'SUV', 'Scooter', 'Skateboard', 'Jet Ski', 'Snowmobile', 'Hot Air Balloon'
  ],
  sports: [
    'Soccer', 'Basketball', 'Football', 'Baseball', 'Tennis', 'Golf', 'Hockey', 'Volleyball',
    'Swimming', 'Running', 'Cycling', 'Skiing', 'Snowboarding', 'Surfing', 'Skateboarding',
    'Boxing', 'Wrestling', 'Gymnastics', 'Yoga', 'Martial Arts', 'Rugby', 'Cricket', 'Badminton',
    'Table Tennis', 'Archery'
  ],
  professions: [
    'Doctor', 'Teacher', 'Engineer', 'Lawyer', 'Chef', 'Artist', 'Musician', 'Actor', 'Writer',
    'Programmer', 'Scientist', 'Nurse', 'Firefighter', 'Police Officer', 'Pilot', 'Architect',
    'Accountant', 'Dentist', 'Veterinarian', 'Electrician', 'Plumber', 'Farmer', 'Photographer',
    'Designer', 'Journalist'
  ]
};

interface ObjectGeneratorProps {
  spinnerType?: SpinnerType;
  spinnerColor?: string;
  spinnerSecondaryColor?: string;
}

const ObjectGenerator: React.FC<ObjectGeneratorProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spinnerType: _spinnerType = 'circles',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spinnerColor: _spinnerColor = '#FF3E9D',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spinnerSecondaryColor: _spinnerSecondaryColor = '#0EEDFF'
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof OBJECT_CATEGORIES>('animals');
  const [objects, setObjects] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  // New state for favorites and statistics
  const [favorites, setFavorites] = useState<string[]>([]);
  const [objectStats, setObjectStats] = useState<Record<string, number>>({});
  const [showStats, setShowStats] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const isMounted = useRef(false);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const favoriteSoundRef = useRef<HTMLAudioElement | null>(null);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio elements after component mounts
  useEffect(() => {
    if (isClient) {
      // Create audio elements for sounds
      clickSoundRef.current = new Audio('/sounds/click.mp3');
      if (clickSoundRef.current) {
        clickSoundRef.current.volume = 0.3;
      }
      
      favoriteSoundRef.current = new Audio('/sounds/ding.mp3');
      if (favoriteSoundRef.current) {
        favoriteSoundRef.current.volume = 0.5;
      }
    }
  }, [isClient]);

  // Set initial window size on client side only
  useEffect(() => {
    if (isClient) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      isMounted.current = true;
      
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem('objectFavorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error('Failed to parse favorites:', e);
        }
      }
      
      // Load stats from localStorage
      const savedStats = localStorage.getItem('objectStats');
      if (savedStats) {
        try {
          setObjectStats(JSON.parse(savedStats));
        } catch (e) {
          console.error('Failed to parse stats:', e);
        }
      }
    }
  }, [isClient]);

  // Update objects when category changes
  useEffect(() => {
    setObjects(OBJECT_CATEGORIES[selectedCategory]);
  }, [selectedCategory]);

  // Handle window resize
  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isMounted.current && isClient) {
      localStorage.setItem('objectFavorites', JSON.stringify(favorites));
    }
  }, [favorites, isClient]);

  // Save stats to localStorage when they change
  useEffect(() => {
    if (isMounted.current && isClient) {
      localStorage.setItem('objectStats', JSON.stringify(objectStats));
    }
  }, [objectStats, isClient]);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.error("Error playing click sound:", e));
    }
  };

  const playFavoriteSound = () => {
    if (favoriteSoundRef.current) {
      favoriteSoundRef.current.currentTime = 0;
      favoriteSoundRef.current.play().catch(e => console.error("Error playing favorite sound:", e));
    }
  };

  const handleSpin = () => {
    if (!isSpinning) {
      playClickSound();
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (object: string) => {
    setIsSpinning(false);
    
    // Update history
    setHistory(prev => {
      const newHistory = [object, ...prev];
      return newHistory.slice(0, 10); // Keep only the last 10 items
    });
    
    // Update stats
    setObjectStats(prev => {
      const newStats = { ...prev };
      newStats[object] = (newStats[object] || 0) + 1;
      return newStats;
    });
    
    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleFavorite = (object: string) => {
    setFavorites(prev => {
      if (prev.includes(object)) {
        return prev.filter(item => item !== object);
      } else {
        playFavoriteSound();
        return [...prev, object];
      }
    });
  };

  const toggleStats = () => {
    setShowStats(prev => !prev);
  };

  const getTopObjects = () => {
    return Object.entries(objectStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const handleCategoryChange = (category: keyof typeof OBJECT_CATEGORIES) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Category Selection */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {Object.keys(OBJECT_CATEGORIES).map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white shadow-lg' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(category as keyof typeof OBJECT_CATEGORIES)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Main Wheel Container */}
      <div 
        ref={wheelContainerRef}
        className="wheel-container-wrapper relative mb-24"
        style={{ height: '320px' }}
      >
        <ObjectWheel
          objects={objects}
          isSpinning={isSpinning}
          onSpinComplete={handleSpinComplete}
        />
        
        {/* Spin Button */}
        <motion.button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[40px] z-20
                    bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-bold py-3 px-8 
                    rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Spin!'}
        </motion.button>
      </div>

      {/* Confetti Effect - Only render on client side */}
      {isClient && showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#FF3E9D', '#0EEDFF', '#EE74FF', '#FFED37', '#00E061']}
        />
      )}

      {/* History and Favorites Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* History */}
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">
            Recent Objects
          </h3>
          <div className="flex flex-wrap gap-2">
            {history.length > 0 ? (
              history.map((object, index) => (
                <div 
                  key={`${object}-${index}`}
                  className="bg-gray-700 rounded-lg px-3 py-1 flex items-center gap-2"
                >
                  <span>{object}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(object)}
                    className="text-lg"
                  >
                    {favorites.includes(object) ? '❤️' : '🤍'}
                  </motion.button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No history yet. Spin the wheel!</p>
            )}
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">
            Favorites
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.length > 0 ? (
              favorites.map((object, index) => (
                <div 
                  key={`fav-${object}-${index}`}
                  className="bg-gray-700 rounded-lg px-3 py-1 flex items-center gap-2"
                >
                  <span>{object}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(object)}
                    className="text-lg"
                  >
                    ❤️
                  </motion.button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No favorites yet. Click the heart to add!</p>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <motion.div 
        className="mt-8 bg-gray-800 bg-opacity-50 rounded-xl p-4 shadow-lg"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showStats ? 1 : 0,
          height: showStats ? 'auto' : 0,
          marginTop: showStats ? '2rem' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {showStats && (
          <>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text">
              Top Objects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getTopObjects().map(([object, count]) => (
                <div 
                  key={`stat-${object}`}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <span>{object}</span>
                  <span className="bg-gray-600 rounded-full px-2 py-1 text-sm">
                    {count} {count === 1 ? 'time' : 'times'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Toggle Stats Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleStats}
        >
          {showStats ? 'Hide Statistics' : 'Show Statistics'}
        </motion.button>
      </div>

      {/* Article about the Random Object Generator */}
      <article className="mt-16 mb-12 prose prose-invert lg:prose-xl max-w-none">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
          Unleash Your Creativity with the Random Object Generator
        </h2>
        
        <div className="bg-gray-800 bg-opacity-40 rounded-2xl p-6 shadow-xl">
          <p className="lead text-lg mb-6">
            In a world full of choices, sometimes the hardest part is simply deciding where to start. Whether you&apos;re a creative professional facing the blank canvas, an educator looking for engaging classroom activities, or someone seeking inspiration for your next project, our Random Object Generator is the perfect tool to spark your imagination.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-[#FF3E9D]">What Makes Our Random Object Generator Special?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 bg-opacity-50 rounded-xl p-5">
              <h4 className="text-lg font-medium mb-2 text-[#0EEDFF]">Diverse Categories</h4>
              <p>
                With five carefully curated categories—Animals, Foods, Vehicles, Sports, and Professions—you&apos;ll never run out of interesting objects to discover. Each category contains 25 unique items, offering a perfect balance between variety and specificity.
              </p>
            </div>
            
            <div className="bg-gray-700 bg-opacity-50 rounded-xl p-5">
              <h4 className="text-lg font-medium mb-2 text-[#0EEDFF]">Interactive Experience</h4>
              <p>
                The colorful spinning wheel creates an engaging, game-like experience that makes randomization fun. The satisfying animations and sound effects turn each spin into a moment of anticipation and delight.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-10 mb-4 text-[#FF3E9D]">Creative Ways to Use the Random Object Generator</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4">
              <h4 className="font-medium text-[#FFED37]">For Artists & Designers</h4>
              <p>Challenge yourself with random object drawing prompts or use unexpected combinations to create unique character designs and illustrations.</p>
            </div>
            
            <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4">
              <h4 className="font-medium text-[#FFED37]">For Writers & Storytellers</h4>
              <p>Break through writer&apos;s block by incorporating random objects into your narrative, creating unexpected plot twists, or developing character traits based on professions or animals.</p>
            </div>
            
            <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4">
              <h4 className="font-medium text-[#FFED37]">For Educators & Parents</h4>
              <p>Create engaging learning activities, vocabulary exercises, or imaginative play scenarios using randomly selected objects as prompts.</p>
            </div>
            
            <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4">
              <h4 className="font-medium text-[#FFED37]">For Game Night & Social Gatherings</h4>
              <p>Use the generator for charades, pictionary, or improvisation games that keep everyone entertained with unexpected challenges.</p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-10 mb-4 text-[#FF3E9D]">Features That Enhance Your Experience</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-medium mb-1 text-[#EE74FF]">Favorites Collection</h4>
              <p className="text-sm">Save your favorite objects for quick access and inspiration whenever you need them.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-medium mb-1 text-[#EE74FF]">Statistics Tracking</h4>
              <p className="text-sm">Discover your most frequently generated objects and track patterns in your creative process.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-3xl mb-2">🎉</div>
              <h4 className="font-medium mb-1 text-[#EE74FF]">Celebration Effects</h4>
              <p className="text-sm">Enjoy delightful confetti animations that celebrate each new idea and inspiration.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 mt-10">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#0EEDFF]">Ready to Discover Endless Possibilities?</h3>
            <p className="text-center mb-6">
              Simply select a category, click the &quot;Spin!&quot; button, and let the wheel of inspiration guide your next creative endeavor. With each spin, you open the door to new ideas and unexpected connections.
            </p>
            <p className="text-center font-medium text-[#FFED37]">
              The only limit is your imagination!
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ObjectGenerator; 