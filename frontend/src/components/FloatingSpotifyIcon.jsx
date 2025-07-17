'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingSpotifyIcon() {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const x = window.innerWidth - 80;
    const y = window.innerHeight / 2 - 30;
    setPosition({ x, y });

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
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.start({ scale: 1.2, rotate: 0 });
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);

    setPosition({
      x: info.point.x,
      y: info.point.y,
    });

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
    const next = !isOpen;
    setIsOpen(next);

    if (!next) {
      // Closing — resume spinning
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          duration: 10,
          ease: 'linear',
        },
      });
    } else {
      // Opening — stop spinning
      controls.stop();

      // Check and adjust position if it overflows
      const rectWidth = 250;
      const rectHeight = 100;
      const padding = 20;

      let newX = position.x;
      let newY = position.y;

      if (newX + rectWidth > window.innerWidth - padding) {
        newX = window.innerWidth - rectWidth - padding;
      }
      if (newX < padding) {
        newX = padding;
      }

      if (newY + rectHeight > window.innerHeight - padding) {
        newY = window.innerHeight - rectHeight - padding;
      }
      if (newY < padding) {
        newY = padding;
      }

      setPosition({ x: newX, y: newY });
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{
        x: position.x,
        y: position.y,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
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
            e.stopPropagation();
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
