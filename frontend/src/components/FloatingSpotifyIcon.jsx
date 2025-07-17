'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingSpotifyIcon() {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const x = window.innerWidth - 80;
    const y = window.innerHeight / 2 - 30;
    setInitialPos({ x, y });

    if (!isOpen) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          duration: 10,
          ease: 'linear',
        },
      });
    }
  }, [controls, isOpen]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.start({ scale: 1.2, rotate: 0 });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isOpen) {
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
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // resume spinning when closing
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          duration: 10,
          ease: 'linear',
        },
      });
    } else {
      controls.stop(); // stop spinning
    }
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
        width: isOpen ? 250 : 60,
        height: isOpen ? 100 : 60,
        borderRadius: isOpen ? 12 : '50%',
        position: 'fixed',
        cursor: 'grab',
        zIndex: 999,
        userSelect: 'none',
        background: isOpen ? '#121212' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'space-between' : 'center',
        padding: isOpen ? '0 10px' : 0,
        boxShadow: isDragging
          ? '0 0 15px rgba(0,255,0,0.8)'
          : '0 0 10px rgba(0,255,0,0.5)',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
      whileDrag={{ cursor: 'grabbing' }}
      onClick={toggleOpen}
    >
      <motion.img
        src="/vinyl.jpg"
        alt="Record Icon"
        animate={controls}
        style={{
          width: isOpen ? 50 : '100%',
          height: isOpen ? 50 : '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
      {isOpen && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation(); // avoid triggering toggleOpen again
            setIsOpen(false);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 20,
            cursor: 'pointer',
            marginLeft: 10,
          }}
        >
          ✖
        </motion.button>
      )}
    </motion.div>
  );
}
