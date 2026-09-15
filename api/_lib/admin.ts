import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SESSION_COOKIE = 'lux_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
// No credential fallbacks live in this repo. If the environment variables are
// not set the admin API refuses every login rather than accepting a default
// that anyone reading the source could use.
const REQUIRED_ADMIN_ENV = 'ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET';

export function normalizeEnvValue(value: string | undefined): string {
  if (typeof value !== 'string') {
    return '';
  }

  let normalized = value.trim();

  for (let i = 0; i < 2; i += 1) {
    const wrappedInDoubleQuotes = normalized.startsWith('"') && normalized.endsWith('"');
    const wrappedInSingleQuotes = normalized.startsWith("'") && normalized.endsWith("'");

    if ((wrappedInDoubleQuotes || wrappedInSingleQuotes) && normalized.length >= 2) {
      normalized = normalized.slice(1, -1).trim();
      continue;
    }

    break;
  }

  return normalized;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getAdminUsername(): string {
  return normalizeEnvValue(process.env.ADMIN_USERNAME);
}

function getAdminPassword(): string {
  return normalizeEnvValue(process.env.ADMIN_PASSWORD);
}

function getSessionSecret(): string {
  return normalizeEnvValue(process.env.ADMIN_SESSION_SECRET);
}

function signSessionPayload(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(';').forEach((cookie) => {
    const separatorIndex = cookie.indexOf('=');
    if (separatorIndex === -1) {
      return;
    }

    const key = cookie.slice(0, separatorIndex).trim();
    const value = cookie.slice(separatorIndex + 1).trim();
    cookies[key] = value;
  });

  return cookies;
}

function buildSessionCookie(value: string, maxAge: number): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureFlag}`;
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();

  if (!expectedUsername || !expectedPassword || !getSessionSecret()) {
    console.error(`Admin sign-in is not configured. Set ${REQUIRED_ADMIN_ENV} in the environment.`);
    return false;
  }

  const normalizedUsername = username.trim();
  const normalizedPassword = password.trim();

  return safeEqual(normalizedUsername, expectedUsername) && safeEqual(normalizedPassword, expectedPassword);
}

export function setAdminSession(res: VercelResponse, username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      exp: Date.now() + SESSION_MAX_AGE * 1000,
    }),
    'utf8',
  ).toString('base64url');

  const signature = signSessionPayload(payload, getSessionSecret());
  res.setHeader('Set-Cookie', buildSessionCookie(`${payload}.${signature}`, SESSION_MAX_AGE));
}

export function clearAdminSession(res: VercelResponse) {
  res.setHeader('Set-Cookie', buildSessionCookie('', 0));
}

export function getAuthenticatedAdmin(req: VercelRequest): string | null {
  // Without a signing secret no cookie can be trusted, so reject everything.
  const secret = getSessionSecret();
  if (!secret) {
    console.error(`Admin session check is not configured. Set ${REQUIRED_ADMIN_ENV} in the environment.`);
    return null;
  }

  const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signSessionPayload(payload, secret);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { username?: unknown; exp?: unknown };
    if (typeof session.exp !== 'number' || session.exp <= Date.now()) {
      return null;
    }

    return typeof session.username === 'string' ? session.username : null;
  } catch {
    return null;
  }
}

export function requireAdmin(req: VercelRequest, res: VercelResponse): string | null {
  const username = getAuthenticatedAdmin(req);
  if (!username) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return username;
}

export function getSupabaseConfig() {
  const supabaseUrl = normalizeEnvValue(process.env.SUPABASE_URL);
  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return { supabaseUrl, serviceRoleKey };
}

export function buildSupabaseHeaders(serviceRoleKey: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };
}
