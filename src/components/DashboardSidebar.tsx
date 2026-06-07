import { History, Diamond } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardSidebarProps {
  isGodlyCircleMember: boolean;
  onSelectContent: (href: string) => void;
  hasNFTs?: boolean;
}

const sidebarItems = [
  {
    title: "Order History",
    icon: History,
    href: "/order-history"
  },
  {
    title: "Digital Twins",
    icon: Diamond,
    href: "/digital-twins"
  }
];

export function DashboardSidebar({ onSelectContent }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" || isMobile;

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-56"} h-screen transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent
        className={`${isCollapsed ? "p-2 pt-10" : "p-4 pt-8"} flex flex-col h-full`}
        style={{ backgroundColor: '#0a0a0a', borderRight: '0.5px solid #1a1a1a' }}
      >
        {!isCollapsed && (
          <p
            className="text-xs tracking-[0.2em] uppercase mb-6 px-1"
            style={{ color: '#333' }}
          >
            Account
          </p>
        )}

        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectContent(item.href);
                      }}
                      className={`flex items-center ${isCollapsed ? "justify-center w-10 h-10 p-0" : "gap-3 px-3 py-2.5 w-full"} rounded transition-all duration-200 group text-left`}
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <item.icon
                        className={`${isCollapsed ? "h-4 w-4" : "h-4 w-4"} transition-colors`}
                        style={{ color: '#555' }}
                        onMouseEnter={e => ((e.target as SVGElement).style.color = '#C8A96E')}
                      />
                      {!isCollapsed && (
                        <span
                          className="text-sm font-medium tracking-wide group-hover:text-white transition-colors"
                          style={{ color: '#888' }}
                        >
                          {item.title}
                        </span>
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
