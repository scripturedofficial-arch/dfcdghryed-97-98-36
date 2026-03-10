import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Package, Loader2 } from "lucide-react";
import The12Products from "@/components/The12Products";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

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
  const { saveScrollPosition } = useScrollPosition();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useIsMobile();
  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
          if (scrollDifference > 10) {
            if (currentScrollY < 100 || currentScrollY < lastScrollY) {
              setIsMainHeaderVisible(true);
            } else {
              setIsMainHeaderVisible(false);
            }
            setLastScrollY(currentScrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("This product has no available variants");
      return;
    }
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    toast.success("Added to cart!", { position: "top-center" });
  };

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);

  const handle36FiveClick = () => setActiveButton("36Five");
  const handleThe12Click = () => setActiveButton("The12");

  return (
    <>
      {/* CTA Buttons */}
      <div className="flex flex-row gap-4 justify-center items-center bg-background py-6 transition-all duration-300">
        <button onClick={handle36FiveClick} className={`px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-lg safe-touch-target ${activeButton === "36Five" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground"}`}>
          36Five
        </button>
        <button onClick={handleThe12Click} className={`px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 rounded-lg safe-touch-target ${activeButton === "The12" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground"}`}>
          The 12
        </button>
      </div>

      <section className="pb-16 bg-background transition-all duration-300 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-0">
          {activeButton === "36Five" ? (
            <div>
              <h2 className="text-4xl font-bold text-center text-foreground tracking-tight mb-2">New Arrivals</h2>
              <p className="text-lg text-muted-foreground text-center mb-10">
                Each piece is <Link to="/made-to-order" className="text-primary hover:underline">made-to-order</Link>.
              </p>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">No products found</h3>
                  <p className="text-muted-foreground">Products will appear here once they're added to the store.</p>
                </div>
              ) : (
                <div className="relative">
                  <button onClick={prevSlide} className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-background rounded-full shadow-lg hover:bg-muted transition-colors" disabled={currentSlide === 0}>
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button onClick={nextSlide} className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-background rounded-full shadow-lg hover:bg-muted transition-colors" disabled={currentSlide === totalSlides - 1}>
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>

                  <div className="overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out md:px-12" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-1 px-[11px]">
                            {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map(product => (
                              <div
                                key={product.node.id}
                                className="group relative bg-card rounded-xl shadow-sm hover:shadow-lg cursor-pointer w-full flex flex-col transition-all duration-300 overflow-hidden"
                                onMouseEnter={() => setHoveredProduct(product.node.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                onClick={() => {
                                  saveScrollPosition();
                                  navigate(`/product/${product.node.handle}`);
                                }}
                              >
                                <div className="relative aspect-square bg-muted overflow-hidden">
                                  {product.node.images.edges[0] ? (
                                    <img
                                      src={product.node.images.edges[0].node.url}
                                      alt={product.node.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Package className="w-16 h-16 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>

                                <div className="p-4 space-y-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-base text-foreground tracking-tight leading-tight truncate">{product.node.title}</h3>
                                    <span className="shrink-0 whitespace-nowrap text-[10px] px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 bg-muted text-muted-foreground rounded-full">Made to order</span>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col space-y-1">
                                      <span className="font-bold text-lg text-foreground">
                                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                                      </span>
                                    </div>
                                    <button
                                      className="bg-foreground text-background w-10 h-10 rounded-full hover:bg-foreground/80 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105"
                                      onClick={(e) => handleAddToCart(product, e)}
                                      disabled={isCartLoading}
                                    >
                                      <ShoppingCart className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {totalSlides > 1 && (
                    <div className="flex justify-center space-x-2 mt-6">
                      {Array.from({ length: totalSlides }).map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-foreground' : 'bg-muted-foreground/30'}`} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="text-center mt-10">
                <button onClick={() => { window.scrollTo(0, 0); navigate('/shop'); }} className="border-2 border-primary text-primary px-8 py-3 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  VIEW FULL COLLECTION
                </button>
              </div>
            </div>
          ) : (
            <The12Products />
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
