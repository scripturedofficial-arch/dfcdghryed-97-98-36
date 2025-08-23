import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import heroInnovation from "../assets/hero-innovation.jpg";
import heroCourage from "../assets/hero-courage.jpg";
import heroDreams from "../assets/hero-dreams.jpg";
import heroGenesis from "../assets/hero-genesis.jpg";
import heroFaith from "../assets/hero-faith.jpg";
import heroWisdom from "../assets/hero-wisdom.jpg";
interface QuoteType {
  text: string;
  verse: string;
  collection: string;
  background?: string;
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
  activeButton,
  setActiveButton,
  currentQuote,
  setCurrentQuote
}: HeroProps) => {
  
  const [heroText, setHeroText] = useState({
    title: "The 12",
    subtitle: "Divine by Design"
  });
  const quotes36Five: QuoteType[] = [{
    text: "The only way to do great work is to love what you do.",
    verse: "Steve Jobs",
    collection: "Innovation Collection",
    background: "/lovable-uploads/a087188b-d908-4335-8896-90acc637b974.png"
  }, {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    verse: "Winston Churchill",
    collection: "Courage Series",
    background: heroCourage
  }, {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    verse: "Eleanor Roosevelt",
    collection: "Dreams Line",
    background: heroDreams
  }];
  const quotesThe12: QuoteType[] = [{
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    verse: "John 1:1",
    collection: "Genesis Collection",
    background: heroGenesis
  }, {
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    verse: "Hebrews 11:1",
    collection: "Faith Series",
    background: heroFaith
  }, {
    text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",
    verse: "Proverbs 9:10",
    collection: "Wisdom Line",
    background: heroWisdom
  }];
  const quotes = activeButton === "36Five" ? quotes36Five : quotesThe12;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((currentQuote + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length, currentQuote, setCurrentQuote]);

  // Reset to first quote when switching between collections
  useEffect(() => {
    setCurrentQuote(0);
  }, [activeButton, setCurrentQuote]);
  const handle36FiveClick = () => {
    setActiveButton("36Five");
    setHeroText({
      title: "36Five",
      subtitle: "Divine by Design"
    });
  };
  const handleThe12Click = () => {
    setActiveButton("The12");
    setHeroText({
      title: "The 12",
      subtitle: "Godly"
    });
  };
  return <section className="relative min-h-screen flex flex-col justify-start items-center overflow-hidden pt-20">
      {/* Parallax Background */}
      <div 
        className="absolute inset-x-0 top-[-50px] bottom-[-70px] parallax hero-background transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: quotes[currentQuote].background 
            ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${quotes[currentQuote].background})`
            : 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--accent) / 0.1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-0 text-center">
        {/* Brand Header */}
        <div className="fade-in-scroll">
          <h1 className={`font-serif text-6xl md:text-8xl font-bold mb-4 glitch-hover m-[60px] my-[20px] ${
            quotes[currentQuote].background ? 'text-white' : ''
          }`}>
            {activeButton === "36Five" ? "36Five" : "The 12"}
          </h1>
          <p className={`text-xl md:text-2xl font-light tracking-wide ${
            quotes[currentQuote].background ? 'text-white' : ''
          }`}>
            "{activeButton === "36Five" ? "Divine by Design" : "Godly"}"
          </p>
        </div>

        {/* Rotating Scripture */}
        <div className="min-h-[200px] flex flex-col justify-center fade-in-scroll -mb-8">
          <blockquote className={`scripture-text max-w-4xl mx-auto transition-all duration-1000 ease-in-out -mt-5 ${
            quotes[currentQuote].background ? 'text-white' : ''
          }`}>
            "{quotes[currentQuote].text}"
          </blockquote>
          <cite className={`text-lg font-medium ${
            quotes[currentQuote].background ? 'text-white' : ''
          }`}>
            — {quotes[currentQuote].verse}
          </cite>
          <p className="text-sm mt-2 text-white">
            From the {quotes[currentQuote].collection}
          </p>
        </div>

        {/* Motto */}
        <div className="text-center fade-in-scroll">
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-[117px] left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400 translate-x-[-11px]" />
      </div>

      {/* Quote Indicators */}
      <div className="absolute bottom-[175px] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {quotes.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentQuote(index)} 
            disabled={false}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${index === currentQuote ? 'bg-black' : 'bg-gray-300'}`} 
          />
        ))}
      </div>
    </section>;
};
export default Hero;