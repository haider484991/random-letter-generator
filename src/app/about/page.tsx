import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Random Letter Generator',
  description: 'Learn about Random Letter Generator - a free online tool for generating random letters for games, teaching, and learning activities.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            &larr; Back to Random Letter Generator
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">About Random Letter Generator</h1>
        
        <div className="space-y-8 text-gray-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
            <p>
              At Random Letter Generator, our mission is to provide a fun, engaging, and visually appealing tool for generating random letters. We believe that learning and playing should go hand in hand, which is why we&apos;ve created a tool that&apos;s not only functional but also enjoyable to use.
            </p>
            <p>
              Whether you&apos;re a teacher looking for an interactive way to teach the alphabet, a parent wanting to make learning fun for your children, or someone who needs a random letter for games or decision-making, our tool is designed to meet your needs.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">What Makes Us Different</h2>
            <p>
              Unlike other random letter generators, our tool features a beautiful spinning wheel animation that makes the process of generating random letters more engaging and exciting. We&apos;ve also included customization options that allow you to tailor the experience to your specific needs:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose between uppercase letters, lowercase letters, or both</li>
              <li>Include or exclude vowels</li>
              <li>Select from different spinner types and colors</li>
              <li>Switch between dark and vibrant themes</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Educational Applications</h2>
            <p>
              Our Random Letter Generator is a versatile educational tool that can be used in various learning scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Alphabet Learning:</strong> Help children learn letter recognition and phonics</li>
              <li><strong>Vocabulary Building:</strong> Challenge students to come up with words that start with the randomly generated letter</li>
              <li><strong>Creative Writing:</strong> Use random letters as prompts for storytelling or poetry</li>
              <li><strong>ESL/EFL Teaching:</strong> Create engaging activities for language learners</li>
              <li><strong>Classroom Games:</strong> Incorporate the tool into educational games and activities</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Fun and Games</h2>
            <p>
              Beyond educational applications, our Random Letter Generator is perfect for various games and activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Word Games:</strong> Use it for games like Scrabble, Boggle, or word association games</li>
              <li><strong>Name Games:</strong> Generate a random letter and challenge players to name a person, place, animal, or thing that starts with that letter</li>
              <li><strong>Decision Making:</strong> Assign options to letters and let the wheel decide</li>
              <li><strong>Party Games:</strong> Incorporate the tool into party games for added fun</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Our Technology</h2>
            <p>
              Random Letter Generator is built using modern web technologies to ensure a smooth and responsive experience:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Next.js:</strong> A React framework for building fast and scalable web applications</li>
              <li><strong>Framer Motion:</strong> A production-ready motion library for React that powers our smooth animations</li>
              <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for rapid UI development</li>
              <li><strong>TypeScript:</strong> A typed superset of JavaScript that enhances code quality and developer experience</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Feedback and Suggestions</h2>
            <p>
              We&apos;re constantly working to improve Random Letter Generator and add new features. If you have any feedback, suggestions, or feature requests, we&apos;d love to hear from you! Please contact us at:
            </p>
            <p className="text-cyan-400">feedback@randomlettergenerator.com</p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p>
              For any inquiries, support, or business-related questions, please reach out to us at:
            </p>
            <p className="text-cyan-400">contact@randomlettergenerator.com</p>
          </section>
        </div>
      </div>
    </div>
  );
} 