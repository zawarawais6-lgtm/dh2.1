import { LfoVisualPreset } from '../types/skin';

const GRID_STYLES = [
  'fine-mesh',
  'crosshair',
  'polar-radial',
  'dot-matrix',
  'logarithmic',
  'reticle-hud'
] as const;

const LFO_PALETTES = [
  { phosphor: '#00FF66', glow: '#00FF6688', grid: 'rgba(0, 255, 102, 0.15)' },
  { phosphor: '#00E5FF', glow: '#00E5FF88', grid: 'rgba(0, 229, 255, 0.15)' },
  { phosphor: '#FFB703', glow: '#FB850088', grid: 'rgba(251, 133, 0, 0.15)' },
  { phosphor: '#FF007F', glow: '#FF007F88', grid: 'rgba(255, 0, 127, 0.15)' },
  { phosphor: '#A855F7', glow: '#A855F788', grid: 'rgba(168, 85, 247, 0.15)' },
  { phosphor: '#38BDF8', glow: '#38BDF888', grid: 'rgba(56, 189, 248, 0.15)' },
  { phosphor: '#4EAE8D', glow: '#4EAE8D88', grid: 'rgba(78, 174, 141, 0.15)' }
];

const LFO_NAMES = [
  'Tektronix Analog Sine 1.0Hz',
  'Oscilloscope Dual Lissajous',
  'Sub-Audio Triangle Flutter',
  'Exponential Sawtooth Beam',
  'Random Sample & Hold Glitch',
  'Harmonic Square Wave Pulse',
  'Logarithmic Sweep Horizon',
  'Polar Vector Radar Scope'
];

export const lfoVisualPresets: LfoVisualPreset[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const pal = LFO_PALETTES[i % LFO_PALETTES.length];
  const gridStyle = GRID_STYLES[i % GRID_STYLES.length];
  const baseName = LFO_NAMES[i % LFO_NAMES.length];

  return {
    id,
    name: `${baseName} #${String(id).padStart(3, '0')}`,
    category: 'Cathode Ray & Vector LFO',
    phosphorColor: pal.phosphor,
    beamGlowColor: pal.glow,
    gridColor: pal.grid,
    gridStyle,
    waveThickness: 1.5 + (i % 3) * 0.5,
    glowRadius: 6 + (i % 8),
    scanlineIntensity: parseFloat((0.2 + (i % 6) * 0.1).toFixed(2)),
    persistenceTrail: parseFloat((0.4 + (i % 5) * 0.12).toFixed(2)),
    fillGradient: i % 2 === 0,
    harmonics: 1 + (i % 4),
    description: `Real-time ${gridStyle} visual oscilloscope with ${pal.phosphor} phosphor beam and persistence trails.`
  };
});
