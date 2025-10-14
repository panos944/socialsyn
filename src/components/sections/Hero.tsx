'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1); // -1 means not started
  const [isAnimatingStep, setIsAnimatingStep] = useState(false);
  const words = ['Creative', 'solutions', 'for', 'ambitious', 'brands'];
  const ctaVisible = revealIndex >= words.length - 1; // CTA appears as soon as last word is revealed
  const isBlockingScroll = loaderDone && !ctaVisible; // block until CTA visible
  const ready = loaderDone && revealIndex >= 0; // subtitle shows after first step
  
  // Suppress unused variable warning - keeping ref for potential future use
  void videoRef;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  // Listen for initial loader completion to reveal hero copy
  // When the initial loader finishes, allow the hero to listen for scroll to start the reveal
  useEffect(() => {
    const onDone = () => setLoaderDone(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('initial-loader:done', onDone);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('initial-loader:done', onDone);
      }
    };
  }, []);

  // Intercept scroll to step through the word reveals; block page scroll until CTA is visible
  useEffect(() => {
    if (!loaderDone) return;
    const step = () => {
      if (isAnimatingStep) return;
      setIsAnimatingStep(true);
      setRevealIndex((idx) => Math.min(idx + 1, words.length - 1));
      window.setTimeout(() => setIsAnimatingStep(false), 450);
    };
    const onWheel = (e: WheelEvent) => {
      if (!ctaVisible) {
        e.preventDefault();
        e.stopPropagation();
        step();
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!ctaVisible) {
        e.preventDefault();
        e.stopPropagation();
        step();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowDown', 'PageDown', ' ', 'Spacebar'];
      if (keys.includes(e.key)) {
        if (!ctaVisible) {
          e.preventDefault();
          e.stopPropagation();
          step();
        }
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('keydown', onKeyDown as EventListener);
    };
  }, [loaderDone, isAnimatingStep, ctaVisible, words.length]);

  // Also lock body scroll while blocking
  useEffect(() => {
    if (isBlockingScroll) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isBlockingScroll]);

  // Ensure scroll is fully restored when CTA becomes visible
  useEffect(() => {
    if (ctaVisible) {
      try {
        document.body.style.overflow = '';
        const htmlEl = document.documentElement;
        if (htmlEl) htmlEl.style.overflow = '';
      } catch {}
    }
  }, [ctaVisible]);

  // Function to scroll to a section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="video-container">
      {/* Subtle top-left gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-[1]"></div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback noplay"
          disablePictureInPicture
          className="hero-video"
          style={{
            width: '100%',
            height: '110%',
            objectFit: 'cover',
            WebkitTouchCallout: 'none',
          }}
        >
          <source src="/video-output-02B0EFCF-7710-41BF-B442-B39610C77A3F-2.mov"/>
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      <div className="hero-content flex items-center h-full">
        <div className="container mx-auto px-8 md:px-12 w-full">
          <div className={`max-w-3xl mr-auto text-left ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}>
            <motion.div 
              initial={false}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="serif-heading text-white text-xl font-light tracking-wide mb-6 opacity-90"
            >
              DIGITAL AGENCY
            </motion.div>
            <motion.h1 
              initial={false}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="serif-heading text-white text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight flex flex-wrap gap-x-3"
            >
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={false}
                  animate={revealIndex >= i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div 
              initial={false}
              animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="md:flex items-center justify-start space-y-6 md:space-y-0 md:space-x-12 mt-12"
            >
              <motion.a 
                href="#services" 
                onClick={(e) => scrollToSection(e, "#services")}
                className="group relative inline-block px-6 py-3 rounded-full bg-white text-black font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                Explore Our Services
              </motion.a>
              
              <div className="hidden md:block h-[1px] w-8 bg-white/30"></div>
              
              <motion.a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, "#contact")}
                className="flex items-center group text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 border rounded-full flex items-center justify-center mr-4 group-hover:bg-white/10 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
                <span className="text-sm uppercase tracking-wider">Start a Project</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
