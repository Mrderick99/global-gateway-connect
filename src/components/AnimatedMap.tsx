import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Port {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  description: string;
  shipments: string;
}

const ports: Port[] = [
  {
    id: 'shanghai',
    name: 'Shanghai Port',
    country: 'China',
    x: 390,
    y: 110,
    description: 'Largest container port in the world',
    shipments: '47M+ TEU annually',
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen Port',
    country: 'China',
    x: 370,
    y: 135,
    description: 'Major electronics export hub',
    shipments: '28M+ TEU annually',
  },
  {
    id: 'mumbai',
    name: 'Mumbai Port (JNPT)',
    country: 'India',
    x: 160,
    y: 175,
    description: "India's largest container port",
    shipments: '5M+ TEU annually',
  },
  {
    id: 'chennai',
    name: 'Chennai Port',
    country: 'India',
    x: 195,
    y: 210,
    description: 'Gateway to South India',
    shipments: '1.5M+ TEU annually',
  },
];

interface CargoIcon {
  id: number;
  type: 'container' | 'box' | 'crate';
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const cargoIcons: CargoIcon[] = [
  { id: 1, type: 'container', x: 280, y: 140, delay: 0, duration: 3 },
  { id: 2, type: 'box', x: 250, y: 170, delay: 0.5, duration: 2.5 },
  { id: 3, type: 'container', x: 320, y: 155, delay: 1, duration: 2.8 },
  { id: 4, type: 'crate', x: 230, y: 145, delay: 0.3, duration: 3.2 },
  { id: 5, type: 'box', x: 300, y: 180, delay: 0.7, duration: 2.6 },
  { id: 6, type: 'container', x: 270, y: 125, delay: 1.2, duration: 3.5 },
];

const AnimatedMap = () => {
  const [shipProgress, setShipProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

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

  const getShipPosition = (progress: number) => {
    const startX = 380;
    const startY = 120;
    const controlX = 300;
    const controlY = 200;
    const endX = 180;
    const endY = 180;

    const t = progress;
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
    
    return { x, y };
  };

  const shipPos = getShipPosition(shipProgress);

  const renderCargoIcon = (cargo: CargoIcon) => {
    switch (cargo.type) {
      case 'container':
        return (
          <motion.g key={cargo.id}>
            {/* Shipping container */}
            <motion.rect
              x={cargo.x}
              y={cargo.y}
              width="18"
              height="10"
              rx="1"
              fill="hsl(199, 89%, 48%)"
              stroke="hsl(222, 47%, 11%)"
              strokeWidth="0.5"
              animate={{ 
                y: [cargo.y, cargo.y - 8, cargo.y],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
            {/* Container ridges */}
            <motion.line
              x1={cargo.x + 5}
              y1={cargo.y}
              x2={cargo.x + 5}
              y2={cargo.y + 10}
              stroke="hsl(222, 47%, 11%)"
              strokeWidth="0.3"
              animate={{ y: [cargo.y, cargo.y - 8, cargo.y] }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
            <motion.line
              x1={cargo.x + 13}
              y1={cargo.y}
              x2={cargo.x + 13}
              y2={cargo.y + 10}
              stroke="hsl(222, 47%, 11%)"
              strokeWidth="0.3"
              animate={{ y: [cargo.y, cargo.y - 8, cargo.y] }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
          </motion.g>
        );
      case 'box':
        return (
          <motion.g key={cargo.id}>
            {/* Cardboard box */}
            <motion.rect
              x={cargo.x}
              y={cargo.y}
              width="12"
              height="10"
              rx="0.5"
              fill="hsl(30, 60%, 55%)"
              stroke="hsl(30, 50%, 40%)"
              strokeWidth="0.5"
              animate={{ 
                y: [cargo.y, cargo.y - 6, cargo.y],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
            {/* Box tape */}
            <motion.line
              x1={cargo.x + 6}
              y1={cargo.y}
              x2={cargo.x + 6}
              y2={cargo.y + 10}
              stroke="hsl(45, 80%, 65%)"
              strokeWidth="1.5"
              animate={{ y: [cargo.y, cargo.y - 6, cargo.y] }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
          </motion.g>
        );
      case 'crate':
        return (
          <motion.g key={cargo.id}>
            {/* Wooden crate */}
            <motion.rect
              x={cargo.x}
              y={cargo.y}
              width="14"
              height="12"
              rx="0.5"
              fill="hsl(35, 45%, 45%)"
              stroke="hsl(35, 35%, 30%)"
              strokeWidth="0.5"
              animate={{ 
                y: [cargo.y, cargo.y - 5, cargo.y],
                rotate: [-1, 1, -1],
              }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
            {/* Crate slats */}
            <motion.line
              x1={cargo.x}
              y1={cargo.y + 4}
              x2={cargo.x + 14}
              y2={cargo.y + 4}
              stroke="hsl(35, 35%, 30%)"
              strokeWidth="0.3"
              animate={{ y: [cargo.y + 4, cargo.y - 1, cargo.y + 4] }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
            <motion.line
              x1={cargo.x}
              y1={cargo.y + 8}
              x2={cargo.x + 14}
              y2={cargo.y + 8}
              stroke="hsl(35, 35%, 30%)"
              strokeWidth="0.3"
              animate={{ y: [cargo.y + 8, cargo.y + 3, cargo.y + 8] }}
              transition={{ duration: cargo.duration, repeat: Infinity, delay: cargo.delay }}
            />
          </motion.g>
        );
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
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
            <filter id="portGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
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

          {/* Animated Cargo Icons */}
          {cargoIcons.map(renderCargoIcon)}

          {/* Floating particles along route */}
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => {
            const particlePos = getShipPosition(pos);
            return (
              <motion.circle
                key={`particle-${i}`}
                cx={particlePos.x}
                cy={particlePos.y}
                r="2"
                fill="hsl(187, 92%, 69%)"
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            );
          })}
        </svg>

        {/* Port Tooltips - Rendered as HTML overlays */}
        {ports.map((port) => (
          <Tooltip key={port.id}>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  left: `${(port.x / 500) * 100}%`,
                  top: `${(port.y / 300) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onHoverStart={() => setHoveredPort(port.id)}
                onHoverEnd={() => setHoveredPort(null)}
              >
                {/* Port marker with pulse effect */}
                <motion.div
                  className="relative"
                  animate={hoveredPort === port.id ? { scale: 1.3 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Outer pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 16, height: 16, margin: -4 }}
                  />
                  {/* Inner dot */}
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 border-background shadow-lg ${
                      hoveredPort === port.id 
                        ? 'bg-accent shadow-accent/50' 
                        : 'bg-primary shadow-primary/50'
                    }`}
                    animate={{
                      boxShadow: hoveredPort === port.id 
                        ? '0 0 20px hsl(187, 92%, 69%)' 
                        : '0 0 10px hsl(199, 89%, 48%)',
                    }}
                  />
                  {/* Port icon on hover */}
                  <AnimatePresence>
                    {hoveredPort === port.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M12 2L4 12h5v8h6v-8h5L12 2z" 
                            fill="hsl(199, 89%, 48%)" 
                            stroke="hsl(222, 47%, 11%)" 
                            strokeWidth="1"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-background/95 backdrop-blur-md border-primary/30 shadow-xl p-0 overflow-hidden"
            >
              <div className="p-3 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-bold text-foreground">{port.name}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-primary">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                    </svg>
                    {port.country}
                  </p>
                  <p className="text-muted-foreground">{port.description}</p>
                  <p className="text-primary font-medium flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-accent">
                      <rect x="2" y="8" width="20" height="12" rx="1" fill="currentColor"/>
                      <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" opacity="0.6"/>
                    </svg>
                    {port.shipments}
                  </p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            </TooltipContent>
          </Tooltip>
        ))}

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
    </TooltipProvider>
  );
};

export default AnimatedMap;
