import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { clearScrollPosition } = useScrollPosition();
  const addItem = useCartStore((state) => state.addItem);
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      setIsLoading(true);
      try {
        const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (response?.data?.productByHandle) {
          const shopifyProduct: ShopifyProduct = { node: response.data.productByHandle };
          setProduct(shopifyProduct);
          
          // Initialize selected options with first available values
          const initialOptions: Record<string, string> = {};
          response.data.productByHandle.options?.forEach((option: { name: string; values: string[] }) => {
            if (option.values.length > 0) {
              initialOptions[option.name] = option.values[0];
            }
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const getSelectedVariant = () => {
    if (!product?.node.variants?.edges) return null;
    
    return product.node.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      );
    })?.node;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const selectedVariant = getSelectedVariant();
    if (!selectedVariant) {
      toast.error("Please select all options");
      return;
    }

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
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

  const images = product.node.images?.edges || [];
  const selectedImage = images[selectedImageIndex]?.node.url || "/placeholder.svg";
  const selectedVariant = getSelectedVariant();
  const price = selectedVariant?.price || product.node.priceRange?.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back button */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-8"
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
                  alt={product.node.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail Images - Desktop */}
              {images.length > 1 && (
                <div className="hidden md:flex gap-2 justify-center mt-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        index === selectedImageIndex ? 'border-foreground' : 'border-border hover:border-foreground/50'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Scroll Indicator - Mobile */}
              {images.length > 1 && (
                <div className="flex md:hidden justify-center mt-2">
                  <div className="flex gap-1 w-full px-4">
                    {images.map((_, index) => (
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
                  {product.node.title}
                </h1>
                
                {/* Made to Order Badge */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4 inline-flex items-center">
                  Made to order — ships in 2–3 weeks
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg md:text-xl font-bold text-foreground">
                    {price?.currencyCode} {parseFloat(price?.amount || "0").toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Dynamic Options */}
              {product.node.options?.map((option) => (
                <div key={option.name} className="space-y-3">
                  <span className="text-base text-foreground font-medium">
                    {option.name}: {selectedOptions[option.name]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                          selectedOptions[option.name] === value
                            ? 'bg-foreground text-background border-foreground' 
                            : 'border-border text-foreground hover:border-foreground/50'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

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
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? 'Add to cart' : 'Out of stock'}
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
            <p className="text-foreground">{product.node.description || "Product details coming soon..."}</p>
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
