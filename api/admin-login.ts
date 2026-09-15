import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearAdminSession, isAdminConfigured, setAdminSession, verifyAdminCredentials } from './_lib/admin.js';

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'DELETE') {
    clearAdminSession(res);
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Say plainly when the server has no credentials configured. A generic
  // "invalid password" here makes a misconfigured deployment look identical to
  // a typo, which is a miserable thing to debug.
  if (!isAdminConfigured()) {
    return res.status(503).json({
      error: 'Admin sign-in is not configured on the server. Set ADMIN_USERNAME and ADMIN_PASSWORD, then redeploy.',
    });
  }

  const username = getString(req.body?.username);
  const password = getString(req.body?.password);

  if (!verifyAdminCredentials(username, password)) {
    clearAdminSession(res);
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  setAdminSession(res, username);
  return res.status(200).json({ success: true, username });
}
