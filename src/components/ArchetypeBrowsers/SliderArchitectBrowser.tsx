import React, { useState, useMemo } from 'react';
import { SliderArchitectPreset, SkinDefinition } from '../../types/skin';
import { sliderArchitect1000 } from '../../data/sliderArchitect1000';
import { Search, Sliders, Check, Sparkles } from 'lucide-react';

interface SliderArchitectBrowserProps {
  currentSkin: SkinDefinition;
  onApplySlider: (preset: SliderArchitectPreset) => void;
  activePreset?: SliderArchitectPreset;
}

export const SliderArchitectBrowser: React.FC<SliderArchitectBrowserProps> = ({
  currentSkin,
  onApplySlider,
  activePreset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  const categories = useMemo(() => {
    const set = new Set<string>();
    sliderArchitect1000.forEach((s) => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = sliderArchitect1000;
    if (selectedCategory !== 'All') {
      list = list.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.trackStyle.toLowerCase().includes(q) ||
          s.thumbStyle.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#141820] border border-white/10 rounded-xl">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">1,000 Slider Rail Presets</h3>
        </div>
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search slider rail styles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-black/60 border border-white/15 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {paginated.map((preset) => {
          const isActive = activePreset?.id === preset.id || currentSkin.sliderPreset?.id === preset.id;
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
                    {preset.trackStyle}
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-white truncate mt-1">{preset.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              {/* Slider rail visual preview */}
              <div className="h-14 w-full rounded-lg bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden px-4">
                <div
                  className="w-full h-2 rounded-full border border-white/10 relative flex items-center"
                  style={{ backgroundColor: preset.trackColor }}
                >
                  <div
                    className="w-4 h-6 rounded border shadow-lg absolute left-1/2 -translate-x-1/2"
                    style={{
                      backgroundColor: preset.thumbColor,
                      borderColor: preset.accentColor,
                      boxShadow: `0 0 ${preset.glowIntensity * 10}px ${preset.accentColor}88`
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onApplySlider(preset)}
                className={`w-full py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-400/40'
                }`}
              >
                {isActive ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                <span>{isActive ? 'Active Slider' : 'Apply Slider'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded bg-black/50 border border-white/10 disabled:opacity-30 cursor-pointer text-white"
          >
            Prev
          </button>
          <span className="font-mono text-cyan-300 font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 rounded bg-black/50 border border-white/10 disabled:opacity-30 cursor-pointer text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
