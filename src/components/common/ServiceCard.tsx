'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    features: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div 
      className="service-card group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
        <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-lg">
          <Image
            src={service.image} 
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      <h3 className="serif-heading text-2xl mb-3 pb-2 border-b border-primary/30 w-fit transition-colors duration-300 group-hover:border-primary">
        {service.title}
      </h3>
      <p className="mb-5 leading-relaxed" style={{ color: 'hsl(var(--neutral-light))' }}>
        {service.description}
      </p>
    </motion.div>
  );
}
