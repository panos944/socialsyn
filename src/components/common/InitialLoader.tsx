'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InitialLoaderProps {
  /** When true, forces the loader to appear even if sessionStorage flag exists */
  force?: boolean
}

/**
 * Fullscreen initial loader that counts from 0 to 100 and fades out.
 * Uses project colors (Tailwind + CSS vars) and serif/sans typography.
 */
export default function InitialLoader({ force = false }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [lockScroll] = useState(true)

  const shouldShow = useMemo(() => {
    if (force) return true
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('initial-loader-shown')
  }, [force])

  useEffect(() => {
    // Remove SSR overlay immediately on mount so the client loader is visible
    const el = typeof document !== 'undefined' ? document.getElementById('ssr-initial-loader') : null
    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }

    // Lock body scroll while loader is visible
    if (visible && lockScroll && typeof document !== 'undefined') {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [visible, lockScroll])

  useEffect(() => {
    if (!shouldShow) {
      setVisible(false)
      return
    }

    // Show discrete branded steps rather than a continuous counter
    // Ensure we always traverse all steps, and extend timing slightly
    const steps = [0, 48, 72, 100]
    const stepDelay = 900 // ms per step (total ~3.2s)
    const timeouts: number[] = []

    steps.forEach((value, index) => {
      const id = window.setTimeout(() => {
        setProgress(value)
        if (value === 100) {
          // Notify the app that the loader sequence has completed
          try { window.dispatchEvent(new CustomEvent('initial-loader:done')) } catch {}
          // Hold at 100 a touch less for snappier feel
          window.setTimeout(() => setVisible(false), 1200)
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('initial-loader-shown', '1')
          }
        }
      }, index * stepDelay)
      timeouts.push(id)
    })

    return () => {
      timeouts.forEach((id) => clearTimeout(id))
    }
  }, [shouldShow])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-neutral-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Background subtle radial highlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Center content */}
          <div className="relative text-center px-6">
            <motion.div
              className="text-white/80 text-sm md:text-base tracking-[0.35em] uppercase mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Welcome to
            </motion.div>
            <motion.div
              className="serif-heading text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-dark))] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)] text-5xl md:text-7xl font-light mb-10"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
            >
              Socialsyn
            </motion.div>

            {/* Percentage sequence with slide-in from right and slide-out to left */}
            <AnimatePresence mode="wait">
              <motion.div
                key={progress}
                className="flex items-end justify-center gap-3"
                initial={{ x: 140, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -140, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="serif-heading text-white/95 text-6xl md:text-8xl leading-none">{progress}</span>
                <span className="text-white/75 mb-1 md:mb-2">%</span>
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


