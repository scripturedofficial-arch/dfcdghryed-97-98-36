import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();

  const handleViewShopifyOrders = () => {
    window.open("https://admin.shopify.com/store/orders", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-serif mb-2">Order History</h1>
          <p className="text-muted-foreground">
            View and track all your orders
          </p>
        </div>

        <Card className="p-12 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-3">Orders Managed by Shopify</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            All your order history, tracking, and fulfillment are managed through your Shopify dashboard for a seamless e-commerce experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleViewShopifyOrders} size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Orders in Shopify
            </Button>
            <Button variant="outline" onClick={() => navigate("/shop")} size="lg">
              Continue Shopping
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;
