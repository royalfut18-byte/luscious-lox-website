import { Instagram, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-espresso text-cream/70">
      {/* Top gold line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-muted-gold/20 to-transparent" />

      {/* CTA band */}
      <div className="border-b border-cream/[0.06] py-14 sm:py-16 px-6 sm:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-[1.6rem] sm:text-[1.9rem] text-cream font-light italic">Ready to transform your hair?</h3>
            <p className="text-[13px] text-cream/35 font-body mt-1">Book a consultation with Luscious Lox today.</p>
          </div>
          <a href={siteConfig.bookingUrl} className="btn-gold flex-shrink-0">
            Book Now <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <h4 className="font-heading text-[1.6rem] text-cream font-light italic mb-4">Luscious Lox</h4>
            <p className="text-[13px] text-cream/35 font-body leading-relaxed max-w-xs">
              Celebrity hair extension specialists creating seamless, luxury transformations in Leichhardt, Sydney.
            </p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[12px] font-body font-medium text-cream/40 hover:text-muted-gold transition-colors"
            >
              <Instagram size={13} /> {siteConfig.instagram} <ArrowUpRight size={10} />
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/25 mb-5">Services</p>
            <ul className="space-y-3 text-[13px] font-body text-cream/45">
              <li><a href="#extensions" className="hover:text-cream transition-colors duration-300">Nano Extensions</a></li>
              <li><a href="#extensions" className="hover:text-cream transition-colors duration-300">Tape Extensions</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Balayage & Colour</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Keratin Treatments</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Styling & Blowdry</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/25 mb-5">Contact</p>
            <ul className="space-y-4 text-[13px] font-body text-cream/45">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 text-muted-gold/50 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-muted-gold/50 flex-shrink-0" />
                <a href={siteConfig.phoneHref} className="hover:text-cream transition-colors duration-300">{siteConfig.phone}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-cream/25 mb-5">Hours</p>
            <div className="space-y-2 text-[12px] font-body text-cream/40">
              {siteConfig.hours.filter(h => h.hours !== 'Closed').map(h => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream/55">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-cream/[0.05] py-6 px-6 sm:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-cream/20 font-body">© {year} {siteConfig.fullName}. All rights reserved.</p>
          <p className="text-[11px] text-cream/20 font-body">{siteConfig.address}</p>
        </div>
      </div>
    </footer>
  );
}
