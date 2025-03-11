'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PictionaryArticleContent() {
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  
  // Use useEffect to handle client-side only code
  useEffect(() => {
    // Set the date on the client side only to avoid hydration mismatch
    setFormattedDate(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Pictionary Word Generator: The Ultimate Tool for Your Drawing Games
        </h1>
        
        <div className="flex justify-center mb-8">
          <Link href="/pictionary" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            Try Our Pictionary Word Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8 relative w-full h-[400px]">
          <Image 
            src="/images/pictionary-game.jpg" 
            alt="People playing Pictionary with our word generator" 
            className="rounded-lg shadow-lg"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <p className="text-sm text-center text-gray-500 mt-[410px]">Enhance your Pictionary games with our free word generator</p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">What is a Pictionary Word Generator?</h2>
        
        <p>
          A <strong>Pictionary Word Generator</strong> is an essential tool for anyone who loves playing the classic drawing and guessing game. Our free online generator creates random words for your Pictionary games, eliminating the need for physical cards or the challenge of coming up with words on your own. Whether you&apos;re hosting a family game night, a classroom activity, or a party with friends, our <strong>Pictionary Word Generator</strong> makes the game setup effortless and fun.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use Our Pictionary Word Generator?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-700 mb-3">Customizable Difficulty Levels</h3>
            <p>Choose from easy, medium, or hard words to match your group&apos;s skill level. Easy words are perfect for children or beginners, while hard words challenge even the most experienced players.</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-700 mb-3">Multiple Categories</h3>
            <p>Select from various categories like animals, food, sports, occupations, and places. This allows you to tailor the game to your group&apos;s interests or create themed Pictionary rounds.</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-700 mb-3">Built-in Timer</h3>
            <p>Our generator includes an adjustable timer, so you don&apos;t need a separate stopwatch. Set the time limit from 10 seconds to 3 minutes depending on your preference.</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-700 mb-3">Word History</h3>
            <p>Keep track of previously generated words to avoid repetition and ensure a fresh gaming experience every time you play.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Play Pictionary with Our Word Generator</h2>
        
        <ol className="list-decimal pl-6 space-y-4 mb-8">
          <li>
            <strong>Set Up Teams:</strong> Divide players into at least two teams. Each team should have at least two players – one to draw and others to guess.
          </li>
          <li>
            <strong>Choose Settings:</strong> Select your preferred difficulty level, category, and timer duration on our <Link href="/pictionary" className="text-indigo-600 hover:text-indigo-800 underline">Pictionary Word Generator</Link>.
          </li>
          <li>
            <strong>Take Turns Drawing:</strong> One player from each team takes turns generating a word and drawing it for their teammates to guess.
          </li>
          <li>
            <strong>Follow the Rules:</strong> The drawer cannot speak, use gestures, or draw letters or numbers. They must communicate solely through their drawing.
          </li>
          <li>
            <strong>Score Points:</strong> Teams earn a point when they correctly guess the word within the time limit. The first team to reach an agreed-upon score (typically 10 points) wins.
          </li>
        </ol>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Pictionary Word Ideas for Different Age Groups</h2>
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Age Group</th>
                <th className="border border-gray-300 px-4 py-2">Recommended Difficulty</th>
                <th className="border border-gray-300 px-4 py-2">Sample Words</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Children (5-8)</td>
                <td className="border border-gray-300 px-4 py-2">Easy</td>
                <td className="border border-gray-300 px-4 py-2">Dog, Sun, Ball, Tree, Fish</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Pre-teens (9-12)</td>
                <td className="border border-gray-300 px-4 py-2">Easy to Medium</td>
                <td className="border border-gray-300 px-4 py-2">Bicycle, Rainbow, Soccer, Elephant, Castle</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Teenagers (13-17)</td>
                <td className="border border-gray-300 px-4 py-2">Medium</td>
                <td className="border border-gray-300 px-4 py-2">Skateboard, Volcano, Submarine, Telescope, Tornado</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Adults (18+)</td>
                <td className="border border-gray-300 px-4 py-2">Medium to Hard</td>
                <td className="border border-gray-300 px-4 py-2">Architecture, Democracy, Investigation, Perspective, Civilization</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {!showFullArticle && (
          <div className="text-center my-8">
            <motion.button
              onClick={() => setShowFullArticle(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More About Pictionary Word Generator
            </motion.button>
          </div>
        )}
        
        {showFullArticle && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Benefits of Using a Pictionary Word Generator for Education</h2>
            
            <p>
              Beyond entertainment, our <strong>Pictionary Word Generator</strong> serves as a valuable educational tool. Teachers and parents can use it to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Enhance vocabulary development in a fun, engaging way</li>
              <li>Improve visual communication skills</li>
              <li>Boost creativity and artistic expression</li>
              <li>Develop quick thinking and problem-solving abilities</li>
              <li>Strengthen team collaboration and social interaction</li>
              <li>Support language learning for ESL/EFL students</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">The History of Pictionary: From Board Game to Digital Tool</h2>
            
            <p>
              Pictionary was invented in 1985 by Robert Angel and became an instant hit worldwide. The classic board game has evolved over the decades, and now digital tools like our <strong>Pictionary Word Generator</strong> have made the game more accessible and versatile than ever before.
            </p>
            
            <p>
              The transition from physical cards to online generators has revolutionized how people play Pictionary. Our generator offers thousands of words across multiple categories and difficulty levels, far exceeding what traditional card sets provide. This digital evolution has breathed new life into this beloved game, making it perfect for both in-person gatherings and virtual game nights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Becoming a Pictionary Champion</h2>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 relative h-[200px]">
                  <Image 
                    src="/images/pictionary-drawing.jpg" 
                    alt="Person drawing in Pictionary" 
                    className="rounded-lg shadow-sm"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium text-indigo-700 mb-3">For Drawers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Start with the most recognizable features of the object</li>
                    <li>Use simple shapes and stick figures rather than detailed drawings</li>
                    <li>Draw larger concepts before smaller details</li>
                    <li>If teammates are struggling, try a different approach rather than adding more to your current drawing</li>
                    <li>Practice common categories like animals, objects, and actions</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium text-indigo-700 mb-3">For Guessers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Call out everything you see, even if it seems obvious</li>
                    <li>Think about categories and associations</li>
                    <li>Pay attention to the drawer&apos;s gestures and emphasis</li>
                    <li>Consider synonyms and related concepts</li>
                    <li>Don&apos;t fixate on one interpretation if you&apos;re stuck</li>
                  </ul>
                </div>
                <div className="md:w-1/3 relative h-[200px]">
                  <Image 
                    src="/images/pictionary-players.jpg" 
                    alt="People guessing in Pictionary" 
                    className="rounded-lg shadow-sm"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Pictionary Word Generator for Virtual Game Nights</h2>
            
            <p>
              In today&apos;s digital world, virtual game nights have become increasingly popular. Our <strong>Pictionary Word Generator</strong> is perfect for online play through video conferencing platforms. Here&apos;s how to set up a virtual Pictionary game:
            </p>
            
            <ol className="list-decimal pl-6 space-y-4 mb-8">
              <li>
                <strong>Choose a Drawing Platform:</strong> Use a shared whiteboard feature in your video conferencing tool, or dedicated drawing platforms like Skribbl.io or Drawasaurus.
              </li>
              <li>
                <strong>Generate Words:</strong> The drawer can use our <Link href="/pictionary" className="text-indigo-600 hover:text-indigo-800 underline">Pictionary Word Generator</Link> to get their word.
              </li>
              <li>
                <strong>Private Communication:</strong> The drawer can receive their word through private chat to keep it secret from other players.
              </li>
              <li>
                <strong>Set Up Teams:</strong> Create breakout rooms for team discussions or use the main room for all guessing.
              </li>
              <li>
                <strong>Track Scores:</strong> Designate someone as the scorekeeper or use a shared document to track points.
              </li>
            </ol>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions About Pictionary Word Generator</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Is your Pictionary Word Generator completely free?</h3>
                <p>Yes, our Pictionary Word Generator is 100% free to use with no hidden fees or subscriptions required. Enjoy unlimited word generation for your games!</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Can I use the Pictionary Word Generator on my mobile device?</h3>
                <p>Absolutely! Our generator is fully responsive and works perfectly on smartphones, tablets, and desktop computers, making it ideal for on-the-go gaming.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">How many words are in your Pictionary database?</h3>
                <p>Our database contains thousands of carefully selected words across multiple categories and difficulty levels, ensuring you&apos;ll never run out of fresh words for your games.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Can I suggest new words for the generator?</h3>
                <p>We&apos;re always looking to improve our word database! Contact us through our feedback form to suggest new words or categories you&apos;d like to see added.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Is this the official Pictionary game?</h3>
                <p>No, our Pictionary Word Generator is not affiliated with the official Pictionary board game. It&apos;s a free tool designed to enhance your drawing and guessing games, whether you&apos;re playing the official game or your own version.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion: Elevate Your Pictionary Experience</h2>
            
            <p>
              Our <strong>Pictionary Word Generator</strong> transforms the classic drawing and guessing game into a more dynamic, customizable experience. With adjustable difficulty levels, diverse categories, and a built-in timer, it&apos;s the perfect companion for family game nights, classroom activities, parties, and virtual gatherings.
            </p>
            
            <p>
              Whether you&apos;re a Pictionary enthusiast looking to enhance your gameplay or a newcomer seeking an easy way to get started, our generator provides everything you need. The days of struggling to come up with words or purchasing card sets are over – our free online tool gives you unlimited access to thousands of Pictionary words at the click of a button.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200 shadow-sm my-8">
              <p className="text-lg font-medium text-center">
                Ready to take your Pictionary games to the next level? Try our <Link href="/pictionary" className="text-indigo-600 hover:text-indigo-800 underline">Pictionary Word Generator</Link> now and experience the difference!
              </p>
            </div>
            
            <div className="flex justify-center mt-12">
              <Link href="/pictionary" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                Start Generating Pictionary Words
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        )}
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-sm text-gray-500">
            Last Updated: {formattedDate}
          </p>
          <p className="text-sm text-gray-500">
            Keywords: pictionary word generator, pictionary words, random word generator, drawing game, guessing game, party games, family games, educational games, virtual games
          </p>
        </div>
      </article>
    </main>
  );
} 