import { motion } from 'framer-motion';
import { Star, Instagram, ArrowDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteData';

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-champagne/25 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-muted-gold/[0.04] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-rose-tint/50 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto w-full px-6 sm:px-10 pt-28 sm:pt-32 pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <motion.div initial="hidden" animate="visible" className="order-2 lg:order-1 space-y-8">
            {/* Eyebrow */}
            <motion.div variants={reveal} custom={0} className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-muted-gold" />
              <span className="label-sm">Celebrity Extension Specialists</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={reveal} custom={1} className="font-heading text-display font-light text-espresso leading-none">
              <span className="italic">Undetectable</span>
              <br />
              <span className="not-italic">Luxury Hair</span>
              <br />
              <span className="not-italic text-muted-gold">Extensions</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={reveal} custom={2} className="section-intro">
              Celebrity hair extension specialists creating seamless length, volume and colour transformations with premium Remy human hair — in Leichhardt, Sydney.
            </motion.p>

            {/* Trust row */}
            <motion.div variants={reveal} custom={3} className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-muted-gold fill-muted-gold" />
                  ))}
                </div>
                <span className="text-[13px] text-warm-gray font-body">{siteConfig.googleRating} on Google</span>
              </div>
              <div className="w-[1px] h-4 bg-espresso/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Instagram size={14} className="text-muted-gold" />
                <span className="text-[13px] text-warm-gray font-body">{siteConfig.instagramFollowers} followers</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={reveal} custom={4} className="flex flex-wrap gap-4 pt-4">
              <a href={siteConfig.bookingUrl} className="btn-primary">
                Book a Consultation
              </a>
              <a href={siteConfig.phoneHref} className="btn-secondary">
                Call {siteConfig.phone}
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Visual composition */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          >
            <div className="relative max-w-[480px] mx-auto lg:max-w-none">
              {/* Main image card */}
              <motion.div
                className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gradient-to-br from-champagne/70 via-warm-beige/40 to-rose-tint/60 border border-muted-gold/10 shadow-luxury-lg"
                initial={{ y: 20, scale: 0.97 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* REPLACE: Add hero image here as <img src="..." className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={24} className="text-muted-gold/40" />
                    </div>
                    <p className="text-espresso/20 font-heading text-lg italic">Hero Image</p>
                    <p className="text-espresso/15 text-xs font-body mt-1">Replace with salon photo</p>
                  </div>
                </div>
                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/5 via-transparent to-champagne/10" />
              </motion.div>

              {/* Floating card — rating */}
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-3 sm:-left-6 bg-white rounded-2xl px-5 py-4 shadow-luxury-lg border border-champagne/30"
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-muted-gold fill-muted-gold" />
                    ))}
                  </div>
                  <div>
                    <p className="text-[12px] font-body font-semibold text-espresso">5.0 Rating</p>
                    <p className="text-[10px] font-body text-warm-gray">Google Reviews</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — specialist badge */}
              <motion.div
                className="absolute -top-3 -right-3 sm:top-6 sm:-right-4 bg-white rounded-2xl px-5 py-4 shadow-luxury-lg border border-champagne/30"
                initial={{ opacity: 0, y: -10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-muted-gold/20 to-champagne/50 flex items-center justify-center">
                    <Sparkles size={15} className="text-muted-gold" />
                  </div>
                  <div>
                    <p className="text-[12px] font-body font-semibold text-espresso">Nano Extensions</p>
                    <p className="text-[10px] font-body text-warm-gray">Undetectable finish</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          <span className="text-[10px] font-body tracking-[0.2em] uppercase text-warm-gray/40">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-warm-gray/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
