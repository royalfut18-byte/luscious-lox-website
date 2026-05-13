import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase or form backend (Formspree, Netlify Forms, etc.)
    setSent(true);
  };

  const inputCls = "w-full px-5 py-4 rounded-xl border border-champagne/50 bg-ivory/40 font-body text-[14px] text-espresso placeholder:text-warm-gray/35 focus:outline-none focus:border-muted-gold/40 focus:ring-2 focus:ring-muted-gold/8 focus:bg-white transition-all duration-300";

  return (
    <section id="booking" className="section-gap section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-champagne/10 rounded-full blur-[120px]" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-sm mb-5 block">Book Now</span>
          <h2 className="font-heading text-section text-espresso">
            Ready for Your <span className="italic">Dream Hair?</span>
          </h2>
          <p className="mt-5 section-desc mx-auto">
            Book a consultation and let us design the perfect extension, colour or styling solution for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
          {/* Left info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-premium p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-champagne/40 border border-champagne/40 flex items-center justify-center">
                <Phone size={17} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Call Us</p>
                <a href={siteConfig.phoneHref} className="text-[13px] font-body text-warm-gray/70 hover:text-muted-gold transition-colors">{siteConfig.phone}</a>
              </div>
            </div>

            <div className="card-premium p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-champagne/40 border border-champagne/40 flex items-center justify-center">
                <MapPin size={17} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Visit Us</p>
                <p className="text-[13px] font-body text-warm-gray/70">{siteConfig.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="card-premium p-6">
              <p className="text-[12px] font-body font-bold tracking-[0.15em] uppercase text-espresso/60 mb-4">Opening Hours</p>
              <div className="space-y-2">
                {siteConfig.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-[13px] font-body">
                    <span className="text-espresso/70 font-medium">{h.day}</span>
                    <span className={h.hours === 'Closed' ? 'text-warm-gray/30' : 'text-warm-gray/70'}>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder — REPLACE: Add Google Maps iframe */}
            <div className="card-premium h-[160px] flex items-center justify-center overflow-hidden">
              {siteConfig.googleMapsEmbed ? (
                <iframe
                  src={siteConfig.googleMapsEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Salon location"
                />
              ) : (
                <div className="text-center text-warm-gray/25">
                  <MapPin size={20} className="mx-auto mb-1" />
                  <p className="text-[11px] font-body">Google Maps</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="card-premium p-12 text-center h-full flex flex-col items-center justify-center min-h-[450px]">
                <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center mb-6">
                  <CheckCircle size={28} className="text-muted-gold" />
                </div>
                <h3 className="font-heading text-[1.6rem] text-espresso mb-3">Enquiry Sent</h3>
                <p className="text-[14px] text-warm-gray/70 font-body max-w-sm">
                  Thank you! We'll be in touch shortly to confirm your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-premium p-8 sm:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bk-name" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Name *</label>
                    <input id="bk-name" type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Phone *</label>
                    <input id="bk-phone" type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} placeholder="0400 000 000" />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-email" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Email *</label>
                  <input id="bk-email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} placeholder="you@email.com" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bk-service" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Service</label>
                    <select id="bk-service" value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={inputCls}>
                      <option value="">Select service</option>
                      <option value="nano-extensions">Nano Extensions</option>
                      <option value="tape-extensions">Tape Extensions</option>
                      <option value="remy-extensions">Remy Extensions</option>
                      <option value="balayage">Balayage</option>
                      <option value="colouring">Hair Colouring</option>
                      <option value="keratin">Keratin Treatment</option>
                      <option value="styling">Styling / Blowdry</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bk-date" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Preferred Date</label>
                    <input id="bk-date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-msg" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Message</label>
                  <textarea id="bk-msg" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputCls} resize-none`} placeholder="Tell us about your hair goals..." />
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  <Send size={14} />
                  Send Enquiry
                </button>

                <p className="text-[11px] text-warm-gray/40 font-body text-center pt-1">
                  We'll confirm your appointment via phone or email within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
