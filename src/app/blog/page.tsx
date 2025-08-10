'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

export default function BlogPage() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const blogPosts = [
    {
      title: 'The Science Behind Elimination Mode: Why Fair Practice Matters in Education',
      description: 'Explore the educational research supporting elimination-based learning systems and how they improve student engagement and learning outcomes in alphabet instruction.',
      slug: '/blog/elimination-mode-education-research',
      imagePath: '/images/elimination-mode-research.webp', 
      date: formattedDate,
      readTime: '8 min read',
      category: 'Educational Research',
    },
    {
      title: 'Digital Literacy in Early Childhood: Integrating Technology Effectively',
      description: 'Learn evidence-based strategies for incorporating digital tools like random letter generators into early childhood education while maintaining developmental appropriateness.',
      slug: '/blog/digital-literacy-early-childhood',
      imagePath: '/images/digital-literacy-thumbnail.webp',
      date: formattedDate,
      readTime: '10 min read',
      category: 'Educational Technology',
    },
    {
      title: 'Differentiated Alphabet Instruction: Meeting Every Student\'s Needs',
      description: 'Discover how custom alphabet features and adaptive teaching strategies can support diverse learners, including ESL students and those with learning differences.',
      slug: '/blog/differentiated-alphabet-instruction',
      imagePath: '/images/differentiated-instruction.webp',
      date: formattedDate,
      readTime: '12 min read',
      category: 'Special Education',
    },
    {
      title: 'From Recognition to Reading: The Alphabet Knowledge Progression',
      description: 'Understand the developmental stages of alphabet learning and how systematic instruction with random letter practice accelerates reading readiness.',
      slug: '/blog/alphabet-knowledge-progression',
      imagePath: '/images/alphabet-progression.webp',
      date: formattedDate,
      readTime: '9 min read',
      category: 'Child Development',
    },
    {
      title: 'Classroom Management Strategies for Interactive Letter Activities',
      description: 'Master the art of managing engaging, technology-enhanced alphabet activities while maintaining focus and maximizing learning time.',
      slug: '/blog/classroom-management-letter-activities',
      imagePath: '/images/classroom-management.webp',
      date: formattedDate,
      readTime: '7 min read',
      category: 'Classroom Management',
    },
    {
      title: 'Assessment in the Digital Age: Tracking Alphabet Knowledge Progress',
      description: 'Explore modern approaches to assessing letter recognition, phonemic awareness, and early literacy skills using digital tools and data-driven insights.',
      slug: '/blog/digital-alphabet-assessment',
      imagePath: '/images/digital-assessment.webp',
      date: formattedDate,
      readTime: '11 min read',
      category: 'Assessment',
    },
    {
      title: 'Random Letter Generator: A Versatile Tool for Games and Learning',
      description: 'Discover how our Random Letter Generator can enhance your games, educational activities, and creative projects with customizable options for generating random letters.',
      slug: '/blog/random-letter-generator',
      imagePath: '/images/letter-generator-thumbnail.webp', 
      date: formattedDate,
      readTime: '4 min read',
      category: 'Game Tools',
    },
    {
      title: 'Building Phonemic Awareness Through Systematic Letter Practice',
      description: 'Learn how structured, random letter activities develop the foundational skills students need for successful reading and spelling development.',
      slug: '/blog/phonemic-awareness-letter-practice',
      imagePath: '/images/pokemon-thumbnail.webp',
      date: formattedDate,
      readTime: '6 min read',
      category: 'Game Tools',
    },
    {
      title: 'Random Objects Generator: A Versatile Tool for Games, Teaching, and Creativity',
      description: 'Explore how our Random Objects Generator can spark creativity, enhance educational activities, and add excitement to games with diverse categories of random items.',
      slug: '/blog/random-objects-generator',
      imagePath: '/images/objects-thumbnail.webp',
      date: formattedDate,
      readTime: '4 min read',
      category: 'Creative Tools',
    },
  ];

  return (
    <Layout>
      <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-transparent bg-clip-text mb-4">
            Generator Tools Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover tips, tutorials, and creative uses for our free online generator tools. Learn how to enhance your games, spark creativity, and make the most of our versatile generators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-[#0EEDFF]/50 transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative h-48 w-full bg-gray-800">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 z-10"></div>
                {/* If you have actual images, replace the div below with an Image component */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-5xl text-gray-600">
                  {index === 0 && "Aa"}
                  {index === 1 && "Z̸̨̲̓a̴̦͉̔l̷̞̀g̸̨͌ò̸̟"}
                  {index === 2 && "🖌️"}
                  {index === 3 && "⚡"}
                  {index === 4 && "🎲"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded bg-[#FF3E9D]/20 text-[#FF3E9D] last:mr-0 mr-1">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <Link href={post.slug}>
                  <h2 className="text-xl font-bold mb-2 text-white hover:text-[#0EEDFF] transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <Link 
                    href={post.slug}
                    className="inline-flex items-center text-[#0EEDFF] hover:text-[#FF3E9D] transition-colors"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to See More Generator Tools?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We&apos;re constantly expanding our collection of free online generators to help with your games, creative projects, and educational activities.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] hover:from-[#FF3E9D]/80 hover:to-[#0EEDFF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EEDFF]"
          >
            Explore All Generators
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
