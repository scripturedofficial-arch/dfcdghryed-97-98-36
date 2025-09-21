import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  useEffect(() => {
    // Handle hash navigation on initial load and hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  return <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      

      {/* Mission Section - fixed visibility issues */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-black">
                Purpose Beyond Fashion
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Scriptured isn't just streetwear—it's a movement that bridges ancient wisdom 
                  with contemporary culture. Every piece carries profound meaning, carefully 
                  crafted to inspire reflection and spiritual growth.
                </p>
                <p>
                  We believe fashion can be a force for good. Every purchase contributes to 
                  causes aligned with each scripture's inspiration—from literacy programs 
                  to youth mentorship and educational scholarships.
                </p>
              </div>

              {/* Values */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {['Honesty', 'Integrity', 'Compassion', 'Modesty'].map(value => <div key={value} className="text-center p-4 bg-white rounded shadow-sm">
                    <p className="font-medium text-black">{value}</p>
                  </div>)}
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-3xl font-bold mb-4 text-black">Our Impact</h3>
                  <p className="text-gray-600">Making a difference through every purchase</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="text-center p-6 border border-gray-200 rounded">
                    <div className="font-serif text-3xl font-bold mb-2 text-black">Limited</div>
                    <p className="text-sm text-gray-600">Pieces Per Line</p>
                  </div>
                  
                  <div className="text-center p-6 border border-gray-200 rounded">
                    <div className="font-serif text-3xl font-bold mb-2 text-black">2-3</div>
                    <p className="text-sm text-gray-600">Weeks made-to-order</p>
                  </div>
                  
                  <div className="text-center p-6 border border-gray-200 rounded">
                    <div className="font-serif text-3xl font-bold mb-2 text-black">100%</div>
                    <p className="text-sm text-gray-600">Ethically sourced materials</p>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <a href="/manifesto" className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-300 rounded inline-block">
                    READ OUR MANIFESTO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <div id="manifesto" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
            Our Manifesto
          </h2>
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-lg leading-relaxed mb-6">
              In a world saturated with fast fashion and empty messaging, Scriptured stands as a beacon of purpose. 
              We believe that clothing should carry meaning, that style should serve a higher calling, 
              and that every purchase should contribute to something greater than ourselves.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our collections are born from scripture, philosophy, and timeless wisdom. Each piece tells a story, 
              carries a message, and supports causes that align with our values of honesty, integrity, 
              compassion, modesty, and creativity.
            </p>
            <p className="text-lg leading-relaxed">
              This is fashion for the faithful, streetwear for the soul-conscious, 
              and clothing for those who understand that true style transcends trends.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[{
            value: "Honesty",
            description: "Transparent in all our practices"
          }, {
            value: "Integrity",
            description: "Staying true to our principles"
          }, {
            value: "Compassion",
            description: "Supporting meaningful causes"
          }, {
            value: "Modesty",
            description: "Humble approach to fashion and life"
          }, {
            value: "Creativity",
            description: "Innovative designs with purpose"
          }].map((item, index) => <div key={index} className={`text-center ${index === 4 ? 'col-span-2 md:col-span-1 mx-auto max-w-xs' : ''}`}>
                <h3 className="font-serif text-2xl font-bold mb-4">{item.value}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div id="impact" className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
            Purpose-Driven Impact
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            Every purchase contributes to causes that matter. Our commitment to ethical 
            practices and meaningful partnerships creates positive change in communities worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl font-bold mb-2">Ethical</div>
              <div className="text-gray-300">Production Always</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Limited</div>
              <div className="text-gray-300">Edition Pieces</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Made</div>
              <div className="text-gray-300">To Order</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default About;