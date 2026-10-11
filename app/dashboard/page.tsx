"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  CheckCircle2, Loader2, ArrowRight, Download, Eye, 
  FileSpreadsheet, ChevronRight, Calendar, HardDrive, User, Building2, FileText, Maximize2, ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"elements" | "validation" | "results" | "logs">("elements");
  const [activeSheet, setActiveSheet] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

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
        
        {/* Breadcrumb & Project Header */}
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
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kibera Heights Residential Block</h1>
                  <span className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200/60 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                    <span>Processing</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Architectural Plan – Block A | 3 Floors</p>
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
                  <p className="font-bold text-slate-700 mt-0.5">Apr 28, 2026 • 10:42 AM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">File Type</p>
                  <p className="font-bold text-slate-700 mt-0.5">PDF (Architectural)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">File Size</p>
                  <p className="font-bold text-slate-700 mt-0.5">24.8 MB</p>
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

        {/* Multi-Step Pipeline Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            
            <div className="flex items-start space-x-3 p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900">1. Blueprint Intake</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">File uploaded successfully</p>
                <p className="text-[9px] font-mono text-emerald-600 mt-1">24.8 MB • PDF</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-300 rounded-xl relative shadow-xs">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">Vision Analysis</p>
                  <span className="text-[9px] font-mono text-blue-600 font-bold">3m 24s</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Gemini vision model</p>
                <p className="text-[10px] font-semibold text-blue-600 mt-1 flex items-center space-x-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Detecting structural elements...</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl opacity-75">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-xs font-bold text-slate-700">3. SMM2 Validation</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Mapping to SMM2 standards</p>
                <p className="text-[9px] font-mono text-slate-400 mt-1">Waiting...</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl opacity-75">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</div>
              <div>
                <p className="text-xs font-bold text-slate-700">4. Generate BoQ</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Create quantity takeoff & schedule</p>
                <p className="text-[9px] font-mono text-slate-400 mt-1">Waiting...</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl opacity-75">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">5</div>
              <div>
                <p className="text-xs font-bold text-slate-700">5. Complete</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Results ready for review</p>
                <p className="text-[9px] font-mono text-slate-400 mt-1">Waiting...</p>
              </div>
            </div>

          </div>
        </div>

        {/* Blueprint Preview with Actual Construction Drawing Vector Overlay */}
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
                {/* Thumbnails */}
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
                        <line x1="5" y1="80" x2="95" y2="80" />
                        <line x1="50" y1="5" x2="50" y2="115" />
                        <rect x="15" y="15" width="25" height="18" fill="#dbeafe" />
                        <rect x="60" y="15" width="25" height="18" fill="#dbeafe" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Main Detailed Architectural Floor Plan Drawing */}
                <div className="flex-1 bg-white border-2 border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center relative min-h-[300px] overflow-hidden shadow-inner">
                  
                  {/* Fine Grid Blueprint Paper Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:0.8rem_0.8rem] opacity-70"></div>

                  {/* Architectural Drawing SVG */}
                  <svg className="w-full h-56 text-slate-800 relative z-10" viewBox="0 0 300 220" fill="none" stroke="currentColor" strokeWidth="1.2">
                    {/* Dimension Lines */}
                    <g stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2">
                      <line x1="20" y1="15" x2="280" y2="15" />
                      <line x1="20" y1="205" x2="280" y2="205" />
                      <line x1="15" y1="20" x2="15" y2="200" />
                      <line x1="285" y1="20" x2="285" y2="200" />
                    </g>

                    {/* Outer Structural Load-Bearing Walls (Double Line) */}
                    <rect x="30" y="30" width="240" height="160" stroke="#1e293b" strokeWidth="2.5" fill="none" />
                    <rect x="34" y="34" width="232" height="152" stroke="#1e293b" strokeWidth="1" fill="none" />

                    {/* Internal Partition Walls */}
                    <path d="M 34 100 L 266 100" stroke="#1e293b" strokeWidth="2" />
                    <path d="M 120 34 L 120 186" stroke="#1e293b" strokeWidth="2" />
                    <path d="M 200 100 L 200 186" stroke="#1e293b" strokeWidth="2" />

                    {/* Reinforced Concrete Columns (Hatched Solid Fill) */}
                    <rect x="28" y="28" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="115" y="28" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="262" y="28" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="28" y="95" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="115" y="95" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="262" y="95" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="28" y="182" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="115" y="182" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />
                    <rect x="262" y="182" width="10" height="10" fill="#2563eb" stroke="#1d4ed8" />

                    {/* Architectural Door Swings & Arcs */}
                    <g stroke="#0284c7" strokeWidth="1.2">
                      <path d="M 70 100 A 20 20 0 0 1 90 120" strokeDasharray="2 2" />
                      <line x1="70" y1="100" x2="70" y2="120" strokeWidth="2" />
                      
                      <path d="M 150 100 A 20 20 0 0 1 170 120" strokeDasharray="2 2" />
                      <line x1="150" y1="100" x2="150" y2="120" strokeWidth="2" />
                    </g>

                    {/* Window Openings */}
                    <g stroke="#06b6d4" strokeWidth="2.5">
                      <line x1="60" y1="30" x2="90" y2="30" />
                      <line x1="150" y1="30" x2="180" y2="30" />
                      <line x1="220" y1="30" x2="250" y2="30" />
                      <line x1="270" y1="50" x2="270" y2="80" />
                    </g>

                    {/* Room Labels & Annotations */}
                    <text x="60" y="70" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">MASTER BEDROOM</text>
                    <text x="150" y="70" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">LIVING AREA</text>
                    <text x="50" y="140" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">KITCHEN</text>
                    <text x="140" y="140" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">BATH 01</text>
                    <text x="215" y="140" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold">BEDROOM 2</text>

                    {/* CAD Stamp Block */}
                    <g fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1">
                      <rect x="180" y="150" width="80" height="30" />
                      <text x="185" y="162" fill="#334155" fontSize="6" fontFamily="monospace">ARCH: KIBERA BLOCK A</text>
                      <text x="185" y="172" fill="#0f172a" fontSize="6" fontFamily="monospace" fontWeight="bold">SCALE 1:100 | SMM2</text>
                    </g>
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
                    <span className="text-xs font-bold text-slate-800">Structural Elements Detected</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-bold">Live from Gemini Vision</span>
                  </div>
                  {[
                    { name: "Walls", count: 48, confidence: "98.7%" },
                    { name: "Columns", count: 12, confidence: "96.4%" },
                    { name: "Beams", count: 28, confidence: "94.2%" },
                    { name: "Slabs", count: 6, confidence: "92.8%" },
                    { name: "Doors", count: 14, confidence: "97.1%" },
                    { name: "Windows", count: 18, confidence: "95.6%" },
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
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-600 text-blue-600 font-mono font-bold text-lg mb-2">
                      72%
                    </div>
                    <p className="text-xs font-bold text-slate-800">Extracting structural elements using Gemini Vision...</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-700">
                      <span>✓ Image preprocessing completed</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-700">
                      <span>✓ Element detection completed</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg text-blue-700 font-semibold">
                      <span>⚙ SMM2 mapping in progress</span>
                    </div>
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
                  <span className="text-slate-400">Type</span>
                  <span className="font-semibold text-slate-800">Residential</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-400">Floors</span>
                  <span className="font-semibold text-slate-800">3 Floors</span>
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
                disabled={downloadingReport}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:bg-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingReport ? "Generating PDF..." : "Download Report"}</span>
              </button>

              <button 
                onClick={handleExportBoq}
                disabled={exporting}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:bg-slate-200"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{exporting ? "Exporting..." : "Export BoQ (CSV/Excel)"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quantity Takeoff Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Quantity Takeoff Results</h2>
              <p className="text-xs text-slate-500 mt-0.5">SMM2 Standard Method of Measurement live preview</p>
            </div>
            <Link href="/boq" className="text-xs font-semibold text-blue-600 hover:underline flex items-center space-x-1">
              <span>View Full BoQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
                  { no: "1", code: "A.1.1", desc: "Concrete Walls (200mm)", unit: "m³", qty: "1,248.50", conf: "98.7%" },
                  { no: "2", code: "A.2.1", desc: "Reinforced Concrete Columns", unit: "m³", qty: "48.30", conf: "96.4%" },
                  { no: "3", code: "A.3.1", desc: "RC Beams", unit: "m³", qty: "124.60", conf: "94.2%" },
                  { no: "4", code: "A.4.1", desc: "RC Slabs", unit: "m³", qty: "856.20", conf: "92.8%" },
                  { no: "5", code: "A.5.1", desc: "Timber Doors", unit: "No.", qty: "14.00", conf: "97.1%" },
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
