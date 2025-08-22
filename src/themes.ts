import type { CustomTheme, PortraitModeOptions } from './types'

/**
 * Predefined theme configurations
 */
export const themes: Record<string, Partial<PortraitModeOptions>> = {
  dark: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    textColor: '#ffffff',
    icon: '📱',
    iconColor: '#ffffff',
    fontWeight: '600',
    animation: {
      enabled: true,
      type: 'rotate',
      duration: '2s',
      rotationAngle: 15,
      iterations: 'infinite',
    },
  },

  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    textColor: '#1a1a1a',
    icon: '📱',
    iconColor: '#1a1a1a',
    fontWeight: '500',
    animation: {
      enabled: true,
      type: 'bounce',
      duration: '1.5s',
      iterations: 'infinite',
    },
  },

  neon: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    textColor: '#00ff88',
    icon: '📲',
    iconColor: '#ff0080',
    fontFamily: 'monospace',
    fontWeight: '700',
    animation: {
      enabled: true,
      type: 'pulse',
      duration: '1s',
      iterations: 'infinite',
    },
    blur: true,
  },

  minimal: {
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    textColor: '#333333',
    icon: '↻',
    iconColor: '#666666',
    fontWeight: '400',
    animation: {
      enabled: false,
    },
  },
}

/**
 * Apply theme configuration to options
 */
export function applyTheme(
  options: PortraitModeOptions,
  theme: string | CustomTheme
): PortraitModeOptions {
  if (typeof theme === 'string') {
    const presetTheme = themes[theme]
    if (!presetTheme) {
      console.warn(`Unknown theme preset: ${theme}. Using default theme.`)
      return options
    }
    return { ...presetTheme, ...options }
  }

  // Custom theme object
  const customThemeOptions: Partial<PortraitModeOptions> = {
    backgroundColor: theme.backgroundColor,
    textColor: theme.textColor,
    icon: theme.icon,
    iconColor: theme.iconColor,
  }

  if (theme.animation) {
    customThemeOptions.animation = {
      enabled: true,
      type: theme.animation,
      duration: '2s',
      iterations: 'infinite',
    }
  }

  return { ...customThemeOptions, ...options }
}

/**
 * Get list of available theme names
 */
export function getAvailableThemes(): string[] {
  return Object.keys(themes)
}

/**
 * Get theme configuration by name (for testing/direct access)
 */
export function getTheme(name: string): Partial<PortraitModeOptions> | undefined {
  return themes[name]
}

/**
 * Validate theme configuration
 */
export function validateTheme(theme: string | CustomTheme): boolean {
  if (typeof theme === 'string') {
    return theme in themes
  }

  // Validate custom theme object
  return !!(
    theme.backgroundColor &&
    theme.textColor &&
    theme.icon &&
    typeof theme.backgroundColor === 'string' &&
    typeof theme.textColor === 'string' &&
    typeof theme.icon === 'string'
  )
}