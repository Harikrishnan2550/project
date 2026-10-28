"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectOverview } from "@/components/dashboard/ProjectOverview";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { getDashboardDataForRole } from "@/lib/mock-data/dashboard";
import { User, UserRole } from "@/types/auth";

export default function DashboardPage() {
  return (
    <DashboardShell>
      {({ user, onSwitchRole }: { user: User; onSwitchRole: (role: UserRole) => void }) => {
        // Fetch role-tailored dashboard data
        const dashboardData = getDashboardDataForRole(user.role);

        return (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Welcome & Context Banner */}
            <WelcomeSection
              user={user}
              welcomeHeadline={dashboardData.welcomeHeadline}
              welcomeSubtext={dashboardData.welcomeSubtext}
              scopeLabel={dashboardData.scopeLabel}
              onSwitchRole={onSwitchRole}
            />

            {/* KPI Summary Cards Grid */}
            <StatsCard metrics={dashboardData.kpis} />

            {/* Middle Section: Chart & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Project Status Donut Overview */}
              <div className="lg:col-span-7 flex flex-col">
                <ProjectOverview distribution={dashboardData.statusDistribution} />
              </div>

              {/* Recent Activity Timeline */}
              <div className="lg:col-span-5 flex flex-col">
                <RecentActivity activities={dashboardData.recentActivities} />
              </div>
            </div>

            {/* Bottom Section: Recent Projects Table */}
            <RecentProjects projects={dashboardData.recentProjects} />
          </div>
        );
      }}
    </DashboardShell>
  );
}
