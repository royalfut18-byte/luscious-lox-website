import { motion } from 'framer-motion';
import { Sparkles, Palette, Wind, Scissors } from 'lucide-react';
import { serviceCategories } from '../data/siteData';

const icons = [Sparkles, Palette, Wind, Scissors];
const accents = ['from-muted-gold/15 to-champagne/30', 'from-rose-tint to-champagne/20', 'from-champagne/40 to-warm-beige/20', 'from-ivory to-champagne/30'];

export default function Services() {
  return (
    <section id="services" className="section-gap section-padding">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="label-sm mb-5 block">What We Offer</span>
          <h2 className="font-heading text-hero font-light text-espresso">
            Our <span className="italic">Services</span>
          </h2>
          <p className="mt-6 section-intro mx-auto">
            From premium hair extensions to expert colouring and styling — every service is delivered with precision and luxury.
          </p>
        </motion.div>

        {/* Service cards — magazine grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {serviceCategories.map((category, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={category.title}
                className="group relative bg-white rounded-[1.75rem] p-8 sm:p-9 border border-champagne/30 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* Accent gradient background */}
                <div className={`absolute top-0 left-0 right-0 h-32 rounded-t-[1.75rem] bg-gradient-to-b ${accents[idx]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-champagne/40 shadow-luxury flex items-center justify-center mb-7 group-hover:shadow-card transition-shadow duration-500">
                    <Icon size={22} className="text-muted-gold" />
                  </div>

                  <h3 className="font-heading text-2xl sm:text-[1.7rem] text-espresso mb-5 italic">{category.title}</h3>

                  <ul className="space-y-3">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-center gap-3 text-[13.5px] text-warm-gray font-body">
                        <div className="w-1 h-1 rounded-full bg-muted-gold/60 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
