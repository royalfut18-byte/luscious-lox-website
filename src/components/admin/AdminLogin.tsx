import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Eye, EyeOff, Lock, UserRound } from 'lucide-react';

type AdminLoginProps = {
  onSignedIn: (username: string) => void;
};

export default function AdminLogin({ onSignedIn }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json().catch(() => null)) as { username?: string; error?: string } | null;

      if (!response.ok) {
        setError(payload?.error || 'Unable to sign in.');
        return;
      }

      setPassword('');
      onSignedIn(payload?.username || username.trim());
    } catch {
      setError('Unable to reach the server. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputShell =
    'group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition focus-within:border-[#E3C189]/60 focus-within:bg-white/[0.05] focus-within:ring-4 focus-within:ring-[#E3C189]/10';

  return (
    <div className="min-h-screen bg-[#0E0A09] font-body text-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="/lusciouslox/neutral-bay-2.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,9,0.35)_0%,rgba(14,10,9,0.15)_40%,rgba(14,10,9,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_70%,#0E0A09_100%)]" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <a href="/" className="font-heading text-[1.6rem] tracking-[-0.02em] text-white">
            Lusciouslox
          </a>

          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E3C189]">Salon admin</p>
            <p className="mt-4 font-heading text-[2.6rem] leading-[1.08] tracking-[-0.02em]">
              Every enquiry, every client, one quiet place.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-white/65">
              Manage bookings and text clients straight from the desk.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex min-h-screen flex-col px-5 py-6 sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(227,193,137,0.10),transparent_45%)]" />

        <div className="relative flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={16} />
            Website
          </a>
          <span className="font-heading text-lg lg:hidden">Lusciouslox</span>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F0D39E] to-[#B8894B] text-[#1A110D] shadow-[0_10px_30px_rgba(227,193,137,0.25)]">
              <Lock size={20} strokeWidth={2.2} />
            </div>

            <h1 className="mt-7 font-heading text-[2.2rem] leading-tight tracking-[-0.02em]">Welcome back</h1>
            <p className="mt-2 text-[15px] text-white/55">Sign in to manage bookings and messages.</p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5" noValidate>
              <div>
                <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-white/75">
                  Username
                </label>
                <div className={inputShell}>
                  <UserRound size={17} className="shrink-0 text-white/35 transition group-focus-within:text-[#E3C189]" />
                  <input
                    id="admin-username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="h-12 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/25"
                    placeholder="Your username"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-white/75">
                  Password
                </label>
                <div className={inputShell}>
                  <Lock size={17} className="shrink-0 text-white/35 transition group-focus-within:text-[#E3C189]" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyUp={(event) => setCapsLock(event.getModifierState('CapsLock'))}
                    className="h-12 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/25"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="-mr-1 rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {capsLock ? <p className="mt-2 text-xs text-amber-200/80">Caps Lock is on</p> : null}
              </div>

              {error ? (
                <div role="alert" className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-300" />
                  <span>{error}</span>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] via-[#E0B677] to-[#C69553] text-[15px] font-semibold text-[#1A110D] shadow-[0_12px_30px_rgba(227,193,137,0.18)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1A110D]/30 border-t-[#1A110D]" />
                    Signing in
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <p className="relative text-center text-xs text-white/30">Private area for Lusciouslox staff.</p>
      </div>
    </div>
  );
}
