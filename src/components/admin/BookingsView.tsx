import { useDeferredValue, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Copy,
  Inbox,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import {
  BookingRecord,
  displayPhone,
  formatDateOnly,
  formatDateTime,
  formatRelative,
  initials,
  parseBookingMessage,
  statusDot,
  statusLabel,
  statusOptions,
  statusPill,
} from './adminUtils';

type BookingsViewProps = {
  bookings: BookingRecord[];
  loading: boolean;
  error: string;
  selectedId: string;
  onSelect: (id: string) => void;
  updatingId: string;
  deletingId: string;
  onStatusChange: (id: string, status: string) => void;
  onRequestDelete: (id: string) => void;
  onText: (booking: BookingRecord) => void;
};

export default function BookingsView({
  bookings,
  loading,
  error,
  selectedId,
  onSelect,
  updatingId,
  deletingId,
  onStatusChange,
  onRequestDelete,
  onText,
}: BookingsViewProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const filtered = bookings.filter((booking) => {
    const { details, preferredDate } = parseBookingMessage(booking.message);
    const query = deferredSearch.trim().toLowerCase();
    const haystack = [booking.name, booking.email ?? '', booking.phone ?? '', booking.service, booking.status, details, preferredDate]
      .join(' ')
      .toLowerCase();

    return (
      (!query || haystack.includes(query)) &&
      (statusFilter === 'all' || booking.status === statusFilter) &&
      (serviceFilter === 'all' || booking.service === serviceFilter)
    );
  });

  const selected = bookings.find((booking) => booking.id === selectedId) ?? filtered[0] ?? null;
  const services = [...new Set(bookings.map((booking) => booking.service))].sort();
  const countFor = (status: string) => bookings.filter((booking) => booking.status === status).length;

  const total = bookings.length;
  const completed = countFor('completed');
  const stats = [
    { label: 'New enquiries', value: countFor('new'), hint: 'Waiting for a reply', icon: Sparkles, filter: 'new' },
    { label: 'Contacted', value: countFor('contacted'), hint: 'Awaiting confirmation', icon: Clock3, filter: 'contacted' },
    { label: 'Scheduled', value: countFor('scheduled'), hint: 'Booked in', icon: CalendarDays, filter: 'scheduled' },
    {
      label: 'Completed',
      value: completed,
      hint: total ? `${Math.round((completed / total) * 100)}% of all enquiries` : 'No enquiries yet',
      icon: CheckCircle2,
      filter: 'completed',
    },
  ];

  const handleSelect = (id: string) => {
    onSelect(id);
    setMobileDetailOpen(true);
  };

  // Close the mobile sheet if its booking disappears (e.g. it was deleted).
  useEffect(() => {
    if (mobileDetailOpen && !bookings.some((booking) => booking.id === selectedId)) {
      setMobileDetailOpen(false);
    }
  }, [bookings, selectedId, mobileDetailOpen]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const active = statusFilter === stat.filter;
          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => setStatusFilter(active ? 'all' : stat.filter)}
              className={`rounded-2xl border p-4 text-left transition sm:p-5 ${
                active
                  ? 'border-[#E3C189]/40 bg-[#E3C189]/[0.07]'
                  : 'border-white/[0.07] bg-[#16110F] hover:border-white/15 hover:bg-[#1A1412]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white/55">{stat.label}</span>
                <stat.icon size={16} className={active ? 'text-[#E3C189]' : 'text-white/30'} />
              </div>
              <p className="mt-3 text-[2rem] font-semibold leading-none tracking-tight tabular-nums">{stat.value}</p>
              <p className="mt-2 truncate text-xs text-white/40">{stat.hint}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
        <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#16110F]">
          <div className="space-y-3 border-b border-white/[0.07] p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex h-11 min-w-0 items-center sm:flex-1 gap-2.5 rounded-xl border border-white/10 bg-black/20 px-3.5 transition focus-within:border-[#E3C189]/50">
                <Search size={16} className="shrink-0 text-white/35" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, phone, email, notes"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
                {search ? (
                  <button type="button" onClick={() => setSearch('')} className="text-white/40 hover:text-white" aria-label="Clear search">
                    <X size={15} />
                  </button>
                ) : null}
              </label>
              <select
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
                className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#E3C189]/50 sm:w-56"
                aria-label="Filter by service"
              >
                <option value="all" className="bg-[#1A120F]">All services</option>
                {services.map((service) => (
                  <option key={service} value={service} className="bg-[#1A120F]">
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5 sm:-mx-4 sm:px-4 [scrollbar-width:none]">
              {['all', ...statusOptions].map((status) => {
                const active = statusFilter === status;
                const count = status === 'all' ? total : countFor(status);
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition ${
                      active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    {status !== 'all' ? <span className={`h-1.5 w-1.5 rounded-full ${statusDot(status)}`} /> : null}
                    {status === 'all' ? 'All' : statusLabel(status)}
                    <span className={`tabular-nums ${active ? 'text-white/60' : 'text-white/30'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error ? (
            <div className="m-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 sm:m-4">{error}</div>
          ) : null}

          <div className="divide-y divide-white/[0.05]">
            {loading && bookings.length === 0
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex animate-pulse items-center gap-3 px-4 py-4">
                    <div className="h-10 w-10 rounded-full bg-white/5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 rounded bg-white/5" />
                      <div className="h-3 w-2/3 rounded bg-white/5" />
                    </div>
                  </div>
                ))
              : null}

            {!loading && filtered.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/40">
                  <Inbox size={20} />
                </div>
                <p className="mt-4 text-sm font-medium text-white/80">{total === 0 ? 'No enquiries yet' : 'Nothing matches'}</p>
                <p className="mt-1 text-sm text-white/40">
                  {total === 0 ? 'New bookings from the website will show up here.' : 'Try a different search or filter.'}
                </p>
              </div>
            ) : null}

            {filtered.map((booking) => {
              const parsed = parseBookingMessage(booking.message);
              const isSelected = booking.id === selected?.id;

              return (
                <button
                  key={booking.id}
                  type="button"
                  onClick={() => handleSelect(booking.id)}
                  className={`relative flex w-full items-start gap-3 px-3 py-3.5 text-left transition sm:px-4 ${
                    isSelected ? 'bg-[#E3C189]/[0.06]' : 'hover:bg-white/[0.025]'
                  }`}
                >
                  {isSelected ? <span className="absolute inset-y-2 left-0 hidden w-[3px] rounded-r bg-[#E3C189] lg:block" /> : null}
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3A2C22] to-[#241A15] text-[13px] font-semibold text-[#EBD3A8] ring-1 ring-white/10">
                      {initials(booking.name)}
                    </div>
                    {booking.status === 'new' ? (
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#16110F] bg-rose-400" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={`truncate text-[15px] ${booking.status === 'new' ? 'font-semibold text-white' : 'font-medium text-white/90'}`}>
                        {booking.name}
                      </p>
                      <span className="shrink-0 text-xs text-white/40" title={formatDateTime(booking.created_at)}>
                        {formatRelative(booking.created_at)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-[#E3C189]/90">{booking.service}</p>
                    <p className="mt-1 line-clamp-1 text-[13px] text-white/45">{parsed.details}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot(booking.status)}`} />
                        {statusLabel(booking.status)}
                      </span>
                      {parsed.preferredDate ? (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={12} />
                          {formatDateOnly(parsed.preferredDate)}
                        </span>
                      ) : null}
                      {booking.phone ? (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} />
                          {displayPhone(booking.phone)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <div className="border-t border-white/[0.05] px-4 py-3 text-xs text-white/35">
              Showing {filtered.length} of {total}
            </div>
          ) : null}
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/[0.07] bg-[#16110F]">
            {selected ? (
              <BookingDetail
                booking={selected}
                updating={updatingId === selected.id}
                deleting={deletingId === selected.id}
                onStatusChange={onStatusChange}
                onRequestDelete={onRequestDelete}
                onText={onText}
              />
            ) : (
              <div className="px-6 py-20 text-center text-sm text-white/40">Select a booking to see the details.</div>
            )}
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {mobileDetailOpen && selected ? (
          <motion.div
            className="fixed inset-0 z-[150] overflow-y-auto bg-[#0E0A09] lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-white/[0.07] bg-[#0E0A09]/90 px-2 py-2 backdrop-blur">
              <button
                type="button"
                onClick={() => setMobileDetailOpen(false)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm text-white/70 hover:bg-white/5"
              >
                <ChevronLeft size={18} />
                Bookings
              </button>
            </div>
            <BookingDetail
              booking={selected}
              updating={updatingId === selected.id}
              deleting={deletingId === selected.id}
              onStatusChange={onStatusChange}
              onRequestDelete={onRequestDelete}
              onText={(booking) => {
                setMobileDetailOpen(false);
                onText(booking);
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type BookingDetailProps = {
  booking: BookingRecord;
  updating: boolean;
  deleting: boolean;
  onStatusChange: (id: string, status: string) => void;
  onRequestDelete: (id: string) => void;
  onText: (booking: BookingRecord) => void;
};

function BookingDetail({ booking, updating, deleting, onStatusChange, onRequestDelete, onText }: BookingDetailProps) {
  const [copied, setCopied] = useState('');
  const parsed = parseBookingMessage(booking.message);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(''), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      setCopied('');
    }
  };

  const actionButton =
    'inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white';

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4A3828] to-[#271C16] text-lg font-semibold text-[#EBD3A8] ring-1 ring-white/10">
          {initials(booking.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-heading text-[1.6rem] leading-tight">{booking.name}</h2>
          <p className="mt-1 text-sm text-[#E3C189]">{booking.service}</p>
          <span className={`mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ${statusPill(booking.status)}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot(booking.status)}`} />
            {statusLabel(booking.status)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {booking.phone ? (
          <button
            type="button"
            onClick={() => onText(booking)}
            className="inline-flex h-10 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] text-sm font-semibold text-[#1A110D] transition hover:brightness-105"
          >
            <MessageSquareText size={16} />
            Send SMS
          </button>
        ) : null}
        {booking.phone ? (
          <a href={`tel:${booking.phone}`} className={actionButton}>
            <Phone size={15} />
            Call
          </a>
        ) : null}
        {booking.email ? (
          <a href={`mailto:${booking.email}`} className={actionButton}>
            <Mail size={15} />
            Email
          </a>
        ) : null}
      </div>

      <div className="mt-5 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-black/20">
        {[
          booking.phone ? { label: 'phone', icon: Phone, value: booking.phone, display: displayPhone(booking.phone) } : null,
          booking.email ? { label: 'email', icon: Mail, value: booking.email, display: booking.email } : null,
        ]
          .filter((row): row is NonNullable<typeof row> => row !== null)
          .map((row) => (
            <div key={row.label} className="flex items-center gap-3 px-4 py-3">
              <row.icon size={15} className="shrink-0 text-white/35" />
              <span className="min-w-0 flex-1 truncate text-sm text-white/85">{row.display}</span>
              <button
                type="button"
                onClick={() => copy(row.label, row.value)}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/45 transition hover:bg-white/5 hover:text-white"
              >
                {copied === row.label ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                {copied === row.label ? 'Copied' : 'Copy'}
              </button>
            </div>
          ))}
        {!booking.phone && !booking.email ? <p className="px-4 py-3 text-sm text-white/40">No contact details were left.</p> : null}
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">Status</p>
        <div className="mt-2.5 grid grid-cols-3 gap-1 rounded-xl bg-black/25 p-1 sm:grid-cols-5">
          {statusOptions.map((status) => {
            const active = booking.status === status;
            return (
              <button
                key={status}
                type="button"
                disabled={updating}
                onClick={() => !active && onStatusChange(booking.id, status)}
                className={`rounded-lg px-1 py-2 text-[12px] transition disabled:cursor-wait ${
                  active ? 'bg-white/10 font-medium text-white shadow-sm' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {statusLabel(status)}
              </button>
            );
          })}
        </div>
        {updating ? <p className="mt-2 text-xs text-white/40">Saving...</p> : null}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div>
          <dt className="text-xs text-white/40">Preferred date</dt>
          <dd className="mt-1 text-white/85">{formatDateOnly(parsed.preferredDate)}</dd>
        </div>
        <div>
          <dt className="text-xs text-white/40">Received</dt>
          <dd className="mt-1 text-white/85">{formatDateTime(booking.created_at)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-white/40">Source</dt>
          <dd className="mt-1 text-white/85">{booking.source}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">Message</p>
        <p className="mt-2.5 whitespace-pre-wrap rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm leading-6 text-white/75">
          {parsed.details || 'No message left.'}
        </p>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <button
          type="button"
          onClick={() => onRequestDelete(booking.id)}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white/40 transition hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-50"
        >
          <Trash2 size={14} />
          {deleting ? 'Deleting...' : 'Delete booking'}
        </button>
      </div>
    </div>
  );
}
