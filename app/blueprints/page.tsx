"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, Upload, CheckCircle2, AlertTriangle, Clock, Search, 
  Filter, Trash2, Eye, Download, RefreshCw, Layers, Sparkles, X, Check
} from "lucide-react";

interface BlueprintRecord {
  id: string;
  name: string;
  projectName: string;
  size: string;
  uploadedAt: string;
  status: "Completed" | "Processing" | "Queued" | "Failed";
  sheetsCount: number;
  url: string;
}

export default function BlueprintsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisOutput, setAnalysisOutput] = useState<any>(null);

  const [blueprints, setBlueprints] = useState<BlueprintRecord[]>([
    { id: "1", name: "Architectural drawings-june2021_250725_181658.pdf", projectName: "Tana River County Executive Headquarters", size: "18.4 MB", uploadedAt: "Today • 10:15 AM", status: "Completed", sheetsCount: 35, url: "/uploads/Architectural drawings-june2021_250725_181658.pdf" },
    { id: "2", name: "Kibera_Heights_Architectural_Floorplan.pdf", projectName: "Kibera Heights Residential Block", size: "14.2 MB", uploadedAt: "Apr 26, 2025 • 11:15 AM", status: "Completed", sheetsCount: 4, url: "#" }
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setUploadProgress(50);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadProgress(90);

      const newRecord: BlueprintRecord = {
        id: String(Date.now()),
        name: data.file.originalName,
        projectName: "Tana River County Executive Project",
        size: `${(data.file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: "Just now",
        status: "Queued",
        sheetsCount: 1,
        url: data.file.url
      };

      setBlueprints([newRecord, ...blueprints]);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        alert("Blueprint uploaded successfully! You can now run Gemini Vision analysis.");
      }, 500);

    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRunAIAnalysis = async (blueprint: BlueprintRecord) => {
    setIsAnalyzing(true);
    setAnalysisOutput(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          filename: blueprint.name.includes("Architectural") ? "Architectural drawings-june2021_250725_181658.pdf" : blueprint.name,
          sheetTitle: blueprint.projectName
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gemini Vision analysis failed");

      setAnalysisOutput(result.data);
      setIsAnalyzing(false);
      alert("Gemini Vision analysis completed successfully! Extracted SMM2 quantities are ready.");
    } catch (err: any) {
      alert(`Analysis Error: ${err.message}`);
      setIsAnalyzing(false);
    }
  };

  const filteredBlueprints = blueprints.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Blueprints</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>Blueprint Management & Gemini AI</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Upload architectural PDFs, inspect sheets, and execute Gemini Vision SMM2 element extraction.
            </p>
          </div>

          <label className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10">
            <Upload className="w-4 h-4" />
            <span>Upload Blueprint PDF</span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Upload Progress Bar if active */}
        {isUploading && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#17345F]">
              <span>Uploading & Validating Blueprint...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#F8FAFC] h-2 rounded-full overflow-hidden border border-[#DFE8F5]">
              <div className="bg-[#2563EB] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        )}

        {/* Analysis Loading State */}
        {isAnalyzing && (
          <div className="bg-[#F4F8FF] border border-[#2563EB]/30 rounded-2xl p-6 shadow-xs flex items-center space-x-4 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#17345F]">Gemini Vision is analyzing drawing sheets...</h4>
              <p className="text-xs text-[#647A9B]">Extracting structural elements, calculating dimensions, and applying SMM2 standards.</p>
            </div>
          </div>
        )}

        {/* Display Analysis Results Modal/Card if available */}
        {analysisOutput && (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFE8F5] pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#17345F]">Gemini Analysis Results: {analysisOutput.sheetTitle}</h3>
              </div>
              <button onClick={() => setAnalysisOutput(null)} className="text-[#647A9B] hover:text-[#17345F] p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#647A9B]">Detected Scale: <span className="font-mono font-semibold text-[#17345F]">{analysisOutput.scale || "1:100"}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {analysisOutput.elements?.map((el: any, idx: number) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-3 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#17345F]">
                    <span>{el.elementId}: {el.category}</span>
                    <span className="text-[#2563EB] font-mono">{el.estimatedQuantity} {el.unit}</span>
                  </div>
                  <p className="text-[#647A9B]">{el.description}</p>
                  <p className="text-[10px] font-mono text-[#647A9B]">Dimensions: {el.dimensions}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blueprints Table */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
          <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Uploaded Blueprints Register</h3>
            <span className="text-[10px] font-mono text-[#647A9B]">Showing {filteredBlueprints.length} blueprints</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                  <th className="py-3 px-4">Filename</th>
                  <th className="py-3 px-3">Associated Project</th>
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Sheets</th>
                  <th className="py-3 px-3">Uploaded On</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                {filteredBlueprints.map((bp) => (
                  <tr key={bp.id} className="hover:bg-[#F4F8FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#2563EB]" />
                      <span className="truncate max-w-[220px]">{bp.name}</span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#647A9B]">{bp.projectName}</td>
                    <td className="py-3.5 px-3 font-mono">{bp.size}</td>
                    <td className="py-3.5 px-3 font-mono">{bp.sheetsCount} sheets</td>
                    <td className="py-3.5 px-3 font-mono text-[11px]">{bp.uploadedAt}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">{bp.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleRunAIAnalysis(bp)} 
                          className="px-2.5 py-1 bg-[#2563EB]/10 hover:bg-[#2563EB] hover:text-white text-[#2563EB] font-semibold rounded-lg flex items-center space-x-1 transition-all cursor-pointer"
                          title="Run Gemini AI Analysis"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Run AI</span>
                        </button>
                        <button onClick={() => alert(`Opening viewer for ${bp.name}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setBlueprints(blueprints.filter(b => b.id !== bp.id))} className="text-[#647A9B] hover:text-rose-600 p-1 cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
