import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group relative">
            <span className="font-heading text-[1.6rem] sm:text-[1.85rem] font-light text-espresso tracking-[-0.01em] italic transition-all duration-300 group-hover:text-muted-gold">
              Luscious Lox
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] text-espresso/60 hover:text-espresso font-body font-medium tracking-wide transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-muted-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={siteConfig.phoneHref}
              className="text-[13px] text-espresso/50 hover:text-espresso font-body font-medium transition-colors duration-300"
            >
              {siteConfig.phone}
            </a>
            <a href={siteConfig.bookingUrl} className="btn-primary text-[11px] py-3 px-7">
              Book Now
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-espresso/10 text-espresso/60 hover:text-espresso hover:border-espresso/30 transition-all duration-300"
              aria-label="Call us"
            >
              <Phone size={16} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-espresso/10 text-espresso/60 hover:text-espresso hover:border-espresso/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-cream/98 backdrop-blur-2xl border-t border-champagne/30 px-6 py-8 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-[1.3rem] font-heading font-light text-espresso/70 hover:text-espresso transition-colors italic"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-6 space-y-3">
                <a href={siteConfig.bookingUrl} className="btn-primary w-full text-center">
                  Book Consultation
                </a>
                <a href={siteConfig.phoneHref} className="btn-secondary w-full text-center">
                  <Phone size={15} />
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
