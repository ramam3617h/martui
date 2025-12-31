import React, { useState } from 'react';
import { FileText, Shield, ArrowLeft } from 'lucide-react';

const LegalPages = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Legal Documents</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setCurrentPage('terms')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <FileText className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Terms & Conditions</h2>
            <p className="text-gray-600">View our terms of service and usage guidelines</p>
          </button>
          
          <button
            onClick={() => setCurrentPage('privacy')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Shield className="w-12 h-12 text-green-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Privacy Policy</h2>
            <p className="text-gray-600">Learn how we protect and handle your data</p>
          </button>
        </div>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Legal Documents
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: December 31, 2025</p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using this e-commerce platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily access the materials on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on our platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Account</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your password and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Products and Services</h2>
            <p>All products and services are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We reserve the right to refuse service to anyone for any reason at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Payment Terms</h2>
            <p>Payment is due at the time of purchase. We accept various payment methods including credit cards, debit cards, and digital wallets. All transactions are processed securely through encrypted channels.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Shipping and Delivery</h2>
            <p>We aim to process and ship orders within 2-3 business days. Delivery times vary based on location and shipping method selected. Risk of loss and title for items pass to you upon delivery to the carrier.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Returns and Refunds</h2>
            <p>Items may be returned within 30 days of delivery for a full refund, provided they are in original condition with tags attached. Shipping costs are non-refundable except in cases of defective or incorrect items.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Prohibited Uses</h2>
            <p>You may not use our platform:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations</li>
              <li>To infringe upon or violate our intellectual property rights</li>
              <li>To transmit any viruses, worms, or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our platform, even if we have been notified of the possibility of such damage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company operates, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page. Your continued use of the platform after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mt-2">Email: legal@yourstore.com<br />Phone: +1 (555) 123-4567<br />Address: 123 Commerce Street, Business City, ST 12345</p>
          </section>
        </div>
      </div>
    </div>
  );

  const PrivacyPage = () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Legal Documents
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 31, 2025</p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal data, your privacy rights, and how the law protects you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>We collect and process the following types of personal data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Identity Data:</strong> First name, last name, username, date of birth</li>
              <li><strong>Contact Data:</strong> Email address, telephone numbers, billing and delivery addresses</li>
              <li><strong>Financial Data:</strong> Payment card details (processed securely through payment providers)</li>
              <li><strong>Transaction Data:</strong> Details about purchases and payments</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, time zone</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To process and deliver your orders</li>
              <li>To manage your account and provide customer support</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website, products, and services</li>
              <li>To detect and prevent fraud and maintain platform security</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Legal Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Contract Performance:</strong> Processing necessary to fulfill our contract with you</li>
              <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
              <li><strong>Consent:</strong> For marketing communications and cookies</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Data Sharing and Disclosure</h2>
            <p>We may share your personal data with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Service Providers:</strong> Payment processors, shipping companies, email service providers</li>
              <li><strong>Business Partners:</strong> Marketing and analytics partners (with your consent)</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mt-2">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
            <p>We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law. When data is no longer needed, we securely delete or anonymize it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Our cookies include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
            <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal data from children. If we discover we have collected data from a child, we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. International Data Transfers</h2>
            <p>Your data may be transferred to and processed in countries outside your jurisdiction. We ensure appropriate safeguards are in place to protect your data during such transfers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Changes to This Policy</h2>
            <p>We may update this privacy policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
            <p>If you have questions about this privacy policy or wish to exercise your rights, please contact us at:</p>
            <p className="mt-2">Email: privacy@yourstore.com<br />Phone: +1 (555) 123-4567<br />Address: 123 Commerce Street, Business City, ST 12345</p>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'terms' && <TermsPage />}
      {currentPage === 'privacy' && <PrivacyPage />}
    </>
  );
};

export default LegalPages;
