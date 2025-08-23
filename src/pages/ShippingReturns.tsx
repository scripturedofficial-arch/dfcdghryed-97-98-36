import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Package, Clock, Shield, AlertCircle, Truck, Globe } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
const ShippingReturns = () => {
  const { formatPrice } = useCurrency();
  
  return <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Shipping & Returns</h1>
            <p className="text-gray-600">Everything you need to know about delivery and our policies</p>
          </div>

          <div className="space-y-12">
            {/* Shipping Information */}
            <section>
              <div className="flex items-center mb-6">
                <Truck className="w-8 h-8 mr-3 text-black" />
                <h2 className="text-3xl font-bold">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 mr-2 text-black" />
                    <h3 className="text-xl font-semibold">Production Time</h3>
                  </div>
                  <p className="text-gray-700">
                    All items are made-to-order with a production time of <strong>2-3 weeks</strong>. 
                    This ensures the highest quality and allows us to minimize waste.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 mr-2 text-black" />
                    <h3 className="text-xl font-semibold">Shipping Areas</h3>
                  </div>
                  <p className="text-gray-700">
                    We currently Ship Internationally.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Shipping Options & Costs</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Shipping Method</th>
                        <th className="border border-gray-300 p-3 text-left">Delivery Time</th>
                        <th className="border border-gray-300 p-3 text-left">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Standard Shipping</td>
                        <td className="border border-gray-300 p-3">3-5 business days</td>
                        <td className="border border-gray-300 p-3">{formatPrice(95)}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">Express Shipping</td>
                        <td className="border border-gray-300 p-3">1-2 business days</td>
                        <td className="border border-gray-300 p-3">{formatPrice(150)}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-blue-800">
                    <strong>Note:</strong> Shipping times begin after your order has been produced (2-3 weeks). 
                    Total delivery time is production time + shipping time.
                  </p>
                </div>
              </div>
            </section>

            {/* Order Tracking */}
            <section>
              <div className="flex items-center mb-6">
                <Package className="w-8 h-8 mr-3 text-black" />
                <h2 className="text-3xl font-bold">Order Tracking</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Once your order enters production, you'll receive email updates at key milestones:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Order Confirmed:</strong> Payment processed and order entered into production queue</li>
                  <li><strong>In Production:</strong> Your items are being crafted</li>
                  <li><strong>Quality Check:</strong> Final inspection and packaging</li>
                  <li><strong>Shipped:</strong> Order dispatched with tracking information</li>
                  <li><strong>Delivered:</strong> Package successfully delivered</li>
                </ul>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <p>
                    <strong>Track your order:</strong> Use the tracking link in your shipping confirmation email 
                    or contact us at <a href="mailto:support@scriptured.clothing" className="text-blue-600 hover:underline">support@scriptured.clothing</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Returns Policy */}
            <section>
              <div className="flex items-center mb-6">
                <AlertCircle className="w-8 h-8 mr-3 text-black" />
                <h2 className="text-3xl font-bold">Returns Policy</h2>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Hassle-Free Returns</h3>
                <p className="text-green-700">
                  Need a different size? We offer <strong>hassle-free returns for a full refund</strong> 
                  when the size doesn't fit. Items must be returned within 14 days of delivery in 
                  unworn condition with original tags and packaging.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Return Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Package className="w-6 h-6 mr-2 text-black" />
                      <h4 className="font-semibold">1. Request Return</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Contact us within 14 days of receiving your order to initiate the return process.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Truck className="w-6 h-6 mr-2 text-black" />
                      <h4 className="font-semibold">2. Send Item Back</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Ship your item back using our prepaid return label. Items must be unworn.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 mr-2 text-black" />
                      <h4 className="font-semibold">3. Receive Refund</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      We'll process your refund within 2-3 business days once received.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold">Return Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Eligible Items</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Items must be returned within 14 days of delivery</li>
                      <li>All original tags and packaging must be included</li>
                      <li>Items must be unworn and in original condition</li>
                      <li>Custom or personalized items are not eligible for return</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Return Fees</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Returns are free within South Africa</li>
                      <li>International returns may incur additional shipping fees</li>
                      <li>Customers are responsible for return shipping if item is damaged or worn</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold">Additional Exceptions</h3>
                <p className="text-gray-700">
                  Beyond size returns, we also accept returns for the following circumstances:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Manufacturing Defects</h4>
                    <p className="text-gray-600 text-sm">
                      Items with clear manufacturing defects or quality issues
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Wrong Item Sent</h4>
                    <p className="text-gray-600 text-sm">
                      We sent you the incorrect item or size due to our error
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Damaged in Transit</h4>
                    <p className="text-gray-600 text-sm">
                      Item arrived damaged due to shipping mishaps
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Significantly Different</h4>
                    <p className="text-gray-600 text-sm">
                      Item is significantly different from the product description
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Claims must be made within <strong>7 days</strong> of delivery</li>
                    <li>• Photos of the issue must be provided</li>
                    <li>• Items must be unworn and in original packaging</li>
                    <li>• Contact us at <strong>support@scriptured.clothing</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Size Guide */}
            <section>
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 mr-3 text-black" />
                <h2 className="text-3xl font-bold">Sizing Information</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Since we don't accept returns for sizing issues, please carefully review our 
                  <a href="/size-guide" className="text-blue-600 hover:underline font-semibold"> Size Guide</a> 
                  before placing your order.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Sizing Tips:</h4>
                  <ul className="space-y-2">
                    <li>• Measure yourself using our detailed size chart</li>
                    <li>• Consider the fit you prefer (oversized, fitted, etc.)</li>
                    <li>• Check product descriptions for specific sizing notes</li>
                    <li>• Contact us if you're unsure about sizing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-gray-600 text-sm mb-2">Questions about products or orders</p>
                  <a href="mailto:info@scriptured.clothing" className="text-blue-600 hover:underline">
                    info@scriptured.clothing
                  </a>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Order Support</h3>
                  <p className="text-gray-600 text-sm mb-2">Track orders or shipping issues</p>
                  <a href="mailto:support@scriptured.clothing" className="text-blue-600 hover:underline">
                    support@scriptured.clothing
                  </a>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Returns & Defects</h3>
                  <p className="text-gray-600 text-sm mb-2">Report quality issues</p>
                  <a href="mailto:support@scriptured.clothing" className="text-blue-600 hover:underline">
                    support@scriptured.clothing
                  </a>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default ShippingReturns;