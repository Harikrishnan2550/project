"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  ChevronDown,
  Shield,
  UserCheck,
  Check,
  Building,
  Mail,
  Briefcase,
  Users,
} from "lucide-react";
import { User, UserRole } from "@/types/auth";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROLE_DEFINITIONS } from "@/lib/auth/permissions";
import { DEMO_USERS } from "@/lib/auth/demo-auth";

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
}

export function UserMenu({ user, onLogout, onSwitchRole }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleConfig = ROLE_DEFINITIONS[user.role];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar name={user.name} size="sm" showStatus status="online" />
        <div className="hidden md:flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">
              {user.name}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          <span className="text-[11px] font-medium text-slate-500 truncate">
            {roleConfig.label}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-fadeIn text-slate-800">
          {/* User Details Header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="md" />
              <div className="truncate">
                <div className="text-sm font-bold text-slate-900 truncate">{user.name}</div>
                <div className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <StatusBadge role={user.role} size="sm" />
              <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                {user.department}
              </span>
            </div>
          </div>

          {/* Role Hierarchy & Creation Rights Overview (Architecture Showcase) */}
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Role Permissions Architecture</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
              {roleConfig.description}
            </p>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
              <span className="font-semibold text-slate-700 block mb-1">
                Creation Authorization:
              </span>
              {roleConfig.canCreateRoles.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {roleConfig.canCreateRoles.map((r) => (
                    <span
                      key={r}
                      className="px-1.5 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 text-[10px] font-medium"
                    >
                      +{ROLE_DEFINITIONS[r].shortLabel}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500 italic">No creation permissions</span>
              )}
            </div>
          </div>

          {/* Quick Demo Switcher Section */}
          <div className="px-4 py-2.5 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Switch Demo Role
            </span>
            <div className="grid grid-cols-1 gap-1">
              {(Object.keys(DEMO_USERS) as UserRole[]).map((role) => {
                const isCurrent = user.role === role;
                const def = ROLE_DEFINITIONS[role];
                return (
                  <button
                    key={role}
                    onClick={() => {
                      onSwitchRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                      isCurrent
                        ? "bg-indigo-50 text-indigo-900 font-semibold"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span className="truncate">{def.label}</span>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logout Action */}
          <div className="px-2 pt-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Sign Out of Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
