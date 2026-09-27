import { SkinDefinition, PresetCategory, PanelTexture, KnobStyle } from '../types/skin';
import { textureArchetypes1000 } from './textureArchetypes1000';
import { knobArchitect1000 } from './knobArchitect1000';
import { sliderArchitect1000 } from './sliderArchitect1000';
import { lfoVisualPresets } from './lfoVisualPresets';

const CATEGORIES: PresetCategory[] = [
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
  'Analog & Texturelabs',
  'Figma Modern',
  'Mixed Media & Print'
];

const TEXTURES: PanelTexture[] = [
  'GrittyTexture',
  'FineMineralGrit',
  'LiquidGrainGradient',
  'DeepLayers',
  'DarkGrainyGrit',
  'TexturelabsPhotocopy',
  'TexturelabsFilmDust',
  'TexturelabsBrushedAlloy',
  'TexturelabsOxidizedPatina',
  'AnalogMagneticTape',
  'AnalogCrtPhosphor',
  'AnalogRisographStipple',
  'FigmaNoiseMesh',
  'FigmaHoloFoil',
  'UnsplashWeatheredPlaster',
  'UnsplashSlateStone',
  'AllisonPerryMixedMedia',
  'RetroVacuumTubeGlow',
  'VinylMicrogroove',
  'HalftoneDotPattern',
  'BrushedMetal',
  'GridOverlay',
  'CyberCircuit',
  'SolarizedFilm',
  'FlatMatte',
  'CarbonFiber',
  'MarbleStone',
  'HolographicFoil',
  'CRTPhosphor',
  'SteampunkBrass'
];

const KNOB_STYLES: KnobStyle[] = [
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

const BASE_PALETTES = [
  { dark: '#121620', darker: '#090B10', cream: '#E0E6ED', amber: '#E8A13A', ledRed: '#E63946', ledOff: '#2B1214' },
  { dark: '#10141D', darker: '#080A0E', cream: '#D8E2EC', amber: '#00E5FF', ledRed: '#FF2BD6', ledOff: '#201228' },
  { dark: '#161922', darker: '#0C0E14', cream: '#EDE8DF', amber: '#D4AF37', ledRed: '#E6402B', ledOff: '#281412' },
  { dark: '#181C16', darker: '#0B0F09', cream: '#E2E8DF', amber: '#00FF9D', ledRed: '#FFCC00', ledOff: '#242010' },
  { dark: '#1F1714', darker: '#100B09', cream: '#F5EBE6', amber: '#E07A5F', ledRed: '#E65100', ledOff: '#301410' },
  { dark: '#191522', darker: '#0C0814', cream: '#EAE2F8', amber: '#B347FF', ledRed: '#00FF9D', ledOff: '#1B2420' },
  { dark: '#1A1817', darker: '#0D0C0C', cream: '#E5E4E2', amber: '#F59E0B', ledRed: '#EF4444', ledOff: '#2C1515' },
  { dark: '#141E28', darker: '#0A1017', cream: '#E0F2FE', amber: '#38BDF8', ledRed: '#F43F5E', ledOff: '#2D1219' }
];

const PREFIXES = [
  'Obsidian', 'Solarized', 'Quantum', 'Kintsugi', 'Machined', 'Cyber', 'Sumi', 'Topographic',
  'Damascus', 'Phosphor', 'Titanium', 'Aether', 'Neon', 'Boutique', 'Vortex', 'Risograph',
  'Hydraulic', 'Aerospace', 'Sub-Zero', 'Vintage', 'Harmonic', 'Cosmic', 'Monolith', 'Apex'
];

const SUFFIXES = [
  'Studio Master', 'Console Rig', 'Audio Core', 'Synthesizer Desk', 'Analog Host',
  'Precision Unit', 'Channel Strip', 'Tape Vault', 'Cathode Frame', 'Vector Station'
];

export const PRESETS_1000: SkinDefinition[] = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1;
  const category = CATEGORIES[i % CATEGORIES.length];
  const texture = TEXTURES[i % TEXTURES.length];
  const knobStyle = KNOB_STYLES[i % KNOB_STYLES.length];
  const pal = BASE_PALETTES[i % BASE_PALETTES.length];

  const prefix = PREFIXES[i % PREFIXES.length];
  const suffix = SUFFIXES[(i * 3) % SUFFIXES.length];
  const name = `${prefix} ${suffix} #${String(id).padStart(4, '0')}`;

  const texArchetype = textureArchetypes1000[i % textureArchetypes1000.length];
  const knobPreset = knobArchitect1000[i % knobArchitect1000.length];
  const sliderPreset = sliderArchitect1000[i % sliderArchitect1000.length];
  const lfoPreset = lfoVisualPresets[i % lfoVisualPresets.length];

  return {
    id,
    name,
    category,
    panelDark: pal.dark,
    panelDarker: pal.darker,
    cream: pal.cream,
    amber: pal.amber,
    ledRed: pal.ledRed,
    ledOff: pal.ledOff,
    knobStyle,
    panelTexture: texture,
    decorativeDots: i % 3 === 0,
    textColor: pal.cream,
    headerTextColor: pal.amber,
    valueTextColor: pal.amber,
    knobBodyColor: pal.cream,
    knobAccentColor: pal.amber,
    knobPointerColor: pal.ledRed,
    knobGlowEnabled: true,
    glowIntensity: 0.5,
    sliderTrackColor: pal.darker,
    sliderThumbColor: pal.cream,
    sliderAccentColor: pal.amber,
    patternType: texArchetype.patternType,
    textureRoughness: texArchetype.roughness,
    textureContrast: texArchetype.contrast,
    grainDensity: texArchetype.grainDensity,
    noiseOctaves: texArchetype.noiseOctaves,
    blendMode: texArchetype.blendMode,
    vignetteStrength: texArchetype.vignette,
    liquidFlowAngle: texArchetype.liquidAngle,
    bezelWidth: knobPreset.bezelWidth,
    tickCount: knobPreset.tickCount,
    tickSpread: knobPreset.tickSpread,
    pointerThickness: knobPreset.pointerThickness,
    pointerLengthRatio: knobPreset.pointerLengthRatio,
    centerCapRatio: knobPreset.centerCapRatio,
    shadowDepth: knobPreset.shadowDepth,
    metalRoughness: knobPreset.metalRoughness,
    textureArchetype: texArchetype,
    knobPreset,
    sliderPreset,
    lfoPreset
  };
});
