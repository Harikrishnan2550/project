"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  Layers,
  Sparkles,
  Command,
} from "lucide-react";
import { User, UserRole } from "@/types/auth";
import { UserMenu } from "./UserMenu";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface AppHeaderProps {
  onToggleSidebarMobile: () => void;
  currentUser: User;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
}

export function AppHeader({
  onToggleSidebarMobile,
  currentUser,
  onLogout,
  onSwitchRole,
}: AppHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-6">
      <div className="flex h-full items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebarMobile}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs font-medium text-slate-500"
          >
            <span className="hover:text-slate-900 transition-colors hidden sm:inline">
              Workspace
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-slate-900 font-semibold flex items-center gap-1.5">
              <span>Dashboard</span>
              <span className="hidden md:inline-flex">
                <StatusBadge role={currentUser.role} size="sm" showDot={false} />
              </span>
            </span>
          </nav>
        </div>

        {/* Center: Search Field (Visual placeholder only as specified) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              readOnly
              onClick={() => alert("Search is a visual placeholder for Version 1.")}
              placeholder="Quick search projects, teams, metrics..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-9 pr-14 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 cursor-pointer shadow-2xs transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-400 font-mono">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right Side: Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Bell (Visual placeholder) */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-fadeIn text-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] text-indigo-600 font-semibold">3 Unread</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                    <p className="font-semibold text-slate-900">
                      Sprint 4 Review Scheduled
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Cloud Migration team review starts today at 3:00 PM.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-900">Budget Allocation Update</p>
                    <p className="text-[11px] text-slate-600">
                      Q4 allocations approved for Engineering & Architecture.
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400">
                    Visual notification preview • V1 Prototype
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200/80 mx-0.5 hidden sm:block" />

          {/* User Menu with Dropdown & Working Logout */}
          <UserMenu
            user={currentUser}
            onLogout={onLogout}
            onSwitchRole={onSwitchRole}
          />
        </div>
      </div>
    </header>
  );
}
