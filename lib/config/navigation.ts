import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users2,
  Building2,
  BarChart3,
  Settings,
  LucideIcon,
} from "lucide-react";
import { UserRole } from "@/types/auth";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  isAvailable: boolean; // Only true for Dashboard in V1
  tooltip?: string;
  requiredRoles?: UserRole[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * Centralized Navigation Configuration for NEXORA Enterprise System.
 * In V1, only Dashboard is active. Future modules are cleanly defined here
 * with `isAvailable: false` so they render as non-interactive placeholders
 * with a subtle "Coming Soon" badge.
 */
export const NAVIGATION_CONFIG: NavSection[] = [
  {
    title: "MAIN",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        isAvailable: true,
      },
    ],
  },
  {
    title: "FUTURE MODULES",
    items: [
      {
        id: "projects",
        label: "Projects",
        href: "#",
        icon: FolderKanban,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
      {
        id: "tasks",
        label: "Tasks & Sprints",
        href: "#",
        icon: CheckSquare,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
      {
        id: "teams",
        label: "Teams & Members",
        href: "#",
        icon: Users2,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
      {
        id: "departments",
        label: "Departments",
        href: "#",
        icon: Building2,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
      {
        id: "analytics",
        label: "Reports & Analytics",
        href: "#",
        icon: BarChart3,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
      {
        id: "settings",
        label: "Settings",
        href: "#",
        icon: Settings,
        badge: "Soon",
        isAvailable: false,
        tooltip: "Will be enabled in Version 2",
      },
    ],
  },
];
