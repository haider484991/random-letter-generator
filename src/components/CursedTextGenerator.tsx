'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types of cursed text transformations
type CursedTextType = 'zalgo' | 'vaporwave' | 'glitch' | 'inverted' | 'mirror' | 'creepy';

interface CursedTextGeneratorProps {
  theme: 'dark' | 'vibrant';
}

const CursedTextGenerator: React.FC<CursedTextGeneratorProps> = ({ theme }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [textType, setTextType] = useState<CursedTextType>('zalgo');
  const [intensity, setIntensity] = useState(5); // 1-10 scale
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Define vibrant colors
  const colors = {
    pink: '#FF3E9D',
    cyan: '#0EEDFF',
    purple: '#EE74FF',
    yellow: '#FFED37',
    green: '#00E061'
  };

  // Effect to animate text generation
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        setShowPreview(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  // Function to generate Zalgo text (glitchy text with diacritics)
  const generateZalgoText = (text: string, intensity: number) => {
    const zalgoMarks = [
      '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
      '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
      '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
      '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d',
      '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
      '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b',
    ];

    return text.split('').map(char => {
      let result = char;
      // Add random zalgo marks based on intensity
      const markCount = Math.floor(Math.random() * intensity * 2) + 1;
      for (let i = 0; i < markCount; i++) {
        const randomMark = zalgoMarks[Math.floor(Math.random() * zalgoMarks.length)];
        result += randomMark;
      }
      return result;
    }).join('');
  };

  // Function to generate vaporwave text (full-width characters)
  const generateVaporwaveText = (text: string) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      // Convert to full-width characters
      if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 0xFEE0);
      }
      return char;
    }).join('');
  };

  // Function to generate glitch text (alternating normal and special characters)
  const generateGlitchText = (text: string, intensity: number) => {
    const glitchChars = ['#', '&', '!', '%', '$', '@', '*', '?', '=', '+', '¿', '¡', '×', '÷'];
    return text.split('').map(char => {
      // Randomly replace characters based on intensity
      if (Math.random() < intensity / 20) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  // Function to generate inverted text (upside down)
  const generateInvertedText = (text: string) => {
    const normalChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?()[]{}\'"<>;:';
    const invertedChars = 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎzⱯꓭƆᗡƎℲ⅁HIſꓘ⅂WNOԀꝹꓤSꓕՈɅMX⅄Z0ƖᄅƐㄣϛ9ㄥ86˙\'¡¿)(][}{,„><؛:';
    
    return text.split('').map(char => {
      const index = normalChars.indexOf(char);
      return index !== -1 ? invertedChars[index] : char;
    }).join('').split('').reverse().join('');
  };

  // Function to generate mirror text (reversed)
  const generateMirrorText = (text: string) => {
    return text.split('').reverse().join('');
  };

  // Function to generate creepy text (mixed with special characters)
  const generateCreepyText = (text: string, intensity: number) => {
    const creepyChars = ['Ψ', 'Ω', '†', '¥', 'ø', 'Δ', '∞', '§', '∆', '√', '∫', '≈', 'Σ', 'π'];
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      // Add random creepy characters based on intensity
      if (Math.random() < intensity / 15) {
        result += creepyChars[Math.floor(Math.random() * creepyChars.length)];
      }
    }
    
    return result;
  };

  // Function to transform text based on selected type
  const transformText = () => {
    if (!inputText) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      let result = '';
      
      switch (textType) {
        case 'zalgo':
          result = generateZalgoText(inputText, intensity);
          break;
        case 'vaporwave':
          result = generateVaporwaveText(inputText);
          break;
        case 'glitch':
          result = generateGlitchText(inputText, intensity);
          break;
        case 'inverted':
          result = generateInvertedText(inputText);
          break;
        case 'mirror':
          result = generateMirrorText(inputText);
          break;
        case 'creepy':
          result = generateCreepyText(inputText, intensity);
          break;
        default:
          result = inputText;
      }
      
      setOutputText(result);
    }, 500);
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Floating characters animation for background
  const FloatingCharacters = () => {
    const characters = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: String.fromCharCode(Math.floor(Math.random() * 26) + 97),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        {characters.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-3xl font-bold"
            initial={{ 
              x: `${item.x}%`, 
              y: `${item.y}%`, 
              scale: item.size,
              opacity: 0 
            }}
            animate={{ 
              x: [`${item.x}%`, `${(item.x + 20) % 100}%`, `${(item.x - 10) % 100}%`, `${item.x}%`],
              y: [`${item.y}%`, `${(item.y - 30) % 100}%`, `${(item.y + 20) % 100}%`, `${item.y}%`],
              opacity: [0, 0.7, 0.5, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: item.duration, 
              delay: item.delay,
              ease: "easeInOut"
            }}
            style={{ 
              color: Object.values(colors)[Math.floor(Math.random() * 5)]
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white'}`}>
      <FloatingCharacters />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-black/30 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Cursed Text Generator
              </motion.h1>
              <motion.p 
                className="text-lg opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Transform your text into creepy, glitchy, and cursed formats
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Enter Your Text</label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-32 p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </motion.div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Text Effect</label>
                  <select
                    value={textType}
                    onChange={(e) => setTextType(e.target.value as CursedTextType)}
                    className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="zalgo">Z̸̢̪̮̱̓̓͝a̵̡̛̯̠̓̈́l̶̨̛̦̱̓̈́g̵̢̛̦̱̓̈́ơ̵̢̦̱̓̈́ Text</option>
                    <option value="vaporwave">Ｖａｐｏｒｗａｖｅ</option>
                    <option value="glitch">Gl!tch T#xt</option>
                    <option value="inverted">uʍop ǝpᴉsdn</option>
                    <option value="mirror">ɿoɿɿiM</option>
                    <option value="creepy">C∞r∫e√e∞p√y</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Intensity: {intensity}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={transformText}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "Transform Text"
                  )}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showPreview && outputText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-4 rounded-lg bg-gray-800/70 border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Cursed Result</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="text-sm py-1 px-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </motion.button>
                  </div>
                  <div 
                    ref={outputRef}
                    className="p-3 min-h-[100px] bg-gray-900/50 rounded border border-gray-800 break-words"
                  >
                    {outputText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
              About Cursed Text
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Cursed text, also known as glitch text or zalgo text, uses special Unicode characters to create distorted, creepy, or glitchy effects. These text transformations are popular for social media posts, creative writing, digital art, and Halloween-themed content.
              </p>
              <p>
                Our generator offers multiple text effect styles:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Zalgo:</strong> Adds random diacritical marks above and below letters for a glitchy, corrupted appearance.</li>
                <li><strong>Vaporwave:</strong> Converts text to full-width characters for an aesthetic, spaced-out look.</li>
                <li><strong>Glitch:</strong> Randomly replaces characters with symbols to create a digital glitch effect.</li>
                <li><strong>Inverted:</strong> Flips text upside down for a disorienting effect.</li>
                <li><strong>Mirror:</strong> Reverses text to read from right to left.</li>
                <li><strong>Creepy:</strong> Intersperses text with unusual symbols for an unsettling appearance.</li>
              </ul>
              <p>
                Adjust the intensity slider to control how extreme the effect appears. Higher intensity means more distortion!
              </p>
            </div>
          </motion.div>
          
          {/* Detailed Article Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 bg-black/30 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              The Fascinating World of Cursed Text Generation
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">The Origins of Cursed Text</h3>
                <p>
                  The phenomenon of &quot;cursed&quot; or &quot;corrupted&quot; text has a fascinating digital history dating back to the early 2000s. The most famous variant, Zalgo text, emerged from internet culture around 2004, named after a meme depicting an eldritch horror entity that corrupts reality. The visual distortion of text with excessive diacritical marks was designed to evoke a sense of digital corruption or supernatural interference.
                </p>
                <p className="mt-2">
                  What began as an obscure internet joke quickly evolved into a popular form of digital expression. The technique leverages Unicode&apos;s combining characters—specifically diacritical marks that were originally designed to modify letters in various languages—and stacks them excessively to create an unsettling visual effect that appears to &quot;corrupt&quot; normal text.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">The Technical Magic Behind Cursed Text</h3>
                <p>
                  Cursed text generation is a fascinating intersection of linguistics, computer science, and digital art. At its core, it manipulates Unicode—the international encoding standard that allows computers to consistently represent text from any writing system. Our cursed text generator employs several technical approaches:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>
                    <strong>Combining Characters:</strong> Zalgo text specifically uses Unicode&apos;s combining diacritical marks (U+0300 to U+036F) that were designed to stack above or below base characters. By algorithmically applying multiple marks to each character, we create the distinctive &quot;glitchy&quot; appearance.
                  </li>
                  <li>
                    <strong>Character Mapping:</strong> For effects like inverted text, we maintain a comprehensive mapping between standard characters and their upside-down equivalents, many of which come from various Unicode blocks including IPA Extensions and Latin Extended-B.
                  </li>
                  <li>
                    <strong>Full-Width Form Conversion:</strong> Vaporwave text utilizes Unicode&apos;s full-width forms (U+FF01 to U+FF5E), originally designed for better alignment with East Asian square characters, creating an aesthetically spaced appearance.
                  </li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">Cultural Impact and Modern Applications</h3>
                <p>
                  What began as internet subculture has evolved into a versatile tool for creative expression across multiple domains:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Digital Art & Design</h4>
                    <p className="text-sm">
                      Graphic designers and digital artists incorporate cursed text into artwork to evoke themes of digital decay, technological anxiety, or supernatural horror. The aesthetic has influenced album covers, movie posters, and experimental typography.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Social Media Expression</h4>
                    <p className="text-sm">
                      Users employ cursed text to make their posts stand out, express intense emotions, or create an unsettling tone. It&apos;s particularly popular on platforms like Twitter, Discord, and Reddit where textual differentiation creates impact.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Creative Writing</h4>
                    <p className="text-sm">
                      Authors of digital horror fiction use cursed text to visually represent supernatural elements, character corruption, or reality distortion within their narratives, adding a visual dimension to text-based storytelling.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Gaming & ARGs</h4>
                    <p className="text-sm">
                      Game developers and alternate reality game (ARG) creators incorporate cursed text into clues, character dialogue, or environmental storytelling to enhance mysterious or horror elements in their interactive experiences.
                    </p>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">Accessibility Considerations</h3>
                <p>
                  While cursed text creates visually striking effects, it&apos;s important to note that it presents challenges for accessibility. Screen readers and assistive technologies may struggle to interpret heavily modified text, potentially creating barriers for users with visual impairments. For this reason, we recommend using cursed text primarily for decorative purposes and providing alternative text when used in public communications.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">Creative Ways to Use Cursed Text</h3>
                <p>
                  Beyond simple social media posts, here are some innovative applications for our cursed text generator:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>
                    <strong>Halloween Invitations:</strong> Create spooky, attention-grabbing digital invitations for Halloween parties or events.
                  </li>
                  <li>
                    <strong>Horror Story Titles:</strong> Generate unsettling titles or chapter headings for horror fiction that visually represent the tone of your work.
                  </li>
                  <li>
                    <strong>Themed Usernames:</strong> Design unique usernames for gaming platforms or forums that align with horror, cyberpunk, or vaporwave aesthetics.
                  </li>
                  <li>
                    <strong>Digital Art Captions:</strong> Complement digital artwork with thematically appropriate text that enhances the visual experience.
                  </li>
                  <li>
                    <strong>Mystery Clues:</strong> Create enigmatic messages for scavenger hunts, escape rooms, or mystery games that participants need to decipher.
                  </li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 text-white">The Future of Text Manipulation</h3>
                <p>
                  As digital communication continues to evolve, text manipulation techniques like those in our cursed text generator represent just the beginning of creative typography in the digital age. Future developments may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>
                    <strong>AI-Generated Text Effects:</strong> Machine learning algorithms that can generate entirely new text distortion styles based on emotional or thematic inputs.
                  </li>
                  <li>
                    <strong>Animated Text Corruption:</strong> Dynamic text effects that evolve and change over time, creating an even more unsettling visual experience.
                  </li>
                  <li>
                    <strong>Context-Aware Distortion:</strong> Smart text effects that analyze the meaning of text and apply appropriate distortion effects based on semantic content.
                  </li>
                </ul>
                <p className="mt-3">
                  Our cursed text generator continues this tradition of digital creativity, offering you powerful tools to transform ordinary text into extraordinary visual expressions that capture attention and evoke emotion.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CursedTextGenerator; 