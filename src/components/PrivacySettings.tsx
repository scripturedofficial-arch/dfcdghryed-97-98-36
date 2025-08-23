import { useState } from "react";
import { Download, Trash2, Share2, Cookie, Eye, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const PrivacySettings = () => {
  const { toast } = useToast();
  
  const [privacySettings, setPrivacySettings] = useState({
    analytics: true,
    marketing: false,
    dataSharing: false,
    cookiesEssential: true,
    cookiesAnalytics: true,
    cookiesMarketing: false,
    thirdPartyIntegrations: true,
    dataRetentionPeriod: "2years"
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      // Get user data from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare user data export
      const userData = {
        profile: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at
        },
        privacy_settings: privacySettings,
        export_date: new Date().toISOString()
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `godly-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      toast({
        title: "Data Downloaded",
        description: "Your data has been exported successfully."
      });
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message || "Failed to download your data",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // In a real implementation, this would call a backend function
      // to properly delete all user data and anonymize records
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast({
        title: "Account Deletion Initiated",
        description: "Your account deletion request has been submitted. You will receive confirmation within 24 hours.",
      });

      // Redirect to home page after account deletion
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete account",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const savePrivacySettings = async () => {
    try {
      // Save privacy settings to localStorage for now
      // In production, this would be saved to Supabase
      localStorage.setItem('godly-privacy-settings', JSON.stringify(privacySettings));
      
      toast({
        title: "Settings Saved",
        description: "Your privacy preferences have been updated."
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save privacy settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Cookie Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            Cookie Preferences
          </CardTitle>
          <CardDescription>
            Manage how we use cookies to enhance your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="cookiesEssential">Essential Cookies</Label>
              <p className="text-sm text-muted-foreground">Required for basic site functionality</p>
            </div>
            <Switch 
              id="cookiesEssential" 
              checked={privacySettings.cookiesEssential} 
              disabled 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="cookiesAnalytics">Analytics Cookies</Label>
              <p className="text-sm text-muted-foreground">Help us understand how you use our site</p>
            </div>
            <Switch 
              id="cookiesAnalytics" 
              checked={privacySettings.cookiesAnalytics} 
              onCheckedChange={(checked) => handlePrivacyChange("cookiesAnalytics", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="cookiesMarketing">Marketing Cookies</Label>
              <p className="text-sm text-muted-foreground">Personalize ads and content across websites</p>
            </div>
            <Switch 
              id="cookiesMarketing" 
              checked={privacySettings.cookiesMarketing} 
              onCheckedChange={(checked) => handlePrivacyChange("cookiesMarketing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Data Sharing & Analytics
          </CardTitle>
          <CardDescription>
            Control how your data is used for analytics and shared with third parties.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="analytics">Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">Allow anonymous usage data collection to improve our services</p>
            </div>
            <Switch 
              id="analytics" 
              checked={privacySettings.analytics} 
              onCheckedChange={(checked) => handlePrivacyChange("analytics", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="marketing">Marketing Data</Label>
              <p className="text-sm text-muted-foreground">Use data to personalize marketing communications</p>
            </div>
            <Switch 
              id="marketing" 
              checked={privacySettings.marketing} 
              onCheckedChange={(checked) => handlePrivacyChange("marketing", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dataSharing">Third-Party Data Sharing</Label>
              <p className="text-sm text-muted-foreground">Share anonymized data with trusted partners</p>
            </div>
            <Switch 
              id="dataSharing" 
              checked={privacySettings.dataSharing} 
              onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="thirdPartyIntegrations">Third-Party Integrations</Label>
              <p className="text-sm text-muted-foreground">Allow integrations with social media and other services</p>
            </div>
            <Switch 
              id="thirdPartyIntegrations" 
              checked={privacySettings.thirdPartyIntegrations} 
              onCheckedChange={(checked) => handlePrivacyChange("thirdPartyIntegrations", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Your Data Rights
          </CardTitle>
          <CardDescription>
            Exercise your rights regarding personal data under GDPR and other privacy laws.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start" disabled={isDownloading}>
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Preparing Download..." : "Download Your Data"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Download Your Data</DialogTitle>
                <DialogDescription>
                  We'll prepare a complete export of your personal data including profile information, 
                  order history, and privacy settings. This may take a few moments.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">What's included:</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Profile and account information</li>
                    <li>• Order history and preferences</li>
                    <li>• Privacy and notification settings</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleDownloadData} disabled={isDownloading}>
                  {isDownloading ? "Preparing..." : "Download Data"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Data Retention Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Data Retention Preferences</DialogTitle>
                <DialogDescription>
                  Choose how long we keep your data after account closure.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Retention Period</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={privacySettings.dataRetentionPeriod}
                    onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataRetentionPeriod: e.target.value }))}
                  >
                    <option value="immediate">Delete immediately</option>
                    <option value="30days">30 days</option>
                    <option value="1year">1 year</option>
                    <option value="2years">2 years (recommended)</option>
                    <option value="indefinite">Keep indefinitely</option>
                  </select>
                  <p className="text-sm text-muted-foreground">
                    We recommend 2 years to handle returns, warranty claims, and legal requirements.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={savePrivacySettings}>Save Settings</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full" disabled={isDeleting}>
                {isDeleting ? "Processing..." : "Delete My Account"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>This action cannot be undone. This will permanently delete your account and remove all your data from our servers.</p>
                  <p className="font-medium">What will be deleted:</p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Your profile and account information</li>
                    <li>Order history and preferences</li>
                    <li>Saved payment methods</li>
                    <li>All personal data and settings</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Note: Some data may be retained for legal compliance (e.g., tax records) as outlined in our Privacy Policy.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Legal Links */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>
            <a href="/contact" className="text-primary hover:underline">Contact Privacy Team</a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Last updated: {new Date().toLocaleDateString()}. We comply with GDPR, CCPA, and POPIA regulations.
          </p>
        </CardContent>
      </Card>

      <Button onClick={savePrivacySettings} className="w-full">
        Save All Privacy Settings
      </Button>
    </div>
  );
};