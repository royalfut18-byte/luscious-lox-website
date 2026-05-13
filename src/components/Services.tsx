import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services, siteConfig } from '../data/siteData';

export default function Services() {
  return (
    <section id="services" className="section-gap section-padding">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">What We Offer</span>
          </div>
          <h2 className="font-heading text-section text-espresso">
            Our <span className="italic">Services</span>
          </h2>
          <p className="mt-5 section-desc">
            From premium hair extensions to expert colouring and keratin treatments — every service is delivered with precision and luxury care.
          </p>
        </motion.div>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, idx) => (
            <motion.a
              key={service.title}
              href={siteConfig.bookingUrl}
              className="group card-premium p-7 sm:p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/0 to-champagne/0 group-hover:from-muted-gold/[0.03] group-hover:to-champagne/10 transition-all duration-700 rounded-[1.5rem]" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading text-[1.4rem] sm:text-[1.55rem] text-espresso italic leading-tight">{service.title}</h3>
                  <div className="w-8 h-8 rounded-full border border-espresso/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-muted-gold/30">
                    <ArrowUpRight size={14} className="text-muted-gold" />
                  </div>
                </div>
                <p className="text-[13.5px] text-warm-gray/70 font-body leading-relaxed">{service.desc}</p>
              </div>

              <div className="relative mt-5 pt-4 border-t border-champagne/30">
                <span className="text-[10px] font-body font-bold tracking-[0.2em] uppercase text-muted-gold/60">{service.category}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
