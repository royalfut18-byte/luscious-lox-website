import type { VercelRequest, VercelResponse } from '@vercel/node';
import { normalizeEnvValue, requireAdmin } from './_lib/admin.js';

/**
 * ClickSend SMS for the admin panel.
 *
 *   GET  /api/admin-sms            -> { configured, senderId, history }
 *   POST /api/admin-sms            -> body { messages: [{ to, body, bookingId? }] }
 *
 * Needs CLICKSEND_USERNAME and CLICKSEND_API_KEY (from the ClickSend dashboard,
 * Developers -> API Credentials). CLICKSEND_SENDER_ID is optional: a dedicated
 * number or an approved alphanumeric sender name such as "Lusciouslox".
 */

const CLICKSEND_BASE = 'https://rest.clicksend.com/v3';
const MAX_RECIPIENTS = 200;
// Six concatenated parts is plenty for a salon message and keeps costs sane.
const MAX_BODY_LENGTH = 918;

type OutgoingMessage = {
  to: string;
  body: string;
  bookingId?: string;
};

function getClickSendConfig() {
  const username = normalizeEnvValue(process.env.CLICKSEND_USERNAME);
  const apiKey = normalizeEnvValue(process.env.CLICKSEND_API_KEY);
  const senderId = normalizeEnvValue(process.env.CLICKSEND_SENDER_ID);

  if (!username || !apiKey) {
    return null;
  }

  return {
    authorization: `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`,
    senderId,
  };
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Turns the way Australians write numbers (0416 595 902, 61416595902,
 * +61 416 595 902) into E.164. Anything already in + form is left alone.
 * Returns '' when the value cannot be a phone number.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 15) {
    return '';
  }

  if (hasPlus) {
    return `+${digits}`;
  }

  if (digits.startsWith('61') && digits.length === 11) {
    return `+${digits}`;
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return `+61${digits.slice(1)}`;
  }

  // Mobile typed without the leading zero, e.g. 416595902.
  if (digits.startsWith('4') && digits.length === 9) {
    return `+61${digits}`;
  }

  return `+${digits}`;
}

async function clickSendFetch(path: string, authorization: string, init?: RequestInit) {
  const response = await fetch(`${CLICKSEND_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { response, payload };
}

function describeClickSendError(payload: Record<string, unknown> | null, fallback: string) {
  const code = getString(payload?.response_code);
  const message = getString(payload?.response_msg);

  if (code === 'UNAUTHORIZED' || code === 'INVALID_CREDENTIALS') {
    return 'ClickSend rejected the API credentials. Check CLICKSEND_USERNAME and CLICKSEND_API_KEY.';
  }

  if (code === 'INSUFFICIENT_CREDIT') {
    // Keep billing out of the salon's view; whoever runs the ClickSend account sees it there.
    return 'Texting is unavailable right now. Please contact your website administrator.';
  }

  return message || fallback;
}

type HistoryItem = {
  id: string;
  to: string;
  body: string;
  status: string;
  sentAt: number;
  bookingId: string;
};

async function loadOverview(authorization: string) {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDaysAgo = now - 60 * 60 * 24 * 30;

  // /account is only used to confirm the credentials work; nothing from it is returned.
  const [account, history] = await Promise.all([
    clickSendFetch('/account', authorization),
    clickSendFetch(`/sms/history?date_from=${thirtyDaysAgo}&date_to=${now}&limit=50&page=1`, authorization),
  ]);

  if (!account.response.ok) {
    return {
      ok: false as const,
      status: account.response.status === 401 ? 401 : 502,
      error: describeClickSendError(account.payload, 'Unable to reach ClickSend right now.'),
    };
  }

  let items: HistoryItem[] = [];
  if (history.response.ok) {
    const historyData = (history.payload?.data ?? {}) as Record<string, unknown>;
    const rows = Array.isArray(historyData.data) ? (historyData.data as Array<Record<string, unknown>>) : [];

    items = rows
      .filter((row) => getString(row.direction) !== 'in')
      .map((row) => ({
        id: getString(row.message_id) || String(row.date ?? ''),
        to: getString(row.to),
        body: getString(row.body),
        status: getString(row.status) || getString(row.status_text) || 'Unknown',
        sentAt: Number(row.date ?? row.date_added ?? 0) * 1000,
        bookingId: getString(row.custom_string),
      }))
      .sort((a, b) => b.sentAt - a.sentAt);
  } else {
    console.error('ClickSend history request failed:', history.response.status, history.payload);
  }

  return { ok: true as const, history: items };
}

function parseMessages(value: unknown): { messages: OutgoingMessage[]; error?: string } {
  if (!Array.isArray(value) || value.length === 0) {
    return { messages: [], error: 'Add at least one recipient.' };
  }

  if (value.length > MAX_RECIPIENTS) {
    return { messages: [], error: `You can send to at most ${MAX_RECIPIENTS} people at once.` };
  }

  const messages: OutgoingMessage[] = [];

  for (const entry of value) {
    const record = (entry ?? {}) as Record<string, unknown>;
    const to = normalizePhone(getString(record.to));
    const body = getString(record.body);
    const bookingId = getString(record.bookingId).slice(0, 50);

    if (!to) {
      return { messages: [], error: `"${getString(record.to) || 'blank'}" is not a valid phone number.` };
    }

    if (!body) {
      return { messages: [], error: 'The message is empty.' };
    }

    if (body.length > MAX_BODY_LENGTH) {
      return { messages: [], error: `Keep messages under ${MAX_BODY_LENGTH} characters.` };
    }

    messages.push({ to, body, bookingId: bookingId || undefined });
  }

  return { messages };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (!requireAdmin(req, res)) {
    return;
  }

  const config = getClickSendConfig();

  if (req.method === 'GET') {
    if (!config) {
      return res.status(200).json({ configured: false, senderId: '', history: [] });
    }

    const overview = await loadOverview(config.authorization);
    if (!overview.ok) {
      return res.status(overview.status).json({ configured: true, error: overview.error });
    }

    return res.status(200).json({
      configured: true,
      senderId: config.senderId,
      history: overview.history,
    });
  }

  if (req.method === 'POST') {
    if (!config) {
      return res.status(503).json({
        error: 'SMS is not set up yet. Add CLICKSEND_USERNAME and CLICKSEND_API_KEY to the environment, then redeploy.',
      });
    }

    const parsed = parseMessages(req.body?.messages);
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const { response, payload } = await clickSendFetch('/sms/send', config.authorization, {
      method: 'POST',
      body: JSON.stringify({
        messages: parsed.messages.map((message) => ({
          source: 'lusciouslox-admin',
          to: message.to,
          body: message.body,
          ...(config.senderId ? { from: config.senderId } : {}),
          ...(message.bookingId ? { custom_string: message.bookingId } : {}),
        })),
      }),
    });

    if (!response.ok) {
      console.error('ClickSend send failed:', response.status, payload);
      return res.status(response.status === 401 ? 401 : 502).json({
        error: describeClickSendError(payload, 'ClickSend could not send the message.'),
      });
    }

    const data = (payload?.data ?? {}) as Record<string, unknown>;
    const results = (Array.isArray(data.messages) ? (data.messages as Array<Record<string, unknown>>) : []).map((message) => ({
      to: getString(message.to),
      status: getString(message.status),
      bookingId: getString(message.custom_string),
      messageId: getString(message.message_id),
    }));

    const sent = results.filter((result) => result.status === 'SUCCESS').length;
    console.log(`Admin SMS: ${sent}/${parsed.messages.length} accepted by ClickSend`);

    return res.status(200).json({
      sent,
      failed: results.length - sent,
      results,
    });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
