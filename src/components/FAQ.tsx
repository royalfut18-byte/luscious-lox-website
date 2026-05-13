import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/siteData';

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-champagne/30 last:border-b-0">
      <button
        onClick={toggle}
        className="w-full flex items-start justify-between gap-4 py-6 sm:py-7 text-left group"
      >
        <span className="font-heading text-[1.1rem] sm:text-[1.25rem] text-espresso leading-snug group-hover:text-muted-gold transition-colors duration-300">
          {q}
        </span>
        <div className="w-8 h-8 rounded-full border border-champagne/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-muted-gold/30 transition-colors duration-300">
          {isOpen ? <Minus size={14} className="text-muted-gold" /> : <Plus size={14} className="text-warm-gray/50" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 text-[14px] text-warm-gray/70 font-body leading-[1.8] max-w-2xl pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="section-gap section-padding">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-sm mb-5 block">Questions</span>
          <h2 className="font-heading text-section text-espresso">
            Frequently <span className="italic">Asked</span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="bg-white rounded-[1.75rem] border border-champagne/30 shadow-card px-7 sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === idx}
              toggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
