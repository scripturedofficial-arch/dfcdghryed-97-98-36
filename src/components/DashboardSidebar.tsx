import { Heart, Package, Clock, Crown, Gem, Gift, User, Calendar, Mail, History, Eye } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardSidebarProps {
  isGodlyCircleMember: boolean;
  activeView: "quick-access" | "my-profile";
  onSelectContent: (href: string) => void;
  hasNFTs?: boolean;
}

export function DashboardSidebar({ isGodlyCircleMember, activeView, onSelectContent, hasNFTs = false }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const quickAccessItems = [
    {
      title: "My Orders",
      subtitle: "View all orders and track active status",
      icon: Package,
      count: "5 total",
      href: "/orders"
    },
    {
      title: "Membership",
      subtitle: isGodlyCircleMember ? "Access: Active – January" : "You're not selected this month",
      icon: Crown,
      count: isGodlyCircleMember ? "Member" : "Waitlist",
      href: "/godly-circle",
      special: true
    },
    ...(hasNFTs ? [{
      title: "NFT Vault",
      subtitle: "Your digital twins and authenticity tokens",
      icon: Gem,
      count: "5 tokens",
      href: "/nft-vault"
    }] : [])
  ];

  const myProfileItems = [
    {
      title: "Fit Profile",
      subtitle: "Your preferred size for future drops",
      icon: User,
      count: "3 sizes",
      href: "/fit-profile"
    },
    {
      title: "Drop Calendar",
      subtitle: "Upcoming Releases",
      icon: Calendar,
      count: "8 events",
      href: "/calendar"
    },
    {
      title: "Email Settings",
      subtitle: "Customize your notifications",
      icon: Mail,
      count: "5 types",
      href: "/settings"
    }
  ];

  // Add behind-the-scenes for Godly Circle members
  if (isGodlyCircleMember) {
    myProfileItems.push({
      title: "Behind-the-Scenes",
      subtitle: "Exclusive member content",
      icon: Eye,
      count: "6 videos",
      href: "/bts"
    });
  }

  const currentItems = activeView === "quick-access" ? quickAccessItems : myProfileItems;

  const isCollapsed = state === "collapsed" || isMobile;

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} h-screen transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className={`${isCollapsed ? "p-2 pt-8" : "p-3 pt-4"} bg-background border-r flex flex-col h-full`}>
        <SidebarGroup className={`flex-1 overflow-y-auto min-h-0 ${isCollapsed ? "flex flex-col justify-start items-center" : "flex flex-col justify-center"}`}>
          <SidebarGroupContent>
            <SidebarMenu className={`${isCollapsed ? "space-y-6 flex flex-col items-center" : "space-y-4"}`}>
              {currentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectContent(item.href);
                      }}
                      className={`flex items-center ${isCollapsed ? "justify-center p-2 w-10 h-10" : "gap-3 p-3"} rounded-lg transition-all duration-200 hover:bg-accent group text-left ${
                        'special' in item && item.special && isGodlyCircleMember 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "hover:bg-accent"
                      } ${isCollapsed ? "" : "w-full"}`}
                    >
                      <div className={`flex items-center justify-center ${isCollapsed ? "w-5 h-5" : "w-6 h-6"} relative`}>
                        <item.icon className={`${isCollapsed ? "h-5 w-5" : "h-6 w-6"} ${
                          'special' in item && item.special && isGodlyCircleMember ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`} />
                      </div>
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span className={`font-medium text-sm ${
                            'special' in item && item.special && isGodlyCircleMember ? "text-primary-foreground" : "text-foreground"
                          }`}>
                            {item.title}
                          </span>
                          {'count' in item && item.count && (
                            <span className="bg-muted text-black text-xs rounded-full px-2 py-1 font-bold">
                              {String(item.count).match(/\d+/)?.[0] || '0'}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}