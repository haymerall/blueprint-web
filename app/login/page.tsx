"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    localStorage.setItem(
      "blueprint_ai_user",
      JSON.stringify({
        email,
        fullName: "Project Manager",
        orgName: "Blueprint AI Partner",
      })
    );

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col justify-between items-center p-6 font-sans overflow-hidden select-none">
      
      {/* Background Architectural Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] flex justify-between items-center px-10">
        <div className="w-[450px] h-[450px] border-2 border-[#17345F] relative p-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#17345F]">
          <div className="border border-[#17345F] p-2 flex flex-col justify-between">
            <span>BEDROOM 1</span>
            <span className="text-right">7200</span>
          </div>
          <div className="border border-[#17345F] p-2 flex flex-col justify-between">
            <span>LIVING ROOM</span>
            <span className="text-right">5400</span>
          </div>
          <div className="border border-[#17345F] p-2 flex justify-between items-end">
            <span>BATH</span>
            <span>KITCHEN</span>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-dashed border-[#17345F] rounded-full flex items-center justify-center text-[10px] font-mono text-[#17345F]">
          <span>N</span>
        </div>

        <div className="w-[500px] h-[500px] border border-[#17345F] rounded-lg rotate-12 flex items-center justify-center font-mono text-xs text-[#17345F]/60">
          [ISOMETRIC ARCHITECTURAL CAD GRID]
        </div>
      </div>

      {/* Top Header Navigation Tagline */}
      <header className="w-full max-w-7xl flex justify-end items-center z-10 text-[10px] font-mono tracking-widest text-[#647A9B] uppercase">
        <span>PRECISION</span>
        <span className="mx-2">/</span>
        <span>EFFICIENCY</span>
        <span className="mx-2">/</span>
        <span>BETTER BUILDS</span>
      </header>

      {/* Centered Sign-In Card */}
      <div className="w-full max-w-md bg-white border border-[#DFE8F5] rounded-2xl shadow-xl p-8 z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl mx-auto flex items-center justify-center text-white shadow-sm font-bold text-lg">
            ▲
          </div>
          <h1 className="text-xl font-bold text-[#17345F] tracking-tight">Blueprint AI</h1>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#17345F]">Sign in</h2>
          <p className="text-xs text-[#647A9B]">Enter your credentials to access your projects.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#17345F] mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#647A9B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#17345F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17345F] mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-[#647A9B]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-9 pr-10 py-2 text-xs border border-[#DFE8F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#17345F]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#647A9B] hover:text-[#17345F] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-xs text-[#2563EB] font-medium hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>

      {/* Footer Info & Blueprint Block */}
      <footer className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between text-[11px] text-[#647A9B] z-10 pt-4">
        <div></div>
        
        <div className="text-center text-[10px]">
          <p>Built for better building decisions.</p>
          <p>© 2026 Blueprint AI</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xs border border-[#DFE8F5] p-3 rounded-lg text-[10px] font-mono space-y-1 w-48 shadow-2xs">
          <div className="flex justify-between border-b border-[#DFE8F5] pb-1">
            <span className="text-[#647A9B]">PROJECT</span>
            <span className="font-bold text-[#17345F]">RESIDENTIAL BUILDING</span>
          </div>
          <div className="flex justify-between border-b border-[#DFE8F5] pb-1">
            <span className="text-[#647A9B]">SCALE</span>
            <span className="font-bold text-[#17345F]">1 : 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#647A9B]">DATE</span>
            <span className="font-bold text-[#17345F]">2026-03-21</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
