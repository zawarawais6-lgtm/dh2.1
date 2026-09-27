import { KnobArchitectPreset, KnobStyle } from '../types/skin';

const STYLES: KnobStyle[] = [
  'ChunkyPointer',
  'ArcIndicator',
  'BoldBlock',
  'CyberRing',
  'LiquidGauge',
  'SteppedWedge',
  'GroovedCap',
  'NeonRim',
  'MinimalDot',
  'VintageFluted'
];

const CATEGORIES = [
  'Precision Industrial',
  'Cyberpunk Glowing',
  'Vintage Bakelite',
  'Studio Anodized',
  'Minimalist Bauhaus',
  'Aerospace Dial',
  'Analog Console',
  'Futuristic HUD'
];

const KNOB_PALETTES = [
  { body: '#242832', accent: '#E8A13A', pointer: '#E63946' },
  { body: '#161922', accent: '#00E5FF', pointer: '#FF007F' },
  { body: '#2B2622', accent: '#D4AF37', pointer: '#E05A47' },
  { body: '#181C16', accent: '#00FF9D', pointer: '#FFCC00' },
  { body: '#1F1714', accent: '#E07A5F', pointer: '#E65100' },
  { body: '#1A1824', accent: '#B347FF', pointer: '#00F0FF' },
  { body: '#1F2228', accent: '#38BDF8', pointer: '#F43F5E' },
  { body: '#141416', accent: '#A3B18A', pointer: '#D4AF37' }
];

const KNOB_NAMES = [
  'Master Level', 'Filter Cutoff', 'Resonance Peak', 'Drive Saturation',
  'Mix Balance', 'Time Constant', 'Feedback Loop', 'Modulation Depth',
  'Tape Flutter', 'Harmonic Shape', 'Pre-Delay', 'Color Dispersion',
  'High Damping', 'Low Contour', 'Spatial Spread', 'Decay Envelope'
];

export const knobArchitect1000: KnobArchitectPreset[] = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1;
  const style = STYLES[i % STYLES.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const pal = KNOB_PALETTES[i % KNOB_PALETTES.length];
  const baseName = KNOB_NAMES[i % KNOB_NAMES.length];

  const bezelWidth = 2 + (i % 6);
  const tickCount = 9 + ((i * 2) % 21);
  const tickSpread = 240 + (i % 60);
  const pointerThickness = 2 + (i % 4);
  const pointerLengthRatio = 0.55 + ((i % 35) / 100);
  const centerCapRatio = 0.4 + ((i % 40) / 100);
  const glowIntensity = parseFloat((0.2 + ((i * 17) % 80) / 100).toFixed(2));
  const shadowDepth = 4 + (i % 12);
  const metalRoughness = parseFloat((0.15 + ((i * 23) % 70) / 100).toFixed(2));

  return {
    id,
    name: `${baseName} ${style} #${String(id).padStart(4, '0')}`,
    category,
    style,
    bodyColor: pal.body,
    accentColor: pal.accent,
    pointerColor: pal.pointer,
    bezelWidth,
    tickCount,
    tickSpread,
    pointerThickness,
    pointerLengthRatio,
    centerCapRatio,
    glowIntensity,
    shadowDepth,
    metalRoughness,
    description: `High-fidelity ${style} mechanical knob with ${tickCount} precision ticks and ${Math.round(glowIntensity * 100)}% optical glow.`
  };
});
