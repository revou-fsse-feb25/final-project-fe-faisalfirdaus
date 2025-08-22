// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import { SessionProvider } from "./providers/SessionProvider";
// import Navbar from '@/components/ui/Navbar';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinema Booking",
  description: "Book movie tickets, pick seats, and pay securely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {/* <Navbar /> */}
            <main className="max-w-6xl mx-auto p-4">
              <SessionProvider>{children}</SessionProvider>
            </main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
