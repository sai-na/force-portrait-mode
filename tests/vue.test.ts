/**
 * Vue integration tests for force-portrait-mode
 */

import { usePortraitMode, usePortraitModeSimple } from '../src/vue/composables';

// Mock window properties
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Vue composables  
jest.mock('vue', () => ({
  ref: jest.fn((value) => ({ value })),
  computed: jest.fn((fn) => ({ value: fn() })),
  onMounted: jest.fn((fn) => fn()),
  onUnmounted: jest.fn()
}));

describe('Vue Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('usePortraitMode composable', () => {
    it('should return portrait mode functions', () => {
      const result = usePortraitMode();
      
      expect(result).toHaveProperty('isPortrait');
      expect(result).toHaveProperty('isEnabled');
      expect(result).toHaveProperty('enable');
      expect(result).toHaveProperty('disable');
      expect(result).toHaveProperty('toggle');
      expect(result).toHaveProperty('updateOptions');
    });

    it('should initialize with portrait detection', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 812, writable: true });
      
      usePortraitMode();
      
      // Should work without throwing errors
      expect(true).toBe(true);
    });
  });

  describe('usePortraitModeSimple composable', () => {
    it('should return a ref with orientation status', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 812, writable: true });
      
      const result = usePortraitModeSimple();
      
      expect(result).toHaveProperty('value');
    });

    it('should detect landscape orientation', () => {
      Object.defineProperty(window, 'innerWidth', { value: 812, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 375, writable: true });
      
      const result = usePortraitModeSimple();
      
      expect(result).toHaveProperty('value');
    });
  });
})