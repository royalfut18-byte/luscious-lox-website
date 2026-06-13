import { FormEvent, useDeferredValue, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Filter,
  LogOut,
  Mail,
  Phone,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';

type BookingRecord = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
};

type SessionResponse = {
  username: string;
};

const statusOptions = ['new', 'contacted', 'scheduled', 'completed', 'archived'] as const;

function parseBookingMessage(message: string) {
  const matched = message.match(/^Preferred date:\s*([^\n]+)\n\n([\s\S]*)$/);

  return {
    preferredDate: matched?.[1] ?? '',
    details: matched?.[2] ?? message,
  };
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function formatDateOnly(value: string) {
  if (!value) {
    return 'Not provided';
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'long',
  }).format(date);
}

function statusLabel(status: string) {
  if (!status) {
    return 'Unknown';
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClasses(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500/15 text-emerald-200 border-emerald-400/20';
    case 'scheduled':
      return 'bg-sky-500/15 text-sky-200 border-sky-400/20';
    case 'contacted':
      return 'bg-amber-500/15 text-amber-100 border-amber-400/20';
    case 'archived':
      return 'bg-white/10 text-white/45 border-white/10';
    default:
      return 'bg-rose-500/15 text-rose-100 border-rose-400/20';
  }
}

function getStatusGuidance(status: string) {
  switch (status) {
    case 'completed':
      return 'Treatment delivered. Archive when follow-up is done.';
    case 'scheduled':
      return 'Appointment is locked in. Keep notes ready for the visit.';
    case 'contacted':
      return 'Awaiting reply or final confirmation from the client.';
    case 'archived':
      return 'Closed out. Keep for history and reporting.';
    default:
      return 'Fresh lead. Best action is to call or email while intent is high.';
  }
}

export default function AdminPortal() {
  const [sessionReady, setSessionReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useState('');
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [updatingBookingId, setUpdatingBookingId] = useState('');
  const [copiedLabel, setCopiedLabel] = useState('');

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin-session', { cache: 'no-store' });
        if (!response.ok) {
          if (!cancelled) {
            setAuthenticated(false);
          }
          return;
        }

        const payload = (await response.json()) as SessionResponse;
        if (!cancelled) {
          setAuthenticated(true);
          setAuthUser(payload.username);
        }
      } catch {
        if (!cancelled) {
          setAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setSessionReady(true);
        }
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    let cancelled = false;

    const loadBookings = async () => {
      setLoadingBookings(true);
      setBookingsError('');

      try {
        const response = await fetch('/api/admin-bookings', { cache: 'no-store' });
        const payload = (await response.json().catch(() => null)) as { bookings?: BookingRecord[]; error?: string } | null;

        if (!response.ok) {
          if (response.status === 401) {
            if (!cancelled) {
              setAuthenticated(false);
              setAuthUser('');
            }
            return;
          }

          if (!cancelled) {
            setBookingsError(payload?.error || 'Unable to load bookings right now.');
          }
          return;
        }

        const nextBookings = Array.isArray(payload?.bookings) ? payload.bookings : [];

        if (!cancelled) {
          setBookings(nextBookings);
          setSelectedBookingId((current) => {
            if (current && nextBookings.some((booking) => booking.id === current)) {
              return current;
            }

            return nextBookings[0]?.id ?? '';
          });
        }
      } catch {
        if (!cancelled) {
          setBookingsError('Unable to load bookings right now.');
        }
      } finally {
        if (!cancelled) {
          setLoadingBookings(false);
        }
      }
    };

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, [authenticated]);

  useEffect(() => {
    if (!copiedLabel) {
      return;
    }

    const timer = window.setTimeout(() => setCopiedLabel(''), 1800);
    return () => window.clearTimeout(timer);
  }, [copiedLabel]);

  const filteredBookings = bookings.filter((booking) => {
    const { details, preferredDate } = parseBookingMessage(booking.message);
    const haystack = [
      booking.name,
      booking.email ?? '',
      booking.phone ?? '',
      booking.service,
      booking.status,
      booking.source,
      details,
      preferredDate,
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !deferredSearch.trim() || haystack.includes(deferredSearch.trim().toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const selectedBooking =
    filteredBookings.find((booking) => booking.id === selectedBookingId) ??
    bookings.find((booking) => booking.id === selectedBookingId) ??
    filteredBookings[0] ??
    bookings[0] ??
    null;

  const uniqueServices = [...new Set(bookings.map((booking) => booking.service))];
  const totalBookings = bookings.length;
  const newBookings = bookings.filter((booking) => booking.status === 'new').length;
  const activeBookings = bookings.filter((booking) => booking.status === 'new' || booking.status === 'contacted' || booking.status === 'scheduled').length;
  const completedBookings = bookings.filter((booking) => booking.status === 'completed').length;
  const archivedBookings = bookings.filter((booking) => booking.status === 'archived').length;
  const scheduledDates = bookings.filter((booking) => {
    const { preferredDate } = parseBookingMessage(booking.message);
    return preferredDate.length > 0;
  }).length;
  const completionRate = totalBookings ? Math.round((completedBookings / totalBookings) * 100) : 0;

  let topService = 'No bookings yet';
  const serviceCounts: Record<string, number> = {};
  bookings.forEach((booking) => {
    serviceCounts[booking.service] = (serviceCounts[booking.service] ?? 0) + 1;
  });
  Object.entries(serviceCounts).forEach(([service, count]) => {
    if (topService === 'No bookings yet' || count > (serviceCounts[topService] ?? 0)) {
      topService = service;
    }
  });
  const topServiceCount = topService === 'No bookings yet' ? 0 : (serviceCounts[topService] ?? 0);
  const mostRecentBooking = bookings[0] ?? null;
  const selectedPosition = selectedBooking ? filteredBookings.findIndex((booking) => booking.id === selectedBooking.id) + 1 : 0;
  const statusBreakdown = statusOptions.map((status) => ({
    status,
    count: bookings.filter((booking) => booking.status === status).length,
  }));

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoggingIn(true);
    setAuthError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json().catch(() => null)) as { username?: string; error?: string } | null;

      if (!response.ok) {
        setAuthError(payload?.error || 'Unable to sign in.');
        return;
      }

      setAuthenticated(true);
      setAuthUser(payload?.username || username.trim());
      setPassword('');
    } catch {
      setAuthError('Unable to sign in.');
    } finally {
      setLoggingIn(false);
      setSessionReady(true);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin-session', { method: 'DELETE' }).catch(() => null);
    setAuthenticated(false);
    setAuthUser('');
    setBookings([]);
    setSelectedBookingId('');
  };

  const handleRefresh = async () => {
    if (!authenticated) {
      return;
    }

    setLoadingBookings(true);
    setBookingsError('');

    try {
      const response = await fetch('/api/admin-bookings', { cache: 'no-store' });
      const payload = (await response.json().catch(() => null)) as { bookings?: BookingRecord[]; error?: string } | null;

      if (!response.ok) {
        setBookingsError(payload?.error || 'Unable to refresh bookings right now.');
        return;
      }

      const nextBookings = Array.isArray(payload?.bookings) ? payload.bookings : [];
      setBookings(nextBookings);
      setSelectedBookingId((current) => {
        if (current && nextBookings.some((booking) => booking.id === current)) {
          return current;
        }

        return nextBookings[0]?.id ?? '';
      });
    } catch {
      setBookingsError('Unable to refresh bookings right now.');
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleStatusChange = async (bookingId: string, status: string) => {
    setUpdatingBookingId(bookingId);
    setBookingsError('');

    try {
      const response = await fetch('/api/admin-bookings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId, status }),
      });

      const payload = (await response.json().catch(() => null)) as { booking?: BookingRecord; error?: string } | null;

      if (!response.ok) {
        setBookingsError(payload?.error || 'Unable to update this booking.');
        return;
      }

      const updatedBooking = payload?.booking;
      if (!updatedBooking) {
        return;
      }

      setBookings((current) => current.map((booking) => (booking.id === updatedBooking.id ? updatedBooking : booking)));
    } catch {
      setBookingsError('Unable to update this booking.');
    } finally {
      setUpdatingBookingId('');
    }
  };

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel('');
    }
  };

  if (!sessionReady) {
    return (
      <div className="min-h-screen bg-[#120C0A] text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,181,122,0.18),transparent_24%),linear-gradient(180deg,#120C0A_0%,#1A110E_48%,#120C0A_100%)]" />
        <div className="relative text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D7B57A]/20 bg-white/[0.05]">
            <div className="h-10 w-10 rounded-full border border-white/10 border-t-[#D7B57A] animate-spin" />
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-white/50">Loading Admin</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#120C0A] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,122,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,#120C0A_0%,#1E1411_45%,#120C0A_100%)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between">
            <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/55 transition hover:bg-white/[0.08] hover:text-white">
              <ArrowLeft size={16} />
              Back to website
            </a>
            <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/35 sm:block">
              Private salon access
            </div>
          </div>

          <div className="mt-8 grid flex-1 gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-9 lg:p-12"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D7B57A]/20 bg-[#D7B57A]/10 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#E9C88F]">
                <ShieldCheck size={14} />
                Admin Suite
              </div>
              <h1 className="mt-8 max-w-3xl font-heading text-[clamp(3rem,6vw,5.9rem)] leading-[0.9] tracking-[-0.055em] text-white">
                A calmer, sharper way to manage every <em className="not-italic text-[#E9C88F]">booking conversation</em>.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.95] text-white/62">
                Built for the salon floor, not a spreadsheet. Review fresh enquiries, see who needs a response next, and move each client from interest to confirmed appointment with less friction.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5">
                  <Sparkles className="text-[#E9C88F]" size={18} />
                  <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Lead triage</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">Put new bookings at the front of the queue so the team can respond quickly while intent is high.</p>
                </div>
                <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5">
                  <CalendarDays className="text-[#E9C88F]" size={18} />
                  <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Booking clarity</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">Read preferred dates, services, notes, and contact details without jumping between tools.</p>
                </div>
                <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5">
                  <CheckCircle2 className="text-[#E9C88F]" size={18} />
                  <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Pipeline control</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">Move enquiries from new to contacted, scheduled, completed, or archived in a few clicks.</p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Purpose</p>
                  <p className="mt-2 text-sm text-white/78">Private salon operations</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Focus</p>
                  <p className="mt-2 text-sm text-white/78">Bookings, follow-up, status</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Access</p>
                  <p className="mt-2 text-sm text-white/78">Restricted to admin credentials</p>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="w-full max-w-[480px] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.04))] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#E9C88F]">Admin Login</p>
                    <h2 className="mt-4 font-heading text-[2.35rem] leading-[1.02] text-white">Sign in to the bookings desk</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D7B57A]/20 bg-[#D7B57A]/10 text-[#E9C88F]">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/58">
                  Use the private salon admin credentials to unlock the control panel and manage enquiries securely.
                </p>

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                    <label htmlFor="admin-username" className="block text-[11px] uppercase tracking-[0.24em] text-white/40">
                      Username
                    </label>
                    <input
                      id="admin-username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#D7B57A]/45 focus:bg-white/[0.06]"
                      placeholder="Enter username"
                      autoComplete="username"
                    />
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                    <label htmlFor="admin-password" className="block text-[11px] uppercase tracking-[0.24em] text-white/40">
                      Password
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#D7B57A]/45 focus:bg-white/[0.06]"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>

                  {authError ? (
                    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                      {authError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loggingIn}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#F0D39E,#D3A35D,#8E6A3F)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#140D0B] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <ShieldCheck size={15} />
                    {loggingIn ? 'Signing In' : 'Enter Admin'}
                  </button>
                </form>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">Why this panel exists</p>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    Keep salon operations simple: see new leads, contact clients fast, and keep every booking status visible at a glance.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedMessage = selectedBooking ? parseBookingMessage(selectedBooking.message) : { preferredDate: '', details: '' };

  return (
    <div className="min-h-screen bg-[#120C0A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,181,122,0.18),transparent_22%),radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.05),transparent_20%),linear-gradient(180deg,#120C0A_0%,#19110E_46%,#120C0A_100%)]" />
      <div className="relative mx-auto max-w-[1550px] px-5 py-5 sm:px-8 lg:px-10">
        <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-6 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D7B57A]/20 bg-[#D7B57A]/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">
                <ShieldCheck size={14} />
                Luscious Lox Admin
              </div>
              <h1 className="mt-5 font-heading text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.05em]">
                Booking command center
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-white/58">
                A cleaner operating view for the salon team: see fresh demand, monitor the active pipeline, and work through each enquiry with better context.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/70">
                Signed in as <span className="text-white">{authUser}</span>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/[0.09]"
              >
                <RefreshCcw size={14} className={loadingBookings ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/[0.09]"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_420px]">
          <aside className="space-y-6 xl:sticky xl:top-5 xl:self-start">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">Snapshot</p>
              <div className="mt-5 grid gap-3">
                {[
                  { label: 'Total enquiries', value: totalBookings, icon: UserRound },
                  { label: 'New right now', value: newBookings, icon: Sparkles },
                  { label: 'Active pipeline', value: activeBookings, icon: Clock3 },
                  { label: 'Scheduled dates', value: scheduledDates, icon: CalendarDays },
                ].map((card) => (
                  <div key={card.label} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">{card.label}</p>
                      <card.icon size={15} className="text-[#E9C88F]" />
                    </div>
                    <p className="mt-4 font-heading text-[2rem] leading-none">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">Status mix</p>
              <div className="mt-5 space-y-3">
                {statusBreakdown.map((item) => (
                  <div key={item.status} className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${statusClasses(item.status)}`}>
                        {statusLabel(item.status)}
                      </span>
                      <span className="text-sm text-white/65">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">Salon signal</p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-white/64">
                <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">Most requested</p>
                  <p className="mt-2 font-heading text-[1.5rem] text-white">{topService}</p>
                  <p className="mt-1 text-white/48">{topServiceCount} enquiry{topServiceCount === 1 ? '' : 'ies'}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">Completion rate</p>
                  <p className="mt-2 font-heading text-[1.5rem] text-white">{completionRate}%</p>
                  <p className="mt-1 text-white/48">{completedBookings} completed, {archivedBookings} archived</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">Latest enquiry</p>
                  <p className="mt-2 text-white">{mostRecentBooking ? mostRecentBooking.name : 'No enquiries yet'}</p>
                  <p className="mt-1 text-white/48">{mostRecentBooking ? formatDateTime(mostRecentBooking.created_at) : 'Waiting for first booking'}</p>
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">Bookings</p>
                <h2 className="mt-3 font-heading text-[2.2rem]">Salon inbox</h2>
                <p className="mt-2 text-sm text-white/50">Search, filter, and triage each enquiry from one list.</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60">
                Showing <span className="text-white">{filteredBookings.length}</span> of <span className="text-white">{totalBookings}</span> bookings
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.6fr_0.6fr]">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <Search size={16} className="text-white/35" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, phone, email, service..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <Filter size={16} className="text-white/35" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none"
                >
                  <option value="all" className="bg-[#1A120F]">All statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status} className="bg-[#1A120F]">
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <CalendarDays size={16} className="text-white/35" />
                <select
                  value={serviceFilter}
                  onChange={(event) => setServiceFilter(event.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none"
                >
                  <option value="all" className="bg-[#1A120F]">All services</option>
                  {uniqueServices.map((service) => (
                    <option key={service} value={service} className="bg-[#1A120F]">
                      {service}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {bookingsError ? (
              <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {bookingsError}
              </div>
            ) : null}

            <div className="mt-5 space-y-3">
              {loadingBookings ? (
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-sm text-white/50">
                  Loading bookings...
                </div>
              ) : null}

              {!loadingBookings && filteredBookings.length === 0 ? (
                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-sm text-white/50">
                  No bookings match the current filters.
                </div>
              ) : null}

              {!loadingBookings &&
                filteredBookings.map((booking, index) => {
                  const parsed = parseBookingMessage(booking.message);
                  const isSelected = booking.id === selectedBooking?.id;

                  return (
                    <motion.button
                      key={booking.id}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      onClick={() => setSelectedBookingId(booking.id)}
                      className={`w-full rounded-[1.8rem] border px-5 py-5 text-left transition ${
                        isSelected
                          ? 'border-[#E9C88F]/35 bg-[linear-gradient(160deg,rgba(215,181,122,0.12),rgba(255,255,255,0.03))] shadow-[0_15px_40px_rgba(215,181,122,0.10)]'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-heading text-[1.45rem] text-white">{booking.name}</h3>
                            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${statusClasses(booking.status)}`}>
                              {statusLabel(booking.status)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-[#E9C88F]">{booking.service}</p>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 line-clamp-2">{parsed.details}</p>
                        </div>

                        <div className="space-y-2 text-sm text-white/50">
                          <p>{formatDateTime(booking.created_at)}</p>
                          <p>{parsed.preferredDate ? `Preferred: ${formatDateOnly(parsed.preferredDate)}` : 'No preferred date'}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 backdrop-blur-xl xl:sticky xl:top-5 xl:self-start">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E9C88F]">Selected booking</p>
                <h2 className="mt-3 font-heading text-[2rem]">Details</h2>
              </div>
              {copiedLabel ? (
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-emerald-100">
                  Copied {copiedLabel}
                </div>
              ) : null}
            </div>

            {!selectedBooking ? (
              <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-sm text-white/50">
                Select a booking to inspect it in detail.
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-[2rem]">{selectedBooking.name}</h3>
                      <p className="mt-2 text-sm text-[#E9C88F]">{selectedBooking.service}</p>
                      <p className="mt-3 text-sm text-white/48">
                        {selectedPosition > 0 ? `Booking ${selectedPosition} in current filtered view` : 'Viewing booking details'}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${statusClasses(selectedBooking.status)}`}>
                      {statusLabel(selectedBooking.status)}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {selectedBooking.phone ? (
                      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Phone size={15} className="text-[#E9C88F]" />
                          <a href={`tel:${selectedBooking.phone}`} className="text-sm text-white hover:text-[#E9C88F] transition-colors">
                            {selectedBooking.phone}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('phone', selectedBooking.phone!)}
                          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/45 hover:text-white"
                        >
                          <Copy size={14} />
                          Copy
                        </button>
                      </div>
                    ) : null}

                    {selectedBooking.email ? (
                      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Mail size={15} className="text-[#E9C88F]" />
                          <a href={`mailto:${selectedBooking.email}`} className="text-sm text-white hover:text-[#E9C88F] transition-colors break-all">
                            {selectedBooking.email}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('email', selectedBooking.email!)}
                          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/45 hover:text-white"
                        >
                          <Copy size={14} />
                          Copy
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Booking timing</p>
                    <div className="mt-4 space-y-3 text-sm text-white/68">
                      <p>Submitted: <span className="text-white">{formatDateTime(selectedBooking.created_at)}</span></p>
                      <p>Preferred date: <span className="text-white">{formatDateOnly(selectedMessage.preferredDate)}</span></p>
                      <p>Source: <span className="text-white">{selectedBooking.source}</span></p>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Quick status</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          type="button"
                          disabled={updatingBookingId === selectedBooking.id}
                          onClick={() => handleStatusChange(selectedBooking.id, status)}
                          className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                            selectedBooking.status === status
                              ? 'border-[#E9C88F]/30 bg-[#E9C88F]/12 text-[#F3D8AA]'
                              : 'border-white/10 bg-black/20 text-white/50 hover:text-white'
                          }`}
                        >
                          {updatingBookingId === selectedBooking.id && selectedBooking.status !== status ? 'Updating...' : statusLabel(status)}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/52">{getStatusGuidance(selectedBooking.status)}</p>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Next best action</p>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {selectedBooking.phone
                      ? `Call ${selectedBooking.name} on ${selectedBooking.phone} to confirm consultation details and availability.`
                      : selectedBooking.email
                        ? `Reply to ${selectedBooking.email} with next available consultation times and confirmation steps.`
                        : 'No direct contact detail stored. Keep the inquiry for record only.'}
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Client request</p>
                  <p className="mt-4 text-sm leading-7 text-white/72 whitespace-pre-wrap">{selectedMessage.details}</p>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}
