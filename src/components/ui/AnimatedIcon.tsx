import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  animate?: 'pulse' | 'bounce' | 'spin' | 'float' | 'glow';
  size?: number;
}

export const AnimatedIcon = ({ 
  icon: Icon, 
  className = '', 
  animate = 'pulse',
  size = 24 
}: AnimatedIconProps) => {
  const animations = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity } as const
    },
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 1.5, repeat: Infinity } as const
    },
    spin: {
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: 'linear' as const }
    },
    float: {
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
    },
    glow: {
      filter: ['drop-shadow(0 0 0px hsl(var(--accent)))', 'drop-shadow(0 0 15px hsl(var(--accent)))', 'drop-shadow(0 0 0px hsl(var(--accent)))'],
      transition: { duration: 2, repeat: Infinity } as const
    }
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={animations[animate]}
    >
      <Icon size={size} />
    </motion.div>
  );
};

// Icon with hover effects
export const InteractiveIcon = ({ 
  icon: Icon, 
  className = '',
  size = 24,
  glowColor = 'accent'
}: {
  icon: LucideIcon;
  className?: string;
  size?: number;
  glowColor?: string;
}) => (
  <motion.div
    className={`relative inline-flex cursor-pointer ${className}`}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {/* Glow background */}
    <motion.div
      className={`absolute inset-0 rounded-full bg-${glowColor}/30 blur-xl`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileHover={{ opacity: 1, scale: 1.5 }}
      transition={{ duration: 0.3 }}
    />
    <Icon size={size} className="relative z-10" />
  </motion.div>
);

// Rotating icon badge
export const IconBadge = ({
  icon: Icon,
  label,
  className = ''
}: {
  icon: LucideIcon;
  label?: string;
  className?: string;
}) => (
  <motion.div 
    className={`flex flex-col items-center gap-2 ${className}`}
    whileHover={{ y: -5 }}
  >
    <motion.div
      className="relative p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30"
      whileHover={{ rotate: 5 }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.5), transparent) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <Icon className="w-8 h-8 text-accent relative z-10" />
    </motion.div>
    {label && (
      <span className="text-sm text-foreground/70">{label}</span>
    )}
  </motion.div>
);
