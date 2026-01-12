import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedMap = () => {
  const [shipProgress, setShipProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setShipProgress((prev) => {
        if (prev >= 1) {
          setDirection(-1);
          return 0.99;
        }
        if (prev <= 0 && direction === -1) {
          setDirection(1);
          return 0.01;
        }
        return prev + direction * 0.008;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  // Calculate ship position along the route
  const getShipPosition = (progress: number) => {
    // Bezier curve from China to India
    const startX = 380; // China
    const startY = 120;
    const controlX = 300;
    const controlY = 200;
    const endX = 180;  // India
    const endY = 180;

    const t = progress;
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
    
    return { x, y };
  };

  const shipPos = getShipPosition(shipProgress);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/10]">
      <svg
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background gradient */}
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
            <stop offset="50%" stopColor="hsl(187, 92%, 69%)" />
            <stop offset="100%" stopColor="hsl(199, 89%, 48%)" />
          </linearGradient>
        </defs>

        <rect width="500" height="300" fill="url(#mapGlow)" />

        {/* Simplified Asia Map Outline */}
        <motion.path
          d="M100 80 L150 60 L200 55 L250 50 L300 45 L350 50 L400 60 L430 80 L450 100 L460 130 L455 160 L440 190 L410 220 L370 240 L330 250 L290 245 L250 240 L210 230 L170 210 L140 185 L120 160 L105 130 L100 100 Z"
          fill="none"
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* China Region */}
        <motion.ellipse
          cx="380"
          cy="120"
          rx="50"
          ry="40"
          fill="hsl(199, 89%, 48%)"
          fillOpacity="0.2"
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.text
          x="380"
          y="125"
          textAnchor="middle"
          fill="hsl(222, 47%, 11%)"
          fontSize="14"
          fontWeight="600"
          fontFamily="Space Grotesk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          CHINA
        </motion.text>

        {/* India Region */}
        <motion.ellipse
          cx="180"
          cy="180"
          rx="45"
          ry="55"
          fill="hsl(199, 89%, 48%)"
          fillOpacity="0.2"
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
        <motion.text
          x="180"
          y="185"
          textAnchor="middle"
          fill="hsl(222, 47%, 11%)"
          fontSize="14"
          fontWeight="600"
          fontFamily="Space Grotesk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          INDIA
        </motion.text>

        {/* Trade Route - Glowing Path */}
        <motion.path
          d="M380 120 Q300 200 180 180"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 4"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />

        {/* Animated route glow effect */}
        <motion.path
          d="M380 120 Q300 200 180 180"
          fill="none"
          stroke="hsl(187, 92%, 69%)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.3"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatDelay: 1 
          }}
        />

        {/* Ship icon */}
        <motion.g
          style={{
            transform: `translate(${shipPos.x - 15}px, ${shipPos.y - 10}px) scaleX(${direction})`,
          }}
        >
          {/* Ship hull */}
          <path
            d="M0 12 L15 16 L30 12 L27 20 H3 L0 12Z"
            fill="hsl(199, 89%, 48%)"
            stroke="hsl(222, 47%, 11%)"
            strokeWidth="1"
          />
          {/* Deck */}
          <rect x="8" y="6" width="14" height="6" rx="1" fill="hsl(199, 89%, 58%)" stroke="hsl(222, 47%, 11%)" strokeWidth="0.5" />
          {/* Mast */}
          <rect x="14" y="0" width="2" height="8" fill="hsl(222, 47%, 11%)" />
          {/* Flag */}
          <path d="M16 0 L24 3 L16 6Z" fill="hsl(187, 92%, 69%)" />
          
          {/* Wake effect */}
          <motion.ellipse
            cx="15"
            cy="22"
            rx="8"
            ry="3"
            fill="hsl(199, 89%, 48%)"
            fillOpacity="0.3"
            animate={{ 
              rx: [8, 12, 8],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* Port markers */}
        <motion.circle
          cx="380"
          cy="120"
          r="8"
          fill="hsl(199, 89%, 48%)"
          animate={{ 
            r: [8, 12, 8],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="180"
          cy="180"
          r="8"
          fill="hsl(199, 89%, 48%)"
          animate={{ 
            r: [8, 12, 8],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />

        {/* Container icons floating */}
        <motion.rect
          x="280"
          y="140"
          width="16"
          height="10"
          rx="1"
          fill="hsl(222, 47%, 11%)"
          fillOpacity="0.6"
          animate={{ y: [140, 135, 140] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.rect
          x="250"
          y="170"
          width="12"
          height="8"
          rx="1"
          fill="hsl(199, 89%, 48%)"
          fillOpacity="0.6"
          animate={{ y: [170, 165, 170] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* Water ripple effects */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full h-20 pointer-events-none overflow-hidden opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 bottom-0 w-40 h-10 border-2 border-primary/30 rounded-full"
            style={{ 
              originX: 0.5,
              originY: 1,
            }}
            animate={{
              scaleX: [1, 2, 3],
              scaleY: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedMap;
