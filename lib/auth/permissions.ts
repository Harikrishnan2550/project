import { RoleDefinition, UserRole } from "@/types/auth";

/**
 * Centralized Role Definitions and Hierarchy Configuration.
 * This can be updated or retrieved from a backend configuration in future phases.
 */
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Admin",
    shortLabel: "Super Admin",
    description: "Full enterprise governance, administrative rights, and global oversight across all departments and projects.",
    canCreateRoles: ["ADMIN", "PROJECT_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
    colorTheme: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    },
  },
  ADMIN: {
    role: "ADMIN",
    label: "Admin",
    shortLabel: "Admin",
    description: "Operational management across departments, personnel onboarding, and company-wide project coordination.",
    canCreateRoles: ["PROJECT_MANAGER", "DEPARTMENT_HEAD", "EMPLOYEE"],
    colorTheme: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
  },
  PROJECT_MANAGER: {
    role: "PROJECT_MANAGER",
    label: "Project Manager",
    shortLabel: "PM",
    description: "Direct control over assigned project portfolios, sprint milestones, resource allocation, and project team members.",
    canCreateRoles: ["EMPLOYEE"],
    colorTheme: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
    },
  },
  DEPARTMENT_HEAD: {
    role: "DEPARTMENT_HEAD",
    label: "Department Head",
    shortLabel: "Dept Head",
    description: "Strategic head of departmental programs, budgets, employee assignments, and divisional deliverables.",
    canCreateRoles: ["EMPLOYEE"],
    colorTheme: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  },
  EMPLOYEE: {
    role: "EMPLOYEE",
    label: "Employee",
    shortLabel: "Member",
    description: "Core contributor working on assigned project tasks, tracking deliverables, and collaborating across teams.",
    canCreateRoles: [],
    colorTheme: {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
    },
  },
};

/**
 * Check if an actor with a given role can create a user of targetRole.
 * NOTE: For frontend prototype validation and UI demonstration only.
 * Production security will be strictly enforced by the backend API.
 */
export function canRoleCreate(actorRole: UserRole, targetRole: UserRole): boolean {
  const config = ROLE_DEFINITIONS[actorRole];
  if (!config) return false;
  return config.canCreateRoles.includes(targetRole);
}

/**
 * Returns the list of roles the given user role is permitted to create.
 */
export function getCreatableRoles(role: UserRole): UserRole[] {
  return ROLE_DEFINITIONS[role]?.canCreateRoles || [];
}

/**
 * Checks if the role has permission to create at least one other role.
 */
export function canCreateAnyUser(role: UserRole): boolean {
  return (ROLE_DEFINITIONS[role]?.canCreateRoles.length || 0) > 0;
}

/**
 * Formats user role into clean human-readable label
 */
export function formatRoleName(role: UserRole): string {
  return ROLE_DEFINITIONS[role]?.label || role;
}

/**
 * Returns styling classes for role pill badges
 */
export function getRoleBadgeClass(role: UserRole): string {
  return (
    ROLE_DEFINITIONS[role]?.colorTheme.badgeBg ||
    "bg-slate-100 text-slate-800 border-slate-200"
  );
}
