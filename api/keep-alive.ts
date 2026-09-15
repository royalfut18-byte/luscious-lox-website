import type { VercelRequest, VercelResponse } from '@vercel/node';
import { normalizeEnvValue } from './_lib/admin.js';

/**
 * Supabase pauses free-tier projects after 7 days with no database activity, and
 * a paused project means the booking form stops accepting enquiries until
 * someone restores it by hand. A Vercel cron hits this endpoint once a day, and
 * the read below counts as activity, so the idle timer never gets close to 7 days.
 *
 * Runs daily via the "crons" entry in vercel.json. Requires /api/keep-alive to
 * be listed in "rewrites" too, otherwise the catch-all rewrite serves the SPA
 * here and the cron would report success without ever touching the database.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Vercel sends "Authorization: Bearer <CRON_SECRET>" when that env var is set.
  // Without a secret configured the endpoint stays open, which is harmless (it
  // only performs a one-row read) but means anyone could call it.
  const cronSecret = normalizeEnvValue(process.env.CRON_SECRET);
  if (cronSecret) {
    const provided = req.headers.authorization ?? '';
    if (provided !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }
  }

  const supabaseUrl = normalizeEnvValue(process.env.SUPABASE_URL);
  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[keep-alive] Supabase environment variables are missing or blank.');
    return res.status(503).json({ ok: false, error: 'Supabase is not configured.' });
  }

  const startedAt = Date.now();
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/inquiries?select=id&limit=1`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    });

    const durationMs = Date.now() - startedAt;

    if (!response.ok) {
      const body = await response.text();
      // Loud, because a run of these is the early warning that the project is
      // paused or the key has been rotated.
      console.error('[keep-alive] Supabase read failed:', response.status, body);
      return res.status(502).json({ ok: false, status: response.status, durationMs });
    }

    console.log(`[keep-alive] Supabase reachable in ${durationMs}ms`);
    return res.status(200).json({ ok: true, durationMs, checkedAt: new Date().toISOString() });
  } catch (error) {
    console.error('[keep-alive] Could not reach Supabase:', error);
    return res.status(502).json({ ok: false, error: 'Could not reach Supabase.' });
  }
}
