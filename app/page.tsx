import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to dashboard (DashboardShell will route to /login if unauthenticated)
  redirect("/dashboard");
}
