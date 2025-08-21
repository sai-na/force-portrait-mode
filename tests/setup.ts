/**
 * Jest setup file for force-portrait-mode tests
 */

// Mock matchMedia for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock window dimensions
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 375,
})

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 667,
})

// Mock console methods in tests to avoid noise
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}

// Clean up DOM after each test
afterEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  
  // Clear any timers
  jest.clearAllTimers()
  
  // Reset console mocks
  jest.clearAllMocks()
})

// Add custom matchers if needed
expect.extend({
  toHaveStyleRule(received: Element, property: string, value: string) {
    const styles = window.getComputedStyle(received)
    const actualValue = styles.getPropertyValue(property)
    
    const pass = actualValue === value
    
    if (pass) {
      return {
        message: () => `Expected element not to have style ${property}: ${value}`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected element to have style ${property}: ${value}, but got ${actualValue}`,
        pass: false,
      }
    }
  },
})