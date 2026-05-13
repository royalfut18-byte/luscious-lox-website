import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const [visible, setVisible] = useState(true);
  const hasRun = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hasSeenBefore =
    typeof window !== 'undefined' &&
    localStorage.getItem('lusciouslox_intro') === 'true';

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (prefersReducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    const duration = hasSeenBefore ? 800 : 2400;
    const timer = setTimeout(() => {
      setVisible(false);
      localStorage.setItem('lusciouslox_intro', 'true');
    }, duration);

    return () => clearTimeout(timer);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  if (!visible && !prefersReducedMotion) {
    // brief exit animation still playing
  }

  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Skip button */}
          <button
            onClick={() => {
              setVisible(false);
              localStorage.setItem('lusciouslox_intro', 'true');
            }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-espresso/30 hover:text-espresso/60 text-[11px] font-body tracking-[0.2em] uppercase transition-colors z-10"
          >
            Skip
          </button>

          {/* Background strands */}
          {!hasSeenBefore && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: '1px',
                    height: `${80 + i * 20}px`,
                    left: `${20 + i * 9}%`,
                    top: '30%',
                    background: `linear-gradient(180deg, transparent, rgba(184, 149, 107, ${0.15 + i * 0.03}), transparent)`,
                    transformOrigin: 'top center',
                  }}
                  initial={{ opacity: 0, scaleY: 0, rotate: -15 + i * 5 }}
                  animate={{
                    opacity: [0, 0.8, 0.4],
                    scaleY: [0, 1, 0.6],
                    rotate: [-15 + i * 5, -10 + i * 4, -5 + i * 3],
                    y: [0, 20, 50],
                  }}
                  transition={{
                    duration: 2.0,
                    delay: 0.1 + i * 0.08,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

          {/* Center content */}
          <div className="relative flex flex-col items-center px-6">
            {/* Gold accent line above */}
            <motion.div
              className="w-8 h-[1px] bg-muted-gold/40 mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: hasSeenBefore ? 0.3 : 0.8, delay: hasSeenBefore ? 0 : 0.2, ease: 'easeOut' }}
            />

            {/* Logo text */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: hasSeenBefore ? 0.3 : 0.9, delay: hasSeenBefore ? 0.05 : 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h1 className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-light text-espresso tracking-[-0.02em] italic">
                Luscious Lox
              </h1>

              {/* Shimmer sweep */}
              {!hasSeenBefore && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(200, 168, 124, 0.2) 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(black, black)',
                  }}
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 1.0, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-3 text-[11px] tracking-[0.35em] uppercase text-warm-gray/60 font-body font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: hasSeenBefore ? 0.3 : 0.7, delay: hasSeenBefore ? 0.1 : 0.8 }}
            >
              Hair · Leichhardt
            </motion.p>

            {/* Gold accent line below */}
            <motion.div
              className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-muted-gold/40 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: hasSeenBefore ? 40 : 80, opacity: 1 }}
              transition={{ duration: hasSeenBefore ? 0.3 : 0.8, delay: hasSeenBefore ? 0.15 : 1.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
