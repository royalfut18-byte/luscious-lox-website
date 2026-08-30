import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check, CheckCircle, ChevronLeft, ChevronRight, Minus, Phone, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { shopIntro, shopProducts, siteConfig, type ShopProduct } from '../data/siteData';

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  notes: string;
  website: string;
};

const initialOrderForm: OrderForm = { name: '', phone: '', email: '', notes: '', website: '' };

function OrderModal({ product, onClose }: { product: ShopProduct; onClose: () => void }) {
  const [form, setForm] = useState<OrderForm>(initialOrderForm);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const inputCls =
    'w-full px-4 py-3.5 rounded-xl border border-champagne/40 bg-ivory/30 font-body text-[14px] text-espresso placeholder:text-warm-gray/35 focus:outline-none focus:border-muted-gold/50 focus:ring-2 focus:ring-muted-gold/[0.06] focus:bg-white transition-all duration-300';

  const updateField = <K extends keyof OrderForm>(key: K, value: OrderForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setError('Please provide a phone number or email address.');
      return;
    }

    setSubmitting(true);
    setError('');

    const messageParts = [
      `Order request: ${product.name} (${product.batch})`,
      `Quantity: ${quantity}`,
      product.price ? `Listed price: ${product.price}` : 'Price to be confirmed',
    ];
    if (form.notes.trim()) {
      messageParts.push(`Notes: ${form.notes.trim()}`);
    }

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: product.orderService,
          message: messageParts.join('\n'),
          website: form.website,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(payload?.error || 'Unable to send your order right now. Please try again or call us.');
        return;
      }

      setSent(true);
    } catch {
      setError('Unable to send your order right now. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[1.75rem] border border-champagne/30 shadow-elevated"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`Order ${product.name}`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-espresso/10 flex items-center justify-center text-espresso/40 hover:text-espresso hover:border-espresso/25 transition-all duration-300 bg-white/80 backdrop-blur z-10"
        >
          <X size={15} />
        </button>

        {sent ? (
          <div className="p-10 sm:p-12 text-center flex flex-col items-center justify-center min-h-[380px]">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-muted-gold/15 to-champagne/40 flex items-center justify-center mb-6 border border-champagne/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={30} className="text-muted-gold" />
            </motion.div>
            <h3 className="font-heading text-[1.7rem] text-espresso mb-3 italic">Order Received</h3>
            <p className="text-[14px] text-warm-gray/70 font-body max-w-sm leading-relaxed">
              Thank you! We will contact you within 24 hours to confirm your {product.name}, arrange colour matching, and take payment securely.
            </p>
            <button onClick={onClose} className="btn-secondary mt-8">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 sm:p-9 space-y-5">
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

            <div>
              <span className="label-sm">Order Request</span>
              <h3 className="mt-2 font-heading text-[1.8rem] font-light italic leading-tight text-espresso">{product.name}</h3>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                {product.price ? (
                  <span className="font-heading text-[1.3rem] text-muted-gold">{product.price}</span>
                ) : (
                  <span className="text-[12px] font-body font-semibold text-muted-gold">Price confirmed when we call you</span>
                )}
                <span className="text-[11px] font-body text-warm-gray/50">{product.batch} · {product.tagline}</span>
              </div>
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <div>
              <label className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">Quantity</label>
              <div className="inline-flex items-center gap-1 rounded-xl border border-champagne/40 bg-ivory/30 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-espresso/50 hover:bg-white hover:text-espresso transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-body font-semibold text-[15px] text-espresso">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-espresso/50 hover:bg-white hover:text-espresso transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="shop-name" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                  Name *
                </label>
                <input
                  id="shop-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="shop-phone" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                  Phone
                </label>
                <input
                  id="shop-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputCls}
                  placeholder="0400 000 000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="shop-email" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                Email
              </label>
              <input
                id="shop-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={inputCls}
                placeholder="you@email.com"
              />
              <p className="mt-2 text-[11px] text-warm-gray/45 font-body">Provide a phone number or email so we can confirm your order.</p>
            </div>

            <div>
              <label htmlFor="shop-notes" className="block text-[10px] font-body font-bold tracking-[0.2em] uppercase text-warm-gray/50 mb-2.5">
                Notes
              </label>
              <textarea
                id="shop-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Your hair colour, preferred pickup or delivery, any questions…"
              />
            </div>

            <button type="submit" className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed" disabled={submitting}>
              <ShoppingBag size={14} />
              {submitting ? 'Sending Order…' : 'Place Order Request'}
            </button>

            <p className="text-[11px] text-warm-gray/40 font-body text-center leading-relaxed">
              No payment is taken online. We confirm every order personally — colour match, payment and delivery or in-salon fitting — within 24 hours.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product, index, onOrder }: { product: ShopProduct; index: number; onOrder: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const imageCount = product.images.length;
  const hasMultiple = imageCount > 1;

  // Wraps around so the arrows never dead-end on the first or last photo.
  const step = (delta: number) => setActiveImage((current) => (current + delta + imageCount) % imageCount);

  return (
    <motion.article
      className="relative overflow-hidden rounded-[2rem] bg-white border border-champagne/30 shadow-card grid lg:grid-cols-[1fr_1.15fr]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gallery */}
      <div className="relative flex flex-col bg-[#F7EFE3]">
        <div className="relative flex-1 aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
          {product.images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              aria-hidden={i !== activeImage}
              className={`absolute inset-0 w-full h-full object-contain p-6 sm:p-8 transition-opacity duration-500 ${
                i === activeImage ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 backdrop-blur border border-champagne/40 text-espresso/60 flex items-center justify-center shadow-card hover:bg-white hover:text-espresso hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 backdrop-blur border border-champagne/40 text-espresso/60 flex items-center justify-center shadow-card hover:bg-white hover:text-espresso hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/85 backdrop-blur border border-champagne/40 px-3.5 py-1.5 text-[10px] font-body font-bold tracking-[0.18em] uppercase text-espresso/55">
                {activeImage + 1} / {imageCount}
              </div>
            </>
          )}

          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#F0D39E,#D3A35D,#8E6A3F)] px-4 py-2 text-[10px] font-body font-bold tracking-[0.22em] uppercase text-[#140D0B]">
              <Sparkles size={12} />
              {product.batch} · New
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="flex gap-2.5 p-4 bg-white/60 border-t border-champagne/25 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setActiveImage(i)}
                aria-label={`View photo ${i + 1}: ${img.alt}`}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i === activeImage ? 'border-muted-gold shadow-card' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt="" loading="lazy" className="w-full h-full object-contain bg-[#F7EFE3] p-1" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col">
        <span className="label-sm">{product.tagline}</span>
        <h3 className="mt-3 font-heading text-[clamp(1.9rem,3.5vw,2.8rem)] font-light italic leading-[1.05] tracking-[-0.02em] text-espresso">
          {product.name}
        </h3>

        <p className="mt-5 text-[14px] sm:text-[14.5px] text-warm-gray/65 font-body font-light leading-[1.85]">
          {product.description}
        </p>

        {/* Specs */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {product.specs.map((spec) => (
            <div key={spec.label} className="rounded-xl border border-champagne/30 bg-ivory/40 px-4 py-3">
              <p className="text-[9px] font-body font-bold tracking-[0.18em] uppercase text-warm-gray/45">{spec.label}</p>
              <p className="mt-1 text-[12.5px] font-body font-medium text-espresso/80 leading-snug">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-6 space-y-2.5">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-champagne/40 border border-champagne/50 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-muted-gold" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-body text-espresso/65 leading-snug">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4 flex-wrap border-t border-champagne/25 pt-6">
            <div>
              {product.price ? (
                <span className="font-heading text-[2.6rem] font-medium leading-none bg-[linear-gradient(135deg,#B08D57,#8E7142)] bg-clip-text text-transparent">
                  {product.price}
                </span>
              ) : (
                <span className="font-heading text-[1.5rem] font-light italic text-muted-gold">Enquire for pricing</span>
              )}
              <p className="mt-1.5 text-[11px] font-body text-warm-gray/50">{product.priceNote}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onOrder} className="btn-gold !px-8">
                <ShoppingBag size={13} />
                Order Now
              </button>
              <a href={siteConfig.phoneHref} className="btn-secondary !px-8" aria-label={`Call to ask about the ${product.name}`}>
                <Phone size={13} />
                Ask Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Shop() {
  const [orderingProduct, setOrderingProduct] = useState<ShopProduct | null>(null);

  return (
    <section id="shop" className="py-24 sm:py-32 section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#F8F4EE] to-cream" />
      <div className="absolute top-[15%] right-[5%] w-[420px] h-[420px] bg-muted-gold/[0.05] rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] left-[8%] w-[380px] h-[380px] bg-soft-blush/30 rounded-full blur-[110px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">{shopIntro.eyebrow}</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
            The <em>Topper</em> Collection
          </h2>
          <p className="mt-5 text-[15px] text-warm-gray/60 font-body font-light leading-[1.8] max-w-lg mx-auto">
            {shopIntro.description}
          </p>
        </motion.div>

        {/* Products */}
        <div className="space-y-8">
          {shopProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onOrder={() => setOrderingProduct(product)} />
          ))}
        </div>

        {/* More coming */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[13px] font-body text-warm-gray/50">
            More toppers and wigs arriving soon.{' '}
            <a href="#booking" className="text-muted-gold font-semibold hover:text-espresso transition-colors inline-flex items-center gap-1">
              Ask about the full range <ArrowRight size={12} />
            </a>
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {orderingProduct && <OrderModal product={orderingProduct} onClose={() => setOrderingProduct(null)} />}
      </AnimatePresence>
    </section>
  );
}
