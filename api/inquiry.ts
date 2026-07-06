import type { VercelRequest, VercelResponse } from '@vercel/node';
import { normalizeEnvValue } from './_lib/admin.js';

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  preferredDate?: unknown;
  website?: unknown;
};

const allowedServices = new Set([
  'Keratin Nanoplasty Special ($200)',
  'Home Service Visit',
  'Nano Extensions',
  'Tape Extensions',
  'Remy Extensions',
  'Balayage',
  'Hair Colouring',
  'Keratin Treatment',
  'Styling / Blowdry',
  'General Consultation',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{6,25}$/;
const preferredDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const urlPattern = /(https?:\/\/|www\.)/i;
const spamPattern = /\b(seo|backlinks?|guest post|casino|crypto|forex|loan|viagra|telegram)\b/i;
const repeatedCharPattern = /(.)\1{6,}/;

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function buildStoredMessage(message: string, preferredDate: string): string {
  if (!preferredDate) {
    return message;
  }

  return `Preferred date: ${preferredDate}\n\n${message}`;
}

function validatePayload(body: InquiryPayload) {
  const name = normalizeWhitespace(getString(body.name));
  const email = normalizeWhitespace(getString(body.email)).toLowerCase();
  const phone = normalizeWhitespace(getString(body.phone));
  const service = normalizeWhitespace(getString(body.service));
  const message = normalizeWhitespace(getString(body.message));
  const preferredDate = normalizeWhitespace(getString(body.preferredDate));
  const website = normalizeWhitespace(getString(body.website));

  if (website) {
    return { ok: false as const, status: 400, error: 'Spam submission rejected.' };
  }

  if (name.length < 2 || name.length > 100 || urlPattern.test(name)) {
    return { ok: false as const, status: 400, error: 'Please enter a valid name.' };
  }

  if (!email && !phone) {
    return { ok: false as const, status: 400, error: 'Please provide an email address or phone number.' };
  }

  if (email && !emailPattern.test(email)) {
    return { ok: false as const, status: 400, error: 'Please enter a valid email address.' };
  }

  if (phone && !phonePattern.test(phone)) {
    return { ok: false as const, status: 400, error: 'Please enter a valid phone number.' };
  }

  if (!allowedServices.has(service)) {
    return { ok: false as const, status: 400, error: 'Please select a valid service.' };
  }

  if (preferredDate && !preferredDatePattern.test(preferredDate)) {
    return { ok: false as const, status: 400, error: 'Please enter a valid preferred date.' };
  }

  if (message.length < 10 || message.length > 2000) {
    return { ok: false as const, status: 400, error: 'Please provide a few details about your inquiry.' };
  }

  const combinedText = `${name} ${email} ${phone} ${service} ${message}`;
  if (spamPattern.test(combinedText) || repeatedCharPattern.test(combinedText)) {
    return { ok: false as const, status: 400, error: 'Spam submission rejected.' };
  }

  const urlMatches = combinedText.match(/https?:\/\/|www\./gi) ?? [];
  if (urlMatches.length > 0) {
    return { ok: false as const, status: 400, error: 'Links are not allowed in inquiries.' };
  }

  return {
    ok: true as const,
    value: {
      name,
      email: email || null,
      phone: phone || null,
      service,
      message: buildStoredMessage(message, preferredDate),
    },
  };
}

async function storeInquiry(record: {
  name: string;
  email: string | null;
  phone: string | null;
  service: string;
  message: string;
}) {
  const supabaseUrl = normalizeEnvValue(process.env.SUPABASE_URL);
  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Inquiry storage is not configured: missing or blank Supabase environment variables');
    return { ok: false as const, status: 503, error: 'Inquiry storage is not configured.' };
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/inquiries`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      ...record,
      source: 'luscious-lox',
      status: 'new',
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to store inquiry in Supabase:', response.status, errorBody);
    return { ok: false as const, status: 502, error: 'Unable to store your inquiry right now.' };
  }

  return { ok: true as const };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const validation = validatePayload((req.body ?? {}) as InquiryPayload);
  if (!validation.ok) {
    return res.status(validation.status).json({ error: validation.error });
  }

  const stored = await storeInquiry(validation.value);
  if (!stored.ok) {
    return res.status(stored.status).json({ error: stored.error });
  }

  return res.status(201).json({ success: true });
}
