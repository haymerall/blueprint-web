"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, CheckCircle2, AlertTriangle, Search, Filter, 
  Download, Plus, Edit3, Eye, Layers, Check, X, Calculator, ShieldCheck
} from "lucide-react";

interface TakeoffItem {
  id: string;
  itemNo: number;
  category: string;
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  dimensions: string;
  confidence: string;
  sourceSheet: string;
  status: "Verified" | "Needs Review" | "Pending";
}

export default function QuantityTakeoffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [items, setItems] = useState<TakeoffItem[]>([
    { id: "1", itemNo: 1, category: "Walls", smm2Code: "A.1.1", description: "Concrete Walls (200mm)", unit: "m³", quantity: 1248.50, dimensions: "L: 45.2m, H: 3.2m, T: 0.2m", confidence: "94%", sourceSheet: "Sheet A-01 (Ground Floor)", status: "Verified" },
    { id: "2", itemNo: 2, category: "Columns", smm2Code: "A.2.1", description: "Reinforced Concrete Columns", unit: "m³", quantity: 48.30, dimensions: "400mm x 400mm (12 Nos)", confidence: "91%", sourceSheet: "Sheet S-02 (Foundation)", status: "Verified" },
    { id: "3", itemNo: 3, category: "Beams", smm2Code: "A.3.1", description: "RC Beams", unit: "m³", quantity: 124.60, dimensions: "300mm x 600mm span", confidence: "89%", sourceSheet: "Sheet S-03 (First Floor)", status: "Verified" },
    { id: "4", itemNo: 4, category: "Slabs", smm2Code: "A.4.1", description: "RC Slabs (150mm thick)", unit: "m³", quantity: 856.20, dimensions: "Area: 5,708 m²", confidence: "95%", sourceSheet: "Sheet A-02 (Typical Slab)", status: "Verified" },
    { id: "5", itemNo: 5, category: "Doors", smm2Code: "A.5.1", description: "Timber Doors", unit: "No.", quantity: 14.00, dimensions: "900mm x 2100mm", confidence: "82%", sourceSheet: "Sheet A-04 (Door Schedule)", status: "Needs Review" },
    { id: "6", itemNo: 6, category: "Windows", smm2Code: "A.5.2", description: "Aluminium Windows", unit: "No.", quantity: 18.00, dimensions: "1500mm x 1200mm", confidence: "88%", sourceSheet: "Sheet A-05 (Window Schedule)", status: "Verified" },
    { id: "7", itemNo: 7, category: "Earthworks", smm2Code: "B.1.1", description: "Excavation in Bulk", unit: "m³", quantity: 245.70, dimensions: "Depth: 1.5m avg", confidence: "78%", sourceSheet: "Sheet C-01 (Site Prep)", status: "Needs Review" }
  ]);

  const filteredItems = items.filter(i => {
    const matchesSearch = i.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.smm2Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifiedCount = items.filter(i => i.status === "Verified").length;
  const reviewCount = items.filter(i => i.status === "Needs Review").length;

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
              <span className="text-[#17345F] font-semibold">Quantity Takeoff</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-[#2563EB]" />
              <span>Quantity Takeoff & Verification</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Inspect AI-extracted drawing elements, verify measured quantities against SMM2 standards, and manage estimator approvals.
            </p>
          </div>

          <button 
            onClick={() => alert("Recalculating all quantities using verified geometry...")}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validate Takeoff</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Takeoff Items</p>
              <p className="text-2xl font-bold text-[#17345F]">{items.length}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">Extracted from blueprint sheets</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Verified Items</p>
              <p className="text-2xl font-bold text-[#17345F]">{verifiedCount}</p>
              <p className="text-[10px] text-[#10B981] font-semibold">{Math.round((verifiedCount/items.length)*100)}% approved</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Needs Review</p>
              <p className="text-2xl font-bold text-[#17345F]">{reviewCount}</p>
              <p className="text-[10px] text-[#F59E0B] font-semibold">Requires estimator check</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647A9B]" />
            <input 
              type="text"
              placeholder="Search by description, SMM2 code or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] placeholder-[#647A9B] focus:outline-none focus:border-[#2563EB] font-medium"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option>All Statuses</option>
            <option>Verified</option>
            <option>Needs Review</option>
          </select>
        </div>

        {/* Takeoff Table */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
          <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Quantity Takeoff Schedule</h3>
            <span className="text-[10px] font-mono text-[#647A9B]">Showing {filteredItems.length} items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                  <th className="py-3 px-3">Item</th>
                  <th className="py-3 px-3">SMM2 Code</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-2">Unit</th>
                  <th className="py-3 px-3">Quantity</th>
                  <th className="py-3 px-3">Dimensions / Basis</th>
                  <th className="py-3 px-3">Source Sheet</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F4F8FF]/60 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-semibold text-[#647A9B]">{item.itemNo}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                    <td className="py-3.5 px-4 font-semibold max-w-[180px] truncate">{item.description}</td>
                    <td className="py-3.5 px-3">{item.category}</td>
                    <td className="py-3.5 px-2 font-mono">{item.unit}</td>
                    <td className="py-3.5 px-3 font-mono font-bold">{item.quantity.toLocaleString()}</td>
                    <td className="py-3.5 px-3 font-mono text-[#647A9B]">{item.dimensions}</td>
                    <td className="py-3.5 px-3 text-[#2563EB] font-medium">{item.sourceSheet}</td>
                    <td className="py-3.5 px-3">
                      {item.status === "Verified" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">Verified</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">Needs Review</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button onClick={() => alert(`Viewing source evidence for ${item.description}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="View Source">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => alert(`Editing quantity for ${item.description}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="Edit">
                          <Edit3 className="w-4 h-4" />
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
