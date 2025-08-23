import { ArrowLeft, Clock, CheckCircle, Package, Star, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const MadeToOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-16 border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Made-to-Order</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every Scriptured piece is crafted specifically for you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Premium Quality</CardTitle>
              <CardDescription>
                Each garment is carefully crafted with premium, ethically-sourced materials for lasting comfort and durability.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Sustainable Practice</CardTitle>
              <CardDescription>
                Made-to-order production minimizes waste and reduces our environmental impact while ensuring quality.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Personal Touch</CardTitle>
              <CardDescription>
                Every piece is made specifically for you, ensuring a personal connection to your faith-inspired wardrobe.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Production Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Your Order Journey</CardTitle>
            <CardDescription className="text-center">
              From order to delivery, here's what to expect with your made-to-order Scriptured piece
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                </div>
                <h3 className="font-semibold mb-2">Order Placed</h3>
                <p className="text-sm text-muted-foreground">Your order is received and payment is confirmed</p>
                <p className="text-xs text-primary mt-1 font-medium">Day 0</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Production Begins</h3>
                <p className="text-sm text-muted-foreground">Your garment enters our production queue with premium materials</p>
                <p className="text-xs text-primary mt-1 font-medium">Days 1-3</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Crafting Complete</h3>
                <p className="text-sm text-muted-foreground">Your piece is finished, quality-checked, and prepared for shipping</p>
                <p className="text-xs text-primary mt-1 font-medium">Days 14-21</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Delivered</h3>
                <p className="text-sm text-muted-foreground">Your made-to-order piece arrives ready to inspire</p>
                <p className="text-xs text-primary mt-1 font-medium">Days 17-28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Times */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Production Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium">Production</span>
                <span className="text-primary font-semibold">2–3 weeks</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Domestic Shipping</span>
                <span>3–5 business days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>International Shipping</span>
                <span>7–21 business days</span>
              </div>
              <div className="flex justify-between items-center py-2 font-semibold text-lg">
                <span>Total Lead Time</span>
                <span className="text-primary">3–6 weeks</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Made-to-Order?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Reduced Waste</p>
                    <p className="text-sm text-muted-foreground">Only produce what's needed, minimizing environmental impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Premium Quality</p>
                    <p className="text-sm text-muted-foreground">Each piece receives individual attention and care</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fresh Materials</p>
                    <p className="text-sm text-muted-foreground">Your garment is made with the freshest fabrics and inks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Meaningful Purpose</p>
                    <p className="text-sm text-muted-foreground">Each order supports our mission of faith-inspired fashion</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials & Quality */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Premium Materials & Craftsmanship</CardTitle>
            <CardDescription>
              We use only the finest materials to ensure your Scriptured pieces stand the test of time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Fabric Selection</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 100% organic cotton options</li>
                  <li>• Premium cotton blends</li>
                  <li>• Sustainable bamboo materials</li>
                  <li>• OEKO-TEX certified fabrics</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Printing Quality</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Water-based eco-friendly inks</li>
                  <li>• Fade-resistant printing techniques</li>
                  <li>• Precise scripture typography</li>
                  <li>• Long-lasting color vibrancy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Construction</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Double-stitched seams</li>
                  <li>• Reinforced stress points</li>
                  <li>• Pre-shrunk materials</li>
                  <li>• Quality-checked finish</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Policy for Made-to-Order */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Made-to-Order Return Policy</CardTitle>
            <CardDescription>
              Understanding our return policy for custom-made items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">We Accept Returns For:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Manufacturing defects or quality issues</li>
                <li>• Incorrect sizing (based on our size guide)</li>
                <li>• Damage during shipping</li>
                <li>• Wrong item sent (our error)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-amber-600">Limited Returns For:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Change of mind (since items are made specifically for you)</li>
                <li>• Incorrect size selection (not following our size guide)</li>
                <li>• Normal wear and tear after extended use</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Size Guarantee:</strong> If you follow our size guide and the item doesn't fit as expected, 
                we'll work with you to find a solution, including a free size exchange where possible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel my order after placing it?</h3>
              <p className="text-sm text-muted-foreground">
                You can cancel your order within 24 hours of placing it, before production begins. 
                After production starts, cancellations are not possible as your item is being made specifically for you.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer rush production?</h3>
              <p className="text-sm text-muted-foreground">
                Currently, we don't offer rush production to ensure consistent quality across all orders. 
                Our standard 2-3 week production time allows for careful attention to each piece.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How will I know when my order is ready?</h3>
              <p className="text-sm text-muted-foreground">
                You'll receive email updates throughout the process: order confirmation, production start, 
                completion, and shipping notification with tracking information.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What if I need help with sizing?</h3>
              <p className="text-sm text-muted-foreground">
                Our customer service team is happy to help with sizing questions. We recommend checking 
                our detailed size guide and contacting us if you're between sizes or have specific fit preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Order Your Made-to-Order Piece?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our collections and find the perfect scripture-inspired piece made specifically for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/shop" onClick={() => window.scrollTo(0, 0)}>Shop Collections</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/size-guide" onClick={() => window.scrollTo(0, 0)}>Size Guide</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MadeToOrder;