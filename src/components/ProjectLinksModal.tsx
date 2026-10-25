import React, { useState } from 'react';
import { ProjectReportData } from '../types/report';
import { Github, ExternalLink, X, Terminal, GitCommit, CheckCircle2, Play, RefreshCw, Copy, Check } from 'lucide-react';

interface ProjectLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ProjectReportData;
  initialTab?: 'demo' | 'github';
}

export const ProjectLinksModal: React.FC<ProjectLinksModalProps> = ({
  isOpen,
  onClose,
  report,
  initialTab = 'demo',
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'github'>(initialTab);
  const [copied, setCopied] = useState(false);
  const [simulatedEventsCount, setSimulatedEventsCount] = useState(118420);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runBurstSimulation = () => {
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      setSimulatedEventsCount(prev => prev + Math.floor(Math.random() * 4500) + 1200);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <button
                onClick={() => setActiveTab('demo')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'demo' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Live Demo
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'github' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                GitHub Repository
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {activeTab === 'demo' ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-emerald-400" />
                    Live Telemetry Ingestion Environment
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct endpoint running on isolated Kubernetes cluster with synthetic traffic generators.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(report.author.liveDemoUrl)}
                    className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied URL' : 'Copy Demo URL'}
                  </button>
                  <a
                    href={report.author.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold shadow"
                  >
                    Open Live App <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Interactive Ingestion Simulator Testbed */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 font-bold">STREAM PROBE / TESTBED</span>
                  </div>
                  <button
                    onClick={runBurstSimulation}
                    disabled={isSimulating}
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-[11px] px-2.5 py-1 rounded"
                  >
                    {isSimulating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                    Inject 50k Ingestion Burst
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">EVENTS INGESTED (WINDOW)</div>
                    <div className="text-xl font-bold text-sky-400 mt-1 font-mono">
                      {simulatedEventsCount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Sub-second backpressure OK</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">SERVER P99 RESPONSE</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                      {isSimulating ? '48.6 ms' : '41.8 ms'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">SLA Target &lt; 100ms</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">KAFKA REPLICATION LAG</div>
                    <div className="text-xl font-bold text-purple-400 mt-1 font-mono">
                      {isSimulating ? '19 ms' : '11 ms'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">12 active partitions</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded text-[11px] text-slate-400 space-y-1">
                  <div className="text-emerald-400 font-semibold">[SSE STREAM CONNECTED] Session token verified (0x7F)</div>
                  <div>2024-10-25 01:52:12 [BATCH DISPATCH] Flush 2,500 tuples to TimescaleDB hypertable</div>
                  <div>2024-10-25 01:52:13 [ALERT CHECK] Z-score evaluation pass complete: 0 threshold breaches</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Github className="w-5 h-5 text-sky-400" />
                    GitHub Source Repository
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Open-source repository containing full source code, Vitest test suites, and Docker compose manifests.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(report.author.githubUrl)}
                    className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Repo URL'}
                  </button>
                  <a
                    href={report.author.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg font-semibold border border-slate-600"
                  >
                    View on GitHub <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Repo Stats & Commits */}
              <div className="grid grid-cols-4 gap-3 text-center text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">COMMITS</div>
                  <div className="text-base font-bold text-white mt-1">142</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">TEST SUITES</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">88 passing</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">COVERAGE</div>
                  <div className="text-base font-bold text-sky-400 mt-1">92.4%</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">CI STATUS</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">PASSING</div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <div className="text-slate-400 text-[11px] font-bold border-b border-slate-800 pb-1">
                  RECENT REPOSITORY ACTIVITY (FALL 2024)
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-sky-300">feat(stream): implement web worker time-window accumulator</span>
                  <span className="text-slate-500">commit #a89f3c1</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-sky-300">perf(timescaledb): replace single inserts with COPY binary buffer</span>
                  <span className="text-slate-500">commit #b41092e</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-sky-300">security(rbac): embed bitwise permission mask in JWT token payload</span>
                  <span className="text-slate-500">commit #9901d84</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>{report.author.name} • {report.author.organization}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
