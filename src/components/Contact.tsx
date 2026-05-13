import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // REPLACE: Connect to your form backend (e.g., Formspree, Netlify Forms, or custom API)
    setSubmitted(true);
  };

  const inputClasses = "w-full px-5 py-3.5 rounded-xl border border-champagne/60 bg-cream/50 font-body text-[14px] text-espresso placeholder:text-warm-gray/40 focus:outline-none focus:border-muted-gold/50 focus:ring-2 focus:ring-muted-gold/10 focus:bg-white transition-all duration-300";

  return (
    <section id="contact" className="section-gap section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="label-sm mb-5 block">Get In Touch</span>
          <h2 className="font-heading text-hero font-light text-espresso">
            <span className="italic">Contact</span> Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14">
          {/* Left — Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Contact cards */}
            <div className="space-y-5">
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-champagne/30 shadow-card">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/60 to-muted-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={17} className="text-muted-gold" />
                </div>
                <div>
                  <p className="font-heading text-lg text-espresso mb-0.5">{siteConfig.fullName}</p>
                  <p className="text-[13px] text-warm-gray font-body">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-champagne/30 shadow-card">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/60 to-muted-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={17} className="text-muted-gold" />
                </div>
                <div>
                  <p className="font-heading text-lg text-espresso mb-0.5">Phone</p>
                  <a href={siteConfig.phoneHref} className="text-[13px] text-warm-gray font-body hover:text-muted-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-champagne/30 shadow-card">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-champagne/60 to-muted-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={17} className="text-muted-gold" />
                </div>
                <div>
                  <p className="font-heading text-lg text-espresso mb-2">Hours</p>
                  {/* REPLACE: Update business hours as needed */}
                  <div className="text-[13px] text-warm-gray font-body space-y-1.5">
                    {siteConfig.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-8">
                        <span className="font-medium">{h.day}</span>
                        <span className={h.hours === 'Closed' ? 'text-warm-gray/40' : ''}>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder — REPLACE: Add real Google Maps iframe embed */}
            <div className="rounded-2xl overflow-hidden border border-champagne/30 shadow-card h-[200px] bg-gradient-to-br from-champagne/30 to-warm-beige/20 flex items-center justify-center">
              <div className="text-center text-warm-gray/30 font-body text-sm">
                <MapPin size={20} className="mx-auto mb-2" />
                <p className="text-xs">Google Maps Embed</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {submitted ? (
              <div className="bg-white rounded-[1.75rem] p-12 border border-champagne/30 shadow-card text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center mb-6">
                  <CheckCircle size={28} className="text-muted-gold" />
                </div>
                <h3 className="font-heading text-2xl text-espresso mb-3">Message Sent</h3>
                <p className="text-[14px] text-warm-gray font-body max-w-sm">
                  Thank you for reaching out. We'll be in touch soon to discuss your hair goals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[1.75rem] p-8 sm:p-10 border border-champagne/30 shadow-card space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-warm-gray/60 mb-2.5">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-warm-gray/60 mb-2.5">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                      placeholder="0400 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-warm-gray/60 mb-2.5">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClasses}
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-warm-gray/60 mb-2.5">Service</label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={inputClasses}
                  >
                    <option value="">Select a service you're interested in</option>
                    <option value="nano-extensions">Nano Hair Extensions</option>
                    <option value="tape-extensions">Tape Hair Extensions</option>
                    <option value="remy-extensions">Remy Hair Extensions</option>
                    <option value="balayage">Balayage</option>
                    <option value="colouring">Hair Colouring</option>
                    <option value="styling">Styling</option>
                    <option value="keratin">Keratin Treatment</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-warm-gray/60 mb-2.5">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your hair goals..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
