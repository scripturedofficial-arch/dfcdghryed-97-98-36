import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

const The12Products = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Matthew Foundation Tee",
      quote: "You are the rock on which I will build my church...",
      verse: "Matthew 16:18",
      price: 165,
      originalPrice: 185,
      edition: "001 of 12",
      image: "/api/placeholder/400/500",
      impact: "Church Building",
      story: "Foundation of faith and leadership in divine calling",
      isOnSale: true,
      rating: 4.9,
      reviewCount: 89,
      sold: 8
    },
    {
      id: 2,
      name: "John Beloved Hoodie",
      quote: "Beloved, let us love one another...",
      verse: "1 John 4:7",
      price: 210,
      originalPrice: 240,
      edition: "002 of 12",
      image: "/api/placeholder/400/500",
      impact: "Love Outreach",
      story: "Embodies divine love and intimate relationship with Christ",
      isOnSale: true,
      rating: 4.8,
      reviewCount: 156,
      sold: 11
    },
    {
      id: 3,
      name: "Philippians Strength Long Sleeve",
      quote: "I can do all things through Christ...",
      verse: "Philippians 4:13",
      price: 165,
      originalPrice: 185,
      edition: "003 of 12",
      image: "/api/placeholder/400/500",
      impact: "Mission Work",
      story: "Celebrates transformation and divine empowerment",
      isOnSale: true,
      rating: 4.7,
      reviewCount: 234,
      sold: 7
    },
    {
      id: 4,
      name: "James Works Tee",
      quote: "Faith without works is dead...",
      verse: "James 2:26",
      price: 165,
      originalPrice: 185,
      edition: "004 of 12",
      image: "/api/placeholder/400/500",
      impact: "Action Ministry",
      story: "Represents active faith and servant leadership",
      isOnSale: true,
      rating: 4.6,
      reviewCount: 178,
      sold: 5
    }
  ];

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

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">The Twelve Collection</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Limited edition pieces inspired by the twelve apostles. Each design celebrates their unique calling and divine purpose.
          Only 12 pieces per design.
        </p>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Left Navigation Button */}
        <button 
          onClick={prevSlide} 
          className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" 
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Navigation Button */}
        <button 
          onClick={nextSlide} 
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" 
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out px-12" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map(product => (
                    <div 
                      key={product.id} 
                      className="group relative bg-white rounded-lg overflow-hidden"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        {product.isOnSale && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold z-10">
                            SALE
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-gold text-white px-2 py-1 text-xs font-bold z-10">
                          LIMITED
                        </div>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        
                        {/* Hover Actions */}
                        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 space-y-3">
                        <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{product.name}</h3>
                        
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {(() => {
                              const sold = product.sold;
                              const total = 12;
                              const remaining = total - sold;
                              if (remaining <= 2) {
                                return `Only ${remaining} left - almost sold out!`;
                              } else if (remaining <= 5) {
                                return `${remaining} remaining - selling fast!`;
                              } else {
                                return `${sold} of ${total} sold`;
                              }
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <button 
          onClick={() => navigate('/the-12')}
          className="border-2 border-primary text-primary px-8 py-4 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          VIEW FULL COLLECTION
        </button>
      </div>
    </div>
  );
};

export default The12Products;