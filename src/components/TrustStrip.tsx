import { motion } from 'framer-motion';
import { Star, MapPin, Award, Gem } from 'lucide-react';

const items = [
  { icon: Star, text: '5.0 Google Rating' },
  { icon: Award, text: 'Extension Specialists' },
  { icon: MapPin, text: 'Leichhardt, Sydney' },
  { icon: Gem, text: 'Premium Remy Hair' },
];

export default function TrustStrip() {
  return (
    <motion.section
      className="py-6 sm:py-8 border-y border-champagne/25 bg-ivory/50 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 sm:gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <item.icon size={15} className="text-muted-gold" />
              <span className="text-[12px] font-body font-semibold text-espresso/50 tracking-wide">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
