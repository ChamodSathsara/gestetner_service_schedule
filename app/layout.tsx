import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service Management System - Gestetner Ceylon",
  description:
    "Enterprise service management, technician tracking, and breakdown assignment system for Gestetner of Ceylon PLC",
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
        suppressHydrationWarning
      >
        {/* Auth Provider */}
        <AuthProvider>{children}</AuthProvider>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
