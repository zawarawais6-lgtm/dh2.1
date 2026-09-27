import React, { useState, useMemo } from 'react';
import { LfoVisualPreset, SkinDefinition } from '../../types/skin';
import { lfoVisualPresets } from '../../data/lfoVisualPresets';
import { Search, Activity, Check, Sparkles } from 'lucide-react';

interface LfoVisualizerBrowserProps {
  currentSkin: SkinDefinition;
  onApplyLfo: (preset: LfoVisualPreset) => void;
  activePreset?: LfoVisualPreset;
}

export const LfoVisualizerBrowser: React.FC<LfoVisualizerBrowserProps> = ({
  currentSkin,
  onApplyLfo,
  activePreset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrid, setSelectedGrid] = useState('All');

  const filtered = useMemo(() => {
    let list = lfoVisualPresets;
    if (selectedGrid !== 'All') {
      list = list.filter((l) => l.gridStyle === selectedGrid);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.gridStyle.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedGrid, searchQuery]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#141820] border border-white/10 rounded-xl">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">LFO Oscilloscope & Waveform Visualizers</h3>
        </div>
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search LFO styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/15 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.slice(0, 18).map((preset) => {
          const isActive = activePreset?.id === preset.id || currentSkin.lfoPreset?.id === preset.id;
          return (
            <div
              key={preset.id}
              className={`p-3 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-[#12161F] border-white/10 hover:border-white/25'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>#{preset.id}</span>
                  <span className="bg-black/60 px-1.5 py-0.5 rounded text-slate-300 border border-white/10">
                    {preset.gridStyle}
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-white truncate mt-1">{preset.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* LFO Simulated Display Canvas */}
              <div
                className="h-16 w-full rounded-lg bg-black border border-white/10 flex items-center justify-center relative overflow-hidden"
                style={{ borderColor: `${preset.phosphorColor}40` }}
              >
                <svg className="w-full h-full" viewBox="0 0 160 60">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="160" y2="30" stroke={preset.gridColor} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="80" y1="0" x2="80" y2="60" stroke={preset.gridColor} strokeWidth="1" strokeDasharray="2 2" />

                  {/* Sine Wave */}
                  <path
                    d="M 0,30 Q 40,5 80,30 T 160,30"
                    fill="none"
                    stroke={preset.phosphorColor}
                    strokeWidth={preset.waveThickness}
                    style={{ filter: `drop-shadow(0 0 ${preset.glowRadius}px ${preset.beamGlowColor})` }}
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => onApplyLfo(preset)}
                className={`w-full py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-400/40'
                }`}
              >
                {isActive ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                <span>{isActive ? 'Active Scope' : 'Apply Scope'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
