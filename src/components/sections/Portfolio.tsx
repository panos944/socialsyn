'use client';

import { useState } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/lib/constants';

export default function Portfolio() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % portfolioItems.length)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 400)
  }

  const prevProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 400)
  }

  const currentProject = portfolioItems[currentProjectIndex];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-label text-primary mb-4">OUR WORK</div>
          <h2 className="serif-heading text-4xl md:text-5xl mb-6">
            We create connections and drive results
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how we&apos;ve helped brands tell their stories and achieve remarkable growth
          </p>
        </div>

        {/* Featured Project Display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative group">
            {/* Navigation Arrows - Desktop (outside container) */}
            <button
              onClick={prevProject}
              className="hidden lg:block absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 bg-primary/10 backdrop-blur-md rounded-full p-3 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextProject}
              className="hidden lg:block absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 bg-primary/10 backdrop-blur-md rounded-full p-3 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Navigation Arrows - Mobile (inside container) */}
            <button
              onClick={prevProject}
              className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/10 backdrop-blur-md rounded-full p-3 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextProject}
              className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/10 backdrop-blur-md rounded-full p-3 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110"
              aria-label="Next project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Project Display */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project Image */}
              <div className="relative aspect-[10/12] rounded-2xl overflow-hidden shadow-xl">
                <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>

              {/* Project Info */}
              <div className={`space-y-6 transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <div>
                  <span className="inline-block text-primary text-sm uppercase tracking-wider font-medium mb-2">
                    {currentProject.categoryLabel}
                  </span>
                  <h3 className="serif-heading text-3xl md:text-4xl mb-4 text-gray-900">
                    {currentProject.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {currentProject.description || "Crafted with precision and creativity to deliver exceptional results that exceed expectations and drive meaningful engagement."}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 pt-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors duration-300 font-medium">
                    View Case Study
                  </button>
                  {/* <button className="text-primary border border-primary/20 px-6 py-3 rounded-full hover:bg-primary/5 transition-colors duration-300 font-medium">
                    Live Project
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Progress Indicator */}
        <div className="flex justify-center items-center mb-12">
          <div className="relative">
            {/* Progress Track */}
            <div className="w-64 h-px bg-gray-200"></div>
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 h-px bg-primary transition-all duration-700 ease-out"
              style={{ width: `${((currentProjectIndex + 1) / portfolioItems.length) * 100}%` }}
            ></div>
            {/* Current Position Indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-lg transition-all duration-700 ease-out"
              style={{ left: `${((currentProjectIndex + 1) / portfolioItems.length) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            ></div>
          </div>
        </div>

        {/* Quick Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {portfolioItems.map((project, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === currentProjectIndex) return
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentProjectIndex(index)
                  setTimeout(() => setIsTransitioning(false), 100)
                }, 400)
              }}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                index === currentProjectIndex 
                  ? 'ring-2 ring-primary scale-105 opacity-100' 
                  : 'opacity-70 hover:opacity-100 hover:scale-102'
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium truncate">{project.categoryLabel}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a href="#" className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary-dark transition-colors duration-300 font-medium text-lg">
            View Full Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
