'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Portfolio of best client photos with metadata - using local images where possible
const photos = [
  { url: '/images-used/LUISANT/IMG_8065.JPG', client: 'LUISANT', title: 'Jewelry Photography' },
  { url: '/images-used/LUISANT/IMG_8203.JPG', client: 'LUISANT', title: 'Product Showcase' },
  { url: '/images-used/GRAPHICS/IMG_8319.JPG', client: 'GRAPHICS', title: 'Brand Campaign' },
  { url: '/images-used/ITALOS/IMG_7836%202.JPG', client: 'ITALOS', title: 'Brand Photography' },
  { url: '/images-used/JCou/IMG_9439%205.JPG', client: 'JCOU', title: 'Fashion Editorial' },
  { url: '/images-used/LEDOM/IMG_9419%203.JPG', client: 'LEDOM', title: 'Lifestyle Shoot' },
  { url: '/images-used/LEDOM/IMG_9779.jpg', client: 'LEDOM', title: 'Product Photography' },
  { url: '/images-used/PHOTIS/IMG_0796.JPG', client: 'EDITORIAL', title: 'Portrait Session' },
  { url: '/images-used/ZALO/IMG_2017.JPG', client: 'COSTARELLOS', title: 'Commercial Work' },
  { url: '/images-used/DOMAINE%20HATZIMICHALIS/IMG_2290.JPG', client: 'BRIDAL', title: 'Luxury Products' }
]

export function SimplePhotographySection() {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null)
  const [incomingLoaded, setIncomingLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const queueTransition = (targetIndex: number) => {
    if (isTransitioning || targetIndex === displayIndex) return
    setIsTransitioning(true)
    setIncomingLoaded(false)
    setIncomingIndex(targetIndex)
  }

  const nextPhoto = () => {
    const next = (displayIndex + 1) % photos.length
    queueTransition(next)
  }

  const prevPhoto = () => {
    const prev = (displayIndex - 1 + photos.length) % photos.length
    queueTransition(prev)
  }

  // When the incoming image has loaded, crossfade and then finalize swap
  useEffect(() => {
    if (!isTransitioning || !incomingLoaded || incomingIndex === null) return
    const timeout = window.setTimeout(() => {
      setDisplayIndex(incomingIndex)
      setIncomingIndex(null)
      setIncomingLoaded(false)
      setIsTransitioning(false)
    }, 320) // match CSS duration below
    return () => window.clearTimeout(timeout)
  }, [isTransitioning, incomingLoaded, incomingIndex])

  const currentPhoto = photos[displayIndex]

  return (
    <section className="photography-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Photography</h2>
          <p className="text-gray-400 text-lg">Capturing moments that define brands</p>
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
            {/* Base (currently displayed) photo */}
            <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${incomingIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                key={`display-${displayIndex}`}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                fill
                className="object-cover"
                sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 80vw, 70vw"
                priority
                quality={90}
              />
            </div>

            {/* Incoming photo (rendered only when transitioning) */}
            {incomingIndex !== null && (
              <div className={`absolute inset-0 transition-opacity duration-300 ease-out ${incomingLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  key={`incoming-${incomingIndex}`}
                  src={photos[incomingIndex].url}
                  alt={photos[incomingIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 80vw, 70vw"
                  quality={90}
                  onLoadingComplete={() => setIncomingLoaded(true)}
                />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-5"></div>
            
            {/* Photo Info Overlay */}
            <div className={`absolute bottom-6 left-6 text-white z-10 transition-all duration-300 ease-out ${incomingIndex !== null ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <p className="text-sm uppercase tracking-wider opacity-70 mb-1">{currentPhoto.client}</p>
              <h3 className="text-2xl font-light">{currentPhoto.title}</h3>
            </div>
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
        
        {/* Elegant Photo Title */}
        <div className="text-center mb-8">
          <div className={`transition-all duration-300 ease-out ${incomingIndex !== null ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
              {currentPhoto.client}
            </p>
            <h3 className="text-white text-xl font-light">
              {currentPhoto.title}
            </h3>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === displayIndex) return
                queueTransition(index)
              }}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                index === displayIndex 
                  ? 'ring-2 ring-white scale-105 opacity-100' 
                  : 'opacity-60 hover:opacity-100 hover:scale-102'
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 10vw"
                quality={60}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}