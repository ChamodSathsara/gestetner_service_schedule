"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Wrench,
  Users,
  Lock,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  userRole: string;
  username: string;
  onCollapsedChange?: (isCollapsed: boolean) => void;
}

export function Sidebar({
  userRole,
  username,
  onCollapsedChange,
}: SidebarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    // Note: localStorage is used here per existing code
    // Consider using a proper auth solution in production
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      roles: ["admin", "manager", "team_leader", "branch_leader", "data_entry"],
    },
    {
      icon: Users,
      label: "Technicians",
      href: "/technicians",
      roles: ["admin", "manager"],
    },
    {
      icon: BarChart3,
      label: "Reports",
      href: "/reports",
      roles: ["admin", "manager", "team_leader", "branch_leader"],
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden text-foreground"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
          isOpen ? "w-64" : "w-64 -translate-x-full md:translate-x-0"
        } ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Header with collapse button */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          {isCollapsed ? (
            <div className="hidden md:flex w-full justify-center">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  <img src="/icon.png" alt="" />
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <img
                    src="https://www.gestetner.lk/wp-content/uploads/2023/11/footer-logo.jpg"
                    alt="Gestetner Logo"
                    className="w-32 h-auto"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-gray-900 text-sm">Gestetner</h1>
                <p className="text-xs text-gray-500">Service Management</p>
              </div>
            </div>
          )}
          <button
            onClick={handleCollapse}
            className={`hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors ${
              isCollapsed ? "absolute right-2" : ""
            }`}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                    isCollapsed ? "md:justify-center md:px-2" : "justify-start"
                  }`}
                  onClick={() => setIsOpen(false)}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`ml-3 ${isCollapsed ? "md:hidden" : ""}`}>
                    {item.label}
                  </span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-3 md:p-4 border-t border-gray-200 space-y-3 ${isCollapsed ? "md:p-2" : ""}`}
        >
          {/* User info - hidden when collapsed */}
          <div
            className={`p-3 bg-gray-50 rounded-lg ${isCollapsed ? "md:hidden" : ""}`}
          >
            <p className="text-xs text-gray-500 font-medium">Current User</p>
            <p className="text-sm font-bold text-gray-900 mt-1">{username}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">{userRole}</p>
          </div>

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`w-full text-red-600 border-red-200 hover:bg-red-50 transition-colors ${
              isCollapsed ? "md:justify-center md:px-2" : "justify-start"
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={`ml-2 ${isCollapsed ? "md:hidden" : ""}`}>
              Logout
            </span>
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
