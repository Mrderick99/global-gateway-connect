import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main ship cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${isHovering ? 'drop-shadow-[0_0_10px_hsl(199,89%,48%)]' : ''}`}
        >
          {/* Ship hull */}
          <path
            d="M6 18L16 22L26 18L24 24H8L6 18Z"
            fill={isHovering ? "hsl(199, 89%, 58%)" : "hsl(199, 89%, 48%)"}
            stroke="hsl(222, 47%, 11%)"
            strokeWidth="1.5"
          />
          {/* Ship deck */}
          <rect
            x="11"
            y="14"
            width="10"
            height="4"
            rx="1"
            fill={isHovering ? "hsl(199, 89%, 58%)" : "hsl(199, 89%, 48%)"}
            stroke="hsl(222, 47%, 11%)"
            strokeWidth="1"
          />
          {/* Mast */}
          <rect x="15" y="6" width="2" height="10" fill="hsl(222, 47%, 11%)" />
          {/* Flag */}
          <path
            d="M17 6L24 9L17 12V6Z"
            fill={isHovering ? "hsl(187, 92%, 69%)" : "hsl(199, 89%, 48%)"}
          />
          {/* Smoke */}
          <motion.circle
            cx="20"
            cy="12"
            r="2"
            fill="hsl(0, 0%, 80%)"
            animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-3 h-3 rounded-full bg-primary/30"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      />
    </>
  );
};

export default CustomCursor;
