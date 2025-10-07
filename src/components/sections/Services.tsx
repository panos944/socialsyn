'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/constants';
import ServiceCard from '@/components/common/ServiceCard';

export default function Services() {
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
    <section id="services" className="pt-24 pb-12 bg-secondary/20">
      <div className="container mx-auto px-8 md:px-12">
        <motion.div 
          className="mb-16 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className="section-label">WHAT WE DO</div>
          <h2 className="serif-heading text-4xl md:text-5xl mb-8">
            Strategic digital solutions for modern brands
          </h2>
          <p className="text-base" style={{ color: 'hsl(var(--neutral-light))' }}>
            We craft tailored digital strategies that elevate your brand&apos;s presence and drive measurable results in today&apos;s competitive landscape.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
