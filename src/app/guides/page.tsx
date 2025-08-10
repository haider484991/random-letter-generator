import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Teaching Guides | Random Letter Generator - Educational Resources for Teachers',
  description: 'Comprehensive teaching guides for using random letter generators in education. Learn effective strategies for alphabet instruction, phonics, and literacy development.',
  keywords: 'teaching guides, alphabet instruction, phonics teaching, literacy education, random letter activities, classroom resources, educational strategies',
};

export default function Guides() {
  const guides = [
    {
      title: 'Complete Guide to Teaching the Alphabet',
      description: 'A comprehensive resource for educators covering letter recognition, phonics, and alphabet mastery strategies.',
      href: '/guides/teaching-alphabet',
      category: 'Fundamentals',
      readTime: '15 min read',
      difficulty: 'Beginner',
    },
    {
      title: 'Using Random Letter Generators in the Classroom',
      description: 'Practical strategies for incorporating random letter tools into daily lessons and activities.',
      href: '/guides/classroom-integration',
      category: 'Classroom Management',
      readTime: '12 min read',
      difficulty: 'Intermediate',
    },
    {
      title: 'Phonics Instruction with Letter Games',
      description: 'Evidence-based approaches to teaching phonics using interactive letter selection activities.',
      href: '/guides/phonics-instruction',
      category: 'Phonics',
      readTime: '18 min read',
      difficulty: 'Advanced',
    },
    {
      title: 'Differentiated Instruction for Letter Learning',
      description: 'Adapting letter activities for diverse learners, including special needs and ESL students.',
      href: '/guides/differentiated-instruction',
      category: 'Special Education',
      readTime: '20 min read',
      difficulty: 'Advanced',
    },
    {
      title: 'Assessment Strategies for Alphabet Knowledge',
      description: 'Tools and techniques for evaluating student progress in letter recognition and phonemic awareness.',
      href: '/guides/assessment-strategies',
      category: 'Assessment',
      readTime: '14 min read',
      difficulty: 'Intermediate',
    },
    {
      title: 'Digital Literacy in Early Childhood Education',
      description: 'Integrating technology tools like random letter generators into early learning environments.',
      href: '/guides/digital-literacy',
      category: 'Technology',
      readTime: '16 min read',
      difficulty: 'Intermediate',
    },
  ];

  const categories = ['All', 'Fundamentals', 'Classroom Management', 'Phonics', 'Special Education', 'Assessment', 'Technology'];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Teaching Guides & Educational Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Evidence-based teaching strategies, classroom activities, and professional development resources 
              for educators using random letter generators and alphabet instruction tools.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#FF3E9D]">15+</div>
                <div className="text-sm text-gray-400">Teaching Guides</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#0EEDFF]">50+</div>
                <div className="text-sm text-gray-400">Activities</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#EE74FF]">100+</div>
                <div className="text-sm text-gray-400">Free Resources</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#00E061]">10K+</div>
                <div className="text-sm text-gray-400">Teachers Served</div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-sm"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {guides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="group bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-[#EE74FF]/50 transition-all hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#FF3E9D]/20 text-[#FF3E9D] rounded-full text-xs font-medium">
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray-400">{guide.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#EE74FF] transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs ${
                    guide.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    guide.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {guide.difficulty}
                  </span>
                  
                  <div className="flex items-center text-[#0EEDFF] text-sm group-hover:translate-x-1 transition-transform">
                    Read Guide
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Section */}
          <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-lg p-8 border border-[#EE74FF]/20 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">🎯 Featured: Elimination Mode Teaching Strategy</h2>
            <p className="text-gray-300 text-center mb-6 max-w-3xl mx-auto">
              Learn how to use our unique elimination mode feature to create fair, engaging classroom activities 
              that ensure every student gets equal participation opportunities without repeats.
            </p>
            <div className="text-center">
              <Link 
                href="/guides/elimination-mode-classroom"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Learn Elimination Mode Strategy
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated with New Teaching Resources</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest teaching guides, classroom activities, and educational research delivered to your inbox. 
              Join thousands of educators who trust our resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE74FF]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
