import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Fireflies - glowing dots
export const Fireflies = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)',
            boxShadow: `0 0 ${particle.size * 3}px hsl(var(--gold) / 0.6)`,
          }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0.8, 1.2, 1, 1.3, 0.8],
            x: [0, 20, -10, 15, 0],
            y: [0, -30, 20, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Floating orbs with glow
export const FloatingOrbs = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 150 + i * 30,
            height: 150 + i * 30,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--gold) / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, -30, 40, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Sparkle effect
export const Sparkle = ({ className = '' }: { className?: string }) => (
  <motion.svg
    className={`absolute w-4 h-4 text-gold ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
  </motion.svg>
);

// Multiple sparkles
export const Sparkles = ({ count = 8 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 3,
          repeat: Infinity,
        }}
      >
        <Sparkle />
      </motion.div>
    ))}
  </div>
);

// Animated gradient background
export const AnimatedGradient = () => (
  <motion.div
    className="absolute inset-0 opacity-30"
    animate={{
      background: [
        'radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.2) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.2) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, hsl(var(--gold) / 0.15) 0%, transparent 50%)',
        'radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.2) 0%, transparent 50%)',
      ],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// Pulse ring effect
export const PulseRing = ({ color = 'accent' }: { color?: string }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full border-2 border-${color}/30`}
        initial={{ width: 40, height: 40, opacity: 0 }}
        animate={{
          width: [40, 120],
          height: [40, 120],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 2,
          delay: i * 0.6,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

// Glowing line
export const GlowingLine = ({ vertical = false }: { vertical?: boolean }) => (
  <motion.div
    className={`${vertical ? 'w-px h-full' : 'h-px w-full'} bg-gradient-to-r from-transparent via-accent to-transparent`}
    animate={{
      opacity: [0.3, 0.8, 0.3],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);
