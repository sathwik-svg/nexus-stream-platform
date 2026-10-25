import React, { useState } from 'react';
import { ProjectReportData } from '../types/report';
import { generateMarkdownReport } from '../utils/reportLogic';
import {
  FileText,
  Monitor,
  Download,
  Printer,
  Sliders,
  Github,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'showcase' | 'document';
  onViewChange: (view: 'showcase' | 'document') => void;
  onOpenEdit: () => void;
  onDownloadDocx: () => void;
  onPrintPdf: () => void;
  onOpenDemo: () => void;
  onOpenGitHub: () => void;
  report: ProjectReportData;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenEdit,
  onDownloadDocx,
  onPrintPdf,
  onOpenDemo,
  onOpenGitHub,
  report,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport(report);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 print:hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-1.5">
              <span>Internship Technical Report</span>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.2 rounded">
                Deliverable
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[200px] md:max-w-none">
              {report.author.name} • {report.author.role}
            </div>
          </div>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onViewChange('showcase')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'showcase'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interactive</span> Showcase
          </button>
          <button
            onClick={() => onViewChange('document')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'document'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>4-Page Document</span>
          </button>
        </div>

        {/* Actions & Export */}
        <div className="flex items-center gap-2">
          {/* Quick Copy Markdown */}
          <button
            onClick={handleCopyMarkdown}
            title="Copy Report in Markdown"
            className="hidden md:flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMd ? 'Copied MD' : 'Copy MD'}</span>
          </button>

          {/* Download DOCX */}
          <button
            onClick={onDownloadDocx}
            title="Download Word Document (.docx)"
            className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">DOCX</span>
          </button>

          {/* Export PDF (Print) */}
          <button
            onClick={onPrintPdf}
            title="Export as PDF Document via Print"
            className="flex items-center gap-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white font-semibold px-3.5 py-1.5 rounded-lg shadow-sm shadow-sky-600/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF (3-5p)</span>
          </button>

          {/* Edit / Customize */}
          <button
            onClick={onOpenEdit}
            title="Edit Report Details"
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <Sliders className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
