import React from 'react';
import { SkinDefinition, UiCustomizationState } from '../../types/skin';

interface VstNodesPageProps {
  skin: SkinDefinition;
  customization?: UiCustomizationState;
}

export const VstNodesPage: React.FC<VstNodesPageProps> = ({ skin, customization }) => {
  const accent = customization?.knobAccentColor || skin.amber;

  const nodes = [
    { id: 'in', label: 'AUDIO IN', x: 40, y: 50 },
    { id: 'eq', label: 'PRE-EQ', x: 160, y: 40 },
    { id: 'delay1', label: 'TAPE DELAY A', x: 280, y: 25 },
    { id: 'delay2', label: 'TAPE DELAY B', x: 280, y: 75 },
    { id: 'diff', label: 'DIFFUSION', x: 400, y: 50 },
    { id: 'sat', label: 'SATURATION', x: 520, y: 50 },
    { id: 'out', label: 'MASTER OUT', x: 640, y: 50 }
  ];

  return (
    <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-[280px]">
      <svg className="w-full max-w-[720px] h-48 bg-black/60 rounded-xl border border-white/10 p-4" viewBox="0 0 700 100">
        {/* Connections */}
        <line x1="80" y1="50" x2="140" y2="40" stroke={accent} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        <line x1="200" y1="40" x2="260" y2="25" stroke={accent} strokeWidth="2" opacity="0.8" />
        <line x1="200" y1="40" x2="260" y2="75" stroke={accent} strokeWidth="2" opacity="0.8" />
        <line x1="340" y1="25" x2="380" y2="50" stroke={accent} strokeWidth="2" opacity="0.8" />
        <line x1="340" y1="75" x2="380" y2="50" stroke={accent} strokeWidth="2" opacity="0.8" />
        <line x1="450" y1="50" x2="500" y2="50" stroke={accent} strokeWidth="2" opacity="0.8" />
        <line x1="570" y1="50" x2="620" y2="50" stroke={accent} strokeWidth="2" opacity="0.8" />

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            <rect x="-35" y="-14" width="70" height="28" rx="6" fill="#181C24" stroke={accent} strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <span className="text-[11px] font-mono text-slate-400 mt-3">Interactive DSP Node Topology Routing Matrix</span>
    </div>
  );
};
