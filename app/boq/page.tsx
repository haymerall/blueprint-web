"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  FileText, CheckCircle2, AlertTriangle, Clock, Search, Filter, 
  Download, FileSpreadsheet, ArrowRight, Check, X, Edit3, ShieldCheck, 
  Calculator, RefreshCw, Layers, DollarSign, Plus
} from "lucide-react";

interface BoQItem {
  id: string;
  itemNo: number;
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  status: "Verified" | "Needs Review" | "Pending";
  materialCost: number;
  labourCost: number;
  plantCost: number;
  source: string;
  lastUpdated: string;
}

export default function BoQPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "rates" | "summary" | "compliance">("schedule");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [selectedItemForRate, setSelectedItemForRate] = useState<BoQItem | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  
  const [editRate, setEditRate] = useState(0);
  const [editMaterial, setEditMaterial] = useState(0);
  const [editLabour, setEditLabour] = useState(0);
  const [editPlant, setEditPlant] = useState(0);

  const [items, setItems] = useState<BoQItem[]>([
    { id: "1", itemNo: 1, smm2Code: "A.1.1", description: "Concrete Walls (200mm)", unit: "m³", quantity: 1248.50, rate: 12500, status: "Verified", materialCost: 7500, labourCost: 3500, plantCost: 1500, source: "Market Rate Survey Q1 2026", lastUpdated: "Apr 26, 2025" },
    { id: "2", itemNo: 2, smm2Code: "A.2.1", description: "Reinforced Concrete Columns", unit: "m³", quantity: 48.30, rate: 18000, status: "Verified", materialCost: 11000, labourCost: 5000, plantCost: 2000, source: "Standard East Africa Rates", lastUpdated: "Apr 26, 2025" },
    { id: "3", itemNo: 3, smm2Code: "A.3.1", description: "RC Beams", unit: "m³", quantity: 124.60, rate: 15000, status: "Verified", materialCost: 9000, labourCost: 4500, plantCost: 1500, source: "Standard East Africa Rates", lastUpdated: "Apr 26, 2025" },
    { id: "4", itemNo: 4, smm2Code: "A.4.1", description: "RC Slabs", unit: "m³", quantity: 856.20, rate: 14500, status: "Verified", materialCost: 8500, labourCost: 4500, plantCost: 1500, source: "Standard East Africa Rates", lastUpdated: "Apr 26, 2025" },
    { id: "5", itemNo: 5, smm2Code: "A.5.1", description: "Timber Doors", unit: "No.", quantity: 14.00, rate: 45000, status: "Needs Review", materialCost: 32000, labourCost: 10000, plantCost: 3000, source: "Supplier Quotation #42", lastUpdated: "Apr 24, 2025" },
    { id: "6", itemNo: 6, smm2Code: "A.5.2", description: "Aluminium Windows", unit: "No.", quantity: 18.00, rate: 38000, status: "Verified", materialCost: 28000, labourCost: 8000, plantCost: 2000, source: "Supplier Quotation #11", lastUpdated: "Apr 25, 2025" },
    { id: "7", itemNo: 7, smm2Code: "A.6.1", description: "RC Staircases", unit: "m³", quantity: 2.00, rate: 16000, status: "Verified", materialCost: 10000, labourCost: 4500, plantCost: 1500, source: "Standard East Africa Rates", lastUpdated: "Apr 23, 2025" },
    { id: "8", itemNo: 8, smm2Code: "B.1.1", description: "Excavation", unit: "m³", quantity: 245.70, rate: 2500, status: "Needs Review", materialCost: 0, labourCost: 1200, plantCost: 1300, source: "Site Subcontractor Quote", lastUpdated: "Apr 20, 2025" },
    { id: "9", itemNo: 9, smm2Code: "B.2.2", description: "Backfilling", unit: "m³", quantity: 180.40, rate: 1800, status: "Verified", materialCost: 500, labourCost: 800, plantCost: 500, source: "Standard East Africa Rates", lastUpdated: "Apr 22, 2025" },
    { id: "10", itemNo: 10, description: "Paving Blocks", smm2Code: "C.1.1", unit: "m²", quantity: 420.00, rate: 1200, status: "Pending", materialCost: 800, labourCost: 300, plantCost: 100, source: "Supplier List Price", lastUpdated: "Apr 18, 2025" }
  ]);

  const handleOpenRateModal = (item: BoQItem) => {
    setSelectedItemForRate(item);
    setEditRate(item.rate);
    setEditMaterial(item.materialCost);
    setEditLabour(item.labourCost);
    setEditPlant(item.plantCost);
    setIsRateModalOpen(true);
  };

  const handleSaveRate = () => {
    if (!selectedItemForRate) return;
    setItems(items.map(i => i.id === selectedItemForRate.id ? {
      ...i,
      rate: editRate,
      materialCost: editMaterial,
      labourCost: editLabour,
      plantCost: editPlant,
      lastUpdated: "Today"
    } : i));
    setIsRateModalOpen(false);
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.smm2Code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalEstimatedValue = items.reduce((acc, curr) => acc + (curr.quantity * curr.rate), 0);
  const totalLabourCost = items.reduce((acc, curr) => acc + (curr.quantity * curr.labourCost), 0);
  const totalMaterialCost = items.reduce((acc, curr) => acc + (curr.quantity * curr.materialCost), 0);
  const contingency = Math.round(totalEstimatedValue * 0.10);

  const completedCount = items.filter(i => i.status === "Verified").length;
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
              <span className="text-[#17345F] font-semibold">BoQ & Estimation</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight">BoQ & Estimation</h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Generate Bills of Quantities, apply rates and create estimates from your verified quantities.
            </p>
          </div>

          <div className="flex items-center space-x-3 z-10">
            <select className="px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-xs font-semibold text-[#17345F] focus:outline-none cursor-pointer">
              <option>Kibera Heights Residential Block</option>
              <option>Mombasa Commercial Complex</option>
            </select>
            <button 
              onClick={() => alert("BoQ validated and generated successfully!")}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Generate BoQ</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Items</p>
              <p className="text-2xl font-bold text-[#17345F]">{items.length}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">From verified quantities</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Total Estimated Value</p>
              <p className="text-xl font-bold font-mono text-[#17345F]">KSh {totalEstimatedValue.toLocaleString()}</p>
              <p className="text-[10px] text-[#2563EB] font-semibold">Based on current rates</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F4F8FF] border border-[#DFE8F5] flex items-center justify-center text-[#2563EB]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[#647A9B] font-medium">Completed</p>
              <p className="text-2xl font-bold text-[#17345F]">{completedCount}</p>
              <p className="text-[10px] text-[#10B981] font-semibold">{Math.round((completedCount/items.length)*100)}% of total</p>
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

        {/* Workspace Tabs */}
        <div className="flex border-b border-[#DFE8F5] space-x-6 text-xs font-semibold">
          {[
            { id: "schedule", label: "BoQ Schedule" },
            { id: "rates", label: "Rate Analysis" },
            { id: "summary", label: "Estimate Summary" },
            { id: "compliance", label: "SMM2 Compliance" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? "border-[#2563EB] text-[#2563EB]" 
                  : "border-transparent text-[#647A9B] hover:text-[#17345F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: BoQ Schedule */}
        {activeTab === "schedule" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Main Schedule Table (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden space-y-0">
              
              <div className="p-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#647A9B]" />
                  <input 
                    type="text"
                    placeholder="Search items, description or SMM2 code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>All Statuses</option>
                    <option>Verified</option>
                    <option>Needs Review</option>
                    <option>Pending</option>
                  </select>
                  <button onClick={() => alert("New Rate Added")} className="px-3 py-2 bg-[#2563EB] text-white rounded-xl font-semibold flex items-center space-x-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Rate</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                      <th className="py-3 px-3">Item No.</th>
                      <th className="py-3 px-3">SMM2 Code</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-2">Unit</th>
                      <th className="py-3 px-3">Quantity</th>
                      <th className="py-3 px-3">Rate (KSh)</th>
                      <th className="py-3 px-3">Amount (KSh)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                    {filteredItems.map((item) => {
                      const amount = item.quantity * item.rate;
                      return (
                        <tr key={item.id} className="hover:bg-[#F4F8FF]/50 transition-colors">
                          <td className="py-3.5 px-3 font-mono font-semibold text-[#647A9B]">{item.itemNo}</td>
                          <td className="py-3.5 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                          <td className="py-3.5 px-4 font-semibold max-w-[160px] truncate">{item.description}</td>
                          <td className="py-3.5 px-2 font-mono text-[#647A9B]">{item.unit}</td>
                          <td className="py-3.5 px-3 font-mono font-bold">{item.quantity.toLocaleString()}</td>
                          <td className="py-3.5 px-3 font-mono text-emerald-700 font-semibold">{item.rate.toLocaleString()}</td>
                          <td className="py-3.5 px-3 font-mono font-bold text-[#17345F]">{Math.round(amount).toLocaleString()}</td>
                          <td className="py-3.5 px-3">
                            {item.status === "Verified" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">Verified</span>}
                            {item.status === "Needs Review" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">Needs Review</span>}
                            {item.status === "Pending" && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8FAFC] text-[#647A9B] border border-[#DFE8F5]">Pending</span>}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              <button onClick={() => alert(`Viewing source takeoff for ${item.description}`)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="View Source">
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleOpenRateModal(item)} className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer" title="Edit Rate">
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

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-2.5">
                <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider mb-2">BoQ Actions</h3>
                <button onClick={() => alert("Generating BoQ schedule...")} className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer">
                  <Check className="w-3.5 h-3.5" />
                  <span>Generate BoQ</span>
                </button>
                <button onClick={() => alert("Downloading report...")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer">
                  <Download className="w-3.5 h-3.5 text-[#647A9B]" />
                  <span>Download Report</span>
                </button>
                <button onClick={() => alert("Exported CSV successfully!")} className="w-full py-2.5 px-3 bg-white hover:bg-[#F8FAFC] border border-[#DFE8F5] text-[#17345F] font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#647A9B]" />
                  <span>Export (CSV/Excel)</span>
                </button>
              </div>

              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs space-y-3 text-xs">
                <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Estimation Summary</h3>
                <div className="space-y-2 divide-y divide-[#DFE8F5]">
                  <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Total Value (KSh)</span><span className="font-mono font-bold text-[#17345F]">{totalEstimatedValue.toLocaleString()}</span></div>
                  <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Labour Cost (KSh)</span><span className="font-mono font-semibold text-[#17345F]">{Math.round(totalLabourCost).toLocaleString()}</span></div>
                  <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Material Cost (KSh)</span><span className="font-mono font-semibold text-[#17345F]">{Math.round(totalMaterialCost).toLocaleString()}</span></div>
                  <div className="flex justify-between pt-1.5"><span className="text-[#647A9B]">Contingency (10%)</span><span className="font-mono font-semibold text-[#17345F]">{contingency.toLocaleString()}</span></div>
                  <div className="flex justify-between pt-2 text-sm font-bold text-[#2563EB]"><span>Grand Total (KSh)</span><span className="font-mono">{(totalEstimatedValue + contingency).toLocaleString()}</span></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Rate Analysis */}
        {activeTab === "rates" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#17345F]">Unit Rate Analysis & Component Breakdown</h2>
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Description</th>
                    <th className="py-3 px-3">Material (KSh)</th>
                    <th className="py-3 px-3">Labour (KSh)</th>
                    <th className="py-3 px-3">Plant (KSh)</th>
                    <th className="py-3 px-3 font-bold">Total Unit Rate</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                  {items.map((i) => (
                    <tr key={i.id} className="hover:bg-[#F4F8FF]/50">
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB]">{i.smm2Code}</td>
                      <td className="py-3 px-3 font-semibold">{i.description}</td>
                      <td className="py-3 px-3 font-mono">{i.materialCost.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono">{i.labourCost.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono">{i.plantCost.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-700">{i.rate.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right">
                        <button onClick={() => handleOpenRateModal(i)} className="text-[#2563EB] font-semibold hover:underline cursor-pointer">Edit Rate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Estimate Summary */}
        {activeTab === "summary" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-6 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">Project Financial & Cost Estimate Breakdown</h2>
            <div className="space-y-3 text-xs divide-y divide-[#DFE8F5]">
              <div className="flex justify-between pt-2"><span className="font-semibold text-[#647A9B]">Total Measured Work Value</span><span className="font-mono font-bold text-base text-[#17345F]">KSh {totalEstimatedValue.toLocaleString()}</span></div>
              <div className="flex justify-between pt-2"><span className="font-semibold text-[#647A9B]">Total Labour Component</span><span className="font-mono font-semibold text-[#17345F]">KSh {Math.round(totalLabourCost).toLocaleString()}</span></div>
              <div className="flex justify-between pt-2"><span className="font-semibold text-[#647A9B]">Total Material Component</span><span className="font-mono font-semibold text-[#17345F]">KSh {Math.round(totalMaterialCost).toLocaleString()}</span></div>
              <div className="flex justify-between pt-2"><span className="font-semibold text-[#647A9B]">Contingency Allowance (10%)</span><span className="font-mono font-semibold text-[#17345F]">KSh {contingency.toLocaleString()}</span></div>
              <div className="flex justify-between pt-3 text-sm font-bold text-[#2563EB]"><span>Grand Estimated Total</span><span className="font-mono text-lg">KSh {(totalEstimatedValue + contingency).toLocaleString()}</span></div>
            </div>
          </div>
        )}

        {/* Tab 4: SMM2 Compliance */}
        {activeTab === "compliance" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">SMM2 Measurement Rules Compliance Audit</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="font-semibold text-[#17345F]">Opening Deductions (&gt; 0.5 m² applied)</span>
                <span className="font-bold text-[#10B981]">Passed (100%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="font-semibold text-[#17345F]">Concrete Wastage Factor (5% standard)</span>
                <span className="font-bold text-[#10B981]">Passed</span>
              </div>
            </div>
          </div>
        )}

        {/* Edit Rate Modal */}
        {isRateModalOpen && selectedItemForRate && (
          <div className="fixed inset-0 bg-[#0B1F44]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#DFE8F5] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#F4F8FF] px-2 py-0.5 rounded border border-[#DFE8F5]">
                    {selectedItemForRate.smm2Code}
                  </span>
                  <h3 className="text-sm font-bold text-[#17345F] mt-1">Edit Unit Rate: {selectedItemForRate.description}</h3>
                </div>
                <button onClick={() => setIsRateModalOpen(false)} className="text-[#647A9B] hover:text-[#17345F] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Material Cost (KSh)</label>
                  <input 
                    type="number" 
                    value={editMaterial}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditMaterial(val);
                      setEditRate(val + editLabour + editPlant);
                    }}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl font-mono text-xs focus:outline-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Labour Cost (KSh)</label>
                  <input 
                    type="number" 
                    value={editLabour}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditLabour(val);
                      setEditRate(editMaterial + val + editPlant);
                    }}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl font-mono text-xs focus:outline-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17345F] mb-1">Plant & Equipment (KSh)</label>
                  <input 
                    type="number" 
                    value={editPlant}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditPlant(val);
                      setEditRate(editMaterial + editLabour + val);
                    }}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl font-mono text-xs focus:outline-[#2563EB]"
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-[#17345F]">Total Rate:</span>
                  <span className="font-mono font-bold text-[#2563EB] text-sm">KSh {editRate.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#DFE8F5]">
                  <button onClick={() => setIsRateModalOpen(false)} className="px-4 py-2 border border-[#DFE8F5] text-[#647A9B] rounded-xl font-semibold hover:bg-[#F8FAFC] cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleSaveRate} className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-1 cursor-pointer shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Rate</span>
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
