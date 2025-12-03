import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCurrency } from "@/hooks/useCurrency";
import ShoppingCart from "@/components/ShoppingCart";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getProductById, type Product } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { clearScrollPosition } = useScrollPosition();
  const [selectedColor, setSelectedColor] = useState("Black Yellow");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
    }
  }, [id]);

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

  const colors = [
    { name: "Black Yellow", image: "/api/placeholder/50/50" },
    { name: "Black Red", image: "/api/placeholder/50/50" },
    { name: "Black Z", image: "/api/placeholder/50/50" },
    { name: "Red", image: "/api/placeholder/50/50" },
    { name: "Red Black Z", image: "/api/placeholder/50/50" },
    { name: "Black Rose Gold", image: "/api/placeholder/50/50" },
    { name: "Red Rose Gold", image: "/api/placeholder/50/50" }
  ];

  const thumbnails = [
    product.image,
    "/api/placeholder/80/80"
  ];

  const selectedImage = thumbnails[selectedImageIndex];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back button */}
        <button
          onClick={() => {
            // Don't clear scroll position when going back to preserve position
            navigate('/36five');
          }}
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
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail Images - Desktop */}
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
              
              {/* Scroll Indicator - Mobile */}
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
            </div>

            {/* Product Details */}
            <div className="space-y-3 md:space-y-5">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                
                {/* Made to Order Badge */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4 inline-flex items-center">
                  Made to order — ships in 2–3 weeks
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg md:text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <span className="text-base text-foreground font-medium">Colour: Black</span>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-foreground rounded-full border-2 border-border cursor-pointer"></div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <span className="text-base text-foreground font-medium">size : {selectedSize}</span>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border-2 text-sm font-medium transition-colors ${
                        size === selectedSize 
                          ? 'bg-foreground text-background border-foreground' 
                          : 'border-border text-foreground hover:border-foreground/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

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
              <ShoppingCart>
                <Button size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90 text-base md:text-lg font-medium mt-6">
                  Add to cart
                </Button>
              </ShoppingCart>
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
            <p className="text-foreground">Product details content goes here...</p>
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