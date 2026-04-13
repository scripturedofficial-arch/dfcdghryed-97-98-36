import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, History, Diamond } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DigitalTwins } from "@/components/DigitalTwins";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

const quickAccessItems = [
  {
    title: "Order History",
    subtitle: "View your past orders",
    icon: History,
    href: "/order-history",
  },
  {
    title: "Digital Twins",
    subtitle: "View & claim your NFTs",
    icon: Diamond,
    href: "/digital-twins",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [inlineView, setInlineView] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Divine Soul");

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
          if (name) {
            setUserName(name);
            return;
          }
        }
        // Fallback to email username
        const email = user.email;
        if (email) {
          setUserName(email.split('@')[0]);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleContentSelect = (href: string) => {
    if (href === "/digital-twins") {
      setInlineView("digital-twins");
    } else {
      setInlineView(null);
      navigate(href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full pt-16">
          {!isMobile && (
            <DashboardSidebar
              isGodlyCircleMember={false}
              onSelectContent={handleContentSelect}
            />
          )}

          <main className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/20">
              <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!isMobile && (
                    <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
                  )}
                  <div>
                    <h1 className="text-xl md:text-2xl font-serif text-foreground">Welcome back, {userName}</h1>
                    <p className="text-xs md:text-sm text-muted-foreground">Your personal Scriptured sanctuary</p>
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
            </div>

            <div className="p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif mb-2 text-foreground">Quick Access</h2>
                  <p className="text-sm text-muted-foreground">Access your orders and purchases</p>
                </div>

                {inlineView === "digital-twins" ? (
                  <DigitalTwins />
                ) : isMobile ? (
                  <div className="grid gap-3">
                    {quickAccessItems.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleContentSelect(item.href)}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card hover:bg-accent transition-colors text-left w-full"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                          <item.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-6">
                      Select an option from the sidebar to continue
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
