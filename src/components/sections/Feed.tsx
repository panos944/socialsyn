'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// Feed images - using local feed exports
const feedImages = [
  {
    url: '/images-used/Feeds/honey.jpg',
    title: 'Riza',
    description: 'Social Media Feed'
  },
  {
    url: '/images-used/Feeds/babyline-feed.jpg',
    title: 'Babyline',
    description: 'Social Media Feed'
  },
  {
    url: '/images-used/Feeds/costarellos_feed_2.jpg',
    title: 'Costarellos',
    description: 'Social Media Feed'
  },
  {
    url: '/images-used/Feeds/italos-feed.jpg',
    title: 'O Italos',
    description: 'Social Media Feed'
  },
  {
    url: '/images-used/Feeds/JCOU_FEED-1.jpg',
    title: 'JCou',
    description: 'Social Media Feed'
  },
  {
    url: '/images-used/Feeds/wine-feed.jpg',
    title: 'Domaine Hatzimihalis',
    description: 'Social Media Feed'
  }
]

export function Feed() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const touchStartYRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastTouchYRef = useRef<number | null>(null)
  const lastTouchTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let currentScroll = scrollPosition

    const updateScroll = (newScroll: number) => {
      const clamped = Math.max(0, Math.min(newScroll, maxScroll))
      currentScroll = clamped
      setScrollPosition(clamped)
    }

    const momentum = () => {
      if (Math.abs(velocityRef.current) > 0.1) {
        currentScroll += velocityRef.current
        updateScroll(currentScroll)
        velocityRef.current *= 0.95 // Deceleration
        animationFrameRef.current = requestAnimationFrame(momentum)
      } else {
        velocityRef.current = 0
      }
    }

    const handleWheelEvent = (e: WheelEvent) => {
      if (maxScroll <= 0) return
      e.preventDefault()
      e.stopPropagation()
      
      // Cancel any ongoing momentum
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      velocityRef.current = 0
      
      const delta = e.deltaY * 0.5
      currentScroll += delta
      updateScroll(currentScroll)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      
      // Stop momentum
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      velocityRef.current = 0
      
      touchStartYRef.current = e.touches[0].clientY
      lastTouchYRef.current = e.touches[0].clientY
      lastTouchTimeRef.current = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (maxScroll <= 0) return
      if (touchStartYRef.current === null || lastTouchYRef.current === null) return
      
      const currentY = e.touches[0]?.clientY
      if (currentY == null) return
      
      const delta = lastTouchYRef.current - currentY
      if (Math.abs(delta) < 0.5) return
      
      e.preventDefault()
      e.stopPropagation()
      
      // Calculate velocity for momentum
      const now = Date.now()
      const timeDelta = now - lastTouchTimeRef.current
      if (timeDelta > 0) {
        velocityRef.current = delta / timeDelta * 16 // Normalize to 60fps
      }
      
      currentScroll += delta
      updateScroll(currentScroll)
      
      lastTouchYRef.current = currentY
      lastTouchTimeRef.current = now
    }

    const handleTouchEnd = () => {
      touchStartYRef.current = null
      lastTouchYRef.current = null
      
      // Start momentum scrolling
      if (Math.abs(velocityRef.current) > 0.5) {
        animationFrameRef.current = requestAnimationFrame(momentum)
      }
    }

    container.addEventListener('wheel', handleWheelEvent, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      container.removeEventListener('wheel', handleWheelEvent)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [maxScroll, scrollPosition])

  useEffect(() => {
    const container = containerRef.current
    const img = imageRef.current
    if (!container || !img) return

    const compute = () => {
      const containerHeight = container.clientHeight
      const imageHeight = img.clientHeight
      const max = Math.max(0, imageHeight - containerHeight)
      setMaxScroll(max)
      setScrollPosition(prev => Math.min(prev, max))
    }

    compute()

    window.addEventListener('resize', compute)
    img.addEventListener('load', compute)

    return () => {
      window.removeEventListener('resize', compute)
      img.removeEventListener('load', compute)
    }
  }, [currentFeedIndex])



  const nextFeed = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setScrollPosition(0)
      
      setTimeout(() => {
        setCurrentFeedIndex((prev) => (prev + 1) % feedImages.length)
      }, 150)
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }
  }

  const prevFeed = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setScrollPosition(0)
      
      setTimeout(() => {
        setCurrentFeedIndex((prev) => (prev - 1 + feedImages.length) % feedImages.length)
      }, 150)
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }
  }

  const currentFeed = feedImages[currentFeedIndex]
  const prevFeedIndex = (currentFeedIndex - 1 + feedImages.length) % feedImages.length
  const nextFeedIndex = (currentFeedIndex + 1) % feedImages.length
  const prevFeedImage = feedImages[prevFeedIndex]
  const nextFeedImage = feedImages[nextFeedIndex]

  return (
    <section className="feed-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">The Feed</h2>
          <p className="text-gray-400 text-lg">Curated content that builds connection, consistency, and engagement.</p>
        </div>

        {/* Main Hero Feed with Side Previews */}
        <div className="w-96 mx-auto mb-12 relative group">
          {/* Left Side Preview */}
          <div className={`hidden lg:block absolute left-[-230px] top-1/2 -translate-y-1/2 z-5 transition-all duration-300 ${
            isTransitioning ? 'opacity-20' : 'opacity-60'
          }`}>
            <div className="w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={prevFeedImage.url}
                alt={prevFeedImage.title}
                width={600}
                height={800}
                className="w-full h-full object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Right Side Preview */}
          <div className={`hidden lg:block absolute right-[-230px] top-1/2 -translate-y-1/2 z-5 transition-all duration-300 ${
            isTransitioning ? 'opacity-20' : 'opacity-60'
          }`}>
            <div className="w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={nextFeedImage.url}
                alt={nextFeedImage.title}
                width={600}
                height={800}
                className="w-full h-full object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Navigation Arrows - Desktop (outside container) */}
          <button
            onClick={prevFeed}
            disabled={isTransitioning}
            className={`hidden lg:block absolute left-[-320px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
              isTransitioning ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Previous feed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextFeed}
            disabled={isTransitioning}
            className={`hidden lg:block absolute right-[-320px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
              isTransitioning ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Next feed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Navigation Arrows - Mobile (inside container) */}
          <button
            onClick={prevFeed}
            disabled={isTransitioning}
            className={`lg:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
              isTransitioning ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Previous feed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextFeed}
            disabled={isTransitioning}
            className={`lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
              isTransitioning ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Next feed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>


          {/* Main Hero Feed Container */}
          <div 
            ref={containerRef}
            className="relative aspect-[3/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
            style={{ touchAction: maxScroll > 0 ? 'none' : 'auto' }}
          >
            {/* Auto-Scrollable Image - Full width, fits side to side */}
            <div 
              className={`absolute left-0 right-0 w-full ${
                isTransitioning ? 'opacity-0 transition-opacity duration-600' : 'opacity-100'
              }`}
              style={{
                transform: `translateY(-${scrollPosition}px)`,
                height: 'auto',
                willChange: 'transform'
              }}
            >
              <Image
                src={currentFeed.url}
                alt={currentFeed.title}
                width={1080}
                height={2700}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 600px, 400px"
                priority
                quality={95}
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                ref={imageRef}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-5"></div>
            
            {/* Image Info Overlay */}
            <div className={`absolute bottom-6 left-6 text-white z-10 transition-all duration-600 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              <p className="text-sm uppercase tracking-wider opacity-70 mb-1">{currentFeed.description}</p>
              <h3 className="text-2xl font-light">{currentFeed.title}</h3>
            </div>

            {/* Scroll Hint */}
            {scrollPosition === 0 && (
              <div className={`absolute top-6 right-6 text-white/60 z-10 text-sm transition-all duration-600 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span>Scroll to explore</span>
                </div>
              </div>
            )}

            {/* Feed indicator */}
            <div className={`absolute top-6 left-6 text-white/60 z-10 text-sm transition-all duration-600 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              <span>{currentFeedIndex + 1} / {feedImages.length}</span>
            </div>
          </div>
        </div>

        {/* Vertical Progress Indicator */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative">
            {/* Progress Track */}
            <div className="w-px h-32 bg-white/20"></div>
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 w-px bg-white transition-all duration-500 ease-out"
              style={{ height: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%` }}
            ></div>
            {/* Current Position Indicator */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg transition-all duration-500 ease-out"
              style={{ 
                top: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%`, 
                transform: 'translateX(-50%) translateY(-50%)' 
              }}
            ></div>
          </div>
        </div>
        
        {/* Feed Title */}
        <div className="text-center mb-8">
          <div className={`transition-all duration-600 ease-in-out ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
              {currentFeed.description}
            </p>
            <h3 className="text-white text-xl font-light">
              {currentFeed.title}
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
