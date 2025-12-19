import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, UtensilsCrossed, Star } from 'lucide-react';
import forestInterior from '@/assets/forest-interior.jpg';
import { AnimatedCounter, StatCard } from './ui/AnimatedCounter';
import { Sparkles } from './ui/Particles';
import { TiltCard, FloatingCard } from './ui/AnimatedCard';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-50" />
      
      {/* Sparkle effects */}
      <Sparkles count={6} />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <motion.span 
              className="inline-flex items-center gap-2 font-accent text-gold text-lg tracking-[0.2em] uppercase mb-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                ✦
              </motion.span>
              Our Story
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                ✦
              </motion.span>
            </motion.span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Where Nature
              <br />
              <span className="text-accent">Meets Cuisine</span>
            </h2>

            <div className="space-y-6 text-foreground/70 font-body text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-accent text-xl italic text-foreground/90 relative"
              >
                <span className="absolute -left-4 top-0 text-gold text-3xl">"</span>
                A place where stone walls breathe,
                <br />
                water whispers, and food becomes an experience.
                <span className="text-gold text-3xl">"</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Nestled amidst lush greenery, Madhuvan Greens offers a unique
                dining sanctuary where every meal is an immersive journey through
                nature's embrace.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Our forest-themed interiors, natural stone architecture, and
                mesmerizing aquarium installations create an ambiance that
                transcends ordinary dining into an extraordinary experience.
              </motion.p>
            </div>

            {/* Stats with animated counters */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="text-center group">
                <motion.div
                  className="inline-block mb-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Award className="w-6 h-6 text-gold mx-auto" />
                </motion.div>
                <AnimatedCounter 
                  value={15} 
                  suffix="+" 
                  className="block font-display text-3xl md:text-4xl text-gold"
                />
                <span className="text-foreground/60 text-sm uppercase tracking-wide">Years</span>
              </div>
              <div className="text-center group">
                <motion.div
                  className="inline-block mb-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Users className="w-6 h-6 text-gold mx-auto" />
                </motion.div>
                <AnimatedCounter 
                  value={50} 
                  suffix="K+" 
                  className="block font-display text-3xl md:text-4xl text-gold"
                />
                <span className="text-foreground/60 text-sm uppercase tracking-wide">Happy Guests</span>
              </div>
              <div className="text-center group">
                <motion.div
                  className="inline-block mb-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <UtensilsCrossed className="w-6 h-6 text-gold mx-auto" />
                </motion.div>
                <AnimatedCounter 
                  value={100} 
                  suffix="+" 
                  className="block font-display text-3xl md:text-4xl text-gold"
                />
                <span className="text-foreground/60 text-sm uppercase tracking-wide">Dishes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image with organic shape */}
          <motion.div
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TiltCard className="relative">
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-4 border-2 border-accent/20 rounded-3xl transform rotate-3"
                animate={{ rotate: [3, 5, 3] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -inset-4 border-2 border-gold/20 rounded-3xl transform -rotate-3"
                animate={{ rotate: [-3, -5, -3] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-depth group">
                <img
                  src={forestInterior}
                  alt="Forest interior dining"
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Floating badge */}
              <FloatingCard className="absolute -bottom-6 -left-6">
                <div className="glass-card px-6 py-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Star className="w-6 h-6 text-gold fill-gold" />
                    </motion.div>
                    <span className="text-gold font-display text-2xl">4.9</span>
                  </div>
                  <span className="block text-foreground/60 text-sm">Guest Rating</span>
                </div>
              </FloatingCard>

              {/* Additional floating element */}
              <motion.div
                className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-accent text-sm font-medium">🌿 Eco-Friendly</span>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
