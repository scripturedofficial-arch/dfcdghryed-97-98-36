import { ArrowLeft, Package, RefreshCw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleFooter from "@/components/ArticleFooter";

const SizeExchange = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Size Returns</h1>
          <p className="text-muted-foreground mt-2">
            Need a different size? We offer hassle-free returns for a full refund when the size doesn't fit.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Exchange Process */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>1. Request Return</CardTitle>
              <CardDescription>
                Contact us within 14 days of receiving your order to initiate the return process for a refund.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>2. Send Item Back</CardTitle>
              <CardDescription>
                Ship your item back to us using our prepaid return label. Items must be unworn and in original condition.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>3. Receive Refund</CardTitle>
              <CardDescription>
                Once we receive your return, we'll process your refund within 2-3 business days.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Exchange Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Eligible Items</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Items must be returned within 14 days of delivery</li>
                <li>All original tags and packaging must be included</li>
                <li>Items must be returned within 14 days of delivery</li>
                <li>Custom or personalized items are not eligible for return</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Return Fees</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Returns are free</li>
                <li><Link to="/terms-of-service#section-7" className="text-primary hover:underline">Conditionally¹</Link>, international returns may incur additional shipping fees </li>
                <li>Customers are responsible for return shipping if item is damaged or worn</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Processing Time</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>2-3 business days to process refund once received</li>
                <li>5-7 business days for refund to appear in your account</li>
                <li>Total refund processing time.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Our customer service team is here to assist you with your size returns and refunds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                For size return requests or questions, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:support@scriptured.clothing">Email: support@scriptured.clothing</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ArticleFooter />
    </div>
  );
};

export default SizeExchange;