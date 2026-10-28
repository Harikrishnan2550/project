"use client";

import React from "react";
import {
  Activity,
  CheckCircle2,
  UserPlus,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";
import { ActivityItem } from "@/types/dashboard";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "PROJECT_COMPLETED":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case "MEMBER_ASSIGNED":
        return <UserPlus className="w-3.5 h-3.5 text-blue-600" />;
      case "DEADLINE_APPROACHING":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case "STATUS_UPDATE":
      default:
        return <Activity className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  const getActivityIconBg = (type: ActivityItem["type"]) => {
    switch (type) {
      case "PROJECT_COMPLETED":
        return "bg-emerald-50 border-emerald-200";
      case "MEMBER_ASSIGNED":
        return "bg-blue-50 border-blue-200";
      case "DEADLINE_APPROACHING":
        return "bg-amber-50 border-amber-200";
      case "STATUS_UPDATE":
      default:
        return "bg-indigo-50 border-indigo-200";
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            Recent Activity
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational timeline & team events
          </p>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
          Live feed
        </span>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {activities.map((item, index) => {
          const isLast = index === activities.length - 1;

          return (
            <div key={item.id} className="relative flex items-start gap-3.5 group">
              {/* Vertical connector line */}
              {!isLast && (
                <div
                  className="absolute left-4 top-8 -bottom-4 w-px bg-slate-200 group-hover:bg-indigo-200 transition-colors"
                  aria-hidden="true"
                />
              )}

              {/* Activity Type Badge / Avatar */}
              <div
                className={`relative z-10 w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${getActivityIconBg(
                  item.type
                )}`}
              >
                {getActivityIcon(item.type)}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-slate-900 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Actor & Project pill */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Avatar name={item.user.name} size="xs" />
                    <span>{item.user.name}</span>
                  </div>

                  {item.projectName && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="font-medium text-slate-500 truncate max-w-[160px]">
                        {item.projectName}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-400">
          Showing latest verified workspace activity
        </span>
      </div>
    </div>
  );
}
