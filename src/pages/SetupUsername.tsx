import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Check, X, Loader2, Camera, User } from "lucide-react";

const SetupUsername = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select an image under 2MB.", variant: "destructive" });
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || !isAvailable) return;

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

    // Upload avatar if selected
    let avatarUrl: string | null = null;
    if (avatarFile) {
      const ext = avatarFile.name.split(".").pop();
      const filePath = `${user.id}/avatar.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast({ title: "Upload failed", description: "Could not upload avatar. You can add one later in Settings.", variant: "destructive" });
      } else {
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
        avatarUrl = urlData.publicUrl;
      }
    }

    const updateData: { id: string; username: string; avatar_url?: string } = { id: user.id, username };
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const { error } = await supabase
      .from("profiles")
      .upsert(updateData, { onConflict: "id" });

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
          <h1 className="text-3xl font-serif text-foreground">Set up your profile</h1>
          <p className="text-sm text-muted-foreground">
            Add a photo and pick a unique username
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar upload */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group"
            >
              <Avatar className="h-24 w-24 border-2 border-border">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar preview" />
                ) : (
                  <AvatarFallback className="bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center -mt-4">Tap to add a photo (optional)</p>

          {/* Username input */}
          <div className="space-y-2">
            <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
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
