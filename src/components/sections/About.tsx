'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { stats, teamImages } from '@/lib/constants';

export default function About() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <div className="section-label">OUR STORY</div>
              <h2 className="serif-heading text-4xl md:text-5xl mb-8">
                We craft digital experiences that resonate
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-base mb-6"
              style={{ color: 'hsl(var(--neutral-light))' }}
              variants={itemVariants}
            >
              Socialsyn is a boutique digital marketing agency driven by a passion for creating meaningful connections between brands and their audiences. We blend strategic thinking with creative execution to deliver results that exceed expectations.
            </motion.p>
            <motion.p 
              className="text-base mb-12"
              style={{ color: 'hsl(var(--neutral-light))' }}
              variants={itemVariants}
            >
              Our approach is simple yet effective: understand your goals, craft a tailored strategy, and execute with precision and creativity.
            </motion.p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mb-12">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id} 
                  className="border-t border-neutral-lighter pt-6"
                  variants={itemVariants}
                >
                  <div className="large-number text-primary">
                    {stat.value}
                  </div>
                  <p className="uppercase text-xs tracking-wider mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="elegant-button inline-block"
              >
                Work With Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:ml-auto order-1 lg:order-2 max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="relative">
              <motion.div variants={itemVariants} className="relative z-10"
>
                <Image 
                  src={"/images/LEDOM/image00023.jpeg"} 
                  alt="About Us"
                  width={900}
                  height={900}
                  className="w-full h-auto aspect-[3/4] object-cover" 
                />
              </motion.div>
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-accent z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
