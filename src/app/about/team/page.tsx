import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Our Educational Team | Random Letter Generator - Expert Educators & Developers',
  description: 'Meet the experienced educators, researchers, and developers behind Random Letter Generator. Learn about our team\'s credentials and commitment to educational excellence.',
  keywords: 'educational team, teacher credentials, educational expertise, curriculum developers, educational technology specialists',
};

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Educational Researcher',
      credentials: 'Ph.D. Educational Psychology, M.Ed. Curriculum & Instruction',
      experience: '15+ years in early childhood education research',
      specialties: ['Alphabet Instruction', 'Learning Assessment', 'Educational Technology'],
      bio: 'Dr. Chen leads our educational research initiatives, ensuring all features are grounded in evidence-based practices. Her research on systematic learning approaches has been published in over 30 peer-reviewed journals.',
      image: '👩‍🔬',
      publications: [
        'Systematic Practice Distribution in Early Literacy (2023)',
        'Digital Tools for Alphabet Instruction (2022)',
        'Equity in Educational Technology (2021)'
      ]
    },
    {
      name: 'Maria Rodriguez',
      role: 'Senior Curriculum Developer',
      credentials: 'M.Ed. Special Education, B.A. Elementary Education',
      experience: '12+ years classroom teaching, 8+ years curriculum development',
      specialties: ['Differentiated Instruction', 'ESL Education', 'Inclusive Classroom Design'],
      bio: 'Maria brings extensive classroom experience to our curriculum development. She specializes in creating inclusive, accessible learning experiences that meet diverse student needs.',
      image: '👩‍🏫',
      achievements: [
        'National Teacher of the Year Finalist (2019)',
        'Inclusive Education Innovation Award (2020)',
        'ESL Curriculum Excellence Recognition (2021)'
      ]
    },
    {
      name: 'Dr. James Mitchell',
      role: 'Child Development Specialist',
      credentials: 'Ph.D. Developmental Psychology, M.S. Child Development',
      experience: '18+ years in child development research and practice',
      specialties: ['Early Literacy Development', 'Cognitive Development', 'Learning Disabilities'],
      bio: 'Dr. Mitchell ensures our tools align with natural child development patterns. His expertise in developmental milestones guides our age-appropriate feature design.',
      image: '👨‍⚕️',
      research: [
        'Alphabet Knowledge Developmental Trajectories',
        'Technology Integration in Early Learning',
        'Supporting Struggling Readers'
      ]
    },
    {
      name: 'Lisa Thompson',
      role: 'Classroom Integration Specialist',
      credentials: 'M.Ed. Educational Technology, B.S. Elementary Education',
      experience: '10+ years teaching, 5+ years educational technology consulting',
      specialties: ['Classroom Management', 'Technology Integration', 'Teacher Professional Development'],
      bio: 'Lisa bridges the gap between educational research and practical classroom application. She develops our teacher resources and training materials.',
      image: '👩‍💻',
      certifications: [
        'Google for Education Certified Trainer',
        'ISTE Educational Technology Specialist',
        'Reading Recovery Teacher Leader'
      ]
    },
    {
      name: 'Dr. Ahmed Hassan',
      role: 'Assessment & Analytics Specialist',
      credentials: 'Ph.D. Educational Measurement, M.S. Statistics',
      experience: '14+ years in educational assessment and data analysis',
      specialties: ['Learning Analytics', 'Progress Monitoring', 'Statistical Analysis'],
      bio: 'Dr. Hassan develops our assessment frameworks and analytics features. His expertise ensures our progress tracking tools provide meaningful, actionable insights.',
      image: '👨‍💼',
      expertise: [
        'Formative Assessment Design',
        'Learning Data Visualization',
        'Predictive Learning Models'
      ]
    },
    {
      name: 'Rachel Kim',
      role: 'UX/Accessibility Designer',
      credentials: 'M.A. Human-Computer Interaction, B.F.A. Graphic Design',
      experience: '8+ years in educational UX design and accessibility',
      specialties: ['Accessible Design', 'User Experience', 'Educational Interface Design'],
      bio: 'Rachel ensures our tools are accessible to all learners, including those with disabilities. Her designs prioritize usability and inclusive access.',
      image: '👩‍🎨',
      focus: [
        'WCAG 2.1 AA Compliance',
        'Universal Design for Learning',
        'Assistive Technology Integration'
      ]
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <span>/</span>
              <span className="text-white">Our Team</span>
            </div>
          </nav>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">
              Meet Our Educational Experts
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our diverse team combines decades of educational experience, research expertise, and technical innovation 
              to create the most effective alphabet learning tools for educators and students.
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#FF3E9D]">75+</div>
                <div className="text-sm text-gray-400">Years Combined Experience</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#0EEDFF]">50+</div>
                <div className="text-sm text-gray-400">Research Publications</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#EE74FF]">10K+</div>
                <div className="text-sm text-gray-400">Students Impacted</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-[#00E061]">15+</div>
                <div className="text-sm text-gray-400">Awards & Recognition</div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 bg-gray-800/50 rounded-lg p-8 border border-gray-700 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Profile Image & Basic Info */}
                <div className="lg:w-1/3 text-center lg:text-left">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h2 className="text-2xl font-bold mb-2 text-white">{member.name}</h2>
                  <p className="text-lg text-[#EE74FF] mb-3">{member.role}</p>
                  <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-[#0EEDFF] mb-2">Credentials</h3>
                    <p className="text-sm text-gray-300">{member.credentials}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#FF3E9D] mb-2">Experience</h3>
                    <p className="text-sm text-gray-300">{member.experience}</p>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">About {member.name.split(' ')[0]}</h3>
                    <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#00E061] mb-3">Specialties</h4>
                      <ul className="space-y-2">
                        {member.specialties.map((specialty, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                            <span className="text-[#00E061]">•</span>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#EE74FF] mb-3">
                        {member.publications ? 'Recent Publications' : 
                         member.achievements ? 'Achievements' : 
                         member.research ? 'Research Areas' :
                         member.certifications ? 'Certifications' :
                         member.expertise ? 'Expertise' : 'Focus Areas'}
                      </h4>
                      <ul className="space-y-2">
                        {(member.publications || member.achievements || member.research || 
                          member.certifications || member.expertise || member.focus || []).map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                            <span className="text-[#EE74FF] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="mt-16 bg-gradient-to-r from-[#FF3E9D]/10 to-[#0EEDFF]/10 rounded-lg p-8 border border-[#EE74FF]/20">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Commitment to Educational Excellence</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3 text-[#FF3E9D]">Evidence-Based Design</h3>
                <p className="text-gray-300 text-sm">
                  Every feature is grounded in peer-reviewed educational research and classroom-tested methodologies.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3 text-[#0EEDFF]">Inclusive Access</h3>
                <p className="text-gray-300 text-sm">
                  We design for all learners, ensuring accessibility and cultural responsiveness in every tool.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3 text-[#EE74FF]">Continuous Innovation</h3>
                <p className="text-gray-300 text-sm">
                  We continuously evolve our tools based on latest research, teacher feedback, and student outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Connect with Our Team</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Have questions about our educational approach or want to collaborate on research? 
              We&apos;d love to hear from educators and researchers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3E9D] to-[#0EEDFF] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Our Team
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Read Our Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
