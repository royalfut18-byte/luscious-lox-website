import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { siteConfig } from '../data/siteData';

export default function CTABand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden bg-[#1C1210]">
      {/* Animated gold radials */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-[-20%] right-[15%] w-[500px] h-[500px] bg-[#B08D57]/[0.05] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[5%] w-[400px] h-[400px] bg-[#B08D57]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[200px] bg-[#C4A265]/[0.03] rounded-full blur-[80px]" />
      </motion.div>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57]/25 to-transparent" />
      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57]/15 to-transparent" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #B08D57 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-[900px] mx-auto px-6 sm:px-10 text-center">
        <motion.div style={{ scale: textScale }}>
          {/* Sparkle icon */}
          <motion.div
            className="flex justify-center mb-7"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-full border border-[#B08D57]/20 flex items-center justify-center bg-[#B08D57]/[0.05]">
              <Sparkles size={20} className="text-[#B08D57]" />
            </div>
          </motion.div>

          <motion.p
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#B08D57]/60 mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Look
          </motion.p>

          <motion.h2
            className="text-[clamp(2rem,5vw,4rem)] leading-[1.08] text-[#FDFBF7] tracking-[-0.02em]"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 300 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Ready for <em className="text-[#C4A265]">Beautiful</em>,<br />Effortless Hair?
          </motion.h2>

          <motion.p
            className="mt-6 text-[15px] text-[#FDFBF7]/40 max-w-md mx-auto leading-[1.8]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your personalised consultation and discover the perfect extension, colour, or treatment for you.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <a href={siteConfig.bookingUrl} className="btn-gold">
              Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
            </a>
            <a href={siteConfig.phoneHref} className="btn-ghost">
              <Phone size={13} />
              {siteConfig.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
