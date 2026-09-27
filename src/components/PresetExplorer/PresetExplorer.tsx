import React, { useState, useMemo } from 'react';
import { SkinDefinition, PresetCategory } from '../../types/skin';
import { PRESETS_1000 } from '../../data/presets1000';
import { Search, Sparkles, Shuffle, Check, ArrowRight, Eye, Palette } from 'lucide-react';

interface PresetExplorerProps {
  currentSkin: SkinDefinition;
  onSelectSkin: (skin: SkinDefinition) => void;
  onInspectSkin?: (skin: SkinDefinition) => void;
}

const CATEGORY_TABS: (PresetCategory | 'All')[] = [
  'All',
  'Wada Sanzo Classic',
  'Liquid Gritty',
  'Cyber HUD',
  'Deep Layers',
  'Futuristic Neon',
  'Dark Grit',
  'Pop Halftone',
  'Studio Minimal',
  'Vintage Brass',
  'Holographic Vapor',
  'Analog & Texturelabs'
];

export const PresetExplorer: React.FC<PresetExplorerProps> = ({
  currentSkin,
  onSelectSkin,
  onInspectSkin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32;

  const filteredPresets = useMemo(() => {
    return PRESETS_1000.filter((preset) => {
      const matchesCategory =
        selectedCategory === 'All' || preset.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.knobStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.panelTexture.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(preset.id).includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPresets.length / itemsPerPage) || 1;
  const currentPresets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPresets.slice(start, start + itemsPerPage);
  }, [filteredPresets, currentPage]);

  const handleCategoryChange = (cat: PresetCategory | 'All') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleRandomPick = () => {
    const randomPreset = filteredPresets[Math.floor(Math.random() * filteredPresets.length)];
    if (randomPreset) {
      onSelectSkin(randomPreset);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141820] border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              1,000 VST Presets Explorer
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {filteredPresets.length} available
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete database of 1,000 calibrated aesthetic skins across historical Japanese color harmonies, cyber HUDs, and analog grit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRandomPick}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span>Random Pick</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#0F131A] border border-white/10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by preset name, category, texture, knob dial style, or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#141923] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center justify-end gap-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORY_TABS.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
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

      {/* Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentPresets.map((preset) => {
          const isSelected = currentSkin.id === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectSkin(preset)}
              className={`group relative p-4 rounded-xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cyan-950/30 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-[#121620] border-white/10 hover:border-white/25 hover:bg-[#161B26]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    #{String(preset.id).padStart(4, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    {preset.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  {preset.name}
                </h3>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 h-4 w-full rounded overflow-hidden p-0.5 bg-black/40 border border-white/5">
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: preset.panelDark }}
                    title={`Chassis: ${preset.panelDark}`}
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: preset.panelDarker }}
                    title={`Chassis Deep: ${preset.panelDarker}`}
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: preset.amber }}
                    title={`Accent Amber: ${preset.amber}`}
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: preset.ledRed }}
                    title={`LED Peak: ${preset.ledRed}`}
                  />
                  <div
                    className="flex-1 h-full rounded-sm"
                    style={{ backgroundColor: preset.cream }}
                    title={`Dial Text: ${preset.cream}`}
                  />
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">
                    ⚙️ {preset.knobStyle}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5 truncate max-w-[120px]">
                    🎛️ {preset.panelTexture}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 mt-1">
                {isSelected ? (
                  <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Active on Rig</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSkin(preset);
                    }}
                    className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Audition</span>
                  </button>
                )}

                {onInspectSkin && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectSkin(preset);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    title="Inspect live in Studio"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Studio →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#0F131A] border border-white/10 mt-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#161B26] hover:bg-[#1E2433] disabled:opacity-40 disabled:cursor-not-allowed text-white border border-white/10 cursor-pointer transition-all"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredPresets.length)} of{' '}
              {filteredPresets.length}
            </span>
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#161B26] hover:bg-[#1E2433] disabled:opacity-40 disabled:cursor-not-allowed text-white border border-white/10 cursor-pointer transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
