'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PictionaryArticleContent() {
  const [_showFullArticle, _setShowFullArticle] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 bg-white">
      <article className="prose prose-lg max-w-4xl mx-auto bg-white">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Pictionary Word Generator: The Ultimate Tool for Your Drawing Games
        </h1>
        
        <div className="flex items-center justify-center mb-6 text-gray-600">
          <span className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
          <span className="mx-3">|</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 min read
          </span>
        </div>
        
        <div className="flex justify-center mb-0">
          <Link href="/pictionary" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            Try Our Pictionary Word Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8"></div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What is a Pictionary Word Generator?</h2>
        
        <p className="text-gray-800">
          A <strong>Pictionary Word Generator</strong> is an essential tool for anyone who loves playing the classic drawing and guessing game. Our free online generator creates random words for your Pictionary games, eliminating the need for physical cards or the challenge of coming up with words on your own. Whether you&apos;re hosting a family game night, a classroom activity, or a party with friends, our <strong>Pictionary Word Generator</strong> makes the game setup effortless and fun.
        </p>
        
        {/* Added information callout box */}
        <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">The History of Pictionary</h3>
              <p className="text-blue-900 mt-2">Pictionary was invented in 1985 by Robert Angel while he was a waiter in Seattle. The game was first produced by Angel Games before being acquired by Mattel. Since then, it&apos;s become one of the most popular party games worldwide, selling millions of copies in over 60 countries and translated into dozens of languages!</p>
            </div>
          </div>
        </div>
        
        {/* Added Pictionary Generator Tool */}
        <div className="my-10 rounded-xl overflow-hidden shadow-2xl">
          <h3 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Try Our Pictionary Word Generator Tool
          </h3>
          <div className="bg-white p-6 text-center">
            <p className="text-gray-800 mb-4">
              Our free Pictionary Word Generator tool makes it easy to create random words for your drawing games. Choose from different difficulty levels, categories, and customize your gameplay with timer settings and hints!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/pictionary" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Open Pictionary Generator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Multiple Difficulty Levels
              </div>
              <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Built-in Timer
              </div>
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Hint System
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Play Pictionary</h2>
        
        <p className="text-gray-800">
          Pictionary is a classic party game that combines drawing skills with quick thinking. Here&apos;s a simple guide to playing Pictionary using our word generator:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ol className="list-decimal pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Form Teams</strong>: Divide players into at least two teams.
            </li>
            <li>
              <strong className="text-gray-900">Set Up</strong>: Provide paper and pencils for drawing. The artist will need to see the word to draw, but their team should not.
            </li>
            <li>
              <strong className="text-gray-900">Generate Words</strong>: Use our <strong>Pictionary Word Generator</strong> to create random words for each round.
            </li>
            <li>
              <strong className="text-gray-900">Take Turns</strong>: One player from each team takes turns being the artist, drawing the generated word.
            </li>
            <li>
              <strong className="text-gray-900">Set the Timer</strong>: Each round typically lasts 60 seconds, but you can adjust this based on your preferences.
            </li>
            <li>
              <strong className="text-gray-900">Use Hints When Stuck</strong>: Our generator includes a hint system to help when players are struggling. The artist can reveal a letter or get a category hint, with the number of available hints depending on the difficulty level (Easy: 3 hints, Medium: 2 hints, Hard: 1 hint).
            </li>
            <li>
              <strong className="text-gray-900">Guess</strong>: The artist&apos;s team must guess the word before time runs out.
            </li>
            <li>
              <strong className="text-gray-900">Score Points</strong>: Teams earn a point for each correct guess within the time limit.
            </li>
            <li>
              <strong className="text-gray-900">First to Set Score Wins</strong>: The first team to reach an agreed-upon score (typically 10-20 points) wins the game.
            </li>
          </ol>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200 shadow-sm mb-8">
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
              <h3 className="text-xl font-medium text-indigo-700 mb-3">For Artists</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Start with the most recognizable features of the object</li>
                <li>Use simple shapes and stick figures rather than detailed drawings</li>
                <li>Draw larger concepts before smaller details</li>
                <li>If teammates are struggling, try a different approach rather than adding more to your current drawing</li>
                <li>Practice common categories like animals, objects, and actions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h3 className="text-xl font-medium text-indigo-700 mb-3">For Guessers</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Call out everything you see, even if it seems obvious</li>
                <li>Think about categories and associations</li>
                <li>Pay attention to the artist&apos;s gestures and emphasis</li>
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
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Play Pictionary with Our Word Generator</h2>
        
        <ol className="list-decimal pl-6 space-y-4 mb-8 text-gray-800">
          <li>
            <strong>Set Up Teams:</strong> Divide players into at least two teams. Each team should have at least two players – one to draw and others to guess.
          </li>
          <li>
            <strong>Choose Settings:</strong> Select your preferred difficulty level (Easy, Medium, or Hard) and category. For younger players, we recommend using the Easy difficulty.
          </li>
          <li>
            <strong>Generate a Word:</strong> Click the &quot;Generate&quot; button to get a random word based on your selected settings.
          </li>
          <li>
            <strong>Start the Timer:</strong> Set the timer (typically 60 seconds) and start drawing as soon as the timer begins.
          </li>
          <li>
            <strong>Use the Hint System:</strong> If players are struggling to guess the word, use our hint system:
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li><strong>Letter Reveal:</strong> Reveals a random letter in the word</li>
              <li><strong>Category Hint:</strong> Provides a clue about the word&apos;s category</li>
              <li>The number of available hints depends on difficulty (Easy: 3, Medium: 2, Hard: 1)</li>
              <li>Use hints strategically, as they are limited per word!</li>
            </ul>
          </li>
          <li>
            <strong>Follow the Rules:</strong> The drawer cannot speak, use gestures, or draw letters or numbers. They must communicate solely through their drawing.
          </li>
          <li>
            <strong>Score Points:</strong> Teams earn a point for each correct guess within the time limit.
          </li>
          <li>
            <strong>First to Set Score Wins:</strong> The first team to reach an agreed-upon score (typically 10 points) wins the game.
          </li>
        </ol>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Pictionary Word Ideas for Different Age Groups</h2>
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-gray-800">Age Group</th>
                <th className="border border-gray-300 px-4 py-2 text-gray-800">Recommended Difficulty</th>
                <th className="border border-gray-300 px-4 py-2 text-gray-800">Sample Words</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Children (5-8)</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Easy</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Dog, Sun, Ball, Tree, Fish</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Pre-teens (9-12)</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Easy to Medium</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Bicycle, Rainbow, Soccer, Elephant, Castle</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Teenagers (13-17)</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Medium</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Skateboard, Volcano, Submarine, Telescope, Tornado</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Adults (18+)</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Medium to Hard</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">Architecture, Democracy, Investigation, Perspective, Civilization</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {!_showFullArticle && (
          <div className="text-center my-8">
            <motion.button
              onClick={() => _setShowFullArticle(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More About Pictionary Word Generator
            </motion.button>
          </div>
        )}
        
        {_showFullArticle && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Benefits of Using a Pictionary Word Generator for Education</h2>
            
            <p className="text-gray-800">
              Beyond entertainment, our <strong>Pictionary Word Generator</strong> serves as a valuable educational tool. Teachers and parents can use it to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-800">
              <li>Enhance vocabulary development in a fun, engaging way</li>
              <li>Improve visual communication skills</li>
              <li>Boost creativity and artistic expression</li>
              <li>Develop quick thinking and problem-solving abilities</li>
              <li>Strengthen team collaboration and social interaction</li>
              <li>Support language learning for ESL/EFL students</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">The History of Pictionary: From Board Game to Digital Tool</h2>
            
            <p className="text-gray-800">
              Pictionary was invented in 1985 by Robert Angel and became an instant hit worldwide. The classic board game has evolved over the decades, and now digital tools like our <strong>Pictionary Word Generator</strong> have made the game more accessible and versatile than ever before.
            </p>
            
            <p className="text-gray-800">
              The transition from physical cards to online generators has revolutionized how people play Pictionary. Our generator offers thousands of words across multiple categories and difficulty levels, far exceeding what traditional card sets provide. This digital evolution has breathed new life into this beloved game, making it perfect for both in-person gatherings and virtual game nights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Tips for Becoming a Pictionary Champion</h2>
            
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200 shadow-sm mb-8">
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
                  <h3 className="text-xl font-medium text-indigo-700 mb-3">For Artists</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-800">
                    <li>Start with the most recognizable features of the object</li>
                    <li>Use simple shapes and stick figures rather than detailed drawings</li>
                    <li>Draw larger concepts before smaller details</li>
                    <li>If teammates are struggling, try a different approach rather than adding more to your current drawing</li>
                    <li>Practice common categories like animals, objects, and actions</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg border border-indigo-200 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium text-indigo-700 mb-3">For Guessers</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-800">
                    <li>Call out everything you see, even if it seems obvious</li>
                    <li>Think about categories and associations</li>
                    <li>Pay attention to the artist&apos;s gestures and emphasis</li>
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
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Pictionary Word Generator for Virtual Game Nights</h2>
            
            <p className="text-gray-800">
              In today&apos;s digital world, virtual game nights have become increasingly popular. Our <strong>Pictionary Word Generator</strong> is perfect for online play through video conferencing platforms. Here&apos;s how to set up a virtual Pictionary game:
            </p>
            
            <ol className="list-decimal pl-6 space-y-4 mb-8 text-gray-800">
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
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Frequently Asked Questions About Pictionary Word Generator</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Is your Pictionary Word Generator completely free?</h3>
                <p className="text-gray-800">Yes, our Pictionary Word Generator is 100% free to use with no hidden fees or subscriptions required. Enjoy unlimited word generation for your games!</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Can I use the Pictionary Word Generator on my mobile device?</h3>
                <p className="text-gray-800">Absolutely! Our generator is fully responsive and works perfectly on smartphones, tablets, and desktop computers, making it ideal for on-the-go gaming.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">How many words are in your Pictionary database?</h3>
                <p className="text-gray-800">Our database contains thousands of carefully selected words across multiple categories and difficulty levels, ensuring you&apos;ll never run out of fresh words for your games.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Can I suggest new words for the generator?</h3>
                <p className="text-gray-800">We&apos;re always looking to improve our word database! Contact us through our feedback form to suggest new words or categories you&apos;d like to see added.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Is this the official Pictionary game?</h3>
                <p className="text-gray-800">No, our Pictionary Word Generator is not affiliated with the official Pictionary board game. It&apos;s a free tool designed to enhance your drawing and guessing games, whether you&apos;re playing the official game or your own version.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4 text-gray-900">Expert Tips for Pictionary Success</h2>
            
            <p className="text-gray-800 mb-6">
              Want to improve your Pictionary skills? These expert tips will help you become a drawing and guessing champion:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-red-400 to-orange-400"></div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-red-100 w-10 h-10 flex items-center justify-center text-red-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">For Artists</h3>
                  </div>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex">
                      <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Start with a basic outline before adding details</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Focus on distinctive features of the object</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Use stick figures for people - simplicity is key</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Draw objects in relation to each other for compound words</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">For Guessers</h3>
                  </div>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex">
                      <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Watch the artist&apos;s initial strokes carefully</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Call out specific parts you recognize, not just the whole</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Think of related words when you&apos;re close</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Pay attention to the artist&apos;s reactions to your guesses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center text-green-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Game Setup Tips</h3>
                  </div>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Match difficulty to your group&apos;s experience level</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Generate a few backup words in case of skips</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Use the timer feature to keep the game moving</span>
                    </li>
                    <li className="flex">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-800">Create mixed teams with various skill levels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4 text-gray-900">Creative Themed Pictionary Ideas</h2>
            
            <p className="text-gray-800 mb-6">
              Take your Pictionary games to the next level with these creative themed game night ideas that use our word generator:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-lg border border-pink-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-pink-200 text-pink-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path fillRule="evenodd" d="M21.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-pink-800">Movie Night Pictionary</h3>
                </div>
                <p className="text-gray-800 mb-3">
                  Choose movie titles, famous scenes, or characters for players to draw. Set your word generator to the "medium" difficulty and select categories related to entertainment.
                </p>
                <p className="text-gray-800">
                  <strong>Pro Tip:</strong> Award bonus points for guessing both the movie title and the character or scene being depicted.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-green-200 text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path fillRule="evenodd" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">Around the World</h3>
                </div>
                <p className="text-gray-800 mb-3">
                  Focus on landmarks, countries, cultures, and cuisines from around the world. Use the "places" category in our generator and mix in some "hard" difficulty words for adults.
                </p>
                <p className="text-gray-800">
                  <strong>Pro Tip:</strong> Have players dress up according to the region or country theme for extra fun.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-lg border border-yellow-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-yellow-200 text-yellow-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-800">Tech Challenge</h3>
                </div>
                <p className="text-gray-800 mb-3">
                  Test your friends&apos; tech knowledge with drawings of gadgets, apps, software, and tech innovations. Use our generator with &quot;hard&quot; difficulty words.
                </p>
                <p className="text-gray-800">
                  <strong>Pro Tip:</strong> Allow players to draw on tablets for this theme - it adds an extra layer of tech immersion!
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-sky-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-200 text-blue-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800">Science Pictionary</h3>
                </div>
                <p className="text-gray-800 mb-3">
                  Perfect for educational settings, this theme focuses on scientific concepts, discoveries, and natural phenomena. Mix "medium" and "hard" difficulty words.
                </p>
                <p className="text-gray-800">
                  <strong>Pro Tip:</strong> Have someone briefly explain the science behind the word that was drawn for an educational twist.
                </p>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="my-12 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                <p className="text-indigo-100">Everything you need to know about our Pictionary Word Generator</p>
              </div>
              
              <div className="bg-white p-6">
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">How many words are in your Pictionary database?</h3>
                    <p className="text-gray-800">Our Pictionary Word Generator includes thousands of carefully curated words across multiple categories and difficulty levels. We regularly update our database to ensure fresh words for your games.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Can I use this for online/virtual Pictionary games?</h3>
                    <p className="text-gray-800">Absolutely! Our generator is fully responsive and works perfectly for virtual Pictionary games over video calls or using online drawing platforms. Simply share your screen or have the designated artist use the generator on their device.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">What age groups is this suitable for?</h3>
                    <p className="text-gray-800">Our Pictionary Word Generator is designed for all ages. The "easy" difficulty level is perfect for children (ages 7+), while "medium" works well for mixed groups, and "hard" provides a challenge for teens and adults.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Do I need to create an account or pay to use the generator?</h3>
                    <p className="text-gray-800">No! Our Pictionary Word Generator is completely free to use and doesn&apos;t require any registration, account creation, or payment information. Just visit the page and start generating words instantly.</p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Can I suggest words to add to your database?</h3>
                    <p className="text-gray-800">We love hearing from our users! If you have suggestions for words or categories to add to our generator, please contact us through the feedback form on our website. We regularly update our database based on user feedback.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Will the generator repeat words during a game session?</h3>
                    <p className="text-gray-800">Our generator keeps track of recently used words in your current session to minimize repetition. This ensures a fresh and varied gameplay experience, even during extended gaming sessions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Testimonials Section */}
            <div className="my-12 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
                <h2 className="text-2xl font-bold text-white">What Our Users Say</h2>
                <p className="text-indigo-100">Read how our Pictionary Word Generator has improved game nights around the world</p>
              </div>
              
              <div className="bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg border border-indigo-200 relative">
                    <div className="absolute -top-3 -left-3 text-indigo-500 text-5xl opacity-30">"</div>
                    <p className="text-gray-800 italic relative z-10">
                      We use this generator for our family game nights every weekend. The different difficulty levels are perfect since we have players ranging from 8 to 70 years old! Everyone can participate and have fun.
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="rounded-full bg-indigo-200 w-10 h-10 flex items-center justify-center text-indigo-700 font-bold">
                        SM
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                        <p className="text-xs text-gray-500">Family Game Night Host</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200 relative">
                    <div className="absolute -top-3 -left-3 text-purple-500 text-5xl opacity-30">"</div>
                    <p className="text-gray-800 italic relative z-10">
                      As a teacher, I&apos;m always looking for engaging activities for my classroom. This Pictionary generator has been fantastic for my ESL students - it helps them learn vocabulary while having fun!
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="rounded-full bg-purple-200 w-10 h-10 flex items-center justify-center text-purple-700 font-bold">
                        JT
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">James T.</p>
                        <p className="text-xs text-gray-500">Elementary School Teacher</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-lg border border-pink-200 relative">
                    <div className="absolute -top-3 -left-3 text-pink-500 text-5xl opacity-30">"</div>
                    <p className="text-gray-800 italic relative z-10">
                      I host virtual team-building sessions for remote employees, and your word generator has been a lifesaver. The timer feature and difficulty settings make it easy to adapt to different groups.
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="rounded-full bg-pink-200 w-10 h-10 flex items-center justify-center text-pink-700 font-bold">
                        LR
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Lisa R.</p>
                        <p className="text-xs text-gray-500">HR Coordinator</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 rounded-lg border border-cyan-200 relative">
                    <div className="absolute -top-3 -left-3 text-cyan-500 text-5xl opacity-30">"</div>
                    <p className="text-gray-800 italic relative z-10">
                      I love how the word history feature prevents repeats. We&apos;ve been using this for months at our game cafe, and it keeps our Pictionary tournaments fresh and challenging!
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="rounded-full bg-cyan-200 w-10 h-10 flex items-center justify-center text-cyan-700 font-bold">
                        MT
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Marco T.</p>
                        <p className="text-xs text-gray-500">Game Cafe Owner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-xl border border-indigo-200 shadow-md my-8">
              <h3 className="text-2xl font-bold text-center text-indigo-800 mb-4">Ready to Transform Your Game Nights?</h3>
              <p className="text-lg font-medium text-center text-gray-800 mb-6">
                Join thousands of satisfied players who have discovered the fun and convenience of our Pictionary Word Generator. No sign-ups, no downloads, no hassle - just instant gaming fun!
              </p>
              <div className="flex justify-center">
                <Link href="/pictionary" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-md shadow-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                  Start Generating Pictionary Words
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
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