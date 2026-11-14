export type BookingRecord = {
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

export type SmsHistoryItem = {
  id: string;
  to: string;
  body: string;
  status: string;
  sentAt: number;
  bookingId: string;
  price: string;
};

export type SmsOverview = {
  configured: boolean;
  balance: string | null;
  currency: string;
  senderId: string;
  history: SmsHistoryItem[];
  error?: string;
};

export type SmsRecipient = {
  key: string;
  phone: string;
  name: string;
  service: string;
  bookingId?: string;
  status?: string;
};

export const statusOptions = ['new', 'contacted', 'scheduled', 'completed', 'archived'] as const;

export function parseBookingMessage(message: string) {
  const matched = message.match(/^Preferred date:\s*([^\n]+)\n\n([\s\S]*)$/);

  return {
    preferredDate: matched?.[1] ?? '',
    details: matched?.[2] ?? message,
  };
}

export function formatDateTime(value: string | number) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function formatDateOnly(value: string) {
  if (!value) {
    return 'Not provided';
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

/** "2h ago", "3d ago", falling back to a date once it is over a week old. */
export function formatRelative(value: string | number) {
  const date = new Date(value);
  const time = date.getTime();
  if (Number.isNaN(time)) {
    return '';
  }

  const minutes = Math.round((Date.now() - time) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short' }).format(date);
}

export function statusLabel(status: string) {
  if (!status) {
    return 'Unknown';
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function statusDot(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-400';
    case 'scheduled':
      return 'bg-sky-400';
    case 'contacted':
      return 'bg-amber-300';
    case 'archived':
      return 'bg-white/30';
    default:
      return 'bg-rose-400';
  }
}

export function statusPill(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20';
    case 'scheduled':
      return 'bg-sky-400/10 text-sky-200 ring-sky-400/20';
    case 'contacted':
      return 'bg-amber-300/10 text-amber-100 ring-amber-300/20';
    case 'archived':
      return 'bg-white/5 text-white/50 ring-white/10';
    default:
      return 'bg-rose-400/10 text-rose-100 ring-rose-400/25';
  }
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? '';
}

/** Mirrors the server: Australian numbers to E.164, '' when invalid. */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 15) return '';
  if (hasPlus) return `+${digits}`;
  if (digits.startsWith('61') && digits.length === 11) return `+${digits}`;
  if (digits.startsWith('0') && digits.length === 10) return `+61${digits.slice(1)}`;
  if (digits.startsWith('4') && digits.length === 9) return `+61${digits}`;
  return `+${digits}`;
}

export function recipientFromBooking(booking: BookingRecord): SmsRecipient | null {
  const phone = booking.phone ? normalizePhone(booking.phone) : '';
  if (!phone) {
    return null;
  }

  return {
    key: `booking:${booking.id}`,
    phone,
    name: booking.name,
    service: booking.service,
    bookingId: booking.id,
    status: booking.status,
  };
}

/** +61416595902 -> 0416 595 902 for display. */
export function displayPhone(phone: string) {
  const normalized = normalizePhone(phone);
  const match = normalized.match(/^\+614(\d{2})(\d{3})(\d{3})$/);
  if (match) {
    return `04${match[1]} ${match[2]} ${match[3]}`;
  }

  return phone;
}

export const messageVariables = [
  { token: '{first_name}', label: 'First name' },
  { token: '{name}', label: 'Full name' },
  { token: '{service}', label: 'Service' },
] as const;

export function personalise(template: string, recipient: Pick<SmsRecipient, 'name' | 'service'> | null) {
  const name = recipient?.name?.trim() ?? '';
  return template
    .replace(/\{first_name\}/g, firstName(name) || 'there')
    .replace(/\{name\}/g, name || 'there')
    .replace(/\{service\}/g, recipient?.service?.replace(/\s*\(.*?\)\s*/g, ' ').trim() || 'your appointment');
}

/**
 * Phones love to type curly quotes and long dashes, and a single one of those
 * halves how much text fits in an SMS. Swap them for plain equivalents.
 */
export function cleanSmsText(text: string) {
  return text
    .replace(/[\u2018\u2019\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201F\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ');
}

const gsmBasic =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';
const gsmExtended = '^{}\\[~]|€\f';

/** SMS segment maths: 160/153 chars for GSM-7, 70/67 once any other character appears. */
export function smsSegments(text: string) {
  let gsmLength = 0;
  let isGsm = true;

  for (const char of text) {
    if (gsmBasic.includes(char)) {
      gsmLength += 1;
    } else if (gsmExtended.includes(char)) {
      gsmLength += 2;
    } else {
      isGsm = false;
      break;
    }
  }

  if (isGsm) {
    const segments = gsmLength === 0 ? 0 : gsmLength <= 160 ? 1 : Math.ceil(gsmLength / 153);
    return { length: gsmLength, segments, encoding: 'GSM' as const, perSegment: segments > 1 ? 153 : 160 };
  }

  const length = [...text].length;
  const segments = length <= 70 ? 1 : Math.ceil(length / 67);
  return { length, segments, encoding: 'Unicode' as const, perSegment: segments > 1 ? 67 : 70 };
}

export const smsTemplates = [
  {
    id: 'enquiry',
    label: 'Enquiry reply',
    body: 'Hi {first_name}, thanks for your {service} enquiry at Lusciouslox! When would suit you to come in? Call or text us on 0416 595 902.',
  },
  {
    id: 'confirm',
    label: 'Booking confirmed',
    body: "Hi {first_name}, you're booked in for {service} at Lusciouslox, Neutral Bay. Can't wait to see you! To reschedule, call 0416 595 902.",
  },
  {
    id: 'reminder',
    label: 'Reminder',
    body: 'Hi {first_name}, a reminder of your {service} appointment at Lusciouslox tomorrow. To reschedule, call 0416 595 902. See you soon!',
  },
  {
    id: 'missed',
    label: 'Tried to reach you',
    body: 'Hi {first_name}, we tried to reach you about your {service} enquiry. Call or text us on 0416 595 902 whenever suits. - Lusciouslox',
  },
  {
    id: 'thanks',
    label: 'Thank you',
    body: 'Hi {first_name}, thank you for visiting Lusciouslox! We hope you love your hair. A quick Google review would mean the world to us.',
  },
] as const;
