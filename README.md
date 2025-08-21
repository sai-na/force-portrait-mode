# force-portrait-mode

[![npm version](https://badge.fury.io/js/force-portrait-mode.svg)](https://www.npmjs.com/package/force-portrait-mode)
[![Build Status](https://github.com/username/force-portrait-mode/workflows/CI/badge.svg)](https://github.com/username/force-portrait-mode/actions)
[![Coverage Status](https://codecov.io/gh/username/force-portrait-mode/branch/main/graph/badge.svg)](https://codecov.io/gh/username/force-portrait-mode)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> A lightweight, customizable library that enforces portrait orientation on mobile devices with smooth user experience and professional animations.

## ✨ Features

- 🎨 **Fully Customizable** - Colors, icons, messages, animations, and positioning
- 📱 **Mobile-First** - Optimized for all mobile browsers and devices
- ⚡ **Lightweight** - < 3KB gzipped, zero dependencies  
- 🔧 **Framework Agnostic** - Works with React, Vue, Angular, vanilla JS
- 🎯 **TypeScript Ready** - Full type definitions included
- ♿ **Accessible** - Respects user motion preferences and ARIA standards
- 🌐 **CSS-Only Option** - Pure CSS solution available (no JavaScript required)
- 📊 **Smart Positioning** - Automatic overlap prevention and responsive sizing
- 🎭 **Built-in Themes** - Dark, light, neon, and minimal themes included

## 🚀 Quick Start

### Installation

```bash
npm install force-portrait-mode
```

```bash
yarn add force-portrait-mode
```

### Basic Usage

```javascript
import { enablePortraitMode } from 'force-portrait-mode'

// Enable with default settings (40% icon, 70% text positioning)
enablePortraitMode()

// Or with custom options
enablePortraitMode({
  backgroundColor: '#1a1a1a',
  icon: '📲',
  message: 'Please rotate your device to portrait mode',
  theme: 'dark'
})
```

### CSS-Only Usage

```html
<!-- Include the CSS file -->
<link rel="stylesheet" href="node_modules/force-portrait-mode/styles/force-portrait.css">

<!-- Or use a CDN -->
<link rel="stylesheet" href="https://unpkg.com/force-portrait-mode@1.0.0/styles/force-portrait.css">
```

## 📖 Usage Examples

### Vanilla JavaScript

```javascript
import { enablePortraitMode, disablePortraitMode } from 'force-portrait-mode'

// Basic usage
const cleanup = enablePortraitMode({
  backgroundColor: '#000000',
  textColor: '#ffffff',
  icon: '📱',
  message: 'Rotate your phone for better experience'
})

// Clean up when needed
// cleanup()
```

### React Integration

```jsx
import { usePortraitMode } from 'force-portrait-mode/react'

function App() {
  const { isActive } = usePortraitMode({
    backgroundColor: '#2d3748',
    textColor: '#e2e8f0',
    icon: '📲',
    theme: 'dark'
  })
  
  return (
    <div className="app">
      <h1>My Mobile App</h1>
      <p>Content optimized for portrait mode</p>
    </div>
  )
}
```

### Vue 3 Integration

```vue
<script setup>
import { usePortraitMode } from 'force-portrait-mode/vue'

const { isActive } = usePortraitMode({
  backgroundColor: '#1a1a1a',
  icon: '🎮',
  message: 'Game works best in portrait mode',
  animation: {
    type: 'bounce',
    duration: '1.5s'
  }
})
</script>

<template>
  <div class="game-app">
    <h1>Mobile Game</h1>
    <!-- Your game content -->
  </div>
</template>
```

### TypeScript

```typescript
import { 
  enablePortraitMode, 
  PortraitModeOptions,
  ThemePreset 
} from 'force-portrait-mode'

const config: PortraitModeOptions = {
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
  icon: '📱',
  iconSize: '4rem',
  fontSize: '1.2rem',
  iconPosition: { top: '35%' },
  textPosition: { top: '65%' },
  animation: {
    enabled: true,
    type: 'rotate',
    duration: '2s'
  },
  onShow: () => console.log('Portrait mode activated'),
  onHide: () => console.log('Portrait mode deactivated')
}

const result = enablePortraitMode(config)
console.log('Layout adjusted:', result.layout.adjusted)
```

## 🎨 Customization Options

### Basic Configuration

```javascript
enablePortraitMode({
  // Visual customization
  backgroundColor: '#000000',      // Background color
  textColor: '#ffffff',           // Text color  
  icon: '📱',                     // Icon/emoji to display
  iconColor: '#4CAF50',          // Icon color (optional)
  message: 'Custom message',      // Text message
  
  // Typography
  fontFamily: 'Arial, sans-serif',
  fontSize: '1.2rem',             // Responsive: { min: '0.9rem', max: '1.2rem', viewport: '4vw' }
  fontWeight: '600',
  iconSize: '4rem',               // Responsive sizing supported
  
  // Positioning (default: icon 40%, text 70%)
  iconPosition: { top: '40%', left: '50%' },
  textPosition: { top: '70%', left: '50%' },
  
  // Animation
  animation: {
    enabled: true,
    type: 'rotate',               // 'rotate', 'bounce', 'pulse', 'shake'
    duration: '2s',
    rotationAngle: 15
  }
})
```

### Advanced Configuration

```javascript
enablePortraitMode({
  // Layout control
  layout: {
    preventOverlap: true,         // Automatic overlap prevention
    responsive: true,             // Responsive sizing
    minSpacing: '2rem',          // Minimum space between elements
    fallbackLayout: 'vertical-stack'
  },
  
  // Text handling
  textHandling: {
    maxWidth: '90vw',            // Prevent text overflow
    truncate: true,              // Add ellipsis for long text
    multiLine: false,            // Force single line
    breakWords: false            // Prevent word breaking
  },
  
  // Behavior
  zIndex: 9999,                  // CSS z-index
  overlay: true,                 // Show background overlay
  blur: false,                   // Backdrop blur effect
  hideScrollbar: true,           // Hide scrollbars in landscape
  preventScroll: true,           // Prevent scrolling
  
  // Accessibility
  ariaLabel: 'Rotate device',    // Screen reader label
  respectPrefers: true,          // Respect prefers-reduced-motion
  
  // Callbacks
  onShow: () => console.log('Landscape detected'),
  onHide: () => console.log('Portrait restored')
})
```

## 🎭 Built-in Themes

### Using Preset Themes

```javascript
// Dark theme (default)
enablePortraitMode({ theme: 'dark' })

// Light theme
enablePortraitMode({ theme: 'light' })

// Neon theme
enablePortraitMode({ theme: 'neon' })

// Minimal theme
enablePortraitMode({ theme: 'minimal' })
```

### Custom Themes

```javascript
// Custom theme object
enablePortraitMode({
  theme: {
    backgroundColor: '#ff6b6b',
    textColor: 'white',
    icon: '⚡',
    iconColor: '#ffd93d',
    animation: 'bounce'
  }
})
```

### CSS-Only Themes

```css
/* Apply theme class to body */
body.force-portrait-theme-neon {
  --portrait-bg-color: rgba(0, 0, 0, 0.9);
  --portrait-text-color: #00ff88;
  --portrait-icon-color: #ff0080;
  --portrait-icon: '📲';
}
```

## 🔧 API Reference

### Functions

#### `enablePortraitMode(options?)`

Enables portrait mode enforcement with optional configuration.

**Parameters:**
- `options` (optional): `PortraitModeOptions` - Configuration object

**Returns:**
- `PortraitModeResult` - Object with cleanup function and layout info

#### `disablePortraitMode()`

Disables portrait mode enforcement and cleans up resources.

#### `updatePortraitMode(options)`

Updates current portrait mode configuration dynamically.

#### `getPortraitModeState()`

Returns current state information.

### CSS-Only Usage

Include the CSS file and optionally customize with CSS custom properties:

```css
:root {
  --portrait-bg-color: rgba(0, 0, 0, 0.9);
  --portrait-text-color: #ffffff;
  --portrait-icon: '📱';
  --portrait-message: 'Please rotate your device';
  --portrait-icon-top: 40%;      /* Icon position */
  --portrait-text-top: 70%;      /* Text position */
}
```

## 🌍 Browser Compatibility

- ✅ **iOS Safari** - Full support
- ✅ **Android Chrome** - Full support  
- ✅ **Android Firefox** - Full support
- ✅ **WebView** containers (Telegram WebApp, etc.)
- ✅ **Progressive Web Apps** (PWA)
- ✅ **All modern mobile browsers**

## 📱 Framework Integration

### React Hook

```bash
npm install force-portrait-mode
```

```jsx
import { usePortraitMode } from 'force-portrait-mode/react'

function MyComponent() {
  const { isActive, updateOptions } = usePortraitMode({
    theme: 'dark',
    icon: '📱'
  })
  
  return <div>My App</div>
}
```

### Vue 3 Composable

```bash
npm install force-portrait-mode
```

```vue
<script setup>
import { usePortraitMode } from 'force-portrait-mode/vue'

const { isActive } = usePortraitMode({
  backgroundColor: '#1a1a1a',
  theme: 'neon'
})
</script>
```

## 🎯 Default Positioning

The library uses optimized default positioning for mobile devices:

- **Icon**: 40% from top (optimal visibility)
- **Text**: 70% from top (comfortable reading position)
- **Automatic adjustment** for small screens to prevent overlap

## ⚡ Performance

- **Lightweight**: < 3KB gzipped
- **Zero dependencies**: No external libraries required
- **CSS-only option**: Pure CSS solution available
- **GPU accelerated**: Smooth animations using transform
- **Memory efficient**: Automatic cleanup and resource management

## 🔒 Security

- No external dependencies
- No data collection or analytics
- No network requests
- CSP (Content Security Policy) friendly
- Open source and auditable

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/username/force-portrait-mode.git
cd force-portrait-mode
npm install
npm run dev
```

### Running Tests

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## 📄 License

MIT © [Your Name](LICENSE)

---

## 🔗 Links

- [npm package](https://www.npmjs.com/package/force-portrait-mode)
- [GitHub repository](https://github.com/username/force-portrait-mode)
- [API Documentation](docs/API.md)
- [Examples](examples/)
- [Changelog](CHANGELOG.md)

---

<p align="center">
  Made with ❤️ for mobile-first web development
</p>