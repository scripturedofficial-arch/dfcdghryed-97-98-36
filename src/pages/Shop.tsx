import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductDetailModal from "@/components/ProductDetailModal";
import { ShoppingBag, Clock, Heart, Star, ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
const Shop = () => {
  const navigate = useNavigate();
  const {
    formatPrice
  } = useCurrency();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogueIndex, setCatalogueIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const catalogueNames = ["New Arrivals", "Genesis", "Stoic", "Renaissance", "Modern", "Classic"];
  const products = [{
    id: 1,
    name: "Genesis Oversized Tee",
    quote: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    verse: "John 1:1",
    price: 85,
    originalPrice: 95,
    edition: "003 of 100",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.5,
    reviewCount: 147
  }, {
    id: 2,
    name: "Faith Heavyweight Hoodie",
    quote: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    verse: "Hebrews 11:1",
    price: 120,
    originalPrice: 140,
    edition: "017 of 75",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.8,
    reviewCount: 203
  }, {
    id: 3,
    name: "Wisdom Long Sleeve",
    quote: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",
    verse: "Proverbs 9:10",
    price: 95,
    originalPrice: 110,
    edition: "009 of 50",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.6,
    reviewCount: 89
  }, {
    id: 4,
    name: "Hope Classic Tee",
    quote: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
    verse: "Jeremiah 29:11",
    price: 75,
    originalPrice: 85,
    edition: "025 of 60",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.7,
    reviewCount: 156
  }, {
    id: 5,
    name: "Peace Crewneck",
    quote: "Peace I leave with you; my peace I give you.",
    verse: "John 14:27",
    price: 105,
    originalPrice: 125,
    edition: "012 of 80",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.4,
    reviewCount: 92
  }, {
    id: 6,
    name: "Love Premium Hoodie",
    quote: "Love is patient, love is kind. It does not envy, it does not boast.",
    verse: "1 Corinthians 13:4",
    price: 135,
    originalPrice: 155,
    edition: "031 of 90",
    image: "/placeholder.svg",
    isOnSale: true,
    rating: 4.9,
    reviewCount: 245
  }];
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const handlePrevCatalogue = () => {
    setSlideDirection('left');
    setCatalogueIndex(prev => (prev - 1 + catalogueNames.length) % catalogueNames.length);
  };
  const handleNextCatalogue = () => {
    setSlideDirection('right');
    setCatalogueIndex(prev => (prev + 1) % catalogueNames.length);
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
  return <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">36Five</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">(Divine by Design)</p>
          </div>
          
        </div>
      </div>

      {/* Dynamic Catalogue Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm py-3 sm:py-4 border-b border-gray-200 mb-6" onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
        <div className="text-center">
          <div className="flex items-center justify-between max-w-[696px] mx-auto">
            <div className={`opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ${isHeaderHovered ? 'sm:opacity-100' : ''} transition-opacity duration-200`}>
              <button onClick={handlePrevCatalogue} className="ml-[10px] p-1.5 sm:p-2 hover:bg-accent rounded-full transition-all duration-200 flex-shrink-0" aria-label="Previous catalogue">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="flex-1 text-center px-[4px]">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                <span key={catalogueIndex} className={`inline-block ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
                  {catalogueNames[catalogueIndex]}
                </span>
                {catalogueNames[catalogueIndex] !== "New Arrivals" && <span className="ml-1 sm:ml-2">Collection</span>}
              </h2>
            </div>
            <div className={`opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ${isHeaderHovered ? 'sm:opacity-100' : ''} transition-opacity duration-200`}>
              <button onClick={handleNextCatalogue} className="mr-[10px] p-1.5 sm:p-2 hover:bg-accent rounded-full transition-all duration-200 flex-shrink-0" aria-label="Next catalogue">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="px-0 sm:px-[6px] lg:px-[14px] pb-8">
        <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-1 px-[11px]">
            {products.slice(0, 4).map(product => <div key={product.id} className="h-full group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" onClick={() => handleProductClick(product)} onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                {/* Product Card */}
                <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Hover Overlay */}
                    {hoveredProduct === product.id && <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300">
                        <button onClick={e => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg" aria-label="View product">
                          <Eye className="w-5 h-5 text-black" />
                        </button>
                      </div>}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 space-y-3 mt-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
                      <h3 className="font-bold text-base text-black tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full self-start sm:self-auto">Made to order</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="font-bold text-lg text-black">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {product.edition.replace(' of ', '/')}
                        </span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button onClick={e => {
                    e.stopPropagation();
                    // Add cart functionality here
                  }} className="bg-black text-white w-10 h-10 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105" aria-label="Add to cart">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-1 px-[11px]">
            {products.slice(2, 6).map(product => <div key={product.id} className="h-full group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" onClick={() => handleProductClick(product)} onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                {/* Product Card */}
                <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Hover Overlay */}
                    {hoveredProduct === product.id && <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300">
                        <button onClick={e => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg" aria-label="View product">
                          <Eye className="w-5 h-5 text-black" />
                        </button>
                      </div>}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 space-y-3 mt-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
                      <h3 className="font-bold text-base text-black tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full self-start sm:self-auto">Made to order</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="font-bold text-lg text-black">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {product.edition.replace(' of ', '/')}
                        </span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button onClick={e => {
                    e.stopPropagation();
                    // Add cart functionality here
                  }} className="bg-black text-white w-10 h-10 rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105" aria-label="Add to cart">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Collection Statement */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">The 36Five Story</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our debut collection marks the beginning of faith, wisdom, and purpose - timeless truths reimagined through contemporary design.
          </p>
        </div>
      </div>

      <Footer />
      
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </div>;
};
export default Shop;