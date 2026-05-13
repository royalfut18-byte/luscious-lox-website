import { useState, useEffect, useCallback } from 'react';
import IntroReveal from './components/IntroReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import SignatureExtensions from './components/SignatureExtensions';
import ResultsGallery from './components/ResultsGallery';
import Reviews from './components/Reviews';
import CTABand from './components/CTABand';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // Small delay before revealing site so the intro fully fades
    setTimeout(() => setSiteVisible(true), 100);
  }, []);

  // Absolute safety net — if intro fails catastrophically, show site after 5s
  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
      setSiteVisible(true);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showIntro && <IntroReveal onComplete={handleIntroComplete} />}

      <div
        style={{
          opacity: siteVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <SignatureExtensions />
          <ResultsGallery />
          <CTABand />
          <Reviews />
          <FAQ />
          <BookingForm />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
