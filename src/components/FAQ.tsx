import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/siteData';

function FAQItem({ q, a, isOpen, toggle, idx }: { q: string; a: string; isOpen: boolean; toggle: () => void; idx: number }) {
  return (
    <motion.div
      className="border-b border-champagne/25 last:border-b-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-start justify-between gap-5 py-7 sm:py-8 text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-[11px] font-body font-bold text-muted-gold/40 tracking-wider mt-1.5 hidden sm:block">0{idx + 1}</span>
          <span className={`font-heading text-[1.1rem] sm:text-[1.3rem] leading-snug transition-colors duration-300 ${isOpen ? 'text-muted-gold' : 'text-espresso group-hover:text-muted-gold'}`}>
            {q}
          </span>
        </div>
        <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
          isOpen ? 'border-muted-gold/30 bg-muted-gold/[0.06] rotate-0' : 'border-champagne/50 group-hover:border-muted-gold/30 rotate-0'
        }`}>
          {isOpen ? <Minus size={14} className="text-muted-gold" /> : <Plus size={14} className="text-warm-gray/50 group-hover:text-muted-gold transition-colors duration-300" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-0 sm:pl-[38px] pr-12">
              <p className="text-[14px] text-warm-gray/70 font-body leading-[1.85] max-w-2xl">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 sm:py-36 section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-champagne/[0.06] rounded-full blur-[120px]" />

      <div className="relative max-w-[900px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Questions</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            Frequently <em>Asked</em>
          </h2>
          <p className="mt-5 text-[15px] text-warm-gray/60 font-body font-light leading-[1.8] max-w-md mx-auto">
            Everything you need to know about our services and process.
          </p>
        </motion.div>

        {/* FAQ card */}
        <motion.div
          className="bg-white rounded-[2rem] border border-champagne/25 shadow-card px-7 sm:px-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              q={faq.q}
              a={faq.a}
              idx={idx}
              isOpen={openIdx === idx}
              toggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
