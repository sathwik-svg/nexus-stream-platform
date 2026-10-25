import React from 'react';
import { ProjectReportData } from '../types/report';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { MockupVisual } from './ScreenshotsMockups';
import {
  ExternalLink,
  Github,
  Mail,
  User,
  Building,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Clock,
  Sparkles,
} from 'lucide-react';

interface DocumentPageViewProps {
  report: ProjectReportData;
  onOpenLiveDemo?: () => void;
  onOpenGitHub?: () => void;
}

export const DocumentPageView: React.FC<DocumentPageViewProps> = ({
  report,
  onOpenLiveDemo,
  onOpenGitHub,
}) => {
  return (
    <div className="max-w-[850px] mx-auto my-6 space-y-8 print:m-0 print:p-0 print:space-y-0 text-slate-900 font-sans">
      {/* ================= PAGE 1 ================= */}
      <div className="print-page bg-white shadow-xl border border-slate-200 rounded-xl print:rounded-none print:shadow-none print:border-none p-8 md:p-12 min-h-[1100px] flex flex-col justify-between relative overflow-hidden">
        {/* Top Header Banner */}
        <div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs text-slate-500 font-mono">
            <span className="font-semibold text-sky-800 tracking-wider uppercase">
              {report.author.organization} — {report.author.department}
            </span>
            <span>CAPSTONE INTERNSHIP REPORT • 2024</span>
          </div>

          {/* Title & Subtitle */}
          <div className="mt-6">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded">
              TECHNICAL REPORT & PROJECT SHOWCASE
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 leading-tight tracking-tight">
              {report.title}
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-1 italic">
              {report.subtitle}
            </p>
          </div>

          {/* Author & Internship Metadata Block */}
          <div className="mt-5 grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs">
            <div className="space-y-1.5">
              <div>
                <span className="text-slate-500 font-medium">Intern Name:</span>{' '}
                <strong className="text-slate-900">{report.author.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Internship Role:</span>{' '}
                <span className="text-slate-800">{report.author.role}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Contact Email:</span>{' '}
                <span className="text-sky-700 font-mono">{report.author.email}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-slate-500 font-medium">Primary Mentor:</span>{' '}
                <strong className="text-slate-900">{report.author.mentor}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Internship Timeline:</span>{' '}
                <span className="text-slate-800">{report.author.internshipPeriod}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Repository:</span>{' '}
                <span className="text-sky-700 underline font-mono truncate block max-w-[220px]">
                  {report.author.githubUrl}
                </span>
              </div>
            </div>
          </div>

          {/* Abstract */}
          <div className="mt-5">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Executive Abstract
            </h2>
            <p className="text-xs md:text-[13px] text-slate-700 leading-relaxed text-justify bg-sky-50/50 p-3.5 rounded border border-sky-100">
              {report.abstract}
            </p>
          </div>

          {/* Section 1: Project Overview & Problem Solved */}
          <div className="mt-5 space-y-4">
            <div className="border-b border-slate-200 pb-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                  1
                </span>
                Project Overview & Problem Solved
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  1.1 Problem Statement & Bottlenecks
                </h3>
                <p className="text-slate-600 leading-relaxed text-[11px] text-justify">
                  {report.problemStatement}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  1.2 Implemented Technical Solution
                </h3>
                <p className="text-slate-600 leading-relaxed text-[11px] text-justify">
                  {report.proposedSolution}
                </p>
              </div>
            </div>

            {/* Core Objectives */}
            <div className="mt-2">
              <h3 className="text-xs font-bold text-slate-800 mb-2">1.3 Core Engineering Objectives</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {report.coreObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded border border-slate-200">
                    <span className="text-sky-700 font-bold shrink-0">#{i + 1}</span>
                    <span className="text-slate-700 leading-snug">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>{report.author.name} • Internship Technical Report</span>
          <span className="font-semibold text-slate-600">Page 1 of 4</span>
          <span>Confidential & Proprietary</span>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="print-page bg-white shadow-xl border border-slate-200 rounded-xl print:rounded-none print:shadow-none print:border-none p-8 md:p-12 min-h-[1100px] flex flex-col justify-between relative overflow-hidden">
        <div>
          {/* Section 2: Technology Stack */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-xs text-slate-500 font-mono mb-4">
            <span className="font-semibold text-sky-800 uppercase">
              {report.title.split(':')[0]} • SYSTEM SPECIFICATION
            </span>
            <span>SECTION 2 & 3</span>
          </div>

          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                  2
                </span>
                Technology Stack & Tooling Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive toolchain selected for high concurrency, type-safety, and millisecond analytical queries.
              </p>
            </div>

            {/* Tech Stack Table */}
            <div className="overflow-hidden border border-slate-200 rounded-lg text-xs">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900 text-white text-[11px] font-mono">
                  <tr>
                    <th className="py-2 px-3 text-left font-semibold">Tier / Category</th>
                    <th className="py-2 px-3 text-left font-semibold">Technology & Version</th>
                    <th className="py-2 px-3 text-left font-semibold">Architecture Role & Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {report.techStack.map((tech, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="py-2 px-3 font-semibold text-sky-800 whitespace-nowrap">
                        {tech.category}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {tech.name} <span className="text-[10px] text-slate-400 font-normal">{tech.version}</span>
                      </td>
                      <td className="py-2 px-3 text-slate-600 leading-snug">
                        {tech.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 3: Architecture Diagram & Workflow */}
            <div className="mt-6 border-b border-slate-200 pb-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                  3
                </span>
                System Architecture & Ingestion Workflow
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-tier decoupled event pipeline ensuring zero message loss and real-time client push.
              </p>
            </div>

            {/* High-Res Print Diagram Component */}
            <div className="mt-2">
              <ArchitectureDiagram nodes={report.architectureNodes} flows={report.architectureFlows} isPrintView={true} />
            </div>

            {/* Workflow steps breakdown */}
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <h3 className="font-bold text-slate-900 text-xs mb-1.5 uppercase tracking-wide">
                End-to-End Workflow Execution Sequence:
              </h3>
              <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-700">
                {report.architectureFlows.map((flow, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-700 shrink-0">Step {i + 1}:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      {flow.from} <ArrowRight className="w-3 h-3 text-sky-600 shrink-0 inline" /> {flow.to}
                    </span>
                    <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded">[{flow.protocol}]</span>
                    <span className="text-slate-600">{flow.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>{report.author.name} • Internship Technical Report</span>
          <span className="font-semibold text-slate-600">Page 2 of 4</span>
          <span>Confidential & Proprietary</span>
        </div>
      </div>

      {/* ================= PAGE 3 ================= */}
      <div className="print-page bg-white shadow-xl border border-slate-200 rounded-xl print:rounded-none print:shadow-none print:border-none p-8 md:p-12 min-h-[1100px] flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-xs text-slate-500 font-mono mb-4">
            <span className="font-semibold text-sky-800 uppercase">
              {report.title.split(':')[0]} • APPLICATION SHOWCASE
            </span>
            <span>SECTION 4 & 5</span>
          </div>

          <div className="border-b border-slate-200 pb-1 mb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                4
              </span>
              Project Showcase (Application Screenshots & Core Interfaces)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Production interfaces engineered during the internship term, including live telemetry, Kafka streams, and query studio.
            </p>
          </div>

          {/* Grid of 4 Core High-Fidelity Screenshots with Captions */}
          <div className="grid grid-cols-2 gap-3.5">
            {report.screenshots.slice(0, 4).map((shot, idx) => (
              <div key={shot.id} className="border border-slate-300 rounded-lg overflow-hidden bg-slate-900 shadow-sm flex flex-col justify-between">
                <div className="bg-slate-950 px-2.5 py-1 text-[10px] text-slate-300 font-mono flex justify-between items-center border-b border-slate-800">
                  <span className="font-bold text-sky-400">Fig {idx + 1}: {shot.title}</span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">{shot.category}</span>
                </div>
                <div className="p-1.5 bg-slate-950">
                  <MockupVisual type={shot.mockType} isCompact={true} />
                </div>
                <div className="bg-white p-2.5 border-t border-slate-200 text-slate-800 text-[10px]">
                  <p className="font-semibold leading-tight text-slate-900">{shot.caption}</p>
                  <p className="text-slate-600 mt-0.5 text-[9px] leading-snug">{shot.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {shot.callouts.slice(0, 2).map((c, i) => (
                      <span key={i} className="text-[8px] bg-slate-100 text-slate-700 px-1 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                        <span>{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: GitHub & Live Demo Links */}
          <div className="mt-5 border-t border-slate-200 pt-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-700" />
              5. Project Repository & Live Demonstration Links
            </h3>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  GitHub Source Repository
                </div>
                <p className="text-[11px] text-slate-600">
                  Clean modular codebase with 85+ automated Vitest suites, Docker compose recipes, and GitHub Actions CI pipeline.
                </p>
                <div className="font-mono text-[11px] text-sky-700 underline truncate">
                  {report.author.githubUrl}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  Live Preview & Demonstration Environment
                </div>
                <p className="text-[11px] text-slate-600">
                  Live staging deployment featuring simulated 100k events/sec traffic generator and interactive query studio.
                </p>
                <div className="font-mono text-[11px] text-emerald-700 underline truncate">
                  {report.author.liveDemoUrl}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>{report.author.name} • Internship Technical Report</span>
          <span className="font-semibold text-slate-600">Page 3 of 4</span>
          <span>Confidential & Proprietary</span>
        </div>
      </div>

      {/* ================= PAGE 4 ================= */}
      <div className="print-page bg-white shadow-xl border border-slate-200 rounded-xl print:rounded-none print:shadow-none print:border-none p-8 md:p-12 min-h-[1100px] flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-xs text-slate-500 font-mono mb-4">
            <span className="font-semibold text-sky-800 uppercase">
              {report.title.split(':')[0]} • CHALLENGES, LEARNINGS & ROADMAP
            </span>
            <span>SECTION 6, 7 & 8</span>
          </div>

          {/* Section 6: Technical Challenges & Solutions */}
          <div className="border-b border-slate-200 pb-1 mb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                6
              </span>
              Technical Challenges Overcome & Solutions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Key engineering hurdles resolved through systematic root-cause analysis and architectural restructuring.
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            {report.challenges.map((c, idx) => (
              <div key={c.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono text-[10px]">
                      Challenge {idx + 1}
                    </span>
                    {c.title}
                  </h4>
                  <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{c.outcomeMetric}</span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  <strong className="text-slate-800">Problem & Root Cause:</strong> {c.problem}
                </div>
                <div className="text-[11px] text-slate-700 leading-snug">
                  <strong className="text-sky-800">Engineering Solution:</strong> {c.solution}
                </div>
              </div>
            ))}
          </div>

          {/* Section 7: Key Learnings */}
          <div className="mt-4 border-b border-slate-200 pb-1 mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                7
              </span>
              Key Learnings & Professional Competencies
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {report.keyLearnings.map((k, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1">
                <div className="font-bold text-sky-900 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" />
                  {k.category}: {k.title}
                </div>
                <p className="text-[10px] text-slate-600 leading-snug">{k.detail}</p>
                <div className="text-[9px] text-slate-500 italic">
                  <strong>Evidence:</strong> {k.evidence}
                </div>
              </div>
            ))}
          </div>

          {/* Section 8: Future Improvements */}
          <div className="mt-4 border-b border-slate-200 pb-1 mb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-slate-900 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-mono">
                8
              </span>
              Future Scalability Roadmap (3 Planned Enhancements)
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            {report.futureImprovements.map((imp, idx) => (
              <div key={imp.id} className="bg-slate-50 border border-slate-200 rounded p-2 text-[10px] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-[11px]">8.{idx + 1} {imp.title}</span>
                </div>
                <span className="inline-block text-[9px] font-semibold bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded">
                  Priority: {imp.priority} • {imp.effort}
                </span>
                <p className="text-slate-600 leading-tight">{imp.description}</p>
                <div className="text-emerald-700 font-medium text-[9px]">
                  Impact: {imp.expectedBenefit}
                </div>
              </div>
            ))}
          </div>

          {/* Section 9: Evaluator Sign-off & Distinction Stamp */}
          <div className="mt-5 bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-emerald-950 text-xs uppercase tracking-wide">
                  Internship Evaluation & Endorsement
                </span>
              </div>
              <p className="text-[11px] text-emerald-900">
                Evaluator: <strong>{report.academicOrCompanySignoff.evaluatorName}</strong> ({report.academicOrCompanySignoff.evaluatorRole})
              </p>
              <p className="text-[10px] text-emerald-800 italic">
                {report.academicOrCompanySignoff.companyStamp}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded shadow-sm">
                {report.academicOrCompanySignoff.gradeOrStatus}
              </span>
              <span className="block text-[9px] text-emerald-700 mt-1 font-mono">VERIFIED BY SRE COMMITTEE</span>
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>{report.author.name} • Internship Technical Report</span>
          <span className="font-semibold text-slate-600">Page 4 of 4 (Final)</span>
          <span>Confidential & Proprietary</span>
        </div>
      </div>
    </div>
  );
};
