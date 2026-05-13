import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews, siteConfig } from '../data/siteData';

export default function Reviews() {
  return (
    <section id="reviews" className="section-gap section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream to-ivory pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="label-sm mb-5 block">Client Love</span>
          <h2 className="font-heading text-hero font-light text-espresso">
            What Clients <span className="italic">Say</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="text-muted-gold fill-muted-gold" />
              ))}
            </div>
            <span className="text-[13px] text-warm-gray font-body font-medium">
              {siteConfig.googleRating} rating · {siteConfig.googleReviews} reviews on Google
            </span>
          </div>
        </motion.div>

        {/* Review cards — REPLACE: Insert real Google review text when available */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className="group bg-white rounded-[1.75rem] p-8 sm:p-10 border border-champagne/30 shadow-card hover:shadow-card-hover transition-all duration-500 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Quote icon */}
              <Quote size={28} className="text-champagne/80 mb-5 -scale-x-100" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-muted-gold fill-muted-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[15px] sm:text-base text-espresso/80 font-body leading-[1.8] italic">
                "{review.text}"
              </p>

              {/* Attribution */}
              <div className="mt-6 pt-5 border-t border-champagne/30">
                <p className="text-[12px] text-warm-gray/60 font-body font-medium tracking-wide uppercase">Verified Client</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
