import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Complete Guide to Teaching the Alphabet | Educational Strategies & Methods',
  description: 'Comprehensive guide for educators on teaching alphabet recognition, letter sounds, and early literacy skills. Evidence-based strategies for classroom success.',
  keywords: 'teaching alphabet, letter recognition, phonics instruction, early literacy, alphabet activities, educational strategies, classroom teaching methods',
};

export default function TeachingAlphabet() {
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
              <span className="text-white">Teaching the Alphabet</span>
            </div>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Complete Guide to Teaching the Alphabet
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="px-3 py-1 bg-[#FF3E9D]/20 text-[#FF3E9D] rounded-full">Fundamentals</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Beginner Level</span>
              <span className="text-gray-400">📖 15 min read</span>
              <span className="text-gray-400">👩‍🏫 Updated: January 2024</span>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Master the fundamentals of alphabet instruction with this comprehensive guide covering letter recognition, 
              phonics, and evidence-based teaching strategies that work in any classroom setting.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-[#EE74FF]">📋 Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#foundations" className="text-gray-400 hover:text-white transition-colors py-1">1. Foundations of Alphabet Learning</a>
              <a href="#letter-recognition" className="text-gray-400 hover:text-white transition-colors py-1">2. Letter Recognition Strategies</a>
              <a href="#phonics-connection" className="text-gray-400 hover:text-white transition-colors py-1">3. Connecting Letters to Sounds</a>
              <a href="#teaching-sequence" className="text-gray-400 hover:text-white transition-colors py-1">4. Optimal Teaching Sequence</a>
              <a href="#multisensory-approaches" className="text-gray-400 hover:text-white transition-colors py-1">5. Multisensory Learning Approaches</a>
              <a href="#assessment-methods" className="text-gray-400 hover:text-white transition-colors py-1">6. Assessment and Progress Monitoring</a>
              <a href="#common-challenges" className="text-gray-400 hover:text-white transition-colors py-1">7. Common Challenges and Solutions</a>
              <a href="#technology-integration" className="text-gray-400 hover:text-white transition-colors py-1">8. Technology Integration</a>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section id="foundations" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">1. Foundations of Alphabet Learning</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Alphabet knowledge forms the cornerstone of literacy development. Research consistently shows that children who master 
                  letter recognition and letter-sound correspondence early are more likely to become successful readers.
                </p>

                <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 p-6 rounded-lg border border-[#EE74FF]/20">
                  <h3 className="text-xl font-semibold mb-4 text-white">🎯 Key Learning Objectives</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#FF3E9D] mt-1">•</span>
                      <span>Recognize and name all 26 letters of the alphabet in both uppercase and lowercase</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#0EEDFF] mt-1">•</span>
                      <span>Understand that letters represent sounds (alphabetic principle)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#EE74FF] mt-1">•</span>
                      <span>Produce the most common sound for each letter</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#00E061] mt-1">•</span>
                      <span>Write letters legibly and from memory</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-white">Developmental Stages</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-[#FF3E9D] mb-2">Pre-Alphabetic (Ages 2-4)</h4>
                    <p className="text-sm">Children recognize letters as pictures, may know some letter names, especially those in their name.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-[#0EEDFF] mb-2">Partial Alphabetic (Ages 4-6)</h4>
                    <p className="text-sm">Beginning to connect some letters with sounds, can identify several letters consistently.</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-semibold text-[#EE74FF] mb-2">Full Alphabetic (Ages 5-7)</h4>
                    <p className="text-sm">Knows most letter names and sounds, can use this knowledge for reading and spelling.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="letter-recognition" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">2. Letter Recognition Strategies</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Effective letter recognition instruction combines systematic presentation with engaging, interactive activities 
                  that help children distinguish between similar letters and build automatic recognition.
                </p>

                <h3 className="text-2xl font-semibold text-white">Evidence-Based Teaching Methods</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-semibold text-[#FF3E9D] mb-3">🎲 Random Letter Selection Activities</h4>
                    <p className="mb-4">
                      Using tools like our Random Letter Generator creates unpredictable, engaging practice opportunities 
                      that maintain student attention and prevent memorization of sequences.
                    </p>
                    <div className="bg-gray-700/50 p-4 rounded border-l-4 border-[#FF3E9D]">
                      <p className="font-semibold mb-2">💡 Pro Tip: Elimination Mode</p>
                      <p className="text-sm">
                        Use elimination mode to ensure every letter gets equal practice time. Once a letter is selected, 
                        it&apos;s removed from the pool until all letters have been practiced, then the cycle resets.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-semibold text-[#0EEDFF] mb-3">📝 Letter Formation Practice</h4>
                    <p className="mb-4">
                      Combine recognition with writing practice. When a letter is randomly selected, have students:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start space-x-2">
                        <span className="text-[#0EEDFF] mt-1">1.</span>
                        <span>Trace the letter in the air</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#0EEDFF] mt-1">2.</span>
                        <span>Write it on paper or whiteboard</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#0EEDFF] mt-1">3.</span>
                        <span>Form it with manipulatives (play dough, blocks)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="phonics-connection" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">3. Connecting Letters to Sounds</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  The alphabetic principle—understanding that letters represent sounds—is crucial for reading success. 
                  This connection should be taught explicitly and systematically.
                </p>

                <div className="bg-gradient-to-r from-[#EE74FF]/10 to-[#00E061]/10 p-6 rounded-lg border border-[#EE74FF]/20">
                  <h3 className="text-xl font-semibold mb-4 text-white">🔤 Phonics Teaching Sequence</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-[#EE74FF] mb-2">Start with these letters:</h4>
                      <p className="text-sm mb-2">M, A, T, S, P, I, N (high frequency, distinct sounds)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#00E061] mb-2">Introduce gradually:</h4>
                      <p className="text-sm mb-2">C, K, E, H, R, O, D, U, L, F, B, G, W, J, V, Y, Z, Q, X</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white">Interactive Sound Activities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-[#FF3E9D] mb-3">🎵 Sound Association Games</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Letter sound songs and chants</li>
                      <li>• Action movements for each sound</li>
                      <li>• Picture-sound matching activities</li>
                      <li>• Beginning sound identification</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-[#0EEDFF] mb-3">🎯 Random Letter Sound Practice</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Quick sound identification drills</li>
                      <li>• Word beginning sound games</li>
                      <li>• Sound isolation exercises</li>
                      <li>• Phoneme manipulation activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue with more sections... */}
            <section id="technology-integration" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 text-[#0EEDFF]">8. Technology Integration</h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Digital tools like random letter generators can enhance traditional alphabet instruction by providing 
                  engaging, interactive experiences that adapt to different learning styles and needs.
                </p>

                <div className="bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 p-6 rounded-lg border border-[#EE74FF]/20">
                  <h3 className="text-xl font-semibold mb-4 text-white">🚀 Advanced Features for Education</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-[#FF3E9D] mb-2">Elimination Mode Benefits:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Ensures equal practice for all letters</li>
                        <li>• Prevents over-practice of easy letters</li>
                        <li>• Creates fair turn-taking opportunities</li>
                        <li>• Builds systematic review cycles</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0EEDFF] mb-2">Custom Alphabet Features:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Focus on problem letters only</li>
                        <li>• Create themed letter sets</li>
                        <li>• Differentiate for student needs</li>
                        <li>• Support multilingual learning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Alphabet Instruction?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Put these strategies into practice with our advanced random letter generator. 
              Try elimination mode and custom alphabets to create engaging, effective lessons.
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
                href="/activities"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Browse Activities
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">📚 Related Teaching Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/phonics-instruction" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#EE74FF] mb-2">Phonics Instruction Guide</h4>
                <p className="text-sm text-gray-400">Advanced strategies for teaching letter-sound relationships</p>
              </Link>
              <Link href="/guides/classroom-integration" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#0EEDFF] mb-2">Classroom Integration</h4>
                <p className="text-sm text-gray-400">Practical tips for using letter generators in daily lessons</p>
              </Link>
              <Link href="/guides/assessment-strategies" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#EE74FF]/50 transition-colors">
                <h4 className="font-semibold text-[#00E061] mb-2">Assessment Strategies</h4>
                <p className="text-sm text-gray-400">Tools for measuring alphabet knowledge progress</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
