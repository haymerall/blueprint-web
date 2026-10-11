"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { BookOpen } from "lucide-react";

export default function SMM2LibraryPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">SMM2 Standard Reference Library</h1>
          <p className="text-xs text-slate-500 mt-1">Standard Method of Measurement classification rules.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-xs space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="font-mono font-bold text-blue-600">A.1</span> — <span className="font-semibold text-slate-800">Concrete Work</span>
            <p className="text-slate-500 mt-1">Measured in cubic meters ($m^3$) with reinforcement detailed separately.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
