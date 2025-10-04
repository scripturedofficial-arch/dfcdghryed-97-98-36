import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Loader2, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Initialize Stripe - you'll need to add your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch setup intent from backend
    const fetchSetupIntent = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to add payment methods",
            variant: "destructive"
          });
          navigate("/signin");
          return;
        }

        const { data, error } = await supabase.functions.invoke('create-setup-intent', {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (error) throw error;
        
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to initialize payment setup",
          variant: "destructive"
        });
      }
    };

    fetchSetupIntent();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        throw error;
      }

      if (setupIntent.status === 'succeeded') {
        toast({
          title: "Success",
          description: "Payment method added successfully",
        });
        navigate("/settings?tab=billing");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add payment method",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-background">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: 'hsl(var(--foreground))',
                '::placeholder': {
                  color: 'hsl(var(--muted-foreground))',
                },
              },
              invalid: {
                color: 'hsl(var(--destructive))',
              },
            },
          }}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Add Payment Method"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/settings?tab=billing")}
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

const PaymentMethods = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/settings?tab=billing"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Add Payment Method</h1>
          <p className="text-gray-300 mt-4 max-w-2xl">
            Securely add a new payment method to your account.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Card Information
            </CardTitle>
            <CardDescription>
              Enter your card details below. Your information is encrypted and secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>PCI Compliant</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by Stripe. Your card details are never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
