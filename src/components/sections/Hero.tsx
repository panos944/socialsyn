'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_VIDEO_SRC = '/images-used/hero-background-v1.mp4';
const HERO_FALLBACK_IMAGE = '/images-used/hero-video-poster.jpg';

export default function Hero() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
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

    setMounted(true);

    // Preload fallback image
    const preloadFallback = new Image();
    preloadFallback.src = HERO_FALLBACK_IMAGE;

    return () => {
      preloadFallback.src = '';
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mounted) return; // Wait for mount to prevent hydration issues

    const video = videoRef.current;
    if (!video) return;

    // Set video attributes for autoplay (especially important for mobile)
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('webkit-playsinline', '');

    const attemptPlayback = async () => {
      try {
        // Ensure video is loaded before attempting to play
        if (video.readyState >= 2) {
          await video.play();
        } else {
          // Wait for video to be ready
          video.addEventListener('canplay', async () => {
            try {
              await video.play();
            } catch (e) {
              // Autoplay blocked
            }
          }, { once: true });
        }
      } catch (e) {
        // Autoplay blocked; will play on user interaction
      }
    };

    // Try to play immediately
    attemptPlayback();

    // Also try when video metadata is loaded
    const handleLoadedMetadata = () => {
      attemptPlayback();
    };

    // Also try when video can play
    const handleCanPlay = async () => {
      try {
        await video.play();
      } catch (e) {
        // Autoplay blocked
      }
    };

    // Try when video can play through without buffering
    const handleCanPlayThrough = async () => {
      try {
        await video.play();
      } catch (e) {
        // Autoplay blocked
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    // Fallback: unlock on user gesture (especially important for iOS)
    const unlockOnGesture = () => {
      attemptPlayback();
    };

    window.addEventListener('touchstart', unlockOnGesture, { passive: true, once: true });
    window.addEventListener('click', unlockOnGesture, { passive: true, once: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      window.removeEventListener('touchstart', unlockOnGesture);
      window.removeEventListener('click', unlockOnGesture);
    };
  }, [mounted]);

  return (
    <section id="home" className="video-container">
      {/* Subtle top-left gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-[1] pointer-events-none"></div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Fallback image (shows while video loads or if video fails) */}
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
          {/* Hero video (plays on all devices) */}
          <video
            ref={videoRef}
            className="hero-video absolute pointer-events-none z-[3]"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'auto',
              height: 'auto',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              opacity: mounted && videoReady && !videoFailed ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
            }}
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            poster={HERO_FALLBACK_IMAGE}
            src={HERO_VIDEO_SRC}
            onLoadedData={async () => {
              setVideoReady(true);
              setVideoFailed(false);
              const video = videoRef.current;
              if (video) {
                try {
                  // Ensure video is muted for autoplay
                  video.muted = true;
                  await video.play();
                } catch (e) {
                  // Autoplay blocked - will play on user interaction
                }
              }
            }}
            onError={() => setVideoFailed(true)}
          />
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