import React, { useState } from 'react';
import {
  SkinDefinition,
  UiCustomizationState,
  KnobArchitectPreset,
  SliderArchitectPreset,
  LfoVisualPreset
} from '../../types/skin';

interface VstMainPageProps {
  skin: SkinDefinition;
  customization?: UiCustomizationState;
  knobPreset?: KnobArchitectPreset;
  sliderPreset?: SliderArchitectPreset;
  lfoVisualPreset?: LfoVisualPreset;
}

export const VstMainPage: React.FC<VstMainPageProps> = ({
  skin,
  customization,
  knobPreset,
  sliderPreset,
  lfoVisualPreset
}) => {
  const [knobValues, setKnobValues] = useState<Record<string, number>>({
    mix: 65,
    feedback: 45,
    delayTime: 38,
    tone: 52,
    flutter: 28,
    diffusion: 70
  });

  const [sliderVal, setSliderVal] = useState<number>(55);

  const accentColor = customization?.knobAccentColor || skin.amber;
  const generalTextColor = customization?.textColor || skin.textColor || skin.cream;
  const valueTextColor = customization?.valueTextColor || skin.valueTextColor || accentColor;
  const glowEnabled = customization?.knobGlowEnabled ?? skin.knobGlowEnabled ?? true;
  const glowIntensity = customization?.knobGlowIntensity ?? skin.glowIntensity ?? 0.6;
  const knobSize = customization?.knobSize ?? 68;

  const handleKnobChange = (id: string, delta: number) => {
    setKnobValues((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(100, (prev[id] ?? 50) + delta))
    }));
  };

  const controls = [
    { id: 'delayTime', label: 'DELAY TIME', unit: 'ms', display: (v: number) => `${Math.round(v * 10)}` },
    { id: 'feedback', label: 'FEEDBACK', unit: '%', display: (v: number) => `${Math.round(v)}` },
    { id: 'mix', label: 'WET / DRY', unit: '%', display: (v: number) => `${Math.round(v)}` },
    { id: 'tone', label: 'COLOR / TONE', unit: 'Hz', display: (v: number) => `${Math.round(v * 100 + 400)}` },
    { id: 'flutter', label: 'TAPE FLUTTER', unit: '%', display: (v: number) => `${Math.round(v)}` },
    { id: 'diffusion', label: 'DIFFUSION', unit: '%', display: (v: number) => `${Math.round(v)}` }
  ];

  return (
    <div className="relative z-10 w-full p-4 sm:p-6 flex flex-col gap-6">
      {/* Upper Knob Cluster */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center">
        {controls.map((ctrl) => {
          const val = knobValues[ctrl.id] ?? 50;
          const rotationDeg = (val / 100) * 270 - 135;

          return (
            <div key={ctrl.id} className="flex flex-col items-center gap-2 select-none group">
              <span
                className="text-[10px] font-bold tracking-wider font-mono text-center truncate max-w-[90px]"
                style={{ color: generalTextColor }}
              >
                {ctrl.label}
              </span>

              {/* Rotary Knob Dial Component */}
              <div
                className="relative cursor-pointer transition-transform active:scale-95"
                style={{ width: knobSize, height: knobSize }}
                onWheel={(e) => {
                  e.preventDefault();
                  handleKnobChange(ctrl.id, e.deltaY < 0 ? 3 : -3);
                }}
              >
                {/* Outer Bezel */}
                <div
                  className="w-full h-full rounded-full border-2 flex items-center justify-center relative shadow-xl"
                  style={{
                    backgroundColor: customization?.knobBodyColor || knobPreset?.bodyColor || '#222630',
                    borderColor: accentColor,
                    boxShadow: glowEnabled
                      ? `0 0 ${glowIntensity * 16}px ${accentColor}66, inset 0 2px 4px rgba(255,255,255,0.15)`
                      : '0 4px 10px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Indicator Pointer */}
                  <div
                    className="w-full h-full absolute inset-0 rounded-full flex items-start justify-center transition-transform duration-75"
                    style={{ transform: `rotate(${rotationDeg}deg)` }}
                  >
                    <div
                      className="w-1.5 h-3.5 rounded-full mt-1 shadow-sm"
                      style={{
                        backgroundColor: customization?.knobPointerColor || knobPreset?.pointerColor || '#E63946'
                      }}
                    />
                  </div>

                  {/* Machined Metal Center Cap */}
                  <div
                    className="w-1/2 h-1/2 rounded-full border border-black/60 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: skin.panelDarker || '#090B10' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full opacity-60"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Numeric Display Value */}
              <div className="flex items-center gap-1 font-mono text-[10px] bg-black/60 px-2 py-0.5 rounded border border-white/10 shadow-inner">
                <span className="font-bold" style={{ color: valueTextColor }}>
                  {ctrl.display(val)}
                </span>
                <span className="text-slate-500 text-[9px]">{ctrl.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lower Linear Fader Rack Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
          <div>
            <span className="text-xs font-bold text-white block">MASTER TAPE SATURATION RAIL</span>
            <span className="text-[10px] text-slate-400 font-mono">
              Analog Class-A Headroom & Dynamic Tube Emulation
            </span>
          </div>
        </div>

        {/* Master Slider Rail */}
        <div className="flex items-center gap-4 flex-1 max-w-md w-full">
          <span className="text-[10px] font-mono text-slate-400">0%</span>
          <div className="relative flex-1 h-3 rounded-full border border-white/15 bg-black/70 flex items-center px-1">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-transparent"
              style={{ accentColor }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold" style={{ color: valueTextColor }}>
            {sliderVal}%
          </span>
        </div>
      </div>
    </div>
  );
};
