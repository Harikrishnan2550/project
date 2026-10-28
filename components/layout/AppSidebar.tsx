"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building,
  Sparkles,
  Layers,
  Shield,
  X,
} from "lucide-react";
import { NAVIGATION_CONFIG } from "@/lib/config/navigation";
import { User } from "@/types/auth";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  currentUser,
  onLogout,
}: AppSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-slate-900 text-slate-200 border-r border-slate-800 select-none">
      {/* Top Branding & Workspace Selector */}
      <div>
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/80">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 overflow-hidden group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black tracking-wider shadow-md shadow-indigo-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <span>N</span>
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  NEXORA
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                    V1
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  Enterprise Platform
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Workspace Pill */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="mx-3 mt-3.5 mb-1 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 truncate">
              <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <div className="truncate">
                <div className="font-medium text-slate-200 truncate">Acme Global HQ</div>
                <div className="text-[10px] text-slate-400 truncate">Production Workspace</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
          </div>
        )}

        {/* Navigation Sections */}
        <div className="mt-4 px-3 space-y-6">
          {NAVIGATION_CONFIG.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (!isCollapsed || isMobileOpen) && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {section.title}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.isAvailable && pathname === item.href;

                  if (!item.isAvailable) {
                    // Future module (placeholder item, non-clickable)
                    return (
                      <div
                        key={item.id}
                        title={item.tooltip || "Coming in next version"}
                        className={cn(
                          "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed select-none transition-colors hover:bg-slate-800/40",
                          isCollapsed && !isMobileOpen ? "justify-center px-2" : ""
                        )}
                      >
                        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                        {(!isCollapsed || isMobileOpen) && (
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Active Functional Item
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={isMobileOpen ? onCloseMobile : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                        isActive
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
                        isCollapsed && !isMobileOpen ? "justify-center px-2" : ""
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                        )}
                      />
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Profile & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/90">
        {currentUser && (
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 transition-colors",
              isCollapsed && !isMobileOpen ? "justify-center p-1.5" : "justify-between"
            )}
          >
            <div className="flex items-center gap-2.5 truncate">
              <Avatar
                name={currentUser.name}
                size={isCollapsed && !isMobileOpen ? "sm" : "sm"}
                showStatus
                status="online"
              />
              {(!isCollapsed || isMobileOpen) && (
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {currentUser.department}
                  </div>
                </div>
              )}
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
                title="Sign out of demo session"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed/Collapsible Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative flex flex-col w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
