import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Manifesto — Scriptured Clothing"
        description="Some brands are built. Scriptured was written. The Scriptured manifesto — on culture, legacy, and the sacred."
        path="/manifesto"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Our Manifesto
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Some brands are built. Scriptured was written.
          </p>
        </div>
      </section>

      {/* Main Manifesto Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Opening */}
          <div className="text-center mb-20">
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Not designed in a boardroom. Not assembled from trend reports. Scriptured was conceived in the space between meaning and material — the idea that what you wear should say something that matters. That clothing, at its highest form, is a kind of scripture. A text. A declaration.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We exist at the intersection of the streets and the eternal — where the everyday becomes the meaningful, where what you put on your body becomes a statement about who you are and what you believe.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-16 mb-20">
            <div className="border-t border-gray-200 pt-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-4 font-medium">01</p>
              <h3 className="font-serif text-3xl font-bold mb-6">Intentionality</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Nothing we make is accidental. Every graphic, every colourway, every edition number carries a reason. We ask: what does this piece mean? If we can't answer, it doesn't get made.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-4 font-medium">02</p>
              <h3 className="font-serif text-3xl font-bold mb-6">Scarcity with substance</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                We are exclusive — but not arbitrarily. Our scarcity is earned through quality, craft, and meaning. The 12 Collection Box exists in editions of twelve because twelve is sacred. 36Five exists because 365 is the number of days in a year — a full cycle of life. Numbers mean something here.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-4 font-medium">03</p>
              <h3 className="font-serif text-3xl font-bold mb-6">Cultural permanence</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Trends die. Scriptures don't. We build for permanence. A Scriptured piece should feel as relevant in ten years as it does the day it arrives. We reference culture, but we don't chase it.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-4 font-medium">04</p>
              <h3 className="font-serif text-3xl font-bold mb-6">The spectrum of access</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                We believe luxury should have layers. 36Five opens the door. The 12 is for those who are chosen. This is not elitism — it is architecture. Every great brand has an inner room.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center bg-black text-white p-16">
            <p className="font-serif text-4xl font-bold mb-8 leading-tight">
              We don't make clothes.<br />We write them.
            </p>
            <a
              href="/36five"
              className="inline-block border border-white/30 text-white text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300 font-medium"
            >
              Enter 36Five
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifesto;
