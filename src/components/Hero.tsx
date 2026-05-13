import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#FDFBF7]">
      {/* Large background shape */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-[#F4EDE6] rounded-bl-[80px] sm:rounded-bl-[120px] hidden lg:block" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-[#B08D57]/[0.04] blur-[100px]" />

      <div className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div className="order-2 lg:order-1 max-w-[560px]">
            <motion.p
              className="text-[11px] font-bold tracking-[0.35em] uppercase text-[#B08D57] mb-6"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Celebrity Extension Specialists · Sydney
            </motion.p>

            <motion.h1
              className="text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.95] tracking-[-0.035em] text-[#1C1210]"
              style={{ fontFamily: '"Playfair Display", serif', fontWeight: 300 }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <em className="not-italic">Your Dream Hair,</em><br />
              <em>Perfected.</em>
            </motion.h1>

            <motion.p
              className="mt-7 text-[16px] sm:text-[18px] text-[#5C4F44]/75 leading-[1.8] max-w-[440px]"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Premium nano & tape hair extensions, balayage, and colour — expertly crafted for a seamless, undetectable finish at our Leichhardt salon.
            </motion.p>

            {/* Rating */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#B08D57] fill-[#B08D57]" />
                ))}
              </div>
              <span className="text-[13px] text-[#5C4F44]/60 ml-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {siteConfig.googleRating} rated · {siteConfig.instagramFollowers} followers
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <a href={siteConfig.bookingUrl} className="btn-primary">
                Book Consultation
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
              <a href="#services" className="btn-secondary">
                View Services
              </a>
            </motion.div>
          </div>

          {/* Right — Image composition */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative max-w-[460px] mx-auto lg:max-w-none lg:ml-auto">
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(28,18,16,0.08)] border border-[#EDE1CF]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EDE1CF]/80 via-[#E8D9C5]/50 to-[#F6EDE8]/60" />
                {/* REPLACE: <img src="YOUR_HERO_IMAGE" className="absolute inset-0 w-full h-full object-cover" alt="Hair transformation" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#1C1210]/15 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Hero Image Placeholder</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1210]/5 to-transparent" />
              </div>

              {/* Floating: 5-star badge */}
              <motion.div
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl px-5 py-4 shadow-[0_12px_40px_rgba(176,141,87,0.12)] border border-[#EDE1CF]/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B08D57]/10 flex items-center justify-center">
                    <span className="text-[#B08D57] font-bold text-sm" style={{ fontFamily: '"Playfair Display", serif' }}>5.0</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#1C1210]" style={{ fontFamily: 'Manrope, sans-serif' }}>Google Reviews</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={9} className="text-[#B08D57] fill-[#B08D57]" />)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating: Nano badge */}
              <motion.div
                className="absolute -top-3 -right-3 sm:top-6 sm:-right-5 bg-[#1C1210] text-[#FDFBF7] rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(28,18,16,0.2)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>Nano Specialists</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
