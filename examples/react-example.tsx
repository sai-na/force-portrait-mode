/**
 * React Example for force-portrait-mode
 * Demonstrates how to use the React integration
 */

import React from 'react'
import {
  usePortraitMode,
  usePortraitModeSimple,
  useOrientation,
  PortraitModeProvider,
  PortraitModeToggle,
  PortraitModeStatus,
  OrientationConditional,
  withPortraitMode,
} from 'force-portrait-mode/react'

// Example 1: Basic Hook Usage
function BasicExample() {
  const portraitMode = usePortraitMode({
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    icon: '📱',
    message: 'Please rotate your phone to portrait mode',
    animation: { enabled: true, type: 'rotate', duration: '2s' }
  })

  return (
    <div>
      <h3>Basic Hook Example</h3>
      <p>Status: {portraitMode.isActive ? 'Active' : 'Inactive'}</p>
      <p>Orientation: {portraitMode.isLandscape ? 'Landscape' : 'Portrait'}</p>
      
      <button onClick={() => portraitMode.enable()}>Enable</button>
      <button onClick={() => portraitMode.disable()}>Disable</button>
      <button onClick={() => portraitMode.toggle()}>Toggle</button>
    </div>
  )
}

// Example 2: Simple Hook (Auto-enabled)
function SimpleExample() {
  const isActive = usePortraitModeSimple({
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    textColor: '#ffffff',
    icon: '🔄',
    message: 'Rotate to portrait mode!'
  })

  return (
    <div>
      <h3>Simple Hook Example</h3>
      <p>Portrait mode is: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}

// Example 3: Orientation Detection
function OrientationExample() {
  const { isLandscape, isPortrait, orientation } = useOrientation()

  return (
    <div>
      <h3>Orientation Detection</h3>
      <p>Current orientation: {orientation}</p>
      <p>Is landscape: {isLandscape ? 'Yes' : 'No'}</p>
      <p>Is portrait: {isPortrait ? 'Yes' : 'No'}</p>
    </div>
  )
}

// Example 4: Provider Pattern
function ProviderExample() {
  return (
    <PortraitModeProvider 
      options={{
        backgroundColor: 'rgba(0, 100, 200, 0.9)',
        textColor: '#ffffff',
        icon: '📲',
        message: 'Provider-managed portrait mode'
      }}
      enabled={true}
    >
      <div>
        <h3>Provider Pattern Example</h3>
        <PortraitModeStatus />
        <br />
        <PortraitModeToggle />
        
        <OrientationConditional showIn="landscape">
          <p style={{ color: 'orange' }}>
            This text only shows in landscape!
          </p>
        </OrientationConditional>
        
        <OrientationConditional showIn="portrait">
          <p style={{ color: 'green' }}>
            This text only shows in portrait!
          </p>
        </OrientationConditional>
      </div>
    </PortraitModeProvider>
  )
}

// Example 5: Custom Toggle Component
function CustomToggleExample() {
  return (
    <PortraitModeProvider>
      <div>
        <h3>Custom Toggle Example</h3>
        
        <PortraitModeToggle className="my-button">
          {({ isEnabled }) => (
            <span>
              {isEnabled ? '🛑 Stop' : '▶️ Start'} Portrait Mode
            </span>
          )}
        </PortraitModeToggle>
        
        <PortraitModeStatus>
          {({ isActive, isLandscape }) => (
            <div style={{ 
              padding: '10px',
              backgroundColor: isActive ? '#ffcc00' : '#f0f0f0',
              margin: '10px 0' 
            }}>
              Status: {isActive ? 'PROTECTED' : 'NORMAL'} |
              Device: {isLandscape ? 'ROTATED' : 'UPRIGHT'}
            </div>
          )}
        </PortraitModeStatus>
      </div>
    </PortraitModeProvider>
  )
}

// Example 6: HOC Pattern
const EnhancedComponent = withPortraitMode(
  function MyComponent() {
    return (
      <div>
        <h3>HOC Enhanced Component</h3>
        <p>This component is automatically wrapped with portrait mode!</p>
        <PortraitModeStatus />
      </div>
    )
  },
  {
    backgroundColor: 'rgba(128, 0, 128, 0.9)',
    icon: '🎯',
    message: 'HOC-managed portrait mode'
  }
)

// Example 7: Advanced Configuration
function AdvancedExample() {
  const portraitMode = usePortraitMode({
    // Positioning
    iconPosition: { top: '35%', left: '50%' },
    textPosition: { top: '65%', left: '50%' },
    
    // Styling
    backgroundColor: 'linear-gradient(45deg, #000, #333)',
    textColor: '#00ff88',
    iconColor: '#ffd700',
    
    // Animation
    animation: {
      enabled: true,
      type: 'pulse',
      duration: '1.5s',
      iterations: 'infinite'
    },
    
    // Layout
    layout: {
      preventOverlap: true,
      responsive: true,
      minSpacing: '3rem'
    },
    
    // Callbacks
    onShow: () => console.log('Portrait mode activated!'),
    onHide: () => console.log('Portrait mode deactivated!'),
  })

  return (
    <div>
      <h3>Advanced Configuration</h3>
      <p>Custom positioning, animations, and callbacks</p>
      
      <button onClick={() => portraitMode.enable({
        animation: { enabled: true, type: 'bounce', duration: '1s' }
      })}>
        Enable with Bounce
      </button>
      
      <button onClick={() => portraitMode.enable({
        animation: { enabled: true, type: 'shake', duration: '0.5s' }
      })}>
        Enable with Shake
      </button>
    </div>
  )
}

// Main App Component
export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Force Portrait Mode - React Examples</h1>
      
      <div style={{ display: 'grid', gap: '30px' }}>
        <BasicExample />
        <SimpleExample />
        <OrientationExample />
        <ProviderExample />
        <CustomToggleExample />
        <EnhancedComponent />
        <AdvancedExample />
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h3>📱 Testing Instructions</h3>
        <ol>
          <li>Open this page on your mobile device</li>
          <li>Try the different examples above</li>
          <li>Rotate your device to landscape to see the portrait mode overlay</li>
          <li>Test the toggle buttons to enable/disable portrait mode</li>
          <li>Notice how different examples have different styles and behaviors</li>
        </ol>
      </div>
    </div>
  )
}