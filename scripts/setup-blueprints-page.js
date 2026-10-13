const fs = require('fs');
const path = require('path');

console.log("[*] Implementing Master Blueprints Management Page...");

const blueprintsDir = path.join('app', 'blueprints');
if (!fs.existsSync(blueprintsDir)) {
  fs.mkdirSync(blueprintsDir, { recursive: true });
}

const blueprintsPageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PDFViewer from "@/components/PDFViewer";
import { 
  FileText, Clock, CheckCircle2, AlertTriangle, Plus, Search, 
  Filter, LayoutGrid, List, MoreVertical, Calendar, Download, 
  FileSpreadsheet, ArrowRight, ExternalLink, Maximize2, X, Upload, 
  Layers, Check, Eye
} from "lucide-react";

interface BlueprintItem {
  id: string;
  name: string;
  project: string;
  category: string;
  sheets: number;
  size: string;
  date: string;
  status: "Analysis Complete" | "Processing" | "Queued" | "Needs Review" | "Failed";
  progress?: number;
  thumbnailType: string;
}

export default function BlueprintsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewerModalOpen, setIsViewerModalOpen] = useState(false);

  // Sample blueprints matching the master prompt & screenshot
  const [blueprints, setBlueprints] = useState<BlueprintItem[]>([
    {
      id: "bp-1",
      name: "Ground Floor Plan.pdf",
      project: "Kibera Heights Residential Block",
      category: "Architectural",
      sheets: 4,
      size: "24.8 MB",
      date: "Apr 26, 2025 • 10:42 AM",
      status: "Analysis Complete",
      thumbnailType: "architectural"
    },
    {
      id: "bp-2",
      name: "Structural Layout.pdf",
      project: "Kibera Heights Residential Block",
      category: "Structural",
      sheets: 6,
      size: "12.2 MB",
      date: "Apr 25, 2025 • 02:17 PM",
      status: "Processing",
      progress: 67,
      thumbnailType: "structural"
    },
    {
      id: "bp-3",
      name: "Front Elevation.png",
      project: "Mombasa Commercial Complex",
      category: "Architectural",
      sheets: 1,
      size: "4.1 MB",
      date: "Apr 22, 2025 • 11:03 AM",
      status: "Queued",
      thumbnailType: "elevation"
    },
    {
      id: "bp-4",
      name: "Site Plan.pdf",
      project: "Riverside Apartments",
      category: "Site Plan",
      sheets: 3,
      size: "8.7 MB",
      date: "Apr 21, 2025 • 09:26 AM",
      status: "Analysis Complete",
      thumbnailType: "site"
    },
    {
      id: "bp-5",
      name: "Electrical Layout.pdf",
      project: "Westlands Office Park",
      category: "Electrical",
      sheets: 5,
      size: "15.3 MB",
      date: "Apr 18, 2025 • 04:12 PM",
      status: "Needs Review",
      thumbnailType: "electrical"
    },
    {
      id: "bp-6",
      name: "Section A-A.pdf",
      project: "Kasarani Residential Estate",
      category: "Section Drawing",
      sheets: 2,
      size: "6.9 MB",
      date: "Apr 16, 2025 • 01:45 PM",
      status: "Analysis Complete",
      thumbnailType: "section"
    },
    {
      id: "bp-7",
      name: "Foundation Plan.pdf",
      project: "Thika Commercial Complex",
      category: "Structural",
      sheets: 4,
      size: "11.6 MB",
      date: "Apr 14, 2025 • 11:20 AM",
      status: "Failed",
      thumbnailType: "structural"
    },
    {
      id: "bp-8",
      name: "3D Model Plans.pdf",
      project: "Eldoret Mixed Use Development",
      category: "Architectural",
      sheets: 7,
      size: "18.4 MB",
      date: "Apr 13, 2025 • 03:33 PM",
      status: "Processing",
      progress: 42,
      thumbnailType: "3d"
    },
    {
      id: "bp-9",
      name: "Roof Plan.pdf",
      project: "Nairobi Business Centre",
      category: "Architectural",
      sheets: 1,
      size: "5.2 MB",
      date: "Apr 10, 2025 • 09:18 AM",
      status: "Analysis Complete",
      thumbnailType: "architectural"
    }
  ]);

  const [selectedBlueprint, setSelectedBlueprint] = useState<BlueprintItem>(blueprints[0]);

  // Filtering logic
  const filteredBlueprints = blueprints.filter(bp => {
    const matchesSearch = bp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bp.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === "All Projects" || bp.project === projectFilter;
    const matchesStatus = statusFilter === "All Statuses" || bp.status === statusFilter;
    const matchesType = typeFilter === "All Types" || bp.category === typeFilter;
    return matchesSearch && matchesProject && matchesStatus && matchesType;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Blueprints</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight">Blueprints</h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Upload, manage and analyse your architectural and structural drawings.
            </p>
          </div>

          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="py-2.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Blueprint</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Blueprints</p>
              <p className="text-2xl font-bold text-[#17345F]">128</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">↑ 12% from last month</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">In Progress</p>
              <p className="text-2xl font-bold text-[#17345F]">4</p>
              <p className="text-[10px] text-[#647A9B] font-medium">3% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Analysis Complete</p>
              <p className="text-2xl font-bold text-[#17345F]">96</p>
              <p className="text-[10px] text-[#10B981] font-medium">75% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Needs Attention</p>
              <p className="text-2xl font-bold text-[#17345F]">3</p>
              <p className="text-[10px] text-[#F59E0B] font-medium">2% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Filter & Controls Toolbar */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647A9B]" />
            <input 
              type="text"
              placeholder="Search blueprints by name, project or file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] placeholder-[#647A9B] focus:outline-none focus:border-[#2563EB] font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Projects</option>
              <option>Kibera Heights Residential Block</option>
              <option>Mombasa Commercial Complex</option>
              <option>Riverside Apartments</option>
              <option>Westlands Office Park</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Queued</option>
              <option>Processing</option>
              <option>Analysis Complete</option>
              <option>Needs Review</option>
              <option>Failed</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Types</option>
              <option>Architectural</option>
              <option>Structural</option>
              <option>Electrical</option>
              <option>Site Plan</option>
              <option>Section Drawing</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Name A–Z</option>
            </select>

            <div className="flex items-center bg-[#F4F8FF] p-1 rounded-xl border border-[#DFE8F5]">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-white shadow-xs text-[#2563EB]" : "text-[#647A9B]"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-white shadow-xs text-[#2563EB]" : "text-[#647A9B]"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main Workspace Layout (Grid + Persistent Details Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Blueprint Document Grid (Occupies 72% / 8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlueprints.map((bp) => {
              const isSelected = selectedBlueprint.id === bp.id;
              return (
                <div 
                  key={bp.id}
                  onClick={() => setSelectedBlueprint(bp)}
                  className={`bg-white border rounded-2xl p-4 shadow-xs transition-all flex flex-col justify-between space-y-3 cursor-pointer group ${
                    isSelected ? "border-[#2563EB] ring-2 ring-blue-500/20 bg-[#F4F8FF]/30" : "border-[#DFE8F5] hover:border-blue-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-full h-28 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl flex items-center justify-center relative overflow-hidden">
                        <svg className="w-16 h-16 text-blue-500 opacity-40" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="15" y="15" width="70" height="90" fill="#F4F8FF" stroke="#2563EB" />
                          <line x1="15" y1="45" x2="85" y2="45" stroke="#2563EB" />
                          <line x1="50" y1="15" x2="50" y2="105" stroke="#2563EB" />
                          <rect x="25" y="55" width="20" height="35" stroke="#2563EB" />
                        </svg>
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono bg-white/90 px-1.5 py-0.5 rounded border border-[#DFE8F5] text-[#17345F]">
                          {bp.category}
                        </span>
                      </div>
                      <button className="absolute right-6 top-6 text-[#647A9B] hover:text-[#17345F] p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#17345F] group-hover:text-[#2563EB] transition-colors truncate">
                        {bp.name}
                      </h3>
                      <p className="text-[11px] text-[#647A9B] truncate mt-0.5">{bp.project}</p>
                    </div>

                    <div className="text-[10px] text-[#647A9B] font-mono space-y-0.5">
                      <p>{bp.category} · {bp.sheets} sheets</p>
                      <p>{bp.size} · {bp.date}</p>
                    </div>

                    {/* Status Badge & Progress */}
                    <div>
                      {bp.status === "Analysis Complete" && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Analysis Complete</span>
                        </span>
                      )}
                      {bp.status === "Processing" && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2563EB]">
                            <span>Processing</span>
                            <span>{bp.progress}%</span>
                          </div>
                          <div className="w-full bg-[#F4F8FF] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#2563EB] h-full rounded-full transition-all" style={{ width: \`\${bp.progress}%\` }}></div>
                          </div>
                        </div>
                      )}
                      {bp.status === "Queued" && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8FAFC] text-[#647A9B] border border-[#DFE8F5]">
                          <Clock className="w-3 h-3" />
                          <span>Queued</span>
                        </span>
                      )}
                      {bp.status === "Needs Review" && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Needs Review</span>
                        </span>
                      )}
                      {bp.status === "Failed" && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Failed</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#DFE8F5] flex items-center justify-between text-xs font-semibold">
                    <button onClick={() => setIsViewerModalOpen(true)} className="text-[#647A9B] hover:text-[#2563EB] flex items-center space-x-1 cursor-pointer">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button onClick={() => setIsViewerModalOpen(true)} className="text-[#2563EB] hover:underline flex items-center space-x-1 cursor-pointer">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-[#647A9B] hover:text-[#17345F] cursor-pointer">+ More</button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Persistent Right-Hand Details Panel (Occupies 4 cols / ~390px) */}
          <div className="lg:col-span-4 bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-5 h-fit sticky top-6">
            
            {/* Drawing Preview Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Selected Blueprint Details</h3>
                <button onClick={() => setIsViewerModalOpen(true)} className="text-[#2563EB] hover:text-blue-700 cursor-pointer">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div 
                onClick={() => setIsViewerModalOpen(true)}
                className="h-36 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer group shadow-xs"
              >
                <PDFViewer />
                <div className="absolute inset-0 bg-[#0B1F44]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold space-x-1">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Viewer</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#17345F]">{selectedBlueprint.name}</h2>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200">
                    {selectedBlueprint.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#2563EB] mt-0.5">{selectedBlueprint.project}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#647A9B] pt-2 border-t border-[#DFE8F5]">
                <div>
                  <p className="text-[10px] font-medium text-slate-400">Uploaded</p>
                  <p className="font-semibold text-[#17345F] mt-0.5">{selectedBlueprint.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400">Last Processed</p>
                  <p className="font-semibold text-[#17345F] mt-0.5">Today • 11:18 AM</p>
                </div>
              </div>
            </div>

            {/* File Information Card */}
            <div className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-4 space-y-2 text-xs">
              <h4 className="font-bold text-[#17345F]">File Information</h4>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between"><span className="text-[#647A9B]">File Type</span><span className="font-mono font-bold text-[#17345F]">PDF</span></div>
                <div className="flex justify-between"><span className="text-[#647A9B]">Pages</span><span className="font-mono font-bold text-[#17345F]">{selectedBlueprint.sheets} sheets</span></div>
                <div className="flex justify-between"><span className="text-[#647A9B]">Resolution</span><span className="font-mono font-bold text-[#17345F]">300 DPI</span></div>
                <div className="flex justify-between"><span className="text-[#647A9B]">Dimensions</span><span className="font-mono font-bold text-[#17345F]">2480 × 1754 px</span></div>
                <div className="flex justify-between"><span className="text-[#647A9B]">Uploaded By</span><span className="font-semibold text-[#17345F]">Brace Lenny</span></div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-[#17345F] text-xs">Quick Actions</h4>
              <button 
                onClick={() => setIsViewerModalOpen(true)}
                className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Blueprint</span>
              </button>
              <button 
                onClick={() => alert("Downloading blueprint file...")}
                className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Download</span>
              </button>
              <button 
                onClick={() => alert("SMM2 BoQ CSV exported successfully!")}
                className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Export (CSV/Excel)</span>
              </button>
              <button 
                disabled={selectedBlueprint.status !== "Analysis Complete"}
                className="w-full py-2.5 px-3 bg-slate-100 border border-[#DFE8F5] text-slate-400 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed"
              >
                <span>Generate BoQ</span>
                <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                  {selectedBlueprint.status === "Analysis Complete" ? "Ready" : "Pending Analysis"}
                </span>
              </button>
            </div>

            {/* Processing Timeline */}
            <div className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-[#17345F]">Processing Timeline</h4>
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DFE8F5]">
                
                {[
                  { title: "File uploaded & validated", time: "10:42 AM", done: true },
                  { title: "Preprocessing", time: "10:45 AM", done: true },
                  { title: "Vision analysis", time: "10:52 AM", done: true },
                  { title: "Element extraction", time: "11:05 AM", done: true },
                  { title: "SMM2 validation", time: "11:12 AM", done: true },
                  { title: "BoQ generation", time: "11:18 AM", done: true },
                ].map((stage, i) => (
                  <div key={i} className="flex items-center space-x-3 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-[#10B981] shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#17345F]">{stage.title}</span>
                      <span className="font-mono text-[10px] text-[#647A9B]">{stage.time}</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-[#0B1F44]/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#DFE8F5] rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
                <h2 className="text-sm font-bold text-[#17345F]">Upload New Architectural Blueprint</h2>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-[#647A9B] hover:text-[#17345F] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Project Assignment</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl px-3 py-2.5 text-[#17345F] focus:outline-[#2563EB]">
                    <option>Kibera Heights Residential Block</option>
                    <option>Riverside Apartments</option>
                    <option>Nairobi Business Centre</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Drawing Category</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl px-3 py-2.5 text-[#17345F] focus:outline-[#2563EB]">
                    <option>Architectural</option>
                    <option>Structural</option>
                    <option>Electrical</option>
                    <option>Mechanical & Plumbing</option>
                    <option>Site Plan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Architectural Drawing File (PDF / PNG)</label>
                  <div className="border-2 border-dashed border-[#DFE8F5] rounded-xl p-6 text-center bg-[#F8FAFC] hover:bg-[#F4F8FF] transition-all cursor-pointer">
                    <Upload className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
                    <p className="font-semibold text-[#17345F]">Click to upload or drag and drop files here</p>
                    <p className="text-[10px] text-[#647A9B] mt-1">Supports PDF, PNG and JPG up to 50MB</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#DFE8F5]">
                  <button 
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 border border-[#DFE8F5] text-[#647A9B] rounded-xl font-semibold hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsUploadModalOpen(false);
                      alert("Blueprint uploaded successfully and submitted for Gemini Vision analysis!");
                    }}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Upload & Process</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen CAD Viewer Modal */}
        {isViewerModalOpen && (
          <div className="fixed inset-0 bg-[#0B1F44]/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
                <div>
                  <h2 className="text-sm font-bold">{selectedBlueprint.name} — Interactive CAD & SMM2 Inspector</h2>
                  <p className="text-[10px] text-emerald-400 font-mono">● Live Gemini Vision Bounding Box Overlays Active</p>
                </div>
                <button onClick={() => setIsViewerModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-6 overflow-auto">
                <PDFViewer />
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(blueprintsDir, 'page.tsx'), blueprintsPageContent);
console.log("[✓] Master Blueprints Management Page created successfully!");
