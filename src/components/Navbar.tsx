"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuth } from "@/providers/AuthProviders";

const LINKS = [
  { href: "/movies", label: "Browse" },
  { href: "/#support", label: "Support" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { me, ready, logout } = useAuth();
  const isAuthenticated = !!me;
  const isHydrating = !ready;
  const role = me?.role as "USER" | "ADMIN" | undefined;

  const initials =
    me?.username?.slice(0, 1)?.toUpperCase() ||
    me?.email?.slice(0, 1)?.toUpperCase() ||
    "?";

  // --- search state ---
  const [q, setQ] = useState("");
  useEffect(() => {
    setQ("");
  }, [pathname]);

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/movies?q=${encodeURIComponent(query)}` : "/movies");
  }

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push("/auth/login");
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-3">
        {/* Mobile: hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>CinemaXIX</SheetTitle>
            </SheetHeader>
            <div className="mt-4 grid gap-2">
              {LINKS.map((l) => (
                <Button
                  key={l.href}
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={l.href}>{l.label}</Link>
                </Button>
              ))}
              <Separator className="my-2" />
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/me">Dashboard</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/me/bookings">My Bookings</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/me/profile">Profile</Link>
                  </Button>
                  {role === "ADMIN" && (
                    <Button
                      variant="outline"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/admin">Admin</Link>
                    </Button>
                  )}
                  <Separator className="my-2" />
                  <Button variant="destructive" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-white font-semibold tracking-tight">
          CinemaXIX
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 ml-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-200 hover:text-[#E50914] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form
          onSubmit={onSearchSubmit}
          className="flex-1 max-w-xl relative ml-auto"
        >
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
            className="pl-9 bg-white/10 text-white placeholder:text-gray-300"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none"
            aria-hidden="true"
          />
        </form>

        {/* Right actions */}
        <div className="ml-3 flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5 text-gray-200" />
          </Button>

          {/* Auth area */}
          {isHydrating ? (
            <div
              className="h-8 w-8 rounded-full bg-white/20 animate-pulse"
              aria-hidden
            />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                >
                  <Avatar className="h-8 w-8 ring-1 ring-white/20">
                    <AvatarFallback className="bg-[#1f2025] text-white text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/me/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/me/bookings">My Tickets</Link>
                  </DropdownMenuItem>
                  {role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
