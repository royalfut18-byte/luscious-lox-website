import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setRemoved(true);
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setFadeOut(true), 2200);
    const t2 = setTimeout(() => { setRemoved(true); onComplete(); }, 2900);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (removed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C1210',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Skip */}
      <button
        onClick={() => { setFadeOut(true); setTimeout(() => { setRemoved(true); onComplete(); }, 400); }}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          color: 'rgba(253, 251, 247, 0.3)',
          fontSize: '10px',
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        Skip
      </button>

      {/* Background golden glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176, 141, 87, 0.1) 0%, transparent 60%)',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      {/* Hair strand lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '1px',
              height: `${80 + i * 18}px`,
              left: `${18 + i * 7.5}%`,
              top: '20%',
              background: `linear-gradient(180deg, transparent, rgba(196, 162, 101, ${0.2 + i * 0.03}), transparent)`,
              transformOrigin: 'top center',
            }}
            initial={{ scaleY: 0, opacity: 0, rotate: -12 + i * 3 }}
            animate={{
              scaleY: [0, 1.2, 0.5],
              opacity: [0, 0.8, 0.2],
              rotate: [-12 + i * 3, -6 + i * 2],
              y: [0, 50],
            }}
            transition={{ duration: 2.2, delay: 0.2 + i * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
          />
        ))}
      </div>

      {/* Center content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1.5rem' }}>
        {/* Top line */}
        <motion.div
          style={{ height: '1.5px', background: 'rgba(196, 162, 101, 0.4)', marginBottom: '2.5rem', borderRadius: '1px' }}
          initial={{ width: 0 }}
          animate={{ width: 45 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Text clip reveal */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#FDFBF7',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
            initial={{ y: '120%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Luscious Lox
          </motion.h1>
        </div>

        {/* Gold shimmer sweep */}
        <motion.div
          style={{
            position: 'absolute',
            top: '30%',
            left: '-15%',
            right: '-15%',
            height: '60%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(196, 162, 101, 0.08) 35%, rgba(196, 162, 101, 0.25) 50%, rgba(196, 162, 101, 0.08) 65%, transparent 100%)',
            pointerEvents: 'none',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Subtitle */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '1.5rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div style={{ width: '18px', height: '1px', background: 'rgba(196, 162, 101, 0.4)' }} />
          <span style={{ fontSize: '10px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(253, 251, 247, 0.35)' }}>
            Hair · Leichhardt · Sydney
          </span>
          <div style={{ width: '18px', height: '1px', background: 'rgba(196, 162, 101, 0.4)' }} />
        </motion.div>

        {/* Bottom line */}
        <motion.div
          style={{ marginTop: '2.5rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196, 162, 101, 0.3), transparent)', borderRadius: '1px' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
