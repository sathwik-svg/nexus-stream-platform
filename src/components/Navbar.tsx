import React, { useState } from 'react';
import { ProjectReportData } from '../types/report';
import { generateMarkdownReport } from '../utils/reportLogic';
import {
  FileText,
  Monitor,
  Download,
  Printer,
  Sliders,
  Copy,
  Check,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { ThreeDButton } from './ThreeDButton';

interface NavbarProps {
  currentView: 'showcase' | 'document';
  onViewChange: (view: 'showcase' | 'document') => void;
  onOpenEdit: () => void;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  onPrintPdf: () => void;
  onOpenDemo: () => void;
  onOpenGitHub: () => void;
  report: ProjectReportData;
  isGeneratingPdf?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenEdit,
  onDownloadDocx,
  onDownloadPdf,
  onPrintPdf,
  report,
  isGeneratingPdf = false,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
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
            <div className="text-[11px] text-slate-400 truncate max-w-[180px] md:max-w-none">
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
            className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMd ? 'Copied' : 'Markdown'}</span>
          </button>

          {/* Download DOCX */}
          <ThreeDButton
            size="sm"
            variant="secondary"
            onClick={onDownloadDocx}
            title="Download Word Document (.docx)"
            icon={<Download className="w-3.5 h-3.5 text-emerald-400" />}
          >
            <span className="hidden sm:inline">DOCX</span>
          </ThreeDButton>

          {/* Download PDF (Direct File Download) */}
          <ThreeDButton
            size="sm"
            variant="primary"
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            title="Directly download high-resolution PDF file (4 Pages)"
            icon={isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          >
            <span>{isGeneratingPdf ? 'Building...' : 'Download PDF'}</span>
          </ThreeDButton>

          {/* Browser Print (Secondary) */}
          <button
            onClick={onPrintPdf}
            title="Open browser print preview dialog"
            className="hidden sm:flex items-center text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
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
