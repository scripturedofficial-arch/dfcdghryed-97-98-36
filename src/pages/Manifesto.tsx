import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Our Manifesto
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Fashion for the faithful, streetwear for the soul-conscious
          </p>
        </div>
      </section>

      {/* Main Manifesto Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-8">
                In a World of Empty Messaging
              </h2>
              <p className="text-xl leading-relaxed mb-8">
                In a world saturated with fast fashion and empty messaging, Scriptured stands as a beacon of purpose. 
                We believe that clothing should carry meaning, that style should serve a higher calling, 
                and that every purchase should contribute to something greater than ourselves.
              </p>
            </div>

            <aside className="my-12">
              <blockquote className="border-l-4 border-gray-200 pl-6 italic text-xl text-gray-700">
                <p className="mb-3">"We are not bound by time."</p>
                <p className="mb-3">We wear the questions of the past to answer the challenges of the present.</p>
                <p>This is more than fabric – it’s thought, stitched into form.</p>
              </blockquote>
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Foundation</h3>
                <p className="text-lg leading-relaxed">
                  Our collections are born from scripture, philosophy, and timeless wisdom. Each piece tells a story, 
                  carries a message, and supports causes that align with our values of honesty, integrity, 
                  compassion, modesty, and creativity.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Promise</h3>
                <p className="text-lg leading-relaxed">
                  This is fashion for the faithful, streetwear for the soul-conscious, 
                  and clothing for those who understand that true style transcends trends.
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-gray-50 p-12 rounded-lg mb-16">
              <h3 className="font-serif text-3xl font-bold text-center mb-8">Our Vision</h3>
              <p className="text-lg leading-relaxed text-center mb-6">
                We envision a world where fashion serves a purpose beyond aesthetics, where every garment 
                is a conversation starter, a source of inspiration, and a force for positive change.
              </p>
              <p className="text-lg leading-relaxed text-center">
                Through thoughtful design, ethical production, and meaningful partnerships, 
                we're building a community of conscious consumers who understand that what we wear 
                reflects who we are and what we stand for.
              </p>
            </div>

            {/* Values Integration */}
            <div className="mb-16">
              <h3 className="font-serif text-3xl font-bold text-center mb-12">Living Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    value: "Honesty",
                    description: "Every thread tells the truth about its origin, every process is transparent, every promise is kept."
                  },
                  {
                    value: "Integrity", 
                    description: "We do what's right, even when no one is watching. Our principles guide every decision."
                  },
                  {
                    value: "Compassion",
                    description: "Every purchase contributes to causes that matter, supporting communities and creating positive change."
                  },
                  {
                    value: "Modesty",
                    description: "We believe in the power of understated elegance and humble confidence."
                  },
                  {
                    value: "Creativity",
                    description: "Innovation with intention—designing pieces that inspire both the wearer and the world."
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-serif text-xl font-bold mb-3">{item.value}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black text-white p-12 rounded-lg">
              <h3 className="font-serif text-3xl font-bold mb-6">Join the Movement</h3>
              <p className="text-lg mb-8">
                Ready to wear your values? Explore our collections and become part of a community 
                that believes fashion can change the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/shop" 
                  className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-300 rounded"
                >
                  EXPLORE COLLECTIONS
                </Link>
                <Link 
                  to="/about" 
                  className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors duration-300 rounded"
                >
                  LEARN OUR STORY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifesto;