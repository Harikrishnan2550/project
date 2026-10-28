import React from "react";
import { cn } from "@/lib/utils";
import { PriorityLevel, ProjectStatus } from "@/types/dashboard";
import { UserRole } from "@/types/auth";
import { formatRoleName, getRoleBadgeClass } from "@/lib/auth/permissions";

interface StatusBadgeProps {
  status?: ProjectStatus;
  priority?: PriorityLevel;
  role?: UserRole;
  size?: "sm" | "md";
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  priority,
  role,
  size = "md",
  className,
  showDot = true,
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium gap-1.5",
    md: "text-xs px-2.5 py-1 font-medium gap-1.5",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
  };

  // If role is provided
  if (role) {
    const roleBadgeClass = getRoleBadgeClass(role);
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border shadow-2xs font-medium tracking-tight",
          sizeClasses[size],
          roleBadgeClass,
          className
        )}
      >
        {showDot && (
          <span className={cn("rounded-full bg-current opacity-70", dotSizeClasses[size])} />
        )}
        <span>{formatRoleName(role)}</span>
      </span>
    );
  }

  // If priority is provided
  if (priority) {
    const priorityConfig = {
      LOW: {
        label: "Low",
        bg: "bg-slate-50 text-slate-700 border-slate-200",
        dot: "bg-slate-400",
      },
      MEDIUM: {
        label: "Medium",
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      },
      HIGH: {
        label: "High",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      },
      URGENT: {
        label: "Urgent",
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
      },
    };

    const cfg = priorityConfig[priority];
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border shadow-2xs tracking-tight",
          sizeClasses[size],
          cfg.bg,
          className
        )}
      >
        {showDot && <span className={cn("rounded-full", cfg.dot, dotSizeClasses[size])} />}
        <span>{cfg.label}</span>
      </span>
    );
  }

  // If project status is provided
  const statusConfig: Record<
    ProjectStatus,
    { label: string; bg: string; dot: string }
  > = {
    PLANNING: {
      label: "Planning",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    IN_PROGRESS: {
      label: "In Progress",
      bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      dot: "bg-indigo-500",
    },
    ON_HOLD: {
      label: "On Hold",
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400",
    },
    COMPLETED: {
      label: "Completed",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
  };

  const cfg = status ? statusConfig[status] : statusConfig.IN_PROGRESS;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border shadow-2xs tracking-tight",
        sizeClasses[size],
        cfg.bg,
        className
      )}
    >
      {showDot && <span className={cn("rounded-full", cfg.dot, dotSizeClasses[size])} />}
      <span>{cfg.label}</span>
    </span>
  );
}
