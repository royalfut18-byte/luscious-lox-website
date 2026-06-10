import { ArrowRight, ChevronRight, MapPin, Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { SeoPage } from '../data/seoPages';
import { siteConfig } from '../data/siteData';

type LandingPageProps = {
  page: SeoPage;
};

export default function LandingPage({ page }: LandingPageProps) {
  return (
    <>
      <Navbar isHome={false} />
      <main className="bg-cream text-espresso">
        <section className="relative overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-24">
          <div className="absolute inset-0 bg-cream" />
          <div className="absolute top-0 right-0 h-full w-[55%] hidden lg:block bg-[#F3ECE4]" style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }} />
          <div className="absolute top-[18%] left-[8%] w-[320px] h-[320px] rounded-full bg-muted-gold/[0.04] blur-[100px]" />
          <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
              <div className="max-w-[680px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[1.5px] bg-muted-gold" />
                  <span className="label-sm">Neutral Bay, Sydney</span>
                </div>
                <h1 className="font-heading text-[clamp(2.8rem,7vw,5.3rem)] font-light leading-[0.95] tracking-[-0.04em] text-espresso">
                  {page.h1}
                </h1>
                <p className="mt-8 text-[16px] sm:text-[17px] text-warm-gray/70 font-body font-light leading-[1.9] max-w-[560px]">
                  {page.heroIntro}
                </p>
                <p className="mt-5 text-[15px] text-warm-gray/65 font-body font-light leading-[1.9] max-w-[560px]">
                  {page.openingCopy}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="/#booking" className="btn-primary">
                    Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
                  </a>
                  <a href="/#services" className="btn-secondary">View Services</a>
                  <a href="/" className="btn-secondary">Visit Homepage</a>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4 text-[12px] font-body font-semibold text-espresso/45">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={14} className="text-muted-gold" />
                    {siteConfig.address}
                  </span>
                  <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 hover:text-espresso transition-colors">
                    <Phone size={14} className="text-muted-gold" />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-champagne/20 shadow-[0_30px_80px_rgba(176,141,87,0.08)]">
                  <img src={page.imageSrc} alt={page.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 left-6 sm:left-8 rounded-[1.5rem] border border-champagne/25 bg-white px-6 py-5 shadow-[0_16px_40px_rgba(28,18,16,0.08)]">
                  <p className="text-[10px] font-body font-bold tracking-[0.2em] uppercase text-muted-gold/55">Call the salon</p>
                  <a href={siteConfig.phoneHref} className="mt-2 block font-heading text-[1.4rem] italic text-espresso">
                    {siteConfig.phone}
                  </a>
                  <p className="mt-1 text-[12px] font-body text-warm-gray/55">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-28 section-padding">
          <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-14">
            <div className="bg-white rounded-[2rem] border border-champagne/25 p-8 sm:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[1.5px] bg-muted-gold" />
                <span className="label-sm">Why Luscious Lox</span>
              </div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.3rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
                {page.sectionTitle}
              </h2>
              <div className="mt-6 space-y-5">
                {page.sectionParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] text-warm-gray/70 font-body font-light leading-[1.9]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F4EE] rounded-[2rem] border border-champagne/25 p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[1.5px] bg-muted-gold" />
                <span className="label-sm">Plan Your Visit</span>
              </div>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.03em] text-espresso">
                {page.detailsTitle}
              </h2>
              <div className="mt-6 space-y-5">
                {page.detailsParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] text-warm-gray/70 font-body font-light leading-[1.9]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-champagne/30 bg-white px-6 py-5">
                <p className="text-[10px] font-body font-bold tracking-[0.2em] uppercase text-muted-gold/60">Contact details</p>
                <p className="mt-3 text-[14px] font-body text-espresso/75">{siteConfig.address}</p>
                <div className="mt-3 space-y-2 text-[14px] font-body">
                  <a href={siteConfig.phoneHref} className="block text-espresso/70 hover:text-muted-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                  <a href={siteConfig.landlineHref} className="block text-espresso/70 hover:text-muted-gold transition-colors">
                    {siteConfig.landline}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-28 bg-[#1C1210] text-cream">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[1.5px] bg-[#B08D57]" />
                <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-[#B08D57]/70">Book With Us</span>
              </div>
              <h2 className="font-heading text-[clamp(2.1rem,4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.03em] text-cream">
                Book your consultation in Neutral Bay
              </h2>
              <p className="mt-6 max-w-xl text-[15px] font-body font-light leading-[1.9] text-cream/55">
                Ready to book with Luscious Lox? Use the homepage contact form, browse the main services section, or call the salon directly for current availability.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/#booking" className="btn-gold">
                  Book Consultation <ArrowRight size={13} strokeWidth={2.5} />
                </a>
                <a href="/#services" className="btn-ghost">Services</a>
                <a href="/" className="btn-ghost">Homepage</a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cream/[0.08] bg-white/[0.03] p-8">
              <p className="text-[10px] font-body font-bold tracking-[0.22em] uppercase text-[#B08D57]/70">Related pages</p>
              <div className="mt-5 space-y-4">
                {page.relatedLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-[1.25rem] border border-cream/[0.08] px-5 py-4 text-[14px] font-body text-cream/75 transition-colors hover:text-cream"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-[#B08D57]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer isHome={false} />
    </>
  );
}
