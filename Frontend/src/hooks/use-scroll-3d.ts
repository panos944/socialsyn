'use client'

import { useState, useEffect, RefObject } from 'react'
import { useScroll, useTransform, useMotionValue } from 'framer-motion'

/**
 * Custom hook that manages scroll-based 3D scene progression
 * Calculates scroll progress and determines the current stage of the 3D journey
 */
export function useScroll3D(containerRef: RefObject<HTMLElement | null>) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  // Framer Motion's useScroll hook for scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })
  
  // Motion value for smooth scroll progress
  const scrollProgress = useMotionValue(0)
  
  // Check if device is mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Subscribe to scroll progress changes
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      scrollProgress.set(latest)
      
      // Determine current stage based on scroll progress
      // Stage 0: 0-33% (Social Media)
      // Stage 1: 33-66% (Analytics) 
      // Stage 2: 66-100% (Growth)
      if (latest < 0.33) {
        setCurrentStage(0)
      } else if (latest < 0.66) {
        setCurrentStage(1)
      } else {
        setCurrentStage(2)
      }
    })
  }, [scrollYProgress, scrollProgress])
  
  // Transform scroll progress for different animation curves
  const easeProgress = useTransform(scrollProgress, [0, 1], [0, 1], {
    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
  })
  
  const bounceProgress = useTransform(scrollProgress, [0, 1], [0, 1], {
    ease: [0.68, -0.55, 0.265, 1.55] // Bounce easing
  })
  
  return {
    scrollProgress: scrollProgress.get(),
    scrollYProgress,
    easeProgress,
    bounceProgress,
    currentStage,
    isMobile
  }
}