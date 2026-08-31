import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Phone, Ruler, Scissors, Sparkles, Truck } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ProductList from './Shop';
import { shopSeo } from '../data/seoPages';
import { shopProducts, siteConfig } from '../data/siteData';

const assurances = [
  {
    icon: Scissors,
    title: 'Personal Colour Match',
    description: 'We confirm your shade against your own hair before anything ships. No guesswork from a screen.',
  },
  {
    icon: Ruler,
    title: 'Fitted and Finished',
    description: 'Bring your topper into the salon and we will cut it in and blend it so it sits like your own hair.',
  },
  {
    icon: Truck,
    title: 'Delivery or Pickup',
    description: 'Posted anywhere in Australia, or collect it from the Neutral Bay salon - whichever suits you.',
  },
  {
    icon: Sparkles,
    title: 'Premium Remy Hair',
    description: 'Ethically sourced Remy human hair on lightweight Swiss lace. Wash, style and treat it like your own.',
  },
];

export default function ShopPage() {
  const pieceLabel = shopProducts.length === 1 ? 'Piece' : 'Pieces';

  return (
    <>
      <Navbar isHome={false} />

      <main className="bg-cream text-espresso">
        {/* Header */}
        <section className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20 section-padding">
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#F8F4EE] to-cream" />
          <div className="absolute top-[10%] right-[6%] w-[420px] h-[420px] bg-muted-gold/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-[6%] w-[360px] h-[360px] bg-soft-blush/30 rounded-full blur-[110px]" />

          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="/"
                className="group inline-flex items-center gap-2.5 rounded-full border border-champagne/50 bg-white/60 px-5 py-2.5 text-[13px] font-body font-semibold text-espresso/75 hover:text-espresso hover:border-muted-gold/40 hover:bg-white transition-all duration-300"
              >
                <ArrowLeft size={15} className="text-muted-gold group-hover:-translate-x-0.5 transition-transform duration-300" />
                Back to Lusciouslox
              </a>

              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-[1.5px] bg-muted-gold" />
                <span className="label-sm">The Collection</span>
              </div>

              <h1 className="mt-5 font-heading text-[clamp(2.8rem,7vw,5.3rem)] font-light leading-[0.95] tracking-[-0.04em] text-espresso">
                {shopSeo.h1}
              </h1>

              <p className="mt-7 text-[16px] sm:text-[17px] text-warm-gray/70 font-body font-light leading-[1.9] max-w-[620px]">
                {shopSeo.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#products" className="btn-primary">
                  View {shopProducts.length} {pieceLabel}
                  <ArrowRight size={13} strokeWidth={2.5} />
                </a>
                <a href={siteConfig.phoneHref} className="btn-secondary">
                  <Phone size={13} /> Ask a Question
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="pb-8 section-padding">
          <div className="max-w-[1400px] mx-auto">
            <ProductList />
          </div>
        </section>

        {/* Assurances */}
        <section className="py-20 sm:py-28 section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-ivory/50" />
          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-[1.5px] bg-muted-gold" />
                <span className="label-sm">Buying With Us</span>
                <div className="w-10 h-[1.5px] bg-muted-gold" />
              </div>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-[1.1] tracking-[-0.03em] text-espresso">
                Never Just <em>Posted and Forgotten</em>
              </h2>
              <p className="mt-5 text-[15px] text-warm-gray/60 font-body font-light leading-[1.8]">
                Buying hair online is a gamble everywhere else. Here a stylist confirms every order personally.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {assurances.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="card-premium p-7"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                    <item.icon size={17} className="text-muted-gold" />
                  </div>
                  <h3 className="mt-5 font-heading text-[1.25rem] font-light italic text-espresso">{item.title}</h3>
                  <p className="mt-3 text-[13.5px] text-warm-gray/65 font-body font-light leading-[1.8]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-24 sm:pb-32 section-padding">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] bg-[#1C1210] text-cream p-10 sm:p-14 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -top-24 -right-24 w-[350px] h-[350px] bg-[#C4A265]/[0.10] rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-16 w-[280px] h-[280px] bg-[#B08D57]/[0.08] rounded-full blur-[90px]" />

              <div className="relative">
                <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-light italic leading-[1.1]">
                  Not sure which one suits you?
                </h2>
                <p className="mt-5 text-[15px] text-cream/55 font-body font-light leading-[1.85] max-w-lg mx-auto">
                  Tell us about your hair and what you want to cover. We will recommend the right length and shade,
                  in the salon or over the phone.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <a href="/#booking" className="btn-gold">
                    Book a Consultation <ArrowRight size={13} strokeWidth={2.5} />
                  </a>
                  <a href={siteConfig.phoneHref} className="btn-ghost">
                    <Phone size={13} /> {siteConfig.phone}
                  </a>
                  <a href="/" className="btn-ghost">
                    <Home size={13} /> Homepage
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer isHome={false} />
      <Chatbot />
    </>
  );
}
