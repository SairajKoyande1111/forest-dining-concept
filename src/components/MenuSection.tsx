import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Utensils, Flame, Star, ChefHat, Sparkles } from 'lucide-react';
import { SpotlightCard } from './ui/AnimatedCard';
import { GlowButton } from './ui/MagneticButton';

const menuCategories = [
  {
    name: 'Starters',
    description: 'Begin your journey with our forest-inspired appetizers',
    items: ['Wild Mushroom Soup', 'Garden Fresh Salad', 'Crispy Vegetable Rolls'],
    price: 'From ₹299',
    icon: Utensils,
    badge: 'Popular',
  },
  {
    name: 'Main Course',
    description: 'Signature dishes crafted with local, organic ingredients',
    items: ['Forest Herb Paneer', 'Stone-Grilled Vegetables', 'Clay Pot Biryani'],
    price: 'From ₹499',
    icon: Flame,
    badge: 'Chef Special',
  },
  {
    name: 'Special Thalis',
    description: 'Complete meal experiences celebrating regional flavors',
    items: ['Madhuvan Grand Thali', 'Forest Feast Thali', 'Garden Delight Thali'],
    price: 'From ₹699',
    icon: Star,
    badge: 'Must Try',
  },
  {
    name: 'Beverages',
    description: 'Refreshing drinks from nature\'s bounty',
    items: ['Herbal Infusions', 'Fresh Fruit Mocktails', 'Forest Berry Smoothies'],
    price: 'From ₹149',
    icon: ChefHat,
    badge: 'Fresh',
  },
];

const MenuCard = ({ category, index }: { category: typeof menuCategories[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = category.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SpotlightCard>
        <div className="glass-card rounded-3xl p-6 md:p-8 hover-lift relative overflow-hidden h-full">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-earth/50 to-transparent" />
          </div>

          {/* Animated corner decoration */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20"
            animate={{ opacity: isHovered ? 1 : 0.3 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-accent/20">
              <path d="M100 0 L100 100 L0 100 Q50 50 100 0" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30"
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {category.badge}
          </motion.div>

          {/* Hover leaf effect */}
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
              <path
                fill="currentColor"
                d="M50 0 C25 25, 0 50, 50 100 C100 50, 75 25, 50 0"
              />
            </svg>
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon and Title row */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                className="p-3 rounded-xl bg-accent/10 border border-accent/20"
                animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-6 h-6 text-accent" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <span className="text-gold font-display text-lg">{category.price}</span>
              </div>
            </div>

            <p className="text-foreground/60 text-sm mb-6">
              {category.description}
            </p>

            <ul className="space-y-3">
              {category.items.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-foreground/80 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                >
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-accent/60"
                    animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ delay: i * 0.1 }}
                  />
                  <span className="group-hover:text-foreground transition-colors">{item}</span>
                  {i === 0 && (
                    <motion.span
                      className="ml-auto"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                    </motion.span>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom glow on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const MenuSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-earth/20 to-transparent" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block font-accent text-gold text-lg tracking-[0.2em] uppercase mb-4">
            Our Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            A Feast for
            <br />
            <span className="text-accent">All Senses</span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60 text-lg">
            Discover our carefully curated menu featuring organic ingredients
            and traditional recipes with a modern twist.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {menuCategories.map((category, index) => (
            <MenuCard key={category.name} category={category} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlowButton>
            <Button variant="gold" size="xl">
              View Full Menu
            </Button>
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
