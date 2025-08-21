/**
 * React hooks for force-portrait-mode
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import type { PortraitModeOptions, PortraitModeResult } from '../types'
import { enablePortraitMode, isLandscapeOrientation } from '../index'

/**
 * React hook for managing portrait mode
 * @param options Portrait mode configuration options
 * @param enabled Whether portrait mode should be active
 * @returns Object with current state and control functions
 */
export function usePortraitMode(
  options: PortraitModeOptions = {},
  enabled: boolean = true
) {
  const [isActive, setIsActive] = useState(false)
  const [isLandscape, setIsLandscape] = useState(() => isLandscapeOrientation())
  const instanceRef = useRef<PortraitModeResult | null>(null)

  // Update landscape state on orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(isLandscapeOrientation())
    }

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [])

  // Enable/disable portrait mode based on enabled prop
  useEffect(() => {
    if (enabled) {
      try {
        instanceRef.current = enablePortraitMode({
          ...options,
          onShow: () => {
            setIsActive(true)
            options.onShow?.()
          },
          onHide: () => {
            setIsActive(false)
            options.onHide?.()
          },
        })
      } catch (error) {
        console.error('[usePortraitMode] Failed to enable portrait mode:', error)
      }
    } else {
      if (instanceRef.current) {
        instanceRef.current.cleanup()
        instanceRef.current = null
        setIsActive(false)
      }
    }

    // Cleanup on unmount
    return () => {
      if (instanceRef.current) {
        instanceRef.current.cleanup()
        instanceRef.current = null
      }
    }
  }, [enabled, JSON.stringify(options)]) // Re-run when options change

  // Manual control functions
  const enable = useCallback((newOptions?: PortraitModeOptions) => {
    const finalOptions = newOptions ? { ...options, ...newOptions } : options
    try {
      if (instanceRef.current) {
        instanceRef.current.cleanup()
      }
      instanceRef.current = enablePortraitMode({
        ...finalOptions,
        onShow: () => {
          setIsActive(true)
          finalOptions.onShow?.()
        },
        onHide: () => {
          setIsActive(false)
          finalOptions.onHide?.()
        },
      })
    } catch (error) {
      console.error('[usePortraitMode] Failed to enable portrait mode:', error)
    }
  }, [options])

  const disable = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.cleanup()
      instanceRef.current = null
      setIsActive(false)
    }
  }, [])

  const toggle = useCallback((newOptions?: PortraitModeOptions) => {
    if (instanceRef.current) {
      disable()
    } else {
      enable(newOptions)
    }
  }, [enable, disable])

  return {
    // State
    isActive,
    isEnabled: !!instanceRef.current,
    isLandscape,
    
    // Configuration
    options: instanceRef.current?.options || null,
    layout: instanceRef.current?.layout || null,
    
    // Control functions
    enable,
    disable,
    toggle,
  }
}

/**
 * Hook for simple portrait mode activation
 * @param options Portrait mode configuration
 * @returns Current active state
 */
export function usePortraitModeSimple(options: PortraitModeOptions = {}): boolean {
  const { isActive } = usePortraitMode(options, true)
  return isActive
}

/**
 * Hook for detecting orientation changes
 * @returns Object with current orientation state
 */
export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(() => isLandscapeOrientation())
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => 
    isLandscapeOrientation() ? 'landscape' : 'portrait'
  )

  useEffect(() => {
    const handleOrientationChange = () => {
      const landscape = isLandscapeOrientation()
      setIsLandscape(landscape)
      setOrientation(landscape ? 'landscape' : 'portrait')
    }

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [])

  return {
    isLandscape,
    isPortrait: !isLandscape,
    orientation,
  }
}