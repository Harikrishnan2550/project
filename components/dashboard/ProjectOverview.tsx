"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ProjectStatusSummary } from "@/types/dashboard";
import { PieChart as PieChartIcon, Info } from "lucide-react";

interface ProjectOverviewProps {
  distribution: ProjectStatusSummary[];
}

export function ProjectOverview({ distribution }: ProjectOverviewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalCount = distribution.reduce((acc, curr) => acc + curr.count, 0);
  const completedItem = distribution.find((d) => d.status === "COMPLETED");
  const completionRate = totalCount > 0 ? Math.round(((completedItem?.count || 0) / totalCount) * 100) : 0;

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ProjectStatusSummary;
      return (
        <div className="rounded-xl bg-slate-900 text-white p-2.5 text-xs shadow-xl border border-slate-800">
          <div className="font-semibold flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span>{data.name}</span>
          </div>
          <div className="mt-1 text-slate-300">
            {data.count} projects ({data.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-indigo-600" />
            Project Status Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Portfolio distribution across key operational stages
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
            {completionRate}% Shipped
          </span>
        </div>
      </div>

      {/* Chart & Legend Content */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* Donut Chart with Center Summary */}
        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {distribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="transition-all duration-200 hover:opacity-80 outline-none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />
          )}

          {/* Center text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {totalCount}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Projects
            </span>
          </div>
        </div>

        {/* Legend & Breakdown List */}
        <div className="w-full flex-1 space-y-2.5">
          {distribution.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-800">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-600">
                  {item.count}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 w-10 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          Synchronized with enterprise sprints
        </span>
        <span className="text-slate-500 font-medium">Real-time status</span>
      </div>
    </div>
  );
}
