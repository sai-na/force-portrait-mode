/**
 * React integration for force-portrait-mode
 * Provides usePortraitMode hook and PortraitModeProvider component
 */

// Export React hooks
export {
  usePortraitMode,
  usePortraitModeSimple,
  useOrientation,
} from './hooks'

// Export React components
export {
  PortraitModeProvider,
  PortraitModeToggle,
  PortraitModeStatus,
  OrientationConditional,
  withPortraitMode,
  usePortraitModeContext,
} from './components'

// Export types for TypeScript users
export type {
  PortraitModeOptions,
  PortraitModeResult,
  ResponsiveSize,
  AnimationOptions,
  Position,
  CustomTheme,
  ThemePreset,
} from '../types'