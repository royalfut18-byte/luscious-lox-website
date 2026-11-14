import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSupabaseHeaders, getSupabaseConfig, requireAdmin } from './_lib/admin.js';
import { normalizePhone } from './_lib/phone.js';

/**
 * Salon client list (table: public.clients, see supabase/clients.sql).
 *
 *   GET    -> { clients }
 *   POST   { name, phone?, email?, notes?, allowSharedPhone? } -> { client }
 *   PATCH  { id, name, phone?, email?, notes?, allowSharedPhone? } -> { client }
 *   DELETE { id } -> { id }
 *
 * Phones are stored in +61 form and emails in lower case so duplicates are
 * easy to spot. A second client on the same number is allowed (families share
 * phones) but only after the panel confirms it with allowSharedPhone.
 */

const SELECT = 'id,name,phone,email,notes,created_at';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOT_SET_UP = 'The client list is not set up yet. Please contact your website administrator.';

type ClientInput = {
  name: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
};

type ClientRow = ClientInput & { id: string; created_at: string };

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function parseInput(body: Record<string, unknown> | undefined): { input?: ClientInput; error?: string } {
  const name = getString(body?.name).replace(/\s+/g, ' ');
  const rawPhone = getString(body?.phone);
  const email = getString(body?.email).toLowerCase();
  const notes = getString(body?.notes);

  if (!name) return { error: 'Please enter a name.' };
  if (name.length > 120) return { error: 'That name is too long.' };

  const phone = rawPhone ? normalizePhone(rawPhone) : '';
  if (rawPhone && !phone) return { error: 'That phone number does not look right.' };
  if (email && (!emailPattern.test(email) || email.length > 200)) return { error: 'That email address does not look right.' };
  if (notes.length > 2000) return { error: 'Notes are too long.' };

  return { input: { name, phone: phone || null, email: email || null, notes: notes || null } };
}

async function supabase(path: string, init?: RequestInit & { searchParams?: Record<string, string> }) {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false as const, status: 503, error: NOT_SET_UP };
  }

  const endpoint = new URL(`/rest/v1/${path}`, config.supabaseUrl);
  Object.entries(init?.searchParams ?? {}).forEach(([key, value]) => endpoint.searchParams.set(key, value));

  const response = await fetch(endpoint, {
    ...init,
    headers: { ...buildSupabaseHeaders(config.serviceRoleKey), Prefer: 'return=representation', ...(init?.headers ?? {}) },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('Supabase clients request failed:', response.status, body);
    // Table missing: supabase/clients.sql has not been run yet.
    const missingTable = response.status === 404 || /PGRST205|42P01|does not exist|Could not find the table/i.test(body);
    return {
      ok: false as const,
      status: missingTable ? 503 : 502,
      error: missingTable ? NOT_SET_UP : 'Unable to update the client list right now.',
    };
  }

  const rows = (await response.json()) as ClientRow[];
  return { ok: true as const, rows };
}

/** Returns an error message when the change would duplicate another client. */
async function findConflict(input: ClientInput, excludeId: string, allowSharedPhone: boolean) {
  const filters: string[] = [];
  if (input.phone) filters.push(`phone.eq."${input.phone}"`);
  if (input.email) filters.push(`email.eq."${input.email}"`);
  if (!filters.length) return null;

  const result = await supabase('clients', { searchParams: { select: SELECT, or: `(${filters.join(',')})` } });
  if (!result.ok) return { status: result.status, error: result.error };

  const others = result.rows.filter((row) => row.id !== excludeId);
  const sameEmail = input.email ? others.find((row) => row.email === input.email) : undefined;
  if (sameEmail) {
    return { status: 409, error: `${sameEmail.name} already has this email address.` };
  }

  const samePhone = input.phone ? others.find((row) => row.phone === input.phone) : undefined;
  if (samePhone && (samePhone.name.toLowerCase() === input.name.toLowerCase() || !allowSharedPhone)) {
    return {
      status: 409,
      error:
        samePhone.name.toLowerCase() === input.name.toLowerCase()
          ? `${samePhone.name} is already in your clients.`
          : `${samePhone.name} already uses this number.`,
      code: samePhone.name.toLowerCase() === input.name.toLowerCase() ? 'duplicate' : 'shared_phone',
    };
  }

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (!requireAdmin(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    const result = await supabase('clients', { searchParams: { select: SELECT, order: 'name.asc' } });
    if (!result.ok) return res.status(result.status).json({ error: result.error });
    return res.status(200).json({ clients: result.rows });
  }

  if (req.method === 'POST' || req.method === 'PATCH') {
    const id = getString(req.body?.id);
    if (req.method === 'PATCH' && !id) {
      return res.status(400).json({ error: 'Client id is required.' });
    }

    const parsed = parseInput(req.body);
    if (!parsed.input) {
      return res.status(400).json({ error: parsed.error });
    }

    const conflict = await findConflict(parsed.input, id, req.body?.allowSharedPhone === true);
    if (conflict) {
      return res.status(conflict.status).json({ error: conflict.error, code: 'code' in conflict ? conflict.code : undefined });
    }

    const result =
      req.method === 'POST'
        ? await supabase('clients', { method: 'POST', searchParams: { select: SELECT }, body: JSON.stringify(parsed.input) })
        : await supabase('clients', {
            method: 'PATCH',
            searchParams: { select: SELECT, id: `eq.${id}` },
            body: JSON.stringify({ ...parsed.input, updated_at: new Date().toISOString() }),
          });

    if (!result.ok) return res.status(result.status).json({ error: result.error });
    if (!result.rows[0]) return res.status(404).json({ error: 'That client no longer exists.' });

    return res.status(req.method === 'POST' ? 201 : 200).json({ client: result.rows[0] });
  }

  if (req.method === 'DELETE') {
    const id = getString(req.body?.id) || getString(req.query?.id);
    if (!id) {
      return res.status(400).json({ error: 'Client id is required.' });
    }

    const result = await supabase('clients', { method: 'DELETE', searchParams: { select: 'id', id: `eq.${id}` } });
    if (!result.ok) return res.status(result.status).json({ error: result.error });
    if (!result.rows.length) return res.status(404).json({ error: 'That client no longer exists.' });

    return res.status(200).json({ id });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
