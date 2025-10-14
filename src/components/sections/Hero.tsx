'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Suppress unused variable warning - keeping ref for potential future use
  void videoRef;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

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
          style={{
            width: '100%',
            height: '110%',
            objectFit: 'cover',
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      <div className="hero-content flex items-start pt-16 md:pt-20 h-full">
        <div className="container mx-auto px-8 md:px-12">
          {/* Intentionally minimal hero: video only, no overlay copy */}
        </div>
      </div>
    </section>
  );
}
