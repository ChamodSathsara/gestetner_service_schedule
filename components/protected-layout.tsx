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

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}") as User;
    console.log(storedUser);
    if (!storedUser) {
      router.push("/");
    } else {
      setUser(storedUser);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  var role = user.useR_ROLE || "unknown";
  if (role === "m_tech") {
    role = "technician";
  }
  if (role === "s_tech") {
    role = "technician";
  }
  if (role === "t_leader") {
    role = "technician";
  }
  if (role === "tech") {
    role = "technician";
  } else if (role === "ADMIN") {
    role = "admin";
  } else if (role === "MANAGER") {
    role = "manager";
  } else if (role === "BRANCH_MANAGER") {
    role = "branch_leader";
  } else if (role === "DATA_ANTRY") {
    role = "data_entry";
  } else {
    role = "unknown";
  }

  const isTechnician = role === "technician";

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar only for non-technician users */}
      {!isTechnician && (
        <Sidebar
          userRole={role}
          username={user.tecH_NAME || user.useR_NAME || "unknown"}
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
