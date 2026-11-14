import { FormEvent, useDeferredValue, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  MessageSquareText,
  Pencil,
  Phone,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { Modal } from './MessagesView';
import {
  ClientInput,
  Contact,
  displayPhone,
  formatDateTime,
  formatRelative,
  initials,
  statusDot,
  statusLabel,
} from './adminUtils';

export type SaveClientResult = { id?: string; error?: string; code?: string };

type ClientsViewProps = {
  contacts: Contact[];
  loading: boolean;
  error: string;
  onSave: (input: ClientInput, id: string | undefined, allowSharedPhone: boolean) => Promise<SaveClientResult>;
  onDelete: (id: string) => Promise<string | null>;
  onText: (contact: Contact) => void;
  onOpenBooking: (bookingId: string) => void;
};

type Filter = 'all' | 'clients' | 'enquiries';

type FormState = { mode: 'add' | 'edit'; id?: string; initial: ClientInput } | null;

const emptyForm: ClientInput = { name: '', phone: '', email: '', notes: '' };

export default function ClientsView({ contacts, loading, error, onSave, onDelete, onText, onOpenBooking }: ClientsViewProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedKey, setSelectedKey] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<FormState>(null);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);
  const deferredSearch = useDeferredValue(search);

  const query = deferredSearch.trim().toLowerCase();
  const queryDigits = query.replace(/\D/g, '');
  const filtered = contacts.filter((contact) => {
    if (filter === 'clients' && !contact.clientId) return false;
    if (filter === 'enquiries' && contact.clientId) return false;
    if (!query) return true;

    const phoneDigits = `${contact.phone} ${displayPhone(contact.phone)}`.replace(/\D/g, '');
    return (
      `${contact.name} ${contact.email} ${contact.notes}`.toLowerCase().includes(query) ||
      (queryDigits.length >= 3 && (phoneDigits.includes(queryDigits) || phoneDigits.includes(queryDigits.replace(/^0/, ''))))
    );
  });

  const selected = contacts.find((contact) => contact.key === selectedKey) ?? filtered[0] ?? null;
  const savedCount = contacts.filter((contact) => contact.clientId).length;

  // Group the list A-Z, the way a phone's contacts look.
  const groups: Array<{ letter: string; items: Contact[] }> = [];
  filtered.forEach((contact) => {
    const first = contact.name.trim().charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : '#';
    const last = groups[groups.length - 1];
    if (last && last.letter === letter) last.items.push(contact);
    else groups.push({ letter, items: [contact] });
  });

  useEffect(() => {
    if (mobileOpen && selectedKey && !contacts.some((contact) => contact.key === selectedKey)) {
      setMobileOpen(false);
    }
  }, [contacts, selectedKey, mobileOpen]);

  const select = (key: string) => {
    setSelectedKey(key);
    setMobileOpen(true);
  };

  const openEdit = (contact: Contact) =>
    setForm({
      mode: contact.clientId ? 'edit' : 'add',
      id: contact.clientId,
      initial: { name: contact.name, phone: contact.phone ? displayPhone(contact.phone) : '', email: contact.email, notes: contact.notes },
    });

  const detail = (contact: Contact, onTextContact: (contact: Contact) => void) => (
    <ContactDetail
      contact={contact}
      onText={onTextContact}
      onEdit={() => openEdit(contact)}
      onDelete={() => setPendingDelete(contact)}
      onOpenBooking={onOpenBooking}
    />
  );

  return (
    <div className="space-y-5">
      {error ? (
        <div className="flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-sm text-amber-50">
          <AlertCircle size={17} className="mt-0.5 shrink-0 text-amber-200" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
        <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#16110F]">
          <div className="space-y-3 border-b border-white/[0.07] p-3 sm:p-4">
            <div className="flex gap-2">
              <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-black/20 px-3.5 transition focus-within:border-[#E3C189]/50">
                <Search size={16} className="shrink-0 text-white/35" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, phone or email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
                {search ? (
                  <button type="button" onClick={() => setSearch('')} className="text-white/40 hover:text-white" aria-label="Clear search">
                    <X size={15} />
                  </button>
                ) : null}
              </label>
              <button
                type="button"
                onClick={() => setForm({ mode: 'add', initial: emptyForm })}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] px-3.5 text-sm font-semibold text-[#1A110D] transition hover:brightness-105 sm:px-4"
              >
                <UserPlus size={16} />
                <span className="hidden sm:inline">Add client</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            <div className="flex gap-1.5">
              {(
                [
                  { id: 'all', label: 'All', count: contacts.length },
                  { id: 'clients', label: 'Saved clients', count: savedCount },
                  { id: 'enquiries', label: 'Website enquiries', count: contacts.length - savedCount },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition ${
                    filter === option.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  {option.label}
                  <span className={`tabular-nums ${filter === option.id ? 'text-white/60' : 'text-white/30'}`}>{option.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            {loading && contacts.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex animate-pulse items-center gap-3 px-4 py-3.5">
                    <div className="h-10 w-10 rounded-full bg-white/5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 rounded bg-white/5" />
                      <div className="h-3 w-1/2 rounded bg-white/5" />
                    </div>
                  </div>
                ))
              : null}

            {!loading && filtered.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/40">
                  <Users size={20} />
                </div>
                <p className="mt-4 text-sm font-medium text-white/80">{contacts.length === 0 ? 'No clients yet' : 'Nobody matches'}</p>
                <p className="mt-1 text-sm text-white/40">
                  {contacts.length === 0 ? 'Add your first client to get started.' : 'Try a different name or number.'}
                </p>
              </div>
            ) : null}

            {groups.map((group) => (
              <div key={group.letter}>
                <p className="sticky top-[57px] z-10 border-y border-white/[0.04] bg-[#14100E]/95 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#E3C189]/70 backdrop-blur lg:top-0">
                  {group.letter}
                </p>
                <div className="divide-y divide-white/[0.05]">
                  {group.items.map((contact) => {
                    const isSelected = contact.key === selected?.key;
                    return (
                      <button
                        key={contact.key}
                        type="button"
                        onClick={() => select(contact.key)}
                        className={`relative flex w-full items-center gap-3 px-3 py-3 text-left transition sm:px-4 ${
                          isSelected ? 'bg-[#E3C189]/[0.06]' : 'hover:bg-white/[0.025]'
                        }`}
                      >
                        {isSelected ? <span className="absolute inset-y-2 left-0 hidden w-[3px] rounded-r bg-[#E3C189] lg:block" /> : null}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3A2C22] to-[#241A15] text-[13px] font-semibold text-[#EBD3A8] ring-1 ring-white/10">
                          {initials(contact.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[15px] font-medium text-white/90">{contact.name}</p>
                            {!contact.clientId ? (
                              <span className="shrink-0 rounded-full bg-sky-400/10 px-2 py-0.5 text-[10px] font-medium text-sky-200 ring-1 ring-inset ring-sky-400/20">
                                Enquiry
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 truncate text-[13px] text-white/45">
                            {[contact.phone ? displayPhone(contact.phone) : '', contact.email].filter(Boolean).join(' · ') || 'No contact details'}
                          </p>
                        </div>
                        {contact.bookings.length ? (
                          <span className="shrink-0 text-xs text-white/35">
                            {contact.bookings.length} {contact.bookings.length === 1 ? 'enquiry' : 'enquiries'}
                          </span>
                        ) : null}
                        <ChevronRight size={16} className="shrink-0 text-white/20 lg:hidden" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="border-t border-white/[0.05] px-4 py-3 text-xs text-white/35">
              Showing {filtered.length} of {contacts.length}
            </div>
          ) : null}
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/[0.07] bg-[#16110F]">
            {selected ? detail(selected, onText) : <div className="px-6 py-20 text-center text-sm text-white/40">Select a client to see their details.</div>}
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {mobileOpen && selected ? (
          <motion.div
            className="fixed inset-0 z-[150] overflow-y-auto bg-[#0E0A09] lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center border-b border-white/[0.07] bg-[#0E0A09]/90 px-2 py-2 backdrop-blur">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm text-white/70 hover:bg-white/5"
              >
                <ChevronLeft size={18} />
                Clients
              </button>
            </div>
            {detail(selected, (contact) => {
              setMobileOpen(false);
              onText(contact);
            })}
          </motion.div>
        ) : null}

        {form ? (
          <ClientForm
            key="client-form"
            state={form}
            onClose={() => setForm(null)}
            onSave={async (input, allowSharedPhone) => {
              const result = await onSave(input, form.id, allowSharedPhone);
              if (!result.error && result.id) {
                setSelectedKey(`client:${result.id}`);
                setForm(null);
              }
              return result;
            }}
          />
        ) : null}

        {pendingDelete?.clientId ? (
          <DeleteClient
            key="client-delete"
            contact={pendingDelete}
            onClose={() => setPendingDelete(null)}
            onConfirm={async () => {
              const deleteError = await onDelete(pendingDelete.clientId as string);
              if (!deleteError) {
                setPendingDelete(null);
                setSelectedKey('');
              }
              return deleteError;
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactDetail({
  contact,
  onText,
  onEdit,
  onDelete,
  onOpenBooking,
}: {
  contact: Contact;
  onText: (contact: Contact) => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpenBooking: (bookingId: string) => void;
}) {
  const [copied, setCopied] = useState('');

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

  const rows = [
    contact.phone ? { label: 'phone', icon: Phone, value: contact.phone, display: displayPhone(contact.phone) } : null,
    contact.email ? { label: 'email', icon: Mail, value: contact.email, display: contact.email } : null,
  ].filter((row): row is NonNullable<typeof row> => row !== null);

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4A3828] to-[#271C16] text-lg font-semibold text-[#EBD3A8] ring-1 ring-white/10">
          {initials(contact.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-heading text-[1.6rem] leading-tight">{contact.name}</h2>
          <p className="mt-1 text-sm text-white/45">
            {contact.clientId ? `Client since ${formatDateTime(contact.addedAt).split(',')[0]}` : `Website enquiry · ${formatRelative(contact.addedAt)}`}
          </p>
        </div>
      </div>

      {contact.phone || contact.email ? (
        <div className="mt-6 flex gap-2">
          {contact.phone ? (
            <button
              type="button"
              onClick={() => onText(contact)}
              className="inline-flex h-10 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] text-sm font-semibold text-[#1A110D] transition hover:brightness-105"
            >
              <MessageSquareText size={16} />
              Send SMS
            </button>
          ) : null}
          {contact.phone ? (
            <a href={`tel:${contact.phone}`} className={actionButton}>
              <Phone size={15} />
              Call
            </a>
          ) : null}
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className={actionButton}>
              <Mail size={15} />
              Email
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-black/20">
        {rows.map((row) => (
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
        {rows.length === 0 ? <p className="px-4 py-3 text-sm text-white/40">No phone or email saved.</p> : null}
      </div>

      {contact.notes ? (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">Notes</p>
          <p className="mt-2.5 whitespace-pre-wrap rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5 text-sm leading-6 text-white/75">
            {contact.notes}
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">Website enquiries</p>
        {contact.bookings.length ? (
          <div className="mt-2.5 divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-black/20">
            {contact.bookings.map((booking) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => onOpenBooking(booking.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.03]"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot(booking.status)}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white/85">{booking.service}</span>
                  <span className="block text-xs text-white/40">
                    {statusLabel(booking.status)} · {formatDateTime(booking.created_at)}
                  </span>
                </span>
                <ChevronRight size={15} className="shrink-0 text-white/25" />
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2.5 text-sm text-white/40">No website enquiries yet.</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
        {contact.clientId ? (
          <>
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white/40 transition hover:bg-rose-500/10 hover:text-rose-200"
            >
              <Trash2 size={14} />
              Delete client
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/85 transition hover:bg-white/[0.08]"
          >
            <UserPlus size={15} />
            Save as client
          </button>
        )}
      </div>
    </div>
  );
}

function ClientForm({
  state,
  onClose,
  onSave,
}: {
  state: NonNullable<FormState>;
  onClose: () => void;
  onSave: (input: ClientInput, allowSharedPhone: boolean) => Promise<SaveClientResult>;
}) {
  const [values, setValues] = useState<ClientInput>(state.initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [sharedWarning, setSharedWarning] = useState('');

  const update = (field: keyof ClientInput) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setError('');
    if (field === 'phone') setSharedWarning('');
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!values.name.trim()) {
      setError('Please enter a name.');
      return;
    }

    setSaving(true);
    setError('');
    const result = await onSave(values, Boolean(sharedWarning));
    setSaving(false);

    if (result.code === 'shared_phone') {
      setSharedWarning(result.error ?? 'Someone else already uses this number.');
      return;
    }
    if (result.error) {
      setError(result.error);
    }
  };

  const input =
    'h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3.5 text-[15px] text-white outline-none transition placeholder:text-white/25 focus:border-[#E3C189]/50 focus:ring-4 focus:ring-[#E3C189]/10';

  return (
    <Modal onClose={() => !saving && onClose()} label={state.mode === 'edit' ? 'Edit client' : 'Add client'}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{state.mode === 'edit' ? 'Edit client' : 'Add client'}</h3>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white" aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor="client-name" className="mb-1.5 block text-sm text-white/70">
            Name
          </label>
          <input id="client-name" value={values.name} onChange={(event) => update('name')(event.target.value)} className={input} placeholder="Full name" autoFocus />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="client-phone" className="mb-1.5 block text-sm text-white/70">
              Mobile
            </label>
            <input
              id="client-phone"
              value={values.phone}
              onChange={(event) => update('phone')(event.target.value)}
              className={input}
              placeholder="0412 345 678"
              inputMode="tel"
            />
          </div>
          <div>
            <label htmlFor="client-email" className="mb-1.5 block text-sm text-white/70">
              Email <span className="text-white/35">(optional)</span>
            </label>
            <input
              id="client-email"
              value={values.email}
              onChange={(event) => update('email')(event.target.value)}
              className={input}
              placeholder="name@example.com"
              inputMode="email"
              autoCapitalize="none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="client-notes" className="mb-1.5 block text-sm text-white/70">
            Notes <span className="text-white/35">(optional)</span>
          </label>
          <textarea
            id="client-notes"
            value={values.notes}
            onChange={(event) => update('notes')(event.target.value)}
            rows={3}
            className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/25 focus:border-[#E3C189]/50 focus:ring-4 focus:ring-[#E3C189]/10"
            placeholder="Colour formula, extension length, preferences..."
          />
        </div>

        {sharedWarning ? (
          <div className="flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-sm text-amber-50">
            <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-200" />
            <span>{sharedWarning} Save anyway if they share a phone.</span>
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-300" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={saving} className="h-11 rounded-xl px-5 text-sm text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-50">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F0D39E] to-[#CF9F5C] px-6 text-sm font-semibold text-[#1A110D] transition hover:brightness-105 disabled:opacity-70"
          >
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1A110D]/30 border-t-[#1A110D]" /> : null}
            {saving ? 'Saving' : sharedWarning ? 'Save anyway' : state.mode === 'edit' ? 'Save changes' : 'Add client'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DeleteClient({ contact, onClose, onConfirm }: { contact: Contact; onClose: () => void; onConfirm: () => Promise<string | null> }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal onClose={() => !deleting && onClose()} label="Confirm client deletion">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300">
        <AlertTriangle size={19} />
      </div>
      <h3 className="mt-5 text-lg font-semibold">Delete {contact.name}?</h3>
      <p className="mt-2 text-sm leading-6 text-white/55">
        This removes them from your client list. It can't be undone. Their website enquiries stay in Bookings.
      </p>
      {error ? <p className="mt-3 text-sm text-rose-200">{error}</p> : null}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} disabled={deleting} className="h-11 rounded-xl px-5 text-sm text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-50">
          Cancel
        </button>
        <button
          type="button"
          disabled={deleting}
          onClick={async () => {
            setDeleting(true);
            const result = await onConfirm();
            setDeleting(false);
            if (result) setError(result);
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-500/90 px-5 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
        >
          <Trash2 size={15} />
          {deleting ? 'Deleting' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
