"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Reports & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Executive summaries and cost estimation breakdowns.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">Analytics reports ready for download.</p>
        </div>
      </div>
    </AppLayout>
  );
}
