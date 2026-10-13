const fs = require('fs');
const path = require('path');

console.log("[*] Building Quantity Review & SMM2 Correction Workspace...");

const qtDir = path.join('app', 'quantity-takeoff');
if (!fs.existsSync(qtDir)) {
  fs.mkdirSync(qtDir, { recursive: true });
}

const quantityPageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import PDFViewer from "@/components/PDFViewer";
import { 
  FileText, CheckCircle2, AlertTriangle, Edit3, Save, 
  ArrowRight, ShieldCheck, Calculator, RefreshCw, Layers, Check
} from "lucide-react";

interface TakeoffItem {
  id: string;
  smm2Code: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  confidence: string;
  status: "Verified" | "Pending Review" | "Overridden";
}

export default function QuantityTakeoffPage() {
  const [items, setItems] = useState<TakeoffItem[]>([
    { id: "item-1", smm2Code: "A.1.1", description: "Reinforced Concrete Walls (200mm)", unit: "m³", quantity: 1310.5, rate: 14500, confidence: "99.1%", status: "Verified" },
    { id: "item-2", smm2Code: "A.2.1", description: "RC Columns (300x300mm)", unit: "m³", quantity: 52.4, rate: 18200, confidence: "97.5%", status: "Verified" },
    { id: "item-3", smm2Code: "A.3.1", description: "RC Beams & Lintels", unit: "m³", quantity: 142.1, rate: 16800, confidence: "95.0%", status: "Pending Review" },
    { id: "item-4", smm2Code: "A.4.1", description: "Suspended Slabs (150mm thick)", unit: "m³", quantity: 410.0, rate: 15200, confidence: "98.4%", status: "Verified" },
    { id: "item-5", smm2Code: "E.1.2", description: "Solid Core Timber Flush Doors", unit: "No.", quantity: 16, rate: 12500, confidence: "98.2%", status: "Pending Review" },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<number>(0);

  const handleEditStart = (item: TakeoffItem) => {
    setEditingId(item.id);
    setEditQty(item.quantity);
  };

  const handleEditSave = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: editQty, status: "Overridden" };
      }
      return item;
    }));
    setEditingId(null);
  };

  const grandTotal = items.reduce((acc, curr) => acc + (curr.quantity * curr.rate), 0);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Quantity Review Workspace</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight">SMM2 Takeoff & Quantity Correction</h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Verify AI-extracted geometric measurements, apply SMM2 deduction rules, and override quantities before BoQ generation.
            </p>
          </div>

          <button 
            onClick={() => alert("Takeoff quantities approved! Redirecting to BoQ & Estimation...")}
            className="py-2.5 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve & Generate BoQ</span>
          </button>
        </div>

        {/* Split Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Interactive PDF Viewer & CAD Bounding Boxes (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-6">
            <div className="bg-white border border-[#DFE8F5] rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#17345F] uppercase tracking-wider">Drawing Visual Inspector</h3>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#10B981] px-2 py-0.5 rounded border border-emerald-200">
                  ● Scale 1:100 Calibrated
                </span>
              </div>
              <div className="h-[480px] bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <PDFViewer />
              </div>
              <p className="text-[11px] text-[#647A9B] text-center">
                Click bounding boxes on the drawing to highlight corresponding items in the takeoff schedule.
              </p>
            </div>
          </div>

          {/* Right: SMM2 Takeoff Correction Table (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
              <h3 className="text-sm font-bold text-[#17345F]">Itemized SMM2 Measurement Schedule</h3>
              <div className="text-right">
                <p className="text-[10px] text-[#647A9B]">Estimated Subtotal (KES)</p>
                <p className="text-sm font-mono font-bold text-[#2563EB]">
                  KES {grandTotal.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F4F8FF]/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB]">{item.smm2Code}</td>
                      <td className="py-3 px-3 font-semibold max-w-[200px] truncate">{item.description}</td>
                      <td className="py-3 px-3 font-mono text-[#647A9B]">{item.unit}</td>
                      
                      {/* Quantity Column with Inline Editing */}
                      <td className="py-3 px-3 font-mono">
                        {editingId === item.id ? (
                          <input 
                            type="number"
                            value={editQty}
                            onChange={(e) => setEditQty(Number(e.target.value))}
                            className="w-20 px-2 py-1 bg-white border border-[#2563EB] rounded font-mono text-xs focus:outline-none"
                          />
                        ) : (
                          <span className="font-bold">{item.quantity.toLocaleString()}</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3">
                        {item.status === "Verified" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200">
                            Verified
                          </span>
                        )}
                        {item.status === "Pending Review" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#F59E0B] border border-amber-200">
                            Review
                          </span>
                        )}
                        {item.status === "Overridden" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                            Overridden
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-3 text-right">
                        {editingId === item.id ? (
                          <button 
                            onClick={() => handleEditSave(item.id)}
                            className="px-2.5 py-1 bg-[#2563EB] text-white rounded text-[10px] font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleEditStart(item)}
                            className="text-[#647A9B] hover:text-[#2563EB] p-1 cursor-pointer"
                            title="Edit Quantity"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl p-4 text-xs space-y-2">
              <h4 className="font-bold text-[#17345F] flex items-center space-x-1.5">
                <Calculator className="w-4 h-4 text-[#2563EB]" />
                <span>SMM2 Standard Compliance Notes</span>
              </h4>
              <p className="text-[#647A9B] leading-relaxed">
                All concrete elements include a standardized 5% wastage allowance. Openings exceeding $0.5\text{ m}^2$ have been automatically deducted from gross wall surface calculations in accordance with East African Standard Measurement Rules.
              </p>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(qtDir, 'page.tsx'), quantityPageContent);
console.log("[✓] Created app/quantity-takeoff/page.tsx successfully!");
