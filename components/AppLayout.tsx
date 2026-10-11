"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FolderGit2, FileText, Calculator, 
  BookOpen, BarChart3, Settings, Search, Bell, Menu, X, Building2
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderGit2 },
    { name: "Blueprints", href: "/blueprints", icon: FileText },
    { name: "Quantity Takeoff", href: "/quantity-takeoff", icon: Calculator },
    { name: "BoQ & Estimation", href: "/boq", icon: Calculator },
    { name: "SMM2 Library", href: "/smm2-library", icon: BookOpen },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex font-sans relative">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col justify-between shrink-0 select-none z-30">
        <div>
          <div className="h-16 px-6 flex items-center space-x-2 border-b border-slate-100">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-600/20">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-base">Blueprint AI</span>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[11px] font-medium text-slate-400">Smarter takeoffs.</p>
          <p className="text-[11px] font-medium text-slate-400 mb-4">Better buildings.</p>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">B</div>
            <span className="text-xs font-bold text-slate-700">Blueprint AI</span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs lg:hidden flex">
          <div className="w-64 bg-white h-full flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 text-base">Blueprint AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                        isActive ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="flex-1 cursor-pointer" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-48 sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input 
                type="text" 
                placeholder="Search projects, files, or results..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-12 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
              <div className="absolute right-3 top-2 text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-mono hidden sm:block">⌘K</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="w-9 h-9 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                BL
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">Brace Lenny</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Project Manager</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
