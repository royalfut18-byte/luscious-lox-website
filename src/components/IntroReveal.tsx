import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: Props) {
  const [opacity, setOpacity] = useState(1);
  const called = useRef(false);
  const reduce = useReducedMotion();

  // A still title card does not need as long on screen as the animated reveal.
  const fadeAt = reduce ? 1400 : 2200;
  const doneAt = reduce ? 2000 : 2900;

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, fadeAt);

    const doneTimer = setTimeout(() => {
      if (!called.current) {
        called.current = true;
        onComplete();
      }
    }, doneAt);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, fadeAt, doneAt]);

  return (
    <div
      id="intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C1210',
        opacity,
        transition: 'opacity 0.7s ease',
        pointerEvents: opacity === 0 ? 'none' : 'auto',
      }}
    >
      {/* Skip */}
      <button
        onClick={() => {
          setOpacity(0);
          setTimeout(() => {
            if (!called.current) { called.current = true; onComplete(); }
          }, 400);
        }}
        style={{
          position: 'absolute', top: 28, right: 28,
          color: 'rgba(253,251,247,0.25)', fontSize: 10,
          fontFamily: 'Manrope,sans-serif', fontWeight: 700,
          letterSpacing: '0.3em', textTransform: 'uppercase' as const,
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        SKIP
      </button>

      {/* Golden glow */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176,141,87,0.1) 0%, transparent 60%)',
          transform: 'translate(-50%,-50%)',
        }}
        initial={reduce ? { scale: 1.3, opacity: 1 } : { scale: 0.3, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 2.5, ease: 'easeOut' }}
      />

      {/* Hair strands */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', width: 1,
              height: 80 + i * 16,
              left: `${16 + i * 7.5}%`, top: '22%',
              background: `linear-gradient(180deg, transparent, rgba(196,162,101,${0.18 + i * 0.025}), transparent)`,
              transformOrigin: 'top center',
            }}
            initial={reduce ? { scaleY: 0.9, opacity: 0.18, rotate: -12 + i * 3 } : { scaleY: 0, opacity: 0, rotate: -12 + i * 3 }}
            animate={reduce ? { scaleY: 0.9, opacity: 0.18 } : { scaleY: [0, 1.1, 0.5], opacity: [0, 0.7, 0.15], y: [0, 45] }}
            transition={reduce ? { duration: 0 } : { duration: 2.1, delay: 0.2 + i * 0.055, ease: [0.25, 0.8, 0.25, 1] }}
          />
        ))}
      </div>

      {/* Center content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
        {/* Top line */}
        <motion.div
          style={{ height: 1.5, background: 'rgba(196,162,101,0.4)', marginBottom: 40, borderRadius: 1 }}
          initial={reduce ? { width: 44 } : { width: 0 }}
          animate={{ width: 44 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
        />

        {/* Text reveal (decorative — kept as a div so the page has a single h1) */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            aria-hidden="true"
            style={{
              fontFamily: '"Playfair Display",Georgia,serif',
              fontSize: 'clamp(3rem,10vw,6.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: '#FDFBF7', lineHeight: 0.92,
              letterSpacing: '-0.03em', margin: 0,
            }}
            initial={reduce ? { y: '0%' } : { y: '115%' }}
            animate={{ y: '0%' }}
            transition={reduce ? { duration: 0 } : { duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Lusciouslox
          </motion.div>
        </div>

        {/* Gold shimmer - a pure sweep, so it is simply omitted under reduced motion */}
        {!reduce && <motion.div
          style={{
            position: 'absolute', top: '25%', left: '-20%', right: '-20%', height: '70%',
            background: 'linear-gradient(90deg, transparent, rgba(196,162,101,0.06) 30%, rgba(196,162,101,0.22) 50%, rgba(196,162,101,0.06) 70%, transparent)',
            pointerEvents: 'none',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.3, delay: 1.15, ease: [0.4, 0, 0.2, 1] }}
        />}

        {/* Subtitle */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.85 }}
        >
          <div style={{ width: 16, height: 1, background: 'rgba(196,162,101,0.35)' }} />
          <span style={{ fontSize: 10, fontFamily: 'Manrope,sans-serif', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: 'rgba(253,251,247,0.3)' }}>
            Hair | Neutral Bay | Sydney
          </span>
          <div style={{ width: 16, height: 1, background: 'rgba(196,162,101,0.35)' }} />
        </motion.div>

        {/* Bottom line */}
        <motion.div
          style={{ marginTop: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,162,101,0.25), transparent)', borderRadius: 1 }}
          initial={reduce ? { width: 80 } : { width: 0 }}
          animate={{ width: 80 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 1.3 }}
        />
      </div>
    </div>
  );
}
