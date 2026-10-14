"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Building2, Plus, FileText, Calendar, ArrowRight, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  createdAt: string;
  sheets: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Tana River County Executive Headquarters", location: "Tana River, Kenya", client: "County Government", createdAt: "2026-09-15", sheets: 35 },
    { id: "2", name: "Mtwapa Commercial Complex", location: "Mtwapa, Kenya", client: "Private Developer", createdAt: "2026-07-10", sheets: 18 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newClient, setNewClient] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("blueprint_ai_projects");
    if (saved) {
      try { setProjects(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const proj: Project = {
      id: Date.now().toString(),
      name: newName,
      location: newLocation || "Nairobi, Kenya",
      client: newClient || "Standard Client",
      createdAt: new Date().toISOString().split('T')[0],
      sheets: 0
    };
    const updated = [proj, ...projects];
    setProjects(updated);
    localStorage.setItem("blueprint_ai_projects", JSON.stringify(updated));
    setNewName("");
    setNewLocation("");
    setNewClient("");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("blueprint_ai_projects", JSON.stringify(updated));
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        <div className="flex items-center justify-between bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Projects</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-[#2563EB]" />
              <span>Construction Projects</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">Manage active architectural drawing sets, regional parameters, and estimates.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 relative group">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 bg-[#F4F8FF] text-[#2563EB] font-mono text-[10px] font-bold rounded-lg border border-[#DFE8F5]">
                    KES Region
                  </span>
                  <button onClick={() => handleDelete(proj.id)} className="text-red-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer" title="Delete project">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-[#17345F]">{proj.name}</h3>
                <p className="text-xs text-[#647A9B]">Client: <span className="font-semibold text-[#17345F]">{proj.client}</span></p>
                <p className="text-xs text-[#647A9B]">Location: <span className="font-semibold text-[#17345F]">{proj.location}</span></p>
              </div>

              <div className="pt-4 border-t border-[#DFE8F5] flex items-center justify-between text-xs text-[#647A9B]">
                <div className="flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{proj.sheets} Sheets</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#647A9B]" />
                  <span>{proj.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#DFE8F5] space-y-4">
              <h3 className="text-base font-bold text-[#17345F]">Create New Construction Project</h3>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#17345F] mb-1">Project Name</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    placeholder="e.g., Naivasha Retail Centre" 
                    required 
                    className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17345F] mb-1">Location / Region</label>
                  <input 
                    type="text" 
                    value={newLocation} 
                    onChange={e => setNewLocation(e.target.value)} 
                    placeholder="e.g., Naivasha, Kenya" 
                    className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17345F] mb-1">Client Name</label>
                  <input 
                    type="text" 
                    value={newClient} 
                    onChange={e => setNewClient(e.target.value)} 
                    placeholder="e.g., Rift Valley Holdings" 
                    className="w-full px-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#647A9B] text-xs font-semibold rounded-xl cursor-pointer">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer">Create Project</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
