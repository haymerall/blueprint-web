"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, Upload, Calculator, ArrowRight, ShieldCheck, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [hasData, setHasData] = useState(false);
  const [projectName, setProjectName] = useState("No Active Project");
  const [fileName, setFileName] = useState("No blueprint uploaded");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [sheetsCount, setSheetsCount] = useState(0);
  const [takeoffCount, setTakeoffCount] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    const savedRecords = sessionStorage.getItem("blueprint_ai_records_session");
    const activeId = localStorage.getItem("blueprint_ai_active_project_id");
    
    let rawData = null;
    if (activeId) {
      rawData = localStorage.getItem(`blueprint_ai_analysis_${activeId}`);
    }
    if (!rawData) {
      rawData = localStorage.getItem("blueprint_ai_latest_analysis");
    }

    if (savedRecords) {
      try {
        const parsedRecords = JSON.parse(savedRecords);
        if (Array.isArray(parsedRecords) && parsedRecords.length > 0) {
          setHasData(true);
          const latest = parsedRecords[0];
          setProjectName(latest.projectName);
          setFileName(latest.name);
          setSheetsCount(latest.sheets);
          if (latest.url) setFileUrl(latest.url);
        }
      } catch (e) {}
    }

    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed.items && Array.isArray(parsed.items)) {
          setTakeoffCount(parsed.items.length);
          const subtotal = parsed.items.reduce((sum: number, item: any) => sum + (item.quantity * item.rateKES), 0);
          const contingency = subtotal * 0.10;
          const vat = (subtotal + contingency) * 0.16;
          setEstimatedCost(subtotal + contingency + vat);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
              <span>Project Overview & Live Intelligence</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Active file: <span className="font-semibold text-[#17345F]">{fileName}</span>
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{hasData ? 1 : 0}</p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Uploaded Blueprints</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{sheetsCount} Sheets</p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <Upload className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Takeoff Items</p>
              <p className="text-2xl font-bold text-[#17345F] mt-1">{takeoffCount} SMM2</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Calculator className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#647A9B] font-medium">Estimated Cost</p>
              <p className="text-xl font-bold text-[#17345F] mt-1">
                {hasData ? `KES ${estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "KES 0"}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#F4F8FF] rounded-xl flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Live Interactive PDF Viewer Section */}
        {!hasData ? (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-16 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-[#F4F8FF] border border-[#DFE8F5] rounded-2xl flex items-center justify-center text-[#2563EB] mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-[#17345F]">No active project or blueprint loaded</h3>
              <p className="text-xs text-[#647A9B]">Upload a blueprint PDF to initialize project tracking, live sheet previews, and AI takeoffs.</p>
            </div>
            <button
              onClick={() => router.push("/blueprints")}
              className="inline-flex items-center space-x-2 py-2.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Go to Blueprint Management</span>
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#17345F] flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>Live Blueprint Sheet Preview: {fileName} ({sheetsCount} Sheets)</span>
              </h3>
              <button
                onClick={() => router.push("/quantity-takeoff")}
                className="text-xs text-[#2563EB] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>View Takeoff Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {fileUrl ? (
              <div className="w-full h-[600px] border border-[#DFE8F5] rounded-xl overflow-hidden shadow-inner bg-gray-100">
                <iframe
                  src={`${fileUrl}#toolbar=1&navpanes=1`}
                  className="w-full h-full border-none"
                  title="Blueprint PDF Preview"
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-2">
                <FileText className="w-10 h-10 text-[#2563EB]/40" />
                <p className="text-xs font-semibold text-[#17345F]">Project {projectName} indexed successfully</p>
                <p className="text-[11px] text-[#647A9B] max-w-md">All {sheetsCount} sheets are indexed and ready for Gemini Vision SMM2 takeoff analysis.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
