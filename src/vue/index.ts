/**
 * Vue integration for force-portrait-mode
 * Provides Vue 3 composables and components
 */

// Export Vue composables
export {
  usePortraitMode,
  usePortraitModeSimple,
  useOrientation,
} from './composables'

// Export Vue components
export {
  PortraitModeProvider,
  PortraitModeToggle,
  PortraitModeStatus,
  OrientationConditional,
} from './components'

// Re-export types from main library for TypeScript users
export type {
  PortraitModeOptions,
  PortraitModeResult,
  ResponsiveSize,
  AnimationOptions,
  Position,
  CustomTheme,
  ThemePreset,
} from '../types'