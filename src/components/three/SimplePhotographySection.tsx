'use client'

import { useState } from 'react'
import Image from 'next/image'

// Portfolio of best client photos with metadata - using Unsplash placeholder images
const photos = [
  { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'LUISANT', title: 'Jewelry Photography' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'LUISANT', title: 'Product Showcase' },
  { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'GRAPHICS', title: 'Brand Campaign' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'ITALOS', title: 'Brand Photography' },
  { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'JCOU', title: 'Fashion Editorial' },
  { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'LEDOM', title: 'Lifestyle Shoot' },
  { url: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'LEDOM', title: 'Product Photography' },
  { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'EDITORIAL', title: 'Portrait Session' },
  { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'COSTARELLOS', title: 'Commercial Work' },
  { url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', client: 'BRIDAL', title: 'Luxury Products' }
]

export function SimplePhotographySection() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 50)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prevPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }, 50)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const currentPhoto = photos[currentPhotoIndex]

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
            {/* Current Photo */}
            <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                src={currentPhoto.url}
                alt={currentPhoto.title}
                fill
                className="object-cover"
                sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 80vw, 70vw"
                priority
                quality={90}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-5"></div>
            
            {/* Photo Info Overlay */}
            <div className={`absolute bottom-6 left-6 text-white z-10 transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
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
              className="absolute top-0 left-0 h-px bg-white transition-all duration-700 ease-out"
              style={{ width: `${((currentPhotoIndex + 1) / photos.length) * 100}%` }}
            ></div>
            {/* Current Position Indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg transition-all duration-700 ease-out"
              style={{ left: `${((currentPhotoIndex + 1) / photos.length) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            ></div>
          </div>
        </div>
        
        {/* Elegant Photo Title */}
        <div className="text-center mb-8">
          <div className={`transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
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
                if (isTransitioning || index === currentPhotoIndex) return
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentPhotoIndex(index)
                }, 50)
                setTimeout(() => setIsTransitioning(false), 600)
              }}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                index === currentPhotoIndex 
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