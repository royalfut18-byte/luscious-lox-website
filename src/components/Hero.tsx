import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { siteConfig } from '../data/siteData';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background architecture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute top-0 right-0 w-[58%] h-full bg-[#F3ECE4] hidden lg:block" style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        <div className="absolute bottom-[10%] left-[8%] w-[350px] h-[350px] rounded-full bg-muted-gold/[0.03] blur-[100px]" />
        <div className="absolute top-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-muted-gold/[0.04] blur-[80px]" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 lg:gap-10 items-center min-h-[70vh]">
          {/* Left copy */}
          <motion.div className="order-2 lg:order-1 max-w-[600px]" style={{ y: textY }}>
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-10 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Celebrity Hair Extension Specialists</span>
            </motion.div>

            {/* Headline — staggered word reveal */}
            <div className="overflow-hidden mb-3">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-heading text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.92] tracking-[-0.04em] text-espresso">
                  Your Dream
                </h1>
              </motion.div>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-heading text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.92] tracking-[-0.04em] text-espresso italic">
                  Hair, Perfected.
                </h1>
              </motion.div>
            </div>

            {/* Sub */}
            <motion.p
              className="mt-8 text-[16px] sm:text-[17px] text-warm-gray/70 font-body font-light leading-[1.9] max-w-[460px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Premium nano & tape extensions, balayage, and colour — expertly crafted for a seamless, undetectable finish at our Leichhardt salon.
            </motion.p>

            {/* Social proof */}
            <motion.div
              className="mt-7 flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-muted-gold fill-muted-gold" />)}
                <span className="ml-1.5 text-[12px] font-body font-semibold text-espresso/50">5.0</span>
              </div>
              <div className="w-[1px] h-4 bg-espresso/10" />
              <span className="text-[12px] font-body font-medium text-espresso/40">{siteConfig.instagramFollowers} followers</span>
              <div className="w-[1px] h-4 bg-espresso/10 hidden sm:block" />
              <span className="text-[12px] font-body font-medium text-espresso/40 hidden sm:block">Leichhardt</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <a href={siteConfig.bookingUrl} className="btn-primary">
                Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
              </a>
              <a href="#services" className="btn-secondary">View Services</a>
            </motion.div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative max-w-[440px] mx-auto lg:max-w-none"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image mask */}
              <div className="relative aspect-[3/4] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(28,18,16,0.1)] border border-champagne/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EDE1CF] via-[#E8D9C5] to-[#F3ECE4]" />
                {/* REPLACE: <img src="YOUR_HERO_IMAGE" className="absolute inset-0 w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <p className="font-heading text-lg italic text-espresso/40">Hero Image</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/[0.06] via-transparent to-transparent" />
              </div>

              {/* Floating: Google Rating */}
              <motion.div
                className="absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-2xl px-5 py-4 shadow-[0_16px_50px_rgba(176,141,87,0.12)] border border-champagne/20"
                initial={{ opacity: 0, y: 24, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-muted-gold/15 to-champagne/40 flex items-center justify-center">
                    <span className="font-heading text-lg italic text-muted-gold font-medium">5.0</span>
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={9} className="text-muted-gold fill-muted-gold" />)}</div>
                    <p className="text-[10px] font-body font-semibold text-warm-gray/50">Google Reviews</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating: Specialist tag */}
              <motion.div
                className="absolute -top-3 -right-3 sm:top-8 sm:-right-6 bg-espresso text-cream rounded-full px-5 py-3 shadow-[0_10px_30px_rgba(28,18,16,0.25)]"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] font-body font-bold tracking-[0.2em] uppercase">Nano Specialists</span>
              </motion.div>

              {/* Decorative ring */}
              <motion.div
                className="absolute -z-10 -inset-6 sm:-inset-8 rounded-[3rem] sm:rounded-[4rem] border border-muted-gold/[0.07]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.0 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          <span className="text-[9px] font-body font-bold tracking-[0.3em] uppercase text-warm-gray/30">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={13} className="text-warm-gray/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
