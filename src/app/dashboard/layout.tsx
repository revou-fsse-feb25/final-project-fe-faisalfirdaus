"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import UserSidebar from "@/components/sidebar/UserSidebar";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  return (
    <SidebarProvider>
      {session?.user?.role === "admin" ? <AdminSidebar /> : <UserSidebar />}
      <main>
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {children}
      </main>
    </SidebarProvider>
  );
}
