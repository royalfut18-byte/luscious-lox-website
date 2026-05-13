import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls = "w-full px-5 py-4 rounded-xl border border-champagne/40 bg-ivory/30 font-body text-[14px] text-espresso placeholder:text-warm-gray/35 focus:outline-none focus:border-muted-gold/50 focus:ring-2 focus:ring-muted-gold/[0.06] focus:bg-white transition-all duration-300";

  return (
    <section id="booking" className="py-28 sm:py-36 section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-champagne/[0.08] rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-0 w-[400px] h-[400px] bg-soft-blush/30 rounded-full blur-[100px]" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Book Now</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            Ready for Your <em>Dream Hair?</em>
          </h2>
          <p className="mt-5 text-[15px] text-warm-gray/60 font-body font-light leading-[1.8] max-w-lg mx-auto">
            Book a consultation and let us design the perfect extension, colour or styling solution for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
          {/* Left info cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Phone card */}
            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                <Phone size={18} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Call Us</p>
                <a href={siteConfig.phoneHref} className="text-[13px] font-body text-warm-gray/70 hover:text-muted-gold transition-colors">{siteConfig.phone}</a>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                <MapPin size={18} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Visit Us</p>
                <p className="text-[13px] font-body text-warm-gray/70">{siteConfig.address}</p>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                  <Clock size={16} className="text-muted-gold" />
                </div>
                <p className="text-[12px] font-body font-bold tracking-[0.15em] uppercase text-espresso/70">Hours</p>
              </div>
              <div className="space-y-2.5 pl-[52px]">
                {siteConfig.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-[13px] font-body">
                    <span className="text-espresso/70 font-medium">{h.day}</span>
                    <span className={h.hours === 'Closed' ? 'text-warm-gray/25' : 'text-warm-gray/70'}>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card h-[160px] flex items-center justify-center overflow-hidden">
              {siteConfig.googleMapsEmbed ? (
                <iframe
                  src={siteConfig.googleMapsEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Salon location"
                />
              ) : (
                <div className="text-center text-warm-gray/25">
                  <MapPin size={20} className="mx-auto mb-1.5" />
                  <p className="text-[11px] font-body">Google Maps</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <motion.div
                className="bg-white rounded-[2rem] border border-champagne/25 shadow-card p-12 text-center h-full flex flex-col items-center justify-center min-h-[450px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-muted-gold/15 to-champagne/40 flex items-center justify-center mb-7 border border-champagne/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={32} className="text-muted-gold" />
                </motion.div>
                <h3 className="font-heading text-[1.8rem] text-espresso mb-3 italic">Enquiry Sent</h3>
                <p className="text-[14px] text-warm-gray/70 font-body max-w-sm leading-relaxed">
                  Thank you! We'll be in touch shortly to confirm your consultation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-champagne/25 shadow-card p-8 sm:p-10 space-y-5">
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

                <button type="submit" className="btn-primary w-full mt-3">
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
