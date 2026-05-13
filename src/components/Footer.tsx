import { Instagram, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-espresso text-cream/80 relative">
      {/* Gold accent top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-muted-gold/25 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20 sm:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-[1.8rem] text-cream font-light italic mb-4">Luscious Lox</h3>
            <p className="text-[13px] text-cream/40 font-body leading-relaxed max-w-xs">
              Celebrity hair extension specialists creating seamless, undetectable luxury extensions in Leichhardt, Sydney.
            </p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[12px] font-body font-medium text-cream/50 hover:text-muted-gold transition-colors"
            >
              <Instagram size={14} />
              {siteConfig.instagram}
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-body font-semibold tracking-[0.2em] uppercase text-cream/30 mb-5">Services</h4>
            <ul className="space-y-3 text-[13px] font-body text-cream/50">
              <li><a href="#extensions" className="hover:text-cream transition-colors duration-300">Nano Extensions</a></li>
              <li><a href="#extensions" className="hover:text-cream transition-colors duration-300">Tape Extensions</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Balayage & Colour</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Keratin Treatments</a></li>
              <li><a href="#services" className="hover:text-cream transition-colors duration-300">Styling & Blowdry</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-body font-semibold tracking-[0.2em] uppercase text-cream/30 mb-5">Contact</h4>
            <ul className="space-y-4 text-[13px] font-body text-cream/50">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 text-muted-gold/60 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-muted-gold/60 flex-shrink-0" />
                <a href={siteConfig.phoneHref} className="hover:text-cream transition-colors duration-300">{siteConfig.phone}</a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-body font-semibold tracking-[0.2em] uppercase text-cream/30 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-[13px] font-body text-cream/50">
              <li><a href="#home" className="hover:text-cream transition-colors duration-300">Home</a></li>
              <li><a href="#results" className="hover:text-cream transition-colors duration-300">Results</a></li>
              <li><a href="#reviews" className="hover:text-cream transition-colors duration-300">Reviews</a></li>
              <li><a href="#contact" className="hover:text-cream transition-colors duration-300">Contact</a></li>
              <li><a href={siteConfig.bookingUrl} className="hover:text-cream transition-colors duration-300">Book Consultation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-cream/25 font-body">
            © {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="text-[11px] text-cream/25 font-body">
            {siteConfig.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
