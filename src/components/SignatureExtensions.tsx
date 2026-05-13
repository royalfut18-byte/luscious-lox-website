import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import { extensionBenefits, siteConfig } from '../data/siteData';

export default function SignatureExtensions() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="extensions" ref={ref} className="py-28 sm:py-36 section-padding relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-[#F8F4EE]" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[600px] bg-muted-gold/[0.03] rounded-full blur-[150px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Large header */}
        <motion.div
          className="max-w-3xl mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Our Signature</span>
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            Undetectable <em>Extensions</em>
          </h2>
          <p className="mt-6 text-[16px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-2xl">
            We're known for creating the most seamless hair extensions in Sydney. Premium Remy human hair, expert application, and a personalised consultation process that guarantees your perfect match.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Image with parallax */}
          <motion.div className="relative" style={{ y: imgY }}>
            <motion.div
              className="sticky top-32"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-champagne/60 via-warm-beige/40 to-soft-blush/50 border border-champagne/20 shadow-[0_30px_80px_rgba(176,141,87,0.08)] relative">
                {/* REPLACE: Add extension showcase photo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <p className="font-heading text-base italic">Extension Photo</p>
                </div>
              </div>

              {/* Floating tag */}
              <motion.div
                className="absolute -bottom-4 left-8 bg-espresso text-cream rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(28,18,16,0.2)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-[10px] font-body font-bold tracking-[0.2em] uppercase">Premium Remy Hair</span>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] sm:rounded-[3rem] border border-muted-gold/[0.06] -z-10" />
            </motion.div>
          </motion.div>

          {/* Benefits */}
          <div className="space-y-2">
            {extensionBenefits.map((b, idx) => (
              <motion.div
                key={b.title}
                className="group flex gap-5 p-5 sm:p-6 rounded-2xl hover:bg-white hover:shadow-[0_8px_30px_rgba(176,141,87,0.06)] hover:border-champagne/30 border border-transparent transition-all duration-600"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0 group-hover:bg-muted-gold/10 group-hover:border-muted-gold/20 transition-all duration-500">
                  <Check size={15} className="text-muted-gold" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-heading text-[1.15rem] text-espresso leading-tight mb-1.5">{b.title}</h4>
                  <p className="text-[13px] text-warm-gray/60 font-body leading-[1.7]">{b.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="pt-6 pl-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <a href={siteConfig.bookingUrl} className="btn-primary">
                Book Extension Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
