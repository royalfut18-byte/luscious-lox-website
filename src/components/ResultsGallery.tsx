import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { galleryImages, siteConfig } from '../data/siteData';

export default function ResultsGallery() {
  return (
    <section id="results" className="section-gap section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header — editorial style */}
        <motion.div
          className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-muted-gold" />
              <span className="label-sm">Transformations</span>
            </div>
            <h2 className="font-heading text-hero font-light text-espresso">
              Results That <span className="italic">Speak</span>
            </h2>
            <p className="mt-5 section-intro">
              Real transformations from our Leichhardt salon — each one a testament to expert technique and premium quality hair.
            </p>
          </div>
          <a
            href={siteConfig.bookingUrl}
            className="hidden lg:inline-flex btn-secondary"
          >
            Book Your Consultation
            <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* Gallery — editorial masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {galleryImages.map((image, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <motion.div
                key={image.id}
                className={`group relative rounded-[1.5rem] overflow-hidden border border-champagne/20 shadow-card hover:shadow-card-hover transition-all duration-500 ${
                  isLarge ? 'row-span-2 aspect-[3/5]' : 'aspect-[4/5]'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* Background placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-champagne/50 via-warm-beige/30 to-rose-tint/40">
                  {/* REPLACE: Add real images as <img src={image.url} className="w-full h-full object-cover" alt={image.label} /> */}
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="text-center">
                      <Sparkles size={20} className="text-muted-gold/20 mx-auto mb-2" />
                      <span className="text-[11px] text-espresso/20 font-body">{image.placeholder}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient + label */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso/50 via-espresso/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-body font-semibold text-espresso tracking-wide">
                    {image.label}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/5 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="lg:hidden text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-warm-gray font-body mb-5 text-sm">Want results like this?</p>
          <a href={siteConfig.bookingUrl} className="btn-gold">
            Book Your Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
