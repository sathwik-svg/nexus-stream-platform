import React from 'react';
import { ProjectScreenshot } from '../types/report';
import { Activity, Database, GitBranch, Terminal, ShieldCheck, Cpu, ArrowUpRight, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface MockupProps {
  screenshot: ProjectScreenshot;
  onSelect?: () => void;
  isCompact?: boolean;
}

export const MockupVisual: React.FC<{ type: ProjectScreenshot['mockType']; isCompact?: boolean }> = ({ type, isCompact = false }) => {
  switch (type) {
    case 'dashboard':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-200">CLUSTER: PROD-US-EAST-1</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">118,420 evt/s</span>
              <span>p99: 42ms</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
              <div className="text-[10px] text-slate-400">INGESTION RATE</div>
              <div className="text-base font-bold text-sky-400 mt-1">118.4k <span className="text-[10px] font-normal text-slate-500">ops/s</span></div>
              <div className="h-8 mt-2 flex items-end gap-1">
                {[45, 60, 55, 75, 80, 95, 85, 90, 78, 92, 88, 96].map((val, i) => (
                  <div key={i} className="flex-1 bg-sky-500/80 rounded-t" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
              <div className="text-[10px] text-slate-400">P99 LATENCY</div>
              <div className="text-base font-bold text-emerald-400 mt-1">42.1 <span className="text-[10px] font-normal text-slate-500">ms</span></div>
              <div className="h-8 mt-2 flex items-end gap-1">
                {[50, 48, 52, 49, 45, 42, 44, 43, 41, 42, 40, 42].map((val, i) => (
                  <div key={i} className="flex-1 bg-emerald-500/80 rounded-t" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
              <div className="text-[10px] text-slate-400">ACTIVE PODS</div>
              <div className="text-base font-bold text-amber-400 mt-1">48 / 48 <span className="text-[10px] font-normal text-slate-500">healthy</span></div>
              <div className="h-8 mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400">CPU: 42%</span>
                <span className="text-sky-400">MEM: 58%</span>
              </div>
            </div>
          </div>

          {!isCompact && (
            <div className="mt-3 bg-slate-900/90 border border-slate-800 p-2 rounded">
              <div className="flex justify-between text-[11px] text-slate-400 pb-1 mb-1 border-b border-slate-800">
                <span>SERVICE TOPIC</span>
                <span>STATUS</span>
                <span>THROUGHPUT</span>
                <span>ERROR %</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span className="text-sky-300 font-mono">telemetry.api.gateway</span>
                  <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> 200 OK</span>
                  <span>45,120/s</span>
                  <span className="text-emerald-400">0.001%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-sky-300 font-mono">telemetry.kafka.raw</span>
                  <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> Synced</span>
                  <span>73,300/s</span>
                  <span className="text-emerald-400">0.000%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case 'pipeline':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-slate-200">KAFKA TOPIC: telemetry.events.v1</span>
            </div>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
              12/12 PARTITIONS SYNCED
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="text-slate-400 text-[10px]">CONSUMER LAG</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">12 ms</div>
              <div className="text-[10px] text-slate-500 mt-1">SLA Threshold: &lt; 250ms</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <div className="text-slate-400 text-[10px]">COMPRESSION RATIO (SNAPPY)</div>
              <div className="text-lg font-bold text-sky-400 mt-1">64.2%</div>
              <div className="text-[10px] text-slate-500 mt-1">Bandwidth Saved: 1.4 TB/day</div>
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            {[0, 1, 2, 3].map(partition => (
              <div key={partition} className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded border border-slate-850 text-[10px]">
                <span className="text-slate-400 w-16">Part #{partition}</span>
                <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full" style={{ width: `${80 + partition * 4}%` }}></div>
                </div>
                <span className="text-slate-300 w-20 text-right">9,840 msg/s</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'workflow':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="font-semibold text-slate-200">AUTOMATION DAG: SLA Breaches & PagerDuty</span>
            <span className="text-xs bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700">Active Rule</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 py-2">
            <div className="flex-1 bg-slate-900 border border-sky-600/50 p-2 rounded text-center">
              <div className="text-[9px] text-sky-400 uppercase font-semibold">1. Trigger Event</div>
              <div className="text-[11px] font-bold text-slate-200 mt-0.5">Rolling p99 &gt; 100ms</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Window: 180s</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="flex-1 bg-slate-900 border border-amber-600/50 p-2 rounded text-center">
              <div className="text-[9px] text-amber-400 uppercase font-semibold">2. Debounce Filter</div>
              <div className="text-[11px] font-bold text-slate-200 mt-0.5">Z-Score &gt; 3.0</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Suppress jitter</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="flex-1 bg-slate-900 border border-emerald-600/50 p-2 rounded text-center">
              <div className="text-[9px] text-emerald-400 uppercase font-semibold">3. Dispatch</div>
              <div className="text-[11px] font-bold text-slate-200 mt-0.5">PagerDuty + Slack</div>
              <div className="text-[9px] text-slate-400 mt-0.5">#sre-oncall</div>
            </div>
          </div>

          <div className="mt-2 bg-slate-900/90 p-2 rounded border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Last trigger: 14m ago (Resolved automatically)</span>
            <span className="text-emerald-400">Success rate: 100%</span>
          </div>
        </div>
      );

    case 'query':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-200">QUERY STUDIO: TimescaleDB Hypertable</span>
            </div>
            <span className="text-emerald-400 text-[10px]">EXECUTION TIME: 342ms</span>
          </div>

          <div className="mt-2 bg-slate-900 p-2 rounded border border-slate-800 text-[10px] text-slate-300 leading-relaxed font-mono">
            <span className="text-purple-400">SELECT</span> time_bucket(<span className="text-amber-300">'1 minute'</span>, time) <span className="text-purple-400">AS</span> window, service_id,<br />
            &nbsp;&nbsp;approx_percentile(<span className="text-sky-300">0.99</span>, percentile_agg(latency_ms)) <span className="text-purple-400">AS</span> p99_latency<br />
            <span className="text-purple-400">FROM</span> telemetry_metrics<br />
            <span className="text-purple-400">WHERE</span> time &gt; NOW() - INTERVAL <span className="text-amber-300">'1 hour'</span><br />
            <span className="text-purple-400">GROUP BY</span> window, service_id <span className="text-purple-400">ORDER BY</span> window <span className="text-purple-400">DESC</span>;
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
            <span>Scanned: 1,240,000 hypertable chunks</span>
            <span className="text-sky-400">Continuous Aggregate Cache Hit</span>
          </div>
        </div>
      );

    case 'audit':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-200">RBAC & AUDIT LOG (SHA-256 Chained)</span>
            </div>
            <span className="text-sky-400 text-[10px]">Zero Tamper Events</span>
          </div>

          <div className="mt-2 space-y-1.5 text-[10px]">
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400">2024-10-25 01:45:10</span> | <span className="text-sky-300">auth.rotate_token</span>
                <div className="text-slate-500 text-[9px] mt-0.5">hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b...</div>
              </div>
              <span className="text-emerald-400 font-semibold">ALLOWED [Mask: 0x7F]</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400">2024-10-25 01:42:04</span> | <span className="text-sky-300">policy.update_threshold</span>
                <div className="text-slate-500 text-[9px] mt-0.5">hash: a1b2c3d4e5f67890123456789abcdef0123456789abc...</div>
              </div>
              <span className="text-emerald-400 font-semibold">ALLOWED [Admin]</span>
            </div>
          </div>
        </div>
      );

    case 'monitoring':
      return (
        <div className="bg-slate-950 text-slate-100 p-4 font-mono text-xs rounded select-none">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-slate-200">SERVICE MESH TOPOLOGY & HEALTH</span>
            </div>
            <span className="text-emerald-400 text-[10px]">34 MICROSERVICES HEALTHY</span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px]">
            {['API Gateway', 'Ingestion', 'Kafka Broker', 'Storage Hypertable'].map((srv, idx) => (
              <div key={idx} className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mx-auto mb-1"></div>
                <div className="text-slate-200 font-bold">{srv}</div>
                <div className="text-slate-500 text-[9px] mt-0.5">&lt; 5ms rtt</div>
              </div>
            ))}
          </div>

          <div className="mt-2 bg-emerald-950/40 border border-emerald-800/60 p-2 rounded text-[10px] text-emerald-300 flex items-center justify-between">
            <span>Circuit Breakers: CLOSED (Normal Operation)</span>
            <span>Zero Cascading Trips in 30 Days</span>
          </div>
        </div>
      );
  }
};

export const ScreenshotCard: React.FC<MockupProps> = ({ screenshot, onSelect, isCompact = false }) => {
  return (
    <div
      onClick={onSelect}
      className={`group bg-slate-900 border border-slate-800 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-200 shadow-lg flex flex-col ${
        onSelect ? 'cursor-pointer hover:shadow-sky-500/10' : ''
      }`}
    >
      {/* Window Mockup Chrome Header */}
      <div className="bg-slate-950/90 px-3 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="text-[11px] text-slate-400 font-mono ml-2 truncate max-w-[180px]">
            app.nexus-stream.internal/{screenshot.mockType}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700">
            {screenshot.category}
          </span>
          {onSelect && <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />}
        </div>
      </div>

      {/* Screen Render */}
      <div className="p-2 bg-slate-950">
        <MockupVisual type={screenshot.mockType} isCompact={isCompact} />
      </div>

      {/* Information & Annotations */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-slate-200 text-sm flex items-center justify-between">
            <span>{screenshot.title}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {screenshot.description}
          </p>
        </div>

        {/* Callouts */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
          {screenshot.callouts.slice(0, 2).map((callout, i) => (
            <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{callout}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
