import { motion } from 'framer-motion';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { shopProducts } from '../data/siteData';

const highlights = [
  '100% premium Remy human hair',
  'Ultra-light Swiss lace bases',
  'Personal colour matching included',
  'Delivery Australia-wide or in-salon fitting',
];

export default function ShopTeaser() {
  const lead = shopProducts[0];
  const second = shopProducts[1];

  return (
    <section id="shop" className="py-24 sm:py-32 section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#F8F4EE] to-cream" />
      <div className="absolute top-[12%] right-[5%] w-[420px] h-[420px] bg-muted-gold/[0.05] rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] left-[7%] w-[360px] h-[360px] bg-soft-blush/30 rounded-full blur-[110px]" />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Now Available to Buy</span>
            </div>

            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
              Wigs &amp; <em>Hair Toppers</em>
            </h2>

            <p className="mt-5 text-[15px] sm:text-[16px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-[520px]">
              Take the salon home with you. Our MICRO toppers add discreet coverage through the crown in
              premium Remy human hair, ordered online and finished by us.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-muted-gold" strokeWidth={2.5} />
                  </div>
                  <span className="text-[13.5px] font-body text-espresso/70">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/shop" className="btn-gold">
                <ShoppingBag size={13} />
                Shop the Collection
              </a>
              <span className="text-[12px] font-body text-warm-gray/45">
                From {shopProducts.map((p) => p.price).filter(Boolean).sort()[0]}
              </span>
            </div>
          </motion.div>

          {/* Product previews */}
          <motion.a
            href="/shop"
            className="group relative block"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            aria-label="View the wigs and hair toppers collection"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {[lead, second].filter(Boolean).map((product, i) => (
                <div
                  key={product.id}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-champagne/30 shadow-card bg-[#F7EFE3] transition-all duration-500 group-hover:shadow-card-hover ${
                    i === 1 ? 'mt-8 sm:mt-12' : ''
                  }`}
                >
                  <div className="aspect-[4/5]">
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    <p className="font-heading text-[1.05rem] sm:text-[1.2rem] font-light italic text-espresso leading-tight">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[12.5px] font-body font-semibold text-muted-gold">
                      {product.price ?? 'Enquire for pricing'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 inline-flex items-center gap-2 text-[12px] font-body font-bold tracking-[0.16em] uppercase text-espresso/55 group-hover:text-muted-gold transition-colors duration-300">
              See the full collection
              <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
