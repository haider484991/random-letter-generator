import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Alphabet Activities & Games | Random Letter Generator Educational Resources',
  description: 'Free alphabet activities, games, and lesson plans for teachers. Interactive letter recognition activities using random letter generators for engaging classroom instruction.',
  keywords: 'alphabet activities, letter games, classroom activities, phonics games, alphabet lesson plans, educational activities, letter recognition games, teaching resources',
};

export default function Activities() {
  const activityCategories = [
    {
      title: 'Circle Time Activities',
      description: 'Perfect for morning meetings and group instruction',
      icon: '🌅',
      color: 'from-[#FF3E9D] to-[#EE74FF]',
      activities: [
        { name: 'Letter of the Day', difficulty: 'Easy', time: '5-10 min', participants: 'Whole Class' },
        { name: 'Alphabet Scavenger Hunt', difficulty: 'Medium', time: '15-20 min', participants: 'Whole Class' },
        { name: 'Sound Detective', difficulty: 'Medium', time: '10-15 min', participants: 'Whole Class' },
        { name: 'Letter Action Game', difficulty: 'Easy', time: '5-10 min', participants: 'Whole Class' },
      ]
    },
    {
      title: 'Center Activities',
      description: 'Independent and small group learning stations',
      icon: '🎯',
      color: 'from-[#0EEDFF] to-[#00E061]',
      activities: [
        { name: 'Letter Formation Station', difficulty: 'Easy', time: '10-15 min', participants: '2-4 Students' },
        { name: 'Alphabet Sorting Games', difficulty: 'Medium', time: '15-20 min', participants: '2-4 Students' },
        { name: 'Letter Sound Matching', difficulty: 'Medium', time: '10-15 min', participants: '2-4 Students' },
        { name: 'Creative Letter Art', difficulty: 'Easy', time: '20-30 min', participants: '1-4 Students' },
      ]
    },
    {
      title: 'Assessment Activities',
      description: 'Quick checks and progress monitoring tools',
      icon: '📊',
      color: 'from-[#EE74FF] to-[#FF3E9D]',
      activities: [
        { name: 'Rapid Letter ID', difficulty: 'Easy', time: '2-5 min', participants: 'Individual' },
        { name: 'Sound Production Check', difficulty: 'Medium', time: '3-5 min', participants: 'Individual' },
        { name: 'Letter Writing Assessment', difficulty: 'Medium', time: '5-10 min', participants: 'Individual' },
        { name: 'Phonemic Awareness Test', difficulty: 'Hard', time: '10-15 min', participants: 'Individual' },
      ]
    },
    {
      title: 'Movement & Games',
      description: 'Active learning and kinesthetic activities',
      icon: '🏃‍♀️',
      color: 'from-[#00E061] to-[#0EEDFF]',
      activities: [
        { name: 'Alphabet Yoga', difficulty: 'Easy', time: '10-15 min', participants: 'Whole Class' },
        { name: 'Letter Relay Race', difficulty: 'Medium', time: '15-20 min', participants: 'Teams' },
        { name: 'Musical Letters', difficulty: 'Easy', time: '10-15 min', participants: 'Whole Class' },
        { name: 'Letter Charades', difficulty: 'Medium', time: '15-20 min', participants: 'Whole Class' },
      ]
    },
  ];

  const featuredActivities = [
    {
      title: 'Elimination Mode Letter Practice',
      description: 'Use our unique elimination feature to ensure every letter gets equal practice time. Perfect for systematic review and fair classroom participation.',
      image: '🎲',
      difficulty: 'Easy',
      time: '10-20 min',
      participants: 'Whole Class',
      materials: ['Random Letter Generator', 'Whiteboard', 'Markers'],
      href: '/activities/elimination-mode-practice'
    },
    {
      title: 'Custom Alphabet Adventures',
      description: 'Create themed learning experiences using custom alphabet sets. Focus on problem letters or create exciting themed units.',
      image: '🔤',
      difficulty: 'Medium',
      time: '15-30 min',
      participants: 'Small Groups',
      materials: ['Random Letter Generator', 'Theme Materials', 'Activity Sheets'],
      href: '/activities/custom-alphabet-adventures'
    },
    {
      title: 'Digital Phonics Station',
      description: 'Transform any device into an interactive phonics learning station with guided activities and progress tracking.',
      image: '💻',
      difficulty: 'Medium',
      time: '15-25 min',
      participants: '2-4 Students',
      materials: ['Device with Internet', 'Headphones (Optional)', 'Recording Sheet'],
      href: '/activities/digital-phonics-station'
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Alphabet Activities & Educational Games
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Ready-to-use activities, games, and lesson plans designed specifically for random letter generator integration. 
              Engage students with interactive, evidence-based alphabet instruction.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#FF3E9D]">50+</div>
                <div className="text-sm text-gray-400">Activities</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#0EEDFF]">12</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#EE74FF]">100%</div>
                <div className="text-sm text-gray-400">Free Access</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#00E061]">5K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
            </div>
          </div>

          {/* Featured Activities */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">🌟 Featured Activities</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredActivities.map((activity, index) => (
                <Link
                  key={index}
                  href={activity.href}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-[#EE74FF]/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-4xl mb-4 text-center">{activity.image}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#EE74FF] transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className={`px-2 py-1 rounded ${
                        activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-300">{activity.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Group Size:</span>
                      <span className="text-gray-300">{activity.participants}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Materials Needed:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.materials.map((material, idx) => (
                        <span key={idx} className="text-xs bg-gray-700/50 px-2 py-1 rounded">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-[#0EEDFF] text-sm group-hover:translate-x-1 transition-transform">
                    View Activity
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Activity Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">📚 Activity Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {activityCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EE74FF]/30 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <div>
                      <h3 className={`text-xl font-semibold bg-gradient-to-r ${category.color} text-transparent bg-clip-text`}>
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {category.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="bg-gray-700/30 p-3 rounded border border-gray-600/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{activity.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {activity.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>⏱️ {activity.time}</span>
                          <span>👥 {activity.participants}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-sm text-[#0EEDFF] hover:text-white transition-colors">
                      View All {category.title} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Start Guide */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-lg p-8 border border-[#EE74FF]/20">
              <h2 className="text-3xl font-bold mb-6 text-center">🚀 Quick Start Guide</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF3E9D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">1️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Activity</h3>
                  <p className="text-sm text-gray-400">Select an activity that matches your lesson goals and student needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0EEDFF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">2️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-2">Prepare Materials</h3>
                  <p className="text-sm text-gray-400">Gather the simple materials listed for each activity</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#EE74FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">3️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-2">Set Up Generator</h3>
                  <p className="text-sm text-gray-400">Configure the random letter generator with appropriate settings</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00E061]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">4️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-2">Start Teaching</h3>
                  <p className="text-sm text-gray-400">Follow the step-by-step instructions for engaging lessons</p>
                </div>
              </div>
            </div>
          </section>

          {/* Age-Based Recommendations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">👶 Age-Based Activity Recommendations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#FF3E9D]">Ages 3-4 (Preschool)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Letter recognition games</li>
                  <li>• Simple sound identification</li>
                  <li>• Letter tracing activities</li>
                  <li>• Alphabet songs and chants</li>
                  <li>• Visual letter matching</li>
                </ul>
                <div className="mt-4 text-center">
                  <button className="text-sm text-[#FF3E9D] hover:text-white transition-colors">
                    View Preschool Activities →
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#0EEDFF]">Ages 5-6 (Kindergarten)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Letter-sound correspondence</li>
                  <li>• Beginning word formation</li>
                  <li>• Phonemic awareness games</li>
                  <li>• Writing practice activities</li>
                  <li>• Reading readiness skills</li>
                </ul>
                <div className="mt-4 text-center">
                  <button className="text-sm text-[#0EEDFF] hover:text-white transition-colors">
                    View Kindergarten Activities →
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-[#EE74FF]">Ages 7+ (Elementary)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Advanced phonics patterns</li>
                  <li>• Spelling practice games</li>
                  <li>• Vocabulary building</li>
                  <li>• Reading fluency activities</li>
                  <li>• Creative writing prompts</li>
                </ul>
                <div className="mt-4 text-center">
                  <button className="text-sm text-[#EE74FF] hover:text-white transition-colors">
                    View Elementary Activities →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Ready to Engage Your Students?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Start using these proven activities in your classroom today. Our random letter generator makes 
              every activity more engaging and effective for alphabet instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#generator"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Start Using Activities
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/guides"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                View Teaching Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
