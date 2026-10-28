import { User, UserRole } from "@/types/auth";

export const DEMO_PASSWORD_DEFAULT = "Nexora2026!";

/**
 * Predefined realistic demo accounts for each of the five enterprise roles.
 */
export const DEMO_USERS: Record<UserRole, User> = {
  SUPER_ADMIN: {
    id: "usr_superadmin_01",
    name: "Sarah Jenkins",
    email: "superadmin@nexora.internal",
    role: "SUPER_ADMIN",
    department: "Executive Leadership",
    title: "Chief Operating Officer",
  },
  ADMIN: {
    id: "usr_admin_02",
    name: "Marcus Vance",
    email: "admin@nexora.internal",
    role: "ADMIN",
    department: "Operations & Governance",
    title: "VP of Enterprise Operations",
  },
  PROJECT_MANAGER: {
    id: "usr_pm_03",
    name: "Elena Rostova",
    email: "pm@nexora.internal",
    role: "PROJECT_MANAGER",
    department: "Product Delivery",
    title: "Lead Technical Project Manager",
  },
  DEPARTMENT_HEAD: {
    id: "usr_depthead_04",
    name: "David Chen",
    email: "depthead@nexora.internal",
    role: "DEPARTMENT_HEAD",
    department: "Engineering & Architecture",
    title: "Head of Software Engineering",
  },
  EMPLOYEE: {
    id: "usr_employee_05",
    name: "Alex Morgan",
    email: "employee@nexora.internal",
    role: "EMPLOYEE",
    department: "Engineering & Architecture",
    title: "Senior Full Stack Engineer",
  },
};

const SESSION_STORAGE_KEY = "nexora_enterprise_demo_session";

/**
 * Check if browser environment is available
 */
function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Retrieve the active demo user session
 */
export function getDemoSession(): User | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.user || null;
  } catch (error) {
    console.error("Failed to parse demo session", error);
    return null;
  }
}

/**
 * Persist the demo session in localStorage
 */
export function setDemoSession(user: User, rememberMe: boolean = true): void {
  if (!isClient()) return;
  try {
    const sessionData = {
      user,
      token: `demo_jwt_${user.id}_${Date.now()}`,
      createdAt: new Date().toISOString(),
      rememberMe,
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error("Failed to save demo session", error);
  }
}

/**
 * Clear the demo session on logout
 */
export function clearDemoSession(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear demo session", error);
  }
}

/**
 * Authenticate against the mock demo credentials.
 * Simulates network latency for realistic button state.
 */
export async function authenticateDemo(
  email: string,
  password: string,
  rememberMe: boolean = true
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simulate standard network latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const trimmedEmail = email.trim().toLowerCase();
  const matchedUser = Object.values(DEMO_USERS).find(
    (u) => u.email.toLowerCase() === trimmedEmail
  );

  if (!matchedUser) {
    return {
      success: false,
      error: "Invalid email address. Please use one of the predefined demo accounts.",
    };
  }

  // Check demo password (or accept the default demo password)
  if (password !== DEMO_PASSWORD_DEFAULT && password !== "demo123" && password !== "password") {
    return {
      success: false,
      error: `Invalid password. Default demo password is "${DEMO_PASSWORD_DEFAULT}"`,
    };
  }

  // Persist session
  setDemoSession(matchedUser, rememberMe);

  return {
    success: true,
    user: matchedUser,
  };
}

/**
 * Directly switch or authenticate as a specific role for rapid testing
 */
export function loginAsRole(role: UserRole): User {
  const user = DEMO_USERS[role];
  setDemoSession(user, true);
  return user;
}
