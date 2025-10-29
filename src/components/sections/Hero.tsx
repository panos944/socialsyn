'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_VIDEO_SRC = '/media/hero-background.mp4';
const HERO_FALLBACK_IMAGE = '/media/hero-video-fallback.png';

export default function Hero() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const words = ['We', 'Synthesize', 'Presence.'];
  const ready = loaderDone; // Show content after loader is done
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Listen for initial loader completion to reveal hero copy
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

  // Function to scroll to a section
  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadImage = new Image();
    preloadImage.src = HERO_FALLBACK_IMAGE;

    return () => {
      preloadImage.src = '';
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const video = videoRef.current;
    if (!video) return;

    let hasMarkedVisible = false;

    const markVisible = () => {
      if (hasMarkedVisible) return;
      hasMarkedVisible = true;
      setVideoReady(true);
    };

    const handleError = () => setVideoFailed(true);

    const attemptPlayback = () => {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Leave fallback visible until a user gesture occurs
        });
      }
    };

    const handleLoadedData = () => {
      markVisible();
      attemptPlayback();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplaythrough', markVisible);
    video.addEventListener('playing', markVisible);
    video.addEventListener('error', handleError);

    if (video.readyState >= 2) {
      markVisible();
    }

    attemptPlayback();

    const unlockOnGesture = () => {
      attemptPlayback();
    };

    window.addEventListener('touchstart', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('click', unlockOnGesture, { passive: true, once: true });

    const failSafe = window.setTimeout(() => {
      if (video.readyState >= 2) {
        markVisible();
      } else {
        attemptPlayback();
      }
    }, 4000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', markVisible);
      video.removeEventListener('playing', markVisible);
      video.removeEventListener('error', handleError);
      window.removeEventListener('touchstart', unlockOnGesture);
      window.removeEventListener('click', unlockOnGesture);
      window.clearTimeout(failSafe);
    };
  }, []);

  return (
    <section id="home" className="video-container">
      {/* Subtle top-left gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-[1] pointer-events-none"></div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 w-full h-full bg-center bg-cover z-[2]"
            style={{
              backgroundImage: `url('${HERO_FALLBACK_IMAGE}')`,
              opacity: videoReady && !videoFailed ? 0 : 1,
              transition: 'opacity 900ms ease-in-out 120ms',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          ></div>
          <video
            ref={videoRef}
            className="hero-video"
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            poster={HERO_FALLBACK_IMAGE}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'auto',
              height: 'auto',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              opacity: videoReady && !videoFailed ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
            }}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
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
              className="serif-heading text-white text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              {words.join(' ')}
            </motion.h1>
            
            <motion.div 
              initial={false}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
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
    </section>
  );
}
