"use client";

import HeroSection from "@/components/movie/HeroSection";
import MovieSection from "@/components/movie/MovieSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <MovieSection title="NOW_SHOWING" />
      <MovieSection title="COMING_SOON" />
      <div className="absolute top-50 left-50"></div>
    </div>
  );
}
