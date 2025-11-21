import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already verified
    const checkVerification = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/signin");
        return;
      }

      if (session.user.email_confirmed_at) {
        navigate("/dashboard");
        return;
      }

      setEmail(session.user.email || "");
    };

    checkVerification();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.email_confirmed_at) {
        toast({
          title: "Email verified!",
          description: "Your email has been verified successfully.",
        });
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email sent!",
          description: "Please check your inbox for the verification link.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="flex items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-gray-600" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-medium text-gray-900">Verify your email</h2>
            <p className="text-base text-gray-600">
              We've sent a verification link to
            </p>
            <p className="text-base font-medium text-gray-900">
              {email}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-sm text-gray-600">
              Please check your inbox and click the verification link to continue.
            </p>

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                variant="outline"
                className="w-full h-12 text-base font-medium border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {isResending ? "Sending..." : "Resend verification email"}
              </Button>

              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full h-12 text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Sign out
              </Button>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-sm text-gray-500">
              Can't find the email? Check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
