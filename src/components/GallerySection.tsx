import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ZoomIn, Heart, Share2 } from 'lucide-react';
import heroForest from '@/assets/hero-forest.jpg';
import fishTankDining from '@/assets/fish-tank-dining.jpg';
import stoneInterior from '@/assets/stone-interior.jpg';
import forestInterior from '@/assets/forest-interior.jpg';

const galleryImages = [
  { src: heroForest, title: 'Evening Ambiance', likes: 234 },
  { src: fishTankDining, title: 'Aquarium Dining', likes: 456 },
  { src: stoneInterior, title: 'Cave Interiors', likes: 189 },
  { src: forestInterior, title: 'Garden Seating', likes: 321 },
  { src: heroForest, title: 'Candlelit Tables', likes: 278 },
  { src: fishTankDining, title: 'Private Booths', likes: 412 },
];

const GalleryCard = ({ image, index, isInView }: { 
  image: typeof galleryImages[0]; 
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="snap-item relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px]"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative rounded-2xl overflow-hidden hover-lift">
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-[250px] md:h-[350px] object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.6 }}
        />

        {/* Interactive buttons */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
        >
          <motion.button
            className="p-2 glass-card rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomIn className="w-4 h-4 text-foreground" />
          </motion.button>
          <motion.button
            className={`p-2 glass-card rounded-full ${isLiked ? 'bg-red-500/30' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'}`} />
          </motion.button>
          <motion.button
            className="p-2 glass-card rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-4 h-4 text-foreground" />
          </motion.button>
        </motion.div>
        
        {/* Title and info */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 10 }}
        >
          <h3 className="font-display text-xl text-foreground mb-2">
            {image.title}
          </h3>
          <div className="flex items-center gap-2 text-foreground/60 text-sm">
            <Heart className="w-4 h-4" />
            <span>{isLiked ? image.likes + 1 : image.likes} likes</span>
          </div>
        </motion.div>

        {/* Animated border */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border-2 border-accent/0"
          animate={{ borderColor: isHovered ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--accent) / 0)' }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner decorations on hover */}
        <motion.div
          className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-gold/50 rounded-tl-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-gold/50 rounded-br-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 mb-12">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block font-accent text-gold text-lg tracking-[0.2em] uppercase mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Gallery
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Where Every Table
            <br />
            <span className="text-accent">Has a Story</span>
          </h2>

          {/* Animated decorative element */}
          <motion.div
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-0.5 rounded-full bg-gold"
                animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="horizontal-scroll gap-6 px-4 md:px-8 pb-4"
      >
        {galleryImages.map((image, index) => (
          <GalleryCard key={index} image={image} index={index} isInView={isInView} />
        ))}
      </div>

      {/* Scroll hint with animation */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <motion.span 
          className="inline-flex items-center gap-3 text-foreground/40 text-sm glass-card px-4 py-2 rounded-full"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span animate={{ x: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ←
          </motion.span>
          <span>Drag to explore</span>
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            →
          </motion.span>
        </motion.span>
      </motion.div>
    </section>
  );
};

export default GallerySection;
