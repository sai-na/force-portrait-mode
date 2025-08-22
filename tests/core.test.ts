/**
 * Core functionality tests for force-portrait-mode
 */

import { ForcePortraitMode, isPortraitMode } from '../src/index';
import { getTheme } from '../src/themes';

// Mock DOM methods
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

// Mock screen orientation
Object.defineProperty(screen, 'orientation', {
  writable: true,
  value: {
    angle: 0,
    type: 'portrait-primary'
  }
});

describe('ForcePortraitMode', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should create instance with default options', () => {
      const instance = new ForcePortraitMode();
      expect(instance).toBeInstanceOf(ForcePortraitMode);
    });

    it('should create instance with custom options', () => {
      const options = {
        enabled: false,
        theme: 'minimal' as const,
        showIcon: false
      };
      const instance = new ForcePortraitMode(options);
      expect(instance).toBeInstanceOf(ForcePortraitMode);
    });
  });

  describe('orientation detection', () => {
    it('should detect portrait orientation', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 812, writable: true });
      
      expect(isPortraitMode()).toBe(true);
    });

    it('should detect landscape orientation', () => {
      Object.defineProperty(window, 'innerWidth', { value: 812, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 375, writable: true });
      
      expect(isPortraitMode()).toBe(false);
    });
  });

  describe('theme application', () => {
    it('should get dark theme', () => {
      const theme = getTheme('dark');
      expect(theme).toBeTruthy();
      expect(theme?.backgroundColor).toBe('rgba(0, 0, 0, 0.95)');
    });

    it('should get minimal theme', () => {
      const theme = getTheme('minimal');
      expect(theme).toBeTruthy();
      expect(theme?.backgroundColor).toBe('rgba(128, 128, 128, 0.8)');
    });

    it('should get light theme', () => {
      const theme = getTheme('light');
      expect(theme).toBeTruthy();
      expect(theme?.backgroundColor).toBe('rgba(255, 255, 255, 0.95)');
    });

    it('should handle unknown theme', () => {
      const theme = getTheme('unknown');
      expect(theme).toBeUndefined();
    });
  });

  describe('DOM manipulation', () => {
    it('should create overlay element', () => {
      const instance = new ForcePortraitMode();
      instance.enable();
      
      // Check if style element was created
      const styleElement = document.getElementById('force-portrait-mode-styles');
      expect(styleElement).toBeTruthy();
      expect(styleElement?.tagName).toBe('STYLE');
    });

    it('should remove overlay when disabled', () => {
      const instance = new ForcePortraitMode();
      instance.enable();
      
      // Check style element exists
      let styleElement = document.getElementById('force-portrait-mode-styles');
      expect(styleElement).toBeTruthy();
      
      instance.disable();
      
      // Check style element is removed
      styleElement = document.getElementById('force-portrait-mode-styles');
      expect(styleElement).toBeFalsy();
    });
  });
});