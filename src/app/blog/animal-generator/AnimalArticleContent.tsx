'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimalArticleContent() {
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
          Animal Generator: Interactive Wildlife Discovery Tool
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
            6 min read
          </span>
        </div>
        
        <div className="flex justify-center mb-0">
          <Link href="/animal-generator" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Try Our Animal Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8"></div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">What is an Animal Generator?</h2>
        
        <p className="text-gray-800">
          An <strong>Animal Generator</strong> is an interactive digital tool that allows users to discover and learn about wildlife from around the world. Our comprehensive generator provides detailed information about various animal species, including their habitats, behaviors, diets, conservation status, and fascinating facts. Whether you're an educator, student, wildlife enthusiast, or simply curious about the animal kingdom, our <strong>Animal Generator</strong> offers an engaging way to explore biodiversity and learn about creatures from every continent.
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
              <h3 className="text-lg font-medium text-green-800">Biodiversity Crisis</h3>
              <p className="text-green-900 mt-2">Did you know that according to the International Union for Conservation of Nature (IUCN), more than 40,000 species are currently threatened with extinction? That's approximately 28% of all assessed species. Learning about wildlife is the first step toward understanding the importance of conservation efforts worldwide.</p>
            </div>
          </div>
        </div>
        
        {/* Animal Generator Tool */}
        <div className="my-10 rounded-xl overflow-hidden shadow-2xl">
          <h3 className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            Explore Our Interactive Animal Generator
          </h3>
          <div className="bg-white p-6 text-center">
            <p className="text-gray-800 mb-4">
              Our Animal Generator provides a fascinating journey through the animal kingdom. Discover random animals or filter by category, habitat, diet, and conservation status. Listen to animal sounds, explore their natural habitats, and learn interesting facts about each species!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/animal-generator" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Open Animal Generator
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center mt-4 gap-2">
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Detailed Animal Profiles
              </div>
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Interactive Habitat Maps
              </div>
              <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Animal Sound Library
              </div>
              <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Conservation Status Info
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Features of Our Animal Generator</h2>
        
        <p className="text-gray-800">
          Our Animal Generator is designed to provide an educational and engaging experience. Here are some of the key features that make it a valuable resource:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ul className="list-disc pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Comprehensive Database</strong>: Access information on hundreds of animal species from around the world, from common household pets to rare endangered species.
            </li>
            <li>
              <strong className="text-gray-900">Detailed Profiles</strong>: Each animal profile includes scientific classification, habitat information, diet, lifespan, physical characteristics, and behavioral traits.
            </li>
            <li>
              <strong className="text-gray-900">Interactive Habitat Maps</strong>: Visualize where different animals live across the globe with our interactive maps.
            </li>
            <li>
              <strong className="text-gray-900">Animal Sound Library</strong>: Listen to authentic animal calls and vocalizations to better understand how different species communicate.
            </li>
            <li>
              <strong className="text-gray-900">Conservation Status</strong>: Learn about each animal's conservation status according to the IUCN Red List, helping raise awareness about threatened and endangered species.
            </li>
            <li>
              <strong className="text-gray-900">Advanced Filtering</strong>: Search for animals by category (mammals, birds, reptiles, etc.), habitat, diet, or conservation status.
            </li>
            <li>
              <strong className="text-gray-900">Animal Comparison Tool</strong>: Compare different species side by side to understand their similarities and differences.
            </li>
            <li>
              <strong className="text-gray-900">Favorites Collection</strong>: Save your favorite animals to a personal collection for quick access.
            </li>
            <li>
              <strong className="text-gray-900">Animal Quiz</strong>: Test your knowledge with our integrated animal quizzes.
            </li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Educational Benefits</h2>
        
        <p className="text-gray-800">
          Our Animal Generator serves as a powerful educational tool for various contexts:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">For Students</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Supplement biology and ecology lessons</li>
              <li>Research projects on specific animal species</li>
              <li>Learn about biodiversity and ecosystems</li>
              <li>Understand classification and taxonomy</li>
              <li>Develop awareness about conservation issues</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-xl font-semibold mb-3 text-green-800">For Educators</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Create engaging lesson plans about wildlife</li>
              <li>Provide visual and audio resources for teaching</li>
              <li>Assign comparative research projects</li>
              <li>Teach about environmental conservation</li>
              <li>Use animal sounds for audio recognition activities</li>
            </ul>
          </div>
        </div>
        
        {/* Visual callout for conservation */}
        <div className="my-10 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-xl font-bold mb-4 text-amber-800">Conservation Awareness</h3>
          <p className="text-gray-800 mb-4">
            One of the most important aspects of our Animal Generator is raising awareness about conservation issues. Each animal profile includes information about its current conservation status, the threats it faces, and conservation efforts underway to protect the species.
          </p>
          <div className="grid grid-cols-5 gap-3 mt-6">
            <div className="text-center">
              <div className="w-full h-4 bg-green-500 rounded"></div>
              <p className="text-xs mt-1 text-gray-700">Least Concern</p>
            </div>
            <div className="text-center">
              <div className="w-full h-4 bg-green-300 rounded"></div>
              <p className="text-xs mt-1 text-gray-700">Near Threatened</p>
            </div>
            <div className="text-center">
              <div className="w-full h-4 bg-yellow-500 rounded"></div>
              <p className="text-xs mt-1 text-gray-700">Vulnerable</p>
            </div>
            <div className="text-center">
              <div className="w-full h-4 bg-orange-500 rounded"></div>
              <p className="text-xs mt-1 text-gray-700">Endangered</p>
            </div>
            <div className="text-center">
              <div className="w-full h-4 bg-red-600 rounded"></div>
              <p className="text-xs mt-1 text-gray-700">Critically Endangered</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            IUCN Red List Conservation Status Categories
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How to Use the Animal Generator</h2>
        
        <p className="text-gray-800">
          Using our Animal Generator is simple and intuitive. Here's a quick guide to help you get started:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm my-6">
          <ol className="list-decimal pl-5 space-y-3 text-gray-800">
            <li>
              <strong className="text-gray-900">Generate Random Animals</strong>: Click the "Generate" button to discover random animals from our database.
            </li>
            <li>
              <strong className="text-gray-900">Apply Filters</strong>: Use the filter panel to narrow down results by category, habitat, diet, conservation status, or other criteria.
            </li>
            <li>
              <strong className="text-gray-900">View Animal Details</strong>: Click on any animal card to view its detailed profile, including facts, images, sounds, and habitat information.
            </li>
            <li>
              <strong className="text-gray-900">Listen to Sounds</strong>: If available, play the animal's sounds to hear their calls or vocalizations.
            </li>
            <li>
              <strong className="text-gray-900">Explore the Habitat Map</strong>: View the animal's natural range on the interactive habitat map.
            </li>
            <li>
              <strong className="text-gray-900">Compare Animals</strong>: Select multiple animals and use the comparison tool to see how they differ in terms of size, lifespan, diet, and other characteristics.
            </li>
            <li>
              <strong className="text-gray-900">Save Favorites</strong>: Click the heart icon to save animals to your favorites collection for future reference.
            </li>
            <li>
              <strong className="text-gray-900">Take the Quiz</strong>: Test your knowledge with our animal quizzes based on the information provided.
            </li>
          </ol>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Popular Use Cases</h2>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Classroom Learning</h3>
            <p className="text-gray-800">
              Teachers use our Animal Generator to create engaging biology lessons, interactive assignments, and research projects that help students learn about wildlife diversity.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Wildlife Exploration</h3>
            <p className="text-gray-800">
              Nature enthusiasts use the tool to discover new species, learn interesting facts, and plan wildlife spotting trips based on habitat information.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Conservation Awareness</h3>
            <p className="text-gray-800">
              Environmental educators and activists use the generator to raise awareness about endangered species and conservation efforts around the world.
            </p>
          </div>
        </div>
        
        <div className="my-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Ready to Explore the Animal Kingdom?</h2>
          <p className="text-gray-800 mb-6">
            Our Animal Generator provides an engaging way to discover the incredible diversity of wildlife on our planet. Whether you're a student, educator, or wildlife enthusiast, you'll find valuable information and fascinating facts.
          </p>
          <Link 
            href="/animal-generator" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Start Exploring Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
      </article>
    </main>
  );
}
