"use client";

import MovieSection from "@/components/MovieSection";
import Navbar from "@/components/Navbar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import HeroBanner from "@/components/HeroBanner";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };
  const { data: session, status } = useSession();
  console.log("session", session);
  return (
    <>
      <div className="bg-black">
        <Navbar />
        <HeroSection />
        <MovieSection title="Now Showing" />
        <MovieSection title="Coming Soon" />
      </div>
    </>
  );
}
