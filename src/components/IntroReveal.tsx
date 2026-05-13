import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    // Start fade out after intro plays
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2100);

    // Fully remove and reveal site
    const removeTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 400);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#FDFBF7] transition-opacity duration-[600ms] ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Skip */}
      <button
        onClick={skip}
        className="absolute top-7 right-7 sm:top-9 sm:right-10 text-[#1C1210]/20 hover:text-[#1C1210]/50 text-[10px] font-sans font-bold tracking-[0.3em] uppercase transition-colors z-10"
      >
        Skip
      </button>

      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(176, 141, 87, 0.07) 0%, transparent 65%)' }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
      />

      {/* Hair strand lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(11)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: '1px',
              height: `${90 + i * 15}px`,
              left: `${12 + i * 7}%`,
              top: '22%',
              background: `linear-gradient(180deg, transparent, rgba(176, 141, 87, ${0.12 + i * 0.02}), rgba(176, 141, 87, ${0.04}), transparent)`,
              transformOrigin: 'top center',
            }}
            initial={{ scaleY: 0, opacity: 0, rotate: -15 + i * 3 }}
            animate={{
              scaleY: [0, 1.1, 0.6],
              opacity: [0, 0.7, 0.15],
              rotate: [-15 + i * 3, -8 + i * 2],
              y: [0, 40],
            }}
            transition={{
              duration: 2.2,
              delay: 0.1 + i * 0.05,
              ease: [0.25, 0.8, 0.25, 1],
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center px-6">
        {/* Top ornament */}
        <motion.div
          className="h-[1.5px] rounded-full mb-10"
          style={{ background: 'rgba(176, 141, 87, 0.35)' }}
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Logo text — clip reveal */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] font-light italic leading-[0.9] text-[#1C1210]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.03em' }}
            initial={{ y: '120%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Luscious Lox
          </motion.h1>
        </div>

        {/* Gold shimmer sweep */}
        <motion.div
          className="absolute top-1/2 left-[-10%] right-[-10%] h-[80%] -translate-y-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(196, 162, 101, 0.12) 40%, rgba(196, 162, 101, 0.3) 50%, rgba(196, 162, 101, 0.12) 60%, transparent 100%)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.3, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Subtitle */}
        <motion.div
          className="flex items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <div className="w-5 h-[1px] bg-[#B08D57]/35" />
          <span
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#5C4F44]/45"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}
          >
            Hair · Leichhardt · Sydney
          </span>
          <div className="w-5 h-[1px] bg-[#B08D57]/35" />
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-10 h-[1px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(176, 141, 87, 0.3), transparent)' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 90, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
