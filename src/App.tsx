/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProjectReportData } from './types/report';
import { defaultProjectReport } from './data/defaultReport';
import { exportReportToDocx } from './utils/docxExport';
import { Navbar } from './components/Navbar';
import { ShowcaseView } from './components/ShowcaseView';
import { DocumentPageView } from './components/DocumentPageView';
import { ProjectLinksModal } from './components/ProjectLinksModal';
import { EditReportDrawer } from './components/EditReportDrawer';
import { CheckCircle2, Download, FileText, ArrowRight, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'showcase' | 'document'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'document') return 'document';
    }
    return 'showcase';
  });

  const [report, setReport] = useState<ProjectReportData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('internship_report_data');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // Fallback to default
      }
    }
    return defaultProjectReport;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'demo' | 'github'>('demo');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('internship_report_data', JSON.stringify(report));
    } catch (e) {
      // Ignore quota error
    }
  }, [report]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadDocx = async () => {
    showToast('Generating Microsoft Word (.docx) document...');
    try {
      const blob = await exportReportToDocx(report);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitizedName = report.author.name.replace(/\s+/g, '_');
      a.download = `Internship_Project_Report_${sanitizedName}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Document downloaded successfully!');
    } catch (err) {
      showToast('Failed to export DOCX. Check console.');
      console.error(err);
    }
  };

  const handlePrintPdf = () => {
    setCurrentView('document');
    showToast('Preparing 4-page print preview layout...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleOpenDemo = () => {
    setModalTab('demo');
    setIsLinksModalOpen(true);
  };

  const handleOpenGitHub = () => {
    setModalTab('github');
    setIsLinksModalOpen(true);
  };

  const handleResetReport = () => {
    setReport(defaultProjectReport);
    showToast('Report reset to default template!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenEdit={() => setIsEditOpen(true)}
        onDownloadDocx={handleDownloadDocx}
        onPrintPdf={handlePrintPdf}
        onOpenDemo={handleOpenDemo}
        onOpenGitHub={handleOpenGitHub}
        report={report}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'showcase' ? (
          <ShowcaseView
            report={report}
            onOpenLiveDemo={handleOpenDemo}
            onOpenGitHub={handleOpenGitHub}
            onSwitchToDocumentView={() => setCurrentView('document')}
            onDownloadDocx={handleDownloadDocx}
            onPrintPdf={handlePrintPdf}
          />
        ) : (
          <div className="space-y-4 pb-16">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center font-bold">
                  4p
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Official 4-Page Executive Document View</h3>
                  <p className="text-xs text-slate-400">
                    Formatted with institutional headers, page breaks, figure captions, tabular challenges, and evaluator sign-off.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadDocx}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  Download DOCX
                </button>
                <button
                  onClick={handlePrintPdf}
                  className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Print / Save to PDF
                </button>
              </div>
            </div>

            <DocumentPageView
              report={report}
              onOpenLiveDemo={handleOpenDemo}
              onOpenGitHub={handleOpenGitHub}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-xs text-slate-500 print:hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Internship Project Showcase & Report Deliverable</span>
            <span>•</span>
            <span>{report.author.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView(currentView === 'showcase' ? 'document' : 'showcase')}
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Switch to {currentView === 'showcase' ? '4-Page Document View' : 'Interactive Showcase'}
            </button>
            <span>•</span>
            <button
              onClick={handleDownloadDocx}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Export .docx
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-sky-500/50 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Project Links Modal */}
      <ProjectLinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        report={report}
        initialTab={modalTab}
      />

      {/* Customize Drawer */}
      <EditReportDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        report={report}
        onUpdateReport={setReport}
        onResetReport={handleResetReport}
      />
    </div>
  );
}
