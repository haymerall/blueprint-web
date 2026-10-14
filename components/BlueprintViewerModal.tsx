"use client";
import React from "react";
import { X, FileText, Download } from "lucide-react";

interface BlueprintViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprintName: string;
  fileUrl: string;
}

export default function BlueprintViewerModal({ isOpen, onClose, blueprintName, fileUrl }: BlueprintViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-[#DFE8F5]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#17345F] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#3b82f6]" />
            <div>
              <h3 className="text-sm font-bold tracking-wide">{blueprintName}</h3>
              <p className="text-[10px] text-white/70 font-mono">Native Document Viewer • Genuine Architectural PDF</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href={fileUrl} 
              download 
              className="px-3 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Native PDF Embed displaying exact uploaded pages */}
        <div className="flex-1 bg-[#F8FAFC] relative">
          <iframe 
            src={`${fileUrl}#toolbar=1&view=FitH`} 
            className="w-full h-full border-0"
            title="Blueprint Native PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}
