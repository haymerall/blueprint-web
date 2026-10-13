const fs = require('fs');
const path = require('path');

console.log("[*] Upgrading Quantity Takeoff Workspace to Master Specification...");

const qtDir = path.join('app', 'quantity-takeoff');
if (!fs.existsSync(qtDir)) {
  fs.mkdirSync(qtDir, { recursive: true });
}

const pageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PDFViewer from "@/components/PDFViewer";
import { 
  FileText, CheckCircle2, AlertTriangle, Clock, Search, Filter, 
  LayoutGrid, List, MoreVertical, Download, FileSpreadsheet, 
  ArrowRight, Check, X, Edit3, ShieldCheck, Calculator, RefreshCw, Layers
} from "lucide-react";

interface TakeoffItem {
  id: string;
  itemNo: number;
  element: string;
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  aiQuantity: number;
  confidence: number;
  status: "Verified" | "Needs Review" | "Pending";
  formula: string;
  dimensions: { length: number; height: number; thickness: number };
  warnings?: string;
}

export default function QuantityTakeoffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [elementFilter, setElementFilter] = useState("All Elements");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedItem, setSelectedItem] = useState<TakeoffItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editQty, setEditQty] = useState<number>(0);

  const [items, setItems] = useState<TakeoffItem[]>([
    { id: "1", itemNo: 1, element: "Walls", smm2Code: "A.1.1", description: "Concrete Walls (200mm)", unit: "m³", quantity: 245.60, aiQuantity: 245.60, confidence: 98.7, status: "Verified", formula: "Length × Height × Thickness", dimensions: { length: 45.0, height: 3.2, thickness: 0.2 } },
    { id: "2", itemNo: 2, element: "Columns", smm2Code: "A.2.1", description: "Reinforced Concrete Columns", unit: "m³", quantity: 48.30, aiQuantity: 48.30, confidence: 96.4, status: "Verified", formula: "Count × Area × Height", dimensions: { length: 0.3, height: 3.2, thickness: 0.3 } },
    { id: "3", itemNo: 3, element: "Beams", smm2Code: "A.3.1", description: "RC Beams", unit: "m³", quantity: 124.60, aiQuantity: 126.00, confidence: 94.2, status: "Verified", formula: "Span × Width × Depth", dimensions: { length: 6.0, height: 0.5, thickness: 0.25 } },
    { id: "4", itemNo: 4, element: "Slabs", smm2Code: "A.4.1", description: "RC Slabs", unit: "m³", quantity: 856.20, aiQuantity: 856.20, confidence: 92.8, status: "Verified", formula: "Area × Thickness", dimensions: { length: 28.0, height: 0.15, thickness: 20.3 } },
    { id: "5", itemNo: 5, element: "Doors", smm2Code: "A.5.1", description: "Timber Doors", unit: "No.", quantity: 14.00, aiQuantity: 14.00, confidence: 91.7, status: "Verified", formula: "Count detection", dimensions: { length: 0.9, height: 2.1, thickness: 0.05 } },
    { id: "6", itemNo: 6, element: "Windows", smm2Code: "A.5.2", description: "Aluminium Windows", unit: "No.", quantity: 18.00, aiQuantity: 18.00, confidence: 89.5, status: "Verified", formula: "Count detection", dimensions: { length: 1.5, height: 1.2, thickness: 0.1 } },
    { id: "7", itemNo: 7, element: "Staircases", smm2Code: "A.6.1", description: "RC Staircases", unit: "No.", quantity: 2.00, aiQuantity: 2.00, confidence: 87.2, status: "Verified", formula: "Flight volume calculation", dimensions: { length: 4.5, height: 3.2, thickness: 1.5 } },
    { id: "8", itemNo: 8, element: "Walls", smm2Code: "A.1.1", description: "Block Walls (100mm)", unit: "m²", quantity: 32.40, aiQuantity: 38.00, confidence: 75.5, status: "Needs Review", formula: "Net Wall Area - Openings", dimensions: { length: 12.0, height: 2.7, thickness: 0.1 }, warnings: "Opening deduction exceeds 0.5m² threshold; review required." },
    { id: "9", itemNo: 9, element: "Columns", smm2Code: "A.2.1", description: "Columns (Secondary)", unit: "m³", quantity: 12.60, aiQuantity: 15.00, confidence: 71.3, status: "Needs Review", formula: "Count × Dimensions", dimensions: { length: 0.2, height: 3.0, thickness: 0.2 }, warnings: "Drawing scale calibration uncertain on sheet 3." },
    { id: "10", itemNo: 10, element: "Beams", smm2Code: "A.3.1", description: "Secondary Beams", unit: "m³", quantity: 28.70, aiQuantity: 31.00, confidence: 68.9, status: "Needs Review", formula: "Span × Profile", dimensions: { length: 5.0, height: 0.4, thickness: 0.2 }, warnings: "Intersecting wall boundary ambiguous." },
    { id: "11", itemNo: 11, element: "Slabs", smm2Code: "A.4.1", description: "Topped Slab", unit: "m²", quantity: 120.50, aiQuantity: 120.50, confidence: 62.4, status: "Pending", formula: "Area calculation", dimensions: { length: 10.0, height: 0.1, thickness: 12.0 } },
    { id: "12", itemNo: 12, element: "Windows", smm2Code: "A.5.2", description: "Glazed Windows", unit: "No.", quantity: 6.00, aiQuantity: 6.00, confidence: 58.7, status: "Pending", formula: "Count detection", dimensions: { length: 1.2, height: 1.0, thickness: 0.08 } }
  ]);

  const handleRowClick = (item: TakeoffItem) => {
    setSelectedItem(item);
    setEditQty(item.quantity);
    setIsDrawerOpen(true);
  };

  const handleSaveCorrection = () => {
    if (!selectedItem) return;
    setItems(items.map(i => i.id === selectedItem.id ? { ...i, quantity: editQty, status: "Verified" } : i));
    setIsDrawerOpen(false);
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.smm2Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.element.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesElement = elementFilter === "All Elements" || i.element === elementFilter;
    const matchesStatus = statusFilter === "All Statuses" || i.status === statusFilter;
    return matchesSearch && matchesElement && matchesStatus;
  });

  const totalCount = items.length;
  const verifiedCount = items.filter(i => i.status === "Verified").length;
  const reviewCount = items.filter(i => i.status === "Needs Review").length;
  const pendingCount = items.filter(i => i.status === "Pending").length;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Header & Project Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Quantity Takeoff</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight">Quantity Takeoff</h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Review, validate and manage extracted quantities from your blueprints.
            </p>
          </div>

          <div className="flex items-center space-x-3 z-10">
            <select className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-xs font-semibold text-[#17345F] focus:outline-none cursor-pointer">
              <option>Kibera Heights Residential Block</option>
              <option>Mombasa Commercial Complex</option>
              <option>Riverside Apartments</option>
            </select>
            <button 
              onClick={() => alert("BoQ exported successfully!")}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export BoQ</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Items</p>
              <p className="text-2xl font-bold text-[#17345F]">{totalCount}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">↑ 12% from last analysis</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Verified</p>
              <p className="text-2xl font-bold text-[#17345F]">{verifiedCount}</p>
              <p className="text-[10px] text-[#10B981] font-semibold">76% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Needs Review</p>
              <p className="text-2xl font-bold text-[#17345F]">{reviewCount}</p>
              <p className="text-[10px] text-[#F59E0B] font-semibold">14% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Pending</p>
              <p className="text-2xl font-bold text-[#17345F]">{pendingCount}</p>
              <p className="text-[10px] text-[#647A9B] font-semibold">10% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#DFE8F5] flex items-center justify-center text-[#647A9B]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters & Controls Toolbar */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647A9B]" />
            <input 
              type="text"
              placeholder="Search items, description or SMM2 code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] placeholder-[#647A9B] focus:outline-none focus:border-[#2563EB] font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={elementFilter}
              onChange={(e) => setElementFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Elements</option>
              <option>Walls</option>
              <option>Columns</option>
              <option>Beams</option>
              <option>Slabs</option>
              <option>Doors</option>
              <option>Windows</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Verified</option>
              <option>Needs Review</option>
              <option>Pending</option>
            </select>

            <div className="flex items-center bg-[#F4F8FF] p-1 rounded-xl border border-[#DFE8F5]">
              <button className="p-1.5 rounded-lg bg-white shadow-xs text-[#2563EB]"><LayoutGrid className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-lg text-[#647A9B]"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout (Table + Right Sidebar Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Takeoff Schedule (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Quantity Takeoff Schedule</h3>
              <span className="text-[10px] font-mono bg-emerald-50 text-[#10B981] px-2 py-0.5 rounded border border-emerald-200">
                ● Live from analysis
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                    <th className="py-3 px-4"><input type="checkbox" className="rounded border-[#DFE8F5]" /></th>
                    <th className="py-3 px-2">Item No.</th>
                    <th className="py-3 px-3">Element</th>
                    <th className="py-3 px-3">SMM2 Code</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-3">Unit</th>
                    <th className="py-3 px-3">Quantity</th>
                    <th className="py-3 px-3">Confidence</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => handleRowClick(item)}
                      className="hover:bg-[#F4F8FF]/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-[#DFE8F5]" /></td>
                      <td className="py-3.5 px-2 font-mono font-semibold text-[#647A9B]">{item.itemNo}</td>
                      <td className="py-3.5 px-3 font-semibold">{item.element}</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                      <td className="py-3.5 px-4 font-medium max-w-[180px] truncate">{item.description}</td>
                      <td className="py-3.5 px-3 font-mono text-[#647A9B]">{item.unit}</td>
                      <td className="py-3.5 px-3 font-mono font-bold">{item.quantity.toFixed(2)}</td>
                      <td className="py-3.5 px-3 font-mono">
                        <span className={\`font-semibold \${item.confidence > 90 ? "text-[#10B981]" : item.confidence > 75 ? "text-[#F59E0B]" : "text-rose-500"}\`}>
                          {item.confidence}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {item.status === "Verified" && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                        {item.status === "Needs Review" && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Needs Review</span>
                          </span>
                        )}
                        {item.status === "Pending" && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8FAFC] text-[#647A9B] border border-[#DFE8F5]">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleRowClick(item)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#DFE8F5] flex items-center justify-between text-xs text-[#647A9B]">
              <span>Showing 1-{filteredItems.length} of {totalCount} items</span>
              <div className="flex items-center space-x-1 font-mono">
                <button className="px-2.5 py-1 bg-white border border-[#DFE8F5] rounded text-[#17345F] font-bold shadow-xs">1</button>
                <button className="px-2.5 py-1 hover:bg-white rounded">2</button>
                <button className="px-2.5 py-1 hover:bg-white rounded">3</button>
                <span>...</span>
                <button className="px-2.5 py-1 hover:bg-white rounded">13</button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Summary Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Project Details Card */}
            <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>Project Details</span>
              </h3>
              <div className="space-y-2 text-xs divide-y divide-[#DFE8F5]">
                <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Project Name</span><span className="font-semibold text-[#17345F]">Kibera Heights Residential</span></div>
                <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Type</span><span className="font-semibold text-[#17345F]">Residential</span></div>
                <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Floors</span><span className="font-mono font-semibold text-[#17345F]">3</span></div>
                <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Design Standard</span><span className="font-mono font-bold text-[#2563EB]">SMM2</span></div>
                <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Location</span><span className="font-semibold text-[#17345F]">Nairobi, Kenya</span></div>
              </div>
            </div>

            {/* Quantity Takeoff Summary */}
            <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-[#2563EB]" />
                <span>Quantity Takeoff Summary</span>
              </h3>
              <div className="flex items-center justify-center py-2">
                <div className="relative w-28 h-28 rounded-full border-8 border-emerald-500 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="text-xl font-bold text-[#17345F]">{totalCount}</span>
                  <span className="text-[10px] text-[#647A9B] uppercase font-mono">Total Items</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between"><span className="flex items-center space-x-1.5 text-[#647A9B]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Verified</span></span><span className="font-mono font-bold text-[#17345F]">112 (76%)</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center space-x-1.5 text-[#647A9B]"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Needs Review</span></span><span className="font-mono font-bold text-[#17345F]">21 (14%)</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center space-x-1.5 text-[#647A9B]"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span><span>Pending</span></span><span className="font-mono font-bold text-[#17345F]">15 (10%)</span></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-2.5">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider mb-2">Quick Actions</h3>
              <button onClick={() => alert("BoQ exported successfully!")} className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export BoQ (CSV/Excel)</span>
              </button>
              <button onClick={() => alert("Report downloaded successfully!")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer">
                <Download className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Download Report</span>
              </button>
              <button onClick={() => alert("Validated against SMM2 rules successfully!")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Validate with SMM2</span>
              </button>
              <button onClick={() => alert("BoQ generation started!")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer">
                <Check className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Generate BoQ</span>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Recent Activity</h3>
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DFE8F5]">
                <div className="flex items-start space-x-3 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5"><Check className="w-2.5 h-2.5" /></div>
                  <div><p className="font-semibold text-[#17345F]">Analysis completed</p><p className="text-[10px] text-[#647A9B]">Apr 26, 2025 • 11:18 AM</p></div>
                </div>
                <div className="flex items-start space-x-3 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5"><Check className="w-2.5 h-2.5" /></div>
                  <div><p className="font-semibold text-[#17345F]">Quantity takeoff updated</p><p className="text-[10px] text-[#647A9B]">Apr 26, 2025 • 11:05 AM</p></div>
                </div>
                <div className="flex items-start space-x-3 relative z-10">
                  <div className="w-4 h-4 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0 mt-0.5"><AlertTriangle className="w-2.5 h-2.5" /></div>
                  <div><p className="font-semibold text-[#17345F]">3 items need review</p><p className="text-[10px] text-[#647A9B]">Apr 26, 2025 • 10:42 AM</p></div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive Row Selection Drawer (Inspector) */}
        {isDrawerOpen && selectedItem && (
          <div className="fixed inset-0 bg-[#0B1F44]/60 backdrop-blur-xs flex justify-end z-50">
            <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#F4F8FF] px-2 py-0.5 rounded border border-[#DFE8F5]">
                      SMM2 Code: {selectedItem.smm2Code}
                    </span>
                    <h2 className="text-base font-bold text-[#17345F] mt-1">{selectedItem.description}</h2>
                  </div>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-[#647A9B] hover:text-[#17345F] p-1 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Source Blueprint Viewer preview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Source Blueprint & Sheet Inspector</h4>
                  <div className="h-44 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    <PDFViewer />
                  </div>
                </div>

                {/* Formula and Calculations */}
                <div className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-[#17345F] flex items-center space-x-1.5">
                    <Calculator className="w-4 h-4 text-[#2563EB]" />
                    <span>Calculation Formula & Dimensions</span>
                  </h4>
                  <p className="font-mono text-[#2563EB] bg-white p-2 rounded border border-[#DFE8F5]">
                    Formula: {selectedItem.formula}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                    <div className="bg-white p-2 rounded border border-[#DFE8F5]">
                      <p className="text-[10px] text-[#647A9B]">Length</p>
                      <p className="font-bold text-[#17345F]">{selectedItem.dimensions.length}m</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#DFE8F5]">
                      <p className="text-[10px] text-[#647A9B]">Height</p>
                      <p className="font-bold text-[#17345F]">{selectedItem.dimensions.height}m</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#DFE8F5]">
                      <p className="text-[10px] text-[#647A9B]">Thickness</p>
                      <p className="font-bold text-[#17345F]">{selectedItem.dimensions.thickness}m</p>
                    </div>
                  </div>
                </div>

                {/* AI vs User Quantity Audit */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Quantity Audit & Correction</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F8FAFC] border border-[#DFE8F5] p-3 rounded-xl">
                      <p className="text-[10px] text-[#647A9B]">AI Detected Result</p>
                      <p className="text-sm font-mono font-bold text-[#17345F] mt-0.5">{selectedItem.aiQuantity} {selectedItem.unit}</p>
                      <p className="text-[10px] text-emerald-600 font-mono mt-1">Confidence: {selectedItem.confidence}%</p>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-xl">
                      <p className="text-[10px] text-[#2563EB] font-semibold">Verified / Corrected Quantity</p>
                      <input 
                        type="number"
                        value={editQty}
                        onChange={(e) => setEditQty(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-1.5 bg-white border border-[#2563EB] rounded-lg font-mono text-sm font-bold text-[#17345F] focus:outline-none shadow-xs"
                      />
                    </div>
                  </div>

                  {selectedItem.warnings && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedItem.warnings}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-[#DFE8F5] flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 border border-[#DFE8F5] text-[#647A9B] rounded-xl font-semibold hover:bg-[#F8FAFC] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCorrection}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-2 cursor-pointer shadow-sm text-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Approve Measurement</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(qtDir, 'page.tsx'), pageContent);
console.log("[✓] Quantity Takeoff Workspace created successfully!");
