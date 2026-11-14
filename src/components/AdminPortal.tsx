import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AlertTriangle, ExternalLink, Inbox, LogOut, MessageSquareText, RefreshCcw, Trash2, Users } from 'lucide-react';
import AdminLogin from './admin/AdminLogin';
import BookingsView from './admin/BookingsView';
import ClientsView, { SaveClientResult } from './admin/ClientsView';
import MessagesView, { Modal } from './admin/MessagesView';
import {
  BookingRecord,
  ClientInput,
  ClientRecord,
  Contact,
  SmsRecipient,
  buildContacts,
  initials,
  recipientFromBooking,
  recipientFromContact,
} from './admin/adminUtils';

type View = 'bookings' | 'clients' | 'messages';

const viewFromHash = (): View => {
  if (window.location.hash === '#messages') return 'messages';
  if (window.location.hash === '#clients') return 'clients';
  return 'bookings';
};

export default function AdminPortal() {
  const [sessionReady, setSessionReady] = useState(false);
  const [authUser, setAuthUser] = useState('');
  const [view, setView] = useState<View>(viewFromHash);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState('');
  const [smsRecipients, setSmsRecipients] = useState<SmsRecipient[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [clientsError, setClientsError] = useState('');
  const [openBookingDetail, setOpenBookingDetail] = useState(false);

  const authenticated = Boolean(authUser);

  const signOutLocally = useCallback(() => {
    setAuthUser('');
    setBookings([]);
    setClients([]);
    setSelectedId('');
    setSmsRecipients([]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/admin-session', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return;
        const payload = (await response.json()) as { username?: string };
        if (!cancelled && payload.username) setAuthUser(payload.username);
      })
      .catch(() => null)
      .finally(() => {
        if (!cancelled) setSessionReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleHash = () => setView(viewFromHash());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const goTo = (next: View) => {
    setView(next);
    window.history.replaceState(null, '', next === 'bookings' ? window.location.pathname : `#${next}`);
    window.scrollTo({ top: 0 });
  };

  const loadBookings = useCallback(async () => {
    setLoadingBookings(true);
    setBookingsError('');

    try {
      const response = await fetch('/api/admin-bookings', { cache: 'no-store' });
      const payload = (await response.json().catch(() => null)) as { bookings?: BookingRecord[]; error?: string } | null;

      if (response.status === 401) {
        signOutLocally();
        return;
      }

      if (!response.ok) {
        setBookingsError(payload?.error || 'Unable to load bookings right now.');
        return;
      }

      const next = Array.isArray(payload?.bookings) ? payload.bookings : [];
      setBookings(next);
      setSelectedId((current) => (current && next.some((booking) => booking.id === current) ? current : next[0]?.id ?? ''));
    } catch {
      setBookingsError('Unable to load bookings right now.');
    } finally {
      setLoadingBookings(false);
    }
  }, [signOutLocally]);

  const loadClients = useCallback(async () => {
    setLoadingClients(true);
    setClientsError('');

    try {
      const response = await fetch('/api/admin-clients', { cache: 'no-store' });
      const payload = (await response.json().catch(() => null)) as { clients?: ClientRecord[]; error?: string } | null;

      if (response.status === 401) {
        signOutLocally();
        return;
      }

      if (!response.ok) {
        setClientsError(payload?.error || 'Unable to load clients right now.');
        return;
      }

      setClients(Array.isArray(payload?.clients) ? payload.clients : []);
    } catch {
      setClientsError('Unable to load clients right now.');
    } finally {
      setLoadingClients(false);
    }
  }, [signOutLocally]);

  const refreshAll = useCallback(() => {
    loadBookings();
    loadClients();
  }, [loadBookings, loadClients]);

  useEffect(() => {
    if (authenticated) {
      refreshAll();
    }
  }, [authenticated, refreshAll]);

  const contacts = useMemo(() => buildContacts(clients, bookings), [clients, bookings]);

  const handleSaveClient = async (input: ClientInput, id: string | undefined, allowSharedPhone: boolean): Promise<SaveClientResult> => {
    try {
      const response = await fetch('/api/admin-clients', {
        method: id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, id, allowSharedPhone }),
      });
      const payload = (await response.json().catch(() => null)) as { client?: ClientRecord; error?: string; code?: string } | null;

      if (response.status === 401) {
        signOutLocally();
        return { error: 'Your session has ended. Please sign in again.' };
      }

      if (!response.ok || !payload?.client) {
        return { error: payload?.error || 'Unable to save this client.', code: payload?.code };
      }

      const saved = payload.client;
      setClients((current) => (id ? current.map((client) => (client.id === id ? saved : client)) : [...current, saved]));
      return { id: saved.id };
    } catch {
      return { error: 'Unable to save this client. Check your connection and try again.' };
    }
  };

  const handleDeleteClient = async (id: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/admin-clients', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        return payload?.error || 'Unable to delete this client.';
      }

      setClients((current) => current.filter((client) => client.id !== id));
      return null;
    } catch {
      return 'Unable to delete this client.';
    }
  };

  const handleTextContact = (contact: Contact) => {
    const recipient = recipientFromContact(contact);
    if (recipient) {
      setSmsRecipients([recipient]);
    }
    goTo('messages');
  };

  const handleOpenBooking = (bookingId: string) => {
    setSelectedId(bookingId);
    setOpenBookingDetail(true);
    goTo('bookings');
  };

  const updateStatus = useCallback(async (bookingId: string, status: string) => {
    const response = await fetch('/api/admin-bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bookingId, status }),
    });
    const payload = (await response.json().catch(() => null)) as { booking?: BookingRecord; error?: string } | null;

    if (!response.ok || !payload?.booking) {
      throw new Error(payload?.error || 'Unable to update this booking.');
    }

    const updated = payload.booking;
    setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
  }, []);

  const handleStatusChange = async (bookingId: string, status: string) => {
    setUpdatingId(bookingId);
    setBookingsError('');
    try {
      await updateStatus(bookingId, status);
    } catch (error) {
      setBookingsError(error instanceof Error ? error.message : 'Unable to update this booking.');
    } finally {
      setUpdatingId('');
    }
  };

  const handleMarkContacted = useCallback(async (bookingIds: string[]) => {
    await Promise.all(bookingIds.map((id) => updateStatus(id, 'contacted').catch(() => null)));
  }, [updateStatus]);

  const handleDelete = async (bookingId: string) => {
    setDeletingId(bookingId);
    setBookingsError('');

    try {
      const response = await fetch('/api/admin-bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setBookingsError(payload?.error || 'Unable to delete this booking.');
        return;
      }

      setBookings((current) => current.filter((booking) => booking.id !== bookingId));
      setSelectedId((current) => (current === bookingId ? '' : current));
    } catch {
      setBookingsError('Unable to delete this booking.');
    } finally {
      setDeletingId('');
      setPendingDeleteId('');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin-session', { method: 'DELETE' }).catch(() => null);
    signOutLocally();
  };

  const handleTextBooking = (booking: BookingRecord) => {
    const recipient = recipientFromBooking(booking);
    if (recipient) {
      setSmsRecipients([recipient]);
    }
    goTo('messages');
  };

  if (!sessionReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E0A09]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#E3C189]" aria-label="Loading" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSignedIn={setAuthUser} />;
  }

  const newCount = bookings.filter((booking) => booking.status === 'new').length;
  const pendingDelete = pendingDeleteId ? bookings.find((booking) => booking.id === pendingDeleteId) ?? null : null;

  const navItems = [
    { id: 'bookings' as const, label: 'Bookings', icon: Inbox, badge: newCount },
    { id: 'clients' as const, label: 'Clients', icon: Users, badge: 0 },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquareText, badge: smsRecipients.length },
  ];

  const savedClientCount = clients.length;
  const pageTitle = view === 'bookings' ? 'Bookings' : view === 'clients' ? 'Clients' : 'Messages';
  const pageSubtitle =
    view === 'bookings'
      ? newCount
        ? `${newCount} new ${newCount === 1 ? 'enquiry needs' : 'enquiries need'} a reply`
        : 'You are all caught up'
      : view === 'clients'
        ? `${savedClientCount} saved ${savedClientCount === 1 ? 'client' : 'clients'}`
        : 'Send text messages to your clients';

  return (
    <div className="min-h-screen bg-[#0E0A09] font-body text-white antialiased">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.06] bg-[#120D0B] lg:flex">
        <div className="px-6 pb-6 pt-7">
          <a href="/" className="font-heading text-[1.55rem] leading-none tracking-[-0.02em]">
            Lusciouslox
          </a>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E3C189]/80">Admin</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition ${
                  active ? 'bg-white/[0.07] text-white' : 'text-white/55 hover:bg-white/[0.04] hover:text-white/85'
                }`}
              >
                <item.icon size={18} className={active ? 'text-[#E3C189]' : ''} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge ? (
                  <span
                    className={`min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums ${
                      item.id === 'bookings' ? 'bg-rose-400/15 text-rose-200' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/[0.06] p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-white/55 transition hover:bg-white/[0.04] hover:text-white/85"
          >
            <ExternalLink size={17} />
            View website
          </a>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3C189]/15 text-[11px] font-semibold text-[#F0D39E]">
              {initials(authUser)}
            </div>
            <span className="min-w-0 flex-1 truncate text-sm text-white/80">{authUser}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-[#0E0A09]/85 px-4 py-3 backdrop-blur-lg lg:hidden">
        <div>
          <p className="font-heading text-[1.25rem] leading-none">Lusciouslox</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#E3C189]/80">Admin</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-white/55 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </header>

      <main className="pb-28 lg:pb-10 lg:pl-64">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 pb-5 pt-6 lg:pb-7 lg:pt-10">
            <div className="min-w-0">
              <h1 className="font-heading text-[2rem] leading-tight tracking-[-0.02em] sm:text-[2.4rem]">{pageTitle}</h1>
              <p className="mt-1 text-sm text-white/50">{pageSubtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {view === 'bookings' ? (
                <button
                  type="button"
                  onClick={() => goTo('messages')}
                  className="hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80 transition hover:bg-white/[0.08] sm:inline-flex"
                >
                  <MessageSquareText size={16} />
                  Text clients
                </button>
              ) : null}
              <button
                type="button"
                onClick={refreshAll}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white/80 transition hover:bg-white/[0.08] sm:px-4"
                aria-label="Refresh"
              >
                <RefreshCcw size={16} className={loadingBookings || loadingClients ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {view === 'clients' ? (
            <ClientsView
              contacts={contacts}
              loading={loadingClients || loadingBookings}
              error={clientsError}
              onSave={handleSaveClient}
              onDelete={handleDeleteClient}
              onText={handleTextContact}
              onOpenBooking={handleOpenBooking}
            />
          ) : view === 'bookings' ? (
            <BookingsView
              startWithDetailOpen={openBookingDetail}
              onDetailOpened={() => setOpenBookingDetail(false)}
              bookings={bookings}
              loading={loadingBookings}
              error={bookingsError}
              selectedId={selectedId}
              onSelect={setSelectedId}
              updatingId={updatingId}
              deletingId={deletingId}
              onStatusChange={handleStatusChange}
              onRequestDelete={setPendingDeleteId}
              onText={handleTextBooking}
            />
          ) : (
            <MessagesView
              contacts={contacts}
              recipients={smsRecipients}
              onRecipientsChange={setSmsRecipients}
              onMarkContacted={handleMarkContacted}
              onUnauthorized={signOutLocally}
            />
          )}
        </div>
      </main>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/[0.07] bg-[#120D0B]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
        {navItems.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] transition ${active ? 'text-[#F0D39E]' : 'text-white/45'}`}
            >
              <span className="relative">
                <item.icon size={21} />
                {item.badge ? (
                  <span className="absolute -right-2.5 -top-1.5 min-w-[18px] rounded-full bg-rose-400 px-1 text-center text-[10px] font-semibold leading-[18px] text-[#1A110D]">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <AnimatePresence>
        {pendingDelete ? (
          <Modal onClose={() => !deletingId && setPendingDeleteId('')} label="Confirm booking deletion">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300">
              <AlertTriangle size={19} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">Delete this booking?</h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              This permanently removes the enquiry from <span className="text-white">{pendingDelete.name}</span> for {pendingDelete.service}. It
              can't be undone. Archive it instead if you just want it out of the way.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingDeleteId('')}
                disabled={Boolean(deletingId)}
                className="h-11 rounded-xl px-5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(pendingDelete.id, 'archived').then(() => setPendingDeleteId(''))}
                disabled={Boolean(deletingId)}
                className="h-11 rounded-xl border border-white/10 px-5 text-sm text-white/80 transition hover:bg-white/5 disabled:opacity-50"
              >
                Archive instead
              </button>
              <button
                type="button"
                onClick={() => handleDelete(pendingDelete.id)}
                disabled={Boolean(deletingId)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-500/90 px-5 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
              >
                <Trash2 size={15} />
                {deletingId ? 'Deleting' : 'Delete'}
              </button>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
