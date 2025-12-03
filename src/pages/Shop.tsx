import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ShoppingCart, Package } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("This product has no available variants");
      return;
    }

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/10 mt-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">36Five</h1>
          <p className="text-xl text-muted-foreground">Explore Our Collection</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Products</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Products will appear here once they're added to your store
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.node.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.node.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-secondary/20 rounded-lg">
                  {product.node.images.edges[0] ? (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">{product.node.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.node.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                      {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`transition-opacity duration-300 ${
                        hoveredProduct === product.node.id ? "opacity-100" : "opacity-0"
                      }`}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each piece in our collection represents more than just apparel—it's a statement of faith, 
            purpose, and timeless values. Crafted with intention and designed for those who seek meaning 
            in every moment of their journey.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
