import { DesignTheme, SkinDefinition } from '../types/skin';

export function themeToSkinDefinition(theme: DesignTheme): SkinDefinition {
  const base = theme.skin;
  return {
    id: typeof base.id === 'number' ? base.id : 1,
    name: theme.name,
    category: (base.category as any) || 'Wada Sanzo Classic',
    panelDark: base.panelDark || '#121620',
    panelDarker: base.panelDarker || '#090B10',
    cream: base.cream || '#E0E6ED',
    amber: theme.accentColor || base.amber || '#E8A13A',
    ledRed: base.ledRed || '#E63946',
    ledOff: base.ledOff || '#2B1214',
    knobStyle: theme.knob?.style || base.knobStyle || 'ChunkyPointer',
    panelTexture: theme.texture?.baseModel || base.panelTexture || 'GrittyTexture',
    decorativeDots: base.decorativeDots ?? true,
    textColor: base.textColor || base.cream || '#E0E6ED',
    headerTextColor: base.headerTextColor || theme.accentColor || '#E8A13A',
    valueTextColor: base.valueTextColor || theme.accentColor || '#E8A13A',
    knobBodyColor: theme.knob?.bodyColor || base.knobBodyColor || '#E0E6ED',
    knobAccentColor: theme.knob?.accentColor || theme.accentColor || '#E8A13A',
    knobPointerColor: theme.knob?.pointerColor || base.knobPointerColor || '#E63946',
    knobGlowEnabled: theme.customization?.knobGlowEnabled ?? true,
    glowIntensity: theme.customization?.knobGlowIntensity ?? 0.5,
    sliderTrackColor: theme.slider?.trackColor || base.panelDarker || '#090B10',
    sliderThumbColor: theme.slider?.thumbColor || base.cream || '#E0E6ED',
    sliderAccentColor: theme.slider?.accentColor || theme.accentColor || '#E8A13A',
    patternType: theme.texture?.patternType || base.patternType,
    textureRoughness: theme.texture?.roughness ?? 0.5,
    textureContrast: theme.texture?.contrast ?? 1.0,
    grainDensity: theme.texture?.grainDensity ?? 0.65,
    noiseOctaves: theme.texture?.noiseOctaves ?? 4,
    vignetteStrength: theme.texture?.vignette ?? 0.35,
    liquidFlowAngle: theme.texture?.liquidAngle ?? 45,
    textureArchetype: theme.texture,
    knobPreset: theme.knob,
    sliderPreset: theme.slider,
    lfoPreset: theme.lfo
  };
}
