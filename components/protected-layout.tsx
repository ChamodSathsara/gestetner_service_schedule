"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

interface User {
  tecH_NAME: string;
  useR_NAME?: string;
  useR_ROLE?: string;
}

type AppRole =
  | "technician"
  | "admin"
  | "manager"
  | "branch_leader"
  | "data_entry"
  | "unknown";

function mapRole(rawRole: string | undefined): AppRole {
  if (!rawRole) return "unknown";

  if (["m_tech", "s_tech", "t_leader", "tech"].includes(rawRole)) {
    return "technician";
  }

  switch (rawRole) {
    case "ADMIN":
      return "admin";
    case "MANAGER":
      return "manager";
    case "BRANCH_MANAGER":
      return "branch_leader";
    case "DATA_ENTRY":
    case "DATA_ANTRY": // legacy typo support
      return "data_entry";
    default:
      return "unknown";
  }
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (!raw) {
      console.log("No user found in localStorage, redirecting to login.");
      router.push("/");
      return;
    }

    try {
      const storedUser = JSON.parse(raw) as User;
      console.log("User found in localStorage:", storedUser);
      console.log("User role in localStorage:", storedUser.useR_ROLE);
      console.log("User name in localStorage:", storedUser.useR_NAME);

      if (!storedUser || (!storedUser.useR_NAME && !storedUser.tecH_NAME)) {
        // parsed fine but missing required fields — treat as unauthenticated
        console.log(
          "User found in localStorage but missing required fields, redirecting to login.",
        );

        router.push("/");
        return;
      }

      setUser(storedUser);
    } catch {
      // Corrupted JSON in localStorage
      localStorage.removeItem("user");
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  console.log("Mapped user role:", user.useR_ROLE);
  const role: AppRole = mapRole(user.useR_ROLE);
  const isTechnician = role === "technician";
  const username = user.tecH_NAME || user.useR_NAME || "unknown";

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar only for non-technician users */}
      {!isTechnician && (
        <Sidebar
          userRole={role}
          username={username}
          onCollapsedChange={setIsCollapsed}
        />
      )}

      <main
        className={`flex-1 overflow-auto transition-all duration-300 ${
          !isTechnician ? (isCollapsed ? "md:ml-20" : "md:ml-64") : ""
        }`}
      >
        <div className="h-full flex items-start justify-center">{children}</div>
      </main>
    </div>
  );
}
