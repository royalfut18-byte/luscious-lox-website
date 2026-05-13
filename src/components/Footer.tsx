import { motion } from 'framer-motion';
import { Instagram, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1C1210] text-cream/70 overflow-hidden">
      {/* Top gold line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-muted-gold/25 to-transparent" />

      {/* Background glows */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[300px] bg-[#B08D57]/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-[30%] left-[5%] w-[300px] h-[200px] bg-[#B08D57]/[0.02] rounded-full blur-[80px]" />

      {/* CTA band */}
      <div className="relative border-b border-cream/[0.06] py-16 sm:py-20 px-6 sm:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h3 className="font-heading text-[clamp(1.4rem,3vw,2.2rem)] text-cream font-light italic leading-tight">
                Ready to transform your hair?
              </h3>
              <p className="text-[13px] text-cream/30 font-body mt-2">Book a consultation with Luscious Lox today.</p>
            </div>
            <a href={siteConfig.bookingUrl} className="btn-gold flex-shrink-0">
              Book Now <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-heading text-[1.8rem] text-cream font-light italic mb-4">Luscious Lox</h4>
            <p className="text-[13px] text-cream/30 font-body leading-relaxed max-w-xs">
              Celebrity hair extension specialists creating seamless, luxury transformations in Leichhardt, Sydney.
            </p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-6 text-[12px] font-body font-medium text-cream/35 hover:text-[#B08D57] transition-colors duration-300 group"
            >
              <div className="w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center group-hover:border-[#B08D57]/30 transition-colors duration-300">
                <Instagram size={13} />
              </div>
              {siteConfig.instagram}
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/20 mb-6">Services</p>
            <ul className="space-y-3.5 text-[13px] font-body text-cream/40">
              <li><a href="#extensions" className="hover:text-cream hover:pl-1 transition-all duration-300">Nano Extensions</a></li>
              <li><a href="#extensions" className="hover:text-cream hover:pl-1 transition-all duration-300">Tape Extensions</a></li>
              <li><a href="#services" className="hover:text-cream hover:pl-1 transition-all duration-300">Balayage & Colour</a></li>
              <li><a href="#services" className="hover:text-cream hover:pl-1 transition-all duration-300">Keratin Treatments</a></li>
              <li><a href="#services" className="hover:text-cream hover:pl-1 transition-all duration-300">Styling & Blowdry</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/20 mb-6">Contact</p>
            <ul className="space-y-4 text-[13px] font-body text-cream/40">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 text-[#B08D57]/40 flex-shrink-0" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-[#B08D57]/40 flex-shrink-0" />
                <a href={siteConfig.phoneHref} className="hover:text-cream transition-colors duration-300">{siteConfig.phone}</a>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/20 mb-6">Hours</p>
            <div className="space-y-2.5 text-[12px] font-body text-cream/35">
              {siteConfig.hours.map(h => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span className="text-cream/40">{h.day}</span>
                  <span className={h.hours === 'Closed' ? 'text-cream/15' : 'text-cream/50'}>{h.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/[0.05] py-7 px-6 sm:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-cream/15 font-body">© {year} {siteConfig.fullName}. All rights reserved.</p>
          <p className="text-[11px] text-cream/15 font-body">{siteConfig.address}</p>
        </div>
      </div>
    </footer>
  );
}
