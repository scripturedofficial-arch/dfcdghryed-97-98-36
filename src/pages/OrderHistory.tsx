import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Loader2, ShoppingBag, ChevronLeft, ChevronRight, Truck, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface OrderLineItem {
  title: string;
  quantity: number;
  price: string;
  variant_title: string | null;
}

interface Order {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  currency: string;
  line_items: OrderLineItem[];
}

const statusColor = (status: string) => {
  switch (status) {
    case "paid": return "bg-green-100 text-green-800 border-green-200";
    case "fulfilled": return "bg-green-100 text-green-800 border-green-200";
    case "partially_fulfilled": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "refunded": return "bg-red-100 text-red-800 border-red-200";
    case "voided": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const formatStatus = (status: string | null) => {
  if (!status) return "Unfulfilled";
  return status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

const ORDERS_PER_PAGE = 10;

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError("Please sign in to view your orders.");
          setLoading(false);
          return;
        }

        const res = await supabase.functions.invoke("get-shopify-orders");

        if (res.error) {
          throw new Error(res.error.message || "Failed to fetch orders");
        }

        setOrders(res.data?.orders || []);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError("Unable to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-muted-foreground">{error}</p>
          </Card>
        )}

        {!loading && !error && orders.length === 0 && (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-3">No orders yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once you place an order, it will appear here.
            </p>
            <Button onClick={() => navigate("/shop")} size="lg">
              Start Shopping
            </Button>
          </Card>
        )}

        {!loading && !error && orders.length > 0 && (() => {
          const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
          const paginatedOrders = orders.slice(
            (currentPage - 1) * ORDERS_PER_PAGE,
            currentPage * ORDERS_PER_PAGE
          );

          return (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1}–{Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
              </p>
              <div className="space-y-4">
                {paginatedOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-lg font-semibold">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={statusColor(order.financial_status)}>
                          {formatStatus(order.financial_status)}
                        </Badge>
                        <Badge variant="outline" className={statusColor(order.fulfillment_status || "")}>
                          {formatStatus(order.fulfillment_status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      {order.line_items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">{item.title}</span>
                            {item.variant_title && (
                              <span className="text-muted-foreground ml-2">— {item.variant_title}</span>
                            )}
                            <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                          </div>
                          <span className="font-medium">
                            {order.currency} {parseFloat(item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-end">
                      <p className="text-lg font-semibold">
                        Total: {order.currency} {parseFloat(order.total_price).toFixed(2)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          );
        })()}
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;
