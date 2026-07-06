import { motion } from 'framer-motion';
import { ArrowRight, BadgePercent, CalendarCheck, Check, Home, Phone, Sparkles } from 'lucide-react';
import { homeService, siteConfig, specialOffer } from '../data/siteData';

export default function SpecialOffers() {
  return (
    <section id="offers" className="py-24 sm:py-32 section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#F8F4EE] to-cream" />
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-muted-gold/[0.05] rounded-full blur-[130px]" />
      <div className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] bg-soft-blush/30 rounded-full blur-[110px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Offers &amp; Home Visits</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            Something <em>Special</em>
          </h2>
          <p className="mt-5 text-[15px] text-warm-gray/60 font-body font-light leading-[1.8] max-w-lg mx-auto">
            A half-price signature treatment, and the full salon experience delivered to your door.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* Card 1 — Keratin Nanoplasty half-price special */}
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-[#1C1210] text-cream p-8 sm:p-12 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold glows + pattern */}
            <div className="absolute -top-24 -right-24 w-[350px] h-[350px] bg-[#C4A265]/[0.10] rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-16 w-[280px] h-[280px] bg-[#B08D57]/[0.08] rounded-full blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C4A265 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            {/* Gold shimmer sweep */}
            <motion.div
              className="absolute top-0 bottom-0 w-[60%] pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent, rgba(196,162,101,0.08) 45%, rgba(196,162,101,0.16) 50%, rgba(196,162,101,0.08) 55%, transparent)' }}
              initial={{ x: '-150%' }}
              whileInView={{ x: '350%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />

            <div className="relative flex flex-col flex-1">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#F0D39E,#D3A35D,#8E6A3F)] px-4 py-2 text-[10px] font-body font-bold tracking-[0.22em] uppercase text-[#140D0B]"
                  animate={{ scale: [1, 1.045, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <BadgePercent size={13} strokeWidth={2.5} />
                  {specialOffer.badge}
                </motion.span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C4A265]/25 bg-[#C4A265]/[0.08] px-4 py-2 text-[10px] font-body font-bold tracking-[0.22em] uppercase text-[#E9C88F]">
                  <Sparkles size={12} />
                  {specialOffer.tagline}
                </span>
              </div>

              <h3 className="mt-7 font-heading text-[clamp(2rem,4vw,3.2rem)] font-light italic leading-[1.05] tracking-[-0.02em]">
                {specialOffer.name}
              </h3>

              {/* Price */}
              <div className="mt-6 flex items-end gap-4 flex-wrap">
                <span className="font-heading text-[1.6rem] sm:text-[2rem] font-light text-cream/30 line-through decoration-[#C4A265]/60 decoration-2">
                  {specialOffer.wasPrice}
                </span>
                <span className="font-heading text-[3.6rem] sm:text-[4.6rem] font-medium leading-[0.85] bg-[linear-gradient(135deg,#F0D39E,#D3A35D)] bg-clip-text text-transparent">
                  {specialOffer.nowPrice}
                </span>
                <span className="mb-2 text-[11px] font-body font-bold tracking-[0.25em] uppercase text-[#E9C88F]/70">
                  Save $200
                </span>
              </div>

              <p className="mt-6 text-[14px] sm:text-[15px] text-cream/55 font-body font-light leading-[1.85] max-w-md">
                {specialOffer.description}
              </p>

              <div className="mt-auto pt-9 flex flex-wrap gap-4">
                <a href="#booking" className="btn-gold">
                  Claim Half-Price Offer <ArrowRight size={13} strokeWidth={2.5} />
                </a>
                <a href={siteConfig.phoneHref} className="btn-ghost">
                  <Phone size={13} />
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Home services */}
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-white border border-champagne/30 shadow-card p-8 sm:p-12 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-champagne/[0.15] rounded-full blur-[90px]" />

            <div className="relative flex flex-col flex-1">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-[10px] font-body font-bold tracking-[0.22em] uppercase text-cream">
                  <Home size={12} />
                  {homeService.eyebrow}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-muted-gold/25 bg-muted-gold/[0.07] px-4 py-2 text-[10px] font-body font-bold tracking-[0.22em] uppercase text-muted-gold">
                  <CalendarCheck size={12} />
                  Weekends Included
                </span>
              </div>

              <h3 className="mt-7 font-heading text-[clamp(2rem,4vw,3.2rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-espresso">
                {homeService.title}
              </h3>

              <p className="mt-5 text-[14px] sm:text-[15px] text-warm-gray/65 font-body font-light leading-[1.85] max-w-md">
                {homeService.description}
              </p>

              {/* Points */}
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {homeService.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-xl border border-champagne/30 bg-ivory/40 px-4 py-3.5">
                    <div className="w-7 h-7 rounded-lg bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0">
                      <Check size={13} className="text-muted-gold" strokeWidth={2.5} />
                    </div>
                    <span className="text-[12.5px] font-body font-medium text-espresso/70 leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-muted-gold/20 bg-muted-gold/[0.05] px-4 py-3 text-center">
                <span className="text-[11px] font-body font-bold tracking-[0.18em] uppercase text-muted-gold">
                  {homeService.availability}
                </span>
              </div>

              <div className="mt-auto pt-9 flex flex-wrap gap-4">
                <a href="#booking" className="btn-primary">
                  Book a Home Visit <ArrowRight size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
