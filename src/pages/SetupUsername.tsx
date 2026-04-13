import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Check, X, Loader2 } from "lucide-react";

const SetupUsername = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Debounced availability check
  useEffect(() => {
    if (username.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setChecking(true);
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .ilike("username", username)
        .maybeSingle();

      setIsAvailable(!data);
      setChecking(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || !isAvailable) return;

    // Validate: alphanumeric, underscores, hyphens only
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      toast({
        title: "Invalid username",
        description: "Only letters, numbers, underscores and hyphens are allowed.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/signin");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);

    if (error) {
      if (error.code === "23505") {
        setIsAvailable(false);
        toast({
          title: "Username taken",
          description: "This username was just claimed. Please try another.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to set username. Please try again.",
          variant: "destructive",
        });
      }
      setSubmitting(false);
      return;
    }

    navigate("/dashboard");
  };

  const isValid = username.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(username);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-foreground">Choose your username</h1>
          <p className="text-sm text-muted-foreground">
            Pick a unique username for your Scriptured account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                maxLength={30}
                className="pr-10"
                autoFocus
              />
              {username.length >= 3 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {checking ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : isAvailable ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : isAvailable === false ? (
                    <X className="h-4 w-4 text-destructive" />
                  ) : null}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {username.length > 0 && username.length < 3
                ? "Must be at least 3 characters"
                : username.length >= 3 && !checking && isAvailable === false
                  ? "This username is already taken"
                  : username.length >= 3 && !checking && isAvailable
                    ? "Username is available!"
                    : "Letters, numbers, underscores and hyphens only"}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || !isAvailable || submitting}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetupUsername;
