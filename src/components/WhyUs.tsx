import { motion } from 'framer-motion';
import { Award, Star, Heart, Gem, MapPin, Users, Palette, Crown } from 'lucide-react';

const points = [
  { icon: Crown, title: 'Celebrity Expertise', desc: 'Trained celebrity hairdresser with years of editorial and high-profile styling experience.' },
  { icon: Gem, title: 'Undetectable Extensions', desc: 'Specialising in nano and tape methods that blend seamlessly and look naturally yours.' },
  { icon: Heart, title: 'Premium Hair Quality', desc: 'Ethically sourced, premium Remy human hair for natural movement and lasting results.' },
  { icon: Star, title: '5-Star Reviewed', desc: 'Consistently rated 5 stars for quality, service and transformative results.' },
  { icon: MapPin, title: 'Leichhardt Location', desc: 'Conveniently located on Parramatta Rd — easy access from across Sydney.' },
  { icon: Users, title: 'Personal Consultations', desc: 'One-on-one sessions to understand your goals and tailor the ideal solution.' },
  { icon: Palette, title: 'Expert Colour Matching', desc: 'Professional colour analysis for a seamless, natural blend every time.' },
  { icon: Award, title: 'Premium Experience', desc: 'A luxury experience from your first consultation through to the final reveal.' },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="section-gap section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-rose-tint/30 to-ivory pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="label-sm mb-5 block">The Difference</span>
          <h2 className="font-heading text-hero font-light text-espresso">
            Why <span className="italic">Luscious Lox</span>
          </h2>
          <p className="mt-6 section-intro mx-auto">
            A premium salon experience backed by celebrity expertise and an obsession with perfection.
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {points.map((point, idx) => (
            <motion.div
              key={point.title}
              className={`group relative bg-white rounded-[1.5rem] p-7 sm:p-8 border border-champagne/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                idx === 0 || idx === 7 ? 'lg:col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne/60 to-muted-gold/10 border border-muted-gold/10 flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-500">
                <point.icon size={20} className="text-muted-gold" />
              </div>
              <h4 className="font-heading text-[1.3rem] text-espresso mb-2">{point.title}</h4>
              <p className="text-[13px] text-warm-gray font-body leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
