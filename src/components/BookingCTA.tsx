import { motion } from 'framer-motion';
import { Phone, MapPin, Instagram, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function BookingCTA() {
  return (
    <section className="relative py-28 sm:py-36 section-padding overflow-hidden">
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-espresso" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,149,107,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,168,124,0.05),transparent_50%)]" />

      {/* Subtle gold border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-muted-gold/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-8"
        >
          <span className="label-sm !text-muted-gold/70 block">Ready?</span>

          <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-light text-cream leading-[1.1]">
            Ready for Your<br />
            <span className="italic text-rich-gold">Dream Hair?</span>
          </h2>

          <p className="text-cream/50 font-body text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Book a consultation with Luscious Lox HAIR Leichhardt and discover the perfect extension,
            colour or styling solution for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href={siteConfig.phoneHref} className="btn-gold">
              <Phone size={15} />
              Call {siteConfig.phone}
              <ArrowRight size={14} />
            </a>
            <a
              href={siteConfig.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MapPin size={15} />
              Get Directions
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Instagram size={15} />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
