"use client";
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface DetectedElement {
  id: string;
  category: "wall" | "column" | "door" | "window" | "slab";
  label: string;
  color: string;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] in 0-1000 scale
}

interface PDFViewerProps {
  fileUrl?: string;
  elements?: DetectedElement[];
  onElementClick?: (el: DetectedElement) => void;
}

export default function PDFViewer({ fileUrl, elements = [], onElementClick }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    let isMounted = true;

    async function renderPDF() {
      if (!fileUrl) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdfDoc = await loadingTask.promise;
        if (!isMounted) return;

        setNumPages(pdfDoc.numPages);
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setCanvasSize({ width: canvas.width, height: canvas.height });

        await page.render({
          canvasContext: context!,
          viewport: viewport,
        }).promise;

        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error rendering PDF:", err);
        if (isMounted) setLoading(false);
      }
    }

    renderPDF();

    return () => {
      isMounted = false;
    };
  }, [fileUrl, currentPage]);

  const defaultElements: DetectedElement[] = elements.length > 0 ? elements : [
    { id: "1", category: "wall", label: "External Concrete Wall (200mm)", color: "border-blue-500 bg-blue-500/10 text-blue-200", box: [100, 100, 900, 900] },
    { id: "2", category: "column", label: "RC Column C1 (300x300)", color: "border-emerald-500 bg-emerald-500/20 text-emerald-200", box: [150, 150, 250, 250] },
    { id: "3", category: "column", label: "RC Column C2 (300x300)", color: "border-emerald-500 bg-emerald-500/20 text-emerald-200", box: [150, 750, 250, 850] },
    { id: "4", category: "door", label: "Timber Flush Door D1", color: "border-amber-500 bg-amber-500/20 text-amber-200", box: [450, 100, 550, 180] },
    { id: "5", category: "window", label: "Aluminum Casement Window W1", color: "border-purple-500 bg-purple-500/20 text-purple-200", box: [100, 400, 150, 600] }
  ];

  const filteredElements = activeFilter === "all" 
    ? defaultElements 
    : defaultElements.filter(e => e.category === activeFilter);

  return (
    <div className="relative flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden w-full shadow-lg">
      
      {/* Top Toolbar / Filter Overlay */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">Annotation Layers:</span>
          {["all", "wall", "column", "door", "window"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-2.5 py-1 rounded-lg font-semibold uppercase text-[10px] transition-all cursor-pointer ${
                activeFilter === cat 
                  ? "bg-blue-600 text-white shadow" 
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-emerald-400">● Live AI Bounding Boxes Active</span>
      </div>

      {/* Canvas & Bounding Box Container */}
      <div className="relative flex items-center justify-center p-6 bg-slate-950 min-h-[420px] overflow-auto">
        {loading && (
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-slate-300 text-xs z-30 space-y-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Rendering PDF & AI Annotations...</span>
          </div>
        )}

        <div className="relative inline-block shadow-2xl rounded-lg overflow-hidden border border-slate-800">
          <canvas ref={canvasRef} className="block max-w-full h-auto" />

          {/* Interactive Color-Coded Bounding Box Overlays */}
          {!loading && filteredElements.map((el) => {
            const [ymin, xmin, ymax, xmax] = el.box;
            const top = (ymin / 1000) * 100;
            const left = (xmin / 1000) * 100;
            const height = ((ymax - ymin) / 1000) * 100;
            const width = ((xmax - xmin) / 1000) * 100;

            return (
              <div
                key={el.id}
                onClick={() => onElementClick && onElementClick(el)}
                style={{ top: `${top}%`, left: `${left}%`, height: `${height}%`, width: `${width}%` }}
                className="absolute border-2 transition-all cursor-pointer group hover:border-white hover:bg-white/20 rounded-xs flex items-start p-1"
              >
                <div className="absolute -top-7 left-0 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-40 pointer-events-none">
                  {el.label}
                </div>
                <span className={`text-[9px] font-mono px-1 rounded font-bold uppercase ${el.color}`}>
                  {el.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      {numPages > 1 && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
          <span className="font-mono">Sheet {currentPage} of {numPages}</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
              disabled={currentPage === numPages}
              className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
