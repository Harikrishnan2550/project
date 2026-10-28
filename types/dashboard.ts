import { UserRole } from "./auth";

export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  changeText: string;
  trend: "up" | "down" | "neutral";
  icon: "total-projects" | "active-projects" | "completed-projects" | "team-members";
  description: string;
}

export interface ProjectManagerInfo {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  name: string;
  description: string;
  department: string;
  projectManager: ProjectManagerInfo;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  priority: PriorityLevel;
  budgetAllocated?: string;
  teamSize: number;
}

export type ActivityType =
  | "STATUS_UPDATE"
  | "MEMBER_ASSIGNED"
  | "PROJECT_COMPLETED"
  | "DEADLINE_APPROACHING"
  | "MILESTONE_REACHED";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  projectCode?: string;
  projectName?: string;
  user: {
    name: string;
    role: UserRole;
    avatarUrl?: string;
  };
}

export interface ProjectStatusSummary {
  name: string;
  status: ProjectStatus;
  count: number;
  percentage: number;
  color: string;
}

export interface RoleDashboardData {
  role: UserRole;
  scopeLabel: string;
  scopeDescription: string;
  welcomeHeadline: string;
  welcomeSubtext: string;
  kpis: KpiMetric[];
  statusDistribution: ProjectStatusSummary[];
  recentProjects: ProjectItem[];
  recentActivities: ActivityItem[];
}
