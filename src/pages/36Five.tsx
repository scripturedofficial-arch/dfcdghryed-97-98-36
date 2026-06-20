import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const ThirtySixFive = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeButton, setActiveButton] = useState<"36Five" | "The12">("36Five");
  const [currentQuote, setCurrentQuote] = useState(0);
  const { restoreScrollPosition } = useScrollPosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position when returning from product detail
  useEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

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
        title="36Five — The Philosophical Line | Scriptured"
        description="365 days. Every one written. Which page are you on? Explore 36Five — the philosophical line by Scriptured."
        path="/36five"
      />
      <Navigation />
      <Hero scrollY={scrollY} activeButton={activeButton} setActiveButton={setActiveButton} currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
      <FeaturedProducts activeButton={activeButton} setActiveButton={setActiveButton} currentQuote={currentQuote} />
      <Mission />
      <Footer />
    </div>
  );
};

export default ThirtySixFive;