import React, { useState } from 'react';
import { ProjectReportData, ProjectScreenshot } from '../types/report';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ScreenshotCard, MockupVisual } from './ScreenshotsMockups';
import {
  Activity,
  Layers,
  Zap,
  Shield,
  Database,
  ArrowRight,
  ExternalLink,
  Github,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Eye,
  Sliders,
  ChevronDown,
  Sparkles,
  Cpu,
  Clock,
  BarChart3,
  X,
  Box,
} from 'lucide-react';
import { ThreeDButton } from './ThreeDButton';
import { Interactive3DScene } from './Interactive3DScene';

interface ShowcaseViewProps {
  report: ProjectReportData;
  onOpenLiveDemo: () => void;
  onOpenGitHub: () => void;
  onSwitchToDocumentView: () => void;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  onPrintPdf: () => void;
  isGeneratingPdf?: boolean;
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({
  report,
  onOpenLiveDemo,
  onOpenGitHub,
  onSwitchToDocumentView,
  onDownloadDocx,
  onDownloadPdf,
  onPrintPdf,
  isGeneratingPdf = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [enlargedScreenshot, setEnlargedScreenshot] = useState<ProjectScreenshot | null>(null);
  const [activeChallengeId, setActiveChallengeId] = useState<string>(report.challenges[0]?.id || '');
  const [architectureMode, setArchitectureMode] = useState<'3d' | 'diagram'>('3d');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Storage', 'DevOps & Cloud', 'Testing & Tools'];

  const filteredTech = selectedCategory === 'All'
    ? report.techStack
    : report.techStack.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Software Engineering Internship Capstone
            </span>
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Production Deployed
            </span>
            <span className="text-slate-400 text-xs font-mono ml-auto">
              {report.author.organization} • {report.author.internshipPeriod}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {report.title}
          </h1>
          <p className="text-base md:text-xl text-slate-300 mt-3 max-w-3xl leading-relaxed">
            {report.subtitle}
          </p>

          <p className="text-sm md:text-base text-slate-400 mt-4 max-w-4xl leading-relaxed bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            {report.abstract}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-mono">PEAK INGESTION</div>
              <div className="text-2xl font-bold text-sky-400 mt-1">120,000+</div>
              <div className="text-[11px] text-slate-500 mt-0.5">events / sec throughput</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-mono">P99 LATENCY</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">42 ms</div>
              <div className="text-[11px] text-slate-500 mt-0.5">SLA target &lt; 100ms</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-mono">AUTOMATION MTTD</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">-72%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">faster incident detection</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-mono">TEST COVERAGE</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">92.4%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">88 unit & integration tests</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-800">
            <ThreeDButton
              variant="primary"
              size="lg"
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              icon={<Download className="w-4 h-4" />}
            >
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Report (4p)'}</span>
            </ThreeDButton>

            <ThreeDButton
              variant="emerald"
              size="lg"
              onClick={onDownloadDocx}
              icon={<Download className="w-4 h-4 text-emerald-200" />}
            >
              Download DOCX
            </ThreeDButton>

            <ThreeDButton
              variant="secondary"
              size="lg"
              onClick={onSwitchToDocumentView}
              icon={<FileText className="w-4 h-4 text-sky-400" />}
            >
              View 4-Page Document
            </ThreeDButton>

            <div className="ml-auto flex items-center gap-2">
              <ThreeDButton
                variant="secondary"
                size="md"
                onClick={onOpenLiveDemo}
                icon={<ExternalLink className="w-4 h-4 text-emerald-400" />}
              >
                Live Demo
              </ThreeDButton>
              <ThreeDButton
                variant="secondary"
                size="md"
                onClick={onOpenGitHub}
                icon={<Github className="w-4 h-4 text-slate-200" />}
              >
                GitHub Code
              </ThreeDButton>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Project Overview & Objectives */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
                01
              </span>
              Project Overview & Problem Solved
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Context, architectural bottlenecks, and business outcomes engineered during the internship term.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-rose-950/60 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-3">
              <AlertTriangle className="w-4 h-4" />
              Problem Statement & Legacy Pain Points
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {report.problemStatement}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-rose-300/80 font-mono">
              Impact: 45-min analytical batch delay & OOM server crashes under peak incidents.
            </div>
          </div>

          <div className="bg-slate-900 border border-emerald-950/60 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              Engineered Solution & Value Proposition
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {report.proposedSolution}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-300/80 font-mono">
              Outcome: Sub-100ms streaming telemetry & 120k events/sec zero-loss ingestion.
            </div>
          </div>
        </div>

        {/* Core Objectives List */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            Core Engineering Objectives Delivered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.coreObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs md:text-sm text-slate-300 leading-snug">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Technology Stack & Tooling */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
                02
              </span>
              Technology Stack & Tooling Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Production technologies selected for concurrency, safety, and sub-millisecond query performance.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTech.map((tech, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl space-y-2 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700">
                  {tech.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{tech.version}</span>
              </div>
              <h4 className="font-bold text-white text-sm">{tech.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Architecture & Workflow Diagram */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
                03
              </span>
              System Architecture & Project Workflow
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore the real-time 3D hardware cluster model with moving data packets or the multi-tier workflow diagram.
            </p>
          </div>

          {/* 3D vs 2D Diagram Mode Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <ThreeDButton
              size="sm"
              variant={architectureMode === '3d' ? 'primary' : 'secondary'}
              onClick={() => setArchitectureMode('3d')}
              icon={<Box className="w-3.5 h-3.5" />}
            >
              3D Real-Time Model
            </ThreeDButton>
            <ThreeDButton
              size="sm"
              variant={architectureMode === 'diagram' ? 'primary' : 'secondary'}
              onClick={() => setArchitectureMode('diagram')}
              icon={<Layers className="w-3.5 h-3.5" />}
            >
              2D Pipeline DAG
            </ThreeDButton>
          </div>
        </div>

        {architectureMode === '3d' ? (
          <Interactive3DScene />
        ) : (
          <ArchitectureDiagram nodes={report.architectureNodes} flows={report.architectureFlows} isPrintView={false} />
        )}
      </section>

      {/* Section 4: Key Features */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
              04
            </span>
            Key Features & Functional Capabilities
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end functionality developed and verified in staging/production environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {report.keyFeatures.map((feat, idx) => (
            <div key={feat.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded">
                  Feature 4.{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                  {feat.impactMetric}
                </span>
              </div>
              <h3 className="font-bold text-white text-base">{feat.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
              <div className="space-y-1 pt-2 border-t border-slate-800">
                {feat.subPoints.map((sp, i) => (
                  <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Application Showcase (Screenshots Gallery) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
                05
              </span>
              Project Showcase ({report.screenshots.length} Screenshots & Interfaces)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click any screenshot card to view high-resolution visual breakdown and design notes.
            </p>
          </div>
          <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
            Click to Enlarge
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {report.screenshots.map(shot => (
            <ScreenshotCard
              key={shot.id}
              screenshot={shot}
              onSelect={() => setEnlargedScreenshot(shot)}
            />
          ))}
        </div>
      </section>

      {/* Section 6: Technical Challenges */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
              06
            </span>
            Technical Challenges & Engineering Solutions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-world concurrency and performance bottlenecks diagnosed and solved during development.
          </p>
        </div>

        <div className="space-y-4">
          {report.challenges.map((c, idx) => {
            const isActive = activeChallengeId === c.id;
            return (
              <div
                key={c.id}
                className={`bg-slate-900 border rounded-xl overflow-hidden transition-all duration-200 ${
                  isActive ? 'border-sky-500 ring-1 ring-sky-500/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  onClick={() => setActiveChallengeId(isActive ? '' : c.id)}
                  className="p-4 md:p-5 cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      C{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-sm md:text-base leading-snug">{c.title}</h3>
                      <div className="text-xs text-slate-400 mt-0.5">{c.context}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded">
                      {c.outcomeMetric}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isActive && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3 text-xs md:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-rose-950/20 border border-rose-900/40 p-3.5 rounded-lg space-y-1">
                        <span className="font-bold text-rose-300 text-xs uppercase tracking-wide block">
                          Problem & Root Cause Analysis
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">{c.problem}</p>
                        <p className="text-slate-400 text-xs italic mt-2">
                          <strong>Root Cause:</strong> {c.rootCause}
                        </p>
                      </div>

                      <div className="bg-emerald-950/20 border border-emerald-900/40 p-3.5 rounded-lg space-y-1">
                        <span className="font-bold text-emerald-300 text-xs uppercase tracking-wide block">
                          Engineering Solution
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">{c.solution}</p>
                        <div className="mt-2 text-xs font-mono text-sky-400 bg-slate-900 p-2 rounded border border-slate-800">
                          <strong>Key Mechanism:</strong> {c.codeOrArchKey}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 7: Key Learnings & Skills Gained */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
              07
            </span>
            Key Technical & Professional Learnings
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Core engineering skills, architectural instincts, and collaborative competencies refined.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.keyLearnings.map((learn, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-[11px] font-mono uppercase bg-slate-800 text-sky-400 px-2.5 py-0.5 rounded border border-slate-700">
                {learn.category}
              </span>
              <h3 className="font-bold text-white text-base mt-2">{learn.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{learn.detail}</p>
              <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-mono flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Evidence: {learn.evidence}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Future Improvements */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono font-bold">
              08
            </span>
            Future Scalability Roadmap (3 Enhancements)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Strategic future architectural initiatives planned for the next platform evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.futureImprovements.map((imp, idx) => (
            <div key={imp.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                    Phase 8.{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                    Priority: {imp.priority} • {imp.effort}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">{imp.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{imp.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-emerald-300/90 font-mono">
                <strong>Target Outcome:</strong> {imp.expectedBenefit}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluator Sign-off Banner */}
      <section className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base uppercase tracking-wider">
              Internship Evaluation & Endorsement
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-300">
            Evaluated by: <strong className="text-white">{report.academicOrCompanySignoff.evaluatorName}</strong> ({report.academicOrCompanySignoff.evaluatorRole})
          </p>
          <p className="text-xs text-slate-400 italic">
            {report.academicOrCompanySignoff.companyStamp}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
          <span className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg font-mono">
            {report.academicOrCompanySignoff.gradeOrStatus}
          </span>
          <button
            onClick={onSwitchToDocumentView}
            className="text-xs text-sky-400 hover:text-sky-300 underline font-mono flex items-center gap-1"
          >
            Review in 4-Page Printable Report View <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Screenshot Enlarge Modal */}
      {enlargedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="font-mono text-xs text-slate-300 font-bold ml-2">
                  {enlargedScreenshot.title} [{enlargedScreenshot.category}]
                </span>
              </div>
              <button
                onClick={() => setEnlargedScreenshot(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 overflow-y-auto">
              <MockupVisual type={enlargedScreenshot.mockType} isCompact={false} />
            </div>

            <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              <div>
                <h4 className="font-bold text-white text-base">{enlargedScreenshot.title}</h4>
                <p className="text-xs text-slate-400 italic mt-0.5">{enlargedScreenshot.caption}</p>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{enlargedScreenshot.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-200 block mb-2">Verified Production Telemetry:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {enlargedScreenshot.callouts.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
