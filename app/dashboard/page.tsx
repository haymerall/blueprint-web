"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, CheckCircle2, Calculator, Eye, Building2
} from "lucide-react";
import BlueprintViewerModal from "@/components/BlueprintViewerModal";

export default function DashboardPage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeBlueprint = {
    name: "Architectural drawings-june2021_250725_181658.pdf",
    projectName: "Tana River County Executive Headquarters",
    url: "/uploads/1791927517913-Architectural_drawings-june2021_250725_181658.pdf",
    sheetsCount: 35,
    status: "Completed"
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-[#2563EB]" />
              <span>Project Overview & Live Intelligence</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Active project: Tana River County Executive Headquarters • Region: Kenya (KES)
            </p>
          </div>

          <div className="flex items-center space-x-3 z-10">
            <button 
              onClick={() => setIsViewerOpen(true)}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Open Live Blueprint Preview</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-[#17345F]">2</p>
              <p className="text-[10px] text-[#10B981] font-semibold">Active organization</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Uploaded Blueprints</p>
              <p className="text-2xl font-bold text-[#17345F]">35 Sheets</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">Verified PDF format</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Takeoff Items</p>
              <p className="text-2xl font-bold text-[#17345F]">42 SMM2</p>
              <p className="text-[10px] text-[#10B981] font-semibold">Gemini Vision parsed</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Estimated Cost</p>
              <p className="text-xl font-bold text-[#17345F]">KES 248.5M</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">Includes VAT & Contingency</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
              <Calculator className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Live Blueprint Preview Card */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#DFE8F5] pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#17345F] flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>Live Blueprint Sheet Preview: {activeBlueprint.name}</span>
              </h3>
              <p className="text-xs text-[#647A9B] mt-0.5">Rendering actual vector PDF pages from your uploaded project storage.</p>
            </div>
            <button
              onClick={() => setIsViewerOpen(true)}
              className="px-3 py-1.5 bg-[#2563EB]/10 hover:bg-[#2563EB] hover:text-white text-[#2563EB] font-semibold text-xs rounded-lg transition-all cursor-pointer flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Expand Fullscreen</span>
            </button>
          </div>

          {/* Embedded Native Preview Frame */}
          <div className="w-full h-[450px] bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl overflow-hidden relative">
            <iframe 
              src={`${activeBlueprint.url}#toolbar=0&view=FitH`} 
              className="w-full h-full border-0 pointer-events-auto"
              title="Dashboard Live Blueprint Preview"
            />
          </div>
        </div>

      </div>

      {/* Fullscreen Interactive Viewer Modal */}
      <BlueprintViewerModal 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        blueprintName={activeBlueprint.name} 
        fileUrl={activeBlueprint.url} 
      />
    </AppLayout>
  );
}
