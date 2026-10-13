const fs = require('fs');
const path = require('path');

console.log("[*] Setting up Reports Workspace...");

const reportsDir = path.join('app', 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const pageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, CheckCircle2, AlertTriangle, Search, Filter, 
  Download, Plus, Edit3, Eye, Layers, Check, X, BookOpen, 
  ExternalLink, FileSpreadsheet, Clock, RefreshCw, BarChart2
} from "lucide-react";

interface ReportItem {
  id: string;
  name: string;
  type: string;
  project: string;
  generatedOn: string;
  size: string;
  status: "Completed" | "Processing" | "Failed";
  format: string;
  contents: string[];
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [typeFilter, setTypeFilter] = useState("All Report Types");
  
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState("Quantity Takeoff");
  const [wizardProject, setWizardProject] = useState("Kibera Heights Residential Block");
  const [wizardScope, setWizardScope] = useState("Approved items only");
  const [wizardFormat, setWizardFormat] = useState("PDF");

  const [selectedReport, setSelectedReport] = useState<ReportItem>({
    id: "1",
    name: "BoQ - Kibera Heights.pdf",
    type: "BoQ & Estimate",
    project: "Kibera Heights Residential Block",
    generatedOn: "Apr 26, 2025 • 10:42 AM",
    size: "2.4 MB",
    status: "Completed",
    format: "PDF",
    contents: ["Quantity schedule (142 items)", "Rate analysis", "Cost summary", "SMM2 compliance check", "Project assumptions"]
  });

  const [reports, setReports] = useState<ReportItem[]>([
    { id: "1", name: "BoQ - Kibera Heights.pdf", type: "BoQ & Estimate", project: "Kibera Heights Residential Block", generatedOn: "Apr 26, 2025 • 10:42 AM", size: "2.4 MB", status: "Completed", format: "PDF", contents: ["Quantity schedule (142 items)", "Rate analysis", "Cost summary"] },
    { id: "2", name: "Quantity Takeoff - Mombasa.xlsx", type: "Quantity Takeoff", project: "Mombasa Commercial Complex", generatedOn: "Apr 25, 2025 • 04:18 PM", size: "1.8 MB", status: "Completed", format: "Excel", contents: ["Itemized measurements", "Dimensions", "Formulas"] },
    { id: "3", name: "Project Summary - Riverside.pdf", type: "Project Summary", project: "Riverside Apartments", generatedOn: "Apr 24, 2025 • 11:32 AM", size: "3.2 MB", status: "Completed", format: "PDF", contents: ["Project overview", "Floors", "Status breakdown"] },
    { id: "4", name: "SMM2 Compliance Report.pdf", type: "SMM2 Compliance", project: "Kibera Heights Residential Block", generatedOn: "Apr 23, 2025 • 03:21 PM", size: "1.1 MB", status: "Completed", format: "PDF", contents: ["Deduction rules check", "Wastage factor audit"] },
    { id: "5", name: "Estimate - Westlands.xlsx", type: "Cost Estimate", project: "Westlands Office Park", generatedOn: "Apr 22, 2025 • 09:15 AM", size: "2.6 MB", status: "Completed", format: "Excel", contents: ["Labour cost", "Material cost", "Contingency"] },
    { id: "6", name: "Quantity Takeoff - Kasarani.xlsx", type: "Quantity Takeoff", project: "Kasarani Residential Estate", generatedOn: "Apr 21, 2025 • 02:47 PM", size: "1.5 MB", status: "Completed", format: "Excel", contents: ["Structural elements", "Confidence scores"] },
    { id: "7", name: "BoQ - Mombasa.pdf", type: "BoQ & Estimate", project: "Mombasa Commercial Complex", generatedOn: "Apr 20, 2025 • 10:12 AM", size: "2.8 MB", status: "Processing", format: "PDF", contents: ["Draft generation in progress"] },
    { id: "8", name: "Project Report - Nairobi.pdf", type: "Project Summary", project: "Nairobi Office Park", generatedOn: "Apr 19, 2025 • 04:33 PM", size: "3.7 MB", status: "Failed", format: "PDF", contents: ["Processing error on sheet 4"] },
  ]);

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === "All Projects" || r.project === projectFilter;
    const matchesType = typeFilter === "All Report Types" || r.type === typeFilter;
    return matchesSearch && matchesProject && matchesType;
  });

  const completedCount = reports.filter(r => r.status === "Completed").length;
  const takeoffCount = reports.filter(r => r.type === "Quantity Takeoff").length;
  const boqCount = reports.filter(r => r.type === "BoQ & Estimate").length;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Reports Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Reports</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>Reports</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Generate detailed reports, export data and track project progress[cite: 5].
            </p>
          </div>

          <button 
            onClick={() => setIsWizardOpen(true)}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Reports</p>
              <p className="text-2xl font-bold text-[#17345F]">{reports.length}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">↑ 12% from last month</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Project Reports</p>
              <p className="text-2xl font-bold text-[#17345F]">12</p>
              <p className="text-[10px] text-[#647A9B] font-semibold">50% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Quantity Takeoff Reports</p>
              <p className="text-2xl font-bold text-[#17345F]">{takeoffCount}</p>
              <p className="text-[10px] text-[#10B981] font-semibold">33% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">BoQ & Estimate Reports</p>
              <p className="text-2xl font-bold text-[#17345F]">{boqCount}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">17% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647A9B]" />
            <input 
              type="text"
              placeholder="Search reports by name, project or type..."
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Report Types</option>
              <option>BoQ & Estimate</option>
              <option>Quantity Takeoff</option>
              <option>Project Summary</option>
              <option>SMM2 Compliance</option>
              <option>Cost Estimate</option>
            </select>
          </div>
        </div>

        {/* Main Workspace Layout (Table + Right Details Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Reports Register Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Reports Register</h3>
              <span className="text-[10px] font-mono text-[#647A9B]">Showing {filteredReports.length} of {reports.length} reports</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                    <th className="py-3 px-3"><input type="checkbox" className="rounded border-[#DFE8F5]" /></th>
                    <th className="py-3 px-3">Report Name</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-3">Generated On</th>
                    <th className="py-3 px-2">Size</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                  {filteredReports.map((report) => {
                    const isSelected = selectedReport.id === report.id;
                    return (
                      <tr 
                        key={report.id} 
                        onClick={() => setSelectedReport(report)}
                        className={`hover:bg-[#F4F8FF]/60 transition-colors cursor-pointer ${isSelected ? "bg-[#F4F8FF]" : ""}`}
                      >
                        <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-[#DFE8F5]" /></td>
                        <td className="py-3.5 px-3 font-semibold flex items-center space-x-2">
                          <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span className="truncate max-w-[150px]">{report.name}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4F8FF] text-[#2563EB] border border-[#DFE8F5]">
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#647A9B] truncate max-w-[160px]">{report.project}</td>
                        <td className="py-3.5 px-3 font-mono text-[11px]">{report.generatedOn}</td>
                        <td className="py-3.5 px-2 font-mono">{report.size}</td>
                        <td className="py-3.5 px-3">
                          {report.status === "Completed" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">Completed</span>}
                          {report.status === "Processing" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">Processing</span>}
                          {report.status === "Failed" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">Failed</span>}
                        </td>
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1.5">
                            <button onClick={() => alert(`Downloading ${report.name}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="Download">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setSelectedReport(report)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="View">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Report Details Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-5 sticky top-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>Report Details</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">
                {selectedReport.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Project</span>
                <span className="font-semibold text-[#17345F] truncate max-w-[180px]">{selectedReport.project}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Report Type</span>
                <span className="font-semibold text-[#2563EB]">{selectedReport.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Generated On</span>
                <span className="font-mono text-[11px] text-[#17345F]">{selectedReport.generatedOn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">File Size</span>
                <span className="font-mono font-bold text-[#17345F]">{selectedReport.size}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Format</span>
                <span className="font-mono font-bold text-[#17345F]">{selectedReport.format}</span>
              </div>
            </div>

            {/* Report Contents */}
            <div className="space-y-2 pt-2 border-t border-[#DFE8F5] text-xs">
              <h4 className="font-bold text-[#17345F] uppercase tracking-wider text-[11px]">Report Contents</h4>
              <ul className="space-y-1.5 text-[#647A9B]">
                {selectedReport.contents.map((c, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-[#17345F] uppercase tracking-wider text-[11px]">Quick Actions</h4>
              <button onClick={() => alert(`Downloading ${selectedReport.name}`)} className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
              <button onClick={() => alert("Exported CSV/Excel successfully")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Export (CSV/Excel)</span>
              </button>
              <button onClick={() => alert("Report preview opened")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer">
                <Eye className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>View Report</span>
              </button>
            </div>

          </div>

        </div>

        {/* Generate Report Wizard Modal */}
        {isWizardOpen && (
          <div className="fixed inset-0 bg-[#0B1F44]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#DFE8F5] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
                <h2 className="text-sm font-bold text-[#17345F]">Generate New Report</h2>
                <button onClick={() => setIsWizardOpen(false)} className="text-[#647A9B] hover:text-[#17345F] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Report Type</label>
                  <select 
                    value={wizardType}
                    onChange={(e) => setWizardType(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl px-3 py-2.5 text-[#17345F] focus:outline-[#2563EB]"
                  >
                    <option>Project Summary</option>
                    <option>Quantity Takeoff</option>
                    <option>Bill of Quantities (BoQ)</option>
                    <option>Cost Estimate</option>
                    <option>SMM2 Validation</option>
                    <option>Blueprint Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Project</label>
                  <select 
                    value={wizardProject}
                    onChange={(e) => setWizardProject(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl px-3 py-2.5 text-[#17345F] focus:outline-[#2563EB]"
                  >
                    <option>Kibera Heights Residential Block</option>
                    <option>Mombasa Commercial Complex</option>
                    <option>Riverside Apartments</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Report Scope</label>
                  <select 
                    value={wizardScope}
                    onChange={(e) => setWizardScope(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl px-3 py-2.5 text-[#17345F] focus:outline-[#2563EB]"
                  >
                    <option>All items, including unresolved items</option>
                    <option>Approved items only</option>
                    <option>Items needing review only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Output Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["PDF", "Excel", "CSV"].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setWizardFormat(fmt)}
                        className={`py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
                          wizardFormat === fmt 
                            ? "bg-[#2563EB] text-white border-[#2563EB]" 
                            : "bg-[#F8FAFC] text-[#647A9B] border-[#DFE8F5]"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Report Live Preview Box */}
                <div className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] font-mono text-[#647A9B] uppercase">Report Preview</span>
                  <p className="font-bold text-[#17345F]">{wizardType} Report</p>
                  <p className="text-[11px] text-[#2563EB] font-medium">{wizardProject}</p>
                  <p className="text-[10px] text-[#647A9B]">Scope: {wizardScope} • Format: {wizardFormat}</p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#DFE8F5]">
                  <button 
                    onClick={() => setIsWizardOpen(false)}
                    className="px-4 py-2 border border-[#DFE8F5] text-[#647A9B] rounded-xl font-semibold hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsWizardOpen(false);
                      alert("Report successfully generated and queued for download!");
                    }}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Generate & Download</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(reportsDir, 'page.tsx'), pageContent);
console.log("[✓] Reports Workspace created successfully!");
