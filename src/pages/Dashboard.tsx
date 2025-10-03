import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Heart, Package, Clock, Crown, Gem, Gift, User, Calendar, Mail, History, Eye, Menu, X, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
const Dashboard = () => {
  const navigate = useNavigate();
  const [isGodlyCircleMember] = useState(false); // This would come from user data
  const [activeView, setActiveView] = useState<"quick-access" | "my-profile">("quick-access");
  const [selectedContent, setSelectedContent] = useState<string | null>("quick-access-overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [heightMetric, setHeightMetric] = useState<"imperial" | "metric">("imperial");
  const [weightMetric, setWeightMetric] = useState<"imperial" | "metric">("imperial");
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [weight, setWeight] = useState(165);

  // Calculate recommended size based on height and weight
  const calculateRecommendedSize = () => {
    const heightInCm = heightMetric === "imperial" 
      ? (heightFeet * 30.48) + (heightInches * 2.54)
      : heightCm;
    
    const weightInKg = weightMetric === "imperial" 
      ? weight * 0.453592 
      : weight;

    // BMI-based size recommendation logic
    const bmi = weightInKg / ((heightInCm / 100) ** 2);
    
    if (heightInCm < 165) {
      return bmi < 20 ? "XS" : bmi < 25 ? "S" : bmi < 30 ? "M" : "L";
    } else if (heightInCm < 175) {
      return bmi < 20 ? "S" : bmi < 25 ? "M" : bmi < 30 ? "L" : "XL";
    } else if (heightInCm < 185) {
      return bmi < 20 ? "M" : bmi < 25 ? "L" : bmi < 30 ? "XL" : "XXL";
    } else {
      return bmi < 20 ? "L" : bmi < 25 ? "XL" : bmi < 30 ? "XXL" : "XXXL";
    }
  };
  const [activityFilter, setActivityFilter] = useState<"all" | "purchases" | "godly-circle" | "nft">("all");
  const userName = "Divine Soul"; // This would come from user context

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState([{
    title: "New Drops",
    description: "Sacred collections and limited releases",
    icon: Gift,
    enabled: true,
    frequency: "Instant"
  }, {
    title: "Order Updates",
    description: "Purchase confirmations, shipping & delivery",
    icon: Package,
    enabled: true,
    frequency: "Real-time"
  }, {
    title: "Godly Circle",
    description: "Exclusive member communications & benefits",
    icon: Crown,
    enabled: true,
    frequency: "Weekly digest"
  }, {
    title: "NFT Activity",
    description: "Minting confirmations & blockchain updates",
    icon: Gem,
    enabled: false,
    frequency: "Daily summary"
  }]);
  const [emailFrequency, setEmailFrequency] = useState<"real-time" | "daily" | "weekly" | "important">("real-time");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Toggle notification preference
  const toggleNotificationPref = (index: number) => {
    setNotificationPrefs(prev => prev.map((pref, i) => i === index ? {
      ...pref,
      enabled: !pref.enabled
    } : pref));
  };

  // Dynamic wishlist count based on actual product cards
  const wishlistItems = [{
    id: 1,
    name: "Divine Essence Pendant",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop"
  }, {
    id: 2,
    name: "Sacred Light Hoodie",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop"
  }, {
    id: 3,
    name: "Celestial Ring",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop"
  }, {
    id: 4,
    name: "Divine Grace Tee",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
  }, {
    id: 5,
    name: "Sanctuary Cap",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop"
  }];
  const wishlistCount = wishlistItems.length;

  // TODO: Replace with real data from orders and NFT APIs
  const orderCount = 3; // Mock order count
  const nftCount = 5; // Mock NFT count
  const hasActivity = orderCount > 0 || nftCount > 0;
  
  // Feature flag for participation history (default: false for cleaner dashboard)
  // TODO: Enable this feature flag when implementing lottery/drop participation tracking
  // or high-engagement features that warrant detailed participation history
  const FEATURE_PARTICIPATION_HISTORY = false;
  
  // Show participation history only when feature is enabled AND user has qualifying activity
  const showParticipationHistory = FEATURE_PARTICIPATION_HISTORY && (isGodlyCircleMember || hasActivity);

  // Debug logging
  useEffect(() => {
    console.log("Dashboard Debug:", {
      selectedContent,
      activeView
    });
  }, [selectedContent, activeView]);

  // Add intersection observer for fade-in animations
  useEffect(() => {
    const observeElements = () => {
      const elements = document.querySelectorAll('.fade-in-scroll');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });
      elements.forEach(element => observer.observe(element));
      return () => observer.disconnect();
    };
    const cleanup = observeElements();
    return cleanup;
  }, []);
  const quickAccessItems = [{
    title: "Wishlist",
    subtitle: "Saved items across all drops",
    icon: Heart,
    count: `${wishlistCount} items`,
    href: "/wishlist"
  }, {
    title: "My Orders",
    subtitle: "View your past Scriptured pieces",
    icon: Package,
    count: "3 orders",
    href: "/orders"
  }, {
    title: "Godly Circle",
    subtitle: isGodlyCircleMember ? "Access: Active – January" : "You're not selected this month",
    icon: Crown,
    count: isGodlyCircleMember ? "Member" : "Waitlist",
    href: "/godly-circle",
    special: true
  }, {
    title: "NFT Vault",
    subtitle: "Your digital twins and authenticity tokens",
    icon: Gem,
    count: "5 tokens",
    href: "/nft-vault"
  }];
  const optionalPanels = [{
    title: "Fit Profile",
    subtitle: "Your preferred size for future drops",
    icon: User,
    href: "/fit-profile"
  }, {
    title: "Drop Calendar",
    subtitle: "Upcoming Releases",
    icon: Calendar,
    href: "/calendar"
  }, {
    title: "Email Settings",
    subtitle: "Customize your notifications",
    icon: Mail,
    href: "/settings"
  }];

  // Only show participation history for Godly Circle members or users with activity
  if (showParticipationHistory) {
    optionalPanels.push({
      title: "Participation History",
      subtitle: "Your Scriptured journey timeline",
      icon: History,
      href: "/history"
    });
  }

  // Show behind-the-scenes only for Godly Circle members
  if (isGodlyCircleMember) {
    optionalPanels.push({
      title: "Behind-the-Scenes",
      subtitle: "Exclusive member content",
      icon: Eye,
      href: "/bts"
    });
  }

  // Content rendering function for each anchor
  const renderContent = (contentKey: string) => {
    const contentMap: {
      [key: string]: JSX.Element;
    } = {
      'quick-access-overview': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">Quick Access</h2>
          <p className="text-muted-foreground mb-8">Click on any item in the sidebar to view its content</p>
          
          {/* Mobile: Collapsible Side Navbar */}
          <div className="block md:hidden relative">
            
            {/* Mobile Side Navbar */}
            <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r shadow-lg z-50 transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
              {/* Sidebar Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Quick Access</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Sidebar Content */}
              <div className="p-2 space-y-2 pt-4">
                {quickAccessItems.map((item, index) => <div key={item.title} className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent(item.href);
                setIsMobileSidebarOpen(false);
              }}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground font-medium">{item.title}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.count.replace(/[^\d]/g, '')}</span>
                  </div>)}
              </div>
            </div>
            
            {/* Overlay */}
            {isMobileSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileSidebarOpen(false)} />}
          </div>


          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickAccessItems.map((item, index) => <Card key={item.title} className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl border-0 shadow-md bg-card" onClick={() => setSelectedContent(item.href)}>
                <CardContent className="p-6 relative pb-12">
                  <div className="flex items-start mb-3">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-6 w-6 text-foreground" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pr-16">
                    {item.subtitle}
                  </p>
                  <span className="absolute bottom-6 right-6 text-sm font-medium text-muted-foreground">
                    {item.count}
                  </span>
                </CardContent>
              </Card>)}
          </div>
        </div>,
      'my-profile-overview': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">My Profile Overview</h2>
          
          {/* Mobile: Collapsible Sidebar, Desktop: Grid layout */}
          <div className="block md:hidden relative">
            
            {/* Mobile Collapsible Sidebar */}
            <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r shadow-lg z-50 transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
              {/* Sidebar Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-foreground">My Profile</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Sidebar Content */}
              <div className="p-2 space-y-1 pt-4">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent('/fit-profile');
                setIsMobileSidebarOpen(false);
              }}>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground font-medium">Fit Profile</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">3</span>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent('/calendar');
                setIsMobileSidebarOpen(false);
              }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground font-medium">Drop Calendar</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">8</span>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent('/settings');
                setIsMobileSidebarOpen(false);
              }}>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground font-medium">Email Settings</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">5</span>
                </div>
                {showParticipationHistory && <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent('/history');
                setIsMobileSidebarOpen(false);
              }}>
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">Participation</span>
                      <span className="text-foreground font-medium">History</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">24</span>
                </div>}
                {isGodlyCircleMember && <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors" onClick={() => {
                setSelectedContent('/bts');
                setIsMobileSidebarOpen(false);
              }}>
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground font-medium">Behind-the-Scenes</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">6</span>
                  </div>}
              </div>
            </div>
            
            {/* Overlay */}
            {isMobileSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileSidebarOpen(false)} />}
          </div>
          
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card" onClick={() => setSelectedContent('/fit-profile')}>
              <CardContent className="p-6 relative pb-12">
                <div className="flex items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-transparent">
                      <User className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">Fit Profile</CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground pr-16">
                  Your preferred size for future drops
                </CardDescription>
                <span className="absolute bottom-6 right-6 text-sm font-medium text-muted-foreground">3 sizes</span>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card" onClick={() => setSelectedContent('/calendar')}>
              <CardContent className="p-6 relative pb-12">
                <div className="flex items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-transparent">
                      <Calendar className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">Drop Calendar</CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground pr-16">
                  Upcoming Releases
                </CardDescription>
                <span className="absolute bottom-6 right-6 text-sm font-medium text-muted-foreground">8 events</span>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card" onClick={() => setSelectedContent('/settings')}>
              <CardContent className="p-6 relative pb-12">
                <div className="flex items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-transparent">
                      <Mail className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">Email Settings</CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground pr-16">
                  Customize your notifications
                </CardDescription>
                <span className="absolute bottom-6 right-6 text-sm font-medium text-muted-foreground">5 types</span>
              </CardContent>
            </Card>
            {showParticipationHistory && <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card" onClick={() => setSelectedContent('/history')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-transparent">
                      <History className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">Participation History</CardTitle>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">24 entries</span>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Your Scriptured journey timeline
                </CardDescription>
              </CardContent>
            </Card>}
            {isGodlyCircleMember && <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card" onClick={() => setSelectedContent('/bts')}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-transparent">
                        <Eye className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">Behind-the-Scenes</CardTitle>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">6 videos</span>
                  </div>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    Exclusive member content
                  </CardDescription>
                </CardContent>
              </Card>}
          </div>
        </div>,
      // Individual content pages for sidebar items
      '/wishlist': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">Wishlist</h2>
          <p className="text-muted-foreground mb-8">Your saved items across all drops</p>
          <div className="space-y-6">
            {/* Wishlist Stats */}
            <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-muted-foreground">12 Sacred Items Saved</span>
              </div>
              <button className="text-xs text-primary hover:text-primary-foreground transition-colors">
                Clear All
              </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Coming Soon Products */}
              {/* Product Card 2 - Sacred Light Hoodie */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop" alt="Sacred Light Hoodie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Sacred Light Hoodie
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      365 Collection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
                      Notify Me
                    </button>
                    <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 5 - Sanctuary Cap */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop" alt="Sanctuary Cap" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Sanctuary Cap
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      The 12 Collection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
                      Notify Me
                    </button>
                    <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Available Products */}
              {/* Product Card 1 - Divine Essence Pendant */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop" alt="Divine Essence Pendant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Divine Essence Pendant
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      The 12 Collection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 4 - Divine Grace Tee */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop" alt="Divine Grace Tee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Divine Grace Tee
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      365 Collection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sold Out Products */}
              {/* Product Card 3 - Celestial Ring */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-75">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop" alt="Celestial Ring" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full">
                      Sold Out
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors">
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Celestial Ring
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      The 12 Collection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                      Sold Out
                    </button>
                    <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 6 */}
              <div className="group bg-card rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Plus className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">More Items</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      Explore Collection
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      Discover More
                    </p>
                  </div>
                  <button className="w-full bg-muted text-muted-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors" onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                  }}>
                    Browse All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
      '/orders': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">My Orders</h2>
          <p className="text-muted-foreground mb-8">View your past Scriptured pieces</p>
          <div className="space-y-8">
            {/* Orders Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card to-card/50 rounded-2xl border border-border/20">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-lg font-serif text-foreground">Sacred Journey</h3>
                  <p className="text-sm text-muted-foreground">3 Divine Pieces Acquired</p>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary-foreground transition-colors px-3 py-1 rounded-lg hover:bg-primary/10">
                View All Orders
              </button>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

              {/* Order Items */}
              <div className="space-y-6">
                {/* Order 1 - In Production */}
                <div className="relative flex gap-6 group">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-background">
                      <Settings className="h-5 w-5 text-white animate-spin" />
                    </div>
                  </div>
                  
                  {/* Order Content */}
                  <div className="flex-1 bg-card rounded-2xl border border-border/20 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">Celestial Ring</h4>
                        <p className="text-sm text-primary font-medium">Piece 003 of 031</p>
                        <p className="text-xs text-muted-foreground">Ordered December 5, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-medium rounded-full border border-yellow-500/20">
                          In Production
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        ⚡ Handcrafted with Divine Precision
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Estimated completion: December 28, 2024
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-colors">
                        <Eye className="h-4 w-4" />
                        Production Updates
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-sm font-medium transition-colors">
                        <Gem className="h-4 w-4" />
                        NFT Receipt
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted text-muted-foreground rounded-lg text-sm font-medium transition-colors">
                        <Package className="h-4 w-4" />
                        Order Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order 2 - Shipped */}
                <div className="relative flex gap-6 group">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-background">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Order Content */}
                  <div className="flex-1 bg-card rounded-2xl border border-border/20 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">Sacred Light Hoodie</h4>
                        <p className="text-sm text-primary font-medium">Piece 157 of 365</p>
                        <p className="text-xs text-muted-foreground">Ordered December 10, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full border border-blue-500/20">
                          Shipped
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        📦 Tracking: SP2024120800157
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected delivery: December 22, 2024
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors">
                        <Eye className="h-4 w-4" />
                        Live Tracking
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted text-muted-foreground rounded-lg text-sm font-medium transition-colors">
                        <Package className="h-4 w-4" />
                        Order Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order 3 - Delivered */}
                <div className="relative flex gap-6 group">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-background">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Order Content */}
                  <div className="flex-1 bg-card rounded-2xl border border-border/20 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">Divine Essence Pendant</h4>
                        <p className="text-sm text-primary font-medium">Piece 018 of 365</p>
                        <p className="text-xs text-muted-foreground">Ordered December 15, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                          Delivered
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                        <Eye className="h-4 w-4" />
                        Track Package
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted text-muted-foreground rounded-lg text-sm font-medium transition-colors">
                        <Package className="h-4 w-4" />
                        Order Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline End */}
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-sm text-muted-foreground italic">Your journey continues...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card/50 rounded-xl p-4 border border-border/20 col-span-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Total Delivered</p>
                      <p className="text-xs text-muted-foreground">1 Divine Piece</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Show Order History
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>,
      '/preorders': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">Pre-order Status</h2>
          <p className="text-muted-foreground mb-8">Track status of your active orders</p>
          <div className="space-y-8">
            {/* Pre-order Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card via-primary/5 to-card rounded-2xl border border-border/20">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-lg font-serif text-foreground">Sacred Manifestation</h3>
                  <p className="text-sm text-muted-foreground">2 Divine Pieces in Creation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next Delivery</p>
                <p className="text-sm font-medium text-primary">Dec 28, 2024</p>
              </div>
            </div>

            {/* Pre-order Items */}
            <div className="space-y-8">
              {/* Pre-order 1 - In Production */}
              <div className="group bg-card rounded-2xl border border-border/20 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop" alt="Divine Wisdom Ring" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        Divine Wisdom Ring
                      </h4>
                      <p className="text-sm text-primary font-medium">Piece 007 of 012</p>
                      <p className="text-xs text-muted-foreground">Pre-ordered November 28, 2024</p>
                      <button className="text-xs text-primary hover:text-primary-foreground transition-colors underline decoration-dotted">
                        Read the Sacred Story →
                      </button>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-sm font-medium text-foreground">Creation Progress</h5>
                      <span className="text-xs text-muted-foreground">Est. Ship: Dec 28, 2024</span>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute top-6 left-4 right-4 h-0.5 bg-muted"></div>
                      <div className="absolute top-6 left-4 h-0.5 bg-primary transition-all duration-1000" style={{
                      width: '50%'
                    }}></div>
                      
                      {/* Steps */}
                      <div className="relative flex justify-between">
                        {/* Step 1 - Confirmed (Complete) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg ring-2 ring-background relative z-10">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-foreground">Confirmed</p>
                            <p className="text-xs text-green-500">✓ Complete</p>
                          </div>
                        </div>
                        
                        {/* Step 2 - In Production (Active) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-background relative z-10 animate-pulse">
                            <Settings className="w-3 h-3 text-white animate-spin" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-foreground">In Production</p>
                            <p className="text-xs text-yellow-500">⚡ Now crafting</p>
                          </div>
                        </div>
                        
                        {/* Step 3 - Packaging (Pending) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-2 border-border relative z-10">
                            <Package className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Packaging</p>
                            <p className="text-xs text-muted-foreground">Awaiting</p>
                          </div>
                        </div>
                        
                        {/* Step 4 - Shipped (Pending) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-2 border-border relative z-10">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Shipped</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Stage Update */}
                    <div className="mt-6 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Production Update</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your ring is being hand-forged with sacred metals. Master artisan begins final engravings tomorrow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-order 2 - Packaging */}
              <div className="group bg-card rounded-2xl border border-border/20 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex gap-4 flex-1">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=80&h=80&fit=crop" alt="Sanctuary Medallion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        Sanctuary Medallion
                      </h4>
                      <p className="text-sm text-primary font-medium">Piece 289 of 365</p>
                      <p className="text-xs text-muted-foreground">Pre-ordered December 1, 2024</p>
                      <button className="text-xs text-primary hover:text-primary-foreground transition-colors underline decoration-dotted">
                        Read the Sacred Story →
                      </button>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-sm font-medium text-foreground">Creation Progress</h5>
                      <span className="text-xs text-muted-foreground">Est. Ship: Dec 22, 2024</span>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute top-6 left-4 right-4 h-0.5 bg-muted"></div>
                      <div className="absolute top-6 left-4 h-0.5 bg-primary transition-all duration-1000" style={{
                      width: '75%'
                    }}></div>
                      
                      {/* Steps */}
                      <div className="relative flex justify-between">
                        {/* Step 1 - Confirmed (Complete) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg ring-2 ring-background relative z-10">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-foreground">Confirmed</p>
                            <p className="text-xs text-green-500">✓ Complete</p>
                          </div>
                        </div>
                        
                        {/* Step 2 - In Production (Complete) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg ring-2 ring-background relative z-10">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-foreground">In Production</p>
                            <p className="text-xs text-green-500">✓ Complete</p>
                          </div>
                        </div>
                        
                        {/* Step 3 - Packaging (Active) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-background relative z-10 animate-pulse">
                            <Package className="w-3 h-3 text-white" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-foreground">Packaging</p>
                            <p className="text-xs text-blue-500">📦 Ready soon</p>
                          </div>
                        </div>
                        
                        {/* Step 4 - Shipped (Pending) */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border-2 border-border relative z-10">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Shipped</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Stage Update */}
                    <div className="mt-6 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Packaging Update</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your medallion is being carefully wrapped in sacred cloth. Blessing ceremony completed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-foreground mb-1">Divine Patience Rewarded</h4>
                  <p className="text-sm text-muted-foreground">
                    Each piece is crafted with intention and blessed with purpose. Your sacred items are worth the wait.
                  </p>
                </div>
                <button className="px-6 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                  View Creation Stories
                </button>
              </div>
            </div>
          </div>
        </div>,
      '/godly-circle': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            GODLY CIRCLE
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Exclusive monthly access to sacred content and divine experiences
          </p>
          
          <div className="space-y-8">
            {/* Status Header */}
            <div className={`relative overflow-hidden rounded-2xl border-2 p-8 ${isGodlyCircleMember ? "border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background" : "border-border bg-gradient-to-br from-card to-card/50"}`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isGodlyCircleMember ? "bg-primary/20" : "bg-muted"}`}>
                      <Crown className={`h-6 w-6 ${isGodlyCircleMember ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-foreground">
                        {isGodlyCircleMember ? "Divine Access Granted" : "Awaiting Selection"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isGodlyCircleMember ? "January 2025 • Member #47" : "Application Status"}
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${isGodlyCircleMember ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"}`}>
                    {isGodlyCircleMember ? "SELECTED" : "PENDING"}
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">7</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">14</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">23</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">45</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Seconds</div>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {isGodlyCircleMember ? "Until February selection opens" : "Until next monthly selection"}
                </p>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            {isGodlyCircleMember ? (/* Member Content */
          <div className="space-y-8">
                {/* Monthly Content */}
                <div className="bg-card rounded-2xl border border-border/20 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Eye className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">January Sacred Content</h4>
                  </div>

                  {/* Featured Video */}
                  <div className="bg-gradient-to-br from-muted to-muted/50 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">Behind the Divine Design</h5>
                        <p className="text-sm text-muted-foreground">Exclusive creation process • 24 min</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Go behind the scenes as we craft this month's sacred pieces. Witness the divine inspiration, 
                      the meticulous attention to detail, and the spiritual significance embedded in each creation.
                    </p>
                    <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Watch Exclusive Content
                    </button>
                  </div>

                  {/* Additional Perks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Early Access</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        3-day head start on all new drops
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Gem className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Member Pricing</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        15% discount on all sacred pieces
                      </p>
                    </div>
                  </div>
                </div>
              </div>) : (/* Non-Member Content */
          <div className="space-y-8">
                {/* Application Stats */}
                <div className="bg-card rounded-2xl border border-border/20 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">February 2025 Selection</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">847</div>
                      <div className="text-sm text-muted-foreground">Total Applicants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground mb-2">{new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}</div>
                      <div className="text-sm text-muted-foreground">Available Spots</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">{(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() / 847 * 100).toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">Selection Rate</div>
                    </div>
                  </div>

                  {/* How it Works */}
                  <div className="bg-muted/30 rounded-xl p-6 mb-6">
                    <h5 className="font-semibold text-foreground mb-4">How Godly Circle Works</h5>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Monthly Selection</p>
                          <p className="text-xs text-muted-foreground"><span>{new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}</span> divine souls chosen each month based on spiritual alignment and community engagement</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Sacred Access</p>
                          <p className="text-xs text-muted-foreground">Exclusive behind-the-scenes content and access to drops 'The 12' exclusive drop</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Divine Community</p>
                          <p className="text-xs text-muted-foreground">Connect with Scriptured team members in our sacred digital sanctuary</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Button */}
                  <button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                    Apply for Divine Selection
                  </button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Applications close in 7 days • Selection announced January 31st
                  </p>
                </div>

                {/* Preview of Member Benefits */}
                <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl border border-primary/10 p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-serif text-foreground mb-2">What Awaits the Few</h4>
                    <p className="text-sm text-muted-foreground">
                      A glimpse into the divine privileges reserved for Godly Circle members
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 rounded-xl border border-border/20">
                      <Eye className="h-5 w-5 text-primary mb-2" />
                      <h6 className="font-medium text-foreground mb-1">Sacred Archives</h6>
                      <p className="text-xs text-muted-foreground">Monthly exclusive videos revealing the divine process behind each creation</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-xl border border-border/20">
                      <Gift className="h-5 w-5 text-primary mb-2" />
                      <h6 className="font-medium text-foreground mb-1">Divine Priority</h6>
                      <p className="text-xs text-muted-foreground">Early access to all drops and exclusive member-only pieces</p>
                    </div>
                    
                    <div className="p-4 bg-background/50 rounded-xl border border-border/20">
                      <Heart className="h-5 w-5 text-primary mb-2" />
                      <h6 className="font-medium text-foreground mb-1">Divine Community</h6>
                      <p className="text-xs text-muted-foreground">Connect with fellow chosen souls in our private sanctuary</p>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>,
      '/nft-vault': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            NFT VAULT
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Your digital twins and authenticity tokens secured on the blockchain
          </p>
          
          <div className="space-y-8">
            {/* Vault Stats Header */}
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border/20 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">5</div>
                  <div className="text-sm text-muted-foreground">Sacred Tokens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">$2,847</div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">ETH</div>
                  <div className="text-sm text-muted-foreground">Blockchain</div>
                </div>
              </div>
            </div>

            {/* NFT Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* NFT Token 1 */}
              <div className="group bg-card rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop" alt="Divine Essence Pendant NFT" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-sm">Divine Essence Pendant</h4>
                      <p className="text-xs opacity-80">Token #DES-018</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Minted</span>
                      <span className="text-xs font-medium text-foreground">Dec 15, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-xs font-medium text-primary">0.45 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-500">Owned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      View on Chain
                    </button>
                    <button className="flex-1 border border-border hover:bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      Download Cert
                    </button>
                  </div>
                </div>
              </div>

              {/* NFT Token 2 */}
              <div className="group bg-card rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop" alt="Sacred Light Hoodie NFT" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-sm">Sacred Light Hoodie</h4>
                      <p className="text-xs opacity-80">Token #SLH-157</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Minted</span>
                      <span className="text-xs font-medium text-foreground">Dec 10, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-xs font-medium text-primary">0.28 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-500">Owned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      View on Chain
                    </button>
                    <button className="flex-1 border border-border hover:bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      Download Cert
                    </button>
                  </div>
                </div>
              </div>

              {/* NFT Token 3 */}
              <div className="group bg-card rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop" alt="Celestial Ring NFT" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-sm">Celestial Ring</h4>
                      <p className="text-xs opacity-80">Token #CR-003</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Minted</span>
                      <span className="text-xs font-medium text-foreground">Nov 28, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-xs font-medium text-primary">1.2 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-500">Owned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      View on Chain
                    </button>
                    <button className="flex-1 border border-border hover:bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      Download Cert
                    </button>
                  </div>
                </div>
              </div>

              {/* NFT Token 4 */}
              <div className="group bg-card rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop" alt="Divine Grace Tee NFT" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-sm">Divine Grace Tee</h4>
                      <p className="text-xs opacity-80">Token #DGT-089</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Minted</span>
                      <span className="text-xs font-medium text-foreground">Nov 15, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-xs font-medium text-primary">0.18 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-500">Owned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      View on Chain
                    </button>
                    <button className="flex-1 border border-border hover:bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      Download Cert
                    </button>
                  </div>
                </div>
              </div>

              {/* NFT Token 5 */}
              <div className="group bg-card rounded-2xl border border-border/20 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop" alt="Sanctuary Cap NFT" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Gem className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white">
                      <h4 className="font-semibold text-sm">Sanctuary Cap</h4>
                      <p className="text-xs opacity-80">Token #SC-042</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Minted</span>
                      <span className="text-xs font-medium text-foreground">Oct 30, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-xs font-medium text-primary">0.12 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-500">Owned</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary/10 text-primary py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      View on Chain
                    </button>
                    <button className="flex-1 border border-border hover:bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      Download Cert
                    </button>
                  </div>
                </div>
              </div>

              {/* Add More NFTs Card */}
              <div className="group bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Mint New NFT</h4>
                      <p className="text-sm text-muted-foreground">Purchase sacred items to expand your digital vault</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Explore Sacred Items
                  </button>
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Gem className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Eternal Digital Sanctity</h4>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Each NFT serves as an immutable certificate of authenticity, forever linking your physical sacred item 
                    to its digital twin on the Ethereum blockchain. Your divine collection transcends the physical realm.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  <span>• Ethereum Blockchain</span>
                  <span>• ERC-721 Standard</span>
                  <span>• IPFS Metadata</span>
                  <span>• Lifetime Authenticity</span>
                </div>
              </div>
            </div>
          </div>
        </div>,
      '/fit-profile': <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                CORPORIS FORMA
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm tracking-wide uppercase">Sacred Measurements & Divine Proportions</p>
            </div>
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-foreground/40 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Edit Profile
            </Button>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Current Measurements */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl font-serif flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                  Sacred Measurements
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 text-sm">Your divine proportions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-muted/30 hover:border-muted/60 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Height</label>
                      <Select value={heightMetric} onValueChange={(value: "imperial" | "metric") => setHeightMetric(value)}>
                        <SelectTrigger className="w-16 sm:w-20 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imperial">ft/in</SelectItem>
                          <SelectItem value="metric">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {heightMetric === "imperial" ? <>
                          <div className="flex-1">
                            <Input type="number" value={heightFeet} onChange={(e) => setHeightFeet(parseInt(e.target.value) || 5)} min="3" max="8" className="text-3xl sm:text-5xl font-mono text-center border-0 bg-transparent p-0 h-10 sm:h-14 focus:ring-0 focus:border-0" />
                          </div>
                          <span className="text-3xl sm:text-5xl font-mono text-muted-foreground">'</span>
                          <div className="flex-1">
                            <Input type="number" value={heightInches} onChange={(e) => setHeightInches(parseInt(e.target.value) || 9)} min="0" max="11" className="text-3xl sm:text-5xl font-mono text-center border-0 bg-transparent p-0 h-10 sm:h-14 focus:ring-0 focus:border-0" />
                          </div>
                          <span className="text-3xl sm:text-5xl font-mono text-muted-foreground">"</span>
                        </> : <>
                          <Input type="number" value={heightCm} onChange={(e) => setHeightCm(parseInt(e.target.value) || 175)} min="100" max="250" className="text-3xl sm:text-5xl font-mono text-center border-0 bg-transparent p-0 h-10 sm:h-14 focus:ring-0 focus:border-0 flex-1" />
                          <span className="text-sm sm:text-lg font-mono text-muted-foreground">cm</span>
                        </>}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-muted/30 hover:border-muted/60 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Weight</label>
                      <Select value={weightMetric} onValueChange={(value: "imperial" | "metric") => setWeightMetric(value)}>
                        <SelectTrigger className="w-14 sm:w-16 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imperial">lbs</SelectItem>
                          <SelectItem value="metric">kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Input type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value) || 165)} min="50" max="500" className="text-xl sm:text-2xl font-mono text-center border-0 bg-transparent p-0 h-7 sm:h-8 focus:ring-0 focus:border-0" />
                      <span className="text-sm sm:text-lg font-mono text-muted-foreground">{weightMetric === "imperial" ? "lbs" : "kg"}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-muted/30">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">RECOMMENDED SIZE</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">M</span>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fit Preferences */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl font-serif flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-secondary to-secondary/60 rounded-full"></div>
                  Fit Preferences
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 text-sm">How you like your garments to fit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg border border-muted/30 hover:border-muted/60 transition-colors">
                    <span className="text-sm font-medium">RECOMMENDED SIZE</span>
                    <select className="px-2 py-1 bg-muted/40 rounded text-xs border-0 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="fitted">Fitted</option>
                      <option value="regular">Regular</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border border-muted/30 hover:border-muted/60 transition-colors">
                    <span className="text-sm font-medium">Hoodies</span>
                    <select className="px-2 py-1 bg-muted/40 rounded text-xs border-0 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="fitted">Fitted</option>
                      <option value="regular">Regular</option>
                      <option value="relaxed" selected>Relaxed</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border border-muted/30 hover:border-muted/60 transition-colors">
                    <span className="text-sm font-medium">Jackets</span>
                    <select className="px-2 py-1 bg-muted/40 rounded text-xs border-0 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="fitted">Fitted</option>
                      <option value="regular" selected>Regular</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sizing History */}
            <Card className="lg:col-span-2 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl font-serif flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                  Sizing History
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 text-sm">Your past purchases and how they fit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[{
                  item: "Divine Essence Tee",
                  size: "M",
                  fit: "Perfect",
                  date: "Jan 2024",
                  satisfaction: "Excellent"
                }, {
                  item: "Sacred Geometry Hoodie",
                  size: "L",
                  fit: "Too Loose",
                  date: "Dec 2023",
                  satisfaction: "Good"
                }, {
                  item: "Ethereal Bomber",
                  size: "M",
                  fit: "Perfect",
                  date: "Nov 2023",
                  satisfaction: "Excellent"
                }].map((entry, i) => <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-muted/30 hover:border-muted/60 transition-all duration-300 hover:bg-muted/20 gap-2 sm:gap-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm sm:text-base">{entry.item}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <span className="px-2 py-1 bg-background rounded border text-xs">Size {entry.size}</span>
                        <span className={`px-2 py-1 rounded text-xs ${entry.fit === 'Perfect' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {entry.fit}
                        </span>
                        <span className="text-muted-foreground hidden sm:inline">{entry.satisfaction}</span>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Size Recommendation Engine */}
            <Card className="lg:col-span-2 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl font-serif flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  Future Drop Recommendations
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 text-sm">AI-powered sizing for upcoming releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 sm:p-6 border border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div>
                      <h4 className="font-medium text-foreground mb-1 text-sm sm:text-base">Next Drop: "Celestial Collection"</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Based on your history and measurements</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xl sm:text-2xl font-mono text-primary">M</span>
                      <p className="text-xs text-muted-foreground">Recommended</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-muted-foreground">95% confidence • Perfect fit expected</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full group hover:bg-primary/10 hover:border-primary/40 transition-all duration-300">
                    Enable Auto-Size for Future Drops
                    <Crown className="h-3 w-3 ml-2 group-hover:text-primary transition-colors" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>,
      '/calendar': <div className="animate-fade-in">
          <div className="mb-8">
            <div>
              <h2 className="text-3xl font-serif mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                CALENDARIUM SACRUM
              </h2>
              <p className="text-muted-foreground text-sm tracking-wide uppercase mb-4">Divine Schedule of Sacred Releases</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-foreground/40">
                  <Calendar className="h-4 w-4 mr-2" />
                  Export Calendar
                </Button>
                <Button variant="default" size="sm" className="group hover:shadow-lg transition-all duration-300">
                  <Mail className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  Email Alerts
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Mini Calendar */}
            <Card className="lg:col-span-2 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                        setCurrentMonth(prevMonth);
                        setCurrentYear(prevYear);
                      }}
                    >
                      <span className="text-lg">‹</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        const nextMonth = (currentMonth + 1) % 12;
                        const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
                        setCurrentMonth(nextMonth);
                        setCurrentYear(nextYear);
                      }}
                    >
                      <span className="text-lg">›</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2 uppercase tracking-wider">
                      {day}
                    </div>)}
                  
                  {/* Calendar Days */}
                  {(() => {
                    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                    const today = new Date();
                    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
                    
                    return Array.from({ length: daysInMonth + firstDayOfMonth }, (_, i) => {
                      if (i < firstDayOfMonth) {
                        return <div key={`empty-${i}`} className="aspect-square" />;
                      }
                      
                      const day = i - firstDayOfMonth + 1;
                      const hasEvent = [5, 12, 18, 25].includes(day);
                      const isGodlyCircle = [12, 25].includes(day);
                      const isToday = isCurrentMonth && day === today.getDate();
                      
                      return <div key={day} className={`
                          aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-300 cursor-pointer relative
                          ${isToday ? 'bg-primary text-primary-foreground font-bold ring-2 ring-primary/30' : hasEvent ? 'bg-muted/50 hover:bg-muted text-foreground font-medium' : 'hover:bg-muted/30 text-muted-foreground'}
                        `}>
                        {day}
                        {hasEvent && <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isGodlyCircle ? 'bg-yellow-500' : 'bg-primary'}`} />}
                      </div>;
                    });
                  })()}
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-muted/30">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Regular Drop</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-muted-foreground">Godly Circle</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">Event</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events Sidebar */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-secondary to-secondary/60 rounded-full"></div>
                  Upcoming
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Next sacred releases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[{
                date: "Jan 5",
                time: "12:00 PM EST",
                title: "Ethereal Veil Drop",
                type: "Limited Release",
                isGodly: false,
                pieces: "12 pieces"
              }, {
                date: "Jan 12",
                time: "11:00 AM EST",
                title: "Godly Circle Access",
                type: "Member Exclusive",
                isGodly: true,
                pieces: "Early access"
              }, {
                date: "Jan 18",
                time: "2:00 PM EST",
                title: "Divine Symposium",
                type: "Virtual Event",
                isGodly: false,
                pieces: "Live stream"
              }].map((event, i) => <div key={i} className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer group/event hover:shadow-md ${event.isGodly ? 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50' : 'border-muted/30 hover:border-muted/60 hover:bg-muted/20'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-primary">{event.date}</span>
                        {event.isGodly && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1 group-hover/event:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{event.type}</span>
                      <span className="text-xs font-medium text-muted-foreground">{event.pieces}</span>
                    </div>
                  </div>)}
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="lg:col-span-3 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                  Featured: Ethereal Veil Collection
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Next major drop • January 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Collection Details</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 12 Limited Edition Pieces</li>
                        <li>• Handcrafted Sacred Geometry</li>
                        <li>• Premium Ethereal Materials</li>
                        <li>• NFT Authentication Included</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Release Schedule</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Godly Circle:</span>
                          <span className="text-primary font-medium">Jan 5, 11:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Public Release:</span>
                          <span className="text-foreground font-medium">Jan 5, 12:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Final Call:</span>
                          <span className="text-muted-foreground">Until sold out</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Eye className="h-3 w-3 mr-2" />
                          View Lookbook
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Heart className="h-3 w-3 mr-2" />
                          Add to Wishlist
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Mail className="h-3 w-3 mr-2" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Alerts Settings */}
            <Card className="lg:col-span-3 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  Divine Notifications
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Customize your sacred alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[{
                  title: "Drop Announcements",
                  desc: "New collection reveals",
                  enabled: true
                }, {
                  title: "Godly Circle Events",
                  desc: "Exclusive member access",
                  enabled: true
                }, {
                  title: "Pre-Release Alerts",
                  desc: "24hr before drops",
                  enabled: false
                }, {
                  title: "Restock Notifications",
                  desc: "Sold out items return",
                  enabled: true
                }].map((setting, i) => <div key={i} className="p-4 rounded-lg border border-muted/30 hover:border-muted/60 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{setting.title}</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors ${setting.enabled ? 'bg-primary' : 'bg-muted'} relative cursor-pointer`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>,
      '/settings': <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                EPISTOLAE DIVINAE
              </h2>
              <p className="text-muted-foreground text-sm tracking-wide uppercase">Sacred Communication Preferences</p>
            </div>
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-foreground/40">
              <Settings className="h-4 w-4 mr-2 group-hover:rotate-45 transition-transform duration-300" />
              Advanced
            </Button>
          </div>

          <div className="space-y-6">
            {/* Email Account Section */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                  Account Email
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Your primary contact for all sacred communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-muted/30 hover:border-muted/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-foreground font-mono">divine.soul@temple.com</span>
                      <p className="text-xs text-muted-foreground mt-1">Primary • Verified</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Email verified on January 15, 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-secondary to-secondary/60 rounded-full"></div>
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Choose which divine messages reach your sanctuary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationPrefs.map((pref, i) => <div key={i} className="group/item flex items-center justify-between p-4 rounded-lg border border-muted/30 hover:border-muted/60 transition-all duration-300 hover:bg-muted/10">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-background/50 group-hover/item:bg-primary/10 transition-colors">
                        <pref.icon className="h-5 w-5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{pref.title}</h4>
                        <p className="text-sm text-muted-foreground">{pref.description}</p>
                        <span className="text-xs text-muted-foreground/60 mt-1 block">{pref.frequency}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleNotificationPref(i)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${pref.enabled ? 'bg-primary' : 'bg-muted'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pref.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>)}
              </CardContent>
            </Card>

            {/* Email Frequency Controls */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                  Communication Frequency
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Control the flow of divine messages to your realm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => setEmailFrequency("real-time")} className={`p-4 rounded-lg border transition-colors cursor-pointer text-left ${emailFrequency === "real-time" ? "bg-primary/10 border-primary/40" : "bg-background/50 border-muted/30 hover:border-primary/40"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${emailFrequency === "real-time" ? "bg-primary" : "bg-muted"}`}></div>
                      <span className="font-medium text-foreground">Real-time</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive messages as they occur</p>
                  </button>
                  <button onClick={() => setEmailFrequency("daily")} className={`p-4 rounded-lg border transition-colors cursor-pointer text-left ${emailFrequency === "daily" ? "bg-primary/10 border-primary/40" : "bg-background/50 border-muted/30 hover:border-muted/60"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${emailFrequency === "daily" ? "bg-primary" : "bg-muted"}`}></div>
                      <span className="font-medium text-foreground">Daily Digest</span>
                    </div>
                    <p className="text-sm text-muted-foreground">One summary email per day</p>
                  </button>
                  <button onClick={() => setEmailFrequency("weekly")} className={`p-4 rounded-lg border transition-colors cursor-pointer text-left ${emailFrequency === "weekly" ? "bg-primary/10 border-primary/40" : "bg-background/50 border-muted/30 hover:border-muted/60"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${emailFrequency === "weekly" ? "bg-primary" : "bg-muted"}`}></div>
                      <span className="font-medium text-foreground">Weekly Digest</span>
                    </div>
                    <p className="text-sm text-muted-foreground">One summary email per week</p>
                  </button>
                  <button onClick={() => setEmailFrequency("important")} className={`p-4 rounded-lg border transition-colors cursor-pointer text-left ${emailFrequency === "important" ? "bg-primary/10 border-primary/40" : "bg-background/50 border-muted/30 hover:border-muted/60"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${emailFrequency === "important" ? "bg-primary" : "bg-muted"}`}></div>
                      <span className="font-medium text-foreground">Important Only</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Critical updates only</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Pause & Unsubscribe Options */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-destructive/5 backdrop-blur-sm border-destructive/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-destructive/60 to-destructive/40 rounded-full"></div>
                  Silence Controls
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Temporarily pause or permanently end communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 p-4 rounded-lg bg-background/50 border border-muted/30 hover:border-yellow-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">Pause Emails</h4>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Temporarily halt all communications for a chosen period</p>
                    <Button variant="outline" size="sm" className="w-full border-yellow-500/30 hover:border-yellow-500/60 text-yellow-500 hover:text-yellow-500">
                      Pause for 30 Days
                    </Button>
                  </div>
                  
                  <div className="flex-1 p-4 rounded-lg bg-background/50 border border-destructive/30 hover:border-destructive/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">Unsubscribe</h4>
                      <X className="h-5 w-5 text-destructive" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Permanently end all email communications from our divine realm</p>
                    <Button variant="outline" size="sm" className="w-full border-destructive/30 hover:border-destructive/60 text-destructive hover:text-destructive">
                      Unsubscribe All
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-amber-500 text-xs">!</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-1">Important Notice</h5>
                      <p className="text-sm text-muted-foreground">
                        Unsubscribing will prevent you from receiving critical order updates, 
                        drop notifications, and exclusive Godly Circle communications. 
                        You can always re-subscribe from your account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>,
      '/history': <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                ACTA SANCTORUM
              </h2>
              <p className="text-muted-foreground text-sm tracking-wide uppercase">Sacred Journey • Divine Timeline</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Activity Stats Overview */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  Journey Overview
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Your sacred activities at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-mono text-primary mb-2">24</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Activities</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-mono text-secondary mb-2">8</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Purchases</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-mono text-accent mb-2">12</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Circle Attempts</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-muted/20 hover:border-muted/40 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-mono text-foreground mb-2">4</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Redemptions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Controls */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Activity filter buttons">
                    <Button variant={activityFilter === "all" ? "default" : "outline"} size="sm" className="text-xs hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2" onClick={() => setActivityFilter("all")}>
                      All Activities
                    </Button>
                    <Button variant={activityFilter === "purchases" ? "default" : "outline"} size="sm" className="text-xs hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2" onClick={() => setActivityFilter("purchases")}>
                      Purchases
                    </Button>
                    <Button variant={activityFilter === "godly-circle" ? "default" : "outline"} size="sm" className="text-xs hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2" onClick={() => setActivityFilter("godly-circle")}>
                      Godly Circle
                    </Button>
                    <Button variant={activityFilter === "nft" ? "default" : "outline"} size="sm" className="text-xs hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2" onClick={() => setActivityFilter("nft")}>
                      NFT Activity
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Calendar className="h-4 w-4 mr-1" />
                      By Date
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Package className="h-4 w-4 mr-1" />
                      By Event
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline of Activities */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                  Sacred Timeline
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Your complete journey through the divine realm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[{
                type: "purchase",
                title: "Divine Essence Tee",
                description: "Purchased Size M • Order #SE-2024-001",
                date: "January 15, 2024",
                time: "2:34 PM",
                amount: "$89.00",
                status: "Delivered",
                icon: Package,
                color: "primary"
              }, {
                type: "godly-circle",
                title: "Godly Circle Application",
                description: "Applied for January 2024 cohort",
                date: "January 1, 2024",
                time: "11:59 PM",
                amount: null,
                status: "Selected",
                icon: Crown,
                color: "secondary"
              }, {
                type: "nft",
                title: "NFT Minted",
                description: "Sacred Geometry Hoodie Digital Twin",
                date: "December 18, 2023",
                time: "3:45 PM",
                amount: "0.15 ETH",
                status: "Minted",
                icon: Gem,
                color: "primary"
              }, {
                type: "purchase",
                title: "Sacred Geometry Hoodie",
                description: "Purchased Size L • Order #SG-2023-089",
                date: "December 15, 2023",
                time: "1:22 PM",
                amount: "$129.00",
                status: "Delivered",
                icon: Package,
                color: "primary"
              }, {
                type: "godly-circle",
                title: "Godly Circle Attempt",
                description: "Applied for December 2023 cohort",
                date: "December 1, 2023",
                time: "11:45 PM",
                amount: null,
                status: "Not Selected",
                icon: Crown,
                color: "muted"
              }, {
                type: "purchase",
                title: "Ethereal Bomber Jacket",
                description: "Purchased Size M • Order #EB-2023-067",
                date: "November 20, 2023",
                time: "7:30 PM",
                amount: "$189.00",
                status: "Delivered",
                icon: Package,
                color: "primary"
              }].filter(activity => {
                if (activityFilter === "all") return true;
                if (activityFilter === "purchases") return activity.type === "purchase";
                if (activityFilter === "godly-circle") return activity.type === "godly-circle";
                if (activityFilter === "nft") return activity.type === "nft";
                return true;
              }).map((activity, i) => <div key={i} className="group/item relative flex gap-4 p-4 rounded-lg border border-muted/30 hover:border-muted/60 transition-all duration-300 hover:bg-muted/10 hover:shadow-lg hover:-translate-y-1">
                    {/* Timeline Connector */}
                    {i !== 7 && <div className="absolute left-8 top-16 w-0.5 h-6 bg-gradient-to-b from-muted/40 to-transparent"></div>}
                    
                    {/* Activity Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${activity.color}/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300`}>
                      <activity.icon className={`h-4 w-4 text-${activity.color}`} />
                    </div>
                    
                    {/* Activity Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{activity.date}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.amount && <div className="text-sm font-medium text-foreground mb-1">
                              {activity.amount}
                            </div>}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'Delivered' || activity.status === 'Selected' || activity.status === 'Minted' || activity.status === 'Used' || activity.status === 'Redeemed' ? 'bg-green-500/20 text-green-300' : activity.status === 'Not Selected' ? 'bg-muted text-muted-foreground' : 'bg-blue-500/20 text-blue-300'}`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </CardContent>
            </Card>

            {/* Loyalty & Gamification Preview */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  Sacred Rewards System
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">Your divine loyalty progress • Future expansion ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Level */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-lg text-foreground mb-1">Divine Seeker</h4>
                      <p className="text-sm text-muted-foreground">Level 3 • Sacred Status</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono text-primary">1,250</div>
                      <p className="text-xs text-muted-foreground">Sacred Points</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Divine Guardian</span>
                      <span className="text-foreground">1,250 / 2,000 pts</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000" style={{
                      width: '62.5%'
                    }}></div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">Recent Achievements</h5>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[{
                    name: "First Purchase",
                    description: "Welcome to the sacred realm",
                    icon: Package,
                    earned: true,
                    earnedDate: "Jan 15, 2024",
                    rarity: "common"
                  }, {
                    name: "Circle Member",
                    description: "Chosen for the divine circle",
                    icon: Crown,
                    earned: true,
                    earnedDate: "Jan 1, 2024",
                    rarity: "epic"
                  }, {
                    name: "NFT Collector",
                    description: "Guardian of digital sanctity",
                    icon: Gem,
                    earned: true,
                    earnedDate: "Dec 18, 2023",
                    rarity: "rare"
                  }, {
                    name: "Sacred Spender",
                    description: "Spend $500+ in sacred items",
                    icon: Heart,
                    earned: false,
                    earnedDate: null,
                    rarity: "legendary",
                    progress: 340,
                    target: 500
                  }].map((badge, i) => <div key={i} className={`group relative overflow-hidden rounded-xl border transition-all duration-500 hover:scale-105 hover:shadow-xl ${badge.earned ? badge.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-orange-500/20 border-yellow-500/40 shadow-lg shadow-yellow-500/20' : badge.rarity === 'epic' ? 'bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 border-purple-500/40 shadow-lg shadow-purple-500/20' : badge.rarity === 'rare' ? 'bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border-blue-500/40 shadow-lg shadow-blue-500/20' : 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/40 shadow-lg shadow-primary/20' : 'bg-muted/10 border-muted/30 hover:border-muted/50 grayscale'}`}>
                        {/* Badge Shine Effect */}
                        {badge.earned && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>}
                        
                        {/* Rarity Indicator */}
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${badge.earned ? badge.rarity === 'legendary' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : badge.rarity === 'epic' ? 'bg-purple-400 shadow-lg shadow-purple-400/50' : badge.rarity === 'rare' ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 'bg-primary shadow-lg shadow-primary/50' : 'bg-muted'}`}></div>
                        
                        {/* Badge Content */}
                        <div className="relative p-4 text-center">
                          {/* Icon Container */}
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${badge.earned ? badge.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-500/30 to-amber-500/30 group-hover:from-yellow-400/40 group-hover:to-amber-400/40' : badge.rarity === 'epic' ? 'bg-gradient-to-br from-purple-500/30 to-violet-500/30 group-hover:from-purple-400/40 group-hover:to-violet-400/40' : badge.rarity === 'rare' ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 group-hover:from-blue-400/40 group-hover:to-cyan-400/40' : 'bg-gradient-to-br from-primary/30 to-secondary/30 group-hover:from-primary/40 group-hover:to-secondary/40' : 'bg-muted/20'}`}>
                            <badge.icon className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${badge.earned ? badge.rarity === 'legendary' ? 'text-yellow-400' : badge.rarity === 'epic' ? 'text-purple-400' : badge.rarity === 'rare' ? 'text-blue-400' : 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          
                          {/* Badge Name */}
                          <h6 className={`font-semibold text-sm mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {badge.name}
                          </h6>
                          
                          {/* Badge Description */}
                          <p className={`text-xs leading-relaxed ${badge.earned ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                            {badge.description}
                          </p>
                          
                          {/* Progress Bar for Unearned Badges */}
                          {!badge.earned && badge.progress && badge.target && <div className="mt-3 space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>${badge.progress}</span>
                                <span>${badge.target}</span>
                              </div>
                              <div className="w-full bg-muted/30 rounded-full h-1">
                                <div className="bg-gradient-to-r from-primary to-secondary h-1 rounded-full transition-all duration-1000" style={{
                            width: `${badge.progress / badge.target * 100}%`
                          }}></div>
                              </div>
                            </div>}
                          
                          {/* Earned Date */}
                          {badge.earned && badge.earnedDate && <div className="mt-2 text-xs text-muted-foreground/80">
                              Earned {badge.earnedDate}
                            </div>}
                        </div>
                        
                        {/* Earned Badge Overlay */}
                        {badge.earned && <div className="absolute top-1 left-1 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                            ✓
                          </div>}
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>,
      '/bts': <div className="animate-fade-in">
          <h2 className="text-3xl font-serif mb-6">Behind-the-Scenes</h2>
          <p className="text-muted-foreground mb-8">Exclusive member content</p>
          <div className="bg-card rounded-lg p-6">
            <p className="text-muted-foreground">6 exclusive videos available</p>
          </div>
        </div>
    };
    return contentMap[contentKey] || null;
  };
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground w-full max-w-full overflow-x-hidden flex flex-col">
        <Navigation />
        
        {/* Header Stack */}
        <div className="bg-background border-b max-w-full pt-[30px]">
          {/* Mobile User Greeting */}
          {selectedContent?.includes("overview") && <div className="flex sm:hidden justify-center items-center px-4 pb-4 pt-9 border-b">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <h1 className="text-2xl font-serif text-foreground">Hello, {userName}</h1>
                  <p className="text-sm text-muted-foreground">Welcome back to the Divine</p>
                </div>
                <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/settings')} />
              </div>
            </div>}

          {/* Navigation & Desktop User Greeting */}
          <div className={`px-4 py-4 relative z-50 ${selectedContent?.includes("overview") ? "mt-[40px] md:mt-[50px]" : "mt-[40px] md:mt-[50px]"}`}>
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
              {/* Left side - Navigation buttons */}
              <div className="flex flex-row items-center gap-2 sm:gap-6">
                <button onClick={() => {
                setActiveView("quick-access");
                setSelectedContent("quick-access-overview");
                // Only open mobile sidebar on small screens
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                }
              }} className={`flex items-center justify-center text-sm font-medium whitespace-nowrap transition-colors duration-200 px-3 py-2 rounded-lg h-10 ${activeView === "quick-access" ? "bg-black text-white" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}>
                  <Menu className="h-4 w-4 sm:hidden mr-2" />
                  Quick Access
                </button>
                <button onClick={() => {
                console.log("Switching to my-profile");
                setActiveView("my-profile");
                setSelectedContent("my-profile-overview");
                // Only open mobile sidebar on small screens
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                }
              }} className={`flex items-center justify-center text-sm font-medium whitespace-nowrap transition-colors duration-200 px-3 py-2 rounded-lg h-10 ${activeView === "my-profile" ? "bg-black text-white" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}>
                  <Menu className="h-4 w-4 sm:hidden mr-2" />
                  My Profile
                </button>
              </div>
              
              {/* Center - User greeting section (hidden on mobile, shown on desktop) */}
              <div className="hidden sm:flex items-center gap-4 lg:translate-x-[-60px]">
                <div className="text-center">
                  <h1 className="text-2xl font-serif text-foreground">Hello, {userName}</h1>
                  <p className="text-sm text-muted-foreground">Welcome back to the Divine</p>
                </div>
                <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/settings')} />
              </div>
              
              {/* Right side - Logout button */}
              <div className="hidden sm:flex h-10 w-10 bg-red-500 rounded-full items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                <LogOut className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 w-full max-w-full overflow-hidden">
          <DashboardSidebar isGodlyCircleMember={isGodlyCircleMember} activeView={activeView} onSelectContent={setSelectedContent} wishlistCount={wishlistCount} hasNFTs={true} />
          
          <main className="flex-1 bg-muted p-6 overflow-y-auto max-w-full">
            <div className="animate-fade-in">
              {selectedContent ? (
                renderContent(selectedContent)
              ) : (
                <>
                  {activeView === "quick-access" && (
                    <section className="mb-16 fade-in-scroll">
                      <div className="mb-8">
                        <h2 className="text-3xl font-serif mb-4 text-foreground">Quick Access</h2>
                        <p className="text-muted-foreground text-lg">Click on any item in the sidebar to view its content</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickAccessItems.map((item) => (
                          <Card 
                            key={item.title} 
                            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg ${item.special && isGodlyCircleMember ? "bg-primary text-primary-foreground" : "bg-card hover:shadow-xl"}`}
                            onClick={() => setSelectedContent(item.href)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${item.special && isGodlyCircleMember ? "bg-primary-foreground/10" : ""}`}>
                                    <item.icon className={`h-6 w-6 ${item.special && isGodlyCircleMember ? "text-primary-foreground" : "text-foreground"}`} />
                                  </div>
                                  <CardTitle className={`text-lg font-semibold ${item.special && isGodlyCircleMember ? "text-primary-foreground" : "text-foreground"}`}>
                                    {item.title}
                                  </CardTitle>
                                </div>
                                <span className={`text-sm font-medium ${item.special && isGodlyCircleMember ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                  {item.count}
                                </span>
                              </div>
                              <CardDescription className={`text-sm leading-relaxed ${item.special && isGodlyCircleMember ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                {item.subtitle}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  {activeView === "my-profile" && (
                    <section className="mb-16 fade-in-scroll">
                      <h2 className="text-3xl font-serif mb-4 text-foreground">My Profile</h2>
                      <p className="text-muted-foreground text-lg mb-8">Click on any item in the sidebar to view its content</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {optionalPanels.map((item) => (
                          <Card 
                            key={item.title} 
                            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-0 shadow-lg bg-card"
                            onClick={() => setSelectedContent(item.href)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg">
                                    <item.icon className="h-6 w-6 text-foreground" />
                                  </div>
                                  <CardTitle className="text-lg font-semibold text-foreground">{item.title}</CardTitle>
                                </div>
                              </div>
                              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                                {item.subtitle}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="fade-in-scroll mb-16">
                    <Card className="rounded-2xl border-0 bg-gradient-to-r from-background to-accent/10 shadow-lg">
                      <CardContent className="p-8 text-center">
                        <blockquote className="text-lg font-serif italic text-muted-foreground mb-4">
                          "Be transformed by the renewing of your mind"
                        </blockquote>
                        <cite className="text-sm text-muted-foreground">Romans 12:2</cite>
                      </CardContent>
                    </Card>
                  </section>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard;