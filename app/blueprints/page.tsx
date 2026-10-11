"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, Upload } from "lucide-react";

export default function BlueprintsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Architectural Blueprints</h1>
            <p className="text-xs text-slate-500 mt-1">Interactive CAD viewer and sheet inspector.</p>
          </div>
          <button className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs">
          <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">Kibera Heights Ground Floor Plan Loaded</p>
          <p className="mt-1">Scale 1:100 • 4 Sheets Available</p>
        </div>
      </div>
    </AppLayout>
  );
}
