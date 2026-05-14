import { useState, useEffect } from 'react';
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
import InstagramPreview from './components/InstagramPreview';
import Footer from './components/Footer';

function App() {
  const [siteVisible, setSiteVisible] = useState(false);

  // Safety: always show site after 5s no matter what
  useEffect(() => {
    const t = setTimeout(() => setSiteVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Intro is always rendered — it fades itself out and becomes pointer-events:none */}
      <IntroReveal onComplete={() => setSiteVisible(true)} />

      {/* Site content — starts invisible, fades in when intro completes */}
      <div style={{ opacity: siteVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Navbar />
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
        <Footer />
      </div>
    </>
  );
}

export default App;
