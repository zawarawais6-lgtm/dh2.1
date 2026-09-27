import React from 'react';
import { TextureArchetype } from '../../types/skin';

interface TexturePatternPreviewProps {
  archetype: TextureArchetype;
  className?: string;
  width?: number;
  height?: number;
}

export const TexturePatternPreview: React.FC<TexturePatternPreviewProps> = ({
  archetype,
  className = 'w-full h-full',
  width = 300,
  height = 140
}) => {
  const p = archetype.primaryTint;
  const s = archetype.secondaryTint;
  const a = archetype.accentTint;
  const contrast = archetype.contrast;
  const model = archetype.baseModel;
  const pattern = archetype.patternType;

  const patternId = `pat-${archetype.id}-${pattern}`;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: s }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={`bgGrad-${archetype.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p} />
            <stop offset="50%" stopColor={s} />
            <stop offset="100%" stopColor={p} />
          </linearGradient>

          {/* Gritty Concrete Distress */}
          {(pattern === 'gritty-concrete-distress' || model === 'GrittyTexture') && (
            <pattern id={patternId} width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="8" r="1.4" fill={a} opacity={0.65 * contrast} />
              <circle cx="20" cy="22" r="2.2" fill="#000000" opacity="0.75" />
              <circle cx="28" cy="10" r="1.0" fill={a} opacity={0.7} />
              <circle cx="12" cy="30" r="1.6" fill="#000000" opacity="0.65" />
              <line x1="4" y1="16" x2="16" y2="18" stroke={a} strokeWidth="1" strokeOpacity={0.45 * contrast} />
              <line x1="22" y1="28" x2="34" y2="24" stroke="#000000" strokeWidth="1.2" strokeOpacity="0.4" />
            </pattern>
          )}

          {/* Fine Mineral Sand */}
          {(pattern === 'fine-mineral-grit' || model === 'FineMineralGrit') && (
            <pattern id={patternId} width="18" height="18" patternUnits="userSpaceOnUse">
              <rect x="2" y="3" width="1.2" height="1.2" fill={a} opacity={0.8 * contrast} />
              <rect x="9" y="1" width="1.2" height="1.2" fill="#FFFFFF" opacity="0.5" />
              <rect x="5" y="11" width="1.4" height="1.4" fill={a} opacity={0.6} />
              <rect x="13" y="10" width="1" height="1" fill="#000000" opacity="0.6" />
            </pattern>
          )}

          {/* Dark Obsidian & Xerox */}
          {(pattern === 'dark-grainy-obsidian' || pattern === 'xerox-dark-grit' || model === 'DarkGrainyGrit') && (
            <pattern id={patternId} width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.0" fill="#FFFFFF" opacity="0.45" />
              <circle cx="16" cy="8" r="1.8" fill="#000000" opacity="0.9" />
              <circle cx="8" cy="18" r="0.9" fill="#FFFFFF" opacity="0.35" />
              <circle cx="20" cy="20" r="1.9" fill="#000000" opacity="0.85" />
              <circle cx="12" cy="12" r="1.2" fill={a} opacity={0.6 * contrast} />
            </pattern>
          )}

          {/* Texturelabs Photocopy Grunge Pattern */}
          {(pattern === 'texturelabs-photocopy-grunge' || model === 'TexturelabsPhotocopy') && (
            <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
              <rect x="0" y="8" width="32" height="3" fill="#000000" opacity="0.4" />
              <rect x="0" y="22" width="32" height="2" fill={a} opacity={0.25} />
              <circle cx="6" cy="4" r="1.8" fill="#000000" opacity="0.8" />
              <circle cx="18" cy="14" r="2.4" fill="#000000" opacity="0.95" />
              <circle cx="26" cy="26" r="1.5" fill={a} opacity={0.8} />
              <circle cx="12" cy="28" r="1.2" fill="#FFFFFF" opacity="0.3" />
            </pattern>
          )}

          {/* Analog Risograph Stipple */}
          {(pattern === 'vecteezy-risograph-stipple' || model === 'AnalogRisographStipple') && (
            <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="2" height="2" fill={a} opacity={0.8} />
              <rect x="10" y="4" width="2" height="2" fill={p} opacity={0.9} />
              <rect x="6" y="10" width="2.5" height="2.5" fill={a} opacity={0.6} />
              <rect x="12" y="12" width="1.8" height="1.8" fill="#000000" opacity="0.75" />
            </pattern>
          )}

          {/* Unsplash Slate Mineral Cleavage */}
          {(pattern === 'unsplash-slate-stone' || model === 'UnsplashSlateStone') && (
            <pattern id={patternId} width="40" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="5" x2="40" y2="7" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <line x1="0" y1="15" x2="40" y2="13" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
              <rect x="14" y="9" width="1.5" height="1.5" fill={a} opacity={0.7} />
              <rect x="32" y="3" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.5" />
            </pattern>
          )}
        </defs>

        {/* Base Background Fill */}
        <rect width="100%" height="100%" fill={`url(#bgGrad-${archetype.id})`} />

        {/* Dynamic Pattern Overlay by Component Type */}
        {patternId && (
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        )}

        {/* --- TEXTURELABS: 35MM FILM DUST & LIGHT LEAK --- */}
        {(model === 'TexturelabsFilmDust' || pattern === 'texturelabs-film-dust' || pattern === 'unsplash-film-emulsion') && (
          <g>
            <circle cx={width * 0.9} cy={height * 0.15} r={height * 0.75} fill={a} fillOpacity="0.35" />
            <line x1={width * 0.35} y1={0} x2={width * 0.34} y2={height} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1={width * 0.72} y1={0} x2={width * 0.73} y2={height} stroke={a} strokeWidth="0.8" strokeOpacity="0.5" />
            <path d={`M ${width * 0.2},30 Q ${width * 0.22},45 ${width * 0.25},50`} stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.7" />
            <path d={`M ${width * 0.6},80 Q ${width * 0.58},95 ${width * 0.63},105`} stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6" />
          </g>
        )}

        {/* --- TEXTURELABS: MACHINED ANODIZED ALLOY --- */}
        {(model === 'TexturelabsBrushedAlloy' || pattern === 'texturelabs-brushed-alloy' || model === 'BrushedMetal') && (
          <g>
            {[10, 25, 40, 55, 70, 85, 100, 115, 130].map((y, idx) => (
              <line key={idx} x1={0} y1={y} x2={width} y2={y} stroke={idx % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.3)'} strokeWidth="1" />
            ))}
            <line x1={0} y1={0} x2={width} y2={height} stroke="rgba(255,255,255,0.4)" strokeWidth="24" strokeOpacity="0.25" />
          </g>
        )}

        {/* --- TEXTURELABS: OXIDIZED PATINA --- */}
        {(model === 'TexturelabsOxidizedPatina' || pattern === 'texturelabs-oxidized-patina') && (
          <g>
            <circle cx={width * 0.25} cy={height * 0.4} r="35" fill="#10B981" fillOpacity="0.35" />
            <circle cx={width * 0.75} cy={height * 0.6} r="45" fill={a} fillOpacity="0.3" />
            <circle cx={width * 0.8} cy={height * 0.3} r="25" fill="#10B981" fillOpacity="0.25" />
          </g>
        )}

        {/* --- VECTEEZY: MAGNETIC TAPE OXIDE --- */}
        {(model === 'AnalogMagneticTape' || pattern === 'vecteezy-magnetic-tape') && (
          <g>
            {[20, 40, 60, 80, 100, 120].map((y, idx) => (
              <line key={idx} x1={0} y1={y} x2={width} y2={y} stroke={a} strokeWidth="0.8" strokeOpacity="0.25" />
            ))}
            <path
              d={`M 0,${height * 0.5} Q ${width * 0.25},${height * 0.3} ${width * 0.5},${height * 0.5} T ${width},${height * 0.5}`}
              fill="none"
              stroke={a}
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          </g>
        )}

        {/* --- ISTOCK: CRT PHOSPHOR SCANLINES --- */}
        {(model === 'AnalogCrtPhosphor' || pattern === 'istock-crt-phosphor') && (
          <g>
            <circle cx={width * 0.5} cy={height * 0.5} r={height * 0.55} fill={a} fillOpacity="0.3" />
            {[10, 22, 34, 46, 58, 70, 82, 94, 106, 118, 130].map((y, idx) => (
              <line key={idx} x1={0} y1={y} x2={width} y2={y} stroke="#000000" strokeWidth="1.5" strokeOpacity="0.6" />
            ))}
            <rect x="0" y="0" width={width} height={height} fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="6" rx="8" />
          </g>
        )}

        {/* --- FIGMA: NOISE MESH GRADIENT --- */}
        {(model === 'FigmaNoiseMesh' || pattern === 'figma-noise-mesh') && (
          <g>
            <circle cx={width * 0.25} cy={height * 0.3} r={height * 0.5} fill={a} fillOpacity="0.4" />
            <circle cx={width * 0.75} cy={height * 0.75} r={height * 0.55} fill="#3B82F6" fillOpacity="0.35" />
            <circle cx={width * 0.5} cy={height * 0.2} r={height * 0.4} fill="#8B5CF6" fillOpacity="0.35" />
          </g>
        )}

        {/* --- FIGMA: HOLOGRAPHIC FOIL --- */}
        {(model === 'FigmaHoloFoil' || pattern === 'figma-holo-foil') && (
          <g>
            <line x1={0} y1={height} x2={width} y2={0} stroke="#00F0FF" strokeWidth="28" strokeOpacity="0.3" />
            <line x1={width * 0.2} y1={height} x2={width + 50} y2={0} stroke="#EC4899" strokeWidth="24" strokeOpacity="0.3" />
            <line x1={-30} y1={height} x2={width * 0.8} y2={0} stroke="#F59E0B" strokeWidth="20" strokeOpacity="0.3" />
          </g>
        )}

        {/* --- ALLISON PERRY: MIXED MEDIA TORN PAPER --- */}
        {(model === 'AllisonPerryMixedMedia' || pattern === 'allison-perry-mixed-media') && (
          <g>
            <polygon
              points={`20,20 ${width - 30},25 ${width - 25},${height - 25} 35,${height - 20}`}
              fill={p}
              stroke={a}
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.8"
            />
            <path
              d={`M 30,${height * 0.5} Q ${width * 0.5},${height * 0.35} ${width - 40},${height * 0.52}`}
              stroke={a}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </g>
        )}

        {/* --- RETRO VACUUM TUBE GLOW --- */}
        {(model === 'RetroVacuumTubeGlow' || pattern === 'istock-vacuum-tube-glow') && (
          <g>
            <circle cx={width * 0.5} cy={height * 0.5} r={height * 0.45} fill="#FB8500" fillOpacity="0.5" />
            <circle cx={width * 0.5} cy={height * 0.5} r="14" fill="#FFFFFF" fillOpacity="0.8" />
            <rect x={width * 0.32} y={height * 0.2} width={width * 0.36} height={height * 0.6} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" rx="6" />
          </g>
        )}

        {/* --- PINTEREST: VINYL MICROGROOVES --- */}
        {(model === 'VinylMicrogroove' || pattern === 'pinterest-vinyl-microgroove') && (
          <g>
            {[18, 32, 46, 60, 74, 88].map((r, idx) => (
              <circle key={idx} cx={width * 0.5} cy={height * 0.5} r={r} fill="none" stroke={idx % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.5)'} strokeWidth="1" />
            ))}
            <circle cx={width * 0.5} cy={height * 0.5} r="8" fill={a} opacity="0.8" />
          </g>
        )}

        {/* --- UNSPLASH: WEATHERED PLASTER --- */}
        {(model === 'UnsplashWeatheredPlaster' || pattern === 'unsplash-weathered-plaster') && (
          <g>
            <path d={`M 0,30 Q ${width * 0.4},10 ${width},40 L ${width},70 L 0,60 Z`} fill="rgba(255,255,255,0.08)" />
            <path d={`M 0,80 Q ${width * 0.6},100 ${width},75 L ${width},110 L 0,105 Z`} fill="rgba(0,0,0,0.25)" />
            <path d={`M 50,40 L 70,65 L 60,95 L 85,120`} stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none" />
          </g>
        )}

        {/* --- AERO SHARDS --- */}
        {(model === 'AeroShards' || pattern === 'aero-shards') && (
          <g opacity={0.85}>
            {[
              { d: `M 30,10 L 140,50 L 90,80 Z`, c: a },
              { d: `M 120,40 L 260,20 L 190,90 Z`, c: '#00F0FF' },
              { d: `M 70,70 L 180,120 L 100,135 Z`, c: p },
              { d: `M 180,80 L 290,110 L 220,135 Z`, c: a }
            ].map((s, idx) => (
              <path key={idx} d={s.d} fill={s.c} fillOpacity="0.4" stroke={s.c} strokeWidth="1.2" />
            ))}
          </g>
        )}

        {/* --- GHOST FIBERS --- */}
        {(model === 'GhostFibers' || pattern === 'ghost-fibers') && (
          <g opacity={0.75}>
            {[20, 60, 100, 140, 180, 220, 260].map((x, idx) => (
              <path
                key={idx}
                d={`M ${x},0 C ${x + 30},40 ${x - 30},90 ${x + 10},140`}
                fill="none"
                stroke={idx % 2 === 0 ? a : '#FFFFFF'}
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            ))}
          </g>
        )}

        {/* --- WEB THREADS --- */}
        {(model === 'WebThreads' || pattern === 'web-threads') && (
          <g opacity={0.8}>
            <line x1="30" y1="30" x2="120" y2="50" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="120" y1="50" x2="200" y2="30" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="120" y1="50" x2="150" y2="100" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="200" y1="30" x2="270" y2="70" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="150" y1="100" x2="270" y2="70" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            <line x1="40" y1="110" x2="150" y2="100" stroke={a} strokeWidth="1" strokeOpacity="0.6" />
            {[
              [30, 30], [120, 50], [200, 30], [270, 70], [150, 100], [40, 110]
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill={a} />
            ))}
          </g>
        )}

        {/* --- LASER SCANNER --- */}
        {(model === 'LaserScanner' || pattern === 'laser-scanner') && (
          <g>
            <rect x="0" y="55" width={width} height="30" fill={a} fillOpacity="0.25" />
            <line x1="0" y1="70" x2={width} y2="70" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.9" />
            <line x1="0" y1="70" x2={width} y2="70" stroke={a} strokeWidth="6" strokeOpacity="0.5" />
          </g>
        )}

        {/* --- PRISM SPECTRUM --- */}
        {(model === 'PrismSpectrum' || pattern === 'prism-spectrum') && (
          <g opacity={0.85}>
            <polygon points={`60,20 180,120 40,130`} fill={a} fillOpacity="0.2" stroke={a} strokeWidth="1" />
            {['#E63946', '#F59E0B', '#10B981', '#38BDF8', '#8B5CF6'].map((col, idx) => (
              <line
                key={idx}
                x1="120" y1="75"
                x2={width} y2={30 + idx * 22}
                stroke={col}
                strokeWidth="2.5"
                strokeOpacity="0.75"
              />
            ))}
          </g>
        )}

        {/* --- ACETERNITY LAMP --- */}
        {(model === 'AceternityLamp' || pattern === 'aceternity-lamp') && (
          <g opacity={0.9}>
            <polygon points={`${width * 0.5 - 20},0 ${width * 0.5 + 20},0 ${width * 0.5 + 100},${height} ${width * 0.5 - 100},${height}`} fill={a} fillOpacity="0.35" />
            <ellipse cx={width * 0.5} cy="0" rx="35" ry="8" fill="#FFFFFF" />
            <ellipse cx={width * 0.5} cy={height} rx="100" ry="25" fill={a} fillOpacity="0.4" />
          </g>
        )}

        {/* --- GLOWING PERIMETER --- */}
        {(model === 'GlowingPerimeter' || pattern === 'glowing-perimeter') && (
          <g>
            <rect x="6" y="6" width={width - 12} height={height - 12} fill="none" stroke={a} strokeWidth="3" strokeOpacity="0.8" />
            <rect x="9" y="9" width={width - 18} height={height - 18} fill="none" stroke={a} strokeWidth="1.5" strokeOpacity="0.4" />
          </g>
        )}

        {/* --- SPECTRAL RIBBON --- */}
        {(model === 'SpectralRibbon' || pattern === 'spectral-ribbon') && (
          <g opacity={0.85}>
            {[
              { d: `M 0,30 C 90,110 200,10 300,80`, w: 6, c: a },
              { d: `M 0,45 C 90,125 200,25 300,95`, w: 4, c: '#00F0FF' },
              { d: `M 0,60 C 90,140 200,40 300,110`, w: 2.5, c: '#FF2BD6' }
            ].map((rib, idx) => (
              <path key={idx} d={rib.d} fill="none" stroke={rib.c} strokeWidth={rib.w} strokeOpacity="0.75" />
            ))}
          </g>
        )}

        {/* --- CORAL GLOOM --- */}
        {(model === 'CoralGloom' || pattern === 'coral-gloom') && (
          <g>
            <circle cx={width * 0.35} cy={height * 0.5} r="55" fill="#FF6B6B" fillOpacity="0.45" filter="blur(10px)" />
            <circle cx={width * 0.65} cy={height * 0.4} r="45" fill="#C92A2A" fillOpacity="0.35" filter="blur(12px)" />
          </g>
        )}

        {/* --- BLUE MESHY --- */}
        {(model === 'BlueMeshy' || pattern === 'blue-meshy') && (
          <g>
            <ellipse cx={width * 0.35} cy={height * 0.4} rx="70" ry="40" fill="#00F0FF" fillOpacity="0.45" />
            <ellipse cx={width * 0.65} cy={height * 0.6} rx="80" ry="45" fill="#0055FF" fillOpacity="0.4" />
          </g>
        )}

        {/* --- BACKGROUND CIRCLES --- */}
        {(model === 'BackgroundCircles' || pattern === 'background-circles') && (
          <g opacity={0.8}>
            {[25, 55, 85, 115].map((r, i) => (
              <circle key={i} cx={width * 0.5} cy={height * 0.5} r={r} fill="none" stroke={a} strokeWidth="1.2" strokeOpacity="0.45" />
            ))}
            <circle cx={width * 0.5 + 55} cy={height * 0.5} r="3" fill={a} />
            <circle cx={width * 0.5 - 85} cy={height * 0.5} r="3.5" fill="#FFFFFF" />
          </g>
        )}

        {/* --- DIMENSIONAL FIELD --- */}
        {(model === 'DimensionalField' || pattern === 'dimensional-field') && (
          <g opacity={0.65}>
            {[30, 60, 90, 120, 150, 180, 210, 240, 270].map((x, i) => (
              <line key={i} x1={x} y1="0" x2={x * 1.2 - 20} y2={height} stroke={a} strokeWidth="1" strokeOpacity="0.4" />
            ))}
            {[20, 45, 70, 95, 120].map((y, i) => (
              <line key={i} x1="0" y1={y} x2={width} y2={y} stroke={a} strokeWidth="1" strokeOpacity="0.4" />
            ))}
          </g>
        )}

        {/* --- FLOW FIELD --- */}
        {(model === 'FlowField' || pattern === 'flow-field') && (
          <g opacity={0.75}>
            {[20, 60, 100, 140, 180, 220, 260].map((x) =>
              [20, 50, 80, 110].map((y) => (
                <line
                  key={`${x}-${y}`}
                  x1={x}
                  y1={y}
                  x2={x + 15}
                  y2={y + Math.sin(x * 0.05) * 12}
                  stroke={a}
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              ))
            )}
          </g>
        )}

        {/* --- WAVY RIPPLE --- */}
        {(model === 'WavyRipple' || pattern === 'wavy-ripple') && (
          <g opacity={0.8}>
            {[15, 35, 55, 75, 95, 115].map((r, idx) => (
              <circle key={idx} cx={width * 0.5} cy={height * 0.5} r={r} fill="none" stroke={a} strokeWidth="1.2" strokeOpacity="0.45" />
            ))}
          </g>
        )}

        {/* --- REFLECT SHADER --- */}
        {(model === 'ReflectShader' || pattern === 'reflect-specular') && (
          <g>
            <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
            <rect x="0" y={height * 0.45} width={width} height={height * 0.1} fill={a} fillOpacity="0.3" />
          </g>
        )}

        {/* --- BEYOND HORIZON --- */}
        {(model === 'BeyondHorizon' || pattern === 'beyond-horizon') && (
          <g opacity={0.85}>
            <circle cx={width * 0.5} cy={height * 0.45} r="28" fill={a} fillOpacity="0.6" />
            <line x1="0" y1={height * 0.45} x2={width} y2={height * 0.45} stroke="#FFFFFF" strokeWidth="1.5" />
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x, idx) => (
              <line key={idx} x1={width * 0.5} y1={height * 0.45} x2={x} y2={height} stroke={a} strokeWidth="1" strokeOpacity="0.5" />
            ))}
          </g>
        )}

        {/* --- BEHANCE: LIQUID GRAINY GRADIENTS --- */}
        {(pattern === 'liquid-grain-gradient' || model === 'LiquidGrainGradient') && (
          <g opacity={0.88 * contrast}>
            <ellipse cx={width * 0.3} cy={height * 0.4} rx={width * 0.4} ry={height * 0.55} fill={a} opacity="0.38" />
            <ellipse cx={width * 0.75} cy={height * 0.65} rx={width * 0.45} ry={height * 0.5} fill={p} opacity="0.45" />
            {[20, 50, 80, 110].map((y, idx) => (
              <path
                key={idx}
                d={`M 0,${y} C ${width * 0.25},${y - 25} ${width * 0.6},${y + 45} ${width},${y - 10}`}
                fill="none"
                stroke={idx % 2 === 0 ? a : '#FFFFFF'}
                strokeWidth={idx % 2 === 0 ? 2 : 1}
                opacity={0.35 + idx * 0.15}
              />
            ))}
          </g>
        )}

        {/* --- BEHANCE: DEEP LAYERS VOLUME 1 --- */}
        {(pattern === 'deep-layers-strata' || model === 'DeepLayers') && (
          <g opacity={0.92 * contrast}>
            {[0.2, 0.4, 0.6, 0.8].map((t, idx) => {
              const baseY = height * t;
              return (
                <g key={idx}>
                  <path
                    d={`M 0,${baseY} Q ${width * 0.25},${baseY - 20} ${width * 0.5},${baseY + 10} T ${width},${baseY} L ${width},${height} L 0,${height} Z`}
                    fill="#05080E"
                    opacity={0.5 + idx * 0.12}
                  />
                  <path
                    d={`M 0,${baseY} Q ${width * 0.25},${baseY - 20} ${width * 0.5},${baseY + 10} T ${width},${baseY}`}
                    fill="none"
                    stroke={a}
                    strokeWidth={idx === 0 ? 2 : 1.2}
                    opacity={0.4 + idx * 0.2}
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* Ambient Border */}
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
