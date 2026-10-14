"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, CheckCircle2, Calculator, Eye, Building2, Upload } from "lucide-react";
import BlueprintViewerModal from "@/components/BlueprintViewerModal";

export default function DashboardPage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("blueprint_ai_records");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) setActiveBlueprint(parsed[0]);
      }
    } catch (e) {}
  }, []);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
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
              {activeBlueprint ? `Active project: ${activeBlueprint.projectName}` : "No active project uploaded. Upload a blueprint to begin."}
            </p>
          </div>

          {activeBlueprint && (
            <button 
              onClick={() => setIsViewerOpen(true)}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
            >
              <Eye className="w-4 h-4" />
              <span>Open Live Blueprint Preview</span>
            </button>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-[#17345F]">0</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Uploaded Blueprints</p>
              <p className="text-2xl font-bold text-[#17345F]">0 Sheets</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Takeoff Items</p>
              <p className="text-2xl font-bold text-[#17345F]">0 SMM2</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Estimated Cost</p>
              <p className="text-xl font-bold text-[#17345F]">KES 0</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
              <Calculator className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Live Preview Card or Empty Upload Prompt */}
        {activeBlueprint ? (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFE8F5] pb-4">
              <div>
                <h3 className="text-sm font-bold text-[#17345F] flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>Live Blueprint Sheet Preview: {activeBlueprint.name}</span>
                </h3>
              </div>
            </div>
            <div className="w-full h-[450px] bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl overflow-hidden relative">
              <iframe src={`${activeBlueprint.url}#toolbar=0&view=FitH`} className="w-full h-full border-0" title="Preview" />
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-16 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-[#F4F8FF] border border-[#DFE8F5] rounded-2xl flex items-center justify-center text-[#2563EB] mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-[#17345F]">Get Started with Blueprint AI</h3>
              <p className="text-xs text-[#647A9B]">Upload your architectural PDF drawings on the Blueprints page to initialize intelligent estimation.</p>
            </div>
            <a href="/blueprints" className="inline-block py-2.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all">
              Go to Blueprints & Upload
            </a>
          </div>
        )}
      </div>

      {activeBlueprint && (
        <BlueprintViewerModal 
          isOpen={isViewerOpen} 
          onClose={() => setIsViewerOpen(false)} 
          blueprintName={activeBlueprint.name} 
          fileUrl={activeBlueprint.url} 
        />
      )}
    </AppLayout>
  );
}
