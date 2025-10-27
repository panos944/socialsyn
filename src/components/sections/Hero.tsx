'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1); // -1 means not started
  const [isAnimatingStep, setIsAnimatingStep] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const words = ['We', 'Synthesize', 'Presence.'];
  const ctaVisible = revealIndex >= words.length - 1; // CTA appears as soon as last word is revealed
  const isBlockingScroll = loaderDone && !ctaVisible; // block until CTA visible
  const ready = loaderDone && revealIndex >= 0; // subtitle shows after first step
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ensurePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay might still be blocked until user interaction; nothing else to do here.
        });
      }
    };

    const video = videoRef.current;
    const attemptPlay = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.visibilityState !== 'visible') return;
      ensurePlayback();
    };

    if (video && video.readyState >= 2) {
      attemptPlay();
    }

    const onLoadedData = () => attemptPlay();
    const onCanPlay = () => attemptPlay();
    const onVisibility = () => attemptPlay();
    
    // Mobile: attempt to play on any user interaction
    const onUserInteraction = () => {
      attemptPlay();
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', onUserInteraction);
      document.removeEventListener('click', onUserInteraction);
    };

    if (video) {
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('canplay', onCanPlay);
    }
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('touchstart', onUserInteraction, { passive: true, once: true });
    document.addEventListener('click', onUserInteraction, { passive: true, once: true });

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('canplay', onCanPlay);
      }
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('touchstart', onUserInteraction);
      document.removeEventListener('click', onUserInteraction);
    };
  }, []);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (!hasScrolled && latest > 16) {
        setHasScrolled(true);
      }
    });
    return () => {
      unsubscribe?.();
    };
  }, [hasScrolled, scrollY]);
  // Listen for initial loader completion to reveal hero copy
  // When the initial loader finishes, allow the hero to listen for scroll to start the reveal
  useEffect(() => {
    const onDone = () => setLoaderDone(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('initial-loader:done', onDone);
      // Fallback: if no loader event (e.g., cached session), enable immediately after a short delay
      const fallback = window.setTimeout(() => setLoaderDone(true), 500);
      return () => {
        window.removeEventListener('initial-loader:done', onDone);
        window.clearTimeout(fallback);
      };
    }
    return () => {};
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-[1] pointer-events-none"></div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/media/hero-video-poster.jpg"
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback noplay"
          disablePictureInPicture
          className="hero-video"
          style={{
            width: '100%',
            height: '110%',
            objectFit: 'cover',
            WebkitTouchCallout: 'none',
            pointerEvents: 'none',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
        >
          <source src="/media/hero-video-1080p.webm" type="video/webm" />
          <source src="/media/hero-video-1080p.mp4" type="video/mp4" />
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
                w === 'BR' ? (
                  <span key={`br-${i}`} className="basis-full w-full h-0" />
                ) : (
                  <motion.span
                    key={i}
                    initial={false}
                    animate={revealIndex >= i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                )
              ))}
            </motion.h1>
            
            <motion.div 
              initial={false}
              animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="md:flex items-center justify-start space-y-4 md:space-y-0 md:space-x-8 mt-8"
            >
              <motion.a 
                href="#services" 
                onClick={(e) => scrollToSection(e, "#services")}
                className="group relative inline-block px-4 py-2 rounded-full bg-white text-black font-medium text-[0.7rem] tracking-[0.22em] uppercase shadow-md hover:shadow-lg transition-all duration-300"
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
                className="flex items-center group text-white text-[0.75rem]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-9 h-9 border border-white rounded-full flex items-center justify-center mr-3 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
                <span className="text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[0.28em]">Start a Project</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Bottom-centered subtle scroll cue */}
      <motion.a
        href="#services"
        onClick={(e) => scrollToSection(e, "#services")}
        className="absolute bottom-6 inset-x-0 z-10 flex flex-col items-center text-center text-white drop-shadow-lg"
        style={{ pointerEvents: hasScrolled ? 'none' : 'auto' }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: hasScrolled ? 0 : 1, y: hasScrolled ? 12 : 0 }}
        transition={{ duration: 0.6, delay: 0, ease: [0.6, -0.05, 0.01, 0.99] }}
        aria-label="Scroll to discover"
      >
        <span className="text-xs md:text-sm uppercase tracking-[0.24em] mb-2 bg-black/40 px-4 py-1 rounded-full border border-white/40">
          Scroll to discover
        </span>
        <motion.span
          initial={false}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
