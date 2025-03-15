'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LetterGeneratorArticleContent() {
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
          Random Letter Generator: Create Random Letters for Games, Teaching, and More
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
          <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            Try Our Random Letter Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8"></div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What is a Random Letter Generator?</h2>
        
        <p className="text-gray-800">
          A <strong>Random Letter Generator</strong> is a tool that produces random letters of the alphabet for various games, educational activities, and creative purposes. Our free online generator allows you to customize your random letters by selecting uppercase, lowercase, or mixed case, and by including or excluding vowels. Whether you&apos;re playing word games like Scrabble or Boggle, teaching the alphabet to children, or creating random acronyms, our Random Letter Generator provides a quick and easy solution.
        </p>
        
        {/* Information callout box */}
        <div className="my-8 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">Did You Know?</h3>
              <p className="text-blue-900 mt-2">
                While vowel-heavy words like &apos;queue&apos; and &apos;audio&apos; rely on vowels for pronunciation, consonant-focused words like &apos;rhythm&apos; and &apos;myth&apos; demonstrate how essential consonants are in English. Our generator lets you control the vowel/consonant mix to create the perfect random letter combinations for your specific needs.
              </p>
            </div>
          </div>
        </div>
        
        {/* Added Letter Generator Tool */}
        <div className="my-10 rounded-xl overflow-hidden shadow-2xl">
          <h3 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white">
            Try Our Random Letter Generator Tool
          </h3>
          <div className="bg-white p-6 text-center">
            <p className="text-gray-800 mb-4">
              Our free Random Letter Generator tool makes it easy to create random letters for games, teaching activities, and creative projects. Choose between uppercase, lowercase, or both, and customize your generator settings!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                Open Letter Generator
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
                Multiple Case Options
              </div>
              <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Vowel Controls
              </div>
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                History & Favorites
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Use a Random Letter Generator</h2>
        
        <p className="text-gray-800">
          Our Random Letter Generator is incredibly easy to use and versatile. Here are some popular ways to use the tool:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ol className="list-decimal pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Word Games</strong>: Use the generator to create starting letters for word games like Scattergories, where players need to think of words that begin with a specific letter.
            </li>
            <li>
              <strong className="text-gray-900">Educational Activities</strong>: Teachers can use the tool to create alphabet-based learning activities, helping students practice letter recognition and phonics.
            </li>
            <li>
              <strong className="text-gray-900">Creative Writing Prompts</strong>: Writers can use random letters as creative prompts, challenging themselves to write stories where each paragraph or sentence starts with the generated letter.
            </li>
            <li>
              <strong className="text-gray-900">Name Generation</strong>: Use random letters as starting points for character names in stories, games, or role-playing activities.
            </li>
            <li>
              <strong className="text-gray-900">Randomized Selection</strong>: Assign letters to items or people and use the generator to make random selections.
            </li>
            <li>
              <strong className="text-gray-900">Party Games</strong>: Create fun party games where participants must perform tasks based on the letters generated.
            </li>
            <li>
              <strong className="text-gray-900">Random Password Creation</strong>: Generate letter sequences as a starting point for creating secure, memorable passwords by adding numbers and special characters to the random letters.
            </li>
          </ol>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Key Features of Our Random Letter Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-pink-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Letter Case Options</h3>
            </div>
            <p className="text-gray-700">Choose between uppercase, lowercase, or both to customize your random letter generation.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-cyan-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Vowel Control</h3>
            </div>
            <p className="text-gray-700">Include or exclude vowels based on your specific needs for different game types or educational activities.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">History Tracking</h3>
            </div>
            <p className="text-gray-700">Keep track of previously generated letters, allowing you to avoid repeats or review your history.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-yellow-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Favorites System</h3>
            </div>
            <p className="text-gray-700">Save your favorite generated letters for quick access in future sessions.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Ready to Generate Some Random Letters?</h2>
        
        <p className="text-gray-800 mb-8">
          Our Random Letter Generator is completely free and doesn&apos;t require any downloads or installations. Simply select your preferences and start generating random letters for your games, educational activities, or creative projects!
        </p>

        <div className="bg-gradient-to-br from-pink-100 to-cyan-100 p-6 rounded-lg border border-pink-200 my-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Start Generating Random Letters?</h3>
          <p className="text-gray-800 mb-4">
            Whether you&apos;re a teacher, game enthusiast, writer, or just looking for a fun activity, our Random Letter Generator is the perfect tool for you. Try it now and discover the endless possibilities!
          </p>
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
            >
              Generate Random Letters Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="my-8 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Explore Our Other Generators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Link href="/blog/random-objects-generator" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-indigo-600">Random Objects Generator</h4>
              <p className="text-sm text-gray-600">Generate random objects from different categories.</p>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
