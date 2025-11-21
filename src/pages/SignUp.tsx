import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account created! Please verify your email to continue.",
        });
        navigate("/verify-email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  return <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Sign up form */}
      <div className="flex items-center justify-center px-4 py-12 pt-24">{/* Added pt-24 for fixed navigation */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
          {/* Left side - Email sign up form */}
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-medium text-gray-900">Sign up</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="h-12 text-base border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 text-base border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                Confirm password
              </Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="h-12 text-base border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 pr-12" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                I agree to the{" "}
                <a href="/terms-of-service" className="text-black underline">
                  Terms of Services
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-black underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button 
              type="submit" 
              disabled={!agreeToTerms || isLoading}
              className="w-full h-12 bg-black text-white text-base font-medium hover:bg-gray-800 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-black underline">
                Sign in
              </a>
            </div>
            </form>
          </div>

          {/* Right side - Social sign up options */}
          <div className="w-full max-w-md space-y-4 mt-8 md:mt-10 md:my-[160px]">
            <div className="text-center mb-8">
              
            </div>
            
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              variant="outline"
              className="w-full h-12 text-base font-medium border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </Button>

          </div>
        </div>
      </div>
    </div>;
};
export default SignUp;