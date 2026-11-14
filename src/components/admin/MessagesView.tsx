import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Plus,
  RefreshCcw,
  Search,
  Send,
  Settings2,
  Users,
  X,
} from 'lucide-react';
import {
  BookingRecord,
  SmsOverview,
  SmsRecipient,
  cleanSmsText,
  displayPhone,
  formatDateTime,
  formatRelative,
  initials,
  messageVariables,
  normalizePhone,
  personalise,
  recipientFromBooking,
  smsSegments,
  smsTemplates,
  statusDot,
  statusLabel,
  statusOptions,
} from './adminUtils';

type MessagesViewProps = {
  bookings: BookingRecord[];
  recipients: SmsRecipient[];
  onRecipientsChange: (recipients: SmsRecipient[]) => void;
  onMarkContacted: (bookingIds: string[]) => Promise<void>;
  onUnauthorized: () => void;
};

type SendResult = {
  sent: number;
  failed: Array<{ to: string; status: string }>;
};

export default function MessagesView({ bookings, recipients, onRecipientsChange, onMarkContacted, onUnauthorized }: MessagesViewProps) {
  const [overview, setOverview] = useState<SmsOverview | null>(null);
  const [overviewError, setOverviewError] = useState('');
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [body, setBody] = useState('');
  const [manualNumber, setManualNumber] = useState('');
  const [manualError, setManualError] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [result, setResult] = useState<SendResult | null>(null);
  const [markContacted, setMarkContacted] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const loadOverview = useCallback(async () => {
    setLoadingOverview(true);
    setOverviewError('');

    try {
      const response = await fetch('/api/admin-sms', { cache: 'no-store' });
      const payload = (await response.json().catch(() => null)) as (SmsOverview & { error?: string }) | null;

      if (response.status === 401 && !payload?.configured) {
        onUnauthorized();
        return;
      }

      if (!response.ok || !payload) {
        setOverview(payload?.configured ? { configured: true, senderId: '', history: [] } : null);
        setOverviewError(payload?.error || 'Unable to load SMS account details.');
        return;
      }

      setOverview(payload);
    } catch {
      setOverviewError('Unable to load SMS account details.');
    } finally {
      setLoadingOverview(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  const configured = overview?.configured ?? false;
  const cleanedBody = cleanSmsText(body);
  const preview = personalise(cleanedBody, recipients[0] ?? null);
  const segments = smsSegments(preview);
  const newRecipientCount = recipients.filter((recipient) => recipient.bookingId && recipient.status === 'new').length;

  const canSend = configured && recipients.length > 0 && cleanedBody.trim().length > 0 && !sending;
  const sendBlocker = !configured
    ? 'Connect ClickSend to start sending'
    : recipients.length === 0
      ? 'Add at least one recipient'
      : !cleanedBody.trim()
        ? 'Write a message'
        : '';

  const addRecipients = (next: SmsRecipient[]) => {
    const seen = new Set(recipients.map((recipient) => recipient.phone));
    const merged = [...recipients];
    next.forEach((recipient) => {
      if (!seen.has(recipient.phone)) {
        seen.add(recipient.phone);
        merged.push(recipient);
      }
    });
    onRecipientsChange(merged);
  };

  const handleManualAdd = (event: FormEvent) => {
    event.preventDefault();
    const phone = normalizePhone(manualNumber);
    if (!phone) {
      setManualError('That does not look like a phone number.');
      return;
    }

    const match = bookings.find((booking) => booking.phone && normalizePhone(booking.phone) === phone);
    addRecipients([
      match
        ? (recipientFromBooking(match) as SmsRecipient)
        : { key: `manual:${phone}`, phone, name: '', service: '' },
    ]);
    setManualNumber('');
    setManualError('');
  };

  const insertToken = (token: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setBody((current) => current + token);
      return;
    }

    const start = textarea.selectionStart ?? body.length;
    const end = textarea.selectionEnd ?? body.length;
    const next = body.slice(0, start) + token + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + token.length, start + token.length);
    });
  };

  const handleSend = async () => {
    setSending(true);
    setSendError('');
    setResult(null);

    try {
      const messages = recipients.map((recipient) => ({
        to: recipient.phone,
        body: personalise(cleanedBody, recipient),
        bookingId: recipient.bookingId,
      }));

      const response = await fetch('/api/admin-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const payload = (await response.json().catch(() => null)) as {
        sent?: number;
        results?: Array<{ to: string; status: string; bookingId: string }>;
        error?: string;
      } | null;

      if (!response.ok) {
        setSendError(payload?.error || 'The messages could not be sent.');
        setConfirmOpen(false);
        return;
      }

      const results = payload?.results ?? [];
      const failed = results.filter((item) => item.status !== 'SUCCESS');
      const succeededPhones = new Set(results.filter((item) => item.status === 'SUCCESS').map((item) => normalizePhone(item.to)));

      setResult({
        sent: payload?.sent ?? 0,
        failed: failed.map((item) => ({ to: item.to, status: item.status })),
      });

      if (markContacted) {
        const ids = recipients
          .filter((recipient) => recipient.bookingId && recipient.status === 'new' && succeededPhones.has(recipient.phone))
          .map((recipient) => recipient.bookingId as string);
        if (ids.length) {
          await onMarkContacted(ids);
        }
      }

      // Keep anyone who failed in the list so they can be fixed and retried.
      onRecipientsChange(recipients.filter((recipient) => !succeededPhones.has(recipient.phone)));
      if (failed.length === 0) {
        setBody('');
      }

      setConfirmOpen(false);
      loadOverview();
    } catch {
      setSendError('The messages could not be sent. Check your connection and try again.');
      setConfirmOpen(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
      <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#16110F]">
        <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <h2 className="text-[17px] font-semibold">New message</h2>
          <p className="mt-0.5 text-sm text-white/45">Text one client or a whole group. Each person gets their own copy.</p>
        </div>

        <div className="space-y-7 p-5 sm:p-6">
          {result ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
              <div className="flex-1 text-emerald-50">
                <p>
                  Sent to {result.sent} {result.sent === 1 ? 'person' : 'people'}
                </p>
                {result.failed.length ? (
                  <p className="mt-1 text-amber-100">
                    {result.failed.length} could not be sent ({result.failed.map((item) => `${displayPhone(item.to)}: ${item.status}`).join(', ')}). They are still in the list below.
                  </p>
                ) : null}
              </div>
              <button type="button" onClick={() => setResult(null)} className="text-emerald-100/50 hover:text-white" aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          ) : null}

          {sendError ? (
            <div className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-300" />
              <span className="flex-1">{sendError}</span>
              <button type="button" onClick={() => setSendError('')} className="text-rose-100/50 hover:text-white" aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          ) : null}

          {/* Recipients */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-white/80">
                To
                {recipients.length ? <span className="ml-2 font-normal text-white/40">{recipients.length} selected</span> : null}
              </label>
              {recipients.length ? (
                <button type="button" onClick={() => onRecipientsChange([])} className="text-xs text-white/40 hover:text-white">
                  Clear all
                </button>
              ) : null}
            </div>

            <div className="mt-2.5 rounded-xl border border-white/10 bg-black/20 p-2">
              {recipients.length ? (
                <div className="flex max-h-44 flex-wrap gap-1.5 overflow-y-auto p-1">
                  {recipients.map((recipient) => (
                    <span
                      key={recipient.key}
                      className="inline-flex max-w-full items-center gap-2 rounded-lg bg-white/[0.07] py-1 pl-1 pr-1.5 text-[13px] text-white/85"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#3A2C22] text-[10px] font-semibold text-[#EBD3A8]">
                        {recipient.name ? initials(recipient.name) : '#'}
                      </span>
                      <span className="truncate">
                        {recipient.name || displayPhone(recipient.phone)}
                        {recipient.name ? <span className="ml-1.5 text-white/40">{displayPhone(recipient.phone)}</span> : null}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRecipientsChange(recipients.filter((item) => item.key !== recipient.key))}
                        className="rounded p-0.5 text-white/40 hover:bg-white/10 hover:text-white"
                        aria-label={`Remove ${recipient.name || recipient.phone}`}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={`flex flex-col gap-2 sm:flex-row ${recipients.length ? 'mt-2 border-t border-white/[0.06] pt-2' : ''}`}>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-3.5 text-sm text-white/85 transition hover:bg-white/10"
                >
                  <Users size={15} />
                  Choose clients
                </button>
                <form onSubmit={handleManualAdd} className="flex flex-1 gap-2">
                  <input
                    value={manualNumber}
                    onChange={(event) => {
                      setManualNumber(event.target.value);
                      setManualError('');
                    }}
                    inputMode="tel"
                    placeholder="Or type a mobile number"
                    className="h-10 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/30 focus:bg-white/[0.03]"
                  />
                  <button
                    type="submit"
                    disabled={!manualNumber.trim()}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <Plus size={15} />
                    Add
                  </button>
                </form>
              </div>
            </div>
            {manualError ? <p className="mt-2 text-xs text-rose-300">{manualError}</p> : null}
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="sms-body" className="text-sm font-medium text-white/80">
                Message
              </label>
            </div>

            <div className="-mx-1 mt-2.5 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {smsTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setBody(template.body)}
                  className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-[#E3C189]/40 hover:text-[#F0D39E]"
                >
                  {template.label}
                </button>
              ))}
            </div>

            <div className="mt-2 rounded-xl border border-white/10 bg-black/20 transition focus-within:border-[#E3C189]/50 focus-within:ring-4 focus-within:ring-[#E3C189]/10">
              <textarea
                id="sms-body"
                ref={textareaRef}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={6}
                placeholder="Hi {first_name}, ..."
                className="block w-full resize-y bg-transparent px-4 py-3 text-[15px] leading-6 text-white outline-none placeholder:text-white/25"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  {messageVariables.map((variable) => (
                    <button
                      key={variable.token}
                      type="button"
                      onClick={() => insertToken(variable.token)}
                      className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-white/60 transition hover:bg-[#E3C189]/15 hover:text-[#F0D39E]"
                    >
                      + {variable.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs tabular-nums text-white/40">{segments.length} characters</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          {cleanedBody.trim() ? (
            <div>
              <p className="text-sm font-medium text-white/80">
                Preview
                <span className="ml-2 font-normal text-white/40">
                  {recipients[0] ? `as ${recipients[0].name || displayPhone(recipients[0].phone)} will see it` : 'with sample details'}
                </span>
              </p>
              <div className="mt-2.5 rounded-xl bg-black/30 p-4">
                {overview?.senderId ? <p className="mb-2 text-center text-[11px] text-white/35">From {overview.senderId}</p> : null}
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-[#2A2321] px-4 py-2.5 text-[14px] leading-[1.45] text-white/90">
                  {preview}
                </div>
              </div>
            </div>
          ) : null}

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <label className={`flex items-center gap-2.5 text-sm ${newRecipientCount ? 'text-white/70' : 'text-white/35'}`}>
              <input
                type="checkbox"
                checked={markContacted}
                onChange={(event) => setMarkContacted(event.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#E3C189]"
              />
              Mark new enquiries as contacted
              {newRecipientCount ? <span className="text-white/40">({newRecipientCount})</span> : null}
            </label>

            <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
              <button
                type="button"
                disabled={!canSend}
                onClick={() => setConfirmOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] px-6 text-sm font-semibold text-[#1A110D] transition hover:brightness-105 disabled:cursor-not-allowed disabled:from-white/10 disabled:to-white/10 disabled:text-white/35"
              >
                <Send size={15} />
                {recipients.length > 1 ? `Send to ${recipients.length} people` : 'Send message'}
              </button>
              {sendBlocker ? <span className="text-center text-xs text-white/35 sm:text-right">{sendBlocker}</span> : null}
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-5">
        <AccountCard overview={overview} loading={loadingOverview} error={overviewError} onRefresh={loadOverview} />
        {configured ? <HistoryCard overview={overview} loading={loadingOverview} bookings={bookings} /> : null}
      </aside>

      <AnimatePresence>
        {pickerOpen ? (
          <RecipientPicker
            bookings={bookings}
            selectedPhones={new Set(recipients.map((recipient) => recipient.phone))}
            onClose={() => setPickerOpen(false)}
            onConfirm={(picked) => {
              const pickedPhones = new Set(picked.map((recipient) => recipient.phone));
              // Booking-based recipients are fully controlled by the picker; manual ones stay.
              const kept = recipients.filter((recipient) => !recipient.bookingId || pickedPhones.has(recipient.phone));
              const keptPhones = new Set(kept.map((recipient) => recipient.phone));
              onRecipientsChange([...kept, ...picked.filter((recipient) => !keptPhones.has(recipient.phone))]);
              setPickerOpen(false);
            }}
          />
        ) : null}

        {confirmOpen ? (
          <Modal onClose={() => !sending && setConfirmOpen(false)} label="Confirm sending">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3C189]/15 text-[#F0D39E]">
              <Send size={18} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">
              Send to {recipients.length} {recipients.length === 1 ? 'person' : 'people'}?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Each person gets their own copy of the message below. Texts can't be unsent once they go out.
            </p>
            <div className="mt-4 max-h-40 overflow-y-auto rounded-xl bg-black/30 px-4 py-3 text-sm leading-6 text-white/75 whitespace-pre-wrap">
              {preview}
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={sending}
                className="h-11 rounded-xl px-5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] px-6 text-sm font-semibold text-[#1A110D] transition hover:brightness-105 disabled:opacity-70"
              >
                {sending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1A110D]/30 border-t-[#1A110D]" />
                ) : (
                  <Send size={15} />
                )}
                {sending ? 'Sending' : 'Send now'}
              </button>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function AccountCard({
  overview,
  loading,
  error,
  onRefresh,
}: {
  overview: SmsOverview | null;
  loading: boolean;
  error: string;
  onRefresh: () => void;
}) {
  if (loading && !overview) {
    return <div className="h-40 animate-pulse rounded-2xl border border-white/[0.07] bg-[#16110F]" />;
  }

  if (overview && !overview.configured) {
    return (
      <div className="rounded-2xl border border-[#E3C189]/25 bg-[#E3C189]/[0.05] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3C189]/15 text-[#F0D39E]">
            <Settings2 size={18} />
          </div>
          <div>
            <p className="font-semibold">Connect ClickSend</p>
            <p className="text-xs text-white/50">SMS is not switched on yet</p>
          </div>
        </div>
        <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-sm leading-6 text-white/65 marker:text-white/35">
          <li>
            In ClickSend, open <span className="text-white/85">Developers → API Credentials</span>.
          </li>
          <li>
            In Vercel, add <code className="rounded bg-black/30 px-1.5 py-0.5 text-[12px] text-[#F0D39E]">CLICKSEND_USERNAME</code> and{' '}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-[12px] text-[#F0D39E]">CLICKSEND_API_KEY</code>.
          </li>
          <li>
            Optional: <code className="rounded bg-black/30 px-1.5 py-0.5 text-[12px] text-[#F0D39E]">CLICKSEND_SENDER_ID</code> to send
            from a set number or name.
          </li>
          <li>Redeploy, then refresh this page.</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#16110F] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className={`h-2 w-2 rounded-full ${error ? 'bg-rose-400' : 'bg-emerald-400'}`} />
          <span className="text-white/70">{error ? 'ClickSend problem' : 'ClickSend connected'}</span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white"
          aria-label="Refresh account"
        >
          <RefreshCcw size={15} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error ? (
        <p className="mt-4 text-sm leading-6 text-rose-100/80">{error}</p>
      ) : (
        <div className="mt-5">
          <div className="min-w-0">
            <p className="text-xs text-white/40">Sends as</p>
            <p className="mt-1.5 truncate text-sm text-white/85" title={overview?.senderId || 'Shared number'}>
              {overview?.senderId || 'ClickSend shared number'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryCard({ overview, loading, bookings }: { overview: SmsOverview | null; loading: boolean; bookings: BookingRecord[] }) {
  const history = overview?.history ?? [];
  const nameFor = (bookingId: string, to: string) => {
    const booking =
      bookings.find((item) => item.id === bookingId) ??
      bookings.find((item) => item.phone && normalizePhone(item.phone) === normalizePhone(to));
    return booking?.name ?? '';
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#16110F]">
      <div className="border-b border-white/[0.07] px-5 py-4">
        <p className="text-[15px] font-semibold">Recently sent</p>
        <p className="text-xs text-white/40">Last 30 days</p>
      </div>
      <div className="max-h-[520px] divide-y divide-white/[0.05] overflow-y-auto">
        {loading && history.length === 0 ? <p className="px-5 py-8 text-center text-sm text-white/40">Loading...</p> : null}
        {!loading && history.length === 0 ? <p className="px-5 py-8 text-center text-sm text-white/40">No messages sent yet.</p> : null}
        {history.map((item) => {
          const name = nameFor(item.bookingId, item.to);
          const ok = /deliver|sent|success|queued|scheduled/i.test(item.status);
          return (
            <div key={item.id} className="px-5 py-3.5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-sm text-white/85">
                  {name || displayPhone(item.to)}
                  {name ? <span className="ml-1.5 text-xs text-white/35">{displayPhone(item.to)}</span> : null}
                </p>
                <span className="shrink-0 text-xs text-white/35" title={formatDateTime(item.sentAt)}>
                  {formatRelative(item.sentAt)}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/50">{item.body}</p>
              <p className={`mt-1.5 text-[11px] uppercase tracking-wide ${ok ? 'text-emerald-300/70' : 'text-amber-200/80'}`}>
                {item.status.replace(/_/g, ' ').toLowerCase()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecipientPicker({
  bookings,
  selectedPhones,
  onClose,
  onConfirm,
}: {
  bookings: BookingRecord[];
  selectedPhones: Set<string>;
  onClose: () => void;
  onConfirm: (recipients: SmsRecipient[]) => void;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  // One entry per phone number, keeping the most recent booking for each.
  const contacts: SmsRecipient[] = [];
  const seen = new Set<string>();
  bookings.forEach((booking) => {
    const recipient = recipientFromBooking(booking);
    if (recipient && !seen.has(recipient.phone)) {
      seen.add(recipient.phone);
      contacts.push(recipient);
    }
  });

  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(contacts.filter((contact) => selectedPhones.has(contact.phone)).map((contact) => contact.phone)),
  );

  const query = search.trim().toLowerCase();
  const visible = contacts.filter(
    (contact) =>
      (status === 'all' || contact.status === status) &&
      (!query || `${contact.name} ${contact.phone} ${displayPhone(contact.phone)} ${contact.service}`.toLowerCase().includes(query)),
  );
  const allVisiblePicked = visible.length > 0 && visible.every((contact) => picked.has(contact.phone));

  const toggle = (phone: string) => {
    setPicked((current) => {
      const next = new Set(current);
      if (next.has(phone)) next.delete(phone);
      else next.add(phone);
      return next;
    });
  };

  const toggleAllVisible = () => {
    setPicked((current) => {
      const next = new Set(current);
      visible.forEach((contact) => (allVisiblePicked ? next.delete(contact.phone) : next.add(contact.phone)));
      return next;
    });
  };

  return (
    <Modal onClose={onClose} label="Choose clients" wide>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose clients</h3>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white" aria-label="Close">
          <X size={18} />
        </button>
      </div>
      <p className="mt-1 text-sm text-white/45">Clients from your bookings who left a phone number.</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <label className="flex h-10 min-w-0 items-center gap-2.5 rounded-xl sm:flex-1 border border-white/10 bg-black/20 px-3.5 focus-within:border-[#E3C189]/50">
          <Search size={15} className="text-white/35" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            autoFocus
          />
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-3.5 pr-9 text-sm outline-none sm:w-44"
            aria-label="Filter by status"
          >
            <option value="all" className="bg-[#1A120F]">Any status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option} className="bg-[#1A120F]">
                {statusLabel(option)}
              </option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-xs text-white/45">
        <button type="button" onClick={toggleAllVisible} disabled={!visible.length} className="hover:text-white disabled:opacity-40">
          {allVisiblePicked ? 'Deselect' : 'Select'} all {visible.length} shown
        </button>
        <span>{picked.size} selected</span>
      </div>

      <div className="mt-2 max-h-[45vh] divide-y divide-white/[0.05] overflow-y-auto rounded-xl border border-white/[0.07] bg-black/20">
        {visible.length === 0 ? <p className="px-4 py-10 text-center text-sm text-white/40">No clients match.</p> : null}
        {visible.map((contact) => {
          const checked = picked.has(contact.phone);
          return (
            <label key={contact.phone} className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition ${checked ? 'bg-[#E3C189]/[0.06]' : 'hover:bg-white/[0.03]'}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(contact.phone)}
                className="h-4 w-4 shrink-0 accent-[#E3C189]"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white/90">{contact.name}</p>
                <p className="truncate text-xs text-white/40">
                  {displayPhone(contact.phone)} · {contact.service}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-white/45">
                <span className={`h-1.5 w-1.5 rounded-full ${statusDot(contact.status ?? '')}`} />
                {statusLabel(contact.status ?? '')}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className="h-11 rounded-xl px-5 text-sm text-white/60 hover:bg-white/5 hover:text-white">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(contacts.filter((contact) => picked.has(contact.phone)))}
          className="h-11 rounded-xl bg-white px-6 text-sm font-semibold text-[#1A110D] transition hover:bg-white/90"
        >
          Use {picked.size} {picked.size === 1 ? 'client' : 'clients'}
        </button>
      </div>
    </Modal>
  );
}

export function Modal({
  children,
  onClose,
  label,
  wide = false,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  wide?: boolean;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/10 bg-[#17120F] p-6 shadow-2xl sm:rounded-2xl ${wide ? 'sm:max-w-xl' : 'sm:max-w-md'}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
