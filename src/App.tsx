
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import About from "./pages/About";
import Manifesto from "./pages/Manifesto";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
import Philosophy from "./pages/Philosophy";
import Religion from "./pages/Religion";
import Editorials from "./pages/Editorials";
import The12 from "./pages/The12";
import ThirtySixFive from "./pages/36Five";
import Application from "./pages/Application";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SizeGuide from "./pages/SizeGuide";
import Contact from "./pages/Contact";
import SizeExchange from "./pages/SizeExchange";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingReturns from "./pages/ShippingReturns";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PaymentMethods from "./pages/PaymentMethods";
import ProductDetail from "./pages/ProductDetail";
import FAQ from "./pages/FAQ";
import MadeToOrder from "./pages/MadeToOrder";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/article" element={<ArticleDetail />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/religion" element={<Religion />} />
          <Route path="/editorials" element={<Editorials />} />
          <Route path="/the-12" element={<The12 />} />
          <Route path="/application" element={<Application />} />
          <Route path="/36five" element={<ThirtySixFive />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/size-return" element={<SizeExchange />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/made-to-order" element={<MadeToOrder />} />
          <Route path="/order-history" element={<OrderHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
