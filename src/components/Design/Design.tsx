import React, { useState, useMemo } from 'react';
import { SkinDefinition, DesignTheme } from '../../types/skin';
import { CURATED_DESIGN_THEMES } from '../../data/curatedDesignThemes';
import {
  Sparkles,
  Search,
  Check,
  Eye,
  Sliders,
  Layers,
  Activity,
  ArrowRight,
  Disc,
  Palette
} from 'lucide-react';

interface DesignProps {
  currentSkin: SkinDefinition;
  onApplyTheme: (theme: DesignTheme) => void;
  onAuditionOnRig?: (theme: DesignTheme) => void;
  onOpenCustomizer?: () => void;
}

export const Design: React.FC<DesignProps> = ({
  currentSkin,
  onApplyTheme,
  onAuditionOnRig,
  onOpenCustomizer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    CURATED_DESIGN_THEMES.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  const filteredThemes = useMemo(() => {
    return CURATED_DESIGN_THEMES.filter((theme) => {
      const matchesCat =
        selectedCategory === 'All' || theme.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        theme.texture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.knob.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141820] border border-cyan-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              Curated Stylistic Design Themes
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {CURATED_DESIGN_THEMES.length} Coherent Art Directions
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Fully synchronized aesthetic directions that align textures, mechanical knob dials, slider rail architectures, and LFO scopes into a unified hardware instrument.
          </p>
        </div>

        {onOpenCustomizer && (
          <button
            type="button"
            onClick={onOpenCustomizer}
            className="px-3.5 py-2 rounded-xl bg-black/40 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 text-xs font-medium flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap self-start md:self-auto"
          >
            <Sliders className="w-4 h-4" />
            <span>Open Customizer</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#0F131A] border border-white/10">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search themes by name, mood, tags, texture archetype, or knob style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#141923] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-black/30 hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredThemes.map((theme) => {
          const isSelected = currentSkin.name === theme.name;

          return (
            <div
              key={theme.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#121E2C] to-[#141824] border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'bg-[#121620] border-white/10 hover:border-white/20 hover:bg-[#151A26]'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
                      {theme.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {theme.name}
                    </h3>
                  </div>

                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: theme.accentColor }}
                    title={`Theme Accent: ${theme.accentColor}`}
                  />
                </div>

                <p className="text-xs text-cyan-200/80 font-medium italic">
                  "{theme.mood}"
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {theme.description}
                </p>

                {/* Color swatches strip */}
                <div className="flex items-center gap-1.5 h-3.5 w-full rounded overflow-hidden p-0.5 bg-black/40 border border-white/5 mt-1">
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: theme.skin.panelDark }}
                    title="Panel Dark"
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: theme.skin.panelDarker }}
                    title="Panel Darker"
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: theme.accentColor }}
                    title="Accent"
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: theme.skin.ledRed }}
                    title="Peak Red"
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: theme.skin.cream }}
                    title="Text Cream"
                  />
                </div>

                {/* 4-Axis Architecture Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-3 border-t border-white/10">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase font-mono flex items-center gap-1">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>1. Texture</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white truncate" title={theme.texture.name}>
                      {theme.texture.name}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {theme.texture.baseModel}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase font-mono flex items-center gap-1">
                      <Disc className="w-3 h-3 text-cyan-400" />
                      <span>2. Knob Dial</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white truncate" title={theme.knob.name}>
                      {theme.knob.style}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {theme.knob.category}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase font-mono flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-cyan-400" />
                      <span>3. Slider Rail</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white truncate" title={theme.slider.name}>
                      {theme.slider.thumbStyle}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {theme.slider.category}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col gap-1">
                    <span className="text-[9px] text-slate-400 uppercase font-mono flex items-center gap-1">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span>4. LFO Scope</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white truncate" title={theme.lfo.name}>
                      {theme.lfo.name}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {theme.lfo.category}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1 flex-wrap mt-1">
                  {theme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/30 text-slate-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                {isSelected ? (
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Active Coherent Theme</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onApplyTheme(theme)}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apply Theme</span>
                  </button>
                )}

                {onAuditionOnRig && (
                  <button
                    type="button"
                    onClick={() => onAuditionOnRig(theme)}
                    className="px-3 py-1.5 rounded-lg bg-black/30 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Audition on Rig →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
