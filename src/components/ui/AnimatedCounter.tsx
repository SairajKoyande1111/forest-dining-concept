import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2,
  className = '' 
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.floor(current)}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

// Animated stat card with counter
export const StatCard = ({ 
  value, 
  label, 
  suffix = '',
  icon: Icon 
}: { 
  value: number; 
  label: string; 
  suffix?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-6 rounded-2xl text-center relative overflow-hidden">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Icon */}
        {Icon && (
          <motion.div
            className="flex justify-center mb-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-3 rounded-xl bg-accent/20 border border-accent/30">
              <Icon className="w-6 h-6 text-accent" />
            </div>
          </motion.div>
        )}

        {/* Counter */}
        <AnimatedCounter 
          value={value} 
          suffix={suffix}
          className="block font-display text-4xl text-gold relative z-10"
        />
        
        {/* Label */}
        <span className="text-foreground/60 text-sm uppercase tracking-wide mt-2 block relative z-10">
          {label}
        </span>

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </motion.div>
  );
};
