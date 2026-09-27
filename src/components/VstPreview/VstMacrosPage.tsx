import React, { useState } from 'react';
import { SkinDefinition, UiCustomizationState } from '../../types/skin';

interface VstMacrosPageProps {
  skin: SkinDefinition;
  customization?: UiCustomizationState;
}

export const VstMacrosPage: React.FC<VstMacrosPageProps> = ({ skin, customization }) => {
  const [macros, setMacros] = useState([60, 45, 80, 25]);
  const accent = customization?.knobAccentColor || skin.amber;

  const macroNames = ['SPACE / AIR', 'WARM VINTAGE', 'TAPE DEGRADE', 'DYNAMICS PUSH'];

  return (
    <div className="relative z-10 p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
      {macroNames.map((name, idx) => (
        <div key={idx} className="flex flex-col items-center gap-3">
          <span className="text-[11px] font-bold text-white font-mono text-center">{name}</span>
          <div
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center relative shadow-xl"
            style={{
              borderColor: accent,
              backgroundColor: skin.panelDarker || '#090B10',
              boxShadow: `0 0 16px ${accent}44`
            }}
          >
            <span className="font-mono font-black text-sm" style={{ color: accent }}>
              {macros[idx]}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={macros[idx]}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setMacros((prev) => {
                const next = [...prev];
                next[idx] = val;
                return next;
              });
            }}
            className="w-24 accent-cyan-400 cursor-pointer"
            style={{ accentColor: accent }}
          />
        </div>
      ))}
    </div>
  );
};
