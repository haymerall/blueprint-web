"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Blueprint AI East Africa Ltd");
  const [currency, setCurrency] = useState("KES");
  const [vatRate, setVatRate] = useState("16");
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("blueprint_ai_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.orgName) setOrgName(parsed.orgName);
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.vatRate) setVatRate(parsed.vatRate);
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("blueprint_ai_settings", JSON.stringify({ orgName, currency, vatRate }));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-12 space-y-6">
        <div className="flex items-center justify-between bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Settings</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Settings className="w-6 h-6 text-[#2563EB]" />
              <span>Organization & Regional Settings</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">Configure currency, taxation rules, and regional rate parameters.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-6">
          {savedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl">
              Settings successfully saved and synchronized!
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17345F] mb-1">Organization Name</label>
              <input 
                type="text" 
                value={orgName} 
                onChange={e => setOrgName(e.target.value)} 
                className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17345F] mb-1">Base Currency</label>
              <input 
                type="text" 
                value={currency} 
                onChange={e => setCurrency(e.target.value)} 
                className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17345F] mb-1">Standard VAT Rate (%)</label>
              <input 
                type="text" 
                value={vatRate} 
                onChange={e => setVatRate(e.target.value)} 
                className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <button type="submit" className="py-2.5 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer">
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
