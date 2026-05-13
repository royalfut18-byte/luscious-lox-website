import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services, siteConfig } from '../data/siteData';

export default function Services() {
  return (
    <section id="services" className="py-28 sm:py-36 section-padding overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Services</span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
              What We <em>Offer</em>
            </h2>
          </motion.div>
          <motion.p
            className="self-end text-[15px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-md lg:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            From premium extensions to expert colour — every service is delivered with precision, care, and a luxury salon experience.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, idx) => (
            <motion.a
              key={service.title}
              href={siteConfig.bookingUrl}
              className="group relative bg-white rounded-[1.5rem] p-7 sm:p-9 border border-champagne/30 overflow-hidden"
              style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(176, 141, 87, 0.08)' }}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/[0.02] to-champagne/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem]" />

              <div className="relative">
                {/* Number + arrow */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-body font-bold tracking-[0.2em] text-muted-gold/50">0{idx + 1}</span>
                  <div className="w-9 h-9 rounded-full border border-espresso/8 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-muted-gold/25 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight size={13} className="text-muted-gold" />
                  </div>
                </div>

                <h3 className="font-heading text-[1.4rem] sm:text-[1.55rem] text-espresso italic leading-tight mb-3">{service.title}</h3>
                <p className="text-[13px] text-warm-gray/60 font-body leading-[1.7]">{service.desc}</p>

                {/* Bottom tag */}
                <div className="mt-6 pt-4 border-t border-champagne/25">
                  <span className="text-[9px] font-body font-bold tracking-[0.25em] uppercase text-muted-gold/40">{service.category}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
