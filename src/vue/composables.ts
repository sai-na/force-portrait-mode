/**
 * Vue 3 composables for force-portrait-mode
 */

import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue'
import { ForcePortraitMode, isPortraitMode, type PortraitModeOptions } from '../index'

/**
 * Vue-specific result interface for portrait mode composable
 */
export interface VuePortraitModeResult {
  isPortrait: Ref<boolean>
  isEnabled: Ref<boolean>
  enable: () => void
  disable: () => void
  toggle: () => void
  updateOptions: (options: Partial<PortraitModeOptions>) => void
}

/**
 * Main Vue composable for portrait mode functionality
 */
export function usePortraitMode(options?: PortraitModeOptions): VuePortraitModeResult {
  const instance = ref<ForcePortraitMode | null>(null)
  const isEnabled = ref(false)
  const isPortrait = ref(isPortraitMode())

  const updateOrientation = () => {
    isPortrait.value = isPortraitMode()
  }

  const enable = () => {
    if (instance.value) {
      instance.value.enable()
      isEnabled.value = true
    }
  }

  const disable = () => {
    if (instance.value) {
      instance.value.disable()
      isEnabled.value = false
    }
  }

  const toggle = () => {
    if (isEnabled.value) {
      disable()
    } else {
      enable()
    }
  }

  const updateOptions = (newOptions: Partial<PortraitModeOptions>) => {
    if (instance.value) {
      instance.value.updateOptions(newOptions)
    }
  }

  onMounted(() => {
    instance.value = new ForcePortraitMode(options)
    
    // Listen for orientation changes
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
    
    // Enable by default 
    enable()
  })

  onUnmounted(() => {
    if (instance.value) {
      instance.value.destroy()
    }
    
    window.removeEventListener('resize', updateOrientation)
    window.removeEventListener('orientationchange', updateOrientation)
  })

  return {
    isPortrait: computed(() => isPortrait.value),
    isEnabled: computed(() => isEnabled.value),
    enable,
    disable,
    toggle,
    updateOptions,
  }
}

/**
 * Simplified composable that only tracks orientation
 */
export function usePortraitModeSimple(): Ref<boolean> {
  const isPortrait = ref(isPortraitMode())

  const updateOrientation = () => {
    isPortrait.value = isPortraitMode()
  }

  onMounted(() => {
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateOrientation)
    window.removeEventListener('orientationchange', updateOrientation)
  })

  return isPortrait
}

/**
 * Composable for detailed orientation information
 */
export function useOrientation() {
  const orientation = ref({
    isPortrait: isPortraitMode(),
    isLandscape: !isPortraitMode(),
    angle: screen.orientation?.angle || 0,
    type: screen.orientation?.type || 'portrait-primary',
  })

  const updateOrientation = () => {
    const isPortrait = isPortraitMode()
    orientation.value = {
      isPortrait,
      isLandscape: !isPortrait,
      angle: screen.orientation?.angle || 0,
      type: screen.orientation?.type || 'portrait-primary',
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
    
    if (screen.orientation) {
      screen.orientation.addEventListener('change', updateOrientation)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateOrientation)
    window.removeEventListener('orientationchange', updateOrientation)
    
    if (screen.orientation) {
      screen.orientation.removeEventListener('change', updateOrientation)
    }
  })

  return {
    orientation: computed(() => orientation.value),
    isPortrait: computed(() => orientation.value.isPortrait),
    isLandscape: computed(() => orientation.value.isLandscape),
    angle: computed(() => orientation.value.angle),
    type: computed(() => orientation.value.type),
  }
}