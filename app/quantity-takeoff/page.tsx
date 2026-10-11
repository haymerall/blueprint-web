"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { Calculator } from "lucide-react";

export default function QuantityTakeoffPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quantity Takeoff Suite</h1>
          <p className="text-xs text-slate-500 mt-1">Review volumetric computations and structural element extractions.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-xs">
          <p className="font-semibold text-slate-800 mb-2">Active Takeoff Summary</p>
          <p className="text-slate-500">Walls: 48 | Columns: 12 | Beams: 28 | Slabs: 6</p>
        </div>
      </div>
    </AppLayout>
  );
}
