'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CursedTextArticleContent() {
  const [showFullArticle, setShowFullArticle] = useState(false);
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
          Cursed Text Generator: Create Creepy, Glitched, and Zalgo Text Online
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
          <Link href="/cursed-text" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
            Try Our Cursed Text Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8"></div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What is a Cursed Text Generator?</h2>
        
        <p className="text-gray-800">
          A <strong>Cursed Text Generator</strong> is a unique tool that transforms ordinary text into creepy, glitched, or distorted versions that appear "cursed" or corrupt. Our free online generator creates several types of stylized text, including the popular Zalgo text (with glitchy diacritical marks), vaporwave aesthetics (with full-width characters), mirrored text, inverted text, glitch effects, and creepy font styles. These text transformations are perfect for creating attention-grabbing social media posts, spooky messages, unique usernames, or adding an unsettling aesthetic to your digital content.
        </p>
        
        {/* Information callout box */}
        <div className="my-8 bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-purple-800">What is Zalgo Text?</h3>
              <p className="text-purple-900 mt-2">Zalgo text (also known as "corrupted text") is created by combining standard characters with multiple combining diacritical marks that extend above and below the base characters. It was named after a creepypasta meme creature called Zalgo, associated with corrupting reality. It gained popularity in internet culture for its unsettling, glitchy appearance that seems to "corrupt" normal text.</p>
            </div>
          </div>
        </div>
        
        {/* Added Cursed Text Generator Tool */}
        <div className="my-10 rounded-xl overflow-hidden shadow-2xl">
          <h3 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            Try Our Cursed Text Generator Tool
          </h3>
          <div className="bg-white p-6 text-center">
            <p className="text-gray-800 mb-4">
              Our free Cursed Text Generator tool makes it easy to create spooky, glitched, and distorted text for social media, usernames, or creative projects. Choose from multiple text effects and customize the intensity!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/cursed-text" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                Open Cursed Text Generator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Multiple Text Effects
              </div>
              <div className="flex items-center px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Adjustable Intensity
              </div>
              <div className="flex items-center px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                One-Click Copy
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Types of Cursed Text Transformations</h2>
        
        <p className="text-gray-800">
          Our Cursed Text Generator offers multiple text transformation types, each with its own unique style and effect:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ul className="list-disc pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Zalgo Text</strong>: Creates text with glitchy diacritical marks that extend above and below letters, giving it a corrupted appearance. Intensity can be adjusted to control how extreme the effect is.
            </li>
            <li>
              <strong className="text-gray-900">Vaporwave</strong>: Transforms text into full-width characters for that aesthetic vaporwave look, commonly associated with 80s and 90s nostalgia.
            </li>
            <li>
              <strong className="text-gray-900">Glitch</strong>: Randomly inserts special characters and symbols into your text, creating a "glitched" computer effect. Adjust intensity to control how frequently these characters appear.
            </li>
            <li>
              <strong className="text-gray-900">Inverted</strong>: Flips your text upside down by replacing characters with their inverted versions, making it appear as if the text is being viewed upside down.
            </li>
            <li>
              <strong className="text-gray-900">Mirror</strong>: Reverses your text so it reads backward, similar to how text appears in a mirror. Perfect for creating mirror writing effects.
            </li>
            <li>
              <strong className="text-gray-900">Creepy</strong>: Combines multiple effects with an emphasis on creating an unsettling, horror-like appearance. Perfect for spooky content or Halloween themes.
            </li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Popular Uses for Cursed Text</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Social Media Profiles</h3>
            </div>
            <p className="text-gray-700">Create unique, eye-catching usernames and bios that stand out from the crowd on platforms like Twitter, Instagram, and TikTok.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-pink-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Messaging & Comments</h3>
            </div>
            <p className="text-gray-700">Add a spooky or unique flair to your messages, comments, or posts to grab attention and create a distinctive presence.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-cyan-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Creative Content</h3>
            </div>
            <p className="text-gray-700">Generate creepy text for horror stories, creative writing, digital art, memes, or themed content for Halloween or spooky events.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="rounded-full bg-green-100 p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Gaming</h3>
            </div>
            <p className="text-gray-700">Create unique usernames, clan tags, or in-game chat messages that stand out and add personality to your gaming experience.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Use Our Cursed Text Generator</h2>
        
        <p className="text-gray-800">
          Using our Cursed Text Generator is quick and easy:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ol className="list-decimal pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Enter Your Text</strong>: Type or paste any text into the input field.
            </li>
            <li>
              <strong className="text-gray-900">Select Text Type</strong>: Choose from Zalgo, Vaporwave, Glitch, Inverted, Mirror, or Creepy transformation styles.
            </li>
            <li>
              <strong className="text-gray-900">Adjust Intensity</strong>: Use the slider to control how extreme the effect appears (particularly useful for Zalgo and Glitch effects).
            </li>
            <li>
              <strong className="text-gray-900">Generate</strong>: Click the "Generate" button to transform your text.
            </li>
            <li>
              <strong className="text-gray-900">Copy Result</strong>: Click the "Copy" button to copy the transformed text to your clipboard, ready to paste anywhere.
            </li>
            <li>
              <strong className="text-gray-900">Preview</strong>: See how your text will look in real-time with our preview feature.
            </li>
          </ol>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg border border-purple-200 my-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Create Cursed Text?</h3>
          <p className="text-gray-800 mb-4">
            Whether you want to add a spooky touch to your social media, create unique usernames, or just experiment with different text styles, our Cursed Text Generator has everything you need. Try it now and transform your ordinary text into something extraordinary!
          </p>
          <div className="flex justify-center">
            <Link 
              href="/cursed-text" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Create Cursed Text Now
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
