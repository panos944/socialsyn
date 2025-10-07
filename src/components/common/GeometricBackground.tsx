'use client';

import { motion } from 'framer-motion';

interface FloatingShapeProps {
  type: 'circle' | 'square' | 'triangle';
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  rotation?: boolean;
}

function FloatingShape({ 
  type, 
  size, 
  color, 
  initialX, 
  initialY, 
  duration, 
  delay, 
  rotation = false 
}: FloatingShapeProps) {
  const getShape = () => {
    const baseStyle = {
      width: size,
      height: size,
      background: color,
      opacity: 0.08,
    };

    switch (type) {
      case 'circle':
        return { ...baseStyle, borderRadius: '50%' };
      case 'square':
        return { ...baseStyle, borderRadius: '8px' };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          opacity: 0.06,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        ...getShape(),
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, 40, -20, 30, 0],
        y: [0, -30, 40, -10, 0],
        scale: [1, 1.1, 0.9, 1.05, 1],
        ...(rotation && {
          rotate: [0, 180, 360],
        }),
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

interface GeometricBackgroundProps {
  density?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export default function GeometricBackground({ 
  density = 'medium', 
  className = '' 
}: GeometricBackgroundProps) {
  const shapeConfigs = {
    light: [
      { type: 'circle' as const, size: 60, color: 'hsl(345, 35%, 55%)', x: 15, y: 20, duration: 30, delay: 0 },
      { type: 'square' as const, size: 40, color: 'hsl(193, 90%, 33%)', x: 80, y: 70, duration: 35, delay: 8, rotation: true },
      { type: 'triangle' as const, size: 50, color: 'hsl(54, 20%, 90%)', x: 70, y: 15, duration: 25, delay: 15 },
    ],
    medium: [
      { type: 'circle' as const, size: 80, color: 'hsl(345, 35%, 55%)', x: 10, y: 25, duration: 40, delay: 0 },
      { type: 'square' as const, size: 60, color: 'hsl(193, 90%, 33%)', x: 85, y: 10, duration: 45, delay: 12, rotation: true },
      { type: 'circle' as const, size: 70, color: 'hsl(54, 20%, 90%)', x: 75, y: 80, duration: 35, delay: 20 },
      { type: 'triangle' as const, size: 55, color: 'hsl(345, 60%, 65%)', x: 20, y: 70, duration: 50, delay: 8 },
      { type: 'square' as const, size: 45, color: 'hsl(340, 40%, 80%)', x: 90, y: 50, duration: 38, delay: 25, rotation: true },
      { type: 'circle' as const, size: 65, color: 'hsl(31, 16%, 25%)', x: 45, y: 30, duration: 42, delay: 18 },
    ],
    heavy: [
      { type: 'circle' as const, size: 100, color: 'hsl(345, 35%, 55%)', x: 8, y: 15, duration: 45, delay: 0 },
      { type: 'square' as const, size: 80, color: 'hsl(193, 90%, 33%)', x: 82, y: 8, duration: 50, delay: 15, rotation: true },
      { type: 'triangle' as const, size: 70, color: 'hsl(54, 20%, 90%)', x: 75, y: 75, duration: 38, delay: 22 },
      { type: 'circle' as const, size: 90, color: 'hsl(345, 60%, 65%)', x: 18, y: 65, duration: 55, delay: 8 },
      { type: 'square' as const, size: 60, color: 'hsl(340, 40%, 80%)', x: 88, y: 45, duration: 42, delay: 30, rotation: true },
      { type: 'triangle' as const, size: 65, color: 'hsl(31, 16%, 25%)', x: 42, y: 25, duration: 48, delay: 12 },
      { type: 'circle' as const, size: 75, color: 'hsl(193, 90%, 33%)', x: 65, y: 85, duration: 40, delay: 35 },
      { type: 'square' as const, size: 50, color: 'hsl(345, 35%, 55%)', x: 25, y: 40, duration: 52, delay: 5, rotation: true },
    ],
  };

  const shapes = shapeConfigs[density];

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          type={shape.type}
          size={shape.size}
          color={shape.color}
          initialX={shape.x}
          initialY={shape.y}
          duration={shape.duration}
          delay={shape.delay}
          rotation={shape.rotation}
        />
      ))}
    </div>
  );
}