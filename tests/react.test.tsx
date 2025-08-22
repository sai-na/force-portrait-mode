/**
 * React integration tests for force-portrait-mode
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  usePortraitMode, 
  usePortraitModeSimple, 
  PortraitModeProvider,
  PortraitModeStatus
} from '../src/react';

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

// Test component using usePortraitMode hook
const TestComponent: React.FC = () => {
  const { isPortrait, toggle, enable, disable } = usePortraitMode();
  
  return (
    <div>
      <div data-testid="portrait-status">{isPortrait ? 'portrait' : 'landscape'}</div>
      <button onClick={toggle} data-testid="toggle-btn">Toggle</button>
      <button onClick={enable} data-testid="enable-btn">Enable</button>
      <button onClick={disable} data-testid="disable-btn">Disable</button>
    </div>
  );
};

// Test component using simple hook
const SimpleTestComponent: React.FC = () => {
  const isPortrait = usePortraitModeSimple();
  
  return (
    <div data-testid="simple-status">{isPortrait ? 'portrait' : 'landscape'}</div>
  );
};

describe('React Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('usePortraitMode hook', () => {
    it('should provide portrait mode controls', () => {
      render(<TestComponent />);
      
      expect(screen.getByTestId('toggle-btn')).toBeInTheDocument();
      expect(screen.getByTestId('enable-btn')).toBeInTheDocument();
      expect(screen.getByTestId('disable-btn')).toBeInTheDocument();
    });

    it('should detect portrait orientation', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 812, writable: true });
      
      render(<TestComponent />);
      expect(screen.getByTestId('portrait-status')).toHaveTextContent('portrait');
    });

    it('should detect landscape orientation', () => {
      Object.defineProperty(window, 'innerWidth', { value: 812, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 375, writable: true });
      
      render(<TestComponent />);
      expect(screen.getByTestId('portrait-status')).toHaveTextContent('landscape');
    });
  });

  describe('usePortraitModeSimple hook', () => {
    it('should return orientation status', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 812, writable: true });
      
      render(<SimpleTestComponent />);
      expect(screen.getByTestId('simple-status')).toHaveTextContent('portrait');
    });
  });

  describe('PortraitModeProvider', () => {
    it('should provide context to children', () => {
      const TestChild = () => {
        return <div data-testid="provider-child">Child component</div>;
      };

      render(
        <PortraitModeProvider>
          <TestChild />
        </PortraitModeProvider>
      );

      expect(screen.getByTestId('provider-child')).toBeInTheDocument();
    });
  });

  describe('PortraitModeStatus component', () => {
    it('should render status component', () => {
      render(<PortraitModeStatus />);
      // Component should render without errors
      expect(document.body).toBeInTheDocument();
    });
  });
});