import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { siteConfig, navLinks } from '../data/siteData';

type NavbarProps = {
  isHome?: boolean;
};

export default function Navbar({ isHome = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brandHref = isHome ? '#home' : '/';
  const bookingHref = isHome ? siteConfig.bookingUrl : '/#booking';
  const resolveHref = (href: string) => (isHome ? href : `/${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? 'glass-nav' : ''
      }`}
    >
      {/* Announcement bar — special offer + home services */}
      <a
        href={resolveHref('#offers')}
        className={`block overflow-hidden bg-[#1C1210] text-center transition-all duration-500 hover:bg-[#241713] ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <p className="px-4 py-2.5 text-[9.5px] sm:text-[11px] font-body font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-cream/85 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-[#E9C88F]">✨ Half-Price Special</span>
          <span className="mx-2 text-cream/30">|</span>
          Keratin Nanoplasty <s className="text-cream/40">$400</s> <span className="text-[#E9C88F]">$200</span>
          <span className="hidden sm:inline">
            <span className="mx-2 text-cream/30">|</span>
            Home visits 7 days — weekends included
          </span>
        </p>
      </a>

      <div
        className={`max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between transition-all duration-700 ${
          scrolled ? 'py-3' : 'py-5 sm:py-6'
        }`}
      >
        <a href={brandHref} className="group">
          <span className="font-heading text-[1.4rem] sm:text-[1.65rem] text-espresso italic font-light tracking-tight group-hover:text-muted-gold transition-colors duration-500">
            Luscious Lox
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isOffer = link.href === '#offers';
            return (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className={`relative text-[11.5px] font-body font-semibold tracking-[0.05em] transition-colors duration-400 group ${
                  isOffer ? 'text-muted-gold hover:text-espresso' : 'text-espresso/50 hover:text-espresso'
                }`}
              >
                {isOffer && <span className="mr-1">✨</span>}
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-muted-gold group-hover:w-full transition-all duration-400" />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3 text-[12px] font-body font-medium text-espresso/35">
            <a href={siteConfig.phoneHref} className="hover:text-espresso transition-colors duration-300">
              {siteConfig.phone}
            </a>
            <span>/</span>
            <a href={siteConfig.landlineHref} className="hover:text-espresso transition-colors duration-300">
              {siteConfig.landline}
            </a>
          </div>
          <a href={bookingHref} className="btn-primary !py-3 !px-7 !text-[10px]">
            Book Now <ArrowRight size={12} />
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <a href={siteConfig.phoneHref} aria-label="Call" className="w-10 h-10 rounded-full border border-espresso/8 flex items-center justify-center text-espresso/40 hover:text-espresso hover:border-espresso/20 transition-all duration-300">
            <Phone size={15} />
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="w-10 h-10 rounded-full border border-espresso/8 flex items-center justify-center text-espresso/40 hover:text-espresso hover:border-espresso/20 transition-all duration-300">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-2xl border-t border-champagne/20 shadow-elevated"
          >
            <div className="px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setOpen(false)}
                  className={`block py-3 font-heading text-[1.35rem] font-light italic transition-colors ${
                    link.href === '#offers' ? 'text-muted-gold hover:text-espresso' : 'text-espresso/50 hover:text-espresso'
                  }`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.href === '#offers' ? `✨ ${link.label}` : link.label}
                </motion.a>
              ))}
              <div className="mt-6 pt-5 border-t border-champagne/25 space-y-3">
                <a href={bookingHref} onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Book Consultation</a>
                <a href={siteConfig.phoneHref} onClick={() => setOpen(false)} className="btn-secondary w-full justify-center"><Phone size={13} /> {siteConfig.phone}</a>
                <a href={siteConfig.landlineHref} onClick={() => setOpen(false)} className="btn-secondary w-full justify-center"><Phone size={13} /> {siteConfig.landline}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
