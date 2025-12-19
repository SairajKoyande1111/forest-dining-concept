import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';
import { GlowButton, MagneticButton } from './ui/MagneticButton';
import { Fireflies } from './ui/Particles';

const ReservationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-background" />
      
      {/* Fireflies */}
      <Fireflies count={15} />

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-0.5 h-full"
            style={{ left: `${20 + i * 15}%` }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scaleY: [1, 1.1, 1],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full border border-accent/20"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border border-gold/20"
        animate={{ 
          rotate: -360,
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-accent text-gold text-lg tracking-[0.2em] uppercase">
                Reserve Your Table
              </span>
              <Sparkles className="w-5 h-5 text-gold" />
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Book Your
              <br />
              <span className="text-accent">Forest Escape</span>
            </h2>
            <p className="max-w-xl mx-auto text-foreground/60 text-lg">
              Secure your spot in nature's embrace. Tables fill quickly—reserve yours today.
            </p>
          </motion.div>

          {/* Reservation Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Form shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              />

              <div className="grid md:grid-cols-3 gap-6 mb-8 relative z-10">
                {/* Date */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="block text-foreground/60 text-sm mb-2 uppercase tracking-wide">
                    Date
                  </label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Calendar className="w-5 h-5 text-accent/60 group-focus-within:text-accent" />
                    </motion.div>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Time */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="block text-foreground/60 text-sm mb-2 uppercase tracking-wide">
                    Time
                  </label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    >
                      <Clock className="w-5 h-5 text-accent/60 group-focus-within:text-accent" />
                    </motion.div>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </motion.div>

                {/* Guests */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="block text-foreground/60 text-sm mb-2 uppercase tracking-wide">
                    Guests
                  </label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Users className="w-5 h-5 text-accent/60 group-focus-within:text-accent" />
                    </motion.div>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                      <option value="10+">Large Party (10+)</option>
                    </select>
                  </div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8 relative z-10">
                {/* Name */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-foreground/60 text-sm mb-2 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    required
                  />
                </motion.div>

                {/* Phone */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-foreground/60 text-sm mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    required
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <div className="text-center relative z-10">
                <MagneticButton>
                  <GlowButton>
                    <Button 
                      type="submit" 
                      variant="gold" 
                      size="xl" 
                      className="min-w-[200px] relative overflow-hidden"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          <span>Booking...</span>
                        </motion.div>
                      ) : (
                        'Book Now'
                      )}
                    </Button>
                  </GlowButton>
                </MagneticButton>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="glass-card rounded-3xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Check className="w-10 h-10 text-accent" />
                </motion.div>
              </motion.div>
              <h3 className="font-display text-3xl text-foreground mb-4">Reservation Confirmed!</h3>
              <p className="text-foreground/60 mb-6">
                We've sent a confirmation to your phone. We can't wait to welcome you!
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
              >
                Make Another Reservation
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
