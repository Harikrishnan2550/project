"use client";

import React from "react";
import { FolderKanban, Calendar, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { ProjectItem } from "@/types/dashboard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/utils";

interface RecentProjectsProps {
  projects: ProjectItem[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-indigo-600" />
            Recent Projects
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key operational initiatives across managed departments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            Showing {projects.length} active initiatives
          </span>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll for Mobile */}
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-5 sm:px-0">
          <table className="min-w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">Lead Manager</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 w-40">Progress</th>
                <th className="py-3 px-3">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-default"
                >
                  {/* Project Name & Code */}
                  <td className="py-3.5 px-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {project.name}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {project.code}
                      </span>
                    </div>
                  </td>

                  {/* Project Manager */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={project.projectManager.name} size="xs" />
                      <span className="font-medium text-slate-700 whitespace-nowrap">
                        {project.projectManager.name}
                      </span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-slate-600 font-medium">
                      {project.department}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <StatusBadge status={project.status} size="sm" />
                  </td>

                  {/* Progress Bar */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            project.progress === 100
                              ? "bg-emerald-500"
                              : project.progress > 60
                              ? "bg-indigo-600"
                              : project.progress > 30
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(project.dueDate)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
