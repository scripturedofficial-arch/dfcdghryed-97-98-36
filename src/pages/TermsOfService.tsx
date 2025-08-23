import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const TermsOfService = () => {
  const [shouldHighlight, setShouldHighlight] = useState(false);

  useEffect(() => {
    // Check if user came from size exchange page via the Conditionally¹ link
    const hash = window.location.hash;
    if (hash === '#section-7') {
      setShouldHighlight(true);
      // Scroll to the section smoothly
      setTimeout(() => {
        const element = document.getElementById('section-7');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // Remove highlight after a few seconds
      const timer = setTimeout(() => setShouldHighlight(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using Scriptured's website and services, you accept and agree to be 
                  bound by the terms and provision of this agreement. If you do not agree to abide by 
                  the above, please do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Scriptured provides an online platform for purchasing faith-inspired streetwear and 
                  accessories. Our products feature scripture-based designs and are made-to-order with 
                  limited edition releases.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  To make purchases, you may need to create an account. You are responsible for:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and current information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Orders and Payment</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>Order Acceptance:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Prices are subject to change without notice</li>
                </ul>
                
                <p><strong>Payment:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Payment is required at the time of order</li>
                  <li>We accept major credit cards, PayPal, and Paystack</li>
                  <li>Prices are displayed in your local currency based on your location</li>
                  <li>You are responsible for any applicable taxes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Product Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We strive to provide accurate product descriptions and images. However:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Colors may vary due to monitor settings</li>
                  <li>Product dimensions are approximate</li>
                  <li>We reserve the right to correct any errors</li>
                  <li>Limited edition items have specific quantity restrictions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Shipping and Delivery</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All items are made-to-order with a production time of 2-3 weeks. Shipping times 
                  are estimates and may vary due to circumstances beyond our control.
                </p>
                <p>
                  Risk of loss passes to you upon delivery to the shipping carrier. We are not 
                  responsible for lost or stolen packages.
                </p>
              </div>
            </section>

            <section id="section-7">
              <h2 className="text-2xl font-bold mb-4">7. Returns and Exchanges</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We offer hassle-free returns for size issues within 14 days of delivery. Items must 
                  be returned unworn with original tags and packaging for a full refund. Please review 
                  our size guide carefully before ordering.
                </p>
                
                <p>
                  <strong className={shouldHighlight ? "bg-yellow-200 px-2 py-1 rounded" : ""}>Return Shipping Costs:</strong> Returns only incur fees when the return is due to a 
                  change of mind or the customer's error. However, if the return is due to a fault with the 
                  product, we will cover the return shipping costs.
                </p>
                
                <p>
                  Additional exceptions may be made for defective items, wrong items sent, or shipping 
                  damage. Contact us within 7 days of delivery for such issues.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content on this website, including designs, text, graphics, logos, and images, 
                  is the property of Scriptured and is protected by copyright and trademark laws.
                </p>
                <p>
                  You may not reproduce, distribute, or create derivative works without express 
                  written permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Prohibited Uses</h2>
              <div className="space-y-4 text-gray-700">
                <p>You may not use our service:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>For any unlawful purpose or to solicit unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To transmit or procure the sending of any advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate the company or other users</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Scriptured shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, 
                  goodwill, or other intangible losses.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  These Terms shall be interpreted and governed by the laws of South Africa. 
                  Any disputes shall be subject to the exclusive jurisdiction of the courts of South Africa.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to update these Terms of Service at any time. Changes will be 
                  effective immediately upon posting. Your continued use of the service constitutes 
                  acceptance of any changes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. The 12 - Exclusive Product Drops</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The following additional terms apply specifically to "The 12" exclusive product drops:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Submission of an application to The 12 does not guarantee selection or the right to purchase</li>
                  <li>Scriptured reserves the right to verify the identity and eligibility of applicants, including review of provided information and social media accounts</li>
                  <li>Selected applicants will be contacted directly and provided with purchase instructions</li>
                  <li>All pieces from The 12 are limited, numbered, and non-transferable</li>
                  <li>Items purchased from The 12 are not eligible for return or exchange, except in the case of damage or defect as outlined in our Returns Policy</li>
                  <li>Scriptured reserves the right to decline applications at its sole discretion without providing a reason</li>
                  <li>Any resale of items from The 12 without prior written consent from Scriptured may result in disqualification from future drops</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Questions about the Terms of Service should be sent to us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> info@scriptured.clothing</p>
                  <p><strong>Address:</strong> Pietermaritzburg, South Africa</p>
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

export default TermsOfService;