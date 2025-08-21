/**
 * Responsive size configuration for dynamic scaling
 */
export interface ResponsiveSize {
  /** Minimum size value */
  min: string
  /** Maximum size value */
  max: string
  /** Viewport-relative unit (vw, vh, vmin, vmax) */
  viewport: string
}

/**
 * Animation configuration options
 */
export interface AnimationOptions {
  /** Whether animation is enabled */
  enabled: boolean
  /** Animation type */
  type?: 'rotate' | 'bounce' | 'pulse' | 'shake'
  /** Animation duration */
  duration?: string
  /** Rotation angle for rotate animation (in degrees) */
  rotationAngle?: number
  /** Animation iteration count */
  iterations?: string | number
}

/**
 * Position configuration for elements
 */
export interface Position {
  /** Top position (CSS value) */
  top?: string
  /** Left position (CSS value) */
  left?: string
  /** Minimum gap from other elements */
  minGap?: string
  /** Maximum width to prevent overflow */
  maxWidth?: string
}

/**
 * Text handling configuration
 */
export interface TextHandling {
  /** Maximum width before truncation */
  maxWidth?: string
  /** Enable text truncation with ellipsis */
  truncate?: boolean
  /** Allow multiple lines */
  multiLine?: boolean
  /** Prevent word breaking */
  breakWords?: boolean
}

/**
 * Layout configuration for overlap prevention
 */
export interface LayoutConfig {
  /** Automatically prevent element overlap */
  preventOverlap?: boolean
  /** Enable responsive sizing */
  responsive?: boolean
  /** Minimum spacing between elements */
  minSpacing?: string
  /** Fallback layout strategy */
  fallbackLayout?: 'vertical-stack' | 'horizontal' | 'minimal'
}

/**
 * Predefined theme names
 */
export type ThemePreset = 'dark' | 'light' | 'neon' | 'minimal'

/**
 * Custom theme configuration
 */
export interface CustomTheme {
  /** Background color */
  backgroundColor: string
  /** Text color */
  textColor: string
  /** Icon character/emoji */
  icon: string
  /** Icon color (optional) */
  iconColor?: string
  /** Animation type */
  animation?: AnimationOptions['type']
}

/**
 * Complete configuration options for portrait mode enforcement
 */
export interface PortraitModeOptions {
  /**
   * Background color for the landscape overlay
   * @default 'rgba(0, 0, 0, 0.9)'
   * @example '#1a1a1a', 'rgb(26, 26, 26)', 'rgba(0,0,0,0.8)'
   */
  backgroundColor?: string

  /**
   * Text color for the message
   * @default '#ffffff'
   */
  textColor?: string

  /**
   * Icon to display (emoji or text)
   * @default '📱'
   * @example '🔄', '📲', '↻'
   */
  icon?: string

  /**
   * Icon color (optional, inherits textColor if not set)
   */
  iconColor?: string

  /**
   * Message text to display
   * @default 'Please rotate your phone to portrait mode'
   */
  message?: string

  /**
   * Font family for text
   * @default system font stack
   */
  fontFamily?: string

  /**
   * Font size for message text (responsive sizing supported)
   * @default '1.2rem'
   */
  fontSize?: string | ResponsiveSize

  /**
   * Font weight for message text
   * @default '600'
   */
  fontWeight?: string | number

  /**
   * Icon size (responsive sizing supported)
   * @default '4rem'
   */
  iconSize?: string | ResponsiveSize

  /**
   * Position of the phone icon
   * @default { top: '40%', left: '50%' }
   */
  iconPosition?: Position

  /**
   * Position of the instruction text
   * @default { top: '70%', left: '50%' }
   */
  textPosition?: Position

  /**
   * Animation configuration
   */
  animation?: AnimationOptions | boolean

  /**
   * Z-index for the overlay elements
   * @default 9999
   */
  zIndex?: number

  /**
   * Show semi-transparent overlay
   * @default true
   */
  overlay?: boolean

  /**
   * Enable backdrop blur effect
   * @default false
   */
  blur?: boolean

  /**
   * Predefined theme or custom theme object
   */
  theme?: ThemePreset | CustomTheme

  /**
   * CSS breakpoint for activation
   * @default '0px' (always active in landscape)
   */
  breakpoint?: string

  /**
   * Layout configuration for responsive behavior
   */
  layout?: LayoutConfig

  /**
   * Text handling configuration
   */
  textHandling?: TextHandling

  /**
   * Hide scrollbar when active
   * @default true
   */
  hideScrollbar?: boolean

  /**
   * Prevent scrolling when active
   * @default true
   */
  preventScroll?: boolean

  /**
   * Accessibility label
   * @default 'Please rotate device to portrait mode'
   */
  ariaLabel?: string

  /**
   * Respect user's motion preferences
   * @default true
   */
  respectPrefers?: boolean

  /**
   * Callback fired when portrait mode message is shown
   */
  onShow?: () => void

  /**
   * Callback fired when portrait mode message is hidden
   */
  onHide?: () => void
}

/**
 * Result returned by enablePortraitMode function
 */
export interface PortraitModeResult {
  /** The resolved options after applying defaults and validation */
  options: Required<PortraitModeOptions>
  /** Layout information and adjustments made */
  layout: {
    /** Whether any overlap was detected and corrected */
    adjusted: boolean
    /** Whether elements would overlap without adjustment */
    hasOverlap: boolean
    /** Final calculated positions */
    iconPosition: Position
    textPosition: Position
  }
  /** Cleanup function to disable portrait mode */
  cleanup: () => void
}

/**
 * Validation result for configuration options
 */
export interface ValidationResult {
  /** Whether the configuration is valid */
  isValid: boolean
  /** Warning messages (non-blocking) */
  warnings: string[]
  /** Error messages (blocking) */
  errors: string[]
}