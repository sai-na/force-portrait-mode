/**
 * React components for force-portrait-mode
 */

import React, { createContext, useContext, ReactNode } from 'react'
import type { PortraitModeOptions } from '../types'
import { usePortraitMode } from './hooks'

/**
 * Context for sharing portrait mode state across components
 */
interface PortraitModeContextValue {
  isActive: boolean
  isEnabled: boolean
  isLandscape: boolean
  enable: (options?: PortraitModeOptions) => void
  disable: () => void
  toggle: (options?: PortraitModeOptions) => void
}

const PortraitModeContext = createContext<PortraitModeContextValue | null>(null)

/**
 * Props for PortraitModeProvider
 */
interface PortraitModeProviderProps {
  children: ReactNode
  options?: PortraitModeOptions
  enabled?: boolean
}

/**
 * Provider component that manages portrait mode for the entire app
 * @param props Provider configuration
 */
export function PortraitModeProvider({ 
  children, 
  options = {},
  enabled = true 
}: PortraitModeProviderProps) {
  const portraitMode = usePortraitMode(options, enabled)

  return (
    <PortraitModeContext.Provider value={portraitMode}>
      {children}
    </PortraitModeContext.Provider>
  )
}

/**
 * Hook to access portrait mode context
 * @returns Portrait mode context value
 */
export function usePortraitModeContext(): PortraitModeContextValue {
  const context = useContext(PortraitModeContext)
  if (!context) {
    throw new Error('usePortraitModeContext must be used within a PortraitModeProvider')
  }
  return context
}

/**
 * Props for PortraitModeToggle component
 */
interface PortraitModeToggleProps {
  children?: ReactNode
  className?: string
  enabledText?: string
  disabledText?: string
  onClick?: (isEnabled: boolean) => void
}

/**
 * Toggle button component for portrait mode
 * @param props Toggle button configuration
 */
export function PortraitModeToggle({
  children,
  className = '',
  enabledText = 'Disable Portrait Mode',
  disabledText = 'Enable Portrait Mode',
  onClick,
}: PortraitModeToggleProps) {
  const { isEnabled, toggle } = usePortraitModeContext()

  const handleClick = () => {
    toggle()
    onClick?.(isEnabled)
  }

  if (children) {
    return (
      <button className={className} onClick={handleClick}>
        {children}
      </button>
    )
  }

  return (
    <button className={className} onClick={handleClick}>
      {isEnabled ? enabledText : disabledText}
    </button>
  )
}

/**
 * Props for PortraitModeStatus component
 */
interface PortraitModeStatusProps {
  children?: (state: PortraitModeContextValue) => ReactNode
  className?: string
  showOrientation?: boolean
  showActiveState?: boolean
}

/**
 * Status display component for portrait mode
 * @param props Status display configuration
 */
export function PortraitModeStatus({
  children,
  className = '',
  showOrientation = true,
  showActiveState = true,
}: PortraitModeStatusProps) {
  const portraitModeState = usePortraitModeContext()
  const { isActive, isLandscape } = portraitModeState

  if (children) {
    return <div className={className}>{children(portraitModeState)}</div>
  }

  return (
    <div className={className}>
      {showOrientation && (
        <span>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</span>
      )}
      {showActiveState && showOrientation && ' • '}
      {showActiveState && (
        <span>Portrait Mode: {isActive ? 'Active' : 'Inactive'}</span>
      )}
    </div>
  )
}

/**
 * Props for conditional rendering based on orientation
 */
interface OrientationConditionalProps {
  children: ReactNode
  showIn: 'portrait' | 'landscape' | 'both'
  fallback?: ReactNode
}

/**
 * Component that conditionally renders children based on orientation
 * @param props Conditional rendering configuration
 */
export function OrientationConditional({
  children,
  showIn,
  fallback = null,
}: OrientationConditionalProps) {
  const { isLandscape } = usePortraitModeContext()

  const shouldShow = 
    showIn === 'both' ||
    (showIn === 'landscape' && isLandscape) ||
    (showIn === 'portrait' && !isLandscape)

  return <>{shouldShow ? children : fallback}</>
}

/**
 * Higher-order component that wraps a component with portrait mode functionality
 * @param WrappedComponent Component to wrap
 * @param options Default portrait mode options
 * @returns Enhanced component with portrait mode
 */
export function withPortraitMode<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: PortraitModeOptions = {}
) {
  const WithPortraitModeComponent = (props: P) => {
    return (
      <PortraitModeProvider options={options}>
        <WrappedComponent {...props} />
      </PortraitModeProvider>
    )
  }

  WithPortraitModeComponent.displayName = 
    `withPortraitMode(${WrappedComponent.displayName || WrappedComponent.name})`

  return WithPortraitModeComponent
}