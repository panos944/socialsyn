'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_VIDEO_ID = 'yzka9ZCMT0s';
const HERO_VIDEO_BASE = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${HERO_VIDEO_ID}&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&fs=0&disablekb=1&iv_load_policy=3`;

export default function Hero() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(HERO_VIDEO_BASE);
  const [iframeDimensions, setIframeDimensions] = useState<{ width: string; height: string }>({ width: '110%', height: '110%' });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const words = ['We', 'Synthesize', 'Presence.'];
  const ready = loaderDone; // Show content after loader is done
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Listen for initial loader completion to reveal hero copy
  useEffect(() => {
    const onDone = () => setLoaderDone(true);
    if (typeof window !== 'undefined') {
      setIframeSrc(`${HERO_VIDEO_BASE}&origin=${encodeURIComponent(window.location.origin)}`);
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
    if (!iframeLoaded) return;
    const timeout = window.setTimeout(() => setIframeVisible(true), 600);
    return () => window.clearTimeout(timeout);
  }, [iframeLoaded]);

  useEffect(() => {
    if (!iframeLoaded || typeof window === 'undefined') return;

    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const muteMessage = JSON.stringify({ event: 'command', func: 'mute', args: [] });
    const playMessage = JSON.stringify({ event: 'command', func: 'playVideo', args: [] });

    const sendCommands = () => {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(muteMessage, '*');
      iframe.contentWindow.postMessage(playMessage, '*');
    };

    // Attempt immediately and retry for a short window to satisfy mobile autoplay policies
    sendCommands();
    const retryInterval = window.setInterval(sendCommands, 500);
    const stopRetries = window.setTimeout(() => {
      window.clearInterval(retryInterval);
    }, 4000);

    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'object' || event.data == null) return;
      if ('event' in event.data && event.data.event === 'onReady') {
        sendCommands();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.clearInterval(retryInterval);
      window.clearTimeout(stopRetries);
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeLoaded]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const videoRatio = 16 / 9;
      const containerRatio = viewportWidth / viewportHeight;
      const overscan = 1.12; // extra coverage to prevent edges from peeking through

      if (containerRatio < videoRatio) {
        // Container is taller (portrait) - size by height
        const targetHeight = viewportHeight * overscan;
        const targetWidth = targetHeight * videoRatio;
        setIframeDimensions({ width: `${targetWidth}px`, height: `${targetHeight}px` });
      } else {
        // Container is wider - size by width
        const targetWidth = viewportWidth * overscan;
        const targetHeight = targetWidth / videoRatio;
        setIframeDimensions({ width: `${targetWidth}px`, height: `${targetHeight}px` });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
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
          {!iframeVisible && (
            <div
              className="absolute inset-0 w-full h-full bg-center bg-cover z-[2]"
              style={{ backgroundImage: "url('/media/hero-video-poster.jpg')" }}
            ></div>
          )}
          <iframe
            title="SocialSyn hero video"
            src={iframeSrc}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="hero-video"
            ref={iframeRef}
            onLoad={() => setIframeLoaded(true)}
            style={{
              width: iframeDimensions.width,
              height: iframeDimensions.height,
              position: 'absolute',
              top: '50%',
              left: '50%',
              border: 'none',
              pointerEvents: 'none',
              opacity: iframeVisible ? 1 : 0,
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center',
              transition: 'opacity 0.5s ease-in-out',
            }}
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
