import React, { useRef, useEffect, useState } from 'react';
import {
  SkinDefinition,
  SliderArchitectPreset,
  LfoVisualPreset,
  UiCustomizationState,
  TextureArchetype,
  KnobArchitectPreset
} from '../../types/skin';
import { VstMainPage } from './VstMainPage';
import { VstNodesPage } from './VstNodesPage';
import { VstMacrosPage } from './VstMacrosPage';
import { VstLfosPage } from './VstLfosPage';
import { renderTextureToCanvas } from '../TextureEngine/textureGenerator';
import { Activity, Sliders, Cpu, Sun, Moon } from 'lucide-react';

interface VstContainerProps {
  skin: SkinDefinition;
  onSkinChange?: (skin: SkinDefinition) => void;
  availableSkins?: SkinDefinition[];
  onOpenExporter?: () => void;
  onOpenCustomizer?: () => void;
  knobPreset?: KnobArchitectPreset;
  textureArchetype?: TextureArchetype;
  sliderPreset?: SliderArchitectPreset;
  lfoVisualPreset?: LfoVisualPreset;
  customization?: UiCustomizationState;
}

export const VstContainer: React.FC<VstContainerProps> = ({
  skin,
  onSkinChange,
  availableSkins = [],
  onOpenCustomizer,
  knobPreset,
  textureArchetype,
  sliderPreset,
  lfoVisualPreset,
  customization
}) => {
  const [activeTab, setActiveTab] = useState<'Main' | 'Nodes' | 'Macros' | 'LFOs'>('Main');
  const [guiScale, setGuiScale] = useState<number>(1.0);
  const [yupGpuEngine, setYupGpuEngine] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderTextureToCanvas(canvasRef.current, skin, 1000, 760, textureArchetype);
    }
  }, [skin, textureArchetype]);

  const pageTitles = {
    Main: 'DELAY HOST // ENGINE',
    Nodes: 'DELAY HOST // NODE PATCH',
    Macros: 'DELAY HOST // MACROS',
    LFOs: 'DELAY HOST // LFOS'
  };

  const accentColor = customization?.knobAccentColor || skin.amber;
  const phosphorColor = lfoVisualPreset?.phosphorColor || skin.amber;
  const headerTextColor = customization?.headerTextColor || skin.headerTextColor || accentColor;
  const generalTextColor = customization?.textColor || skin.textColor || skin.cream;
  const glowEnabled = customization?.knobGlowEnabled ?? skin.knobGlowEnabled ?? true;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Outer VST Shell with GUI Scale */}
      <div
        className="w-full max-w-[880px] rounded-xl shadow-2xl border overflow-hidden transition-all duration-150 relative bg-[#181A1F]"
        style={{
          borderColor: yupGpuEngine ? '#00e5ff44' : '#222630',
          transform: `scale(${guiScale})`,
          transformOrigin: 'top center',
          boxShadow: glowEnabled
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 ${customization?.accentGlowSpread ?? 8}px ${accentColor}25`
            : '0 25px 50px -12px rgba(0,0,0,0.6)'
        }}
      >
        {/* Top Metallic Rack Bar */}
        <div className="h-11 px-3 flex items-center justify-between border-b text-xs bg-[#15171C] border-black/60 z-20 relative select-none">
          {/* Zone 1: Page Switcher Tabs */}
          <div className="flex items-center gap-1.5">
            {(['Main', 'Nodes', 'Macros', 'LFOs'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`h-7 px-3.5 flex items-center justify-center font-bold text-[11px] rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'shadow-md scale-[1.02] border border-white/30'
                      : 'hover:bg-white/10 opacity-75 hover:opacity-100 border border-transparent'
                  }`}
                  style={{
                    backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#000000' : generalTextColor
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Zone 2: Center Live LFO Mini-Scope & YUP GPU Engine Toggle */}
          <div className="hidden sm:flex items-center gap-2">
            <div
              onClick={() => setActiveTab('LFOs')}
              className="h-7 px-2.5 rounded-lg flex items-center gap-1.5 bg-black/60 border border-white/15 cursor-pointer hover:border-cyan-400/50 transition-colors backdrop-blur-sm"
              title="Active LFO Visual Scope (Click to view full LFO Rack)"
            >
              <Activity className="w-3.5 h-3.5" style={{ color: phosphorColor }} />
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <span className="text-slate-400 hidden md:inline">LFO:</span>
                <span className="font-bold truncate max-w-[110px]" style={{ color: phosphorColor }}>
                  {lfoVisualPreset ? lfoVisualPreset.name.split('#')[0] : 'SINE 1.0Hz'}
                </span>
              </div>
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: phosphorColor }}
              />
            </div>

            {/* Quick Glow Status Indicator */}
            <div
              className={`h-7 px-2 rounded-lg flex items-center gap-1 text-[10px] font-mono border ${
                glowEnabled
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 shadow-sm'
                  : 'bg-white/5 text-slate-400 border-white/10'
              }`}
              title={glowEnabled ? 'Knob Glow is ACTIVE' : 'Knob Glow is DISABLED (Matte)'}
            >
              {glowEnabled ? <Sun className="w-3 h-3 text-cyan-300" /> : <Moon className="w-3 h-3 text-slate-500" />}
              <span className="hidden md:inline">{glowEnabled ? 'GLOW ON' : 'GLOW OFF'}</span>
            </div>

            <button
              type="button"
              onClick={() => setYupGpuEngine(!yupGpuEngine)}
              className={`h-7 px-2.5 rounded-lg text-[10px] font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                yupGpuEngine
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,229,255,0.25)]'
                  : 'bg-stone-900 text-stone-400 border-stone-700'
              }`}
              title="Toggle between kunitoki/yup GPU Rive vector engine and standard raster engine"
            >
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{yupGpuEngine ? 'YUP GPU' : 'JUCE CPU'}</span>
            </button>
          </div>

          {/* Zone 3: Right Controls */}
          <div className="flex items-center gap-2">
            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="h-7 px-2.5 rounded-lg text-[10px] font-medium bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
                title="Customize knob & slider styles, text colors, knob glow, and dimensions"
              >
                <Sliders className="w-3 h-3" />
                <span className="hidden md:inline">Customizer</span>
              </button>
            )}

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-slate-400 hidden md:inline">Scale:</span>
              <select
                value={guiScale}
                onChange={(e) => setGuiScale(parseFloat(e.target.value))}
                className="h-7 px-1.5 text-[11px] rounded-lg bg-black/60 border border-white/20 text-white cursor-pointer outline-none"
              >
                <option value={0.85}>85%</option>
                <option value={0.95}>95%</option>
                <option value={1.0}>100%</option>
                <option value={1.05}>105%</option>
              </select>
            </div>

            {availableSkins.length > 0 && onSkinChange && (
              <select
                value={skin.id}
                onChange={(e) => {
                  const picked = availableSkins.find((s) => s.id === parseInt(e.target.value, 10));
                  if (picked) onSkinChange(picked);
                }}
                className="h-7 px-2 text-[11px] rounded-lg bg-black/60 border border-white/20 text-amber-300 font-semibold cursor-pointer outline-none max-w-[130px] truncate"
              >
                {availableSkins.slice(0, 50).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* 2. Rack Panel Faceplate Area with Procedural Texture Canvas */}
        <div className="relative min-h-[440px] flex flex-col justify-between overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          />

          {/* Corner Screws */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full border border-black/80 shadow flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-600 z-10 pointer-events-none">
            <div className="w-2.5 h-[1.2px] bg-black/90 rotate-45" />
          </div>
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full border border-black/80 shadow flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-600 z-10 pointer-events-none">
            <div className="w-2.5 h-[1.2px] bg-black/90 -rotate-45" />
          </div>
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full border border-black/80 shadow flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-600 z-10 pointer-events-none">
            <div className="w-2.5 h-[1.2px] bg-black/90 -rotate-12" />
          </div>
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full border border-black/80 shadow flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-600 z-10 pointer-events-none">
            <div className="w-2.5 h-[1.2px] bg-black/90 rotate-60" />
          </div>

          <div className="relative pt-3 pb-1 text-center z-10 select-none">
            <div className="flex items-center justify-center gap-2">
              <h2
                className="text-base sm:text-lg font-black tracking-widest uppercase transition-colors"
                style={{
                  color: headerTextColor,
                  textShadow: glowEnabled
                    ? `0 0 16px ${headerTextColor}80, 0 1px 3px rgba(0,0,0,0.9)`
                    : '0 1px 2px rgba(0,0,0,0.9)'
                }}
              >
                {pageTitles[activeTab]}
              </h2>
              {yupGpuEngine && (
                <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded">
                  YUP GPU
                </span>
              )}
            </div>
          </div>

          {/* Page Body View */}
          <div className="flex-1 flex flex-col justify-center">
            {activeTab === 'Main' && (
              <VstMainPage
                skin={skin}
                customization={customization}
                knobPreset={knobPreset}
                sliderPreset={sliderPreset}
                lfoVisualPreset={lfoVisualPreset}
              />
            )}
            {activeTab === 'Nodes' && <VstNodesPage skin={skin} customization={customization} />}
            {activeTab === 'Macros' && <VstMacrosPage skin={skin} customization={customization} />}
            {activeTab === 'LFOs' && (
              <VstLfosPage
                skin={skin}
                lfoVisualPreset={lfoVisualPreset}
                customization={customization}
              />
            )}
          </div>

          {/* Bottom Faceplate Chassis Trim */}
          <div className="relative z-10 h-7 px-4 bg-black/70 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>DELAYHOST ENGINE v3.2 · C++20 AUDIO CORE</span>
            <span className="text-cyan-400 font-bold">
              TEXTURE: {skin.textureArchetype?.name || skin.panelTexture}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
