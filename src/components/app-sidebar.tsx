"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Film,
  Clapperboard,
  CalendarClock,
  Building2,
  LayoutGrid,
  Tickets,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

// If you already have these in your project (from your example), keep these imports.
// import { SearchForm } from "@/components/search-form";
// import { VersionSwitcher } from "@/components/version-switcher";
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
// Sample data tailored for an Online Movie Booking admin
// -----------------------------------------------
const data = {
  versions: ["1.0.0", "1.1.0", "2.0.0-beta"],
  navMain: [
    {
      title: "Management",
      items: [
        { title: "Movies", url: "/admin/movies", icon: Film },
        { title: "Showtimes", url: "/admin/showtimes", icon: CalendarClock },
        { title: "Theaters", url: "/admin/theaters", icon: Building2 },
        { title: "Studios", url: "/admin/studios", icon: LayoutGrid },
        { title: "Seats", url: "/admin/seats", icon: Clapperboard },
      ],
    },
    {
      title: "Commerce",
      items: [
        { title: "Bookings", url: "/admin/bookings", icon: Tickets },
        { title: "Payments", url: "/admin/payments", icon: CreditCard },
      ],
    },
    {
      title: "People",
      items: [{ title: "Users", url: "/admin/users", icon: Users }],
    },
    {
      title: "Analytics",
      items: [{ title: "Reports", url: "/admin/reports", icon: BarChart3 }],
    },
    {
      title: "System",
      items: [{ title: "Settings", url: "/admin/settings", icon: Settings }],
    },
  ],
};

// -----------------------------------------------
// AppSidebar for the Admin area (movie booking)
// -----------------------------------------------
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1>Hello There</h1>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon as React.ElementType | undefined;
                  const isActive = pathname?.startsWith(item.url);
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
// Optional: Admin layout shell using the sidebar
// -----------------------------------------------
export default function AdminLayout({
  children,
  title = "Dashboard",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <main className="flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Add Movie
              </Button>
              <Button size="sm">New Showtime</Button>
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 md:p-6 lg:p-8">
            {children ?? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Placeholder cards */}
                <StatCard
                  label="Today\'s Bookings"
                  value="132"
                  subtext="+12% vs yesterday"
                />
                <StatCard
                  label="Revenue"
                  value="IDR 18,450,000"
                  subtext="for the last 24h"
                />
                <StatCard
                  label="Occupancy"
                  value="64%"
                  subtext="peak at 19:00"
                />
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

// Version 2.0
// "use client";

// import * as React from "react";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// const navData = [
//   {
//     title: "Management",
//     items: [
//       { title: "Movies", url: "/admin/movies" },
//       { title: "Showtimes", url: "/admin/showtimes" },
//       { title: "Theaters", url: "/admin/theaters" },
//       { title: "Studios", url: "/admin/studios" },
//       { title: "Seats", url: "/admin/seats" },
//     ],
//   },
//   {
//     title: "Commerce",
//     items: [
//       { title: "Bookings", url: "/admin/bookings" },
//       { title: "Payments", url: "/admin/payments" },
//     ],
//   },
//   {
//     title: "People",
//     items: [{ title: "Users", url: "/admin/users" }],
//   },
//   {
//     title: "Analytics",
//     items: [{ title: "Reports", url: "/admin/reports" }],
//   },
//   {
//     title: "System",
//     items: [{ title: "Settings", url: "/admin/settings" }],
//   },
// ];

// export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
//   const pathname = usePathname();
//   return (
//     <Sidebar {...props}>
//       <SidebarHeader className="px-4 py-2 font-bold text-lg">
//         Admin Dashboard
//       </SidebarHeader>
//       <SidebarContent>
//         {navData.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild isActive={pathname === item.url}>
//                       <a href={item.url}>{item.title}</a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// export default function AdminLayout({
//   children,
//   title,
// }: {
//   children: React.ReactNode;
//   title: string;
// }) {
//   return (
//     <div className="flex min-h-screen w-full">
//       <AppSidebar />
//       <div className="flex flex-1 flex-col">
//         <header className="flex h-14 items-center justify-between border-b px-4">
//           <div className="flex items-center gap-2">
//             <SidebarTrigger />
//             <h1 className="text-lg font-semibold">{title}</h1>
//           </div>
//           <div className="flex gap-2">
//             <Button size="sm">Add Movie</Button>
//             <Button size="sm" variant="outline">
//               New Showtime
//             </Button>
//           </div>
//         </header>
//         <main className="flex-1 p-6 bg-muted/30">{children}</main>
//       </div>
//     </div>
//   );
// }
