"use client";
import React from "react";
import AppLayout from "@/components/AppLayout";
import { FileSpreadsheet } from "lucide-react";

export default function BoQPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">SMM2 Bill of Quantities & Estimation</h1>
          <p className="text-xs text-slate-500 mt-1">Standard Method of Measurement compliant pricing schedule.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-medium">
                <th className="pb-3">SMM2 Code</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Unit</th>
                <th className="pb-3 text-right">Total (KSh)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 font-mono font-semibold">A.1.1</td>
                <td className="py-3">Concrete Walls (200mm)</td>
                <td className="py-3 font-mono">m³</td>
                <td className="py-3 font-mono font-bold text-right">18,103,250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
