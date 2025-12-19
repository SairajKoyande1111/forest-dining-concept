import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

// Card with spotlight effect following mouse
export const SpotlightCard = ({ children, className = '' }: AnimatedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      hsl(var(--accent) / 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
};

// Card with tilt effect
export const TiltCard = ({ children, className = '' }: AnimatedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Card with animated border
export const BorderAnimatedCard = ({ children, className = '' }: AnimatedCardProps) => (
  <div className={`relative group ${className}`}>
    {/* Animated border container */}
    <div className="absolute -inset-0.5 rounded-2xl overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--accent)), hsl(var(--gold)), hsl(var(--water)), hsl(var(--accent)))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
    
    {/* Card content */}
    <div className="relative glass-card rounded-2xl">
      {children}
    </div>
  </div>
);

// Card with shimmer loading effect
export const ShimmerCard = ({ children, className = '' }: AnimatedCardProps) => (
  <div className={`relative overflow-hidden ${className}`}>
    {children}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      initial={{ x: '-100%' }}
      animate={{ x: '200%' }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 3,
      }}
    />
  </div>
);

// Floating card with shadow
export const FloatingCard = ({ children, className = '' }: AnimatedCardProps) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ y: 0 }}
    animate={{
      y: [-5, 5, -5],
      rotateZ: [-0.5, 0.5, -0.5],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    whileHover={{
      scale: 1.02,
      rotateZ: 0,
    }}
  >
    {/* Dynamic shadow */}
    <motion.div
      className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full"
      animate={{
        scaleX: [0.9, 1, 0.9],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    {children}
  </motion.div>
);
