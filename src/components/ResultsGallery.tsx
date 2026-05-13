import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { galleryImages, siteConfig } from '../data/siteData';

export default function ResultsGallery() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headerX = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="gallery" ref={sectionRef} className="py-28 sm:py-36 section-padding relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute top-[30%] left-0 w-[600px] h-[600px] bg-champagne/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-muted-gold/[0.03] rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header — editorial style with parallax */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 sm:mb-20">
          <motion.div
            className="max-w-xl"
            style={{ x: headerX }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Portfolio</span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
              Real <em>Transformations</em>
            </h2>
            <p className="mt-6 text-[15px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-lg">
              Every result tells a story. Premium extensions, expert colour, and meticulous technique — see the difference for yourself.
            </p>
          </motion.div>
          <motion.a
            href={siteConfig.bookingUrl}
            className="hidden lg:inline-flex btn-secondary"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
          </motion.a>
        </div>

        {/* Masonry gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => {
            const tall = idx === 0 || idx === 3;
            return (
              <motion.div
                key={img.id}
                className={`group relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] cursor-pointer ${
                  tall ? 'row-span-2 aspect-[3/5]' : 'aspect-[4/5]'
                }`}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image or gradient placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-champagne/60 via-warm-beige/30 to-soft-blush/40">
                  {img.src ? (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <span className="text-[11px] font-body text-espresso/40 text-center px-4">{img.alt}</span>
                    </div>
                  )}
                </div>

                {/* Scroll reveal mask */}
                <motion.div
                  className="absolute inset-0 bg-cream origin-bottom"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.9, delay: 0.1 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Hover overlay with label */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 inset-x-0 p-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-body font-bold tracking-[0.15em] uppercase text-espresso shadow-soft">
                      {img.label}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft">
                      <ArrowUpRight size={13} className="text-espresso" />
                    </div>
                  </div>
                </div>

                {/* Border overlay */}
                <div className="absolute inset-0 rounded-[1.25rem] sm:rounded-[1.75rem] border border-champagne/20 group-hover:border-muted-gold/20 transition-colors duration-500 pointer-events-none" />
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
          transition={{ delay: 0.4 }}
        >
          <a href={siteConfig.bookingUrl} className="btn-primary">
            Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
