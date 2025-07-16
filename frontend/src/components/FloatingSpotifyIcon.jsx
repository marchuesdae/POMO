'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingSpotifyIcon() {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Set starting position to right-center after mount
    const x = window.innerWidth - 80; // 60px width + margin
    const y = window.innerHeight / 2 - 30; // center minus half height
    setInitialPos({ x, y });

    // Start infinite spin
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 10,
        ease: 'linear',
      },
    });
  }, [controls]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.start({ scale: 1.2, rotate: 0 });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    controls.start({
      scale: 1,
      rotate: 360,
      transition: {
        scale: { duration: 0.2 },
        rotate: {
          repeat: Infinity,
          duration: 10,
          ease: 'linear',
        },
      },
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ x: initialPos.x, y: initialPos.y }}
      animate={{ x: initialPos.x, y: initialPos.y }}
      style={{
        width: 60,
        height: 60,
        position: 'fixed',
        cursor: 'grab',
        zIndex: 999,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <motion.img
        src="/vinyl.jpg"
        alt="Record Icon"
        animate={controls}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          pointerEvents: 'none',
          boxShadow: isDragging
            ? '0 0 15px rgba(0,255,0,0.8)'
            : '0 0 10px rgba(0,255,0,0.5)',
        }}
      />
    </motion.div>
  );
}
