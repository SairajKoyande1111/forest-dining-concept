import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Leaf, Fish, Mountain, Lightbulb, ArrowRight } from 'lucide-react';
import forestInterior from '@/assets/forest-interior.jpg';
import fishTankDining from '@/assets/fish-tank-dining.jpg';
import stoneInterior from '@/assets/stone-interior.jpg';
import { SpotlightCard, BorderAnimatedCard } from './ui/AnimatedCard';
import { AnimatedIcon } from './ui/AnimatedIcon';
import { Fireflies } from './ui/Particles';

const experiences = [
  {
    icon: Leaf,
    title: 'Forest Interiors',
    description: 'Immerse yourself in a lush green paradise with hanging plants, vines, and natural foliage surrounding every table.',
    image: forestInterior,
    color: 'accent',
  },
  {
    icon: Fish,
    title: 'Fish Tank Dining',
    description: 'Dine beside mesmerizing aquariums filled with tropical fish, creating a serene underwater atmosphere.',
    image: fishTankDining,
    color: 'water',
  },
  {
    icon: Mountain,
    title: 'Stone & Cave Walls',
    description: 'Natural rock formations and cave-like architecture transport you to a mystical forest grotto.',
    image: stoneInterior,
    color: 'earth',
  },
  {
    icon: Lightbulb,
    title: 'Ambient Lighting',
    description: 'Warm, carefully designed lighting creates an intimate atmosphere that shifts with the time of day.',
    image: forestInterior,
    color: 'gold',
  },
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SpotlightCard className="h-full">
        <div className="glass-card rounded-3xl overflow-hidden hover-lift cursor-pointer h-full">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            
            {/* Animated Icon */}
            <motion.div 
              className="absolute bottom-4 left-4 p-3 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30"
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            >
              <AnimatedIcon 
                icon={experience.icon} 
                animate={isHovered ? 'bounce' : 'pulse'} 
                className="text-accent"
              />
            </motion.div>

            {/* View more indicator */}
            <motion.div
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            >
              <ArrowRight className="w-4 h-4 text-foreground" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
              {experience.title}
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {experience.description}
            </p>

            {/* Animated progress bar */}
            <motion.div
              className="mt-4 h-0.5 bg-border/30 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-gold"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--gold)/0.08),transparent_50%)]" />
      </div>

      {/* Fireflies */}
      <Fireflies count={15} />

      {/* Animated decorative lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block font-accent text-gold text-lg tracking-[0.2em] uppercase mb-4"
            animate={{ letterSpacing: ['0.2em', '0.3em', '0.2em'] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            The Experience
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Forest Dining
            <br />
            <span className="text-accent">Redefined</span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60 text-lg">
            Every corner of Madhuvan Greens tells a story of nature's beauty,
            crafted to create unforgettable dining moments.
          </p>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 mx-auto mt-6 rounded-full overflow-hidden bg-border/30"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-gold to-accent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-16 gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
