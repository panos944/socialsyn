'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ElegantBackground() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Minimal geometric shapes */}
      <motion.div
        className="absolute border border-neutral-200 opacity-10"
        style={{
          width: '100px',
          height: '100px',
          left: '15%',
          top: '25%',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 30, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute border border-neutral-300 opacity-8 rounded-full"
        style={{
          width: '60px',
          height: '60px',
          right: '20%',
          top: '15%',
        }}
        animate={{
          x: [0, -50, 70, 0],
          y: [0, 80, -30, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute opacity-6"
        style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, hsl(345, 35%, 55%), transparent)',
          left: '70%',
          bottom: '40%',
        }}
        animate={{
          x: [0, -100, 60, 0],
          scaleX: [0.5, 1.5, 0.8, 0.5],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute opacity-8"
        style={{
          width: '2px',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, hsl(193, 90%, 33%), transparent)',
          left: '40%',
          top: '60%',
        }}
        animate={{
          y: [0, -50, 80, 0],
          scaleY: [0.3, 1.2, 0.7, 0.3],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}