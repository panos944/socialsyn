'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function TestOrb() {
  return (
    <motion.div
      className="absolute w-32 h-32 bg-red-500 rounded-full opacity-50"
      style={{
        left: '20%',
        top: '30%',
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function TestBackground() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <TestOrb />
      <div className="absolute top-4 left-4 text-black bg-white p-2 rounded">
        Background Active
      </div>
    </div>
  );
}