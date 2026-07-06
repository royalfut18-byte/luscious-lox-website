import { useEffect, useState } from 'react';
import IntroReveal from './IntroReveal';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import SpecialOffers from './SpecialOffers';
import Services from './Services';
import SignatureExtensions from './SignatureExtensions';
import ResultsGallery from './ResultsGallery';
import Reviews from './Reviews';
import CTABand from './CTABand';
import FAQ from './FAQ';
import BookingForm from './BookingForm';
import InstagramPreview from './InstagramPreview';
import Footer from './Footer';
import Chatbot from './Chatbot';

const scrollToHash = () => {
  const hash = window.location.hash.replace('#', '');

  if (!hash) {
    return;
  }

  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const shouldSkipIntro = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = window.sessionStorage?.getItem('ll-intro-seen') === '1';

  return Boolean(prefersReducedMotion || alreadySeen);
};

export default function HomePage() {
  const [skipIntro] = useState(shouldSkipIntro);
  const [siteVisible, setSiteVisible] = useState(skipIntro);

  useEffect(() => {
    if (skipIntro) {
      return;
    }

    // Safety fallback in case the intro never signals completion
    const timer = window.setTimeout(() => setSiteVisible(true), 5000);
    return () => window.clearTimeout(timer);
  }, [skipIntro]);

  useEffect(() => {
    if (siteVisible) {
      window.sessionStorage?.setItem('ll-intro-seen', '1');
    }
  }, [siteVisible]);

  useEffect(() => {
    const timer = window.setTimeout(() => scrollToHash(), siteVisible ? 120 : 650);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [siteVisible]);

  return (
    <>
      {!skipIntro && <IntroReveal onComplete={() => setSiteVisible(true)} />}

      <div style={{ opacity: siteVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Navbar isHome />
        <main>
          <Hero />
          <TrustStrip />
          <SpecialOffers />
          <Services />
          <SignatureExtensions />
          <ResultsGallery />
          <CTABand />
          <Reviews />
          <InstagramPreview />
          <FAQ />
          <BookingForm />
        </main>
        <Footer isHome />
        <Chatbot />
      </div>
    </>
  );
}
