import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { extensionBenefits, siteConfig } from '../data/siteData';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function SignatureExtensions() {
  return (
    <section id="extensions" className="section-gap section-padding relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream to-ivory pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-champagne/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Editorial header — large and impactful */}
        <motion.div
          className="max-w-3xl mb-20 sm:mb-24"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-muted-gold" />
            <span className="label-sm">Our Signature</span>
          </div>
          <h2 className="font-heading text-hero font-light text-espresso leading-none mb-8">
            Premium Hair<br />
            <span className="italic text-muted-gold">Extensions</span>
          </h2>
          <p className="section-intro">
            Luscious Lox is renowned for creating extremely undetectable hair extensions using premium
            Remy human hair. Specialising in nano, tape and seamless blends — every application is
            tailored to sit flush against your natural hair.
          </p>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Left — Image card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-champagne/50 via-warm-beige/30 to-rose-tint/40 border border-muted-gold/10 shadow-luxury-md overflow-hidden relative">
              {/* REPLACE: Add extension showcase image here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles size={32} className="text-muted-gold/20 mx-auto mb-3" />
                  <p className="text-espresso/15 text-sm font-body">Extension showcase photo</p>
                </div>
              </div>
            </div>

            {/* Floating tag */}
            <motion.div
              className="absolute -bottom-4 right-6 sm:-bottom-3 sm:right-8 bg-espresso text-cream rounded-full px-5 py-2.5 shadow-luxury-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-[11px] font-body font-semibold tracking-[0.1em] uppercase">Celebrity Stylist</span>
            </motion.div>
          </motion.div>

          {/* Right — Benefits grid */}
          <div className="space-y-4">
            {extensionBenefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                className="group flex gap-5 p-5 sm:p-6 rounded-2xl border border-transparent hover:border-champagne/50 hover:bg-white/80 hover:shadow-card transition-all duration-500"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="w-10 h-10 rounded-xl bg-champagne/50 border border-muted-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-muted-gold/10 group-hover:border-muted-gold/20 transition-all duration-500">
                  <Check size={16} className="text-muted-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-xl text-espresso mb-1">{benefit.title}</h4>
                  <p className="text-sm text-warm-gray font-body leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
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
