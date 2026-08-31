import { motion } from 'framer-motion';
import { ArrowUpRight, Brush, Check, Palette, Scissors, Sparkles, Wind } from 'lucide-react';
import { services, type Service } from '../data/siteData';

const iconFor: Record<Service['title'], typeof Scissors> = {
  'Hair Extensions': Scissors,
  'Tape Extensions': Sparkles,
  Balayage: Brush,
  'Hair Colouring': Palette,
  'Keratin Treatments': Sparkles,
  'Styling and Blowdry': Wind,
};

/** A landing page is worth an "explore" nudge; the booking anchor is not. */
const isPage = (href: string) => href.startsWith('/');

function ServiceCard({ service, idx }: { service: Service; idx: number }) {
  const Icon = iconFor[service.title] ?? Sparkles;
  const featured = Boolean(service.image);

  return (
    <motion.a
      href={service.href}
      className={`group relative bg-white rounded-[1.5rem] border border-champagne/30 overflow-hidden flex ${
        featured ? 'sm:col-span-2 flex-col sm:flex-row' : 'flex-col'
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(176, 141, 87, 0.08)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/[0.02] to-champagne/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {featured && (
        <div className="relative sm:w-[44%] flex-shrink-0 overflow-hidden bg-ivory">
          <div className="h-[200px] sm:h-full min-h-[200px]">
            <img
              src={service.image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 to-transparent sm:bg-gradient-to-r" />
        </div>
      )}

      <div className={`relative flex-1 p-7 ${featured ? 'sm:p-9' : 'sm:p-8'} flex flex-col`}>
        {/* Icon + number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center group-hover:border-muted-gold/35 transition-colors duration-500">
            <Icon size={17} className="text-muted-gold" />
          </div>
          <span className="text-[11px] font-body font-bold tracking-[0.2em] text-muted-gold/40">
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        <h3
          className={`font-heading text-espresso italic leading-tight mb-3 ${
            featured ? 'text-[1.7rem] sm:text-[2rem]' : 'text-[1.4rem] sm:text-[1.55rem]'
          }`}
        >
          {service.title}
        </h3>

        <p className="text-[13.5px] text-warm-gray/60 font-body leading-[1.75]">{service.desc}</p>

        {/* Concrete detail replaces the old category slug */}
        <div className="mt-5 space-y-2.5">
          {service.points.map((point) => (
            <div key={point} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-muted-gold" strokeWidth={2.5} />
              </div>
              <span className="text-[12.5px] font-body text-espresso/65 leading-snug">{point}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between gap-3 border-t border-champagne/25">
          <span className="text-[10px] font-body font-bold tracking-[0.22em] uppercase text-espresso/45 group-hover:text-muted-gold transition-colors duration-400">
            {isPage(service.href) ? 'Explore' : 'Book this'}
          </span>
          <div className="w-9 h-9 rounded-full border border-espresso/8 flex items-center justify-center group-hover:border-muted-gold/30 group-hover:bg-muted-gold/[0.06] transition-all duration-500">
            <ArrowUpRight
              size={13}
              className="text-muted-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-400"
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28 sm:py-36 section-padding overflow-hidden relative">
      <div className="absolute top-[20%] left-[4%] w-[380px] h-[380px] bg-champagne/[0.18] rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1.5px] bg-muted-gold" />
              <span className="label-sm">Services</span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
              What We <em>Offer</em>
            </h2>
          </motion.div>
          <motion.p
            className="self-end text-[15px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-md lg:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Extensions, colour, smoothing and styling - every service starts with a consultation, so what you walk
            out with is what you came in hoping for.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
