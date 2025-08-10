import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Free Educational Resources | Random Letter Generator - Printables, Worksheets & Teaching Materials',
  description: 'Download free educational resources including printable worksheets, lesson plans, assessment tools, and teaching materials for alphabet instruction and early literacy.',
  keywords: 'free educational resources, printable worksheets, lesson plans, teaching materials, alphabet worksheets, phonics resources, classroom printables',
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: 'Printable Worksheets',
      description: 'Ready-to-print activities and practice sheets',
      icon: '📄',
      color: 'from-[#FF3E9D] to-[#EE74FF]',
      count: '25+ Resources',
      resources: [
        { name: 'Alphabet Recognition Sheets', type: 'PDF', pages: '26 pages', difficulty: 'Beginner' },
        { name: 'Letter Formation Practice', type: 'PDF', pages: '15 pages', difficulty: 'Beginner' },
        { name: 'Phonics Sound Matching', type: 'PDF', pages: '20 pages', difficulty: 'Intermediate' },
        { name: 'Letter Hunt Activities', type: 'PDF', pages: '12 pages', difficulty: 'Easy' },
      ]
    },
    {
      title: 'Lesson Plans',
      description: 'Complete lesson plans with objectives and activities',
      icon: '📋',
      color: 'from-[#0EEDFF] to-[#00E061]',
      count: '15+ Plans',
      resources: [
        { name: 'Week-Long Alphabet Unit', type: 'PDF', pages: '35 pages', difficulty: 'Complete' },
        { name: 'Daily Letter Focus Plans', type: 'PDF', pages: '28 pages', difficulty: 'Flexible' },
        { name: 'Phonics Integration Lessons', type: 'PDF', pages: '22 pages', difficulty: 'Advanced' },
        { name: 'Assessment-Driven Plans', type: 'PDF', pages: '18 pages', difficulty: 'Data-Based' },
      ]
    },
    {
      title: 'Assessment Tools',
      description: 'Progress monitoring and evaluation instruments',
      icon: '📊',
      color: 'from-[#EE74FF] to-[#FF3E9D]',
      count: '10+ Tools',
      resources: [
        { name: 'Letter Recognition Checklist', type: 'PDF', pages: '4 pages', difficulty: 'Quick' },
        { name: 'Phonemic Awareness Rubric', type: 'PDF', pages: '6 pages', difficulty: 'Detailed' },
        { name: 'Progress Tracking Sheets', type: 'PDF', pages: '8 pages', difficulty: 'Ongoing' },
        { name: 'Parent Communication Forms', type: 'PDF', pages: '5 pages', difficulty: 'Simple' },
      ]
    },
    {
      title: 'Interactive Materials',
      description: 'Games, manipulatives, and hands-on activities',
      icon: '🎲',
      color: 'from-[#00E061] to-[#0EEDFF]',
      count: '20+ Activities',
      resources: [
        { name: 'Letter Bingo Cards', type: 'PDF', pages: '30 cards', difficulty: 'Fun' },
        { name: 'Alphabet Memory Game', type: 'PDF', pages: '52 cards', difficulty: 'Engaging' },
        { name: 'Letter Sound Dominoes', type: 'PDF', pages: '28 pieces', difficulty: 'Interactive' },
        { name: 'Phonics Spinner Games', type: 'PDF', pages: '12 games', difficulty: 'Active' },
      ]
    },
  ];

  const featuredResources = [
    {
      title: 'Complete Elimination Mode Teaching Kit',
      description: 'Everything you need to implement elimination mode in your classroom, including lesson plans, student tracking sheets, and parent communication materials.',
      image: '🎯',
      type: 'PDF Bundle',
      pages: '45 pages',
      includes: ['5 Lesson Plans', 'Student Tracking Sheets', 'Parent Letters', 'Assessment Rubrics'],
      downloadLink: '/downloads/elimination-mode-kit.pdf'
    },
    {
      title: 'Custom Alphabet Activity Collection',
      description: 'Adaptable activities designed for use with custom alphabet sets. Perfect for differentiated instruction and themed learning units.',
      image: '🔤',
      type: 'PDF Bundle',
      pages: '38 pages',
      includes: ['10 Adaptable Activities', 'Differentiation Guide', 'Theme Suggestions', 'Setup Instructions'],
      downloadLink: '/downloads/custom-alphabet-activities.pdf'
    },
    {
      title: 'Digital Integration Handbook',
      description: 'Comprehensive guide for integrating random letter generators and other digital tools into traditional classroom instruction.',
      image: '💻',
      type: 'PDF Guide',
      pages: '52 pages',
      includes: ['Implementation Strategies', 'Troubleshooting Guide', 'Best Practices', 'Case Studies'],
      downloadLink: '/downloads/digital-integration-handbook.pdf'
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Free Educational Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Download high-quality, research-based teaching materials designed to complement our random letter generator. 
              All resources are created by experienced educators and completely free for classroom use.
            </p>
            
            {/* Resource Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#FF3E9D]">70+</div>
                <div className="text-sm text-gray-400">Free Resources</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#0EEDFF]">500+</div>
                <div className="text-sm text-gray-400">Pages of Content</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#EE74FF]">25K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#00E061]">100%</div>
                <div className="text-sm text-gray-400">Free Access</div>
              </div>
            </div>
          </div>

          {/* Featured Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">🌟 Featured Resource Collections</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-[#EE74FF]/50 transition-all"
                >
                  <div className="text-4xl mb-4 text-center">{resource.image}</div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Format:</span>
                      <span className="text-gray-300">{resource.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-300">{resource.pages}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">Includes:</p>
                    <div className="space-y-1">
                      {resource.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300">
                          <span className="text-[#00E061]">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                    Download Free
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Resource Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">📚 Resource Categories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resourceCategories.map((category, index) => (
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
                      <p className="text-xs text-[#0EEDFF] mt-1">{category.count}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {category.resources.map((resource, resIndex) => (
                      <div key={resIndex} className="bg-gray-700/30 p-3 rounded border border-gray-600/50 hover:border-gray-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white text-sm">{resource.name}</h4>
                          <span className="px-2 py-1 bg-[#0EEDFF]/20 text-[#0EEDFF] rounded text-xs">
                            {resource.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>📄 {resource.pages}</span>
                          <span className={`px-2 py-1 rounded ${
                            resource.difficulty === 'Beginner' || resource.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            resource.difficulty === 'Intermediate' || resource.difficulty === 'Flexible' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {resource.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button className="text-sm text-[#0EEDFF] hover:text-white transition-colors">
                      Browse All {category.title} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-lg p-8 border border-[#EE74FF]/20">
              <h2 className="text-3xl font-bold mb-6 text-center">📋 Usage Guidelines & License</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#FF3E9D]">✅ Permitted Uses</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Use in your classroom or educational setting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Share with colleagues and other educators</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Modify and adapt for your specific needs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Print multiple copies for classroom use</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Use in teacher training and professional development</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#FF3E9D]">❌ Restrictions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>No commercial sale or redistribution</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Must maintain attribution to our site</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Cannot claim as your own original work</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>No inclusion in paid curriculum packages</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded border border-gray-600">
                <p className="text-sm text-gray-400 text-center">
                  <strong>Attribution:</strong> When sharing or modifying these resources, please include: 
                  "Original resource from Random Letter Generator (randomlettergenerator.com)"
                </p>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="mb-16">
            <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">📬 Get New Resources First</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Join our educator newsletter to receive new resources, teaching tips, and exclusive content 
                delivered directly to your inbox. Over 5,000 teachers trust our weekly updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE74FF]"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Subscribe Free
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                No spam, unsubscribe anytime. We respect your privacy and time.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to Enhance Your Teaching?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Combine these free resources with our interactive random letter generator for the most 
              effective alphabet instruction experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#generator"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Try the Letter Generator
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
