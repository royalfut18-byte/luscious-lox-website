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
import Footer from './components/Footer';

function App() {
  const [ready, setReady] = useState(false);

  // Safety fallback — site always shows after 4s even if intro breaks
  useEffect(() => {
    const fallback = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      {!ready && <IntroReveal onComplete={() => setReady(true)} />}

      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'none' : 'translateY(8px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
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
