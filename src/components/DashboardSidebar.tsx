import { History, Settings } from "lucide-react";
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
      title: "Order History",
      subtitle: "View your past orders and purchases",
      icon: History,
      href: "/order-history"
    }
  ];

  const myProfileItems = [
    {
      title: "Account Settings",
      subtitle: "Manage your account and preferences",
      icon: Settings,
      href: "/settings"
    }
  ];

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
                      className={`flex items-center ${isCollapsed ? "justify-center p-2 w-10 h-10" : "gap-3 p-3"} rounded-lg transition-all duration-200 hover:bg-accent group text-left ${isCollapsed ? "" : "w-full"}`}
                    >
                      <div className={`flex items-center justify-center ${isCollapsed ? "w-5 h-5" : "w-6 h-6"} relative`}>
                        <item.icon className={`${isCollapsed ? "h-5 w-5" : "h-6 w-6"} text-muted-foreground group-hover:text-foreground`} />
                      </div>
                      {!isCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span className="font-medium text-sm text-foreground">
                            {item.title}
                          </span>
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