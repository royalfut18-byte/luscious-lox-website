import { useState } from 'react';
import IntroReveal from './components/IntroReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureExtensions from './components/SignatureExtensions';
import Services from './components/Services';
import ResultsGallery from './components/ResultsGallery';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Reviews from './components/Reviews';
import InstagramPreview from './components/InstagramPreview';
import BookingCTA from './components/BookingCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [siteReady, setSiteReady] = useState(false);

  return (
    <>
      <IntroReveal onComplete={() => setSiteReady(true)} />

      <div
        className={`transition-opacity duration-700 ease-out ${
          siteReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <SignatureExtensions />
          <Services />
          <ResultsGallery />
          <WhyUs />
          <Process />
          <Reviews />
          <InstagramPreview />
          <BookingCTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
