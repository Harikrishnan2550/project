"use client";

import React from "react";
import { Calendar, Shield, Sparkles, Building, CheckCircle2 } from "lucide-react";
import { User, UserRole } from "@/types/auth";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROLE_DEFINITIONS } from "@/lib/auth/permissions";
import { DEMO_USERS } from "@/lib/auth/demo-auth";

interface WelcomeSectionProps {
  user: User;
  welcomeHeadline: string;
  welcomeSubtext: string;
  scopeLabel: string;
  onSwitchRole: (role: UserRole) => void;
}

export function WelcomeSection({
  user,
  welcomeHeadline,
  welcomeSubtext,
  scopeLabel,
  onSwitchRole,
}: WelcomeSectionProps) {
  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Format today's date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const roleConfig = ROLE_DEFINITIONS[user.role];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-0 right-0 w-80 h-48 bg-gradient-to-bl from-indigo-50 via-slate-50 to-transparent pointer-events-none rounded-tr-2xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left Column: Greeting & Context */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formattedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {scopeLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {getGreeting()}, {user.name.split(" ")[0]}
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            {welcomeSubtext}
          </p>
        </div>

        {/* Right Column: Role Privileges & Quick-Switch Demo Bar */}
        <div className="flex flex-col sm:items-end gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Active Role:</span>
            <StatusBadge role={user.role} size="md" />
          </div>

          {/* Quick Role Switcher for Interactive Demo Experience */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs">
            <span className="text-[10px] font-semibold uppercase text-slate-400 px-2 py-0.5 hidden sm:inline">
              Test Role:
            </span>
            {(Object.keys(DEMO_USERS) as UserRole[]).map((role) => {
              const isSelected = user.role === role;
              const def = ROLE_DEFINITIONS[role];
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => onSwitchRole(role)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-white text-indigo-700 shadow-2xs font-semibold ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                  title={`Switch view to ${def.label}`}
                >
                  {def.shortLabel}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-indigo-500" />
            <span>
              {roleConfig.canCreateRoles.length > 0
                ? `Authorized to create: ${roleConfig.canCreateRoles
                    .map((r) => ROLE_DEFINITIONS[r].shortLabel)
                    .join(", ")}`
                : "Standard member permissions (tasks & contributions)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
