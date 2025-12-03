import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Minus, Plus, X, Lock, Truck, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([{
    id: 1,
    name: "Genesis Oversized Tee",
    verse: "John 1:1",
    price: 85,
    quantity: 1,
    size: "L",
    image: "/placeholder.svg"
  }, {
    id: 2,
    name: "Faith Heavyweight Hoodie",
    verse: "Hebrews 11:1",
    price: 120,
    quantity: 1,
    size: "M",
    image: "/placeholder.svg"
  }]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [updateNews, setUpdateNews] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState("");
  const [orderSummaryCollapsed, setOrderSummaryCollapsed] = useState(true);
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => items.map(item => item.id === id ? {
        ...item,
        quantity: newQuantity
      } : item));
    }
  };
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const subtotal: number = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping: number = 0; // Free shipping as shown in reference  
  const total: number = subtotal + shipping;
  return <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Express Checkout & Shipping Form */}
            <div className="order-1 lg:order-1 space-y-8">
              {/* Express Checkout */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  
                </div>
                
                <h3 className="text-lg font-semibold mb-4">Express Checkout</h3>
                
                <div className="space-y-3">
                  <Button className="w-full bg-[#FFC439] hover:bg-[#FFB800] text-black font-semibold py-3 rounded-md">
                    <img src="/lovable-uploads/7e43f811-0015-491f-89b4-bc60951d9458.png" alt="PayPal" className="h-12" />
                  </Button>
                  
                  <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-md">
                    <img src="/lovable-uploads/b1e4cf74-0f11-429c-8928-a142f0ecde04.png" alt="Google Pay" className="h-12" />
                  </Button>
                  
                   <Button className="w-full bg-[#6772E5] hover:bg-[#5469D4] text-white font-semibold py-3 rounded-md">
                     <img src="/lovable-uploads/2b4549a0-3e75-48df-93f3-310934afbac6.png" alt="Paystack" className="h-6" />
                   </Button>
                </div>
                
                <div className="text-center text-gray-500 my-4">OR</div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping address</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your shipping address (state/city/region) to view available shipping methods</p>
                
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Email" type="email" className="w-full" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" checked={updateNews} onCheckedChange={checked => setUpdateNews(checked === true)} />
                    <Label htmlFor="newsletter" className="text-sm">
                      Update me on news and exclusives
                    </Label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First name" />
                    <Input placeholder="Last name" />
                  </div>
                  
                  <div>
                    <Input 
                      placeholder="Address" 
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (e.target.value.trim()) {
                          setAddressError(false);
                        }
                      }}
                      onBlur={() => {
                        if (!address.trim()) {
                          setAddressError(true);
                        }
                      }}
                      className={addressError ? "border-red-300" : ""} 
                    />
                    {addressError && <p className="text-red-500 text-xs mt-1">Please enter an address.</p>}
                  </div>
                  
                  <Input placeholder="Apartment, suite, etc. (optional)" />
                  
                  <Input placeholder="Company name (optional)" />
                  
                  <Input placeholder="City" />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Input value="South Africa" readOnly className="bg-gray-50" />
                      <Label className="text-xs text-gray-500">Country</Label>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gauteng">Gauteng</SelectItem>
                          <SelectItem value="western-cape">Western Cape</SelectItem>
                          <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input placeholder="Zip Code" />
                  </div>
                  
                  <Input placeholder="Phone number (optional)" />
                  
                  <Input placeholder="Identification Details (Tax/Personal ID)" />
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="billing" checked={billingAddress} onCheckedChange={checked => setBillingAddress(checked === true)} />
                    <Label htmlFor="billing" className="text-sm">
                      Also used for Billing address
                    </Label>
                  </div>
                </form>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping method</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your shipping address (state/city/region) to view available shipping methods</p>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment method</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">SSL SECURE</div>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">✓ Norton SECURED</div>
                </div>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <div>
                          <Label htmlFor="card" className="font-medium">Debit or Credit cards</Label>
                          <p className="text-sm text-gray-500">Pay with Debit or Credit cards</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <div className="flex space-x-1">
                          <img src="/lovable-uploads/15f7065e-b780-45e8-8ac1-94e6ac1604a5.png" alt="Visa" className="h-6" />
                          <img src="/lovable-uploads/eba4efdf-4f8f-45fe-a565-e6678c3a14a3.png" alt="Mastercard" className="h-6" />
                          <img src="/lovable-uploads/b2252f4a-1e19-4be5-bd2b-5f9851826f00.png" alt="Amex" className="h-6" />
                          <img src="/lovable-uploads/1c5ef9bb-24dd-49ae-94e2-e332433b34d2.png" alt="Discover" className="h-6" />
                          <img src="/lovable-uploads/a6276d09-1689-4112-89a8-d39808912e46.png" alt="Diners" className="h-6 hidden sm:inline" />
                        </div>
                        <div className="sm:hidden w-full flex justify-start space-x-1">
                          <img src="/lovable-uploads/a6276d09-1689-4112-89a8-d39808912e46.png" alt="Diners" className="h-6" />
                          <img src="/lovable-uploads/bc515162-ce30-4945-b41c-678ef977ab9c.png" alt="JCB" className="h-6" />
                        </div>
                        <div className="hidden sm:inline">
                          <img src="/lovable-uploads/bc515162-ce30-4945-b41c-678ef977ab9c.png" alt="JCB" className="h-6" />
                        </div>
                      </div>
                    </div>
                    
                    {paymentMethod === "card" && <div className="mt-4 space-y-4">
                        <div className="relative">
                          <Input placeholder="Card number" />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                            Autofill link
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVV" />
                        </div>
                      </div>}
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div>
                          <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                          <p className="text-sm text-gray-500">Pay with PayPal</p>
                        </div>
                      </div>
                      <img src="/lovable-uploads/ca45bb07-c9ca-419a-9ca1-5ccf4c124e33.png" alt="PayPal" className="h-[70px]" />
                    </div>
                  </div>
                </RadioGroup>

                <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold rounded-md">
                  Place your order
                  <div className="text-sm">Total: to be updated</div>
                </Button>

                {/* Security badges */}
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="McAfee Secure" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Secured by PayPal" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="TRUSTe" className="h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-2 lg:order-2">
              <h2 className="font-serif text-2xl font-bold mb-6">Your Order</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4 sm:space-x-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 sm:hidden">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.verse} • Size: {item.size}</p>
                      </div>
                    </div>
                    
                    <p className="font-bold sm:hidden">${item.price}</p>
                    
                    <div className="hidden sm:block sm:flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.verse} • Size: {item.size}</p>
                      <p className="font-bold">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-gray-100 rounded text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>)}
              </div>

              {/* Order Summary & Totals */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    <span className="block sm:inline">Order Summary:</span>
                    <span className="block sm:inline sm:ml-1">R {total.toFixed(2)}</span>
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">({cartItems.length} items)</span>
                    <button 
                      className="ml-2 md:hidden"
                      onClick={() => setOrderSummaryCollapsed(!orderSummaryCollapsed)}
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform ${orderSummaryCollapsed ? '' : 'rotate-180'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className={`space-y-2 mb-4 md:block ${orderSummaryCollapsed ? 'hidden' : 'block'}`}>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? '-' : `R ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    <span>Production Time</span>
                    <span>2–3 weeks</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>R {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>14-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Checkout;