import { SliderArchitectPreset, SliderTrackStyle, SliderThumbStyle } from '../types/skin';

const TRACK_STYLES: SliderTrackStyle[] = [
  'recessed-groove',
  'cyber-glow',
  'liquid-tube',
  'vintage-slot',
  'stepped-ladder',
  'dual-rail',
  'minimal-line'
];

const THUMB_STYLES: SliderThumbStyle[] = [
  'brushed-metal',
  'glowing-pill',
  'reticle-cross',
  'vintage-bakelite',
  'diamond-wedge',
  'knurled-slug',
  'laser-dot',
  'flat-tab'
];

const CATEGORIES = [
  'Studio Console',
  'Cyber Fader',
  'Vintage Mechanical',
  'Precision Linear',
  'Optical Glowing',
  'Minimalist Rail',
  'Aerospace Slider',
  'Modular Synth'
];

const SLIDER_PALETTES = [
  { track: '#0C0F14', thumb: '#E0E6ED', accent: '#E8A13A' },
  { track: '#080C14', thumb: '#F1F5F9', accent: '#00E5FF' },
  { track: '#120F0D', thumb: '#EDE8DF', accent: '#D4AF37' },
  { track: '#0B120E', thumb: '#E2E8DF', accent: '#00FF9D' },
  { track: '#140D0B', thumb: '#F5EBE6', accent: '#E07A5F' },
  { track: '#120C18', thumb: '#EAE2F8', accent: '#B347FF' },
  { track: '#0F141C', thumb: '#F8FAFC', accent: '#38BDF8' }
];

const SLIDER_NAMES = [
  'Channel Gain', 'Wet/Dry Blend', 'Feedback Gain', 'Output Level',
  'Crossfade Matrix', 'Reverb Density', 'Pitch Modulation', 'Tape Saturation',
  'Filter Frequency', 'Spatial Width', 'Dynamic Threshold', 'Envelope Attack'
];

export const sliderArchitect1000: SliderArchitectPreset[] = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1;
  const trackStyle = TRACK_STYLES[i % TRACK_STYLES.length];
  const thumbStyle = THUMB_STYLES[i % THUMB_STYLES.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const pal = SLIDER_PALETTES[i % SLIDER_PALETTES.length];
  const baseName = SLIDER_NAMES[i % SLIDER_NAMES.length];

  const trackHeight = 120 + ((i * 5) % 60);
  const thumbWidth = 24 + (i % 16);
  const thumbHeight = 14 + (i % 12);
  const cornerRadius = 2 + (i % 8);
  const showCenterDetent = i % 2 === 0;
  const tickMarksCount = 5 + ((i * 2) % 15);
  const glowIntensity = parseFloat((0.2 + ((i * 19) % 80) / 100).toFixed(2));

  return {
    id,
    name: `${baseName} ${thumbStyle} #${String(id).padStart(4, '0')}`,
    category,
    trackStyle,
    thumbStyle,
    trackHeight,
    thumbWidth,
    thumbHeight,
    cornerRadius,
    showCenterDetent,
    tickMarksCount,
    trackColor: pal.track,
    thumbColor: pal.thumb,
    accentColor: pal.accent,
    glowIntensity,
    description: `Precision ${trackStyle} slider rail with ${thumbStyle} cap and ${tickMarksCount} tick positions.`
  };
});
