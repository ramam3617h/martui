import React, { useState } from 'react';
import { Mail, Phone, MapPin, FileText, Shield, Package, XCircle, Lock } from 'lucide-react';

const PolicyPages = ({onBackToLogin}) => {
  const [activePage, setActivePage] = useState('contact');

  const pages = [
    { id: 'contact', name: 'Contact Us', icon: Mail },
    { id: 'shipping', name: 'Shipping Policy', icon: Package },
    { id: 'terms', name: 'Terms & Conditions', icon: FileText },
    { id: 'cancellation', name: 'Cancellation & Refund', icon: XCircle },
    { id: 'privacy', name: 'Privacy Policy', icon: Lock }
  ];

  const ContactPage = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">We're here to help with your IT service needs. Get in touch with our team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
              <p className="text-gray-600">C906 ,ETA Rosedale,Padur,OMR Road<br />Chennai, Tamil Nadu 603103<br />India</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Phone className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600">+91 9566192356<br />Mon-Fri: 9:00 AM - 6:00 PM IST</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">
                General: support@vrksatechnology.in<br />
                Support: support@vrksatechnology.in<br />
                Sales: support@vrksatechnology.com
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
            <input type="text" placeholder="Subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
            <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"></textarea>
            <button onClick={() => alert('Message sent! We\'ll get back to you soon.')} className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ShippingPage = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: November 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">VRKSA TECHNOLOGY  Service Delivery</h2>
        <p className="text-gray-700">As an IT services company, most of our offerings are delivered digitally. However, this policy covers both digital service delivery and physical product shipments when applicable.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Digital Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Software Solutions:</strong> Delivered via secure download links or cloud deployment within 24-48 hours of purchase confirmation</li>
          <li><strong>Consulting Services:</strong> Scheduled within 3-5 business days of booking</li>
          <li><strong>Support Packages:</strong> Activated immediately upon payment confirmation</li>
          <li><strong>Cloud Services:</strong> Provisioned within 1-2 business days</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Physical Products</h2>
        <p className="text-gray-700">For hardware, equipment, or physical documentation:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Domestic Shipping (INDIA):</strong> 3-7 business days via standard shipping</li>
          <li><strong>Expedited Shipping:</strong> 1-3 business days (additional charges apply)</li>
          <li><strong>International Shipping:</strong> 7-21 business days depending on location</li>
          <li><strong>Tracking:</strong> Provided via email once items ship</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Shipping Costs</h2>
        <p className="text-gray-700">Shipping costs are calculated at checkout based on destination, weight, and selected shipping method. Free shipping available on orders over Rs45,000 within the country India.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Delays</h2>
        <p className="text-gray-700">While we strive for timely delivery, factors beyond our control (weather, carrier delays, customs) may impact delivery times. We'll notify you of any significant delays.</p>
      </section>
    </div>
  );

  const TermsPage = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: November 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
        <p className="text-gray-700">By accessing or using our IT services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">2. Services Provided</h2>
        <p className="text-gray-700">We provide IT consulting, software development, cloud solutions, managed services, cybersecurity, and related technology services as described on our website.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Provide accurate and complete information when engaging our services</li>
          <li>Maintain confidentiality of account credentials</li>
          <li>Use services in compliance with applicable laws and regulations</li>
          <li>Not engage in unauthorized access, disruption, or misuse of our systems</li>
          <li>Promptly notify us of any security breaches or unauthorized use</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">4. Payment Terms</h2>
        <p className="text-gray-700">Payment is due according to the terms specified in your service agreement. We accept major credit cards, bank transfers, and approved purchase orders. Late payments may incur additional fees and service suspension.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
        <p className="text-gray-700">All content, software, and materials provided by us remain our intellectual property unless explicitly transferred through written agreement. Custom solutions developed for clients follow ownership terms specified in the project contract.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">6. Service Level Agreements</h2>
        <p className="text-gray-700">SLA terms, including uptime guarantees and response times, are specified in individual service contracts. We strive to meet or exceed these commitments.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">7. Limitation of Liability</h2>
        <p className="text-gray-700">To the maximum extent permitted by law, we shall not be liable for indirect, incidental, special, or consequential damages arising from use of our services. Total liability is limited to the amount paid for services in the preceding 12 months.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">8. Termination</h2>
        <p className="text-gray-700">Either party may terminate services according to the notice period specified in the service agreement. We reserve the right to immediately terminate services for violation of these terms.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">9. Changes to Terms</h2>
        <p className="text-gray-700">We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use after changes constitutes acceptance.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">10. Governing Law</h2>
        <p className="text-gray-700">These terms are governed by the Indian Laws, without regard to conflict of law provisions.</p>
      </section>
    </div>
  );

  const CancellationPage = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation and Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: November 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Cancellation Policy</h2>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Subscription Services</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Monthly subscriptions can be cancelled at any time with no penalty</li>
          <li>Cancellation takes effect at the end of the current billing cycle</li>
          <li>Annual subscriptions require 30 days notice for cancellation</li>
          <li>No refunds for partial months of service</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Project-Based Services</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Projects can be cancelled before work begins for a full refund minus 10% administrative fee</li>
          <li>Once work has commenced, charges apply for completed work and non-refundable expenses</li>
          <li>Client must provide written cancellation notice</li>
          <li>Any deliverables completed remain property of our company unless paid for</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Consulting Sessions</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Cancel up to 48 hours before scheduled session for full refund</li>
          <li>24-48 hours notice: 50% refund</li>
          <li>Less than 24 hours: no refund</li>
          <li>Rescheduling available up to 24 hours in advance at no charge</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Refund Policy</h2>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Software & Digital Products</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>30-day money-back guarantee if product doesn't meet specifications</li>
          <li>Must provide detailed explanation of issues</li>
          <li>Technical support must be attempted before refund approval</li>
          <li>No refunds after 30 days from purchase</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Hardware & Physical Products</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>15-day return window for unopened items in original packaging</li>
          <li>Defective items: full refund or replacement within 90 days</li>
          <li>Return shipping costs paid by customer unless item is defective</li>
          <li>Restocking fee of 15% applies to opened non-defective returns</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Non-Refundable Items</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Custom software development (work already completed)</li>
          <li>Third-party licenses and subscriptions purchased on your behalf</li>
          <li>Consulting time already utilized</li>
          <li>Domain registrations and SSL certificates</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Refund Process</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Submit refund request via email to support@vrksatechnology.inm</li>
          <li>Include order number, reason for refund, and supporting documentation</li>
          <li>We'll review within 3-5 business days</li>
          <li>Approved refunds processed within 7-10 business days</li>
          <li>Refunds issued to original payment method</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Disputes</h2>
        <p className="text-gray-700">If you're not satisfied with our cancellation or refund decision, please contact our customer service manager at support@vrksatechnology.in for escalation and review.</p>
      </section>
    </div>
  );

  const PrivacyPage = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: November 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Personal Information</h3>
        <p className="text-gray-700">We collect information you provide directly:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Name, email address, phone number, company name</li>
          <li>Billing and payment information</li>
          <li>Account credentials and preferences</li>
          <li>Communication history and support tickets</li>
          <li>Project requirements and technical specifications</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Automatically Collected Information</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>IP address, browser type, device information</li>
          <li>Usage data, page views, and navigation patterns</li>
          <li>Cookies and similar tracking technologies</li>
          <li>System logs and performance metrics</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Provide, maintain, and improve our IT services</li>
          <li>Process transactions and send confirmations</li>
          <li>Respond to inquiries and provide customer support</li>
          <li>Send service updates, security alerts, and administrative messages</li>
          <li>Analyze usage to enhance user experience</li>
          <li>Detect, prevent, and address security issues or fraud</li>
          <li>Comply with legal obligations</li>
          <li>Send marketing communications (with your consent)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">3. Information Sharing</h2>
        <p className="text-gray-700">We do not sell your personal information. We may share information with:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (cloud hosting, payment processing, analytics)</li>
          <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>With Your Consent:</strong> When you authorize us to share with third parties</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">4. Data Security</h2>
        <p className="text-gray-700">We implement industry-standard security measures to protect your information:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security audits and penetration testing</li>
          <li>Access controls and authentication protocols</li>
          <li>Employee training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
        <p className="text-gray-700 mt-4">However, no system is completely secure. We cannot guarantee absolute security of your data.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">5. Data Retention</h2>
        <p className="text-gray-700">We retain personal information for as long as necessary to fulfill purposes outlined in this policy, unless a longer retention period is required by law. When data is no longer needed, we securely delete or anonymize it.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights</h2>
        <p className="text-gray-700">Depending on your location, you may have the following rights:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Access:</strong> Request copies of your personal data</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data</li>
          <li><strong>Deletion:</strong> Request deletion of your data</li>
          <li><strong>Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Restriction:</strong> Request limitation of processing</li>
        </ul>
        <p className="text-gray-700 mt-4">To exercise these rights, contact us at support@vrksatechnology.in</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">7. Cookies and Tracking</h2>
        <p className="text-gray-700">We use cookies and similar technologies for functionality, analytics, and marketing. You can control cookies through your browser settings, but some features may not function properly if disabled.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">8. Third-Party Links</h2>
        <p className="text-gray-700">Our services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">9. Children's Privacy</h2>
        <p className="text-gray-700">Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete it.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">10. International Data Transfers</h2>
        <p className="text-gray-700">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">11. Changes to Privacy Policy</h2>
        <p className="text-gray-700">We may update this policy periodically. We'll notify you of significant changes via email or website notice. Your continued use after changes constitutes acceptance.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">12. Contact Us</h2>
        <p className="text-gray-700">For privacy-related questions or concerns:</p>
        <p className="text-gray-700 mt-2">
          Email: support@vrksatechnology.in<br />
          Phone: +91 9566192356<br />
          Address: c906, ETA Rosedale, Padur, OMR, Tamil Nadu ,India 603103
        </p>
      </section>
    </div>
  );

  const renderPage = () => {
    switch(activePage) {
      case 'contact': return <ContactPage />;
      case 'shipping': return <ShippingPage />;
      case 'terms': return <TermsPage />;
      case 'cancellation': return <CancellationPage />;
      case 'privacy': return <PrivacyPage />;
      default: return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-yellow-600" />
              <span className="text-xl font-bold text-gray-900">VRKSA TECHNOLOGY</span>
                <button
                onClick={onBackToLogin}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
            <div className="hidden md:flex space-x-1">
              {pages.map(page => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      activePage === page.id
                        ? 'bg-yellow-100 text-yellow-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{page.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <select 
          value={activePage}
          onChange={(e) => setActivePage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
        >
          {pages.map(page => (
            <option key={page.id} value={page.id}>{page.name}</option>
          ))}
        </select>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {renderPage()}
      </main>

      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Vrksa Technology</h3>
              <p className="text-sm">Professional IT services and solutions for modern cloud businesses.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                {pages.map(page => (
                  <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className="block hover:text-white transition-colors"
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Contact</h3>
              <p className="text-sm">support@vrksatechnology.in<br />+91 9566192356</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            <p>© 2025 VRKSA TECHNOLOGY LLP . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PolicyPages;
