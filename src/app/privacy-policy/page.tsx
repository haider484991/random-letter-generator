import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Random Letter Generator',
  description: 'Privacy Policy for Random Letter Generator. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            &larr; Back to Random Letter Generator
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF3E9D] via-[#EE74FF] to-[#0EEDFF] text-transparent bg-clip-text">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to Random Letter Generator. We respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
            <p>
              <strong>Personal Data:</strong> While using our site, we may ask you to provide certain personally identifiable information that can be used to contact or identify you. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usage Data (information on how you use the website)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To serve relevant advertisements</li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Advertising</h2>
            <p>
              Our website may use Google AdSense, a service that places third-party advertisements on websites. Google AdSense uses cookies to serve ads based on a user&apos;s prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Cookies</h2>
            <p>
              Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To keep track of services you have used</li>
              <li>To deliver advertisements tailored to your interests</li>
              <li>To analyze the performance and effectiveness of our website</li>
              <li>To remember your preferences and settings</li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Data Security</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Children&apos;s Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-cyan-400">contact@randomlettergenerator.com</p>
          </section>
        </div>
      </div>
    </div>
  );
} 