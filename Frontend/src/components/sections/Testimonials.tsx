'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/lib/constants';
import TestimonialCard from '@/components/common/TestimonialCard';
import CarouselWrapper from '@/components/ui/carousel-wrapper';

export default function Testimonials() {
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
    <section id="testimonials" className="py-24 bg-accent/30">
      <div className="container mx-auto px-8 md:px-12">
        <motion.div 
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <div className="section-label">TESTIMONIALS</div>
          <h2 className="serif-heading text-4xl md:text-5xl mb-8">
            What our clients say about their experience
          </h2>
          <p style={{ color: 'hsl(var(--neutral-light))' }}>
            Our partnerships are built on trust, transparency, and results. Hear directly from the brands we&apos;ve helped transform their digital presence.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <CarouselWrapper 
            itemsPerView={3} 
            autoPlay={true} 
            interval={5000}
            className="testimonial-slider"
          >
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </CarouselWrapper>
        </motion.div>
      </div>
    </section>
  );
}
