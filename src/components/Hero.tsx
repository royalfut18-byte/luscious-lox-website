import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-soft-blush" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-champagne/20 to-transparent" />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full bg-muted-gold/[0.03] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-10 items-center">
          {/* Left copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-8 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Leichhardt, Sydney</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-display text-espresso"
            >
              <span className="italic block">Luxury Hair</span>
              <span className="block mt-1">Extensions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-[17px] sm:text-[19px] text-warm-gray/80 font-body font-light leading-[1.75] max-w-[480px]"
            >
              Celebrity extension specialists creating seamless, undetectable transformations with premium Remy human hair.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href={siteConfig.bookingUrl} className="btn-primary">
                Book Consultation
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
              <a href="#services" className="btn-secondary">
                <Play size={13} strokeWidth={2.5} />
                View Services
              </a>
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative max-w-[440px] mx-auto lg:max-w-none">
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-luxury border border-champagne/30">
                <div className="absolute inset-0 bg-gradient-to-br from-champagne/60 via-warm-beige/40 to-soft-blush/50" />
                {/* REPLACE: Add hero image — <img src="YOUR_IMAGE_URL" className="absolute inset-0 w-full h-full object-cover" alt="Luscious Lox salon" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <p className="font-heading text-xl italic text-espresso/40">Salon Image</p>
                    <p className="text-xs font-body text-espresso/30 mt-1">Replace placeholder</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/8 via-transparent to-transparent" />
              </div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="absolute -bottom-5 -left-3 sm:-bottom-4 sm:-left-5 bg-white rounded-2xl px-5 py-4 shadow-elevated border border-champagne/25"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-muted-gold/20 to-champagne/40 flex items-center justify-center">
                    <span className="text-muted-gold font-heading text-lg italic">5.0</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-body font-bold text-espresso">Google Rated</p>
                    <p className="text-[10px] font-body text-warm-gray/60">★★★★★</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                className="absolute -top-3 -right-2 sm:top-5 sm:-right-5 bg-espresso text-cream rounded-2xl px-5 py-3.5 shadow-elevated"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              >
                <p className="text-[11px] font-body font-bold tracking-[0.15em] uppercase">Nano Specialists</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
