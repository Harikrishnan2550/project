"use client";

import React from "react";
import {
  FolderKanban,
  Activity,
  CheckCircle2,
  Users2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { KpiMetric } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  metrics: KpiMetric[];
}

export function StatsCard({ metrics }: StatsCardProps) {
  const getIcon = (type: KpiMetric["icon"]) => {
    switch (type) {
      case "total-projects":
        return <FolderKanban className="w-5 h-5 text-indigo-600" />;
      case "active-projects":
        return <Activity className="w-5 h-5 text-blue-600" />;
      case "completed-projects":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "team-members":
        return <Users2 className="w-5 h-5 text-purple-600" />;
    }
  };

  const getIconBg = (type: KpiMetric["icon"]) => {
    switch (type) {
      case "total-projects":
        return "bg-indigo-50 border-indigo-100/80";
      case "active-projects":
        return "bg-blue-50 border-blue-100/80";
      case "completed-projects":
        return "bg-emerald-50 border-emerald-100/80";
      case "team-members":
        return "bg-purple-50 border-purple-100/80";
    }
  };

  const getTrendIcon = (trend: KpiMetric["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case "down":
        return <TrendingDown className="w-3.5 h-3.5 text-red-600 shrink-0" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
        >
          {/* Card Top: Icon & Trend */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105",
                getIconBg(metric.icon)
              )}
            >
              {getIcon(metric.icon)}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60">
              {getTrendIcon(metric.trend)}
              <span className="truncate max-w-[130px]">{metric.changeText}</span>
            </div>
          </div>

          {/* Card Body: Number & Label */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {metric.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {metric.title}
            </div>
          </div>

          {/* Card Footer: Context Note */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">{metric.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
