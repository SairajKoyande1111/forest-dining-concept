import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Fish, Waves, Droplets, Eye } from 'lucide-react';
import fishTankDining from '@/assets/fish-tank-dining.jpg';
import { AnimatedIcon } from './ui/AnimatedIcon';
import { FloatingCard } from './ui/AnimatedCard';

// Animated fish component
const SwimmingFish = ({ delay, y }: { delay: number; y: string }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top: y }}
    initial={{ x: '-10%', opacity: 0 }}
    animate={{
      x: ['110%', '-10%'],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <Fish className="w-6 h-6 text-water/40" style={{ transform: 'scaleX(-1)' }} />
  </motion.div>
);

const FishTankSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const waterLevel = useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden water-ripple"
    >
      {/* Water gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-water/10 to-background" />
      
      {/* Animated water glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-water/20 via-transparent to-transparent"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Swimming fish */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <SwimmingFish key={i} delay={i * 3} y={`${20 + i * 15}%`} />
        ))}
      </div>

      {/* Floating bubbles - enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + i * 5}%`,
              bottom: 0,
              width: 4 + Math.random() * 8,
              height: 4 + Math.random() * 8,
              background: 'radial-gradient(circle, hsl(var(--water) / 0.5) 0%, hsl(var(--water) / 0.1) 100%)',
            }}
            animate={{
              y: [0, '-100vh'],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Animated wave lines */}
      <svg className="absolute bottom-0 left-0 w-full h-20 text-water/20" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z"
          fill="currentColor"
          animate={{
            d: [
              "M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z",
              "M0,60 C360,10 720,90 1080,40 C1260,65 1380,35 1440,60 L1440,100 L0,100 Z",
              "M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 font-accent text-water text-lg tracking-[0.2em] uppercase mb-4"
            >
              <AnimatedIcon icon={Waves} animate="float" className="text-water" size={20} />
              Signature Experience
            </motion.span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Dine Beside
              <br />
              <span className="text-water relative">
                Living Waters
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-water/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h2>

            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Our spectacular aquarium installations transform your meal into an
              underwater journey. Watch colorful tropical fish glide past as you
              savor each bite, creating a dining experience unlike any other.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { text: 'Panoramic floor-to-ceiling aquariums', icon: Eye },
                { text: 'Over 200 species of tropical fish', icon: Fish },
                { text: 'Custom-designed underwater lighting', icon: Waves },
                { text: 'Private aquarium booth seating', icon: Droplets },
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-4 text-foreground/80 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-water/10 border border-water/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-4 h-4 text-water" />
                  </motion.div>
                  <span className="group-hover:text-water transition-colors">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="group inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full text-water font-display text-lg tracking-wide hover:bg-water/10 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>Discover More</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Image with parallax */}
          <motion.div
            className="relative"
            style={{ y }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-depth group">
              <motion.img
                src={fishTankDining}
                alt="Fish tank dining experience"
                className="w-full h-[500px] lg:h-[600px] object-cover"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.7 }}
              />
              {/* Water shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-water/20 via-transparent to-water/10" />
              
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 50%, hsl(var(--water) / 0.2), transparent 50%)',
                    'radial-gradient(circle at 70% 50%, hsl(var(--water) / 0.2), transparent 50%)',
                    'radial-gradient(circle at 30% 50%, hsl(var(--water) / 0.2), transparent 50%)',
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Bubble particles on image */}
              {isHovered && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/30"
                      initial={{
                        x: Math.random() * 400,
                        y: 400,
                        opacity: 0,
                      }}
                      animate={{
                        y: -100,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating stats cards */}
            <FloatingCard className="absolute -top-6 -right-6">
              <div className="glass-card px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Fish className="w-5 h-5 text-water" />
                  </motion.div>
                  <span className="text-foreground font-display text-lg">200+</span>
                </div>
                <span className="text-foreground/60 text-xs">Fish Species</span>
              </div>
            </FloatingCard>

            <FloatingCard className="absolute -bottom-6 -left-6">
              <div className="glass-card px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Droplets className="w-5 h-5 text-water" />
                  </motion.div>
                  <span className="text-foreground font-display text-lg">50K</span>
                </div>
                <span className="text-foreground/60 text-xs">Litres of Water</span>
              </div>
            </FloatingCard>

            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-water/20 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-water/10 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FishTankSection;
