// "use client";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
// import AppSidebar from "@/components/sidebar/app-sidebar";
// import { adminNav } from "@/components/sidebar/sidebar-data";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const title = pathname.split("/")[2] ?? "Dashboard";

//   return (
//     <SidebarProvider>
//       <AppSidebar
//         nav={adminNav}
//         headerTitle="Admin"
//         headerSubtitle="Manage catalog & ops"
//       />
//       <SidebarInset>
//         <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur">
//           <div className="flex items-center gap-2">
//             <SidebarTrigger className="-ml-1" />
//             <h1 className="text-base md:text-lg font-semibold">{title}</h1>
//           </div>
//           <div className="hidden md:flex items-center gap-2">
//             <Button size="sm" variant="outline">
//               Add Movie
//             </Button>
//             <Button size="sm">New Showtime</Button>
//           </div>
//         </header>
//         <div className="p-4 md:p-6 lg:p-8">{children}</div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

"use client";

import AppSidebar from "@/components/sidebar/app-sidebar";
import { adminNav } from "@/components/sidebar/sidebar-data";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full bg-black text-white">
        <AppSidebar
          nav={adminNav}
          headerTitle="Admin"
          headerSubtitle="Manage catalog & ops"
        />
        <main className="flex-1">
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-800 bg-black/70 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold tracking-tight">Admin</h1>
            </div>
          </div>
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
