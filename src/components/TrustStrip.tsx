import { motion } from 'framer-motion';
import { Star, MapPin, Award, Gem } from 'lucide-react';

const items = [
  { icon: Star, label: '5.0 Google Rating', sub: '5-star reviewed' },
  { icon: Award, label: 'Extension Specialists', sub: 'Nano · Tape · Remy' },
  { icon: MapPin, label: 'Leichhardt, Sydney', sub: '419 Parramatta Rd' },
  { icon: Gem, label: 'Premium Hair', sub: 'Remy & European' },
];

export default function TrustStrip() {
  return (
    <section className="relative py-8 sm:py-10 border-y border-champagne/30 bg-ivory/60">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0">
                <item.icon size={17} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso leading-tight">{item.label}</p>
                <p className="text-[11px] font-body text-warm-gray/60 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
