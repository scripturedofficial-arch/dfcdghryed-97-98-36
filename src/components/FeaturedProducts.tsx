import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, Heart, Star, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import The12Products from "@/components/The12Products";
import ProductDetailModal from "@/components/ProductDetailModal";
import { useCurrency } from "@/hooks/useCurrency";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { products } from "@/data/products";
interface FeaturedProductsProps {
  activeButton: "36Five" | "The12";
  setActiveButton: (button: "36Five" | "The12") => void;
  currentQuote?: number;
}
const FeaturedProducts = ({
  activeButton,
  setActiveButton,
  currentQuote = 0
}: FeaturedProductsProps) => {
  const navigate = useNavigate();
  const {
    formatPrice
  } = useCurrency();
  const {
    saveScrollPosition
  } = useScrollPosition();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogueIndex, setCatalogueIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  // Mobile header hide/show state
  const isMobile = useIsMobile();
  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const catalogueNames = ["Genesis", "Stoic", "Renaissance", "Modern", "Classic"];

  // Mobile scroll behavior to detect when main header is hidden
  useEffect(() => {
    if (!isMobile) {
      setIsMainHeaderVisible(true);
      return;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          // Only react to significant scroll movements
          if (scrollDifference > 10) {
            const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';

            // Show header when at top of page or scrolling up
            if (currentScrollY < 100 || newDirection === 'up') {
              setIsMainHeaderVisible(true);
            } else if (newDirection === 'down') {
              setIsMainHeaderVisible(false);
            }
            setLastScrollY(currentScrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);
  const handlePrevCatalogue = () => {
    setSlideDirection('left');
    setCatalogueIndex(prev => (prev - 1 + catalogueNames.length) % catalogueNames.length);
  };
  const handleNextCatalogue = () => {
    setSlideDirection('right');
    setCatalogueIndex(prev => (prev + 1) % catalogueNames.length);
  };
  // Import products from shared data source
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };
  const handle36FiveClick = () => {
    setActiveButton("36Five");
  };
  const handleThe12Click = () => {
    setActiveButton("The12");
  };
  const handleProductClick = (product: typeof products[0]) => {
    // Save scroll position before navigating
    saveScrollPosition();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  return <>
      {/* CTA Buttons */}
      <div className="flex flex-row gap-4 justify-center items-center bg-background pt-0 md:pt-8 pb-8 transition-all duration-300 safe-area-spacing">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
        <button onClick={handle36FiveClick} className={`relative z-10 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-lg safe-touch-target ${activeButton === "36Five" ? "bg-black text-white hover:bg-gray-800" : "border-2 border-black text-black bg-white hover:bg-black hover:text-white"}`}>
          36Five
        </button>
        <button onClick={handleThe12Click} className={`relative z-10 px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-lg safe-touch-target ${activeButton === "The12" ? "bg-black text-white hover:bg-gray-800" : "border-2 border-black text-black bg-white hover:bg-black hover:text-white"}`}>
          The 12
        </button>
      </div>

      <section className={`pt-8 pb-20 bg-background transition-all duration-300 safe-area-bottom ${isMobile && !isMainHeaderVisible ? 'pt-16' : ''}`}>
        <div className="max-w-7xl mx-auto px-0">
          {activeButton === "36Five" ? <div>
              <h2 className="text-4xl font-bold text-center text-black tracking-tight">New Arrivals</h2>
              {/* Section Header */}
              <div className="text-center mb-16">
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
                  Each piece is <Link to="/made-to-order" className="text-primary hover:underline">made-to-order</Link>.
                </p>
              </div>

              {/* Best Sellers Carousel */}
              <div className="relative">
                {/* Left Navigation Button */}
                <button onClick={prevSlide} className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" disabled={currentSlide === 0}>
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Button */}
                <button onClick={nextSlide} className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" disabled={currentSlide === totalSlides - 1}>
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out md:px-12" style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}>
                    {Array.from({
                  length: totalSlides
                }).map((_, slideIndex) => <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-1 px-[11px]">
                          {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map(product => <div key={product.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg cursor-pointer w-full flex flex-col transition-all duration-300 overflow-hidden" onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)} onClick={() => handleProductClick(product)}>
                                {/* Product Image */}
                                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>

                                {/* Product Info */}
                                <div className="p-4 space-y-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-base text-black tracking-tight leading-tight truncate">{product.name}</h3>
                                    <span className="shrink-0 whitespace-nowrap text-[10px] px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 bg-gray-100 text-gray-600 rounded-full">Made to order</span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col space-y-1">
                                      <span className="font-bold text-lg text-black">{formatPrice(product.price)}</span>
                                      <span className="text-xs text-gray-500 font-medium">025/365</span>
                                    </div>
                                    <button className="bg-black text-white w-10 h-10 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
                                      <ShoppingCart className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>)}
                        </div>
                      </div>)}
                  </div>
                </div>
                {/* Carousel Indicators */}
                {totalSlides > 1 && <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({
                length: totalSlides
              }).map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-300'}`} />)}
                  </div>}
              </div>

              {/* View All Button */}
              <div className="text-center mt-16">
                <button onClick={() => navigate('/shop')} className="border-2 border-primary text-primary px-8 py-4 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  VIEW FULL COLLECTION
                </button>
              </div>
            </div> : <The12Products />}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </>;
};
export default FeaturedProducts;