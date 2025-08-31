'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// Feed images - full feeds from root public folder
const feedImages = [
  {
    url: '/costarellos feed.jpg',
    title: 'Costarellos Feed',
    description: 'Social Media Feed'
  },
  {
    url: '/Riza-feed.jpg',
    title: 'Riza Feed',
    description: 'Social Media Feed'
  },
  {
    url: '/BRIDAL FEED.jpg',
    title: 'Bridal Feed',
    description: 'Social Media Feed'
  }
]

export function Feed() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const maxScroll = 350 // Percentage of container height to scroll (stops before black areas)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = e.deltaY
      const scrollSpeed = 2

      setScrollPosition(prev => {
        const newPosition = prev + (delta * scrollSpeed / 10)
        return Math.max(0, Math.min(maxScroll, newPosition))
      })
    }

    container.addEventListener('wheel', handleWheelEvent, { passive: false })
    
    return () => {
      container.removeEventListener('wheel', handleWheelEvent)
    }
  }, [maxScroll])



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
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Feed</h2>
          <p className="text-gray-400 text-lg">Social content that drives engagement</p>
        </div>

        {/* Main Hero Feed with Side Previews */}
        <div className="w-96 mx-auto mb-12 relative group">
          {/* Left Side Preview - 25% Larger */}
          <div className={`hidden lg:block absolute left-[-230px] top-1/2 -translate-y-1/2 z-5 transition-all duration-300 ${
            isTransitioning ? 'opacity-20' : 'opacity-60'
          }`}>
            <div className="w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={prevFeedImage.url}
                alt={prevFeedImage.title}
                width={200}
                height={267}
                className="w-full h-full object-cover"
                quality={75}
              />
            </div>
          </div>

          {/* Right Side Preview - 25% Larger */}
          <div className={`hidden lg:block absolute right-[-230px] top-1/2 -translate-y-1/2 z-5 transition-all duration-300 ${
            isTransitioning ? 'opacity-20' : 'opacity-60'
          }`}>
            <div className="w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={nextFeedImage.url}
                alt={nextFeedImage.title}
                width={200}
                height={267}
                className="w-full h-full object-cover"
                quality={75}
              />
            </div>
          </div>

          {/* Navigation Arrows - Desktop (outside container) */}
          <button
            onClick={prevFeed}
            disabled={isTransitioning}
            className={`hidden lg:block absolute left-[-100px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
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
            className={`hidden lg:block absolute right-[-100px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-4 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
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
            className="relative aspect-[4/6] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
          >
            {/* Auto-Scrollable Image - positioned to show full height */}
            <div 
              className={`absolute left-0 right-0 transition-opacity duration-600 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                top: `-${scrollPosition}%`,
                height: 'auto'
              }}
            >
              <Image
                src={currentFeed.url}
                alt={currentFeed.title}
                width={400}
                height={2000}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 80vw, 70vw"
                priority
                quality={90}
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
              style={{ height: `${(scrollPosition / maxScroll) * 100}%` }}
            ></div>
            {/* Current Position Indicator */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg transition-all duration-500 ease-out"
              style={{ 
                top: `${(scrollPosition / maxScroll) * 100}%`, 
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