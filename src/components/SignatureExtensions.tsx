import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { extensionBenefits, siteConfig } from '../data/siteData';

export default function SignatureExtensions() {
  return (
    <section id="extensions" className="section-gap section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[600px] bg-champagne/15 rounded-full blur-[120px]" />

      <div className="relative max-w-[1360px] mx-auto">
        {/* Large editorial header */}
        <motion.div
          className="max-w-3xl mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Our Signature</span>
          </div>
          <h2 className="font-heading text-section text-espresso">
            Undetectable <span className="italic">Extensions</span>
          </h2>
          <p className="mt-5 section-desc max-w-2xl">
            Luscious Lox is known for creating extremely undetectable hair extensions. We use premium Remy human hair with expert nano and tape application methods — designed to look and feel like your own.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-champagne/50 via-warm-beige/30 to-soft-blush/40 border border-champagne/25 shadow-card relative">
              {/* REPLACE: Add real extensions image here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-25">
                  <Sparkles size={28} className="text-muted-gold mx-auto mb-2" />
                  <p className="font-heading text-base italic text-espresso/40">Extension Showcase</p>
                  <p className="text-[11px] font-body text-espresso/30 mt-1">Add real photo</p>
                </div>
              </div>
            </div>

            {/* Accent floating tag */}
            <motion.div
              className="absolute -bottom-4 left-6 sm:left-10 bg-espresso text-cream rounded-full px-6 py-3 shadow-elevated"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-[11px] font-body font-bold tracking-[0.15em] uppercase">Premium Remy Hair</span>
            </motion.div>
          </motion.div>

          {/* Right — Benefits */}
          <div className="space-y-3 sm:space-y-4">
            {extensionBenefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                className="group flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-transparent hover:border-champagne/40 hover:bg-white hover:shadow-card transition-all duration-500"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/40 border border-champagne/40 flex items-center justify-center flex-shrink-0 group-hover:bg-muted-gold/10 group-hover:border-muted-gold/20 transition-all duration-500">
                  <Check size={16} className="text-muted-gold" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-heading text-[1.15rem] sm:text-[1.25rem] text-espresso leading-tight">{benefit.title}</h4>
                  <p className="text-[13px] text-warm-gray/70 font-body leading-relaxed mt-1.5">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="pt-4 pl-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
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
