import type {
  PortraitModeOptions,
  ResponsiveSize,
  Position,
  ValidationResult,
  AnimationOptions,
} from './types'

/**
 * Default configuration options
 */
export const DEFAULT_OPTIONS: Required<PortraitModeOptions> = {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  textColor: '#ffffff',
  icon: '📱',
  iconColor: '#ffffff',
  message: 'Please rotate your phone to portrait mode',
  fontFamily: '"Oxanium", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.2rem',
  fontWeight: '600',
  iconSize: '4rem',
  iconPosition: { 
    top: '40%', 
    left: '50%', 
    minGap: '2rem',
    maxWidth: '90vw'
  },
  textPosition: { 
    top: '70%', 
    left: '50%', 
    minGap: '2rem',
    maxWidth: '90vw'
  },
  animation: {
    enabled: true,
    type: 'rotate',
    duration: '2s',
    rotationAngle: 15,
    iterations: 'infinite',
  },
  zIndex: 9999,
  overlay: true,
  blur: false,
  theme: 'dark',
  breakpoint: '0px',
  layout: {
    preventOverlap: true,
    responsive: true,
    minSpacing: '2rem',
    fallbackLayout: 'vertical-stack',
  },
  textHandling: {
    maxWidth: '90vw',
    truncate: true,
    multiLine: false,
    breakWords: false,
  },
  hideScrollbar: true,
  preventScroll: true,
  ariaLabel: 'Please rotate device to portrait mode',
  respectPrefers: true,
  onShow: () => {},
  onHide: () => {},
}

/**
 * Parse a CSS size value into number and unit
 */
export function parseSize(size: string): { value: number; unit: string } {
  const match = size.match(/^([\d.]+)(.*)$/)
  if (!match) {
    return { value: 0, unit: 'px' }
  }
  return { value: parseFloat(match[1]), unit: match[2] || 'px' }
}

/**
 * Convert responsive size configuration to CSS clamp() function
 */
export function createResponsiveSize(size: string | ResponsiveSize): string {
  if (typeof size === 'string') {
    return size
  }
  return `clamp(${size.min}, ${size.viewport}, ${size.max})`
}

/**
 * Calculate safe positions to prevent overlap
 */
export function calculateSafePositions(
  options: PortraitModeOptions,
  viewport: { width: number; height: number }
): {
  iconPosition: Position
  textPosition: Position
  adjusted: boolean
  hasOverlap: boolean
} {
  const iconTop = parseFloat(options.iconPosition?.top || '40%')
  const textTop = parseFloat(options.textPosition?.top || '70%')
  
  // Calculate element heights (rough estimates)
  const iconSize = parseSize(
    typeof options.iconSize === 'string' ? options.iconSize : options.iconSize?.max || '4rem'
  )
  const fontSize = parseSize(
    typeof options.fontSize === 'string' ? options.fontSize : options.fontSize?.max || '1.2rem'
  )
  
  // Convert rem to pixels (assuming 16px base)
  const iconHeight = iconSize.unit === 'rem' ? iconSize.value * 16 : iconSize.value
  const textHeight = fontSize.unit === 'rem' ? fontSize.value * 16 : fontSize.value
  
  // Check for potential overlap
  const gap = Math.abs(textTop - iconTop) / 100 * viewport.height
  const minGap = parseSize(options.layout?.minSpacing || '2rem')
  const minGapPx = minGap.unit === 'rem' ? minGap.value * 16 : minGap.value
  
  const hasOverlap = gap < (iconHeight + textHeight + minGapPx)
  
  if (!hasOverlap || !options.layout?.preventOverlap) {
    return {
      iconPosition: options.iconPosition || DEFAULT_OPTIONS.iconPosition,
      textPosition: options.textPosition || DEFAULT_OPTIONS.textPosition,
      adjusted: false,
      hasOverlap,
    }
  }
  
  // Adjust positions for small screens
  let adjustedIconTop = '30%'
  let adjustedTextTop = '60%'
  
  if (viewport.height < 500) {
    adjustedIconTop = '25%'
    adjustedTextTop = '65%'
  }
  
  return {
    iconPosition: {
      ...options.iconPosition,
      top: adjustedIconTop,
    },
    textPosition: {
      ...options.textPosition,
      top: adjustedTextTop,
    },
    adjusted: true,
    hasOverlap,
  }
}

/**
 * Validate configuration options
 */
export function validateOptions(options: PortraitModeOptions): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []
  
  // Check for potential overlaps
  if (options.iconPosition?.top && options.textPosition?.top) {
    const iconTop = parseFloat(options.iconPosition.top)
    const textTop = parseFloat(options.textPosition.top)
    
    if (Math.abs(iconTop - textTop) < 20) {
      warnings.push('Icon and text positions may overlap on small screens')
    }
  }
  
  // Check message length
  if (options.message && options.message.length > 50) {
    warnings.push('Long message may cause overflow on small screens')
  }
  
  // Validate CSS size values
  const sizeProperties = ['iconSize', 'fontSize'] as const
  sizeProperties.forEach(prop => {
    const value = options[prop]
    if (value && typeof value === 'string' && !isValidCSSSize(value)) {
      errors.push(`Invalid ${prop} value: ${value}`)
    }
  })
  
  // Validate colors
  const colorProperties = ['backgroundColor', 'textColor', 'iconColor'] as const
  colorProperties.forEach(prop => {
    const value = options[prop]
    if (value && !isValidCSSColor(value)) {
      warnings.push(`Potentially invalid ${prop} value: ${value}`)
    }
  })
  
  // Check z-index
  if (options.zIndex && (options.zIndex < 0 || options.zIndex > 2147483647)) {
    errors.push('z-index must be between 0 and 2147483647')
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  }
}

/**
 * Check if a value is a valid CSS size
 */
export function isValidCSSSize(value: string): boolean {
  const cssUnits = ['px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', '%', 'pt', 'pc', 'in', 'cm', 'mm']
  const pattern = new RegExp(`^\\d*\\.?\\d+(${cssUnits.join('|')})$`)
  return pattern.test(value.trim())
}

/**
 * Check if a value is a valid CSS color
 */
export function isValidCSSColor(value: string): boolean {
  // Basic validation for common color formats
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i
  const rgbPattern = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+))?\s*\)$/
  const hslPattern = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(0|1|0?\.\d+))?\s*\)$/
  
  return hexPattern.test(value) || rgbPattern.test(value) || hslPattern.test(value)
}

/**
 * Generate CSS keyframes for animations
 */
export function generateAnimationKeyframes(
  animationType: string,
  rotationAngle?: number
): string {
  switch (animationType) {
    case 'rotate': {
      const angle = rotationAngle || 15
      return `
        @keyframes force-portrait-rotate {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50%, -50%) rotate(-${angle}deg); }
          75% { transform: translate(-50%, -50%) rotate(${angle}deg); }
        }
      `
    }
    
    case 'bounce':
      return `
        @keyframes force-portrait-bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
          40%, 43% { transform: translate(-50%, -50%) translateY(-10px); }
          70% { transform: translate(-50%, -50%) translateY(-5px); }
          90% { transform: translate(-50%, -50%) translateY(-2px); }
        }
      `
    
    case 'pulse':
      return `
        @keyframes force-portrait-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
      `
    
    case 'shake':
      return `
        @keyframes force-portrait-shake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-50%, -50%) translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translate(-50%, -50%) translateX(5px); }
        }
      `
    
    default:
      return ''
  }
}

/**
 * Merge options with defaults
 */
export function mergeWithDefaults(options: PortraitModeOptions): Required<PortraitModeOptions> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    iconPosition: {
      ...DEFAULT_OPTIONS.iconPosition,
      ...(options.iconPosition || {}),
    },
    textPosition: {
      ...DEFAULT_OPTIONS.textPosition,
      ...(options.textPosition || {}),
    },
    animation: (() => {
      const defaultAnimation = DEFAULT_OPTIONS.animation as AnimationOptions
      if (typeof options.animation === 'boolean') {
        return { ...defaultAnimation, enabled: options.animation }
      }
      if (typeof options.animation === 'object' && options.animation !== null) {
        return { ...defaultAnimation, ...options.animation }
      }
      return defaultAnimation
    })(),
    layout: {
      ...DEFAULT_OPTIONS.layout,
      ...(options.layout || {}),
    },
    textHandling: {
      ...DEFAULT_OPTIONS.textHandling,
      ...(options.textHandling || {}),
    },
  }
}