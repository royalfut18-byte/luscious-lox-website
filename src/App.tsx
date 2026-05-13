import { useState } from 'react';
import IntroReveal from './components/IntroReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import SignatureExtensions from './components/SignatureExtensions';
import ResultsGallery from './components/ResultsGallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <IntroReveal onComplete={() => setReady(true)} />
      <div
        className={`transition-all duration-1000 ease-out ${
          ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <SignatureExtensions />
          <ResultsGallery />
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
