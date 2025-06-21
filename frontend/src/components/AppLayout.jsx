'use client';
import React, { useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const NUM_SNAKES = 5;
const GRID_SIZE = 40;

const COLORS = [
  '#569CD6', // Blue
  '#C586C0', // Purple
  '#DCDC9A', // Yellowish
  '#4EC9B0', // Teal
  '#CE9178', // Orange
];

const AppLayout = ({ children }) => {
  const snakes = useMemo(() => {
    return Array.from({ length: NUM_SNAKES }, (_, i) => {
      const startTop = Math.random() * 80;
      const startLeft = Math.random() * 80;

      const path = Array.from({ length: 4 }, () => {
        const dir = Math.random() > 0.5 ? 'x' : 'y';
        const distance = (1 + Math.floor(Math.random() * 3)) * GRID_SIZE;
        return { dir, distance };
      });

      return {
        id: i,
        color: COLORS[i % COLORS.length],
        top: startTop,
        left: startLeft,
        path,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      };
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a] text-gray-100 relative overflow-hidden">
      <Navbar />
      <main className="flex-1 relative flex flex-col">
        {/* BASE GRID */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#1a1f36 1px, transparent 1px),
                              linear-gradient(90deg, #1a1f36 1px, transparent 1px)`,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            opacity: 0.25,
          }}
        />

        {/* SNAKE TRAILS */}
        {snakes.map((snake) =>
          Array.from({ length: 5 }, (_, seg) => (
            <motion.div
              key={`${snake.id}-seg${seg}`}
              style={{
                top: `${snake.top}%`,
                left: `${snake.left}%`,
                position: 'absolute',
                background: snake.color,
                boxShadow: `0px 0px ${8 - seg}px ${snake.color}`,
                height: '2px',
                width: '2px',
                opacity: Math.max(0.1, 1 - seg / 5),
              }}
              animate={{
                x: snake.path.flatMap((p) =>
                  p.dir === 'x' ? [0, p.distance] : [0, 0]
                ),
                y: snake.path.flatMap((p) =>
                  p.dir === 'y' ? [0, p.distance] : [0, 0]
                ),
              }}
              transition={{
                times: Array(snake.path.length * 2)
                  .fill(0)
                  .map((_, i) => i / (snake.path.length * 2)),
                duration: snake.duration,
                delay: snake.delay + seg * 0.1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))
        )}
        <div className="relative z-10 flex flex-col h-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
