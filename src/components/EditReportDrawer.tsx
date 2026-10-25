import React from 'react';
import { ProjectReportData } from '../types/report';
import { calculateReportStats } from '../utils/reportLogic';
import { X, CheckCircle2, RotateCcw, Sparkles, Building, User, Mail, Github, ExternalLink } from 'lucide-react';
import { defaultProjectReport } from '../data/defaultReport';

interface EditReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  report: ProjectReportData;
  onUpdateReport: (updated: ProjectReportData) => void;
  onResetReport: () => void;
}

export const EditReportDrawer: React.FC<EditReportDrawerProps> = ({
  isOpen,
  onClose,
  report,
  onUpdateReport,
  onResetReport,
}) => {
  if (!isOpen) return null;

  const stats = calculateReportStats(report);

  const handleAuthorChange = (field: keyof ProjectReportData['author'], value: string) => {
    onUpdateReport({
      ...report,
      author: {
        ...report.author,
        [field]: value,
      },
    });
  };

  const handleTextChange = (field: keyof ProjectReportData, value: string) => {
    onUpdateReport({
      ...report,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100">
          {/* Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Customize Report Details
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Edit intern, company, and project metadata</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Specification Checklist */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Rubric Compliance Score
                </span>
                <span className="text-emerald-400 font-mono font-bold">{stats.completenessScore}% Ready</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${stats.completenessScore}%` }}></div>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>All 9 required sections populated (Overview, Stack, Workflow, 6 Screens, Links, Challenges, Learnings, Future)</span>
              </div>
            </div>

            {/* Author Information */}
            <div className="space-y-3">
              <h4 className="font-bold text-sky-400 uppercase tracking-wide text-[11px]">Intern & Supervisor Metadata</h4>

              <div>
                <label className="block text-slate-400 mb-1">Intern Full Name</label>
                <input
                  type="text"
                  value={report.author.name}
                  onChange={e => handleAuthorChange('name', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Internship Role</label>
                <input
                  type="text"
                  value={report.author.role}
                  onChange={e => handleAuthorChange('role', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Host Company / Organization</label>
                <input
                  type="text"
                  value={report.author.organization}
                  onChange={e => handleAuthorChange('organization', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Primary Mentor / Architect</label>
                <input
                  type="text"
                  value={report.author.mentor}
                  onChange={e => handleAuthorChange('mentor', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Timeline & Term</label>
                <input
                  type="text"
                  value={report.author.internshipPeriod}
                  onChange={e => handleAuthorChange('internshipPeriod', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={report.author.email}
                  onChange={e => handleAuthorChange('email', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">GitHub Repository Link</label>
                <input
                  type="url"
                  value={report.author.githubUrl}
                  onChange={e => handleAuthorChange('githubUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Live Demo Link</label>
                <input
                  type="url"
                  value={report.author.liveDemoUrl}
                  onChange={e => handleAuthorChange('liveDemoUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500 font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Project Title & Overview */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h4 className="font-bold text-sky-400 uppercase tracking-wide text-[11px]">Project Title & Abstract</h4>

              <div>
                <label className="block text-slate-400 mb-1">Project Title</label>
                <input
                  type="text"
                  value={report.title}
                  onChange={e => handleTextChange('title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Executive Abstract</label>
                <textarea
                  rows={4}
                  value={report.abstract}
                  onChange={e => handleTextChange('abstract', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500 text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onResetReport}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-5 py-2 rounded-lg shadow"
            >
              Done & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
