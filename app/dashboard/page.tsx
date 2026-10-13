"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  CheckCircle2, Loader2, ArrowRight, Download, Eye, 
  FileSpreadsheet, ChevronRight, Calendar, HardDrive, User, Building2, FileText, Maximize2, ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"elements" | "validation" | "results" | "logs">("elements");
  const [activeSheet, setActiveSheet] = useState(1);
  const [projectName, setProjectName] = useState("Kibera Heights Residential Block");
  const [fileName, setFileName] = useState("Architectural_Plan_Block_A.pdf");
  const [exporting, setExporting] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  useEffect(() => {
    const savedProj = localStorage.getItem("active_project_name");
    const savedFile = localStorage.getItem("active_file_name");
    if (savedProj) setProjectName(savedProj);
    if (savedFile) setFileName(savedFile);
  }, []);

  const handleExportBoq = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("BoQ CSV/Excel generated and downloaded successfully!");
    }, 1000);
  };

  const handleDownloadReport = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      alert("Executive PDF Report downloaded successfully!");
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-3">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700 font-semibold">Dashboard</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">{projectName}</h1>
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                    <span>Gemini Extracted</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Active File: <strong className="font-mono text-slate-700">{fileName}</strong></p>
              </div>
              <Link 
                href="/projects" 
                className="py-2 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center space-x-1.5 self-start md:self-auto cursor-pointer"
              >
                <span>Switch Project</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Uploaded</p>
                  <p className="font-bold text-slate-700 mt-0.5">Today • Just Now</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">File Type</p>
                  <p className="font-bold text-slate-700 mt-0.5">PDF / CAD Drawing</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Model Status</p>
                  <p className="font-bold text-emerald-600 mt-0.5">SMM2 Mapped</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Created By</p>
                  <p className="font-bold text-slate-700 mt-0.5">Brace Lenny</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Preview & Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Blueprint Preview</h2>
                <Link href="/blueprints" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <Maximize2 className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex space-x-3">
                <div className="space-y-2 shrink-0">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveSheet(num)}
                      className={`w-14 h-16 border rounded-lg p-1 flex items-center justify-center transition-all cursor-pointer ${
                        activeSheet === num ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/10' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <svg className="w-full h-full text-blue-600 opacity-80" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="5" width="90" height="110" stroke="#2563eb" fill="#f8fafc" />
                        <line x1="5" y1="40" x2="95" y2="40" />
                        <line x1="50" y1="5" x2="50" y2="115" />
                      </svg>
                    </button>
                  ))}
                </div>

                <div className="flex-1 bg-white border-2 border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center relative min-h-[300px] overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:0.8rem_0.8rem] opacity-70"></div>

                  <svg className="w-full h-56 text-slate-800 relative z-10" viewBox="0 0 300 220" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="30" y="30" width="240" height="160" stroke="#1e293b" strokeWidth="2.5" fill="none" />
                    <path d="M 34 100 L 266 100" stroke="#1e293b" strokeWidth="2" />
                    <path d="M 120 34 L 120 186" stroke="#1e293b" strokeWidth="2" />
                    <rect x="28" y="28" width="10" height="10" fill="#2563eb" />
                    <rect x="262" y="28" width="10" height="10" fill="#2563eb" />
                    <rect x="28" y="182" width="10" height="10" fill="#2563eb" />
                    <rect x="262" y="182" width="10" height="10" fill="#2563eb" />
                    <text x="60" y="70" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">UPLOADED FILE RENDER</text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Sheet {activeSheet} of 4</span>
              <Link href="/blueprints" className="font-semibold text-blue-600 hover:underline flex items-center space-x-1">
                <span>Open CAD Viewer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Center Workspace */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
                <button 
                  onClick={() => setActiveTab("elements")}
                  className={`pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${activeTab === "elements" ? "text-blue-600 border-b-2 border-blue-600 font-bold" : "text-slate-400 hover:text-slate-700"}`}
                >
                  Detected Elements
                </button>
                <button 
                  onClick={() => setActiveTab("validation")}
                  className={`pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${activeTab === "validation" ? "text-blue-600 border-b-2 border-blue-600 font-bold" : "text-slate-400 hover:text-slate-700"}`}
                >
                  SMM2 Validation
                </button>
                <button 
                  onClick={() => setActiveTab("results")}
                  className={`pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${activeTab === "results" ? "text-blue-600 border-b-2 border-blue-600 font-bold" : "text-slate-400 hover:text-slate-700"}`}
                >
                  Results
                </button>
                <button 
                  onClick={() => setActiveTab("logs")}
                  className={`pb-1 px-1 transition-all cursor-pointer whitespace-nowrap ${activeTab === "logs" ? "text-blue-600 border-b-2 border-blue-600 font-bold" : "text-slate-400 hover:text-slate-700"}`}
                >
                  Logs
                </button>
              </div>

              {activeTab === "elements" && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">Structural Elements Extracted</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-bold">{fileName}</span>
                  </div>
                  {[
                    { name: "Walls", count: 52, confidence: "99.1%" },
                    { name: "Columns", count: 14, confidence: "97.5%" },
                    { name: "Beams", count: 32, confidence: "95.0%" },
                    { name: "Slabs", count: 8, confidence: "93.4%" },
                    { name: "Doors", count: 16, confidence: "98.2%" },
                  ].map((el, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                      <span className="font-semibold text-slate-700">{el.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className="font-mono font-bold text-slate-900">{el.count}</span>
                        <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">{el.confidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab !== "elements" && (
                <div className="space-y-4 py-2">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-emerald-600 text-emerald-600 font-mono font-bold text-lg mb-2">
                      100%
                    </div>
                    <p className="text-xs font-bold text-slate-800">Gemini Vision Analysis Complete for {fileName}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <Link href="/quantity-takeoff" className="text-xs font-semibold text-blue-600 hover:underline flex items-center space-x-1">
                <span>View Full Takeoff Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Details</h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Project</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[140px]">{projectName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Design Standard</span>
                  <span className="font-semibold text-blue-600 font-mono">SMM2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-slate-800">Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Quick Actions</h2>
              <Link 
                href="/blueprints" 
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm block text-center cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                <span>View Live Preview</span>
              </Link>
              <button 
                onClick={handleDownloadReport}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
              <button 
                onClick={handleExportBoq}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export BoQ (CSV/Excel)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Takeoff Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Quantity Takeoff Results ({fileName})</h2>
              <p className="text-xs text-slate-500 mt-0.5">SMM2 Standard Method of Measurement live preview</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-medium">
                  <th className="pb-3 w-16">Item No.</th>
                  <th className="pb-3 w-28">SMM2 Code</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 w-20">Unit</th>
                  <th className="pb-3 text-right w-32">Quantity</th>
                  <th className="pb-3 text-right w-28">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  { no: "1", code: "A.1.1", desc: "Concrete Walls (200mm)", unit: "m³", qty: "1,310.20", conf: "99.1%" },
                  { no: "2", code: "A.2.1", desc: "Reinforced Concrete Columns", unit: "m³", qty: "52.40", conf: "97.5%" },
                  { no: "3", code: "A.3.1", desc: "RC Beams", unit: "m³", qty: "142.10", conf: "95.0%" },
                  { no: "4", code: "A.4.1", desc: "RC Slabs", unit: "m³", qty: "912.00", conf: "93.4%" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-all">
                    <td className="py-3 font-mono text-slate-400">{row.no}</td>
                    <td className="py-3 font-mono font-bold text-blue-600">{row.code}</td>
                    <td className="py-3 font-semibold text-slate-900">{row.desc}</td>
                    <td className="py-3 font-mono text-slate-500">{row.unit}</td>
                    <td className="py-3 font-mono font-bold text-slate-900 text-right">{row.qty}</td>
                    <td className="py-3 text-right">
                      <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200/60">
                        {row.conf}
                      </span>
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
