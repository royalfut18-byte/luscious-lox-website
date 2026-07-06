import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig } from '../data/siteData';

type InquiryForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
  website: string;
};

const initialForm: InquiryForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  message: '',
  website: '',
};

const serviceOptions = [
  'Keratin Nanoplasty Special ($200)',
  'Home Service Visit',
  'Nano Extensions',
  'Tape Extensions',
  'Remy Extensions',
  'Balayage',
  'Hair Colouring',
  'Keratin Treatment',
  'Styling / Blowdry',
  'General Consultation',
];

export default function BookingForm() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const inputCls =
    'w-full px-5 py-4 rounded-xl border border-champagne/40 bg-ivory/30 font-body text-[14px] text-espresso placeholder:text-warm-gray/35 focus:outline-none focus:border-muted-gold/50 focus:ring-2 focus:ring-muted-gold/[0.06] focus:bg-white transition-all duration-300';

  const updateField = <K extends keyof InquiryForm>(key: K, value: InquiryForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validateClientSide = () => {
    if (!form.name.trim()) {
      return 'Please enter your name.';
    }
    if (!form.phone.trim() && !form.email.trim()) {
      return 'Please provide a phone number or email address.';
    }
    if (!form.service.trim()) {
      return 'Please select a service.';
    }
    if (!form.message.trim()) {
      return 'Please tell us about your hair goals.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clientError = validateClientSide();
    if (clientError) {
      setError(clientError);
      setSent(false);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          preferredDate: form.date,
          message: form.message,
          website: form.website,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSent(false);
        setError(payload?.error || 'Unable to send your inquiry right now. Please try again.');
        return;
      }

      setSent(true);
      setForm(initialForm);
    } catch {
      setSent(false);
      setError('Unable to send your inquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-28 sm:py-36 section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-cream" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-champagne/[0.08] rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-0 w-[400px] h-[400px] bg-soft-blush/30 rounded-full blur-[100px]" />

      <div className="relative max-w-[1200px] mx-auto">
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
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                  <Phone size={18} className="text-muted-gold" />
                </div>
                <div>
                  <p className="text-[13px] font-body font-bold text-espresso">Call Us</p>
                  <div className="mt-1 space-y-1">
                    <a href={siteConfig.phoneHref} className="block text-[13px] font-body text-warm-gray/70 hover:text-muted-gold transition-colors">
                      {siteConfig.phone}
                    </a>
                    <a href={siteConfig.landlineHref} className="block text-[13px] font-body text-warm-gray/70 hover:text-muted-gold transition-colors">
                      {siteConfig.landline}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                <Mail size={18} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Email Us</p>
                <a href={siteConfig.emailHref} className="text-[13px] font-body text-warm-gray/70 hover:text-muted-gold transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:border-champagne/40 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne/50 to-muted-gold/10 border border-champagne/40 flex items-center justify-center">
                <MapPin size={18} className="text-muted-gold" />
              </div>
              <div>
                <p className="text-[13px] font-body font-bold text-espresso">Visit Us</p>
                <p className="text-[13px] font-body text-warm-gray/70">{siteConfig.address}</p>
              </div>
            </div>

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

            <div className="bg-white rounded-[1.25rem] border border-champagne/25 shadow-card h-[160px] flex items-center justify-center overflow-hidden">
              {siteConfig.googleMapsEmbed ? (
                <iframe src={siteConfig.googleMapsEmbed} className="w-full h-full border-0" loading="lazy" title="Salon location" />
              ) : (
                <div className="text-center text-warm-gray/25">
                  <MapPin size={20} className="mx-auto mb-1.5" />
                  <p className="text-[11px] font-body">Google Maps</p>
                </div>
              )}
            </div>
          </motion.div>

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
                <h3 className="font-heading text-[1.8rem] text-espresso mb-3 italic">Inquiry Sent</h3>
                <p className="text-[14px] text-warm-gray/70 font-body max-w-sm leading-relaxed">
                  Thank you. We will be in touch shortly to confirm your consultation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-champagne/25 shadow-card p-8 sm:p-10 space-y-5">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                {error ? (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                ) : null}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bk-name" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                      Name *
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={inputCls}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                      Phone
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={inputCls}
                      placeholder="0400 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-email" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                    Email
                  </label>
                  <input
                    id="bk-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inputCls}
                    placeholder="you@email.com"
                  />
                  <p className="mt-2 text-[11px] text-warm-gray/45 font-body">Provide a phone number or email so we can contact you.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bk-service" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                      Service *
                    </label>
                    <select
                      id="bk-service"
                      required
                      value={form.service}
                      onChange={(e) => updateField('service', e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bk-date" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                      Preferred Date
                    </label>
                    <input
                      id="bk-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-msg" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                    Details *
                  </label>
                  <textarea
                    id="bk-msg"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about your hair goals, current hair length, or the result you want."
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-3 disabled:opacity-70 disabled:cursor-not-allowed" disabled={submitting}>
                  <Send size={14} />
                  {submitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                </button>

                <p className="text-[11px] text-warm-gray/40 font-body text-center pt-1" aria-live="polite">
                  We will confirm your appointment via phone or email within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
