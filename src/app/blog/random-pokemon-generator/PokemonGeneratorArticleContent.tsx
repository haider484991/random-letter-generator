'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PokemonGeneratorArticleContent() {
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
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
          Random Pokemon Generator: The Ultimate Team Building Tool
        </h1>
        
        <div className="flex justify-center mb-8">
          <Link href="/pokemon-generator" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            Try Our Random Pokemon Generator
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="mb-8 relative w-full h-[400px]">
          <Image 
            src="/images/pokemon-battle.jpg" 
            alt="Pokemon battle scene with a trainer and their team" 
            className="rounded-lg shadow-lg"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <p className="text-sm text-center text-gray-500 mt-[410px]">Create the perfect Pokemon team with our free random generator</p>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">What is a Random Pokemon Generator?</h2>
        
        <p>
          A <strong>Random Pokemon Generator</strong> is an essential tool for trainers, competitive players, and Pokemon enthusiasts. Our free online generator creates random Pokemon teams, helps analyze team strengths and weaknesses, and enables discovery of new Pokemon combinations. Whether you&apos;re preparing for competitive battles, looking to freshen up your gameplay with new team members, or simply exploring the vast world of Pokemon, our <strong>Random Pokemon Generator</strong> makes team building both effortless and strategic.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use Our Random Pokemon Generator?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-xl font-medium text-blue-700 mb-3">Advanced Team Building</h3>
            <p>Create balanced Pokemon teams with comprehensive type analysis. Our tool identifies weaknesses, resistances, and immunities to help you build a competitive team that can handle any challenge.</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-xl font-medium text-blue-700 mb-3">Customizable Filters</h3>
            <p>Filter Pokemon by type, generation, and minimum power level. This allows you to tailor your search to specific gameplay needs or preferences, ensuring you get exactly the Pokemon you&apos;re looking for.</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-xl font-medium text-blue-700 mb-3">Strategy Guides</h3>
            <p>Access built-in strategy guides for different team compositions like Balanced, Hyper Offense, Stall, Weather, and Trick Room teams. Learn how to build effective teams with complementary roles and abilities.</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-xl font-medium text-blue-700 mb-3">Team Export/Import</h3>
            <p>Save your favorite teams for later use or share them with friends. The export/import feature makes it easy to preserve and distribute your best team compositions.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Create the Perfect Pokemon Team</h2>
        
        <ol className="list-decimal pl-6 space-y-4 mb-8">
          <li>
            <strong>Choose Your Filters:</strong> Select Pokemon types, generation, and minimum power level to narrow down your options.
          </li>
          <li>
            <strong>Generate Pokemon:</strong> Use our <Link href="/pokemon-generator" className="text-red-600 hover:text-red-800 underline">Random Pokemon Generator</Link> to find Pokemon that match your criteria.
          </li>
          <li>
            <strong>Analyze Team Balance:</strong> Review the team analysis to identify strengths, weaknesses, and coverage gaps in your team.
          </li>
          <li>
            <strong>Assign Team Roles:</strong> Designate specific roles for each team member such as Sweeper, Tank, Support, Lead, or various attacker types.
          </li>
          <li>
            <strong>Refine Based on Recommendations:</strong> Use our tool&apos;s smart recommendations to address weaknesses and improve team synergy.
          </li>
        </ol>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Pokemon Team Compositions</h2>
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Team Type</th>
                <th className="border border-gray-300 px-4 py-2">Key Characteristics</th>
                <th className="border border-gray-300 px-4 py-2">Ideal For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Balanced Team</td>
                <td className="border border-gray-300 px-4 py-2">Mix of offensive and defensive Pokemon with diverse typing</td>
                <td className="border border-gray-300 px-4 py-2">Beginners, versatile gameplay</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Hyper Offense</td>
                <td className="border border-gray-300 px-4 py-2">Fast, powerful attackers focused on quick KOs</td>
                <td className="border border-gray-300 px-4 py-2">Aggressive players, short matches</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Stall</td>
                <td className="border border-gray-300 px-4 py-2">Defensive Pokemon that wear down opponents gradually</td>
                <td className="border border-gray-300 px-4 py-2">Patient players, strategic battles</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Weather Team</td>
                <td className="border border-gray-300 px-4 py-2">Pokemon that benefit from specific weather conditions</td>
                <td className="border border-gray-300 px-4 py-2">Synergy-focused teams, specialized strategies</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Trick Room</td>
                <td className="border border-gray-300 px-4 py-2">Slow but powerful Pokemon that move first in Trick Room</td>
                <td className="border border-gray-300 px-4 py-2">Advanced players, surprise strategies</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {!showFullArticle && (
          <div className="text-center my-8">
            <motion.button
              onClick={() => setShowFullArticle(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg shadow-md hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More About Random Pokemon Generator
            </motion.button>
          </div>
        )}
        
        {showFullArticle && (
          <>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Benefits of Using a Random Pokemon Generator for Competitive Play</h2>
            
            <p>
              Beyond casual gameplay, our <strong>Random Pokemon Generator</strong> serves as a valuable competitive tool. Serious trainers can use it to:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Discover unexpected type synergies and team compositions</li>
              <li>Identify and address team weaknesses before entering competitions</li>
              <li>Practice building teams under various competitive formats and restrictions</li>
              <li>Save and analyze multiple team compositions for different battle scenarios</li>
              <li>Stay updated with the meta by exploring various team strategies</li>
              <li>Challenge yourself with randomly generated teams to improve adaptability</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">The Evolution of Pokemon Team Building</h2>
            
            <p>
              Since Pokemon&apos;s debut in 1996, team building has evolved from simple type matchups to complex strategic planning. The introduction of abilities, held items, natures, and EVs/IVs has transformed Pokemon team building into a sophisticated process with nearly limitless possibilities.
            </p>
            
            <p>
              Our <strong>Random Pokemon Generator</strong> embraces this complexity, providing tools that help trainers navigate the intricate world of team building. From analyzing type effectiveness to offering strategy guides for various team compositions, our generator makes advanced team building accessible to players of all experience levels.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Competitive Pokemon Team Building</h2>
            
            <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 relative h-[200px]">
                  <Image 
                    src="/images/pokemon-team.jpg" 
                    alt="A well-balanced Pokemon team" 
                    className="rounded-lg shadow-sm"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium text-blue-700 mb-3">Type Coverage and Resistances:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ensure your team doesn&apos;t share common weaknesses</li>
                    <li>Aim to cover as many offensive type matchups as possible</li>
                    <li>Consider Pokemon with abilities that provide additional resistances or immunities</li>
                    <li>Use our team analysis to identify and address critical type vulnerabilities</li>
                    <li>Remember that dual-typing can create both unique strengths and critical weaknesses</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium text-blue-700 mb-3">Team Roles and Balance:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Include a mix of physical and special attackers</li>
                    <li>Incorporate at least one defensive Pokemon to absorb hits</li>
                    <li>Consider speed tiers when building your team</li>
                    <li>Assign clear roles to each team member</li>
                    <li>Include support Pokemon with status moves, healing, or utility options</li>
                  </ul>
                </div>
                <div className="md:w-1/3 relative h-[200px]">
                  <Image 
                    src="/images/pokemon-stats.jpg" 
                    alt="Pokemon stat analysis chart" 
                    className="rounded-lg shadow-sm"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">The Joy of Discovery with Random Pokemon</h2>
            
            <p>
              One of the greatest pleasures in Pokemon is discovering new favorites and unexpected strengths. Our <strong>Random Pokemon Generator</strong> facilitates this joy of discovery by introducing you to Pokemon you might not have considered for your team.
            </p>
            
            <p>
              By generating random Pokemon based on your filters, you might find hidden gems—Pokemon with unique type combinations, surprising stat distributions, or uncommon abilities that perfectly complement your team strategy. This element of surprise and discovery keeps the Pokemon experience fresh and exciting, even for veteran players.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions About Random Pokemon Generator</h2>
            
            <div className="space-y-4 mb-8">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">How accurate is the team analysis feature?</h3>
                <p>
                  Our team analysis calculates type matchups based on the official Pokemon type chart. It analyzes weaknesses, resistances, and immunities for your entire team, identifying potential vulnerabilities and suggesting improvements. While it provides excellent insights, remember that competitive battling also involves strategies beyond type matchups.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Can I use this for any Pokemon game?</h3>
                <p>
                  Yes! Our Random Pokemon Generator includes Pokemon from all generations (up to Gen IX). You can filter by generation if you&apos;re playing a specific game version or want to build a team for a particular format that restricts certain Pokemon.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Does the generator include legendary Pokemon?</h3>
                <p>
                  Yes, legendary Pokemon are included in our generator. If you&apos;d prefer to exclude them, you can use the power filter to narrow your search based on total base stats, which can help filter out many legendaries.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">How can I build teams for specific formats like VGC or Smogon tiers?</h3>
                <p>
                  While our generator doesn&apos;t currently filter by specific competitive formats, you can use generation and power filters to approximate many format restrictions. For more specific formats, you can generate a larger pool of Pokemon and manually select those that meet your format&apos;s requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Can I see shiny Pokemon in the generator?</h3>
                <p>
                  Absolutely! Our generator includes a toggle button that lets you view shiny versions of all Pokemon. This feature works in both single Pokemon view and the grid view, allowing you to preview how shinies look before adding them to your team.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Ready to Build Your Ultimate Pokemon Team?</h2>
            
            <p>
              Whether you&apos;re a competitive battler, a casual player, or a Pokemon enthusiast looking to discover new team combinations, our <strong>Random Pokemon Generator</strong> offers the tools you need to create balanced, effective, and exciting Pokemon teams.
            </p>
            
            <div className="mt-6 flex justify-center">
              <Link href="/pokemon-generator" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Start Building Your Team Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>Last updated: {formattedDate}</p>
          <p className="mt-1">
            Pokemon and all related media are trademarks of Nintendo, Game Freak, and The Pokemon Company.
            This site is not affiliated with Nintendo, Game Freak, or The Pokemon Company.
          </p>
        </div>
      </article>
    </main>
  );
} 