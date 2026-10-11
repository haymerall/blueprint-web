"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { Folder, Plus, Calendar, HardDrive, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Projects Workspace</h1>
            <p className="text-xs text-slate-500 mt-1">Manage architectural plans and Gemini vision processing jobs.</p>
          </div>
          <button className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-6 h-6 text-blue-600" />
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">Processing</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Kibera Heights Residential Block</h3>
              <p className="text-xs text-slate-500 mt-1">Residential • 3 Floors</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link href="/dashboard" className="text-xs font-semibold text-blue-600 flex items-center space-x-1">
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
