import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Package, Loader2, ShoppingCart } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const The12Products = () => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Fetch products tagged or titled for "The 12" collection
        // Adjust the query filter as needed based on how products are tagged in Shopify
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12, query: "tag:the-12" });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Error fetching The 12 products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
  const totalSlides = Math.max(1, Math.ceil(products.length / itemsPerSlide));

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);

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

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-foreground">No products found</h3>
          <p className="text-muted-foreground">The Twelve Collection products will appear here once they're added to the store.</p>
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
            <div className="flex transition-transform duration-300 ease-in-out px-12" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map(product => (
                      <div
                        key={product.node.id}
                        className="group relative bg-card rounded-lg overflow-hidden cursor-pointer"
                        onMouseEnter={() => setHoveredProduct(product.node.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        onClick={() => navigate(`/product/${product.node.handle}`)}
                      >
                        <div className="relative aspect-square bg-muted overflow-hidden">
                          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold z-10">
                            LIMITED
                          </div>
                          {product.node.images.edges[0] ? (
                            <img
                              src={product.node.images.edges[0].node.url}
                              alt={product.node.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-16 h-16 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="p-6 space-y-3">
                          <h3 className="font-medium text-sm text-foreground line-clamp-2">{product.node.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-foreground">
                              {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                              {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                            </span>
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
