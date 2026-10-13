const fs = require('fs');
const path = require('path');

console.log("[*] Setting up SMM2 Library Workspace...");

const libDir = path.join('app', 'smm2-library');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

const pageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, CheckCircle2, AlertTriangle, Search, Filter, 
  Download, Plus, Edit3, Eye, Layers, Check, X, BookOpen, ExternalLink, Copy
} from "lucide-react";

interface SMM2Item {
  id: string;
  smm2Code: string;
  description: string;
  category: string;
  classification: string;
  unit: string;
  status: "Active" | "Needs Review";
  measurementRule: string;
  smm2Reference: string;
}

export default function SMM2LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("Status: All");
  
  const [selectedItem, setSelectedItem] = useState<SMM2Item>({
    id: "1",
    smm2Code: "A.1.1",
    description: "Concrete Walls (200mm)",
    category: "Walls",
    classification: "Masonry",
    unit: "m³",
    status: "Active",
    measurementRule: "Measured to actual finished size, including all openings and returns.",
    smm2Reference: "Section 1: Building Elements Table 1.1"
  });

  const [items, setItems] = useState<SMM2Item[]>([
    { id: "1", smm2Code: "A.1.1", description: "Concrete Walls (200mm)", category: "Walls", classification: "Masonry", unit: "m³", status: "Active", measurementRule: "Measured to actual finished size, including all openings and returns.", smm2Reference: "Section 1: Building Elements Table 1.1" },
    { id: "2", smm2Code: "A.2.1", description: "Reinforced Concrete Columns", category: "Columns", classification: "Concrete", unit: "m³", status: "Active", measurementRule: "Measured by volume of concrete excluding reinforcement steel.", smm2Reference: "Section 1: Building Elements Table 1.2" },
    { id: "3", smm2Code: "A.3.1", description: "RC Beams", category: "Beams", classification: "Concrete", unit: "m³", status: "Active", measurementRule: "Measured net between structural supports.", smm2Reference: "Section 1: Building Elements Table 1.3" },
    { id: "4", smm2Code: "A.4.1", description: "RC Slabs", category: "Slabs", classification: "Concrete", unit: "m³", status: "Active", measurementRule: "Measured across full area with standard wastage included.", smm2Reference: "Section 1: Building Elements Table 1.4" },
    { id: "5", smm2Code: "A.5.1", description: "Timber Doors", category: "Doors", classification: "Joinery", unit: "No.", status: "Active", measurementRule: "Enumerated by individual unit inclusive of frame and ironmongery.", smm2Reference: "Section 2: Joinery Table 2.1" },
    { id: "6", smm2Code: "A.5.2", description: "Aluminium Windows", category: "Windows", classification: "Joinery", unit: "No.", status: "Active", measurementRule: "Enumerated by structural opening size.", smm2Reference: "Section 2: Joinery Table 2.2" },
    { id: "7", smm2Code: "A.6.1", description: "RC Staircases", category: "Staircases", classification: "Concrete", unit: "m³", status: "Active", measurementRule: "Measured by overall volume including waist and treads.", smm2Reference: "Section 3: Structural Stairs" },
    { id: "8", smm2Code: "B.1.1", description: "Excavation", category: "Site Work", classification: "Earthworks", unit: "m³", status: "Active", measurementRule: "Measured in bulk volume prior to compaction.", smm2Reference: "Section 4: Earthworks" },
    { id: "9", smm2Code: "B.2.2", description: "Backfilling", category: "Site Work", classification: "Earthworks", unit: "m³", status: "Needs Review", measurementRule: "Measured as compacted volume in filling voids.", smm2Reference: "Section 4: Earthworks" },
    { id: "10", smm2Code: "C.1.1", description: "Paving Blocks", category: "External Works", classification: "Paving", unit: "m²", status: "Active", measurementRule: "Measured flat surface area.", smm2Reference: "Section 5: External Paving" },
    { id: "11", smm2Code: "D.1.1", description: "Roof Covering", category: "Roofs", classification: "Roofing", unit: "m²", status: "Active", measurementRule: "Measured on slope including laps.", smm2Reference: "Section 6: Roof Coverings" },
    { id: "12", smm2Code: "E.1.1", description: "Electrical Wiring", category: "Electrical", classification: "Electrical", unit: "m", status: "Active", measurementRule: "Measured linearly along cable routes.", smm2Reference: "Section 7: Electrical Installations" }
  ]);

  const filteredItems = items.filter(i => {
    const matchesSearch = i.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.smm2Code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || i.category === categoryFilter;
    const matchesStatus = statusFilter === "Status: All" || (statusFilter === "Active" ? i.status === "Active" : i.status === "Needs Review");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const compliantCount = items.filter(i => i.status === "Active").length;
  const reviewCount = items.filter(i => i.status === "Needs Review").length;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* SMM2 Library Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">SMM2 Library</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-[#2563EB]" />
              <span>SMM2 Library</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Access and manage SMM2 measurement classifications, rules and unit standards for accurate quantity takeoffs and compliant bills of quantities.
            </p>
          </div>

          <button 
            onClick={() => alert("Add Classification modal opened")}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
          >
            <Plus className="w-4 h-4" />
            <span>Add Classification</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Classifications</p>
              <p className="text-2xl font-bold text-[#17345F]">{items.length}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">↑ 5% from last month</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Measurement Rules</p>
              <p className="text-2xl font-bold text-[#17345F]">1,024</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">↑ 7% from last month</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">SMM2 Compliant</p>
              <p className="text-2xl font-bold text-[#17345F]">{compliantCount}</p>
              <p className="text-[10px] text-[#10B981] font-semibold">{Math.round((compliantCount/items.length)*100)}% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Needs Review</p>
              <p className="text-2xl font-bold text-[#17345F]">{reviewCount}</p>
              <p className="text-[10px] text-[#F59E0B] font-semibold">{Math.round((reviewCount/items.length)*100)}% of total</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647A9B]" />
            <input 
              type="text"
              placeholder="Search by code, description or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] placeholder-[#647A9B] focus:outline-none focus:border-[#2563EB] font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Walls</option>
              <option>Columns</option>
              <option>Beams</option>
              <option>Slabs</option>
              <option>Doors</option>
              <option>Site Work</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>Status: All</option>
              <option>Active</option>
              <option>Needs Review</option>
            </select>
          </div>
        </div>

        {/* Main Workspace Layout (Table + Right Details Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Classification Register Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Classification Register</h3>
              <span className="text-[10px] font-mono text-[#647A9B]">Showing {filteredItems.length} of {items.length} classifications</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                    <th className="py-3 px-3"><input type="checkbox" className="rounded border-[#DFE8F5]" /></th>
                    <th className="py-3 px-3">SMM2 Code</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Classification</th>
                    <th className="py-3 px-2">Unit</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                  {filteredItems.map((item) => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <tr 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className={`hover:bg-[#F4F8FF]/60 transition-colors cursor-pointer ${isSelected ? "bg-[#F4F8FF]" : ""}`}
                      >
                        <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-[#DFE8F5]" /></td>
                        <td className="py-3.5 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                        <td className="py-3.5 px-4 font-semibold max-w-[180px] truncate">{item.description}</td>
                        <td className="py-3.5 px-3">{item.category}</td>
                        <td className="py-3.5 px-3 text-[#647A9B]">{item.classification}</td>
                        <td className="py-3.5 px-2 font-mono">{item.unit}</td>
                        <td className="py-3.5 px-3">
                          {item.status === "Active" ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">Active</span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">Needs Review</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1.5">
                            <button onClick={() => setSelectedItem(item)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="View">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => alert(`Editing ${item.smm2Code}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="Edit">
                              <Edit3 className="w-3.5 h-3.5" />
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

          {/* Right Classification Details Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-5 sticky top-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
              <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span>Classification Details</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">
                {selectedItem.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">SMM2 Code</span>
                <span className="font-mono font-bold text-[#2563EB]">{selectedItem.smm2Code}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Description</span>
                <span className="font-semibold text-[#17345F]">{selectedItem.description}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Category</span>
                <span className="font-semibold text-[#17345F]">{selectedItem.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Classification</span>
                <span className="font-semibold text-[#17345F]">{selectedItem.classification}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">Unit</span>
                <span className="font-mono font-bold text-[#17345F]">{selectedItem.unit}</span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-[#647A9B] uppercase font-mono">Measurement Rule</span>
                <p className="p-3 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] leading-relaxed">
                  {selectedItem.measurementRule}
                </p>
              </div>

              <div className="flex justify-between py-1 border-b border-[#DFE8F5]">
                <span className="text-[#647A9B]">SMM2 Reference</span>
                <span className="font-mono text-[11px] text-[#17345F]">{selectedItem.smm2Reference}</span>
              </div>
            </div>

            {/* Related Items & Links */}
            <div className="space-y-2 pt-2 border-t border-[#DFE8F5] text-xs">
              <h4 className="font-bold text-[#17345F] uppercase tracking-wider text-[11px]">Related Items</h4>
              <button onClick={() => alert("Navigating to Quantity Takeoff...")} className="w-full p-2.5 bg-[#F8FAFC] hover:bg-[#F4F8FF] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold flex items-center justify-between cursor-pointer">
                <span>View in Quantity Takeoff</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
              </button>
              <button onClick={() => alert("Opening SMM2 Guide Reference...")} className="w-full p-2.5 bg-[#F8FAFC] hover:bg-[#F4F8FF] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold flex items-center justify-between cursor-pointer">
                <span>SMM2 Guide Reference</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-[#17345F] uppercase tracking-wider text-[11px]">Quick Actions</h4>
              <button onClick={() => alert("Edit Classification")} className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-sm">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Classification</span>
              </button>
              <button onClick={() => alert("Duplicated classification successfully")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer">
                <Copy className="w-3.5 h-3.5 text-[#647A9B]" />
                <span>Duplicate</span>
              </button>
            </div>

            {/* Compliance Note Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs space-y-1">
              <p className="font-bold text-[#17345F] flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>SMM2 Compliance</span>
              </p>
              <p className="text-[#647A9B] text-[11px]">
                This classification is compliant with SMM2 2021 standards[cite: 4].
              </p>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(libDir, 'page.tsx'), pageContent);
console.log("[✓] SMM2 Library Workspace created successfully!");
