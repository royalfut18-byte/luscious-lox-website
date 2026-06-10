import { useEffect, useState } from 'react';
import IntroReveal from './IntroReveal';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
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

export default function HomePage() {
  const [siteVisible, setSiteVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSiteVisible(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

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
      <IntroReveal onComplete={() => setSiteVisible(true)} />

      <div style={{ opacity: siteVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Navbar isHome />
        <main>
          <Hero />
          <TrustStrip />
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
