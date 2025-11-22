import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "March 15, 2024",
      status: "delivered",
      items: [
        { name: "Genesis Collection - Black", size: "M", quantity: 1, price: 299 }
      ],
      total: 299,
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-2024-002",
      date: "February 28, 2024",
      status: "in_transit",
      items: [
        { name: "Wisdom Collection - White", size: "L", quantity: 1, price: 349 }
      ],
      total: 349,
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD-2024-003",
      date: "January 10, 2024",
      status: "processing",
      items: [
        { name: "Faith Collection - Navy", size: "S", quantity: 2, price: 598 }
      ],
      total: 598,
      trackingNumber: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in_transit":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      delivered: "default",
      in_transit: "secondary",
      processing: "outline",
      cancelled: "destructive"
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
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
            Track and review all your divine pieces
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(order.status)}
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ordered on {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-2xl font-semibold">${order.total}</p>
                </div>
              </div>

              {/* Order Items - Only shown when expanded */}
              {expandedOrder === order.id && (
                <div className="space-y-3 mb-4 animate-in slide-in-from-top-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">${item.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Tracking Number
                  </p>
                  <p className="font-mono font-semibold">
                    {order.trackingNumber}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  {expandedOrder === order.id ? (
                    <>
                      Hide Details
                      <ChevronUp className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your divine journey by exploring our collections
            </p>
            <Button onClick={() => navigate("/shop")}>
              Browse Shop
            </Button>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;
