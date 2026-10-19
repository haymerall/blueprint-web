"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, Upload, Calculator, ArrowRight, ShieldCheck, Layers, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlueprintRecord {
  id: string;
  name: string;
  projectName: string;
  size: string;
  sheets: number;
  uploadedAt: string;
  status: "Completed" | "Processing" | "Failed";
  url?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<BlueprintRecord[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Aggregate Metrics State
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [totalSheetsAggregated, setTotalSheetsAggregated] = useState(0);
  const [totalTakeoffItemsCount, setTotalTakeoffItemsCount] = useState(0);
  const [grandTotalEstimatedCost, setGrandTotalEstimatedCost] = useState(0);

  useEffect(() => {
    // Load all uploaded blueprints from session storage
    const savedRecords = sessionStorage.getItem("blueprint_ai_records_session");
    if (!savedRecords) return;

    try {
      const parsedRecords: BlueprintRecord[] = JSON.parse(savedRecords);
      if (Array.isArray(parsedRecords) && parsedRecords.length > 0) {
        setProjects(parsedRecords);

        // Determine initial selected project
        const activeId = localStorage.getItem("blueprint_ai_active_project_id") || parsedRecords[0].id;
        setSelectedProjectId(activeId);

        // 1. Total Projects Metric
        setTotalProjectsCount(parsedRecords.length);

        // 2. Aggregate Total Sheets across all projects
        const aggregateSheets = parsedRecords.reduce((sum, p) => sum + (p.sheets || 0), 0);
        setTotalSheetsAggregated(aggregateSheets);

        // 3. Aggregate Takeoff Items and Financial Totals across ALL projects
        let aggregateItems = 0;
        let aggregateCost = 0;

        parsedRecords.forEach(proj => {
          const rawData = localStorage.getItem(`blueprint_ai_analysis_${proj.id}`) || localStorage.getItem("blueprint_ai_latest_analysis");
          if (rawData) {
            try {
              const parsedAnalysis = JSON.parse(rawData);
              if (parsedAnalysis.items && Array.isArray(parsedAnalysis.items)) {
                aggregateItems += parsedAnalysis.items.length;
                const subtotal = parsedAnalysis.items.reduce((sum: number, item: any) => {
                  const netQty = item.deductionsSqM > 0.5 ? Math.max(0, item.quantity - item.deductionsSqM) : item.quantity;
                  return sum + (netQty * item.rateKES);
                }, 0);
                const contingency = subtotal * 0.10;
                const vat = (subtotal + contingency) * 0.16;
                aggregateCost += (subtotal + contingency + vat);
              }
            } catch (e) {}
          }
        });

        setTotalTakeoffItemsCount(aggregateItems);
        setGrandTotalEstimatedCost(aggregateCost);
      }
    } catch (e) {}
  }, []);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    localStorage.setItem("blueprint_ai_active_project_id", id);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <span>Multi-Project Portfolio Overview</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Aggregated statistics across <span className="font-semibold text-[#17345F]">{totalProjectsCount} active project(s)</span>
            </p>
          </div>
          
          <button
            onClick={() => router.push("/blueprints")}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Manage Blueprints</span>
          </button>
        </div>

        {/* Dynamic Aggregated Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Total Portfolio Projects</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{totalProjectsCount}</p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Aggregated Drawing Sheets</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{totalSheetsAggregated} Sheets</p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <Upload className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Total Takeoff Items</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{totalTakeoffItemsCount} SMM2</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Calculator className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Portfolio Total Estimate</p>
              <p className="text-xl font-bold text-[#17345F] mt-1">
                KES {grandTotalEstimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Active Project Viewer & Dynamic Selector */}
        {projects.length === 0 ? (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-16 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-[#F4F8FF] border border-[#DFE8F5] rounded-2xl flex items-center justify-center text-[#2563EB] mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-[#17345F]">No active projects loaded</h3>
              <p className="text-xs text-[#647A9B]">Upload blueprint PDFs to populate your portfolio metrics and live interactive drawing viewer.</p>
            </div>
            <button
              onClick={() => router.push("/blueprints")}
              className="inline-flex items-center space-x-2 py-2.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload First Blueprint</span>
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFE8F5] pb-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                <div>
                  <h3 className="text-sm font-bold text-[#17345F]">Active Blueprint Preview: {activeProject?.name}</h3>
                  <p className="text-xs text-[#647A9B]">{activeProject?.projectName} ({activeProject?.sheets} Sheets)</p>
                </div>
              </div>

              {/* Project Selector Dropdown */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-[#647A9B] font-medium">Select Project:</span>
                <select
                  value={activeProject?.id}
                  onChange={(e) => handleSelectProject(e.target.value)}
                  className="bg-[#F4F8FF] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sheets} sheets)
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => router.push("/quantity-takeoff")}
                  className="text-xs text-[#2563EB] font-semibold hover:underline flex items-center space-x-1 cursor-pointer pl-2"
                >
                  <span>Takeoff Editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            {activeProject?.url ? (
              <div className="w-full h-[600px] border border-[#DFE8F5] rounded-xl overflow-hidden shadow-inner bg-gray-100">
                <iframe
                  src={`${activeProject.url}#toolbar=1&navpanes=1`}
                  className="w-full h-full border-none"
                  title="Active Blueprint PDF Preview"
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-2">
                <FileText className="w-10 h-10 text-[#2563EB]/40" />
                <p className="text-xs font-semibold text-[#17345F]">{activeProject?.projectName} selected</p>
                <p className="text-[11px] text-[#647A9B] max-w-md">Indexed with {activeProject?.sheets} sheets for takeoff analysis.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
