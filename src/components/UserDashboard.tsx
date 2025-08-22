"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Film,
  CalendarClock,
  Tickets,
  Heart,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

// -----------------------------------------------
// NAV DATA — User-facing sections
// -----------------------------------------------
const nav = [
  {
    title: "Main",
    items: [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Browse Movies", url: "/movies", icon: Film },
      { title: "Showtimes", url: "/showtimes", icon: CalendarClock },
      { title: "My Tickets", url: "/tickets", icon: Tickets },
    ],
  },
  {
    title: "Library",
    items: [{ title: "Favorites", url: "/favorites", icon: Heart }],
  },
  {
    title: "Account",
    items: [
      { title: "Payments", url: "/payments", icon: CreditCard },
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Help", url: "/help", icon: HelpCircle },
    ],
  },
];

// -----------------------------------------------
// USER SIDEBAR
// -----------------------------------------------
export function UserSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Welcome back</div>
            <div className="truncate text-xs text-muted-foreground">
              Movie Booking
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {nav.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon as React.ElementType | undefined;
                  const isActive =
                    pathname === item.url ||
                    pathname?.startsWith(item.url + "/");
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={item.url} className="flex items-center gap-2">
                          {Icon ? <Icon className="h-4 w-4" /> : null}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="/logout"
                className="flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

// -----------------------------------------------
// USER LAYOUT SHELL
// -----------------------------------------------
export default function UserLayout({
  children,
  title = "Your Dashboard",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <UserSidebar />
        <main className="flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <a href="/showtimes">
                <Button size="sm">Find Showtimes</Button>
              </a>
              <a href="/tickets">
                <Button size="sm" variant="outline">
                  My Tickets
                </Button>
              </a>
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 md:p-6 lg:p-8">
            {children ?? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <StatCard
                  label="Upcoming Ticket"
                  value="Sat • 7:30 PM"
                  subtext="Central Intelligence – Studio 1"
                />
                <StatCard
                  label="Favorites"
                  value="12 movies"
                  subtext="3 new releases this week"
                />
                <StatCard
                  label="Rewards"
                  value="240 pts"
                  subtext="2 vouchers available"
                />

                <div className="col-span-full grid gap-4 md:grid-cols-2">
                  <Panel title="Recommended for you">
                    <ul className="text-sm leading-7 text-muted-foreground">
                      <li>• The Silent Ocean</li>
                      <li>• Night Runner</li>
                      <li>• Love Algorithm</li>
                    </ul>
                  </Panel>
                  <Panel title="Recent activity">
                    <ul className="text-sm leading-7 text-muted-foreground">
                      <li>Booked 2 seats – Central Intelligence</li>
                      <li>Added "Night Runner" to Favorites</li>
                      <li>Redeemed Popcorn Voucher</li>
                    </ul>
                  </Panel>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {subtext ? (
        <div className="mt-1 text-xs text-muted-foreground">{subtext}</div>
      ) : null}
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-2 text-sm font-medium text-foreground">{title}</div>
      {children}
    </div>
  );
}
