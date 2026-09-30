import { MerchantThemeSettings } from '../types/search';

export interface CustomPreset {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  settings: MerchantThemeSettings;
}

export class DesignSystemEngine {
  private static CUSTOM_PRESETS_STORAGE_KEY = 'ncf_custom_theme_presets_v2';

  /**
   * Applies all theme settings as CSS custom variables to document.documentElement live
   */
  static applyTokensToDOM(settings: MerchantThemeSettings): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // 1. Color System Tokens
    root.style.setProperty('--ncf-color-primary', settings.primaryColor || '#0284c7');
    root.style.setProperty('--ncf-color-secondary', settings.secondaryColor || '#334155');
    root.style.setProperty('--ncf-color-accent', settings.accentColor || '#06b6d4');
    root.style.setProperty('--ncf-color-bg', settings.backgroundColor || '#ffffff');
    root.style.setProperty('--ncf-color-surface', settings.surfaceColor || '#f8fafc');
    root.style.setProperty('--ncf-color-border', settings.borderColor || '#e2e8f0');
    root.style.setProperty('--ncf-color-success', settings.successColor || '#10b981');
    root.style.setProperty('--ncf-color-warning', settings.warningColor || '#f59e0b');
    root.style.setProperty('--ncf-color-error', settings.errorColor || '#ef4444');

    // 2. Typography Tokens
    const fontFamilies: Record<string, string> = {
      sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      serif: "'Playfair Display', Georgia, serif",
      mono: "'JetBrains Mono', Courier, monospace",
      system: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    };
    root.style.setProperty('--ncf-font-family', fontFamilies[settings.fontFamily] || fontFamilies.sans);

    const headingScales: Record<string, string> = {
      sm: '0.9',
      md: '1.0',
      lg: '1.15',
      xl: '1.3'
    };
    root.style.setProperty('--ncf-heading-scale', headingScales[settings.headingScale] || '1.0');

    // 3. Border Radius Tokens
    const buttonRadii: Record<string, string> = {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px'
    };
    root.style.setProperty('--ncf-radius-button', buttonRadii[settings.buttonRadius] || '8px');

    const cardRadii: Record<string, string> = {
      none: '0px',
      sm: '6px',
      md: '12px',
      lg: '16px',
      xl: '24px'
    };
    root.style.setProperty('--ncf-radius-card', cardRadii[settings.cardRadius] || '12px');

    // 4. Layout & Spacing Tokens
    root.style.setProperty('--ncf-container-max-width', settings.containerMaxWidth || '1440px');

    const sectionSpacings: Record<string, string> = {
      compact: '2rem',
      comfortable: '4rem',
      spacious: '6rem'
    };
    root.style.setProperty('--ncf-section-spacing', sectionSpacings[settings.sectionSpacing] || '4rem');

    const gridGaps: Record<string, string> = {
      sm: '1rem',
      md: '1.5rem',
      lg: '2.5rem'
    };
    root.style.setProperty('--ncf-grid-gap', gridGaps[settings.gridGap] || '1.5rem');

    // 5. Animation Speed Tokens
    const animSpeeds: Record<string, string> = {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    };
    root.style.setProperty('--ncf-anim-speed', settings.enableAnimations ? (animSpeeds[settings.animationSpeed] || '300ms') : '0ms');

    // 6. High Contrast & Focus Mode
    if (settings.highContrastMode) {
      root.classList.add('ncf-high-contrast');
    } else {
      root.classList.remove('ncf-high-contrast');
    }
  }

  /**
   * Preset Library: Save custom user preset
   */
  static saveCustomPreset(name: string, description: string, settings: MerchantThemeSettings): CustomPreset {
    const existing = this.getCustomPresets();
    const newPreset: CustomPreset = {
      id: `custom-preset-${Date.now()}`,
      name: name.trim() || 'Custom Merchant Preset',
      description: description.trim() || 'Merchant saved custom configuration',
      createdAt: new Date().toISOString(),
      settings: { ...settings }
    };
    const updated = [newPreset, ...existing];
    try {
      localStorage.setItem(this.CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    return newPreset;
  }

  /**
   * Preset Library: Get stored custom presets
   */
  static getCustomPresets(): CustomPreset[] {
    try {
      const data = localStorage.getItem(this.CUSTOM_PRESETS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Preset Library: Delete custom preset
   */
  static deleteCustomPreset(id: string): CustomPreset[] {
    const existing = this.getCustomPresets();
    const filtered = existing.filter((p) => p.id !== id);
    try {
      localStorage.setItem(this.CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    return filtered;
  }

  /**
   * Preset Library: Export active settings as downloadable JSON file
   */
  static exportSettingsToJSON(settings: MerchantThemeSettings, filename = 'nova-theme-preset.json'): void {
    const jsonStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Preset Library: Import settings from JSON string
   */
  static parseImportedJSON(jsonString: string): Partial<MerchantThemeSettings> | null {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Partial<MerchantThemeSettings>;
      }
      return null;
    } catch (e) {
      console.error('Invalid JSON string for theme settings', e);
      return null;
    }
  }
}
