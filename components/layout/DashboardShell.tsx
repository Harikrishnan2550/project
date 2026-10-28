"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { clearDemoSession, getDemoSession, loginAsRole } from "@/lib/auth/demo-auth";
import { User, UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: (props: {
    user: User;
    onSwitchRole: (role: UserRole) => void;
  }) => React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Check for demo session on client mount
    const session = getDemoSession();
    if (!session) {
      router.replace("/login");
    } else {
      setCurrentUser(session);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    clearDemoSession();
    router.push("/login");
  };

  const handleSwitchRole = (role: UserRole) => {
    const updatedUser = loginAsRole(role);
    setCurrentUser(updatedUser);
  };

  if (isLoading || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold animate-pulse">
            <span>N</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>Verifying workspace session...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
      {/* Sidebar Navigation */}
      <AppSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* Top Header */}
        <AppHeader
          onToggleSidebarMobile={() => setIsMobileOpen(!isMobileOpen)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSwitchRole={handleSwitchRole}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children({ user: currentUser, onSwitchRole: handleSwitchRole })}
        </main>
      </div>
    </div>
  );
}
