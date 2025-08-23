import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart as ShoppingCartIcon, Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
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
interface ShoppingCartProps {
  children: React.ReactNode;
}
const ShoppingCart = ({
  children
}: ShoppingCartProps) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([{
    id: 1,
    name: "PINTIME 8132 The Chronograph Sports",
    verse: "Hebrews 11:1",
    price: 903.60,
    originalPrice: 1626.62,
    quantity: 1,
    size: "L",
    color: "Black Red",
    image: "/placeholder.svg"
  }, {
    id: 2,
    name: "PINTIME Watch 2548 The Clock That Shines Immensely",
    verse: "John 1:1",
    price: 903.59,
    quantity: 1,
    size: "M",
    color: "Silver",
    image: "/placeholder.svg"
  }]);
  const [isOpen, setIsOpen] = useState(false);
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
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 620.50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, subtotal / freeShippingThreshold * 100);
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0 [&>button]:top-8 [&>button]:sm:top-14">
        <SheetHeader className="border-b pb-4 pt-6 sm:pt-12 px-6 mt-10 sm:mt-[50px]">
          <SheetTitle className="text-center text-lg font-semibold tracking-wide mt-[10px] sm:mt-0">
            YOUR SHOPPING CART
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col">
          {/* Free shipping banner */}
          {remainingForFreeShipping > 0 ? <div className="px-6 py-3 text-center">
              <p className="text-sm text-gray-700 mb-2">
                Buy <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> more to enjoy FREE Shipping
              </p>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-black h-1 rounded-full transition-all duration-300" style={{
              width: `${progressPercentage}%`
            }}></div>
              </div>
            </div> : subtotal > 0}

          {/* Cart content */}
          <div className="flex-1 flex flex-col">
            {cartItems.length === 0 ? <div className="flex-1 flex flex-col items-center justify-center py-16 px-6">
                <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-6" strokeWidth={1} />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-8">Look like you haven't made your choice yet</p>
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3" onClick={() => setIsOpen(false)}>
                  CONTINUE SHOPPING
                </Button>
              </div> : <ScrollArea className="flex-1 max-h-[calc(100vh-300px)]">
                <div className="px-6 py-4">
                  <div className="space-y-6">
                    {cartItems.map(item => <div key={item.id} className="space-y-3 pb-6 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight mb-1">Genesis Oversized Tee</h4>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {item.color.split(' ').map((color, index) => (
                                  <div 
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ 
                                      backgroundColor: 
                                        color.toLowerCase() === 'black' ? '#000000' : 
                                        color.toLowerCase() === 'red' ? '#dc2626' : 
                                        color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                        '#6b7280' 
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">{item.color}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <p className="font-semibold text-sm">${item.price.toFixed(2)}</p>
                              {item.originalPrice && <p className="text-xs text-gray-500 line-through">${item.originalPrice.toFixed(2)}</p>}
                            </div>
                          </div>
                          
                          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </ScrollArea>}
          </div>

          {/* Footer section */}
          <div className="border-t pt-4 px-6 pb-3 space-y-4 mt-auto bg-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">SUBTOTAL</span>
              <span className="font-semibold text-lg">
                {cartItems.length === 0 ? "N/A" : `$${subtotal.toFixed(2)}`}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Shipping fee is calculated at checkout
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button variant="outline" className="w-full h-12 font-medium" onClick={() => {
              setIsOpen(false);
              navigate('/cart');
            }}>
                Go to cart
              </Button>
              <Button 
                className="w-full h-12 bg-black text-white hover:bg-gray-800 font-medium" 
                disabled={cartItems.length === 0}
                onClick={() => {
                  setIsOpen(false);
                  navigate('/checkout');
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};
export default ShoppingCart;