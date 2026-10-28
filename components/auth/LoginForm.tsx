"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  authenticateDemo,
  DEMO_PASSWORD_DEFAULT,
  DEMO_USERS,
  loginAsRole,
} from "@/lib/auth/demo-auth";
import { UserRole } from "@/types/auth";
import { ROLE_DEFINITIONS } from "@/lib/auth/permissions";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid business email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
  rememberMe: z.boolean().default(true),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>("SUPER_ADMIN");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: DEMO_USERS.SUPER_ADMIN.email,
      password: DEMO_PASSWORD_DEFAULT,
      rememberMe: true,
    },
  });

  const handleSelectDemoRole = (role: UserRole) => {
    setSelectedDemoRole(role);
    setAuthError(null);
    setValue("email", DEMO_USERS[role].email, { shouldValidate: true });
    setValue("password", DEMO_PASSWORD_DEFAULT, { shouldValidate: true });
  };

  const handleDirectDemoLogin = async (role: UserRole) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      loginAsRole(role);
      router.push("/dashboard");
    } catch {
      setAuthError("Failed to initialize demo session. Please try again.");
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    setIsSubmitting(true);

    try {
      const result = await authenticateDemo(data.email, data.password, data.rememberMe);

      if (result.success && result.user) {
        router.push("/dashboard");
      } else {
        setAuthError(
          result.error || "Authentication failed. Please verify credentials."
        );
        setIsSubmitting(false);
      }
    } catch {
      setAuthError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const currentRoleConfig = ROLE_DEFINITIONS[selectedDemoRole];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mobile Branding Header */}
      <div className="lg:hidden flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
          <span className="text-lg tracking-wider">N</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-900">NEXORA</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            Enterprise Management
          </span>
        </div>
      </div>

      {/* Form Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to continue to your enterprise workspace.
        </p>
      </div>

      {/* Demo Credentials Quick-Selector */}
      <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Quick Demo Role Selection
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Click to populate</span>
        </div>

        {/* Role Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {(Object.keys(DEMO_USERS) as UserRole[]).map((role) => {
            const isSelected = selectedDemoRole === role;
            const def = ROLE_DEFINITIONS[role];
            return (
              <button
                type="button"
                key={role}
                onClick={() => handleSelectDemoRole(role)}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  isSelected
                    ? "bg-white text-indigo-700 border-indigo-300 shadow-xs ring-1 ring-indigo-500/20 font-semibold"
                    : "bg-white/60 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900"
                }`}
              >
                <div className="truncate">{def.shortLabel}</div>
              </button>
            );
          })}
        </div>

        {/* Role Privileges Hint */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-200/70 flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1 shrink-0" />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            <strong className="text-slate-900">{currentRoleConfig.label}:</strong>{" "}
            {currentRoleConfig.canCreateRoles.length > 0 ? (
              <span>
                Can create:{" "}
                {currentRoleConfig.canCreateRoles
                  .map((r) => ROLE_DEFINITIONS[r].shortLabel)
                  .join(", ")}
              </span>
            ) : (
              <span>Cannot create users (standard team contributor)</span>
            )}
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {authError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-900">Sign-in error</p>
            <p className="mt-0.5 text-red-700">{authError}</p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <Input
          label="Corporate Email"
          type="email"
          id="email-input"
          placeholder="name@nexora.internal"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password-input"
          placeholder="••••••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded-md"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          {...register("password")}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="remember-me-checkbox"
              className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
              {...register("rememberMe")}
            />
            <span className="text-xs font-medium text-slate-700">Remember me</span>
          </label>

          <button
            type="button"
            onClick={() =>
              alert(
                "Password reset is disabled in this frontend prototype. Please use default demo password: " +
                  DEMO_PASSWORD_DEFAULT
              )
            }
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            id="signin-submit-btn"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign In to Dashboard
          </Button>
        </div>

        {/* Fast Instant Demo Bypass */}
        <div className="pt-2 text-center">
          <span className="text-xs text-slate-400 block mb-2">or quick start with demo role</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => handleDirectDemoLogin(selectedDemoRole)}
            disabled={isSubmitting}
          >
            Launch directly as {ROLE_DEFINITIONS[selectedDemoRole].label} →
          </Button>
        </div>
      </form>

      {/* Demo Credentials Helper Pill */}
      <div className="mt-6 p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
        <span>
          Default demo password: <code className="font-mono font-semibold text-slate-800">{DEMO_PASSWORD_DEFAULT}</code>
        </span>
        <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
          v1.0 Mock Auth
        </span>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 NEXORA Inc. Enterprise Workspace. All rights reserved.</p>
        <p className="text-[11px] text-slate-400">
          Internal confidential platform • Role-based access control enabled
        </p>
      </footer>
    </div>
  );
}
