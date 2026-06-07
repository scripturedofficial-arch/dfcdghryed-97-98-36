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

const mobileNavItems = [
  {
    title: "Order History",
    subtitle: "Your past orders",
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
  const [userName, setUserName] = useState<string>("Collector");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, first_name, last_name')
          .eq('id', user.id)
          .maybeSingle();
        if (profile) {
          if (profile.username) {
            setUserName(profile.username.charAt(0).toUpperCase() + profile.username.slice(1));
            return;
          }
          const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
          if (name) {
            setUserName(name);
            return;
          }
        }
        const email = user.email;
        if (email) {
          const raw = email.split('@')[0];
          setUserName(raw.charAt(0).toUpperCase() + raw.slice(1));
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
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
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
            {/* Header */}
            <div
              className="sticky top-0 z-10 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10,10,10,0.9)',
                borderBottom: '0.5px solid #1a1a1a'
              }}
            >
              <div className="px-4 md:px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!isMobile && (
                    <SidebarTrigger className="text-[#555] hover:text-[#C8A96E] transition-colors" />
                  )}
                  <div>
                    <h1 className="font-serif text-lg md:text-xl text-white" style={{ letterSpacing: '0.02em' }}>
                      {userName}
                    </h1>
                    <p className="text-xs tracking-[0.15em] uppercase mt-0.5" style={{ color: '#C8A96E' }}>
                      36Five Member
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/settings")}
                    className="text-[#555] hover:text-white hover:bg-transparent"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate("/signin");
                    }}
                    className="text-[#555] hover:text-white hover:bg-transparent"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8">
              <div className="max-w-4xl mx-auto">

                {inlineView === "digital-twins" ? (
                  <DigitalTwins />
                ) : isMobile ? (
                  /* Mobile nav — sidebar not shown on mobile so cards serve as navigation */
                  <div className="space-y-3 mt-4">
                    {mobileNavItems.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleContentSelect(item.href)}
                        className="flex items-center gap-4 p-5 w-full text-left transition-colors"
                        style={{
                          backgroundColor: '#111',
                          border: '0.5px solid #1a1a1a',
                          borderRadius: '4px'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C8A96E')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
                      >
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded"
                          style={{ backgroundColor: '#1a1a1a' }}
                        >
                          <item.icon className="h-4 w-4" style={{ color: '#C8A96E' }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#555' }}>{item.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Desktop empty state — sidebar handles navigation, this is the landing view */
                  <div className="flex flex-col items-center justify-center py-32 text-center">
                    <p
                      className="font-serif text-5xl font-black mb-6"
                      style={{ color: '#1a1a1a', letterSpacing: '0.1em' }}
                    >
                      SCRIPTURED
                    </p>
                    <div className="w-8 h-px mb-6" style={{ backgroundColor: '#C8A96E' }} />
                    <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#333' }}>
                      Select a section from the sidebar
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
