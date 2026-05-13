import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';
import { reviews, siteConfig } from '../data/siteData';

export default function Reviews() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="reviews" ref={ref} className="py-28 sm:py-36 section-padding relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[#F8F4EE]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-soft-blush/30 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-champagne/20 rounded-full blur-[100px]" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Testimonials</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            Client <em>Love</em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-muted-gold fill-muted-gold" />
              ))}
            </div>
            <span className="text-[13px] text-warm-gray/60 font-body">{siteConfig.googleRating} on Google · {siteConfig.googleReviews} reviews</span>
          </div>
        </motion.div>

        {/* Floating decorative quote */}
        <motion.div
          className="absolute top-[20%] right-[8%] hidden lg:block"
          style={{ y: decorY }}
        >
          <Quote size={80} className="text-champagne/30 rotate-12" />
        </motion.div>

        {/* Testimonial cards — staggered 2-col with offset */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className={`group relative bg-white rounded-[1.5rem] p-8 sm:p-10 border border-champagne/25 overflow-hidden ${
                idx % 2 === 1 ? 'sm:mt-8' : ''
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(176, 141, 87, 0.08)' }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/[0.02] to-champagne/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem]" />

              {/* Large decorative quote mark */}
              <div className="absolute -top-2 right-6 font-heading text-[6rem] text-champagne/40 leading-none select-none pointer-events-none">"</div>

              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-muted-gold fill-muted-gold" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[15px] sm:text-[16px] text-espresso/75 font-body leading-[1.85] italic">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="mt-8 pt-6 border-t border-champagne/25 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne/60 to-muted-gold/20 flex items-center justify-center border border-champagne/40">
                    <span className="text-[11px] font-body font-bold text-muted-gold">✓</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-body font-bold tracking-[0.1em] uppercase text-espresso/60">{review.name}</span>
                    <p className="text-[10px] font-body text-warm-gray/40 mt-0.5">Google Review</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
