/**
 * User Roles supported across the NEXORA Enterprise Project Management System
 */
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "PROJECT_MANAGER"
  | "DEPARTMENT_HEAD"
  | "EMPLOYEE";

/**
 * Enterprise User Profile
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  title: string;
}

/**
 * Role metadata and descriptive labels
 */
export interface RoleDefinition {
  role: UserRole;
  label: string;
  shortLabel: string;
  description: string;
  canCreateRoles: UserRole[];
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
  };
}

/**
 * Demo Session representation
 */
export interface DemoSession {
  user: User;
  token: string;
  expiresAt: string;
  rememberMe: boolean;
}
