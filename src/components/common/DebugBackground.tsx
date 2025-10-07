'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DebugBackground() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    console.log('DebugBackground mounted!');
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* Fixed indicator to confirm component is rendering */}
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-2 rounded">
        Background Component Active
      </div>

      {/* Simple animated element */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute w-20 h-20 bg-blue-500 opacity-50 rounded-full"
          style={{
            left: '10%',
            top: '20%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-16 h-16 bg-green-500 opacity-60 rounded-full"
          style={{
            right: '15%',
            top: '40%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-12 h-12 bg-purple-500 opacity-70 rounded-full"
          style={{
            left: '50%',
            bottom: '30%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
}