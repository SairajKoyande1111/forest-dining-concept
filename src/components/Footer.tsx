import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart, Leaf } from 'lucide-react';
import { Fireflies } from './ui/Particles';

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-background to-transparent" />
      
      {/* Fireflies */}
      <Fireflies count={10} />

      {/* Animated vine decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <motion.div 
          className="h-1 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <svg className="absolute top-0 left-0 w-full" height="40" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <motion.path
            d="M0,20 Q360,40 720,20 T1440,20"
            stroke="hsl(var(--accent) / 0.3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <motion.h3 
              className="font-display text-2xl text-foreground mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gradient-gold">Madhuvan</span>
              <span className="text-accent"> Greens</span>
            </motion.h3>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6">
              An immersive forest dining experience where nature meets exceptional cuisine.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-3 glass-card rounded-xl hover:bg-accent/20 transition-colors group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5 text-foreground/70 group-hover:text-accent transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-accent" />
              Explore
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Experience', 'Menu', 'Gallery', 'Events'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a 
                    href="#" 
                    className="text-foreground/60 hover:text-gold transition-colors text-sm inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display text-lg text-foreground mb-4">Hours</h4>
            <ul className="space-y-4 text-foreground/60 text-sm">
              {[
                { label: 'Lunch', time: '12:00 PM - 3:30 PM' },
                { label: 'Dinner', time: '6:00 PM - 11:00 PM' },
                { label: 'Sunday Brunch', time: '10:00 AM - 3:00 PM' },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  className="glass-card p-3 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-foreground font-medium">{item.label}</span>
                  <br />{item.time}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-display text-lg text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              {[
                { 
                  icon: MapPin, 
                  content: '123 Forest Lane, Green Valley,\nMumbai, Maharashtra 400001',
                  href: '#'
                },
                { 
                  icon: Phone, 
                  content: '+91 98765 43210',
                  href: 'tel:+919876543210'
                },
                { 
                  icon: Mail, 
                  content: 'hello@madhuvangreens.com',
                  href: 'mailto:hello@madhuvangreens.com'
                },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 text-foreground/60 text-sm group"
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="p-2 rounded-lg bg-accent/10 mt-0.5"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  </motion.div>
                  <a 
                    href={item.href} 
                    className="hover:text-gold transition-colors whitespace-pre-line"
                  >
                    {item.content}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-foreground/40 text-sm flex items-center gap-2">
            © 2024 Madhuvan Greens. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            for nature lovers.
          </p>
          <div className="flex gap-6 text-foreground/40 text-sm">
            <motion.a 
              href="#" 
              className="hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>

        {/* Back to top button */}
        <motion.button
          className="fixed bottom-8 right-8 p-3 glass-card rounded-full z-50 hover:bg-accent/20 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↑
          </motion.span>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
