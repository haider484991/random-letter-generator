'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RandomObjectsArticleContent() {
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
          Random Objects Generator: A Versatile Tool for Games, Teaching, and Creativity
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
            4 min read
          </span>
        </div>
        
        <div className="flex justify-center mb-0">
          <Link href="/random-objects" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Try Our Random Objects Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8"></div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What is a Random Objects Generator?</h2>
        
        <p className="text-gray-800">
          A <strong>Random Objects Generator</strong> is a powerful tool that selects random items from various categories like animals, foods, vehicles, sports, and professions. Our free online generator creates random object suggestions for games, creative inspiration, teaching activities, or any situation where you need a random item. Whether you&apos;re a teacher planning classroom activities, a game enthusiast looking to add variety to your games, or a creative seeking inspiration, our <strong>Random Objects Generator</strong> provides endless possibilities.
        </p>
        
        {/* Information callout box */}
        <div className="my-8 bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Did You Know?</h3>
              <p className="text-green-900 mt-2">Random object selection is a technique used in many creative fields, from art (where surrealists used random object juxtaposition to spark new ideas) to education (where random objects help with storytelling and vocabulary building). Our generator makes this powerful technique available at the click of a button!</p>
            </div>
          </div>
        </div>
        
        {/* Added Random Objects Generator Tool */}
        <div className="my-10 rounded-xl overflow-hidden shadow-2xl">
          <h3 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white">
            Try Our Random Objects Generator Tool
          </h3>
          <div className="bg-white p-6 text-center">
            <p className="text-gray-800 mb-4">
              Our free Random Objects Generator tool makes it easy to generate random items from different categories. Perfect for games, teaching activities, creative exercises, and more!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/random-objects" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Open Objects Generator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Multiple Categories
              </div>
              <div className="flex items-center px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Visual Spinner
              </div>
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Save Favorites
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Popular Uses for a Random Objects Generator</h2>
        
        <p className="text-gray-800">
          Our Random Objects Generator is incredibly versatile and can be used in numerous ways:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ol className="list-decimal pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Drawing Challenges</strong>: Generate random objects to sketch or paint, perfect for art practice and overcoming creative blocks.
            </li>
            <li>
              <strong className="text-gray-900">Improvisation Games</strong>: Use random objects as prompts for improv acting or storytelling exercises.
            </li>
            <li>
              <strong className="text-gray-900">Educational Activities</strong>: Teachers can use random objects for vocabulary building, creative writing prompts, or science discussions about object properties.
            </li>
            <li>
              <strong className="text-gray-900">Party Games</strong>: Create custom charades, pictionary, or other party games using randomly selected objects.
            </li>
            <li>
              <strong className="text-gray-900">Creative Writing</strong>: Challenge yourself to incorporate random objects into your stories or poems to stimulate creativity.
            </li>
            <li>
              <strong className="text-gray-900">Design Challenges</strong>: Product designers and engineers can use random objects as inspiration for new innovations or problem-solving.
            </li>
            <li>
              <strong className="text-gray-900">Memory Games</strong>: Create lists of random objects for participants to memorize and recall, improving cognitive skills.
            </li>
            <li>
              <strong className="text-gray-900">Photography Prompts</strong>: Use random objects as subjects for photography challenges or scavenger hunts.
            </li>
          </ol>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Object Categories in Our Generator</h2>
        
        <p className="text-gray-800">
          Our Random Objects Generator includes items from several diverse categories:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-green-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Animals</h3>
            </div>
            <p className="text-gray-700">Dogs, cats, elephants, lions, tigers, giraffes, pandas, dolphins, eagles, and many more creatures from around the world.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-red-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Foods</h3>
            </div>
            <p className="text-gray-700">Pizza, burgers, tacos, sushi, ice cream, cookies, fruits, vegetables, and many more delicious foods from different cuisines.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Vehicles</h3>
            </div>
            <p className="text-gray-700">Cars, trucks, buses, trains, airplanes, helicopters, boats, motorcycles, bicycles, and other transportation methods.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-orange-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 00-1.555.832 1 1 0 00.555-1.168l3 2a1 1 0 001.414 0l3-2a1 1 0 00.555 1.168z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Sports</h3>
            </div>
            <p className="text-gray-700">Soccer, basketball, football, baseball, tennis, golf, hockey, volleyball, swimming, running, cycling, and other popular sports.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Professions</h3>
            </div>
            <p className="text-gray-700">Doctor, teacher, engineer, lawyer, chef, artist, musician, programmer, scientist, firefighter, and many other careers.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Key Features of Our Random Objects Generator</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ul className="list-disc pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Category Selection</strong>: Choose from different object categories or generate from all categories at once.
            </li>
            <li>
              <strong className="text-gray-900">Visual Spinner</strong>: Watch the interactive spinner animation as it selects a random object.
            </li>
            <li>
              <strong className="text-gray-900">History Tracking</strong>: Keep track of previously generated objects to avoid repetition.
            </li>
            <li>
              <strong className="text-gray-900">Favorites System</strong>: Save your favorite generated objects for quick access in future sessions.
            </li>
            <li>
              <strong className="text-gray-900">Statistics</strong>: View which objects have been generated most frequently.
            </li>
            <li>
              <strong className="text-gray-900">Mobile-Friendly Design</strong>: Works perfectly on all devices, from desktops to smartphones.
            </li>
            <li>
              <strong className="text-gray-900">No Sign-Up Required</strong>: Start generating random objects instantly without creating an account.
            </li>
            <li>
              <strong className="text-gray-900">Completely Free</strong>: All features available at no cost.
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-cyan-100 p-6 rounded-lg border border-green-200 my-8">
          <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white">Ready to Start Generating Random Objects?</h3>
          <p className="text-gray-800 mb-4">
            Whether you&apos;re planning a game, teaching a class, seeking creative inspiration, or just having fun, our Random Objects Generator is the perfect tool for you. Try it now and discover endless possibilities!
          </p>
          <div className="flex justify-center">
            <Link 
              href="/random-objects" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Generate Random Objects Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="my-8 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Explore Our Other Generators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/random-letter-generator" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-indigo-600">Random Letter Generator</h4>
              <p className="text-sm text-gray-600">Generate random letters for games and activities.</p>
            </Link>
            <Link href="/blog/pictionary-word-generator" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-indigo-600">Pictionary Word Generator</h4>
              <p className="text-sm text-gray-600">Generate random words for your drawing games.</p>
            </Link>
            <Link href="/blog/random-pokemon-generator" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-indigo-600">Random Pokémon Generator</h4>
              <p className="text-sm text-gray-600">Create random Pokémon teams and explore stats.</p>
            </Link>
            <Link href="/blog/cursed-text-generator" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-indigo-600">Cursed Text Generator</h4>
              <p className="text-sm text-gray-600">Transform normal text into spooky, glitched styles.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
