import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSupabaseHeaders, getSupabaseConfig, requireAdmin } from './_lib/admin.js';

const allowedStatuses = new Set(['new', 'contacted', 'scheduled', 'completed', 'archived']);

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

async function listBookings() {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false as const, status: 503, error: 'Booking storage is not configured.' };
  }

  const endpoint = new URL('/rest/v1/inquiries', config.supabaseUrl);
  endpoint.searchParams.set('select', 'id,name,email,phone,service,message,source,status,created_at');
  endpoint.searchParams.set('order', 'created_at.desc');

  const response = await fetch(endpoint, {
    headers: buildSupabaseHeaders(config.serviceRoleKey),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to load bookings from Supabase:', response.status, errorBody);
    return { ok: false as const, status: 502, error: 'Unable to load bookings right now.' };
  }

  const bookings = (await response.json()) as unknown;
  return { ok: true as const, bookings };
}

async function updateBookingStatus(id: string, status: string) {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false as const, status: 503, error: 'Booking storage is not configured.' };
  }

  const endpoint = new URL('/rest/v1/inquiries', config.supabaseUrl);
  endpoint.searchParams.set('id', `eq.${id}`);
  endpoint.searchParams.set('select', 'id,name,email,phone,service,message,source,status,created_at');

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      ...buildSupabaseHeaders(config.serviceRoleKey),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to update booking status in Supabase:', response.status, errorBody);
    return { ok: false as const, status: 502, error: 'Unable to update this booking right now.' };
  }

  const rows = (await response.json()) as Array<unknown>;
  return { ok: true as const, booking: rows[0] ?? null };
}

async function deleteBooking(id: string) {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false as const, status: 503, error: 'Booking storage is not configured.' };
  }

  const endpoint = new URL('/rest/v1/inquiries', config.supabaseUrl);
  endpoint.searchParams.set('id', `eq.${id}`);
  endpoint.searchParams.set('select', 'id');

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      ...buildSupabaseHeaders(config.serviceRoleKey),
      Prefer: 'return=representation',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Failed to delete booking in Supabase:', response.status, errorBody);
    return { ok: false as const, status: 502, error: 'Unable to delete this booking right now.' };
  }

  // PostgREST returns the deleted rows. An empty array means the id matched
  // nothing, which is worth reporting rather than claiming a successful delete.
  const rows = (await response.json()) as Array<unknown>;
  if (rows.length === 0) {
    return { ok: false as const, status: 404, error: 'That booking no longer exists.' };
  }

  return { ok: true as const, id };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (!requireAdmin(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    const result = await listBookings();
    if (!result.ok) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({ bookings: result.bookings });
  }

  if (req.method === 'PATCH') {
    const id = getString(req.body?.id);
    const status = getString(req.body?.status).toLowerCase();

    if (!id) {
      return res.status(400).json({ error: 'Booking id is required.' });
    }

    if (!allowedStatuses.has(status)) {
      return res.status(400).json({ error: 'Please choose a valid status.' });
    }

    const result = await updateBookingStatus(id, status);
    if (!result.ok) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({ booking: result.booking });
  }

  if (req.method === 'DELETE') {
    const id = getString(req.body?.id) || getString(req.query?.id);

    if (!id) {
      return res.status(400).json({ error: 'Booking id is required.' });
    }

    const result = await deleteBooking(id);
    if (!result.ok) {
      return res.status(result.status).json({ error: result.error });
    }

    console.log('Admin deleted booking', id);
    return res.status(200).json({ id: result.id });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
