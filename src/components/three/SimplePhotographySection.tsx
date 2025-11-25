'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type PhotoItem = {
  url?: string
  client?: string
  title?: string
  empty?: boolean
}

// Portfolio of best client photos with metadata - using local images where possible
const photos: PhotoItem[] = [
  { url: '/images/LEDOM/IMG_9784.jpg', client: 'LEDOM SS24 Campaign', title: 'Production & Photography' },
  { url: '/images/IMG_6977_low.jpg', client: 'COSTARELLOS', title: 'SS23 Campaign BTS' },
  { url: '/images/IMG_7390.jpg', client: 'JCOU', title: 'Social Media Editorial Photography' },
  { url: '/images/LUISANT/IMG_8065.JPG', client: 'LUISANT SS23 Campaign', title: 'Production & Photography'},
  { url: '/images/ITALOS/IMG_7733.JPG', client: 'ITALOS Restaurant Lifestyle', title: 'Photography' },
  { url: '/images/IMG_5866 2.JPG', client: 'JCOU', title: 'Product Photography for Social Media' },
  { url: '/images/DOMAINE HATZIMICHALIS/IMG_2294 3.JPG', client: 'DOMAINE HATZIMICHALIS', title: 'Lifestyle Editorial' },
  { url: '/images/ZALO/IMG_1993 2.JPG', client: 'ZALO SS24 Campaign', title: 'Production & Photography' },
  { url: '/images/PHOTIS/IMG_0796.JPG', client: 'PHOTIS', title: 'Brand & Store Photography' },
  { url: '/images/IMG_8669.JPG', client: 'COSTARELLOS BRIDAL', title: 'BTS Photography' },
  { url: '/images/LUISANT-15-11-22-28986.JPG', client: 'LUISANT', title: 'Holiday Studio Shoot' },
  { url: '/images/IMG_5831 2.JPG', client: 'NULICIOUS', title: 'Product & Food Photography' }
]

export function SimplePhotographySection() {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const queueTransition = useCallback((targetIndex: number) => {
    if (isTransitioning || targetIndex === displayIndex) return
    setIsTransitioning(true)
    setDisplayIndex(targetIndex)
    window.setTimeout(() => setIsTransitioning(false), 420)
  }, [isTransitioning, displayIndex])

  const nextPhoto = useCallback(() => {
    const next = (displayIndex + 1) % photos.length
    queueTransition(next)
  }, [displayIndex, queueTransition])

  const prevPhoto = useCallback(() => {
    const prev = (displayIndex - 1 + photos.length) % photos.length
    queueTransition(prev)
  }, [displayIndex, queueTransition])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if this section is in view
      const section = sectionRef.current
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!isInView) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevPhoto()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPhoto, prevPhoto])

  const currentPhoto = photos[displayIndex]
  const isCurrentEmpty = currentPhoto?.empty
  const currentClient = currentPhoto.client ?? 'Upcoming project'
  const currentTitle = currentPhoto.title ?? 'Stay tuned for our next story'

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="photography-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20"
      tabIndex={-1}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Photography</h2>
          <p className="text-gray-400 text-lg">Capturing moments that define brands.</p>
        </div>

        {/* Main Photo Display */}
        <div className="max-w-lg mx-auto mb-12 relative group">
          {/* Navigation Arrows - Desktop (outside container) */}
          <button
            onClick={prevPhoto}
            className="hidden lg:block absolute left-[-80px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextPhoto}
            className="hidden lg:block absolute right-[-80px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Navigation Arrows - Mobile (inside container) */}
          <button
            onClick={prevPhoto}
            className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextPhoto}
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {isCurrentEmpty ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-sm">
                    <span className="uppercase tracking-[0.4em] text-xs text-white/50 mb-3">Coming Soon</span>
                    <span className="text-white/80 text-lg font-light">New visual story in progress</span>
                  </div>
                ) : (
                  <Image
                    src={currentPhoto.url!}
                    alt={currentPhoto.title ?? 'Portfolio image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 80vw, 70vw"
                    priority={displayIndex === 0}
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-5"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${displayIndex}`}
                className="absolute bottom-6 left-6 text-white z-10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="text-sm uppercase tracking-wider opacity-70 mb-1">{currentClient}</p>
                <h3 className="text-2xl font-light">{currentTitle}</h3>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Elegant Progress Indicator */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative">
            {/* Progress Track */}
            <div className="w-64 h-px bg-white/20"></div>
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 h-px bg-white transition-all duration-300 ease-out"
              style={{ width: `${((displayIndex + 1) / photos.length) * 100}%` }}
            ></div>
            {/* Current Position Indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg transition-all duration-300 ease-out"
              style={{ left: `${((displayIndex + 1) / photos.length) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            ></div>
          </div>
        </div>
        
        {/* Thumbnail Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-3">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning || index === displayIndex) return
                  queueTransition(index)
                }}
                className={`relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden transition-all duration-400 ease-in-out ${
                  index === displayIndex 
                    ? 'ring-2 ring-white scale-105 opacity-100 shadow-lg' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                } ${photo.empty ? 'pointer-events-none' : ''}`}
              >
                {photo.empty ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10">
                    <span className="uppercase text-[10px] tracking-[0.3em] text-white/40">Coming Soon</span>
                  </div>
                ) : (
                  <Image
                    src={photo.url!}
                    alt={photo.title ?? 'Portfolio thumbnail'}
                    fill
                    className="object-cover"
                    sizes="96px"
                    quality={70}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg=="
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}