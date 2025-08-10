import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Using Random Letter Generators in the Classroom | Teaching Integration Guide',
  description: 'Practical strategies for integrating random letter generators into daily classroom instruction. Lesson plans, activities, and management tips for educators.',
  keywords: 'classroom integration, random letter generator, teaching strategies, lesson plans, classroom management, educational technology, alphabet activities',
};

export default function ClassroomIntegration() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Teaching Guides</Link>
              <span>/</span>
              <span className="text-white">Classroom Integration</span>
            </div>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Using Random Letter Generators in the Classroom
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="px-3 py-1 bg-[#0EEDFF]/20 text-[#0EEDFF] rounded-full">Classroom Management</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Intermediate Level</span>
              <span className="text-gray-400">📖 12 min read</span>
              <span className="text-gray-400">👩‍🏫 Updated: January 2024</span>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Transform your alphabet instruction with practical, research-backed strategies for integrating random letter 
              generators into daily classroom routines, activities, and assessments.
            </p>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-lg p-6 mb-8 border border-[#EE74FF]/20">
            <h2 className="text-2xl font-semibold mb-4 text-[#EE74FF]">🚀 Quick Start: 5-Minute Setup</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">1️⃣</div>
                <h3 className="font-semibold mb-2">Open the Generator</h3>
                <p className="text-sm text-gray-400">Navigate to our letter generator and familiarize yourself with the interface</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">2️⃣</div>
                <h3 className="font-semibold mb-2">Configure Settings</h3>
                <p className="text-sm text-gray-400">Enable elimination mode and adjust alphabet settings for your lesson</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">3️⃣</div>
                <h3 className="font-semibold mb-2">Start Teaching</h3>
                <p className="text-sm text-gray-400">Use the random selections for engaging, fair classroom activities</p>
              </div>
            </div>
          </div>

          {/* Daily Integration Strategies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">Daily Integration Strategies</h2>
            
            <div className="space-y-8">
              {/* Morning Circle Time */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 text-[#FF3E9D]">🌅 Morning Circle Time</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Letter of the Day Activity</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Use random generator to select the daily focus letter</li>
                      <li>• Students share words that start with the selected letter</li>
                      <li>• Create a class list of words throughout the day</li>
                      <li>• Use elimination mode to ensure all letters get featured</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Name Recognition Game</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Generate letters and find students whose names contain them</li>
                      <li>• Practice letter sounds using student names</li>
                      <li>• Build classroom community through name activities</li>
                      <li>• Celebrate unique letters in different names</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Literacy Centers */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 text-[#0EEDFF]">📚 Literacy Centers Integration</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-[#FF3E9D]">Writing Center</h4>
                    <p className="text-sm text-gray-400 mb-2">Students practice forming randomly selected letters</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Trace letters in sand trays</li>
                      <li>• Write letters on whiteboards</li>
                      <li>• Form letters with play dough</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-[#0EEDFF]">Reading Center</h4>
                    <p className="text-sm text-gray-400 mb-2">Find books featuring the selected letter</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Letter hunt in picture books</li>
                      <li>• Sound identification activities</li>
                      <li>• Beginning sound matching</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-[#EE74FF]">Art Center</h4>
                    <p className="text-sm text-gray-400 mb-2">Create art projects based on selected letters</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Letter collages</li>
                      <li>• Alphabet crafts</li>
                      <li>• Letter-themed drawings</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Transition Activities */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 text-[#00E061]">⏰ Transition Time Activities</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded border-l-4 border-[#00E061]">
                    <h4 className="font-semibold mb-2">Quick Letter Drills (2-3 minutes)</h4>
                    <p className="text-sm text-gray-400 mb-2">Perfect for filling short gaps between activities</p>
                    <ul className="text-sm space-y-1">
                      <li>• Generate a letter and have students make the sound</li>
                      <li>• Students form the letter with their bodies</li>
                      <li>• Quick "I Spy" games using the selected letter</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded border-l-4 border-[#FF3E9D]">
                    <h4 className="font-semibold mb-2">Line-Up Activities</h4>
                    <p className="text-sm text-gray-400 mb-2">Make transitions educational and engaging</p>
                    <ul className="text-sm space-y-1">
                      <li>• Students line up if their name contains the selected letter</li>
                      <li>• Say a word starting with the letter to join the line</li>
                      <li>• Make the letter sound to earn your place</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Features for Educators */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">Advanced Features for Educators</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#FF3E9D]">🎯 Elimination Mode Benefits</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF3E9D] mt-1">✓</span>
                    <div>
                      <strong>Fair Practice Distribution:</strong>
                      <p className="text-sm text-gray-400">Ensures every letter gets equal attention before any repeats</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF3E9D] mt-1">✓</span>
                    <div>
                      <strong>Systematic Review:</strong>
                      <p className="text-sm text-gray-400">Creates natural review cycles for comprehensive coverage</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF3E9D] mt-1">✓</span>
                    <div>
                      <strong>Student Engagement:</strong>
                      <p className="text-sm text-gray-400">Maintains suspense while ensuring fairness</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#0EEDFF]">🔤 Custom Alphabet Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#0EEDFF] mt-1">✓</span>
                    <div>
                      <strong>Targeted Practice:</strong>
                      <p className="text-sm text-gray-400">Focus only on letters students need to work on</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#0EEDFF] mt-1">✓</span>
                    <div>
                      <strong>Differentiated Learning:</strong>
                      <p className="text-sm text-gray-400">Create different letter sets for different ability levels</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#0EEDFF] mt-1">✓</span>
                    <div>
                      <strong>Thematic Units:</strong>
                      <p className="text-sm text-gray-400">Use specific letters for themed lessons or projects</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Lesson Plan Templates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">📋 Ready-to-Use Lesson Plans</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#EE74FF]/10 to-[#00E061]/10 rounded-lg p-6 border border-[#EE74FF]/20">
                <h3 className="text-2xl font-semibold mb-4 text-white">15-Minute Letter Focus Lesson</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded">
                    <h4 className="font-semibold text-[#FF3E9D] mb-2">Opening (3 min)</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Generate random letter</li>
                      <li>• Students identify letter</li>
                      <li>• Practice letter sound</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded">
                    <h4 className="font-semibold text-[#0EEDFF] mb-2">Activity (8 min)</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Letter formation practice</li>
                      <li>• Word brainstorming</li>
                      <li>• Sound identification</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded">
                    <h4 className="font-semibold text-[#EE74FF] mb-2">Practice (3 min)</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Quick review game</li>
                      <li>• Student demonstrations</li>
                      <li>• Peer sharing</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded">
                    <h4 className="font-semibold text-[#00E061] mb-2">Closing (1 min)</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Final letter review</li>
                      <li>• Preview next lesson</li>
                      <li>• Positive reinforcement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Classroom Management Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">🎯 Classroom Management Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-[#FF3E9D] mb-2">Setting Expectations</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Establish clear rules for generator use</li>
                    <li>• Teach students to wait for their turn</li>
                    <li>• Create signals for attention and participation</li>
                    <li>• Practice procedures before implementing</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-[#0EEDFF] mb-2">Engagement Strategies</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Use dramatic reveals for letter selections</li>
                    <li>• Incorporate movement and gestures</li>
                    <li>• Celebrate correct responses enthusiastically</li>
                    <li>• Provide multiple ways to participate</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-[#EE74FF] mb-2">Differentiation Support</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Use custom alphabets for different levels</li>
                    <li>• Provide visual supports for struggling learners</li>
                    <li>• Offer extension activities for advanced students</li>
                    <li>• Allow multiple response formats</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-[#00E061] mb-2">Assessment Integration</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Use random selections for quick assessments</li>
                    <li>• Track student responses informally</li>
                    <li>• Note areas needing additional practice</li>
                    <li>• Document progress over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Classroom?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Start using these integration strategies today. Our random letter generator is designed specifically 
              for educators who want to create engaging, effective alphabet instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#generator"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Try the Generator Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/activities"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Browse More Activities
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">📚 Related Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/teaching-alphabet" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#FF3E9D] mb-2">Teaching the Alphabet</h4>
                <p className="text-sm text-gray-400">Complete guide to alphabet instruction fundamentals</p>
              </Link>
              <Link href="/guides/assessment-strategies" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#0EEDFF] mb-2">Assessment Strategies</h4>
                <p className="text-sm text-gray-400">Tools for measuring student progress effectively</p>
              </Link>
              <Link href="/activities" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#EE74FF] mb-2">Classroom Activities</h4>
                <p className="text-sm text-gray-400">Ready-to-use activities for immediate implementation</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
