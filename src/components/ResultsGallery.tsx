import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { galleryImages, siteConfig } from '../data/siteData';

export default function ResultsGallery() {
  return (
    <section id="gallery" className="section-gap section-padding">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Portfolio</span>
            </div>
            <h2 className="font-heading text-section text-espresso">
              Our <span className="italic">Results</span>
            </h2>
            <p className="mt-5 section-desc">
              Real client transformations from our Leichhardt salon — showcasing expert technique with premium hair.
            </p>
          </div>
          <a href={siteConfig.bookingUrl} className="hidden lg:inline-flex btn-secondary">
            Book Consultation <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Gallery grid with varied sizing */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => {
            const tall = idx === 0 || idx === 3;
            return (
              <motion.div
                key={img.id}
                className={`group relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-champagne/20 shadow-card hover:shadow-card-hover transition-all duration-500 ${
                  tall ? 'row-span-2 aspect-[3/5]' : 'aspect-[4/5]'
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image or placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-champagne/50 via-warm-beige/25 to-soft-blush/35">
                  {img.src ? (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <span className="text-[11px] font-body text-espresso/40 text-center px-4">{img.alt}</span>
                    </div>
                  )}
                </div>

                {/* Reveal mask on scroll */}
                <motion.div
                  className="absolute inset-0 bg-cream origin-bottom"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.8, delay: 0.1 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-espresso/40 via-espresso/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-body font-bold tracking-[0.1em] uppercase text-espresso">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="lg:hidden text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a href={siteConfig.bookingUrl} className="btn-gold">
            Book Consultation <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
