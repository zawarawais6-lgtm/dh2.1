import React from 'react';
import {
  SkinDefinition,
  UiCustomizationState,
  KnobStyle,
  SliderTrackStyle,
  SliderThumbStyle
} from '../../types/skin';
import { Sliders, Sun, Moon, RotateCcw } from 'lucide-react';

export function defaultUiCustomization(skin: SkinDefinition): UiCustomizationState {
  return {
    knobStyleOverride: skin.knobStyle,
    knobSize: 68,
    knobBodyColor: skin.knobBodyColor || skin.cream || '#E0E6ED',
    knobAccentColor: skin.knobAccentColor || skin.amber || '#E8A13A',
    knobPointerColor: skin.knobPointerColor || skin.ledRed || '#E63946',
    knobGlowEnabled: skin.knobGlowEnabled ?? true,
    knobGlowIntensity: skin.glowIntensity ?? 0.6,
    knobHorizontalSpacing: 16,
    knobVerticalOffset: 0,
    textColor: skin.textColor || skin.cream || '#E0E6ED',
    headerTextColor: skin.headerTextColor || skin.amber || '#E8A13A',
    valueTextColor: skin.valueTextColor || skin.amber || '#E8A13A',
    sliderThumbStyleOverride: skin.sliderPreset?.thumbStyle || 'brushed-metal',
    sliderTrackStyleOverride: skin.sliderPreset?.trackStyle || 'recessed-groove',
    sliderTrackHeight: skin.sliderPreset?.trackHeight || 130,
    sliderThumbWidth: skin.sliderPreset?.thumbWidth || 28,
    sliderThumbHeight: skin.sliderPreset?.thumbHeight || 16,
    sliderTrackColor: skin.sliderTrackColor || skin.panelDarker || '#090B10',
    sliderThumbColor: skin.sliderThumbColor || skin.cream || '#E0E6ED',
    sliderAccentColor: skin.sliderAccentColor || skin.amber || '#E8A13A',
    sliderGlowIntensity: skin.sliderPreset?.glowIntensity || 0.5,
    sliderVerticalOffset: 0,
    panelBezelRadius: 10,
    accentGlowSpread: 8
  };
}

interface UiCustomizerPanelProps {
  currentSkin: SkinDefinition;
  customization: UiCustomizationState;
  onUpdateCustomization: (updater: (prev: UiCustomizationState) => UiCustomizationState) => void;
  onResetCustomization: () => void;
}

export const UiCustomizerPanel: React.FC<UiCustomizerPanelProps> = ({
  currentSkin,
  customization,
  onUpdateCustomization,
  onResetCustomization
}) => {
  return (
    <div className="flex flex-col gap-5 p-4 rounded-xl bg-[#141820] border border-white/10 shadow-xl text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">Hardware UI Customizer</h3>
        </div>
        <button
          type="button"
          onClick={onResetCustomization}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-black/40 hover:bg-black/60 border border-white/10 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Layout</span>
        </button>
      </div>

      {/* Knob Dial Sizing & Optics */}
      <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-3">
        <span className="font-bold text-white uppercase text-[10px] tracking-wider text-cyan-300">
          Knob Geometry & Optical Halo
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Knob Diameter:</span>
              <span className="font-mono text-cyan-400">{customization.knobSize}px</span>
            </div>
            <input
              type="range"
              min="48"
              max="96"
              step="2"
              value={customization.knobSize}
              onChange={(e) =>
                onUpdateCustomization((prev) => ({ ...prev, knobSize: parseInt(e.target.value, 10) }))
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Glow Halo Intensity:</span>
              <span className="font-mono text-cyan-400">
                {Math.round(customization.knobGlowIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={customization.knobGlowIntensity}
              onChange={(e) =>
                onUpdateCustomization((prev) => ({
                  ...prev,
                  knobGlowIntensity: parseFloat(e.target.value)
                }))
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          <span className="text-slate-300">Enable Optical Halo:</span>
          <button
            type="button"
            onClick={() =>
              onUpdateCustomization((prev) => ({
                ...prev,
                knobGlowEnabled: !prev.knobGlowEnabled
              }))
            }
            className={`px-3 py-1 rounded-lg font-bold text-[10px] cursor-pointer transition-all border flex items-center gap-1.5 ${
              customization.knobGlowEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            {customization.knobGlowEnabled ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{customization.knobGlowEnabled ? 'GLOW ON' : 'GLOW OFF'}</span>
          </button>
        </div>
      </div>

      {/* Text & Accent Color Swatches */}
      <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-3">
        <span className="font-bold text-white uppercase text-[10px] tracking-wider text-cyan-300">
          Hardware Typography & Accent Swatches
        </span>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400">Header Title:</span>
            <input
              type="color"
              value={customization.headerTextColor}
              onChange={(e) =>
                onUpdateCustomization((prev) => ({ ...prev, headerTextColor: e.target.value.toUpperCase() }))
              }
              className="w-full h-7 rounded border border-white/20 bg-transparent cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400">Knob Accent:</span>
            <input
              type="color"
              value={customization.knobAccentColor}
              onChange={(e) =>
                onUpdateCustomization((prev) => ({ ...prev, knobAccentColor: e.target.value.toUpperCase() }))
              }
              className="w-full h-7 rounded border border-white/20 bg-transparent cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400">Numeric Readouts:</span>
            <input
              type="color"
              value={customization.valueTextColor}
              onChange={(e) =>
                onUpdateCustomization((prev) => ({ ...prev, valueTextColor: e.target.value.toUpperCase() }))
              }
              className="w-full h-7 rounded border border-white/20 bg-transparent cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
