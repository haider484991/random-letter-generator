'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, BookOpen, Users, Brain, Target, Clock, Trophy, Share2, ArrowRight, Home, Gamepad2 } from 'lucide-react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              activeSection === item.id
                ? 'bg-indigo-100 text-indigo-700 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            } ${item.level === 2 ? 'ml-4' : ''}`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

function ShareButtons() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = 'Check out this comprehensive Pictionary guide!';

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600">Share this guide:</span>
      <button
        onClick={shareOnTwitter}
        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
        title="Share on Twitter"
      >
        <Share2 className="h-4 w-4" />
      </button>
      <button
        onClick={shareOnFacebook}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        title="Share on Facebook"
      >
        <Share2 className="h-4 w-4" />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
        title="Copy link"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function PictionaryGuideContent() {
  const tableOfContentsItems: TableOfContentsItem[] = [
    { id: 'why-important', title: 'Why Pictionary is Important', level: 1 },
    { id: 'educational-benefits', title: 'Educational Benefits', level: 2 },
    { id: 'social-benefits', title: 'Social Benefits', level: 2 },
    { id: 'cognitive-benefits', title: 'Cognitive Benefits', level: 2 },
    { id: 'how-to-play', title: 'How to Play Pictionary', level: 1 },
    { id: 'basic-setup', title: 'Basic Setup and Equipment', level: 2 },
    { id: 'gameplay-instructions', title: 'Step-by-Step Gameplay', level: 2 },
    { id: 'scoring-system', title: 'Scoring System', level: 2 },
    { id: 'drawing-rules', title: 'Drawing Rules and Guidelines', level: 2 },
    { id: 'tips-strategies', title: 'Tips and Strategies', level: 1 },
    { id: 'game-variations', title: 'Game Variations and Modes', level: 1 },
    { id: 'educational-applications', title: 'Educational Applications', level: 1 },
    { id: 'skill-adaptations', title: 'Adaptations for Different Skill Levels', level: 1 },
    { id: 'digital-vs-traditional', title: 'Digital vs Traditional Pictionary', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors duration-200 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/pictionary" className="hover:text-indigo-600 transition-colors duration-200 flex items-center">
              <Gamepad2 className="h-4 w-4 mr-1" />
              Pictionary
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Guide</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <TableOfContents items={tableOfContentsItems} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white">
                <h1 className="text-4xl font-bold mb-4">The Complete Guide to Pictionary</h1>
                <p className="text-xl text-indigo-100 mb-6">Why It Matters and How to Play</p>
                <div className="flex flex-wrap items-center gap-6 text-indigo-200">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>15 min read</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>For all ages</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    <span>Comprehensive guide</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8">
                {/* Introduction */}
                <div className="mb-12">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Pictionary is more than just a game—it's a powerful tool for education, communication, and social connection. 
                    Whether you're a teacher looking to engage students, a parent seeking quality family time, or friends wanting 
                    entertainment, Pictionary offers benefits that extend far beyond the game itself.
                  </p>
                  
                  {/* Call-to-action */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">Ready to Start Playing?</h3>
                        <p className="text-indigo-700">Try our Pictionary Word Generator for instant access to thousands of words!</p>
                      </div>
                      <Link 
                        href="/pictionary" 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center font-medium"
                      >
                        Play Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Why Pictionary is Important */}
                <section id="why-important" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <Brain className="h-8 w-8 mr-3 text-indigo-600" />
                    Why Pictionary is Important
                  </h2>

                  <div id="educational-benefits" className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Educational Benefits</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-green-800 mb-3">Creativity Development</h4>
                        <ul className="text-green-700 space-y-2">
                          <li>• Encourages artistic expression and visual thinking</li>
                          <li>• Develops drawing skills and spatial awareness</li>
                          <li>• Promotes creative problem-solving</li>
                          <li>• Helps players think outside the box</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-blue-800 mb-3">Communication Skills</h4>
                        <ul className="text-blue-700 space-y-2">
                          <li>• Enhances non-verbal communication abilities</li>
                          <li>• Improves visual literacy and interpretation</li>
                          <li>• Develops ability to convey complex ideas simply</li>
                          <li>• Strengthens visual-verbal communication understanding</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-purple-800 mb-3">Vocabulary Building</h4>
                        <ul className="text-purple-700 space-y-2">
                          <li>• Exposes players to new words and concepts</li>
                          <li>• Reinforces understanding through visual representation</li>
                          <li>• Helps with language learning and retention</li>
                          <li>• Encourages exploration of synonyms and related concepts</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">Benefits by Age Group</h4>
                        <ul className="text-orange-700 space-y-2">
                          <li>• <strong>Children:</strong> Fine motor skills, vocabulary development</li>
                          <li>• <strong>Teenagers:</strong> Stress relief, presentation skills</li>
                          <li>• <strong>Adults:</strong> Mental stimulation, workplace communication</li>
                          <li>• <strong>Seniors:</strong> Cognitive exercise, social engagement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <CollapsibleSection title="Social Benefits" defaultOpen={false}>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Teamwork and Collaboration</h4>
                        <p className="text-gray-700">Promotes cooperation between team members, encourages supportive communication, builds trust and understanding within groups, and develops leadership skills in team coordination.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Fun and Entertainment</h4>
                        <p className="text-gray-700">Provides hours of engaging, screen-free entertainment, creates memorable shared experiences, generates laughter and positive emotions, and is suitable for parties, family gatherings, and social events.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Bonding and Relationships</h4>
                        <p className="text-gray-700">Strengthens family bonds through shared activity, helps break ice in new social situations, creates opportunities for intergenerational play, and builds friendships through collaborative fun.</p>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Cognitive Benefits" defaultOpen={false}>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Visual Thinking</h4>
                        <p className="text-gray-700">Enhances ability to think in images and spatial relationships, develops visual processing skills, improves pattern recognition abilities, and strengthens connection between visual and conceptual thinking.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Problem-Solving</h4>
                        <p className="text-gray-700">Challenges players to find creative solutions under time pressure, develops quick thinking and adaptability, enhances analytical skills when interpreting drawings, and promotes strategic thinking in gameplay.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Memory and Recall</h4>
                        <p className="text-gray-700">Strengthens visual memory through drawing and recognition, improves word recall and association skills, enhances ability to remember and categorize information, and develops pattern recognition for future reference.</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                </section>

                {/* How to Play Pictionary */}
                <section id="how-to-play" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <Gamepad2 className="h-8 w-8 mr-3 text-indigo-600" />
                    How to Play Pictionary
                  </h2>

                  <div id="basic-setup" className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Basic Setup and Equipment</h3>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">What You Need:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-gray-700 space-y-2">
                          <li>• Drawing surface (paper, whiteboard, or digital device)</li>
                          <li>• Drawing tools (pencils, markers, or stylus)</li>
                          <li>• Word cards or word generator</li>
                          <li>• Timer (1-2 minutes per round)</li>
                        </ul>
                        <ul className="text-gray-700 space-y-2">
                          <li>• Score sheet</li>
                          <li>• 2 or more players (ideally 4-8 players in teams)</li>
                          <li>• Teams of 2-4 people each</li>
                          <li>• Designated scorekeeper</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <CollapsibleSection title="Step-by-Step Gameplay Instructions" defaultOpen={true}>
                    <div className="space-y-6">
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-indigo-800 mb-2">Round Setup:</h4>
                        <ol className="text-indigo-700 space-y-1 list-decimal list-inside">
                          <li>One team selects a drawer for the round</li>
                          <li>The drawer picks a word card or generates a word</li>
                          <li>Set the timer for the agreed duration (typically 60-90 seconds)</li>
                          <li>The drawer reviews the word without showing teammates</li>
                        </ol>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-green-800 mb-2">Drawing Phase:</h4>
                        <ol className="text-green-700 space-y-1 list-decimal list-inside">
                          <li>Start the timer when the drawer begins</li>
                          <li>The drawer attempts to illustrate the word using only pictures</li>
                          <li>No letters, numbers, or verbal clues are allowed</li>
                          <li>Teammates guess aloud while the drawer continues</li>
                        </ol>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-yellow-800 mb-2">Guessing Phase:</h4>
                        <ol className="text-yellow-700 space-y-1 list-decimal list-inside">
                          <li>Teammates call out guesses based on the drawing</li>
                          <li>The drawer can nod, shake head, or use gestures to indicate progress</li>
                          <li>If the correct word is guessed, the team scores a point</li>
                          <li>If time runs out without a correct guess, no points are awarded</li>
                        </ol>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Scoring System" defaultOpen={false}>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Standard Scoring:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• 1 point for each correctly guessed word</li>
                          <li>• Bonus points for guessing within first 30 seconds (optional)</li>
                          <li>• First team to reach 10-15 points wins</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Alternative Scoring:</h4>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Time-based: Award points based on how quickly word is guessed</li>
                          <li>• Difficulty-based: Award more points for harder words</li>
                          <li>• Round-based: Play set number of rounds, highest score wins</li>
                        </ul>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Drawing Rules and Guidelines" defaultOpen={false}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-green-800 mb-3">What You CAN Do:</h4>
                        <ul className="text-green-700 space-y-1">
                          <li>• Draw pictures, symbols, and shapes</li>
                          <li>• Use arrows to show direction or movement</li>
                          <li>• Draw multiple related images</li>
                          <li>• Use size and positioning to convey meaning</li>
                          <li>• Cross out incorrect interpretations</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-red-800 mb-3">What You CANNOT Do:</h4>
                        <ul className="text-red-700 space-y-1">
                          <li>• Write letters, numbers, or words</li>
                          <li>• Use verbal clues or sounds</li>
                          <li>• Point to objects in the room</li>
                          <li>• Use pre-agreed signals or codes</li>
                          <li>• Draw symbols that represent letters</li>
                        </ul>
                      </div>
                    </div>
                  </CollapsibleSection>
                </section>

                {/* Tips and Strategies */}
                <section id="tips-strategies" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <Target className="h-8 w-8 mr-3 text-indigo-600" />
                    Tips and Strategies
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-4">For Drawers</h3>
                      <ul className="text-blue-700 space-y-2">
                        <li>• Start with the most recognizable element</li>
                        <li>• Use simple, clear lines and shapes</li>
                        <li>• Think about breaking complex words into parts</li>
                        <li>• Use context clues and related concepts</li>
                        <li>• Don't worry about artistic quality - clarity matters most</li>
                      </ul>
                      
                      <h4 className="text-lg font-semibold text-blue-800 mt-6 mb-3">Drawing Strategies:</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• <strong>Compound Words:</strong> Draw each part separately</li>
                        <li>• <strong>Actions:</strong> Use stick figures and motion lines</li>
                        <li>• <strong>Abstract Concepts:</strong> Use symbols or metaphors</li>
                        <li>• <strong>Rhyming:</strong> Draw words that sound similar</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">For Guessers</h3>
                      <ul className="text-green-700 space-y-2">
                        <li>• Call out everything you see, even if it seems obvious</li>
                        <li>• Think about categories and related words</li>
                        <li>• Pay attention to the drawer's reactions</li>
                        <li>• Build on teammates' guesses</li>
                        <li>• Consider multiple meanings of visual elements</li>
                      </ul>
                      
                      <h4 className="text-lg font-semibold text-green-800 mt-6 mb-3">Guessing Strategies:</h4>
                      <ul className="text-green-700 space-y-1">
                        <li>• Start with obvious interpretations</li>
                        <li>• Think about word categories (animals, actions, objects)</li>
                        <li>• Consider compound words and phrases</li>
                        <li>• Look for visual puns or wordplay</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Game Variations */}
                <CollapsibleSection title="Game Variations and Modes" defaultOpen={false}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Classic Variations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-800 mb-2">All Play</h5>
                          <p className="text-purple-700 text-sm">All teams guess simultaneously. First team to guess correctly gets the point.</p>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <h5 className="font-semibold text-orange-800 mb-2">Charades Style</h5>
                          <p className="text-orange-700 text-sm">Drawer acts out the word instead of drawing. Combines physical and visual communication.</p>
                        </div>
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                          <h5 className="font-semibold text-teal-800 mb-2">Telephone Pictionary</h5>
                          <p className="text-teal-700 text-sm">Players alternate between writing and drawing. Results in hilarious misinterpretations.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Modern Variations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                          <h5 className="font-semibold text-indigo-800 mb-2">Speed Pictionary</h5>
                          <p className="text-indigo-700 text-sm">Shorter time limits (30 seconds) for rapid-fire rounds that test quick thinking.</p>
                        </div>
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                          <h5 className="font-semibold text-pink-800 mb-2">Theme Rounds</h5>
                          <p className="text-pink-700 text-sm">All words relate to specific topics like movies, animals, food, or holidays.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Educational Applications */}
                <CollapsibleSection title="Educational Applications" defaultOpen={false}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Classroom Use</h4>
                      <p className="text-gray-700 mb-3">Perfect for vocabulary review, subject-specific terms (science, history, literature), language learning and ESL instruction, and creative writing inspiration.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Family Game Night</h4>
                      <p className="text-gray-700 mb-3">Adapt rules for mixed age groups, use simpler words for younger children, allow collaborative drawing for beginners, and focus on fun over competition.</p>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Skill Adaptations */}
                <CollapsibleSection title="Adaptations for Different Skill Levels" defaultOpen={false}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">For Beginners</h4>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Longer time limits (2-3 minutes)</li>
                        <li>• Easier word categories</li>
                        <li>• Allow pointing to drawn elements</li>
                        <li>• Permit simple verbal hints</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-red-800 mb-3">For Advanced Players</h4>
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• Shorter time limits (30-45 seconds)</li>
                        <li>• Abstract and complex words</li>
                        <li>• Stricter drawing rules</li>
                        <li>• Penalty for rule violations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-800 mb-3">For Mixed Groups</h4>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• Rotate difficulty levels</li>
                        <li>• Allow different time limits by age</li>
                        <li>• Use team mentoring systems</li>
                        <li>• Provide multiple word options</li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Digital vs Traditional */}
                <CollapsibleSection title="Digital vs Traditional Pictionary" defaultOpen={false}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Traditional Advantages</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Physical drawing materials</li>
                        <li>• Face-to-face interaction</li>
                        <li>• No technology barriers</li>
                        <li>• Portable and accessible anywhere</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Digital Advantages</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Unlimited word databases</li>
                        <li>• Automatic timing and scoring</li>
                        <li>• Remote play capabilities</li>
                        <li>• Accessibility features</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mt-6">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Our Digital Solution</h4>
                    <p className="text-indigo-700 mb-4">
                      Our Pictionary Word Generator combines the best of both worlds by providing curated word lists, 
                      customizable game settings, timer and scoring features, and team management tools while maintaining 
                      the social, face-to-face gameplay experience.
                    </p>
                    <Link 
                      href="/pictionary" 
                      className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Try Our Generator
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </CollapsibleSection>

                {/* FAQ */}
                <section id="faq" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    <CollapsibleSection title="Can the drawer make sounds or gestures?" defaultOpen={false}>
                      <p className="text-gray-700">
                        Traditional rules prohibit verbal clues, but non-verbal gestures like nodding or pointing to parts 
                        of the drawing are usually allowed. Establish house rules before playing.
                      </p>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="What happens if someone accidentally says the word?" defaultOpen={false}>
                      <p className="text-gray-700">
                        The round typically ends with no points awarded. Some groups allow a "do-over" with a new word.
                      </p>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="How long should each round last?" defaultOpen={false}>
                      <p className="text-gray-700">
                        Standard rounds are 60-90 seconds, but adjust based on group skill level and word difficulty.
                      </p>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="How many people can play?" defaultOpen={false}>
                      <p className="text-gray-700">
                        Pictionary works with as few as 3 people and as many as 20+, though 6-8 players in teams of 2-4 is optimal.
                      </p>
                    </CollapsibleSection>
                    
                    <CollapsibleSection title="Do you need artistic skill to play?" defaultOpen={false}>
                      <p className="text-gray-700">
                        Absolutely not! Simple drawings and stick figures are often more effective than detailed artwork. 
                        The goal is clear communication, not artistic beauty.
                      </p>
                    </CollapsibleSection>
                  </div>
                </section>

                {/* Conclusion */}
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Playing?</h2>
                    <p className="text-gray-700 mb-6">
                      Pictionary is more than just entertainment—it's a powerful tool for building relationships, 
                      developing skills, and creating lasting memories. The combination of creativity, communication, 
                      and collaboration makes it an ideal activity for all ages and occasions.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        href="/pictionary" 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center font-medium"
                      >
                        <Gamepad2 className="h-5 w-5 mr-2" />
                        Start Playing Now
                      </Link>
                      <Link 
                        href="/blog/pictionary-word-generator" 
                        className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center font-medium"
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        Read More Tips
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6">
                  <ShareButtons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}