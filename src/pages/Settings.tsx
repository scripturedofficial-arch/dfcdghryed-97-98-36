import { useState } from "react";
import { ArrowLeft, User, Mail, Bell, Shield, CreditCard, Palette, Globe, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PrivacySettings } from "@/components/PrivacySettings";
const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    newDrops: true,
    preorderReminders: true,
    orderUpdates: true,
    godlyCircleNews: false,
    promotionalEmails: true,
    smsNotifications: false
  });
  const [profile, setProfile] = useState({
    firstName: "Divine",
    lastName: "Soul",
    email: "divine.soul@example.com",
    phone: "+27 123 456 789",
    language: "en",
    currency: "ZAR"
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const tabNames = {
    profile: "Profile",
    notifications: "Notifications", 
    privacy: "Privacy",
    billing: "Billing",
    preferences: "Preferences"
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully"
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsPasswordDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Settings</h1>
          <p className="text-gray-300 mt-4 max-w-2xl">
            Manage your account preferences, notifications, and privacy settings.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Current Tab Name */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-foreground">{tabNames[activeTab as keyof typeof tabNames]}</h2>
          </div>
          
          <TabsList className="grid w-full grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 px-2 py-3 text-xs sm:flex-row sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center gap-1 px-2 py-3 text-xs sm:flex-row sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col items-center gap-1 px-2 py-3 text-xs sm:flex-row sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex flex-col items-center gap-1 px-2 py-3 text-xs sm:flex-row sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col items-center gap-1 px-2 py-3 text-xs sm:flex-row sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only">Preferences</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={profile.firstName} onChange={e => handleProfileChange("firstName", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={profile.lastName} onChange={e => handleProfileChange("lastName", e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={profile.email} onChange={e => handleProfileChange("email", e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={profile.phone} onChange={e => handleProfileChange("phone", e.target.value)} />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newDrops">New Drop Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new collections are released</p>
                      </div>
                      <Switch id="newDrops" checked={notifications.newDrops} onCheckedChange={checked => handleNotificationChange("newDrops", checked)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="preorderReminders">Pre-order Reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders about pre-order deadlines</p>
                      </div>
                      <Switch id="preorderReminders" checked={notifications.preorderReminders} onCheckedChange={checked => handleNotificationChange("preorderReminders", checked)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderUpdates">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">Shipping and delivery notifications</p>
                      </div>
                      <Switch id="orderUpdates" checked={notifications.orderUpdates} onCheckedChange={checked => handleNotificationChange("orderUpdates", checked)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="godlyCircleNews">Godly Circle News</Label>
                        <p className="text-sm text-muted-foreground">Exclusive member updates</p>
                      </div>
                      <Switch id="godlyCircleNews" checked={notifications.godlyCircleNews} onCheckedChange={checked => handleNotificationChange("godlyCircleNews", checked)} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotionalEmails">Promotional Emails</Label>
                        <p className="text-sm text-muted-foreground">Special offers and promotional content</p>
                      </div>
                      <Switch id="promotionalEmails" checked={notifications.promotionalEmails} onCheckedChange={checked => handleNotificationChange("promotionalEmails", checked)} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                    </div>
                    <Switch id="smsNotifications" checked={notifications.smsNotifications} onCheckedChange={checked => handleNotificationChange("smsNotifications", checked)} />
                  </div>
                </div>

                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and authentication settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handlePasswordChange} className="flex-1">
                            Update Password
                          </Button>
                          <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" disabled>
                      Enable Two-Factor Authentication
                    </Button>
                    <p className="text-sm text-muted-foreground px-4">Coming soon</p>
                  </div>
                </CardContent>
              </Card>

              <PrivacySettings />
            </div>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Payment
                </CardTitle>
                <CardDescription>
                  Manage your payment methods and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Methods</h3>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={async () => {
                          try {
                            const { data, error } = await supabase.functions.invoke('manage-payment-methods');
                            if (error) throw error;
                            if (data?.url) {
                              window.open(data.url, '_blank');
                            }
                          } catch (error) {
                            toast({
                              title: "Error",
                              description: "Failed to open payment management",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={async () => {
                      try {
                        const { data, error } = await supabase.functions.invoke('manage-payment-methods');
                        if (error) throw error;
                        if (data?.url) {
                          window.open(data.url, '_blank');
                        }
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to open payment management",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Add New Payment Method
                  </Button>
                </div>

                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Need to view your order history?{" "}
                    <Link to="/dashboard" className="text-primary hover:underline">
                      Go to Dashboard
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  App Preferences
                </CardTitle>
                <CardDescription>
                  Customize your app experience and regional settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Language
                      </Label>
                      <Select value={profile.language} onValueChange={value => handleProfileChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          <SelectItem value="en-us">English (US)</SelectItem>
                          <SelectItem value="en-gb">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="pt-br">Portuguese (Brazilian)</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="zh-cn">Simplified Chinese (Mandarin)</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={profile.currency} onValueChange={value => handleProfileChange("currency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ZAR">ZAR (R)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Size Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="topSize">T-shirt Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="xs">XS</SelectItem>
                          <SelectItem value="s">S</SelectItem>
                          <SelectItem value="m">M</SelectItem>
                          <SelectItem value="l">L</SelectItem>
                          <SelectItem value="xl">XL</SelectItem>
                          <SelectItem value="xxl">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bottomSize">Hoodie Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="28">28</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="32">32</SelectItem>
                          <SelectItem value="34">34</SelectItem>
                          <SelectItem value="36">36</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default Settings;