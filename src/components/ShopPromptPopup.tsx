import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { shopProducts } from '../data/siteData';

const STORAGE_KEY = 'll-shop-prompt-dismissed';
const SHOW_AFTER_MS = 7000;

/**
 * A single, once-per-visitor invitation to the shop. Dismissing it (or opening
 * the shop from it) is remembered in localStorage so it never nags on a return
 * visit. Deliberately a corner card rather than a full-screen interstitial.
 */
export default function ShopPromptPopup() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Never show it to someone already looking at the shop.
    if (window.location.pathname.replace(/\/+$/, '') === '/shop') {
      return;
    }

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // Private browsing or blocked storage - treat as not dismissed.
    }
    if (dismissed) {
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const remember = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Nothing to do - it will simply appear again next visit.
    }
  };

  const dismiss = () => {
    remember();
    setVisible(false);
  };

  const lead = shopProducts[0];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-[150] left-4 right-4 bottom-24 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[370px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Shop wigs and hair toppers"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#1C1210] text-cream shadow-elevated border border-[#C4A265]/20">
            <div className="absolute -top-16 -right-12 w-[220px] h-[220px] bg-[#C4A265]/[0.12] rounded-full blur-[70px]" />

            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center text-cream/40 hover:text-cream hover:border-cream/30 transition-all duration-300"
            >
              <X size={14} />
            </button>

            <div className="relative flex items-stretch gap-4 p-4 sm:p-5">
              <div className="w-[86px] flex-shrink-0 rounded-xl overflow-hidden bg-[#F7EFE3]">
                <img
                  src={lead.images[0].src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain p-1.5"
                />
              </div>

              <div className="min-w-0 flex-1 pr-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#F0D39E,#D3A35D,#8E6A3F)] px-2.5 py-1 text-[8.5px] font-body font-bold tracking-[0.18em] uppercase text-[#140D0B]">
                  New
                </span>

                <h3 className="mt-2.5 font-heading text-[1.35rem] font-light italic leading-[1.1]">
                  Shop Wigs &amp; Toppers
                </h3>

                <p className="mt-1.5 text-[12px] text-cream/50 font-body font-light leading-[1.6]">
                  Premium Remy human hair, colour-matched by us.
                </p>

                <a
                  href="/shop"
                  onClick={remember}
                  className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#C4A265,#B08D57,#8E7142)] px-5 py-2.5 text-[10px] font-body font-bold tracking-[0.18em] uppercase text-white hover:scale-[1.04] active:scale-[0.98] transition-transform duration-300"
                >
                  <ShoppingBag size={12} />
                  Shop Now
                  <ArrowRight size={12} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
