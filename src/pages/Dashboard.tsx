import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"quick-access" | "my-profile">("quick-access");
  const [userName, setUserName] = useState<string>("Divine Soul");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile) {
          const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
          setUserName(name || profile.first_name || "Divine Soul");
        }
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleContentSelect = (href: string) => {
    navigate(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full pt-16">
          <DashboardSidebar 
            isGodlyCircleMember={false} 
            activeView={activeView} 
            onSelectContent={handleContentSelect}
          />
          
          <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/20">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
                  <div>
                    <h1 className="text-2xl font-serif text-foreground">Welcome back, {userName}</h1>
                    <p className="text-sm text-muted-foreground">Your personal Scriptured sanctuary</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate("/settings")} 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate("/signin");
                    }} 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* View Toggle Pills */}
              <div className="px-6 pb-4 flex gap-2">
                <Button 
                  variant={activeView === "quick-access" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveView("quick-access")}
                  className="rounded-full px-6 transition-all duration-200"
                >
                  Quick Access
                </Button>
                <Button 
                  variant={activeView === "my-profile" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setActiveView("my-profile")}
                  className="rounded-full px-6 transition-all duration-200"
                >
                  My Profile
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif mb-2 text-foreground">
                    {activeView === "quick-access" ? "Quick Access" : "My Profile"}
                  </h2>
                  <p className="text-muted-foreground">
                    {activeView === "quick-access" 
                      ? "Access your orders and purchases" 
                      : "Manage your account settings"}
                  </p>
                </div>

                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-6">
                    Select an option from the sidebar to continue
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
