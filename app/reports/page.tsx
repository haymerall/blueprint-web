"use client";
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { FileText, Download, CheckCircle2, FileSpreadsheet, SlidersHorizontal } from "lucide-react";

export default function ReportsPage() {
  const [analysisMeta, setAnalysisMeta] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("blueprint_ai_latest_analysis");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnalysisMeta(parsed.meta);
        setItems(parsed.items || []);
      }
    } catch (e) {}
  }, []);

  const subtotal = items.reduce((sum, i) => sum + (i.quantity * i.rateKES), 0);
  const contingency = subtotal * 0.10;
  const vat = (subtotal + contingency) * 0.16;
  const grandTotal = subtotal + contingency + vat;

  const handleDownloadReport = () => {
    if (selectedFormat === "csv") {
      const headers = "SMM2 Code,Element Description,Category,Quantity,Unit,Unit Rate (KES),Total KES\n";
      const rows = items.map(i => `"${i.smm2Code}","${i.element}","${i.category}",${i.quantity},"${i.unit}",${i.rateKES},${i.quantity * i.rateKES}`).join('\n');
      const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
      downloadBlob(blob, `Blueprint_AI_Takeoff_${Date.now()}.csv`);
    } 
    else if (selectedFormat === "txt") {
      const content = `
BLUEPRINT AI - SMM2 BILL OF QUANTITIES
Project: ${analysisMeta?.projectName || "Tana River County Executive Headquarters"}
Subtotal: KES ${subtotal.toLocaleString()}
Grand Total (Inc. VAT & Contingency): KES ${grandTotal.toLocaleString()}
      `.trim();
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      downloadBlob(blob, `Blueprint_AI_Report_${Date.now()}.txt`);
    }
    else if (selectedFormat === "docx") {
      // Word compatible HTML format
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>Bill of Quantities</title></head>
        <body style="font-family: Arial, sans-serif;">
          <h2 style="color: #17345F;">Blueprint AI - Official Bill of Quantities (SMM2)</h2>
          <p><b>Project:</b> ${analysisMeta?.projectName || "Tana River County Executive Headquarters"}</p>
          <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
          <hr/>
          <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
            <tr style="background: #F4F8FF;">
              <th>SMM2 Code</th><th>Description</th><th>Qty</th><th>Unit</th><th>Rate (KES)</th><th>Total (KES)</th>
            </tr>
            ${items.map(i => `
              <tr>
                <td>${i.smm2Code}</td>
                <td>${i.element}</td>
                <td>${i.quantity}</td>
                <td>${i.unit}</td>
                <td>${i.rateKES.toLocaleString()}</td>
                <td><b>${(i.quantity * i.rateKES).toLocaleString()}</b></td>
              </tr>
            `).join('')}
          </table>
          <h3>Financial Summary</h3>
          <p>Subtotal: KES ${subtotal.toLocaleString()}</p>
          <p>Contingency (10%): KES ${contingency.toLocaleString()}</p>
          <p>VAT (16%): KES ${vat.toLocaleString()}</p>
          <p><b>Grand Total: KES ${grandTotal.toLocaleString()}</b></p>
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
      downloadBlob(blob, `Blueprint_AI_BoQ_${Date.now()}.doc`);
    }
    else {
      // PDF via Print dialog
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Blueprint AI BoQ Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 30px; color: #17345F; }
              h1 { font-size: 20px; border-bottom: 2px solid #2563EB; padding-bottom: 10px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
              th, td { border: 1px solid #DFE8F5; padding: 8px; text-align: left; }
              th { background: #F4F8FF; }
              .summary { margin-top: 20px; font-size: 14px; background: #F8FAFC; padding: 15px; border-radius: 8px; }
            </style>
          </head>
          <body>
            <h1>Blueprint AI - SMM2 Bill of Quantities</h1>
            <p><strong>Project:</strong> ${analysisMeta?.projectName || "Tana River County Executive Headquarters"}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <table>
              <tr><th>SMM2 Code</th><th>Element Description</th><th>Quantity</th><th>Unit</th><th>Rate (KES)</th><th>Total (KES)</th></tr>
              ${items.map(i => `
                <tr>
                  <td>${i.smm2Code}</td>
                  <td>${i.element}</td>
                  <td>${i.quantity}</td>
                  <td>${i.unit}</td>
                  <td>KES ${i.rateKES.toLocaleString()}</td>
                  <td><strong>KES ${(i.quantity * i.rateKES).toLocaleString()}</strong></td>
                </tr>
              `).join('')}
            </table>
            <div class="summary">
              <p>Subtotal: KES ${subtotal.toLocaleString()}</p>
              <p>Contingency (10%): KES ${contingency.toLocaleString()}</p>
              <p>VAT (16% KRA): KES ${vat.toLocaleString()}</p>
              <h3>Grand Total: KES ${grandTotal.toLocaleString()}</h3>
            </div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto pb-12 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#647A9B] mb-1 font-medium">
              <span>Home</span>
              <span>→</span>
              <span className="text-[#17345F] font-semibold">Reports</span>
            </div>
            <h1 className="text-2xl font-bold text-[#17345F] tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[#2563EB]" />
              <span>Project Reports & BoQ Documentation</span>
            </h1>
            <p className="text-xs text-[#647A9B] mt-1">Export official SMM2 quantity surveyor reports in your preferred format.</p>
          </div>
        </div>

        {/* Format Selector & Download Card */}
        <div className="bg-white border border-[#DFE8F5] rounded-2xl p-6 shadow-xs space-y-6 max-w-xl">
          <div className="flex items-center space-x-2 text-sm font-bold text-[#17345F]">
            <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
            <span>Select Export Format</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedFormat === 'pdf' ? 'border-[#2563EB] bg-[#F4F8FF]' : 'border-[#DFE8F5] hover:bg-[#F8FAFC]'}`}>
              <input type="radio" name="exportFormat" value="pdf" checked={selectedFormat === 'pdf'} onChange={() => setSelectedFormat('pdf')} className="text-[#2563EB]" />
              <div>
                <p className="text-xs font-bold text-[#17345F]">PDF Document</p>
                <p className="text-[10px] text-[#647A9B]">Print / Save as PDF</p>
              </div>
            </label>

            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedFormat === 'docx' ? 'border-[#2563EB] bg-[#F4F8FF]' : 'border-[#DFE8F5] hover:bg-[#F8FAFC]'}`}>
              <input type="radio" name="exportFormat" value="docx" checked={selectedFormat === 'docx'} onChange={() => setSelectedFormat('docx')} className="text-[#2563EB]" />
              <div>
                <p className="text-xs font-bold text-[#17345F]">Word Document (.doc)</p>
                <p className="text-[10px] text-[#647A9B]">Editable Microsoft Word</p>
              </div>
            </label>

            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedFormat === 'csv' ? 'border-[#2563EB] bg-[#F4F8FF]' : 'border-[#DFE8F5] hover:bg-[#F8FAFC]'}`}>
              <input type="radio" name="exportFormat" value="csv" checked={selectedFormat === 'csv'} onChange={() => setSelectedFormat('csv')} className="text-[#2563EB]" />
              <div>
                <p className="text-xs font-bold text-[#17345F]">Excel / CSV</p>
                <p className="text-[10px] text-[#647A9B]">Spreadsheet compatible</p>
              </div>
            </label>

            <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedFormat === 'txt' ? 'border-[#2563EB] bg-[#F4F8FF]' : 'border-[#DFE8F5] hover:bg-[#F8FAFC]'}`}>
              <input type="radio" name="exportFormat" value="txt" checked={selectedFormat === 'txt'} onChange={() => setSelectedFormat('txt')} className="text-[#2563EB]" />
              <div>
                <p className="text-xs font-bold text-[#17345F]">Plain Text (.txt)</p>
                <p className="text-[10px] text-[#647A9B]">Raw structured text</p>
              </div>
            </label>
          </div>

          <button 
            onClick={handleDownloadReport}
            className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Report ({selectedFormat.toUpperCase()})</span>
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
