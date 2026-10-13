"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { 
  Folder, Plus, Search, Filter, LayoutGrid, List, MoreVertical, 
  Clock, CheckCircle2, AlertCircle, RefreshCw, Layers, Calendar, 
  FileText, ExternalLink, Eye, ArrowRight, Upload, X, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  status: "Processing" | "Completed" | "Queued" | "Failed";
  type: "Residential" | "Commercial" | "Mixed Use";
  floors: number;
  date: string;
  size: string;
  progress: number;
  thumbnail: string;
  fileUrl?: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New project form state
  const [newProjectName, setNewProjectName] = useState("");
  const [newBuildingType, setNewBuildingType] = useState<"Residential" | "Commercial" | "Mixed Use">("Residential");
  const [newFloorCount, setNewFloorCount] = useState(3);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Initial projects matching the inspirational UI mockup
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "Kibera Heights Residential Block",
      status: "Processing",
      type: "Residential",
      floors: 3,
      date: "Apr 26, 2026 • 10:42 AM",
      size: "24.8 MB • PDF",
      progress: 72,
      thumbnail: "bg-blue-50 border-blue-200"
    },
    {
      id: "proj-2",
      name: "Riverside Apartments",
      status: "Completed",
      type: "Residential",
      floors: 5,
      date: "Apr 18, 2026 • 02:15 PM",
      size: "32.6 MB • PDF",
      progress: 100,
      thumbnail: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "proj-3",
      name: "Nairobi Business Centre",
      status: "Queued",
      type: "Commercial",
      floors: 7,
      date: "Apr 15, 2026 • 11:20 AM",
      size: "48.2 MB • PDF",
      progress: 0,
      thumbnail: "bg-slate-50 border-slate-200"
    },
    {
      id: "proj-4",
      name: "Westlands Office Park",
      status: "Processing",
      type: "Commercial",
      floors: 4,
      date: "Apr 12, 2026 • 09:33 AM",
      size: "28.7 MB • PDF",
      progress: 46,
      thumbnail: "bg-blue-50 border-blue-200"
    },
    {
      id: "proj-5",
      name: "Kasarani Residential Estate",
      status: "Completed",
      type: "Residential",
      floors: 2,
      date: "Apr 8, 2026 • 04:12 PM",
      size: "19.4 MB • PDF",
      progress: 100,
      thumbnail: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "proj-6",
      name: "Thika Commercial Complex",
      status: "Failed",
      type: "Commercial",
      floors: 6,
      date: "Apr 5, 2026 • 01:07 PM",
      size: "36.9 MB • PDF",
      progress: 0,
      thumbnail: "bg-rose-50 border-rose-200"
    },
    {
      id: "proj-7",
      name: "Kitengela Housing Project",
      status: "Completed",
      type: "Residential",
      floors: 3,
      date: "Apr 1, 2026 • 09:48 AM",
      size: "22.7 MB • PDF",
      progress: 100,
      thumbnail: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "proj-8",
      name: "Mombasa Seafront Villas",
      status: "Processing",
      type: "Residential",
      floors: 2,
      date: "Mar 28, 2026 • 03:21 PM",
      size: "41.3 MB • PDF",
      progress: 61,
      thumbnail: "bg-blue-50 border-blue-200"
    },
    {
      id: "proj-9",
      name: "Eldoret Mixed Use Development",
      status: "Queued",
      type: "Mixed Use",
      floors: 5,
      date: "Mar 25, 2026 • 10:16 AM",
      size: "52.8 MB • PDF",
      progress: 0,
      thumbnail: "bg-slate-50 border-slate-200"
    }
  ]);

  // Handle switching active project to Dashboard
  const handleOpenProject = (project: Project) => {
    localStorage.setItem("active_project_name", project.name);
    localStorage.setItem("active_file_name", `${project.name.replace(/\s+/g, '_')}.pdf`);
    if (project.fileUrl) {
      localStorage.setItem("active_file_url", project.fileUrl);
    } else {
      localStorage.removeItem("active_file_url");
    }
    router.push("/dashboard");
  };

  // Create new project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName) return;

    setUploading(true);
    let blobUrl = "";
    if (selectedFile) {
      blobUrl = URL.createObjectURL(selectedFile);
    }

    setTimeout(() => {
      setUploading(false);
      setIsModalOpen(false);

      const createdProj: Project = {
        id: `proj-${Date.now()}`,
        name: newProjectName,
        status: "Processing",
        type: newBuildingType,
        floors: newFloorCount,
        date: "Today • Just now",
        size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • PDF` : "25.0 MB • PDF",
        progress: 15,
        thumbnail: "bg-blue-50 border-blue-200",
        fileUrl: blobUrl
      };

      setProjects([createdProj, ...projects]);
      handleOpenProject(createdProj);
    }, 1200);
  };

  // Filter projects based on search term, status, and type
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || p.status === statusFilter;
    const matchesType = typeFilter === "All Types" || p.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate metrics
  const totalProjects = projects.length;
  const inProgressCount = projects.filter(p => p.status === "Processing").length;
  const completedCount = projects.filter(p => p.status === "Completed").length;
  const failedCount = projects.filter(p => p.status === "Failed").length;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Projects</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage and track all your construction projects. Upload blueprints, run analysis, and generate quantity takeoffs.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-sm transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Projects */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                <span>↑ 2 this week</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Folder className="w-5 h-5" />
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">{inProgressCount}</p>
              <p className="text-[10px] text-slate-400 font-medium">
                {Math.round((inProgressCount / totalProjects) * 100)}% of total
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Completed</p>
              <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
              <p className="text-[10px] text-emerald-600 font-medium">
                {Math.round((completedCount / totalProjects) * 100)}% of total
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Failed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Failed</p>
              <p className="text-2xl font-bold text-slate-900">{failedCount}</p>
              <p className="text-[10px] text-rose-500 font-medium">
                {Math.round((failedCount / totalProjects) * 100)}% of total
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Filter and Search Bar Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end">
            
            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Queued</option>
              <option>Failed</option>
            </select>

            {/* Type Dropdown */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option>All Types</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Mixed Use</option>
            </select>

            {/* Sort Dropdown */}
            <select
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option>Sort by: Latest</option>
              <option>Sort by: Name</option>
              <option>Sort by: Size</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-white shadow-xs text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-white shadow-xs text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* 3-Column Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Thumbnail Header + More Menu */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-16 h-16 rounded-xl ${project.thumbnail} flex items-center justify-center shrink-0 overflow-hidden relative border`}>
                    <svg className="w-12 h-12 text-slate-400 opacity-60" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="10" y="10" width="80" height="100" stroke="#3b82f6" fill="#f8fafc" />
                      <line x1="10" y1="40" x2="90" y2="40" />
                      <line x1="50" y1="10" x2="50" y2="110" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {project.name}
                      </h3>
                      <button className="text-slate-300 hover:text-slate-600 p-1 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="mt-1">
                      {project.status === "Processing" && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200/60">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
                          <span>Processing</span>
                        </span>
                      )}
                      {project.status === "Completed" && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      )}
                      {project.status === "Queued" && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Queued</span>
                        </span>
                      )}
                      {project.status === "Failed" && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                          <AlertCircle className="w-3 h-3 text-rose-500" />
                          <span>Failed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Building Details Metadata */}
                <div className="space-y-1.5 text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.type} • <strong className="text-slate-700 font-semibold">{project.floors} Floors</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-[10px] text-slate-400">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.size}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className={project.status === "Failed" ? "text-rose-600" : "text-blue-600"}>
                      {project.status === "Failed" ? "Error" : `${project.progress}%`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.status === "Failed" ? "bg-rose-500" :
                        project.status === "Completed" ? "bg-emerald-500" : "bg-blue-600"
                      }`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <button 
                  onClick={() => handleOpenProject(project)}
                  className="text-slate-600 hover:text-blue-600 flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleOpenProject(project)}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer font-bold"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  + More
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* New Project Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Create New Project & Upload Drawing</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Westlands Commercial Tower" 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Building Type</label>
                    <select
                      value={newBuildingType}
                      onChange={(e: any) => setNewBuildingType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-blue-600"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Mixed Use</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Floor Count</label>
                    <input 
                      type="number" 
                      min={1}
                      value={newFloorCount}
                      onChange={(e) => setNewFloorCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Architectural Drawing (PDF)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                      className="hidden" 
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                      <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                      <p className="font-semibold text-slate-700">{selectedFile ? selectedFile.name : "Click to upload PDF or CAD drawing"}</p>
                      <p className="text-[10px] text-slate-400">Supports floor plans, structural layouts up to 50MB</p>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-2 cursor-pointer disabled:bg-blue-400"
                  >
                    {uploading && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                    <span>{uploading ? "Analyzing drawing..." : "Create & Open Workspace"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
