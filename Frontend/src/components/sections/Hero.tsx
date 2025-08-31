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
      <div className="video-overlay"></div>
      
      <motion.div 
        className="absolute inset-0 w-full h-full z-[-1]"
        style={{ y }}
      >
        <video
          src="/07DF5552-C205-4643-BC59-E53B88DE6357.mov"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '110%',
            objectFit: 'cover',
          }}
        />
      </motion.div>
      
      <div className="hero-content flex items-center justify-center h-full">
        <div className="container mx-auto px-8 md:px-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="serif-heading text-white text-xl font-light tracking-wide mb-6 opacity-90"
            >
              DIGITAL AGENCY
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="serif-heading text-white text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              Creative solutions for ambitious brands
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="md:flex items-center space-y-6 md:space-y-0 md:space-x-12 mt-12"
            >
              <motion.a 
                href="#services" 
                onClick={(e) => scrollToSection(e, "#services")}
                className="elegant-button text-white border-white inline-block hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
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
