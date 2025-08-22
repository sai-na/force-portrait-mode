/**
 * Vue 3 components for force-portrait-mode
 */

import { defineComponent, provide, inject, h, type PropType, type InjectionKey } from 'vue'
import { usePortraitMode, type VuePortraitModeResult } from './composables'
import type { PortraitModeOptions } from '../types'

// Injection key for the portrait mode context
const PORTRAIT_MODE_KEY: InjectionKey<VuePortraitModeResult> = Symbol('portrait-mode')

/**
 * Provider component that shares portrait mode state with children
 */
export const PortraitModeProvider = defineComponent({
  name: 'PortraitModeProvider',
  props: {
    options: {
      type: Object as PropType<PortraitModeOptions>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const portraitMode = usePortraitMode(props.options)
    
    provide(PORTRAIT_MODE_KEY, portraitMode)
    
    return () => slots.default?.()
  },
})

/**
 * Hook to use portrait mode context from provider
 */
export function usePortraitModeContext(): VuePortraitModeResult {
  const context = inject(PORTRAIT_MODE_KEY)
  if (!context) {
    throw new Error('usePortraitModeContext must be used within a PortraitModeProvider')
  }
  return context
}

/**
 * Toggle button component
 */
export const PortraitModeToggle = defineComponent({
  name: 'PortraitModeToggle',
  props: {
    enabledText: {
      type: String,
      default: 'Disable Portrait Mode',
    },
    disabledText: {
      type: String,
      default: 'Enable Portrait Mode',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { isEnabled, toggle } = usePortraitModeContext()
    
    return () => h('button', {
      class: props.class,
      onClick: toggle,
      type: 'button'
    }, isEnabled.value ? props.enabledText : props.disabledText)
  },
})

/**
 * Status display component
 */
export const PortraitModeStatus = defineComponent({
  name: 'PortraitModeStatus',
  props: {
    portraitText: {
      type: String,
      default: 'Portrait Mode',
    },
    landscapeText: {
      type: String,
      default: 'Landscape Mode',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { isPortrait } = usePortraitModeContext()
    
    return () => h('span', {
      class: props.class
    }, isPortrait.value ? props.portraitText : props.landscapeText)
  },
})

/**
 * Conditional rendering based on orientation
 */
export const OrientationConditional = defineComponent({
  name: 'OrientationConditional',
  props: {
    showInPortrait: {
      type: Boolean,
      default: true,
    },
    showInLandscape: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { isPortrait } = usePortraitModeContext()
    
    return () => {
      const shouldShow = isPortrait.value ? props.showInPortrait : props.showInLandscape
      return shouldShow ? slots.default?.() : null
    }
  },
})