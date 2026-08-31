import { useEffect, useState } from 'react';
import IntroReveal from './IntroReveal';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import SpecialOffers from './SpecialOffers';
import Services from './Services';
import SignatureExtensions from './SignatureExtensions';
import ShopTeaser from './ShopTeaser';
import ShopPromptPopup from './ShopPromptPopup';
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

  // Reduced motion no longer skips the intro outright - IntroReveal renders a
  // still version instead, so the brand reveal is not lost to those users.
  return window.sessionStorage?.getItem('ll-intro-seen') === '1';
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
          {/* Shop sits high: it is the newest offer and the only one that can be bought outright */}
          <ShopTeaser />
          <SpecialOffers />
          <SignatureExtensions />
          <Services />
          <ResultsGallery />
          <CTABand />
          <Reviews />
          <InstagramPreview />
          <FAQ />
          <BookingForm />
        </main>
        <Footer isHome />
        <Chatbot />
        <ShopPromptPopup />
      </div>
    </>
  );
}
