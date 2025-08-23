import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CurrencySelector from "@/components/CurrencySelector";
import { ShoppingCart as ShoppingCartIcon, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CartItem {
  id: number;
  name: string;
  verse: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "PINTIME 8132 The Chronograph Sports",
      verse: "Hebrews 11:1",
      price: 903.60,
      originalPrice: 1626.62,
      quantity: 1,
      size: "L",
      color: "Black Red",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "PINTIME Watch 2548 The Clock That Shines Immensely",
      verse: "John 1:1", 
      price: 903.60,
      originalPrice: 1626.62,
      quantity: 1,
      size: "M",
      color: "Silver",
      image: "/placeholder.svg"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 632.64;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const isEligibleForFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Your cart</h1>
            
            {/* Removed free shipping banner since free shipping is not offered */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-6" strokeWidth={1} />
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Look like you haven't made your choice yet</p>
                  <Button 
                    className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
                    onClick={() => window.location.href = '/shop'}
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-start space-x-4 p-4">
                      {/* Product number */}
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-2">
                        {cartItems.findIndex(i => i.id === item.id) + 1}
                      </div>
                      
                      {/* Product image and color selector */}
                      <div className="flex flex-col space-y-2">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded flex-shrink-0" />
                        
                        {/* Color selector */}
                        <Select defaultValue={item.color}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.color}>{item.color}</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Price */}
                        <div className="space-y-1">
                          <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-1 space-y-3">
                        <h3 className="font-medium text-sm lg:text-lg">{item.name}</h3>
                        
                        {/* Quantity controls - mobile only */}
                        <div className="flex md:hidden items-center space-x-4">
                          {/* Quantity controls */}
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Add more items link */}
                        <button 
                          className="text-black underline text-sm font-medium hover:no-underline"
                          onClick={() => window.location.href = '/shop'}
                        >
                          Add more items
                        </button>
                      </div>
                      
                      {/* Quantity and remove - desktop only */}
                      <div className="hidden md:flex flex-col items-center space-y-4">
                        {/* Quantity controls */}
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Remove button */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">SUBTOTAL</span>
                  <span className="font-semibold">
                    {cartItems.length === 0 ? "N/A" : `$${subtotal.toFixed(2)}`}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500">
                  Shipping fee is calculated at checkout
                </p>
                
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800 h-12" 
                  disabled={cartItems.length === 0}
                  onClick={() => window.location.href = '/checkout'}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-black text-white px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm text-gray-400">
          <CurrencySelector />
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/shipping-returns" className="hover:text-white transition-colors duration-200">
              Shipping & Returns
            </Link>
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          <p>© 2025 Scriptured. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;