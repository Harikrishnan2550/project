import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { ShieldCheck, Users, Layers, Zap, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In — NEXORA Enterprise Project Management",
  description: "Enterprise access portal for NEXORA Project Management System.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50">
      {/* Left Column: Branding and Visual Area (Desktop Only on Left) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B1329] text-white overflow-hidden p-12 xl:p-16 flex-col justify-between select-none">
        {/* Subtle Ambient Background Gradients & Geometric Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black tracking-wider text-xl shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
              N
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">NEXORA</span>
              <span className="block text-[11px] uppercase tracking-widest text-indigo-300/80 font-semibold">
                Enterprise Portfolio Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Center Content: Headline & Enterprise Pillars */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Next-Generation Project Operations</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Manage work. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-white bg-clip-text text-transparent">
              Empower teams.
            </span>{" "}
            <br />
            Deliver results.
          </h1>

          <p className="mt-6 text-base text-slate-300/90 leading-relaxed max-w-lg">
            Nexora delivers unified portfolio governance, real-time resource tracking, and high-velocity project execution designed specifically for enterprise scale and multi-department collaboration.
          </p>

          {/* Key Value Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Governance</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Strict 5-tier role hierarchy with fine-grained creation rights.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                <Layers className="w-4 h-4" />
                <span>Multi-Department</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Cross-functional visibility across PMs, Dept Heads, and squads.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-800/60">
          <span>Trusted by enterprise project organizations</span>
          <span className="font-mono text-[11px] text-slate-500">v1.0.0-PROTOTYPE</span>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-white min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo Mark for Desktop view */}
          <div className="hidden lg:flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
              <span className="text-lg">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900">NEXORA</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Internal Portal
              </span>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
