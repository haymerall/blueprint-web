"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  Calculator, Download, FileText, CheckCircle2, ShieldCheck, 
  MapPin, DollarSign, RefreshCw, Layers, Edit3, Save, Plus
} from "lucide-react";

interface BoQItem {
  id: string;
  itemNo: string;
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  unitRateKES: number;
}

export default function BoQPage() {
  const [region, setRegion] = useState("Nairobi (Baseline)");
  const [contingencyPct, setContingencyPct] = useState(10);
  const [vatPct, setVatPct] = useState(16);

  const [items, setItems] = useState<BoQItem[]>([
    { id: "1", itemNo: "1.01", smm2Code: "A.1.1", description: "Reinforced Concrete Walls (200mm thick, Class 25)", unit: "m³", quantity: 1248.50, unitRateKES: 14500 },
    { id: "2", itemNo: "1.02", smm2Code: "A.2.1", description: "RC Columns (400mm x 400mm)", unit: "m³", quantity: 48.30, unitRateKES: 18200 },
    { id: "3", itemNo: "1.03", smm2Code: "A.3.1", description: "RC Beams (300mm x 600mm)", unit: "m³", quantity: 124.60, unitRateKES: 17500 },
    { id: "4", itemNo: "1.04", smm2Code: "A.4.1", description: "RC Slabs (150mm thick suspended slab)", unit: "m³", quantity: 856.20, unitRateKES: 16800 },
    { id: "5", itemNo: "1.05", smm2Code: "A.5.1", description: "Timber Flush & Panel Doors with Ironmongery", unit: "No.", quantity: 14.00, unitRateKES: 24500 },
    { id: "6", itemNo: "1.06", smm2Code: "A.5.2", description: "Powder-Coated Aluminium Windows", unit: "No.", quantity: 18.00, unitRateKES: 32000 },
    { id: "7", itemNo: "1.07", smm2Code: "B.1.1", description: "Bulk Excavation in Normal Soil", unit: "m³", quantity: 245.70, unitRateKES: 1200 }
  ]);

  // Regional multiplier logic
  const getMultiplier = () => {
    if (region.includes("Mombasa")) return 1.08;
    if (region.includes("Kisumu") || region.includes("Nakuru")) return 0.95;
    if (region.includes("Remote")) return 1.18;
    return 1.0;
  };

  const multiplier = getMultiplier();

  const handleRateChange = (id: string, newRate: number) => {
    setItems(items.map(item => item.id === id ? { ...item, unitRateKES: newRate } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitRateKES * multiplier), 0);
  const contingency = subtotal * (contingencyPct / 100);
  const vat = (subtotal + contingency) * (vatPct / 100);
  const grandTotal = subtotal + contingency + vat;

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
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-[#2563EB]" />
              <span>Bill of Quantities & KES Cost Estimation</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Generate SMM2-compliant BoQs, apply verified regional material rates, and calculate project estimates.
            </p>
          </div>

          <button 
            onClick={() => alert("Generating official PDF & Excel BoQ report with traceability...")}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer z-10"
          >
            <Download className="w-4 h-4" />
            <span>Export Official BoQ</span>
          </button>
        </div>

        {/* Configuration Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-5 shadow-xs text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#17345F] flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#2563EB]" />
              <span>Project Regional Rate Index</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-semibold focus:outline-none cursor-pointer"
            >
              <option>Nairobi (Baseline)</option>
              <option>Mombasa (+8% Logistics)</option>
              <option>Nakuru / Kisumu (-5%)</option>
              <option>Remote Upcountry (+18%)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#17345F] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Contingency Allowance (%)</span>
            </label>
            <input 
              type="number"
              value={contingencyPct}
              onChange={(e) => setContingencyPct(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-mono font-bold focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#17345F] flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4 text-[#2563EB]" />
              <span>Applicable VAT (%)</span>
            </label>
            <input 
              type="number"
              value={vatPct}
              onChange={(e) => setVatPct(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] font-mono font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* BoQ Table */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl shadow-xs overflow-hidden">
          <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#DFE8F5] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Bill of Quantities Schedule (KES)</h3>
            <span className="text-[10px] font-mono text-[#647A9B]">Multiplier Applied: {multiplier}x ({region})</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC]/50 text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                  <th className="py-3 px-3">Item</th>
                  <th className="py-3 px-3">SMM2</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-2">Unit</th>
                  <th className="py-3 px-3">Quantity</th>
                  <th className="py-3 px-3">Unit Rate (KES)</th>
                  <th className="py-3 px-4 text-right">Total Amount (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                {items.map((item) => {
                  const adjustedRate = item.unitRateKES * multiplier;
                  const itemTotal = item.quantity * adjustedRate;
                  return (
                    <tr key={item.id} className="hover:bg-[#F4F8FF]/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-semibold text-[#647A9B]">{item.itemNo}</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                      <td className="py-3.5 px-4 font-semibold max-w-[220px] truncate">{item.description}</td>
                      <td className="py-3.5 px-2 font-mono">{item.unit}</td>
                      <td className="py-3.5 px-3 font-mono font-bold">{item.quantity.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-mono">
                        <input 
                          type="number"
                          value={item.unitRateKES}
                          onChange={(e) => handleRateChange(item.id, Number(e.target.value))}
                          className="w-28 px-2 py-1 bg-[#F8FAFC] border border-[#DFE8F5] rounded-lg font-mono font-semibold text-[#17345F] focus:outline-none focus:border-[#2563EB]"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#17345F]">
                        KES {itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cost Totals Footer */}
          <div className="bg-[#F8FAFC] border-t border-[#DFE8F5] p-6 space-y-2">
            <div className="flex justify-between text-xs text-[#647A9B]">
              <span>Works Subtotal:</span>
              <span className="font-mono font-bold text-[#17345F]">KES {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xs text-[#647A9B]">
              <span>Contingency Allowance ({contingencyPct}%):</span>
              <span className="font-mono font-bold text-[#17345F]">KES {contingency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xs text-[#647A9B]">
              <span>Value Added Tax - VAT ({vatPct}%):</span>
              <span className="font-mono font-bold text-[#17345F]">KES {vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#17345F] border-t border-[#DFE8F5] pt-3">
              <span>Grand Total Estimated Cost:</span>
              <span className="font-mono text-base text-[#2563EB]">KES {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
