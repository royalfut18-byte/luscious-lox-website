import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews, siteConfig } from '../data/siteData';

export default function Reviews() {
  return (
    <section id="reviews" className="section-gap section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-soft-blush/20 to-ivory" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-sm mb-5 block">Testimonials</span>
          <h2 className="font-heading text-section text-espresso">
            Client <span className="italic">Love</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-muted-gold fill-muted-gold" />
              ))}
            </div>
            <span className="text-[13px] text-warm-gray/70 font-body">{siteConfig.googleRating} on Google · {siteConfig.googleReviews} reviews</span>
          </div>
        </motion.div>

        {/* Testimonial cards — REPLACE: Add real review text when available */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className="card-premium p-8 sm:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Decorative quote */}
              <div className="absolute top-6 right-7 font-heading text-[4rem] text-champagne/50 leading-none select-none">"</div>

              <div className="relative">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-muted-gold fill-muted-gold" />
                  ))}
                </div>

                <p className="text-[15px] sm:text-base text-espresso/75 font-body leading-[1.85] italic">
                  "{review.text}"
                </p>

                <div className="mt-7 pt-5 border-t border-champagne/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-champagne/50 flex items-center justify-center">
                    <span className="text-[10px] font-body font-bold text-muted-gold">✓</span>
                  </div>
                  <span className="text-[11px] font-body font-bold tracking-[0.1em] uppercase text-warm-gray/50">{review.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
