"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { NavSection } from "./sidebar-data";
import { useAuth } from "@/providers/AuthProviders";

export function AppSidebar({
  nav,
  headerTitle = "Menu",
  headerSubtitle,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  nav: NavSection[];
  headerTitle?: React.ReactNode;
  headerSubtitle?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Sidebar
      {...props}
      // Shell colors
      className="bg-[#0e0e10] text-[#e6e7ee] border-r border-[#2a2b31]"
    >
      {/* Header */}
      <SidebarHeader className="bg-[#0e0e10] border-b border-[#2a2b31]">
        <div className="px-3 py-3">
          <div className="text-xl font-semibold tracking-tight text-[#f3f4f6]">
            {headerTitle}
          </div>
          {headerSubtitle ? (
            <div className="text-xs text-[#9da0aa]">{headerSubtitle}</div>
          ) : null}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-[#0e0e10]">
        {nav.map((section) => (
          <SidebarGroup key={section.title} className="px-2">
            <SidebarGroupLabel className="px-1 py-2 text-[11px] uppercase tracking-wider text-[#9da0aa]">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {section.items.map((item) => {
                  const Icon = (item.icon as React.ElementType) || null;
                  const active =
                    pathname === item.url ||
                    pathname.startsWith(item.url + "/");
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        // Item colors
                        className={[
                          "group w-full justify-start gap-2",
                          "rounded-lg border border-transparent",
                          "text-[#c9cbd3] hover:text-[#f3f4f6]",
                          "hover:bg-[#1a1b1f] hover:border-[#2a2b31]",
                          // active state
                          active
                            ? "bg-[#1f2025] text-white border-[#3b3c44] ring-1 ring-inset ring-[#3b3c44]"
                            : "",
                        ].join(" ")}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-2"
                        >
                          {Icon ? (
                            <Icon
                              className="h-4 w-4 shrink-0"
                              // make icon follow text color
                            />
                          ) : null}
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-[#2a2b31] bg-[#0e0e10]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              className={[
                "w-full justify-start gap-2 rounded-lg",
                "text-white bg-[#c5161d] hover:bg-[#b21319]",
                "shadow focus:outline-none focus:ring-2 focus:ring-[#c5161d]/50",
              ].join(" ")}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail */}
      <SidebarRail className="bg-[#0e0e10] border-l border-[#2a2b31]" />
    </Sidebar>
  );
}

export default AppSidebar;
