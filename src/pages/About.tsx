import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

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
      <SEO
        title="About — Scriptured Clothing"
        description="Some brands are built. Scriptured was written. A luxury clothing brand rooted in culture, legacy, and the sacred."
        path="/about"
      />
      <Navigation />

      {/* Origin Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-8 font-medium">
            THE ORIGIN
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Some brands are built.
          </h1>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-12 text-[#C8A96E] leading-tight">
            Scriptured was written.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Not designed in a boardroom. Not assembled from trend reports. Scriptured was conceived in the space between meaning and material — the idea that what you wear should say something that matters.
          </p>
        </div>
      </section>

      {/* The Name Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-8 font-medium text-center">
            THE NAME
          </p>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Scriptured. Not 'Scripted' — which implies a performance. Not 'Scripture' alone — which belongs to something older. Scriptured is its own word. A garment that has been written. A person who carries meaning. A brand that was authored, not assembled.
            </p>
            <p>
              The heavy serif wordmark reinforces this. It looks like a masthead from an ancient text — a volume that will outlast the moment it was made.
            </p>
            <p className="font-serif text-2xl text-black font-bold text-center pt-6">
              We are not for everyone. We are for those who feel the weight of that.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-4 font-medium text-center">
            WHAT WE STAND ON
          </p>
          <h2 className="font-serif text-4xl font-bold text-center mb-16 text-black">
            The brand pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-black">Intentionality</h3>
              <p className="text-gray-600 leading-relaxed">Nothing we make is accidental. Every graphic, every colourway, every edition number carries a reason. We ask: what does this piece mean? If we can't answer, it doesn't get made.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-black">Scarcity with substance</h3>
              <p className="text-gray-600 leading-relaxed">We are exclusive — but not arbitrarily. Our scarcity is earned through quality, craft, and meaning. Numbers mean something here. Every edition is chosen for a reason.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-black">Cultural permanence</h3>
              <p className="text-gray-600 leading-relaxed">Trends die. Scriptures don't. We build for permanence. A Scriptured piece should feel as relevant in ten years as it does the day it arrives. We reference culture, but we don't chase it.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-black">The spectrum of access</h3>
              <p className="text-gray-600 leading-relaxed">We believe luxury should have layers. 36Five opens the door. The 12 is for those who are chosen. This is not elitism — it is architecture. Every great brand has an inner room.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-serif text-3xl md:text-5xl font-bold mb-10 leading-tight">
            We don't make clothes.<br />We write them.
          </p>
          <a
            href="/36five"
            className="inline-block border border-white/30 text-white text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Enter 36Five
          </a>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;
