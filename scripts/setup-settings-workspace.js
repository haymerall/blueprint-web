const fs = require('fs');
const path = require('path');

console.log("[*] Setting up Settings Workspace...");

const settingsDir = path.join('app', 'settings');
if (!fs.existsSync(settingsDir)) {
  fs.mkdirSync(settingsDir, { recursive: true });
}

const pageContent = `"use client";
import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  Settings, User, Building, Users, FileText, BookOpen, Link2, 
  CheckCircle2, AlertTriangle, Save, Shield, Database, Mail, Cpu, RefreshCw
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Form states
  const [fullName, setFullName] = useState("Brace Lenny");
  const [email, setEmail] = useState("brace.lenny@blueprintai.com");
  const [phone, setPhone] = useState("+254 769 977 548");
  const [role, setRole] = useState("Project Manager");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Africa/Nairobi (EAT)");

  const [orgName, setOrgName] = useState("KLM Kenya Safaris");
  const [orgAddress, setOrgAddress] = useState("Nairobi, Kenya");
  const [orgPhone, setOrgPhone] = useState("+254 789 977 548");
  const [orgEmail, setOrgEmail] = useState("info@klmkenyasafaris.com");
  const [orgWebsite, setOrgWebsite] = useState("https://klmkenyasafaris.com");

  const [defaultProjectView, setDefaultProjectView] = useState("List View");
  const [itemsPerPage, setItemsPerPage] = useState("25");
  const [enableNotifs, setEnableNotifs] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showConfidence, setShowConfidence] = useState(true);

  const [reportHeaderTitle, setReportHeaderTitle] = useState("KLM Kenya Safaris");
  const [footerNote, setFooterNote] = useState("Professional Quantity Surveying & Estimation Services");
  const [logoPosition, setLogoPosition] = useState("Top Left");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#3B82F6");

  const handleSave = () => {
    alert("Settings updated and saved successfully!");
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Settings Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-2 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Settings</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Settings className="w-6 h-6 text-[#2563EB]" />
              <span>Settings</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">
              Manage your account, organisation, system preferences and application settings[cite: 6].
            </p>
          </div>
        </div>

        {/* 6 Tabs */}
        <div className="flex flex-wrap border-b border-[#DFE8F5] gap-2 text-xs font-semibold bg-white p-2 rounded-2xl border">
          {[
            { id: "general", label: "General", icon: User },
            { id: "organisation", label: "Organisation", icon: Building },
            { id: "users", label: "Users & Permissions", icon: Users },
            { id: "reports", label: "Reports & Exports", icon: FileText },
            { id: "smm2", label: "SMM2 Configuration", icon: BookOpen },
            { id: "integrations", label: "Integrations", icon: Link2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#2563EB] text-white shadow-sm" 
                    : "text-[#647A9B] hover:bg-[#F8FAFC] hover:text-[#17345F]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: General */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (Account Settings & System Configuration) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Account Settings */}
              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
                  <div>
                    <h3 className="text-sm font-bold text-[#17345F]">Account Settings</h3>
                    <p className="text-xs text-[#647A9B]">Manage your profile and account preferences[cite: 6].</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 py-2">
                  <div className="w-14 h-14 rounded-full bg-[#0B1F44] text-white flex items-center justify-center font-bold text-lg shadow">
                    BL
                  </div>
                  <div>
                    <h4 className="font-bold text-[#17345F]">Brace Lenny</h4>
                    <p className="text-xs text-[#647A9B]">brace.lenny@blueprintai.com</p>
                    <button onClick={() => alert("Change photo")} className="text-xs text-[#2563EB] font-semibold hover:underline mt-0.5 block cursor-pointer">
                      Change photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Role</label>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    >
                      <option>Project Manager</option>
                      <option>Quantity Surveyor</option>
                      <option>Estimator</option>
                      <option>Architect</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Language</label>
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    >
                      <option>English</option>
                      <option>Swahili</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Timezone</label>
                    <select 
                      value={timezone} 
                      onChange={(e) => setTimezone(e.target.value)} 
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F] focus:outline-[#2563EB]"
                    >
                      <option>Africa/Nairobi (EAT)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#DFE8F5]">
                  <button onClick={handleSave} className="py-2 px-4 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                    Update Profile
                  </button>
                  <button onClick={() => alert("Password reset link sent")} className="text-xs text-[#647A9B] hover:text-[#17345F] font-semibold cursor-pointer">
                    Change Password
                  </button>
                </div>
              </div>

              {/* System Configuration */}
              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#DFE8F5]">
                  <h3 className="text-sm font-bold text-[#17345F]">System Configuration</h3>
                  <p className="text-xs text-[#647A9B]">Configure technical settings and integrations[cite: 6].</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">API Base URL</label>
                    <input type="text" defaultValue="https://api.blueprintai.com" className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">File Upload Limit</label>
                    <input type="text" defaultValue="50 MB" className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Organisation Info, Preferences & Branding) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Organisation Information */}
              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#DFE8F5]">
                  <h3 className="text-sm font-bold text-[#17345F]">Organisation Information</h3>
                  <p className="text-xs text-[#647A9B]">Your company details and branding[cite: 6].</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Organisation Name</label>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Address</label>
                    <input type="text" value={orgAddress} onChange={(e) => setOrgAddress(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Phone</label>
                    <input type="text" value={orgPhone} onChange={(e) => setOrgPhone(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Email</label>
                    <input type="text" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <button onClick={handleSave} className="w-full py-2.5 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Branding & Document Settings */}
              <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#DFE8F5]">
                  <h3 className="text-sm font-bold text-[#17345F]">Branding & Document Settings</h3>
                  <p className="text-xs text-[#647A9B]">Configure how your reports and documents look[cite: 6].</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Report Header Title</label>
                    <input type="text" value={reportHeaderTitle} onChange={(e) => setReportHeaderTitle(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17345F] mb-1">Footer Note</label>
                    <input type="text" value={footerNote} onChange={(e) => setFooterNote(e.target.value)} className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-[#17345F] mb-1">Primary Colour</label>
                      <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-8 rounded-lg cursor-pointer border border-[#DFE8F5]" />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#17345F] mb-1">Secondary Colour</label>
                      <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-full h-8 rounded-lg cursor-pointer border border-[#DFE8F5]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Organisation */}
        {activeTab === "organisation" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-6 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">Organisation Profile & Multi-Company Isolation</h2>
            <p className="text-xs text-[#647A9B]">Manage company details, business registration, and multi-tenant security rules.</p>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17345F] mb-1">Company Legal Name</label>
                <input type="text" defaultValue="KLM Kenya Safaris & Construction Ltd" className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]" />
              </div>
              <div>
                <label className="block font-semibold text-[#17345F] mb-1">KRA PIN / Tax ID</label>
                <input type="text" defaultValue="P051293847X" className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl font-mono text-[#17345F]" />
              </div>
              <button onClick={handleSave} className="py-2.5 px-5 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                Save Organisation Profile
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Users & Permissions */}
        {activeTab === "users" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8F5]">
              <div>
                <h3 className="text-sm font-bold text-[#17345F]">Team Members & Access Control</h3>
                <p className="text-xs text-[#647A9B]">Manage invitations, user roles, and project access[cite: 6].</p>
              </div>
              <button onClick={() => alert("Invite user modal opened")} className="py-2 px-4 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                Invite Member
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#647A9B] uppercase font-mono text-[10px] border-b border-[#DFE8F5]">
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE8F5] text-[#17345F]">
                <tr>
                  <td className="py-3 px-3 font-bold">Brace Lenny</td>
                  <td className="py-3 px-3">brace.lenny@blueprintai.com</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-[#F4F8FF] text-[#2563EB] font-semibold">Project Manager</span></td>
                  <td className="py-3 px-3"><span className="text-[#10B981] font-bold">Active</span></td>
                  <td className="py-3 px-3 text-right"><button onClick={() => alert("Edit user")} className="text-[#2563EB] font-semibold hover:underline">Edit</button></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold">Amina Omondi</td>
                  <td className="py-3 px-3">amina.omondi@blueprintai.com</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-[#F8FAFC] text-[#647A9B] font-semibold">Quantity Surveyor</span></td>
                  <td className="py-3 px-3"><span className="text-[#10B981] font-bold">Active</span></td>
                  <td className="py-3 px-3 text-right"><button onClick={() => alert("Edit user")} className="text-[#2563EB] font-semibold hover:underline">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Reports & Exports */}
        {activeTab === "reports" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">Report & Export Defaults</h2>
            <p className="text-xs text-[#647A9B]">Configure default currencies, export formats, and document templates.</p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#17345F] mb-1">Default Currency</label>
                <select className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]">
                  <option>KES (KSh) - Kenyan Shilling</option>
                  <option>USD ($) - US Dollar</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#17345F] mb-1">Default Export Format</label>
                <select className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]">
                  <option>PDF (.pdf)</option>
                  <option>Excel (.xlsx)</option>
                </select>
              </div>
              <button onClick={handleSave} className="py-2.5 px-5 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                Save Report Defaults
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: SMM2 Configuration */}
        {activeTab === "smm2" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">SMM2 Standard Edition & Rules</h2>
            <p className="text-xs text-[#647A9B]">Select the verified measurement standard edition used by projects[cite: 6].</p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#17345F] mb-1">Active Measurement Standard</label>
                <select className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl text-[#17345F]">
                  <option>Standard Method of Measurement (SMM2 - East Africa)</option>
                  <option>BS 4815 Standard Metrics</option>
                </select>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
                <p className="font-bold">Compliance Status: Verified</p>
                <p className="text-[11px]">All automatic calculations adhere to East African standard deduction rules.</p>
              </div>
              <button onClick={handleSave} className="py-2.5 px-5 bg-[#2563EB] text-white font-semibold rounded-xl text-xs hover:bg-blue-700 cursor-pointer shadow-sm">
                Save SMM2 Configuration
              </button>
            </div>
          </div>
        )}

        {/* Tab 6: Integrations */}
        {activeTab === "integrations" && (
          <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-4 max-w-3xl">
            <h2 className="text-sm font-bold text-[#17345F]">External Services & Connection Health</h2>
            <p className="text-xs text-[#647A9B]">Manage Gemini Vision, Redis, database, and background task diagnostics[cite: 6].</p>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <p className="font-bold text-[#17345F]">Google Gemini Vision API</p>
                    <p className="text-[10px] text-[#647A9B]">Drawing analysis and element detection</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="font-bold text-[#17345F]">Redis Task Broker</p>
                    <p className="text-[10px] text-[#647A9B]">Celery background worker queue</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-[#17345F]">PostgreSQL Database</p>
                    <p className="text-[10px] text-[#647A9B]">Primary multi-tenant data store</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#DFE8F5] rounded-xl">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-bold text-[#17345F]">Email Service (SMTP)</p>
                    <p className="text-[10px] text-[#647A9B]">Notifications and automated alerts</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
`;

fs.writeFileSync(path.join(settingsDir, 'page.tsx'), pageContent);
console.log("[✓] Settings Workspace created successfully!");
