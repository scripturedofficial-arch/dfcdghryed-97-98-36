import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface QuoteType {
  text: string;
  attribution: string;
  collection: string;
}

interface HeroProps {
  scrollY: number;
  activeButton: "36Five" | "The12";
  setActiveButton: (button: "36Five" | "The12") => void;
  currentQuote: number;
  setCurrentQuote: (quote: number) => void;
}

const Hero = ({
  scrollY,
  currentQuote,
  setCurrentQuote
}: HeroProps) => {

  const quotes: QuoteType[] = [
    {
      text: "We don't make clothes. We write them.",
      attribution: "SCRIPTURED",
      collection: ""
    },
    {
      text: "365 days. Every one written. Which page are you on?",
      attribution: "36FIVE",
      collection: "The philosophical line"
    },
    {
      text: "Every garment is a verse. Every collection, a chapter.",
      attribution: "SCRIPTURED",
      collection: ""
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((currentQuote + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length, currentQuote, setCurrentQuote]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Subtle dark overlay — no stock images */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Rotating quote */}
        <div className="fade-in-scroll">
          <blockquote
            className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-6 transition-all duration-1000 ease-in-out"
            style={{ letterSpacing: '0.02em' }}
          >
            {quotes[currentQuote].text}
          </blockquote>
          <div className="w-12 h-px bg-[#C8A96E] mx-auto mb-6" />
          <cite className="text-sm tracking-[0.2em] uppercase text-[#C8A96E] not-italic font-medium">
            {quotes[currentQuote].attribution}
          </cite>
          {quotes[currentQuote].collection && (
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mt-2">
              {quotes[currentQuote].collection}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 fade-in-scroll">
          <a
            href="/36five"
            className="inline-block border border-white/30 text-white text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Enter 36Five
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-white/30" />
      </div>

      {/* Quote Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentQuote ? 'bg-[#C8A96E]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
