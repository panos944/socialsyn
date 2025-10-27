'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const words = ['We', 'Synthesize', 'Presence.'];
  const ready = loaderDone; // Show content after loader is done
  
  // Show play prompt after 2 seconds if video isn't playing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoPlaying && videoRef.current && videoRef.current.paused) {
        setShowPlayPrompt(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [videoPlaying]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ensurePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (videoPlaying) return; // Already playing
      
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.muted = true;
      video.defaultMuted = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoPlaying(true);
          })
          .catch((error) => {
            console.log('Video autoplay prevented:', error);
          });
      }
    };

    const video = videoRef.current;
    const attemptPlay = () => {
      const video = videoRef.current;
      if (!video || videoPlaying) return;
      if (document.visibilityState !== 'visible') return;
      ensurePlayback();
    };

    // Try to play immediately if video is ready
    if (video) {
      if (video.readyState >= 2) {
        attemptPlay();
      }
      
      const onLoadedData = () => attemptPlay();
      const onCanPlay = () => attemptPlay();
      const onLoadedMetadata = () => attemptPlay();
      
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('loadedmetadata', onLoadedMetadata);
      
      // Cleanup
      const cleanup = () => {
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
      
      // Visibility change handler
      const onVisibility = () => {
        if (document.visibilityState === 'visible') {
          attemptPlay();
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      
      // User interaction handlers for mobile browsers
      const interactionEvents = ['touchstart', 'touchend', 'click', 'scroll'];
      const onUserInteraction = () => {
        if (!videoPlaying) {
          ensurePlayback();
        }
      };
      
      interactionEvents.forEach(event => {
        document.addEventListener(event, onUserInteraction, { passive: true, once: true });
      });

      return () => {
        cleanup();
        document.removeEventListener('visibilitychange', onVisibility);
        interactionEvents.forEach(event => {
          document.removeEventListener(event, onUserInteraction);
        });
      };
    }
  }, [videoPlaying]);
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

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().then(() => {
        setVideoPlaying(true);
        setShowPlayPrompt(false);
      }).catch(() => {});
    }
  };

  return (
    <section id="home" className="video-container">
      {/* Subtle top-left gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent z-[1] pointer-events-none"></div>
      
      {/* Tap to play overlay for mobile if video isn't autoplaying */}
      {showPlayPrompt && !videoPlaying && (
        <div 
          className="absolute inset-0 z-[2] flex items-center justify-center bg-black/20 backdrop-blur-sm cursor-pointer"
          onClick={handlePlayClick}
        >
          <div className="text-white text-center animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-sm uppercase tracking-wider">Tap to play</p>
          </div>
        </div>
      )}
      
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
          disableRemotePlayback
          className="hero-video"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          style={{
            width: '100%',
            height: '110%',
            objectFit: 'cover',
            WebkitTouchCallout: 'none',
            pointerEvents: 'none',
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
