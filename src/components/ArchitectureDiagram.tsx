import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureFlow } from '../types/report';
import { Layers, Server, Database, Shield, Zap, Info, Cpu, Activity } from 'lucide-react';

interface ArchitectureProps {
  nodes: ArchitectureNode[];
  flows: ArchitectureFlow[];
  isPrintView?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureProps> = ({ nodes, flows, isPrintView = false }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'node-client');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getTierIcon = (tier: ArchitectureNode['tier']) => {
    switch (tier) {
      case 'client':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'gateway':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'service':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'storage':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'observability':
        return <Activity className="w-4 h-4 text-rose-400" />;
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTierBadge = (tier: ArchitectureNode['tier']) => {
    switch (tier) {
      case 'client':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'gateway':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'service':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'storage':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'observability':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className={`rounded-xl border ${isPrintView ? 'bg-slate-50 border-slate-300 text-slate-900 p-3' : 'bg-slate-900/90 border-slate-800 p-5 shadow-xl text-slate-100'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-2">
        <div>
          <h3 className={`font-bold flex items-center gap-2 ${isPrintView ? 'text-slate-900 text-sm' : 'text-slate-100 text-base'}`}>
            <Cpu className="w-4 h-4 text-sky-500" />
            Distributed Architecture & Data Pipeline
          </h3>
          <p className={`text-xs mt-0.5 ${isPrintView ? 'text-slate-600' : 'text-slate-400'}`}>
            Multi-tier decoupled event ingestion, asynchronous streaming, time-series storage, and automated notification loops.
          </p>
        </div>
        {!isPrintView && (
          <span className="text-[11px] font-mono bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-1 rounded-full self-start md:self-auto">
            120k Events/Sec Ingestion Pipeline
          </span>
        )}
      </div>

      {/* SVG Pipeline Canvas */}
      <div className={`relative rounded-lg p-3 overflow-x-auto ${isPrintView ? 'bg-white border border-slate-200' : 'bg-slate-950/80 border border-slate-800/80'}`}>
        <div className="min-w-[640px] flex items-center justify-between gap-3 relative py-3 px-2">
          {nodes.map((node, idx) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => !isPrintView && setSelectedNodeId(node.id)}
                  className={`flex-1 min-w-[110px] p-2.5 rounded-lg border transition-all duration-150 ${
                    !isPrintView ? 'cursor-pointer hover:scale-[1.02]' : ''
                  } ${
                    isSelected && !isPrintView
                      ? 'border-sky-500 ring-2 ring-sky-500/20 bg-slate-900 shadow-md'
                      : isPrintView
                      ? 'bg-slate-50 border-slate-300'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border ${getTierBadge(node.tier)}`}>
                      {node.tier}
                    </span>
                    {getTierIcon(node.tier)}
                  </div>
                  <div className={`font-semibold text-xs leading-snug ${isPrintView ? 'text-slate-900' : 'text-slate-100'}`}>
                    {node.label}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isPrintView ? 'text-slate-500' : 'text-slate-400'}`}>
                    {node.sublabel}
                  </div>
                </div>

                {idx < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center shrink-0 w-8">
                    <span className={`text-[9px] font-mono uppercase font-bold ${isPrintView ? 'text-sky-700' : 'text-sky-400'}`}>
                      {flows[idx]?.protocol || 'gRPC'}
                    </span>
                    <div className="flex items-center text-slate-500">
                      <span className="w-3 h-0.5 bg-sky-500"></span>
                      <span className="text-sky-500 text-xs font-bold leading-none">▶</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Data Flow Legend Bar */}
        <div className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between text-[11px] ${
          isPrintView ? 'border-slate-200 text-slate-600' : 'border-slate-800/80 text-slate-400'
        }`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span> Client Stream (SSE)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Partitioned Commit Log (Kafka)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Timescale Hypertables
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-500 font-semibold">
            End-to-End Latency: &lt; 85ms
          </span>
        </div>
      </div>

      {/* Selected Node Details Box (Active on interactive mode, compact on print) */}
      {!isPrintView && (
        <div className="mt-4 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm">{selectedNode.label}</span>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${getTierBadge(selectedNode.tier)}`}>
                {selectedNode.sublabel}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">{selectedNode.details}</p>
          </div>
          <div className="shrink-0 bg-slate-900 border border-slate-800 px-3 py-2 rounded text-[11px]">
            <span className="text-slate-400 block text-[10px]">Underlying Tech Stack:</span>
            <span className="font-mono text-sky-400 font-semibold">{selectedNode.tech}</span>
          </div>
        </div>
      )}

      {isPrintView && (
        <div className="mt-2 text-[10px] text-slate-600 grid grid-cols-2 gap-2">
          {nodes.map(n => (
            <div key={n.id} className="border-b border-slate-200 pb-1">
              <strong className="text-slate-800">{n.label}:</strong> {n.details}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
