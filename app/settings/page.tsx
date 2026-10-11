"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure Gemini Vision API endpoints and Celery workers.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Gemini API Key</label>
            <input type="password" value="****************************************" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-slate-700" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
