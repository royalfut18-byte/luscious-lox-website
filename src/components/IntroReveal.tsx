import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const [phase, setPhase] = useState<'playing' | 'exiting' | 'done'>('playing');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('done');
      onComplete();
      return;
    }

    timerRef.current = setTimeout(() => {
      setPhase('exiting');
    }, 2200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('exiting');
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence onExitComplete={() => { setPhase('done'); onComplete(); }}>
      {(phase === 'playing' || phase === 'exiting') && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#FDFBF7' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Skip */}
          <motion.button
            onClick={skip}
            className="absolute top-7 right-7 sm:top-9 sm:right-10 text-espresso/25 hover:text-espresso/50 text-[10px] font-body font-bold tracking-[0.3em] uppercase transition-colors z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Skip
          </motion.button>

          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Radial glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(176, 141, 87, 0.06) 0%, transparent 70%)' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />

            {/* Hair strand lines */}
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '1px',
                  height: `${100 + i * 18}px`,
                  left: `${15 + i * 8.5}%`,
                  top: '25%',
                  background: `linear-gradient(180deg, transparent 0%, rgba(176, 141, 87, ${0.08 + i * 0.02}) 40%, rgba(176, 141, 87, ${0.04 + i * 0.01}) 70%, transparent 100%)`,
                  transformOrigin: 'top center',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 0.7],
                  opacity: [0, 0.6, 0.2],
                  rotate: [-12 + i * 3, -6 + i * 2],
                  y: [0, 30],
                }}
                transition={{
                  duration: 2.0,
                  delay: 0.15 + i * 0.06,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            ))}
          </div>

          {/* Center brand reveal */}
          <div className="relative flex flex-col items-center px-6">
            {/* Top ornament line */}
            <motion.div
              className="h-[1px] bg-muted-gold/30 mb-10"
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Main text with clip mask reveal */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-heading text-[3rem] sm:text-[4.2rem] md:text-[5.5rem] text-espresso font-light italic leading-none"
                style={{ letterSpacing: '-0.03em' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Luscious Lox
              </motion.h1>
            </div>

            {/* Shimmer sweep over text */}
            <motion.div
              className="absolute top-[50%] left-0 right-0 h-[60%] -translate-y-1/2 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(196, 162, 101, 0.15) 45%, rgba(196, 162, 101, 0.25) 50%, rgba(196, 162, 101, 0.15) 55%, transparent 100%)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Subtitle */}
            <motion.div
              className="flex items-center gap-4 mt-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
            >
              <div className="w-5 h-[1px] bg-muted-gold/40" />
              <span className="text-[10px] font-body font-bold tracking-[0.4em] uppercase text-warm-gray/50">
                Hair · Leichhardt · Sydney
              </span>
              <div className="w-5 h-[1px] bg-muted-gold/40" />
            </motion.div>

            {/* Bottom ornament */}
            <motion.div
              className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-muted-gold/25 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
