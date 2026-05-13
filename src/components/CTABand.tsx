import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function CTABand() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#1C1210]">
      {/* Subtle gold radials */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[300px] bg-[#B08D57]/[0.04] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[10%] w-[300px] h-[200px] bg-[#B08D57]/[0.03] rounded-full blur-[80px]" />
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B08D57]/20 to-transparent" />

      <div className="relative max-w-[800px] mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#B08D57]/60 mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Transform Your Look
          </p>
          <h2
            className="text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.1] text-[#FDFBF7] tracking-[-0.02em]"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 300 }}
          >
            Ready for <em>Beautiful</em>,<br />Effortless Hair?
          </h2>
          <p className="mt-5 text-[15px] text-[#FDFBF7]/40 max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Book your personalised consultation and discover the perfect extension, colour, or treatment for you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href={siteConfig.bookingUrl} className="btn-gold">
              Book Consultation <ArrowRight size={14} />
            </a>
            <a href={siteConfig.phoneHref} className="btn-ghost">
              <Phone size={14} />
              {siteConfig.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
