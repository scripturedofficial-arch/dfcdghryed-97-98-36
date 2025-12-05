import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCurrency } from "@/hooks/useCurrency";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { clearScrollPosition } = useScrollPosition();
  const addItem = useCartStore(state => state.addItem);
  
  const [product, setProduct] = useState<ShopifyProductNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Fetch product from Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        const productData = data?.data?.productByHandle;
        
        if (productData) {
          setProduct(productData);
          // Initialize selected options with first value of each option
          const initialOptions: Record<string, string> = {};
          productData.options?.forEach((option: { name: string; values: string[] }) => {
            if (option.values.length > 0) {
              initialOptions[option.name] = option.values[0];
            }
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  // Find matching variant based on selected options
  const findSelectedVariant = () => {
    if (!product) return null;
    
    return product.variants.edges.find(({ node: variant }) => {
      return variant.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      );
    })?.node;
  };

  const selectedVariant = findSelectedVariant();
  const currentPrice = selectedVariant?.price.amount || product?.priceRange.minVariantPrice.amount || "0";
  const currencyCode = selectedVariant?.price.currencyCode || product?.priceRange.minVariantPrice.currencyCode || "USD";
  const isAvailable = selectedVariant?.availableForSale ?? true;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast.error("Please select all options");
      return;
    }

    if (!isAvailable) {
      toast.error("This variant is out of stock");
      return;
    }

    const cartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions
    };

    addItem(cartItem);
    toast.success("Added to cart!", { position: "top-center" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const thumbnails = product.images.edges.map(edge => edge.node.url);
  const selectedImage = thumbnails[selectedImageIndex] || thumbnails[0];

  // Get size and color options
  const sizeOption = product.options.find(opt => opt.name.toLowerCase() === 'size');
  const colorOption = product.options.find(opt => opt.name.toLowerCase() === 'color');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back button */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-foreground hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="relative px-4 py-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Product Image */}
            <div className="space-y-0">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail Images - Desktop */}
              {thumbnails.length > 1 && (
                <div className="hidden md:flex gap-2 justify-center mt-4">
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        index === selectedImageIndex ? 'border-foreground' : 'border-border hover:border-foreground/50'
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Scroll Indicator - Mobile */}
              {thumbnails.length > 1 && (
                <div className="flex md:hidden justify-center mt-2">
                  <div className="flex gap-1 w-full px-4">
                    {thumbnails.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-0.5 rounded-full cursor-pointer transition-all duration-300 flex-1 ${
                          index === selectedImageIndex 
                            ? 'bg-foreground' 
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-3 md:space-y-5">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>
                
                {/* Made to Order Badge */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4 inline-flex items-center">
                  Made to order — ships in 2–3 weeks
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg md:text-xl font-bold text-foreground">
                    {currencyCode} {parseFloat(currentPrice).toFixed(2)}
                  </span>
                  {!isAvailable && (
                    <span className="text-sm text-destructive">Out of stock</span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {colorOption && colorOption.values.length > 0 && (
                <div className="space-y-3">
                  <span className="text-base text-foreground font-medium">
                    Colour: {selectedOptions['Color'] || colorOption.values[0]}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {colorOption.values.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, Color: color }))}
                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                          selectedOptions['Color'] === color
                            ? 'bg-foreground text-background border-foreground'
                            : 'border-border text-foreground hover:border-foreground/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {sizeOption && sizeOption.values.length > 0 && (
                <div className="space-y-3">
                  <span className="text-base text-foreground font-medium">
                    Size: {selectedOptions['Size'] || sizeOption.values[0]}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {sizeOption.values.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, Size: size }))}
                        className={`w-12 h-12 rounded-full border-2 text-sm font-medium transition-colors ${
                          selectedOptions['Size'] === size 
                            ? 'bg-foreground text-background border-foreground' 
                            : 'border-border text-foreground hover:border-foreground/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="space-y-3">
                <span className="text-base text-foreground font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="lg" 
                className="w-full bg-foreground text-background hover:bg-foreground/90 text-base md:text-lg font-medium mt-6"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                {isAvailable ? 'Add to cart' : 'Out of stock'}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-3 font-medium text-foreground border-b border-border"
            >
              PRODUCT DETAIL
            </TabsTrigger>
            <TabsTrigger 
              value="care" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-3 font-medium text-foreground border-b border-border"
            >
              MATERIALS AND CARE
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            {product.descriptionHtml ? (
              <div 
                className="text-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="text-foreground">{product.description || 'No description available.'}</p>
            )}
          </TabsContent>
          <TabsContent value="care" className="mt-6">
            <p className="text-foreground">Materials and care information goes here...</p>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
