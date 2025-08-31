'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingOrbProps {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}

function FloatingOrb({ size, color, initialX, initialY, duration, delay }: FloatingOrbProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
        left: `${initialX}%`,
        top: `${initialY}%`,
        transformOrigin: 'center',
      }}
      initial={{
        opacity: 0.3,
        scaleX: 0.5,
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -20, 30, 0],
        scaleX: [0.5, 1.5, 0.8, 0.5],
        opacity: [0.3, 0.6, 0.2, 0.3],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

interface FloatingBackgroundProps {
  density?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export default function FloatingBackground({ density = 'medium', className = '' }: FloatingBackgroundProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const orbConfigs = {
    light: [
      { size: 200, color: 'hsl(345, 35%, 55%)', x: 15, y: 25, duration: 45, delay: 0 },
      { size: 150, color: 'hsl(31, 16%, 25%)', x: 75, y: 15, duration: 55, delay: 15 },
      { size: 180, color: 'hsl(193, 90%, 33%)', x: 85, y: 75, duration: 40, delay: 30 },
    ],
    medium: [
      { size: 250, color: 'hsl(345, 35%, 55%)', x: 10, y: 20, duration: 50, delay: 0 },
      { size: 180, color: 'hsl(31, 16%, 25%)', x: 80, y: 10, duration: 60, delay: 12 },
      { size: 200, color: 'hsl(193, 90%, 33%)', x: 90, y: 80, duration: 45, delay: 25 },
      { size: 140, color: 'hsl(345, 60%, 65%)', x: 20, y: 70, duration: 65, delay: 35 },
      { size: 160, color: 'hsl(340, 40%, 80%)', x: 50, y: 40, duration: 55, delay: 18 },
    ],
    heavy: [
      { size: 300, color: 'hsl(345, 35%, 55%)', x: 5, y: 15, duration: 55, delay: 0 },
      { size: 220, color: 'hsl(31, 16%, 25%)', x: 75, y: 5, duration: 65, delay: 15 },
      { size: 180, color: 'hsl(193, 90%, 33%)', x: 85, y: 85, duration: 50, delay: 30 },
      { size: 160, color: 'hsl(345, 60%, 65%)', x: 15, y: 75, duration: 70, delay: 45 },
      { size: 200, color: 'hsl(340, 40%, 80%)', x: 95, y: 50, duration: 60, delay: 22 },
      { size: 140, color: 'hsl(54, 20%, 90%)', x: 40, y: 25, duration: 75, delay: 38 },
    ],
  };

  const orbs = orbConfigs[density];

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-[-1] ${className}`}>
      {orbs.map((orb, index) => (
        <FloatingOrb
          key={index}
          size={orb.size}
          color={orb.color}
          initialX={orb.x}
          initialY={orb.y}
          duration={orb.duration}
          delay={orb.delay}
        />
      ))}
    </div>
  );
}