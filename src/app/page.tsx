'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useScrollToTop } from '@/hooks/use-scroll';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';
import { Feed } from '@/components/sections/Feed';
import { SimplePhotographySection } from '@/components/three/SimplePhotographySection';

export default function Home() {
  const scrollToTop = useScrollToTop();
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = 'Socialsyn - Digital Marketing Agency';
    
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.2);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden relative">
        <div className="relative z-10">
          {/* Hero & Services */}
          <section className="min-h-screen bg-white relative z-20">
            <Hero />
            <Services />
          </section>

          {/* Feed Section */}
          <Feed />

          {/* About Section */}
          <section className="min-h-screen bg-white relative z-20">
            <About />
          </section>
          
          {/* Photography Section */}
          <SimplePhotographySection />
          
          {/* Elegant Separator */}
          <div className="relative py-16 z-20">
            <div className="w-full px-4">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/60"></div>
                <div className="w-2 h-2 rounded-full bg-primary/80 mx-8"></div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/60"></div>
              </div>
            </div>
          </div>
          
          {/* Portfolio Section */}
          <section className="min-h-screen bg-white relative z-20">
            <Portfolio />
          </section>
          
          {/* CTA Section */}
          <section className="bg-white relative z-20">
            <CTA />
          </section>

          {/* Contact Section */}
          <Contact />
          
        </div>
        
        {/* Back to Top Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={scrollToTop}
            className="bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            size="icon"
            aria-label="Back to Top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
