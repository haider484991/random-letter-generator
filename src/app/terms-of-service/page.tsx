import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Random Letter Generator',
  description: 'Terms of Service for Random Letter Generator. Please read these terms carefully before using our website.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            &larr; Back to Random Letter Generator
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-300">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to Random Letter Generator. These Terms of Service govern your use of our website located at randomlettergenerator.com (the &quot;Service&quot;).
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Use License</h2>
            <p>
              Permission is granted to temporarily use the Service for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Random Letter Generator&apos;s website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Random Letter Generator at any time.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Disclaimer</h2>
            <p>
              The materials on Random Letter Generator&apos;s website are provided on an &apos;as is&apos; basis. Random Letter Generator makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Random Letter Generator does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Limitations</h2>
            <p>
              In no event shall Random Letter Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Random Letter Generator&apos;s website, even if Random Letter Generator or a Random Letter Generator authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p>
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Random Letter Generator&apos;s website could include technical, typographical, or photographic errors. Random Letter Generator does not warrant that any of the materials on its website are accurate, complete or current. Random Letter Generator may make changes to the materials contained on its website at any time without notice. However, Random Letter Generator does not make any commitment to update the materials.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Links</h2>
            <p>
              Random Letter Generator has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Random Letter Generator of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Modifications</h2>
            <p>
              Random Letter Generator may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-cyan-400">contact@randomlettergenerator.com</p>
          </section>
        </div>
      </div>
    </div>
  );
} 