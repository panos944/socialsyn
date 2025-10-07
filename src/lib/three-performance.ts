/**
 * Performance management utilities for Three.js scenes
 * Handles device capability detection and performance optimization
 */

export interface PerformanceConfig {
  maxFPS: number
  particleCount: number
  shadowQuality: 'high' | 'medium' | 'low' | 'disabled'
  antialiasing: boolean
  devicePixelRatio: number
  enablePostProcessing: boolean
  lodDistance: number
}

export interface DeviceCapabilities {
  isHighEnd: boolean
  isMidRange: boolean
  isLowEnd: boolean
  isMobile: boolean
  hasWebGL2: boolean
  memoryGB: number
  gpuTier: 'high' | 'medium' | 'low' | 'unknown'
}

/**
 * Detect device capabilities for performance optimization
 */
export async function detectDeviceCapabilities(): Promise<DeviceCapabilities> {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  
  if (!gl) {
    return {
      isHighEnd: false,
      isMidRange: false,
      isLowEnd: true,
      isMobile: true,
      hasWebGL2: false,
      memoryGB: 0,
      gpuTier: 'unknown'
    }
  }

  // Check WebGL 2 support
  const hasWebGL2 = !!canvas.getContext('webgl2')
  
  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  
  // Check memory (if available)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (navigator as any).deviceMemory || 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsMemory = (performance as any).memory?.totalJSHeapSize || 0
  const estimatedMemoryGB = memory || (jsMemory > 0 ? jsMemory / (1024 ** 3) : 4)
  
  // Get GPU info
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : ''
  
  // Determine GPU tier based on renderer string
  let gpuTier: DeviceCapabilities['gpuTier'] = 'unknown'
  if (renderer) {
    const rendererLower = renderer.toLowerCase()
    if (rendererLower.includes('rtx') || 
        rendererLower.includes('gtx 1060') || 
        rendererLower.includes('rx 580') ||
        rendererLower.includes('apple m') ||
        rendererLower.includes('adreno 6') ||
        rendererLower.includes('mali-g7')) {
      gpuTier = 'high'
    } else if (rendererLower.includes('gtx') || 
               rendererLower.includes('rx ') ||
               rendererLower.includes('adreno 5') ||
               rendererLower.includes('mali-g5')) {
      gpuTier = 'medium'
    } else if (rendererLower.includes('intel') || 
               rendererLower.includes('adreno 3') ||
               rendererLower.includes('mali-4')) {
      gpuTier = 'low'
    }
  }
  
  // Classify device performance
  const isHighEnd = !isMobile && cores >= 8 && estimatedMemoryGB >= 8 && gpuTier === 'high'
  const isMidRange = (!isMobile && cores >= 4 && estimatedMemoryGB >= 4) || 
                    (isMobile && gpuTier === 'high' && estimatedMemoryGB >= 6)
  const isLowEnd = !isHighEnd && !isMidRange
  
  return {
    isHighEnd,
    isMidRange,
    isLowEnd,
    isMobile,
    hasWebGL2,
    memoryGB: estimatedMemoryGB,
    gpuTier
  }
}

/**
 * Get optimal performance configuration based on device capabilities
 */
export function getPerformanceConfig(capabilities: DeviceCapabilities): PerformanceConfig {
  if (capabilities.isHighEnd) {
    return {
      maxFPS: 60,
      particleCount: 500,
      shadowQuality: 'high',
      antialiasing: true,
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      enablePostProcessing: true,
      lodDistance: 100
    }
  } else if (capabilities.isMidRange) {
    return {
      maxFPS: 60,
      particleCount: 300,
      shadowQuality: 'medium',
      antialiasing: true,
      devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
      enablePostProcessing: false,
      lodDistance: 50
    }
  } else {
    return {
      maxFPS: 30,
      particleCount: 100,
      shadowQuality: 'disabled',
      antialiasing: false,
      devicePixelRatio: 1,
      enablePostProcessing: false,
      lodDistance: 25
    }
  }
}

/**
 * Frame rate limiter for consistent performance
 */
export class FrameRateLimiter {
  private lastTime = 0
  private targetInterval: number

  constructor(private targetFPS: number = 60) {
    this.targetInterval = 1000 / targetFPS
  }

  shouldRender(currentTime: number): boolean {
    if (currentTime - this.lastTime >= this.targetInterval) {
      this.lastTime = currentTime
      return true
    }
    return false
  }

  updateTargetFPS(fps: number) {
    this.targetFPS = fps
    this.targetInterval = 1000 / fps
  }
}

/**
 * Performance monitor to track and adjust quality in real-time
 */
export class PerformanceMonitor {
  private frameTimes: number[] = []
  private lastFrameTime = performance.now()
  private readonly maxSamples = 60

  update(): { fps: number; shouldReduceQuality: boolean } {
    const now = performance.now()
    const frameTime = now - this.lastFrameTime
    this.lastFrameTime = now

    this.frameTimes.push(frameTime)
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift()
    }

    const averageFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
    const fps = 1000 / averageFrameTime
    
    // Suggest quality reduction if FPS is consistently below 30
    const shouldReduceQuality = fps < 30 && this.frameTimes.length >= this.maxSamples

    return { fps, shouldReduceQuality }
  }

  reset() {
    this.frameTimes = []
    this.lastFrameTime = performance.now()
  }
}

/**
 * Quality manager that can dynamically adjust scene quality
 */
export class QualityManager {
  private currentConfig: PerformanceConfig
  private monitor = new PerformanceMonitor()
  private qualityLevel = 1 // 0-1, where 1 is highest quality

  constructor(initialConfig: PerformanceConfig) {
    this.currentConfig = { ...initialConfig }
  }

  update(): PerformanceConfig {
    const { fps, shouldReduceQuality } = this.monitor.update()

    if (shouldReduceQuality && this.qualityLevel > 0.3) {
      this.qualityLevel *= 0.9
      this.updateConfig()
    } else if (fps > 50 && this.qualityLevel < 1) {
      this.qualityLevel = Math.min(1, this.qualityLevel * 1.05)
      this.updateConfig()
    }

    return this.currentConfig
  }

  private updateConfig() {
    // Adjust particle count based on quality level
    this.currentConfig.particleCount = Math.floor(
      this.currentConfig.particleCount * this.qualityLevel
    )
    
    // Adjust device pixel ratio
    this.currentConfig.devicePixelRatio = Math.max(0.5, 
      Math.min(window.devicePixelRatio, 2) * this.qualityLevel
    )
    
    // Disable features at low quality
    if (this.qualityLevel < 0.7) {
      this.currentConfig.shadowQuality = 'disabled'
      this.currentConfig.enablePostProcessing = false
    }
    
    if (this.qualityLevel < 0.5) {
      this.currentConfig.antialiasing = false
      this.currentConfig.maxFPS = 30
    }
  }

  getCurrentQuality(): number {
    return this.qualityLevel
  }

  getConfig(): PerformanceConfig {
    return this.currentConfig
  }
}

/**
 * Utility to check if device should render 3D scene
 */
export async function shouldRender3DScene(): Promise<boolean> {
  try {
    const capabilities = await detectDeviceCapabilities()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isBatteryLow = (navigator as any).getBattery?.()?.then((battery: any) => 
      battery.level < 0.2 && !battery.charging
    ) || false
    
    return !prefersReducedMotion && 
           !await isBatteryLow && 
           !capabilities.isLowEnd &&
           capabilities.gpuTier !== 'unknown'
  } catch {
    return false
  }
}