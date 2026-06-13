import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearAdminSession, getAuthenticatedAdmin } from './_lib/admin.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'DELETE') {
    clearAdminSession(res);
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const username = getAuthenticatedAdmin(req);
  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(200).json({ authenticated: true, username });
}
