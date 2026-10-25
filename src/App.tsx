/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProjectReportData } from './types/report';
import { defaultProjectReport } from './data/defaultReport';
import { exportReportToDocx } from './utils/docxExport';
import { exportReportPagesToPdf, generateVectorFallbackPdf } from './utils/pdfExport';
import { Navbar } from './components/Navbar';
import { ShowcaseView } from './components/ShowcaseView';
import { DocumentPageView } from './components/DocumentPageView';
import { ProjectLinksModal } from './components/ProjectLinksModal';
import { EditReportDrawer } from './components/EditReportDrawer';
import { CheckCircle2, Download, FileText, Printer, Loader2 } from 'lucide-react';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('internship_report_data', JSON.stringify(report));
    } catch (e) {
      // Ignore quota error
    }
  }, [report]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadDocx = async () => {
    showToast('Generating Microsoft Word (.docx) document...');
    try {
      const blob = await exportReportToDocx(report);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitizedName = (report.author?.name || 'Intern').replace(/\s+/g, '_');
      a.download = `Internship_Project_Report_${sanitizedName}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Word document downloaded successfully!');
    } catch (err) {
      showToast('Failed to export DOCX. Check console.');
      console.error(err);
    }
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    showToast('Building 4-page PDF file...');
    try {
      const container =
        document.getElementById('document-print-root') ||
        document.getElementById('offscreen-pdf-renderer');

      const blob = await exportReportPagesToPdf(report, container, progress => {
        showToast(progress.status);
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitizedName = (report.author?.name || 'Intern').replace(/\s+/g, '_');
      a.download = `Internship_Project_Report_${sanitizedName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('PDF document downloaded successfully!');
    } catch (err) {
      console.warn('DOM PDF export failed, falling back to programmatic PDF:', err);
      try {
        const fallbackBlob = generateVectorFallbackPdf(report);
        const url = URL.createObjectURL(fallbackBlob);
        const a = document.createElement('a');
        a.href = url;
        const sanitizedName = (report.author?.name || 'Intern').replace(/\s+/g, '_');
        a.download = `Internship_Project_Report_${sanitizedName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('PDF downloaded successfully via fallback engine!');
      } catch (fallbackErr) {
        showToast('Failed to export PDF.');
        console.error(fallbackErr);
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintPdf = () => {
    setCurrentView('document');
    showToast('Opening print preview...');
    setTimeout(() => {
      try {
        window.print();
      } catch (e) {
        // If window.print is blocked in iframe, trigger direct PDF download instead!
        handleDownloadPdf();
      }
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
        onDownloadPdf={handleDownloadPdf}
        onPrintPdf={handlePrintPdf}
        onOpenDemo={handleOpenDemo}
        onOpenGitHub={handleOpenGitHub}
        report={report}
        isGeneratingPdf={isGeneratingPdf}
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
            onDownloadPdf={handleDownloadPdf}
            onPrintPdf={handlePrintPdf}
            isGeneratingPdf={isGeneratingPdf}
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
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  Download DOCX
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition-all"
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>{isGeneratingPdf ? 'Building PDF...' : 'Download PDF (4p)'}</span>
                </button>
                <button
                  onClick={handlePrintPdf}
                  title="Print via browser dialog"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-2 rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div id="document-print-root">
              <DocumentPageView
                report={report}
                onOpenLiveDemo={handleOpenDemo}
                onOpenGitHub={handleOpenGitHub}
              />
            </div>
          </div>
        )}
      </main>

      {/* Hidden Offscreen Container for PDF rendering while on Showcase view */}
      <div
        id="offscreen-pdf-renderer"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '850px',
          pointerEvents: 'none',
          zIndex: -100,
          opacity: 0,
        }}
      >
        <DocumentPageView
          report={report}
          onOpenLiveDemo={handleOpenDemo}
          onOpenGitHub={handleOpenGitHub}
        />
      </div>

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
              onClick={handleDownloadPdf}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Download PDF
            </button>
            <span>•</span>
            <button
              onClick={handleDownloadDocx}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Export DOCX
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
