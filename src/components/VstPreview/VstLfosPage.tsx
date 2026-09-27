import React from 'react';
import { SkinDefinition, LfoVisualPreset, UiCustomizationState } from '../../types/skin';

interface VstLfosPageProps {
  skin: SkinDefinition;
  lfoVisualPreset?: LfoVisualPreset;
  customization?: UiCustomizationState;
}

export const VstLfosPage: React.FC<VstLfosPageProps> = ({ skin, lfoVisualPreset, customization }) => {
  const phosphor = lfoVisualPreset?.phosphorColor || skin.amber;

  return (
    <div className="relative z-10 p-6 flex flex-col items-center gap-4">
      <div
        className="w-full max-w-[680px] h-48 bg-black/80 rounded-xl border p-4 relative overflow-hidden flex items-center justify-center"
        style={{ borderColor: `${phosphor}55`, boxShadow: `0 0 20px ${phosphor}22` }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 100">
          {/* Phosphor Grid */}
          <line x1="0" y1="50" x2="300" y2="50" stroke={phosphor} strokeWidth="0.8" opacity="0.2" strokeDasharray="3 3" />
          <line x1="150" y1="0" x2="150" y2="100" stroke={phosphor} strokeWidth="0.8" opacity="0.2" strokeDasharray="3 3" />

          {/* Dual Lissajous / Modulated Sine */}
          <path
            d="M 10,50 Q 75,10 150,50 T 290,50"
            fill="none"
            stroke={phosphor}
            strokeWidth="2.5"
            style={{ filter: `drop-shadow(0 0 8px ${phosphor})` }}
          />
          <path
            d="M 10,50 Q 85,85 150,50 T 290,50"
            fill="none"
            stroke={phosphor}
            strokeWidth="1.2"
            opacity="0.45"
            style={{ filter: `drop-shadow(0 0 4px ${phosphor})` }}
          />
        </svg>

        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-slate-400">
          MODE: LFO SYNC · 1/4 BEAT · WAVE: LOGARITHMIC TAPE MOD
        </div>
      </div>
      <span className="text-[11px] font-mono text-slate-400">
        Hardware Oscilloscope Visualizer: {lfoVisualPreset?.name || 'Dual Sine 1.0Hz'}
      </span>
    </div>
  );
};
