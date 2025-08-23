import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, subscribe to our newsletter, or contact us for support.
                </p>
                <p><strong>Personal Information includes:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Purchase history and preferences</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your purchases</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>With service providers who help us operate our business</li>
                  <li>To comply with legal requirements or protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>
                  All payment information is processed through secure, PCI-compliant payment processors. 
                  We do not store your full credit card information on our servers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at support@scriptured.clothing
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze site traffic, and personalize content. You can control cookie settings 
                  through your browser preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our website may contain links to third-party websites. We are not responsible 
                  for the privacy practices of these external sites. We encourage you to review 
                  their privacy policies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our services are not intended for children under 18. We do not knowingly 
                  collect personal information from children under 18. If you believe we have 
                  collected such information, please contact us immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Updates to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any material changes by posting the new policy on our website and updating 
                  the "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Information We Collect for Exclusive Product Drops</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In addition to the personal information collected through our store, Scriptured may collect 
                  information you voluntarily provide when applying for ultra-exclusive product releases such as The 12. 
                  This information may include:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Full name, email address, phone number, country, and city</li>
                  <li>Your stated faith or religious affiliation</li>
                  <li>Social media handles, including Instagram, Twitter/X, TikTok, and YouTube</li>
                  <li>Responses provided in the application form, including yes/no confirmations regarding sharing photos or videos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Use of Your Information for The 12</h2>
              <div className="space-y-4 text-gray-700">
                <p>Information collected through The 12 application form will be used solely for the following purposes:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Verifying eligibility for participation in the ultra-exclusive product drop</li>
                  <li>Contacting applicants regarding their application status</li>
                  <li>Preventing fraudulent or inauthentic applications</li>
                  <li>Maintaining the integrity and exclusivity of limited product releases</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Data Retention for The 12</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Information submitted via The 12 application form will be retained only as long as necessary 
                  to process applications, verify eligibility, and comply with legal obligations. Applicants may 
                  request deletion of their information at any time by contacting us at support@scriptured.clothing
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Sharing of Information for The 12</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Scriptured does not sell, rent, or trade applicant information to third parties. Information 
                  submitted through The 12 application form is only shared internally with team members responsible 
                  for product allocation and selection.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Sensitive Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By voluntarily providing information such as your religious affiliation, you consent to our 
                  processing of this data solely for the purposes outlined above.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> info@scriptured.clothing</p>
                  <p><strong>Address:</strong> 113 Jabu Ndlovu Street, Pietermaritzburg, South Africa</p>
                  <p><strong>Phone:</strong> +27 68 342 2444</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;