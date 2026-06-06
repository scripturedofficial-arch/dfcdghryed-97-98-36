
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeButton] = useState<"36Five" | "The12">("36Five");
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observeElements = () => {
      const elements = document.querySelectorAll('.fade-in-scroll');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    const cleanup = observeElements();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Scriptured — Divine by Design"
        description="Scripture-inspired streetwear where ancient wisdom meets modern design. Limited drops with 70% of profits donated."
        path="/"
      />
      <Navigation />
      <Hero scrollY={scrollY} activeButton={activeButton} setActiveButton={() => {}} currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
      <FeaturedProducts activeButton={activeButton} setActiveButton={() => {}} currentQuote={currentQuote} />
      <Mission />
      <Footer />
    </div>
  );
};

export default Index;
