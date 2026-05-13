import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'py-5 sm:py-7'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="relative group">
          <span className="font-heading text-[1.5rem] sm:text-[1.75rem] text-espresso italic font-light tracking-tight transition-colors duration-300 group-hover:text-muted-gold">
            Luscious Lox
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12.5px] font-body font-semibold tracking-[0.06em] text-espresso/55 hover:text-espresso transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a href={siteConfig.phoneHref} className="text-[12.5px] font-body font-medium text-espresso/40 hover:text-espresso transition-colors">
            {siteConfig.phone}
          </a>
          <a href={siteConfig.bookingUrl} className="btn-primary !py-3 !px-7 !text-[11px]">
            Book Now
          </a>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <a href={siteConfig.phoneHref} aria-label="Call" className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center text-espresso/50 hover:text-espresso hover:border-espresso/25 transition-all">
            <Phone size={15} />
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center text-espresso/50 hover:text-espresso hover:border-espresso/25 transition-all">
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-cream/98 backdrop-blur-2xl border-t border-champagne/25"
          >
            <div className="px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-heading text-[1.4rem] font-light italic text-espresso/60 hover:text-espresso transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 pt-5 border-t border-champagne/30 space-y-3">
                <a href={siteConfig.bookingUrl} className="btn-primary w-full justify-center">Book Consultation</a>
                <a href={siteConfig.phoneHref} className="btn-secondary w-full justify-center"><Phone size={14} /> Call {siteConfig.phone}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
