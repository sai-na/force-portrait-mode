/**
 * Force Portrait Mode - Main JavaScript API
 * Lightweight library to enforce portrait orientation on mobile devices
 */

import type {
  PortraitModeOptions,
  PortraitModeResult,
} from './types'
import {
  calculateSafePositions,
  createResponsiveSize,
  generateAnimationKeyframes,
  mergeWithDefaults,
  validateOptions,
} from './utils'
import { applyTheme } from './themes'

// Global state management
let currentInstance: PortraitModeState | null = null

interface PortraitModeState {
  options: Required<PortraitModeOptions>
  styleElement: HTMLStyleElement | null
  mediaQueryList: MediaQueryList | null
  isActive: boolean
  cleanup: () => void
}

/**
 * Main function to enable portrait mode enforcement
 * @param options Configuration options
 * @returns Result object with cleanup function and layout info
 */
export function enablePortraitMode(
  options: PortraitModeOptions = {}
): PortraitModeResult {
  // Validate options
  const validation = validateOptions(options)
  if (!validation.isValid) {
    throw new Error(`Invalid options: ${validation.errors.join(', ')}`)
  }

  // Show warnings if any
  validation.warnings.forEach(warning => {
    console.warn(`[force-portrait-mode]: ${warning}`)
  })

  // Clean up existing instance
  if (currentInstance) {
    currentInstance.cleanup()
  }

  // Apply theme if specified
  let processedOptions = options
  if (options.theme) {
    processedOptions = applyTheme(options, options.theme)
  }

  // Merge with defaults
  const resolvedOptions = mergeWithDefaults(processedOptions)

  // Calculate safe positions
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const layoutResult = calculateSafePositions(resolvedOptions, viewport)

  // Create CSS with calculated positions
  const css = generateCSS({
    ...resolvedOptions,
    iconPosition: layoutResult.iconPosition,
    textPosition: layoutResult.textPosition,
  })

  // Inject CSS
  const styleElement = injectCSS(css, 'force-portrait-mode-styles')

  // Set up media query listener for callbacks
  const mediaQuery = '(orientation: landscape)'
  const mediaQueryList = window.matchMedia(mediaQuery)
  
  const handleOrientationChange = (mql: MediaQueryList | MediaQueryListEvent): void => {
    const isLandscape = 'matches' in mql ? mql.matches : (mql as MediaQueryList).matches
    if (isLandscape) {
      resolvedOptions.onShow()
    } else {
      resolvedOptions.onHide()
    }
  }

  // Add listener for orientation changes
  if (mediaQueryList.addListener) {
    mediaQueryList.addListener(handleOrientationChange)
  } else {
    mediaQueryList.addEventListener('change', handleOrientationChange)
  }

  // Initial call
  handleOrientationChange(mediaQueryList)

  // Create cleanup function
  const cleanup = (): void => {
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement)
    }
    if (mediaQueryList) {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handleOrientationChange)
      } else {
        mediaQueryList.removeEventListener('change', handleOrientationChange)
      }
    }
    currentInstance = null
  }

  // Store current instance
  currentInstance = {
    options: resolvedOptions,
    styleElement,
    mediaQueryList,
    isActive: mediaQueryList.matches,
    cleanup,
  }

  return {
    options: resolvedOptions,
    layout: {
      adjusted: layoutResult.adjusted,
      hasOverlap: layoutResult.hasOverlap,
      iconPosition: layoutResult.iconPosition,
      textPosition: layoutResult.textPosition,
    },
    cleanup,
  }
}

/**
 * Disable portrait mode enforcement
 */
export function disablePortraitMode(): void {
  if (currentInstance) {
    currentInstance.cleanup()
  }
}

/**
 * Update portrait mode options dynamically
 * @param options New options to apply
 */
export function updatePortraitMode(
  options: Partial<PortraitModeOptions>
): void {
  if (!currentInstance) {
    throw new Error('Portrait mode is not currently enabled')
  }

  // Merge new options with current ones
  const updatedOptions = { ...currentInstance.options, ...options }
  
  // Re-enable with new options
  enablePortraitMode(updatedOptions)
}

/**
 * Generate CSS for portrait mode
 */
function generateCSS(options: Required<PortraitModeOptions>): string {
  const iconSize = createResponsiveSize(options.iconSize)
  const fontSize = createResponsiveSize(options.fontSize)
  
  // Generate animation keyframes if animation is enabled
  const isAnimationEnabled = typeof options.animation === 'object' && options.animation.enabled
  const animationOptions = typeof options.animation === 'object' ? options.animation : null
  
  const animationKeyframes = isAnimationEnabled && animationOptions
    ? generateAnimationKeyframes(
        animationOptions.type || 'rotate',
        animationOptions.rotationAngle
      )
    : ''

  const animationRule = isAnimationEnabled && animationOptions
    ? `animation: force-portrait-${animationOptions.type} ${animationOptions.duration} ${animationOptions.iterations};`
    : ''

  // Respect reduced motion preference
  const respectMotion = options.respectPrefers
    ? `
      @media (prefers-reduced-motion: reduce) {
        body::before {
          animation: none !important;
        }
      }
    `
    : ''

  return `
    ${animationKeyframes}
    
    @media screen and (orientation: landscape) {
      ${options.hideScrollbar ? 'html { overflow: hidden; }' : ''}
      ${options.preventScroll ? 'body { overflow: hidden; position: fixed; width: 100%; height: 100%; }' : ''}
      
      /* Hide main content */
      #root, #app, .app, main, [data-reactroot] {
        display: none !important;
      }
      
      ${options.overlay ? `
        /* Overlay background */
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: ${options.backgroundColor};
          ${options.blur ? 'backdrop-filter: blur(8px);' : ''}
          z-index: ${options.zIndex};
          pointer-events: none;
        }
      ` : ''}
      
      /* Phone icon */
      body::before {
        content: '${options.icon}';
        position: fixed;
        top: ${options.iconPosition.top};
        left: ${options.iconPosition.left || '50%'};
        transform: translate(-50%, -50%);
        font-size: ${iconSize};
        color: ${options.iconColor};
        z-index: ${options.zIndex + 1};
        ${animationRule}
        text-align: center;
        line-height: 1;
        pointer-events: none;
        user-select: none;
        max-width: ${options.iconPosition.maxWidth || '90vw'};
      }
      
      /* Message text */
      html::before {
        content: '${options.message}';
        position: fixed;
        top: ${options.textPosition.top};
        left: ${options.textPosition.left || '50%'};
        transform: translate(-50%, -50%);
        color: ${options.textColor};
        font-size: ${fontSize};
        font-family: ${options.fontFamily};
        font-weight: ${options.fontWeight};
        text-align: center;
        z-index: ${options.zIndex + 1};
        max-width: ${options.textHandling.maxWidth};
        line-height: 1.4;
        ${options.textHandling.multiLine ? '' : 'white-space: nowrap;'}
        ${options.textHandling.truncate ? 'overflow: hidden; text-overflow: ellipsis;' : ''}
        ${options.textHandling.breakWords ? '' : 'word-break: keep-all;'}
        pointer-events: none;
        user-select: none;
        aria-label: "${options.ariaLabel}";
      }
    }
    
    ${respectMotion}
    
    /* Responsive adjustments for small screens */
    @media screen and (orientation: landscape) and (max-height: 400px) {
      body::before {
        font-size: clamp(1.5rem, 6vw, 2.5rem);
      }
      html::before {
        font-size: clamp(0.8rem, 3vw, 1rem);
      }
    }
  `
}

/**
 * Inject CSS into the document
 */
function injectCSS(css: string, id: string): HTMLStyleElement {
  // Remove existing style element with same ID
  const existing = document.getElementById(id)
  if (existing) {
    existing.remove()
  }

  const styleElement = document.createElement('style')
  styleElement.id = id
  styleElement.textContent = css
  document.head.appendChild(styleElement)
  
  return styleElement
}

/**
 * Get current portrait mode state
 */
export function getPortraitModeState(): {
  isEnabled: boolean
  isActive: boolean
  options: Required<PortraitModeOptions> | null
} {
  return {
    isEnabled: currentInstance !== null,
    isActive: currentInstance?.isActive || false,
    options: currentInstance?.options || null,
  }
}

/**
 * Check if device is currently in landscape orientation
 */
export function isLandscapeOrientation(): boolean {
  return window.matchMedia('(orientation: landscape)').matches
}

// Export types for TypeScript users
export type {
  PortraitModeOptions,
  PortraitModeResult,
  ResponsiveSize,
  AnimationOptions,
  Position,
  CustomTheme,
  ThemePreset,
} from './types'

// Export utility functions
export {
  validateOptions,
  mergeWithDefaults,
  calculateSafePositions,
} from './utils'

export { applyTheme, getAvailableThemes } from './themes'